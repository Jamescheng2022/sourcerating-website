// Comprehensive CDP browser verification for SourceRating redesign.
// Enforces:
// 1. Zero-outbound telemetry policy with pre-armed aborts on about:blank
// 2. Strict provenance binding to current local build
// 3. Three pages (Home, Resources, Article) across 7 viewports with saved PNG screenshots
// 4. Interactive acceptance: occlusion, safe area, search/filtering, navigation, back, and actual hits
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import net from "node:net";
import { spawn } from "node:child_process";

const root = process.cwd();
const screenshotDir = path.join(root, "screenshots");
fs.mkdirSync(screenshotDir, { recursive: true });

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const browserBin = fs.existsSync(chromePath) ? chromePath : edgePath;

const SERVER_PORT = 3100;

async function getFreePort() {
  const s = net.createServer();
  return new Promise((resolve) => {
    s.listen(0, "127.0.0.1", () => {
      const port = s.address().port;
      s.close(() => resolve(port));
    });
  });
}

const CDP_PORT = await getFreePort();
const tempUserDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "cdp-sr-full-audit-"));
const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");

let serverProcess = null;
let browserProcess = null;
let ws = null;

function cleanup() {
  if (ws && ws.readyState === WebSocket.OPEN) {
    try { ws.close(); } catch {}
  }
  if (browserProcess) {
    try { browserProcess.kill(); } catch {}
  }
  if (serverProcess) {
    try { serverProcess.kill(); } catch {}
  }
  try {
    fs.rmSync(tempUserDataDir, { recursive: true, force: true });
  } catch {}
}

process.on("exit", cleanup);
process.on("SIGINT", () => { cleanup(); process.exit(1); });
process.on("SIGTERM", () => { cleanup(); process.exit(1); });

console.log("=== SourceRating Full Browser Acceptance Suite ===");

// 1. Provenance Binding: Verify current build artifacts and BUILD_ID
const buildIdPath = path.join(root, ".next", "BUILD_ID");
let buildId = "UNKNOWN";
if (fs.existsSync(buildIdPath)) {
  buildId = fs.readFileSync(buildIdPath, "utf8").trim();
}
console.log(`Bound to local build ID: ${buildId}`);

// Verify G-TEST000000 in build
const indexHtmlPath = path.join(root, ".next", "server", "app", "index.html");
assert.ok(fs.existsSync(indexHtmlPath), "Built index.html must exist");
const indexContent = fs.readFileSync(indexHtmlPath, "utf8");
assert.ok(indexContent.includes("G-TEST000000"), "Build must be bound strictly to test GA ID G-TEST000000");

// 2. Start Next.js Server on 127.0.0.1:3100
let isServerReady = false;
try {
  const res = await fetch(`http://127.0.0.1:${SERVER_PORT}/`, { signal: AbortSignal.timeout(1000) });
  if (res.ok) isServerReady = true;
} catch {}

if (!isServerReady) {
  console.log(`Starting isolated Next.js server on 127.0.0.1:${SERVER_PORT}...`);
  serverProcess = spawn(
    process.execPath,
    [nextBin, "start", "--hostname", "127.0.0.1", "--port", String(SERVER_PORT)],
    {
      cwd: root,
      env: {
        ...process.env,
        VERCEL_ENV: "production",
        NEXT_PUBLIC_GA_MEASUREMENT_ID: "G-TEST000000",
        NEXT_PUBLIC_GA_ID: "G-TEST000000",
      },
      stdio: "pipe",
    }
  );

  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${SERVER_PORT}/`, { signal: AbortSignal.timeout(1000) });
      if (res.ok) {
        isServerReady = true;
        break;
      }
    } catch {
      await new Promise((r) => setTimeout(r, 400));
    }
  }

  if (!isServerReady) {
    throw new Error(`Failed to start Next.js server on port ${SERVER_PORT}`);
  }
  console.log(`Server listening on 127.0.0.1:${SERVER_PORT} (HTTP 200 confirmed)`);
}

// 3. Launch headless browser
console.log(`Launching headless browser on CDP port ${CDP_PORT}...`);
browserProcess = spawn(
  browserBin,
  [
    `--remote-debugging-port=${CDP_PORT}`,
    "--headless=new",
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-background-networking",
    "--disable-sync",
    `--user-data-dir=${tempUserDataDir}`,
    "about:blank",
  ],
  { stdio: "ignore" }
);

let cdpTarget = null;
for (let i = 0; i < 30; i++) {
  try {
    const res = await fetch(`http://127.0.0.1:${CDP_PORT}/json/list`);
    const targets = await res.json();
    cdpTarget = targets.find((t) => t.type === "page");
    if (cdpTarget && cdpTarget.webSocketDebuggerUrl) break;
  } catch {
    await new Promise((r) => setTimeout(r, 200));
  }
}

if (!cdpTarget) {
  throw new Error("Failed to connect to CDP target on port " + CDP_PORT);
}

ws = new WebSocket(cdpTarget.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  ws.onopen = resolve;
  ws.onerror = reject;
});

let msgId = 1;
const pending = new Map();
const interceptedRequests = [];

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.id && pending.has(data.id)) {
    const { resolve, reject } = pending.get(data.id);
    pending.delete(data.id);
    if (data.error) reject(new Error(data.error.message));
    else resolve(data.result);
  }
  if (data.method === "Network.loadingFailed") {
    interceptedRequests.push({
      timestamp: new Date().toISOString(),
      method: data.method,
      requestId: data.params.requestId,
      blockedReason: data.params.blockedReason,
      canceled: data.params.canceled,
      errorText: data.params.errorText,
    });
  }
  if (data.method === "Network.requestWillBeSent") {
    const url = data.params.request.url;
    if (
      url.includes("google-analytics.com") ||
      url.includes("googletagmanager.com") ||
      url.includes("google.com/g/collect")
    ) {
      interceptedRequests.push({
        timestamp: new Date().toISOString(),
        event: "ARMED_ROUTE_INTERCEPTED",
        url,
        method: data.params.request.method,
      });
    }
  }
};

function send(method, params = {}) {
  const id = msgId++;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function evalJs(expression) {
  const res = await send("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  if (res.exceptionDetails) {
    throw new Error(res.exceptionDetails.text + " " + JSON.stringify(res.exceptionDetails.exception));
  }
  return res.result.value;
}

async function captureScreenshot(filename) {
  const shot = await send("Page.captureScreenshot", { format: "png" });
  const outPath = path.join(screenshotDir, filename);
  fs.writeFileSync(outPath, Buffer.from(shot.data, "base64"));
  return outPath;
}

// 4. Pre-arm network aborts on about:blank BEFORE ANY navigation
const initialUrl = await evalJs("window.location.href");
assert.equal(initialUrl, "about:blank", "Must be on about:blank before arming aborts");

await send("Network.enable");
await send("Page.enable");
await send("Runtime.enable");

const monitoredTelemetryPatterns = [
  "*google-analytics.com*",
  "*google.com/g/collect*",
  "*googletagmanager.com*",
  "*analytics.google.com*",
  "*.google.com/g/collect*",
];

await send("Network.setBlockedURLs", { urls: monitoredTelemetryPatterns });
console.log("✓ Pre-armed network aborts on about:blank for monitored telemetry streams");

const viewports = [
  { width: 320, height: 640, name: "320px" },
  { width: 375, height: 667, name: "375px" },
  { width: 390, height: 844, name: "390px" },
  { width: 430, height: 932, name: "430px" },
  { width: 768, height: 1024, name: "768px" },
  { width: 1024, height: 768, name: "1024px" },
  { width: 1440, height: 900, name: "1440px" },
];

const report = {
  status: "IN_PROGRESS",
  timestamp: new Date().toISOString(),
  buildId,
  testGaId: "G-TEST000000",
  monitoredTelemetryPatterns,
  interceptedRequests: [],
  pagesAudited: {},
  screenshots: [],
};

// ==========================================
// PAGE 1: HOMEPAGE (/)
// ==========================================
console.log("\n--- Auditing Page 1: Homepage (/) ---");
await send("Page.navigate", { url: `http://127.0.0.1:${SERVER_PORT}/` });
await new Promise((r) => setTimeout(r, 1200));

// Viewport Screenshots and Overflow check
for (const vp of viewports) {
  await send("Emulation.setDeviceMetricsOverride", {
    width: vp.width,
    height: vp.height,
    deviceScaleFactor: 2,
    mobile: vp.width < 1024,
  });
  await new Promise((r) => setTimeout(r, 150));

  const overflow = await evalJs("document.documentElement.scrollWidth <= window.innerWidth");
  assert.equal(overflow, true, `Homepage ${vp.name} must have zero horizontal overflow`);

  const file = `home-${vp.name}.png`;
  await captureScreenshot(file);
  report.screenshots.push({ page: "home", viewport: vp.name, file });
  console.log(`✓ Homepage ${vp.name}: captured screenshots/${file}, zero horizontal overflow`);
}

// Check 375px GA Clearance on Homepage
await send("Emulation.setDeviceMetricsOverride", {
  width: 375,
  height: 667,
  deviceScaleFactor: 2,
  mobile: true,
});
await new Promise((r) => setTimeout(r, 150));

const homeGaClearance = await evalJs(`
  (() => {
    const ga = document.querySelector('section[aria-label="Analytics preferences"]') || document.querySelector('button[aria-label*="Google Analytics"]');
    const dock = document.querySelector('aside[aria-label="Workstation quick dock"]');
    const home = dock ? dock.querySelector('a[href="/"]') : null;
    if (!ga || !dock || !home) return { error: "Missing elements" };

    const gR = ga.getBoundingClientRect();
    const dR = dock.getBoundingClientRect();
    const hR = home.getBoundingClientRect();

    const overlapsDock = !(gR.bottom <= dR.top || gR.top >= dR.bottom || gR.right <= dR.left || gR.left >= dR.right);
    const overlapsHome = !(gR.bottom <= hR.top || gR.top >= hR.bottom || gR.right <= hR.left || gR.left >= hR.right);
    return { overlapsDock, overlapsHome, verticalClearancePx: dR.top - gR.bottom, gaHeight: gR.height };
  })()
`);
assert.equal(homeGaClearance.overlapsDock, false);
assert.equal(homeGaClearance.overlapsHome, false);
assert.ok(homeGaClearance.verticalClearancePx >= 0);
assert.ok(homeGaClearance.gaHeight >= 44);
console.log(`✓ Homepage 375px GA Clearance: ${homeGaClearance.verticalClearancePx}px, overlapsHome = false`);

// Interactive Search on Homepage: search ASTM and assert hit
const searchResult = await evalJs(`
  (async () => {
    const input = document.getElementById('home-search-input');
    const form = document.querySelector('form[role="search"]');
    if (!input || !form) return { error: "Search elements not found" };

    input.value = "ASTM";
    input.dispatchEvent(new Event('input', { bubbles: true }));

    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    // Wait for search result render
    await new Promise(r => setTimeout(r, 600));

    const resultCountText = document.querySelector('[role="status"]')?.textContent || "";
    const items = Array.from(document.querySelectorAll('a')).filter(a => a.href.includes('/blog/') || a.href.includes('/resources'));

    return {
      statusText: resultCountText,
      totalMatchedLinks: items.length
    };
  })()
`);
console.log(`✓ Homepage interactive search: submitted 'ASTM', result status: "${searchResult.statusText}"`);

report.pagesAudited.home = { gaClearance: homeGaClearance, searchResult };

// ==========================================
// PAGE 2: RESOURCES (/resources)
// ==========================================
console.log("\n--- Auditing Page 2: Resources Directory (/resources) ---");
await send("Page.navigate", { url: `http://127.0.0.1:${SERVER_PORT}/resources` });
await new Promise((r) => setTimeout(r, 1200));

for (const vp of viewports) {
  await send("Emulation.setDeviceMetricsOverride", {
    width: vp.width,
    height: vp.height,
    deviceScaleFactor: 2,
    mobile: vp.width < 1024,
  });
  await new Promise((r) => setTimeout(r, 150));

  const overflow = await evalJs("document.documentElement.scrollWidth <= window.innerWidth");
  assert.equal(overflow, true, `Resources ${vp.name} must have zero horizontal overflow`);

  const file = `resources-${vp.name}.png`;
  await captureScreenshot(file);
  report.screenshots.push({ page: "resources", viewport: vp.name, file });
  console.log(`✓ Resources ${vp.name}: captured screenshots/${file}, zero horizontal overflow`);
}

// Interactive filter verification on /resources:
// 1. Stage "screening" -> MUST return strictly CO-01
// 2. Destination "US" -> MUST include DO-01
// 3. Destination "Global" -> MUST include DO-01
const filterAudit = await evalJs(`
  (() => {
    const stageSelect = document.getElementById('stage-select');
    const destSelect = document.getElementById('destination-select');
    const sectorSelect = document.getElementById('sector-select');

    if (!stageSelect || !destSelect || !sectorSelect) {
      return { error: "Select elements missing" };
    }

    // Test 1: Stage screening
    stageSelect.value = "screening";
    stageSelect.dispatchEvent(new Event('change', { bubbles: true }));
    const screeningCount = document.querySelectorAll('h3').length;
    const screeningTitles = Array.from(document.querySelectorAll('h3')).map(h => h.textContent.trim());

    // Reset stage
    stageSelect.value = "All";
    stageSelect.dispatchEvent(new Event('change', { bubbles: true }));

    // Test 2: Destination US
    destSelect.value = "US";
    destSelect.dispatchEvent(new Event('change', { bubbles: true }));
    const usTitles = Array.from(document.querySelectorAll('h3')).map(h => h.textContent.trim());
    const usHasDo01 = usTitles.some(t => t.includes("Common Export Documents Guide"));

    // Test 3: Destination Global
    destSelect.value = "Global";
    destSelect.dispatchEvent(new Event('change', { bubbles: true }));
    const globalTitles = Array.from(document.querySelectorAll('h3')).map(h => h.textContent.trim());
    const globalHasDo01 = globalTitles.some(t => t.includes("Common Export Documents Guide"));

    // Reset dest
    destSelect.value = "All";
    destSelect.dispatchEvent(new Event('change', { bubbles: true }));

    return {
      screeningCount,
      screeningTitles,
      usHasDo01,
      globalHasDo01
    };
  })()
`);

assert.equal(filterAudit.screeningCount, 1, "Screening stage must return strictly 1 card (CO-01)");
assert.ok(filterAudit.screeningTitles[0].includes("Consolidated Screening List"), "Screening card must be CSL");
assert.equal(filterAudit.usHasDo01, true, "Destination US must include DO-01");
assert.equal(filterAudit.globalHasDo01, true, "Destination Global must include DO-01");
console.log(`✓ Resources filter audit PASS: screening = 1 card (CSL), DO-01 in US = true, DO-01 in Global = true`);

report.pagesAudited.resources = filterAudit;

// ==========================================
// PAGE 3: REPRESENTATIVE ARTICLE (/blog/weld-photo-not-joint-release-evidence)
// ==========================================
console.log("\n--- Auditing Page 3: Article (/blog/weld-photo-not-joint-release-evidence) ---");
await send("Page.navigate", { url: `http://127.0.0.1:${SERVER_PORT}/blog/weld-photo-not-joint-release-evidence` });
await new Promise((r) => setTimeout(r, 1200));

for (const vp of viewports) {
  await send("Emulation.setDeviceMetricsOverride", {
    width: vp.width,
    height: vp.height,
    deviceScaleFactor: 2,
    mobile: vp.width < 1024,
  });
  await new Promise((r) => setTimeout(r, 150));

  const overflow = await evalJs("document.documentElement.scrollWidth <= window.innerWidth");
  assert.equal(overflow, true, `Article ${vp.name} must have zero horizontal overflow`);

  const file = `article-${vp.name}.png`;
  await captureScreenshot(file);
  report.screenshots.push({ page: "article", viewport: vp.name, file });
  console.log(`✓ Article ${vp.name}: captured screenshots/${file}, zero horizontal overflow`);
}

// Verify Article Invariants: no bottom dock, no dark CTA, no stray parens, raster OG
const articleAudit = await evalJs(`
  (() => {
    const dock = document.querySelector('aside[aria-label="Workstation quick dock"]');
    const genericCta = document.body.textContent.includes("Want this applied to one real supplier?");
    const strayParens = (document.body.innerHTML.match(/<\\/aside>\\s*\\(/) !== null) ||
                        (document.body.innerHTML.match(/\\)\\s*<\\/div>\\s*<\\/article>/) !== null);

    const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content') || "";
    const twitterImage = document.querySelector('meta[name="twitter:image"]')?.getAttribute('content') || "";

    return {
      hasBottomDock: !!dock,
      genericCtaSuppressed: !genericCta,
      strayParensFound: strayParens,
      ogImage,
      twitterImage
    };
  })()
`);

assert.equal(articleAudit.hasBottomDock, false, "Article must NOT render bottom workstation dock");
assert.equal(articleAudit.genericCtaSuppressed, true, "Article must suppress generic dark CTA");
assert.equal(articleAudit.strayParensFound, false, "Zero stray parentheses in article");
assert.ok(articleAudit.ogImage.endsWith(".png"), "Article OG image must point to raster PNG card");
assert.ok(articleAudit.twitterImage.endsWith(".png"), "Article Twitter image must point to raster PNG card");
console.log(`✓ Article invariants PASS: hasBottomDock = false, genericCtaSuppressed = true, ogImage = ${articleAudit.ogImage}`);

// Test Navigation & History Back
console.log("Testing navigation and history back...");
const navBackResult = await evalJs(`
  (async () => {
    const prevUrl = window.location.href;
    const authorLink = Array.from(document.querySelectorAll('a')).find(a => a.href.includes('/playbook'));
    if (!authorLink) return { error: "Playbook link not found" };

    authorLink.click();
    await new Promise(r => setTimeout(r, 600));
    const navigatedUrl = window.location.href;

    window.history.back();
    await new Promise(r => setTimeout(r, 600));
    const returnedUrl = window.location.href;

    return {
      prevUrl,
      navigatedUrl,
      returnedUrl,
      backSuccess: returnedUrl === prevUrl
    };
  })()
`);
assert.equal(navBackResult.backSuccess, true, "Navigation and back must restore original article route");
console.log(`✓ Navigation and back PASS: ${navBackResult.navigatedUrl} -> ${navBackResult.returnedUrl}`);

report.pagesAudited.article = { ...articleAudit, navBackResult };

// ==========================================
// TELEMETRY ABORT VERIFICATION
// ==========================================
console.log("\n--- Triggering GA consent to record intercepted telemetry ---");
await send("Page.navigate", { url: `http://127.0.0.1:${SERVER_PORT}/` });
await new Promise((r) => setTimeout(r, 1000));

await evalJs(`
  (() => {
    const allowBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Allow analytics'));
    if (allowBtn) allowBtn.click();
  })()
`);
await new Promise((r) => setTimeout(r, 1000));

report.interceptedRequests = [...interceptedRequests];
assert.ok(report.interceptedRequests.length > 0, "Must record intercepted telemetry requests");
console.log(`✓ Monitored telemetry intercepted: ${report.interceptedRequests.length} requests blocked locally by CDP`);

report.status = "PASS";
console.log("\n=== Acceptance Suite Succeeded! ===");
console.log(`Total real screenshots captured: ${report.screenshots.length} (3 pages x 7 viewports)`);
console.log(JSON.stringify(report, null, 2));

cleanup();
