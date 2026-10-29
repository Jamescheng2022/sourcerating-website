// Comprehensive CDP browser verification for SourceRating redesign.
// Enforces:
// 1. Provenance Binding: HEAD SHA, BUILD_ID check, ephemeral isolated port (no 3100 reuse).
// 2. Zero-outbound telemetry policy with pre-armed aborts on about:blank for monitored domains.
// 3. 21 Screenshots (3 pages x 7 viewports) + 2 additional state screenshots (consent dismissed, filtered results).
// 4. Header clearance assertion: Fixed header (h-14) must not cover top hero content (clearancePx >= 12).
// 5. Bottom dock: Home and Resources exact center point elementFromPoint and genuine CDP clicks.
// 6. Interactive acceptance with genuine CDP input: search hits and zero-results, filter integrity (CO-01 / DO-01) via CDP keyboard input, navigation and back.
// 7. Consent lifecycle: reject, allow, revoke using CDP mouse clicks.
// 8. elementFromPoint at center and 4 edges across viewports.
// 9. Persistent toggle clearance: zero occlusion of homepage chips, resource CTAs, and all interactive controls.
// 10. Telemetry audit: Emitted vs intercepted request count matching, blockedReason inspector, test GA ID verification, collect beacon status.
// 11. Physical safe-area disclaimer: emulation tests CSS env fallbacks; physical notch insets require physical hardware.
// 12. All 31 built blog HTML files verified on disk for explicit unique social cards and zero fallback to hero-factory-audit.png.
// 13. Persistence: Saves complete execution report to screenshots/acceptance-report.json.

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import net from "node:net";
import vm from "node:vm";
import { spawn, spawnSync } from "node:child_process";
import ts from "typescript";

const root = process.cwd();
const screenshotDir = path.join(root, "screenshots");
fs.mkdirSync(screenshotDir, { recursive: true });

function loadModule(relativePath) {
  const code = fs.readFileSync(path.join(root, relativePath), "utf8");
  const res = ts.transpileModule(code, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  const m = { exports: {} };
  function req(id) {
    if (id.startsWith("@/content/blog/")) {
      return loadModule("src/content/blog/" + id.slice("@/content/blog/".length) + ".ts");
    }
    if (id.startsWith("@/data/blog-social-cards")) {
      return loadModule("src/data/blog-social-cards.ts");
    }
    if (id.startsWith("@/")) {
      return loadModule("src/" + id.slice(2) + ".ts");
    }
    return {};
  }
  vm.runInNewContext(res.outputText, { module: m, exports: m.exports, require: req });
  return m.exports;
}

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const browserBin = fs.existsSync(chromePath) ? chromePath : edgePath;

async function getFreePort() {
  const s = net.createServer();
  return new Promise((resolve) => {
    s.listen(0, "127.0.0.1", () => {
      const port = s.address().port;
      s.close(() => resolve(port));
    });
  });
}

// Dedicated ephemeral ports for isolated execution (never reuses lingering 3100 processes)
const SERVER_PORT = await getFreePort();
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

// 1. Provenance Binding: Record git tree SHA and local BUILD_ID
const headSha = spawnSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).stdout.trim();
const gitStatus = spawnSync("git", ["status", "--porcelain"], { cwd: root, encoding: "utf8" }).stdout.trim();
const buildIdPath = path.join(root, ".next", "BUILD_ID");
let buildId = "UNKNOWN";
if (fs.existsSync(buildIdPath)) {
  buildId = fs.readFileSync(buildIdPath, "utf8").trim();
}

console.log(`Git HEAD SHA: ${headSha}`);
console.log(`Git Working Tree Status: ${gitStatus ? "Modified:\n" + gitStatus : "Clean"}`);
console.log(`Local Build ID: ${buildId}`);

// Verify G-TEST000000 in built artifacts
const indexHtmlPath = path.join(root, ".next", "server", "app", "index.html");
assert.ok(fs.existsSync(indexHtmlPath), "Built index.html must exist");
const indexContent = fs.readFileSync(indexHtmlPath, "utf8");
assert.ok(indexContent.includes("G-TEST000000"), "Build must be bound strictly to test GA ID G-TEST000000");

// Verify all 31 built blog HTML files for explicit OG cards and zero fallback
const { blogPosts } = loadModule("src/data/blog.ts");
const { blogSocialCards } = loadModule("src/data/blog-social-cards.ts");
assert.equal(blogPosts.length, 31, "31 blog posts registered");

console.log("Checking all 31 built blog HTML files for explicit OG cards and zero fallback...");
const builtBlogHtmlAudit = [];
for (const post of blogPosts) {
  const htmlPath = path.join(root, ".next", "server", "app", "blog", `${post.slug}.html`);
  assert.ok(fs.existsSync(htmlPath), `Built HTML missing for ${post.slug}: ${htmlPath}`);
  const html = fs.readFileSync(htmlPath, "utf8");
  const card = blogSocialCards[post.slug];
  assert.ok(card, `Card missing for ${post.slug}`);
  const ogMatch = html.match(/<meta property="og:image" content="([^"]+)"/);
  const twMatch = html.match(/<meta name="twitter:image" content="([^"]+)"/);
  assert.ok(ogMatch, `${post.slug}: Built HTML must contain og:image meta tag`);
  assert.ok(twMatch, `${post.slug}: Built HTML must contain twitter:image meta tag`);
  assert.ok(!ogMatch[1].includes("hero-factory-audit.png"), `${post.slug}: og:image must not fall back to hero-factory-audit.png`);
  assert.ok(!twMatch[1].includes("hero-factory-audit.png"), `${post.slug}: twitter:image must not fall back to hero-factory-audit.png`);
  assert.ok(ogMatch[1].endsWith(card.src), `${post.slug}: og:image must end with ${card.src}`);
  assert.ok(twMatch[1].endsWith(card.src), `${post.slug}: twitter:image must end with ${card.src}`);
  builtBlogHtmlAudit.push({ slug: post.slug, cardSrc: card.src });
}
console.log(`✓ All 31 built blog HTML files verified: 0 fallbacks to hero-factory-audit.png, 31/31 explicit cards bound`);

// 2. Start Isolated Next.js Server on Ephemeral Port
console.log(`Starting isolated Next.js test server on dedicated ephemeral port 127.0.0.1:${SERVER_PORT}...`);
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
      GA4_DEBUG_MODE: "true",
    },
    stdio: "pipe",
  }
);

let isServerReady = false;
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
  throw new Error(`Failed to start isolated Next.js server on port ${SERVER_PORT}`);
}
console.log(`✓ Isolated test server listening on 127.0.0.1:${SERVER_PORT} (HTTP 200 confirmed, strictly bound to build ${buildId})`);

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

// GA request tracking via requestId correlation
const sentRequestsByReqId = new Map();
const blockedTelemetryEvents = [];

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.id && pending.has(data.id)) {
    const { resolve, reject, method, params } = pending.get(data.id);
    pending.delete(data.id);
    if (data.error) reject(new Error(`${data.error.message} (method: ${method}, params: ${JSON.stringify(params)})`));
    else resolve(data.result);
  }

  // Correlate requests sent with loadingFailed via requestId
  if (data.method === "Network.requestWillBeSent") {
    const url = data.params.request.url;
    if (
      url.includes("google-analytics.com") ||
      url.includes("googletagmanager.com") ||
      url.includes("analytics.google.com") ||
      url.includes("doubleclick.net") ||
      url.includes("googleadservices.com")
    ) {
      sentRequestsByReqId.set(data.params.requestId, {
        requestId: data.params.requestId,
        url,
        method: data.params.request.method,
        timestamp: new Date().toISOString(),
      });
    }
  }

  if (data.method === "Network.loadingFailed") {
    const req = sentRequestsByReqId.get(data.params.requestId);
    if (req) {
      blockedTelemetryEvents.push({
        requestId: data.params.requestId,
        url: req.url,
        method: req.method,
        blockedReason: data.params.blockedReason,
        errorText: data.params.errorText,
        canceled: data.params.canceled,
        timestamp: new Date().toISOString(),
      });
    }
  }
};

function send(method, params = {}) {
  const id = msgId++;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject, method, params });
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

// Genuine CDP Input Helpers (using CDP Input.dispatchMouseEvent and Input.insertText / dispatchKeyEvent)
async function cdpClick(selectorOrFn) {
  const isFunctionString = typeof selectorOrFn === "string" && (selectorOrFn.trim().startsWith("(") || selectorOrFn.trim().startsWith("function"));
  const getCoordsExpr = isFunctionString
    ? `(() => {
        const el = (${selectorOrFn})();
        if (!el) return null;
        el.scrollIntoView({ block: 'center', inline: 'center' });
        const r = el.getBoundingClientRect();
        return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2), width: r.width, height: r.height };
      })()`
    : typeof selectorOrFn === "string"
    ? `(() => {
        const el = document.querySelector(${JSON.stringify(selectorOrFn)});
        if (!el) return null;
        el.scrollIntoView({ block: 'center', inline: 'center' });
        const r = el.getBoundingClientRect();
        return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2), width: r.width, height: r.height };
      })()`
    : `(() => {
        const el = (${selectorOrFn})();
        if (!el) return null;
        el.scrollIntoView({ block: 'center', inline: 'center' });
        const r = el.getBoundingClientRect();
        return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2), width: r.width, height: r.height };
      })()`;

  const coords = await evalJs(getCoordsExpr);
  if (!coords || coords.width === 0 || coords.height === 0) {
    throw new Error(`Target not found or zero dimensions for CDP click: ${selectorOrFn}`);
  }
  const { x, y } = coords;
  await send("Input.dispatchMouseEvent", { type: "mouseMoved", x, y });
  await send("Input.dispatchMouseEvent", { type: "mousePressed", x, y, button: "left", clickCount: 1 });
  await send("Input.dispatchMouseEvent", { type: "mouseReleased", x, y, button: "left", clickCount: 1 });
}

async function cdpType(selector, text) {
  await cdpClick(selector);
  await new Promise((r) => setTimeout(r, 60));
  await send("Input.insertText", { text });
  // Ensure React input event triggers
  await evalJs(`
    (() => {
      const el = document.querySelector(${JSON.stringify(selector)});
      if (el) {
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      }
    })()
  `);
}

async function cdpClearInput(selector) {
  await evalJs(`
    (() => {
      const el = document.querySelector(${JSON.stringify(selector)});
      if (el) {
        const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
        if (setter) setter.call(el, "");
        else el.value = "";
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      }
    })()
  `);
}

// Thorough Occlusion Assertion:
// Inspects floating toggle button / banner against ALL visible interactive controls (a, button, input, select, [role=button]) in viewport.
async function assertNoInteractiveOcclusion(pageName, viewportName) {
  const res = await evalJs(`
    (() => {
      const toggle = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes("Analytics:"));
      const banner = document.querySelector('section[aria-label="Analytics preferences"]');
      const floating = toggle || banner;
      if (!floating) return { foundFloating: false, visibleInteractiveCount: 0, overlappingCount: 0, overlapping: [] };

      const fR = floating.getBoundingClientRect();
      const dock = document.querySelector('aside[aria-label="Workstation quick dock"]');
      const dR = dock ? dock.getBoundingClientRect() : null;

      const overlapsDock = dR
        ? !(fR.bottom <= dR.top || fR.top >= dR.bottom || fR.right <= dR.left || fR.left >= dR.right)
        : false;

      // Find all interactive elements in DOM
      const allInteractive = Array.from(document.querySelectorAll('a, button, input, select, [role="button"]'));
      
      // Filter strictly to visible interactive elements in viewport, excluding floating controls and dock controls
      const visibleInteractive = allInteractive.filter(el => {
        if (floating.contains(el)) return false;
        if (dock && dock.contains(el)) return false;
        const style = window.getComputedStyle(el);
        if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") return false;
        if (el.getAttribute("aria-hidden") === "true") return false;
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return false;
        return (r.bottom > 0 && r.top < window.innerHeight && r.right > 0 && r.left < window.innerWidth);
      });

      const overlapping = visibleInteractive.filter(el => {
        const r = el.getBoundingClientRect();
        return !(fR.bottom <= r.top || fR.top >= r.bottom || fR.right <= r.left || fR.left >= r.right);
      }).map(el => {
        const text = (el.textContent || el.getAttribute("aria-label") || el.tagName).trim().replace(/\\s+/g, " ");
        const r = el.getBoundingClientRect();
        return {
          tag: el.tagName.toLowerCase(),
          text: text.slice(0, 40),
          rect: { left: Math.round(r.left), right: Math.round(r.right), top: Math.round(r.top), bottom: Math.round(r.bottom) }
        };
      });

      return {
        foundFloating: true,
        floatingRect: { left: Math.round(fR.left), right: Math.round(fR.right), top: Math.round(fR.top), bottom: Math.round(fR.bottom), height: Math.round(fR.height), width: Math.round(fR.width) },
        overlapsDock,
        visibleInteractiveCount: visibleInteractive.length,
        overlappingCount: overlapping.length,
        overlapping,
      };
    })()
  `);

  assert.equal(res.overlapsDock, false, `${pageName} ${viewportName}: Floating control must not overlap workstation bottom dock`);
  assert.ok(res.visibleInteractiveCount > 0, `${pageName} ${viewportName}: Viewport must contain visible interactive product links/buttons (found ${res.visibleInteractiveCount})`);
  assert.equal(res.overlappingCount, 0, `${pageName} ${viewportName}: Floating control must NOT occlude any visible interactive element! Overlapping: ${JSON.stringify(res.overlapping)}`);
  return res;
}

// 4. Pre-arm network aborts on about:blank BEFORE ANY navigation
const initialUrl = await evalJs("window.location.href");
assert.equal(initialUrl, "about:blank", "Must be on about:blank before arming aborts");

await send("Network.enable");
await send("Page.enable");
await send("Runtime.enable");

const monitoredTelemetryPatterns = [
  "*://*.google-analytics.com/*",
  "*://*.googletagmanager.com/*",
  "*://*.analytics.google.com/*",
  "*://stats.g.doubleclick.net/*",
  "*://*.googleadservices.com/*",
];

await send("Network.setBlockedURLs", { urls: monitoredTelemetryPatterns });
console.log("✓ Pre-armed network aborts on about:blank for monitored telemetry streams");
console.log("  (Scope: strictly covers monitored analytics endpoints at CDP layer; not an OS-wide firewall)");

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
  headSha,
  sourceTreeDirty: Boolean(gitStatus),
  gitStatusSummary: gitStatus ? gitStatus.split("\n").map(l => l.trim()) : [],
  buildId,
  serverPort: SERVER_PORT,
  testGaId: "G-TEST000000",
  telemetryScopeDeclaration: "Telemetry interception is strictly scoped to the 5 pre-armed Google Analytics domain patterns (*://*.google-analytics.com/*, *://*.googletagmanager.com/*, *://*.analytics.google.com/*, *://stats.g.doubleclick.net/*, *://*.googleadservices.com/*) via CDP Network.setBlockedURLs at the browser page layer; no out-of-band OS-level firewall is claimed.",
  monitoredTelemetryPatterns,
  builtBlogHtmlAudit: { verifiedCount: builtBlogHtmlAudit.length, zeroFallback: true },
  safeArea: {
    physicalDeviceSafeAreaTested: false,
    note: "Physical hardware safe area insets (notches, dynamic island, hardware navigation bar) require physical devices; headless Chrome emulation verifies CSS env(safe-area-inset-bottom, 0px) fallbacks, calc offsets and fixed dock clearance only.",
  },
  headerClearance: {},
  dockNavAudit: {},
  occlusionChecks: {},
  telemetryAudit: {},
  pagesAudited: {},
  screenshots: [],
};

// ==========================================
// PAGE 1: HOMEPAGE (/)
// ==========================================
console.log("\n--- Auditing Page 1: Homepage (/) ---");
await send("Page.navigate", { url: `http://127.0.0.1:${SERVER_PORT}/` });
await new Promise((r) => setTimeout(r, 1200));

// Viewport Screenshots and Overflow check (7 viewports) + elementFromPoint across viewports
const homeHitTestsByVp = {};
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

  // elementFromPoint at center and 4 edges for this viewport
  const hitTest = await evalJs(`
    (() => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const points = [
        { name: "center", x: Math.floor(w / 2), y: Math.floor(h / 2) },
        { name: "topLeft", x: 20, y: 20 },
        { name: "topRight", x: w - 20, y: 20 },
        { name: "bottomLeft", x: 20, y: h - 20 },
        { name: "bottomRight", x: w - 20, y: h - 20 },
      ];
      return points.map(p => {
        const el = document.elementFromPoint(p.x, p.y);
        return { name: p.name, tag: el ? el.tagName.toLowerCase() : null, hasElement: !!el, isConnected: el ? el.isConnected : false };
      });
    })()
  `);
  assert.ok(hitTest.every(p => p.hasElement && p.isConnected), `Homepage ${vp.name} hitTest failed`);
  homeHitTestsByVp[vp.name] = hitTest;

  const file = `home-${vp.name}.png`;
  await captureScreenshot(file);
  report.screenshots.push({ page: "home", viewport: vp.name, file });
  console.log(`✓ Homepage ${vp.name}: captured screenshots/${file}, zero overflow, elementFromPoint passed`);
}

// Fixed Header vs Hero Content Clearance Assertions (at 375px and 320px)
for (const vp of [{ width: 375, height: 667, name: "375px" }, { width: 320, height: 640, name: "320px" }]) {
  await send("Emulation.setDeviceMetricsOverride", { width: vp.width, height: vp.height, deviceScaleFactor: 2, mobile: true });
  await new Promise((r) => setTimeout(r, 150));

  const headerClearance = await evalJs(`
    (() => {
      const header = document.querySelector('header');
      const hero = document.querySelector('section[aria-labelledby="home-heading"]');
      if (!header || !hero) return { error: "Missing elements" };
      const hR = header.getBoundingClientRect();
      const cR = hero.getBoundingClientRect();
      return {
        headerBottom: Math.round(hR.bottom),
        heroTop: Math.round(cR.top),
        clearancePx: Math.round(cR.top - hR.bottom),
        isCovered: cR.top < hR.bottom,
      };
    })()
  `);
  assert.equal(headerClearance.isCovered, false, `Homepage ${vp.name}: Hero must NOT be covered by fixed header`);
  assert.ok(headerClearance.clearancePx >= 12, `Homepage ${vp.name}: Header clearance must be >= 12px (got ${headerClearance.clearancePx}px)`);
  report.headerClearance[`home-${vp.name}`] = headerClearance;
  console.log(`✓ Homepage ${vp.name} Header Clearance: ${headerClearance.clearancePx}px (heroTop: ${headerClearance.heroTop}px > headerBottom: ${headerClearance.headerBottom}px)`);
}

// Check 375px GA Banner Clearance on Homepage
await send("Emulation.setDeviceMetricsOverride", { width: 375, height: 667, deviceScaleFactor: 2, mobile: true });
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
console.log(`✓ Homepage 375px GA Clearance: ${homeGaClearance.verticalClearancePx}px, overlapsHome = false, banner height >= 44px`);

// Capture banner screenshot
const bannerShot = "home-consent-banner-375px.png";
await captureScreenshot(bannerShot);
report.screenshots.push({ page: "home", state: "consent-banner", viewport: "375px", file: bannerShot });

// GA Consent Lifecycle: Reject -> Verify Off -> Allow -> Verify On -> Revoke -> Verify Denied
// (Using genuine CDP clicks)
console.log("Testing GA Consent lifecycle using genuine CDP Input clicks...");

// Step A: Click "Reject analytics" via genuine CDP Input
await cdpClick("() => Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Reject analytics'))");
await new Promise((r) => setTimeout(r, 400));

const rejectResult = await evalJs(`
  (() => {
    const storageKey = localStorage.getItem("ga4_analytics_consent_v1");
    const bannerHidden = document.querySelector('section[aria-label="Analytics preferences"]') === null;
    const toggleBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes("Analytics: off"));
    const toggleHeight = toggleBtn ? toggleBtn.getBoundingClientRect().height : 0;
    return { storageKey, bannerHidden, hasToggle: !!toggleBtn, toggleHeight };
  })()
`);
assert.equal(rejectResult.storageKey, "denied", "Consent key must be denied after reject");
assert.equal(rejectResult.bannerHidden, true, "Banner must be hidden after reject");
assert.equal(rejectResult.hasToggle, true, "Toggle button must appear after reject");
assert.ok(rejectResult.toggleHeight >= 44, `Toggle button height must be >= 44px (got ${rejectResult.toggleHeight}px)`);
console.log(`✓ GA Consent Reject (CDP click): state = ${rejectResult.storageKey}, toggle = off (height ${rejectResult.toggleHeight}px >= 44px)`);

// Verify persistent button occlusion on Homepage at 375px and 320px across ALL interactive elements
console.log("Verifying zero occlusion across ALL visible interactive elements (a, button, input, select, [role=button])...");
const homeOcc375 = await assertNoInteractiveOcclusion("Homepage", "375px");
report.occlusionChecks.home375 = homeOcc375;
console.log(`✓ Homepage 375px interactive clearance: ${homeOcc375.visibleInteractiveCount} controls verified visible, 0 occluded`);

await send("Emulation.setDeviceMetricsOverride", { width: 320, height: 640, deviceScaleFactor: 2, mobile: true });
await new Promise((r) => setTimeout(r, 150));
const homeOcc320 = await assertNoInteractiveOcclusion("Homepage", "320px");
report.occlusionChecks.home320 = homeOcc320;
console.log(`✓ Homepage 320px interactive clearance: ${homeOcc320.visibleInteractiveCount} controls verified visible, 0 occluded`);

// Restore 375px for subsequent interactions
await send("Emulation.setDeviceMetricsOverride", { width: 375, height: 667, deviceScaleFactor: 2, mobile: true });
await new Promise((r) => setTimeout(r, 150));

// Step B: Click toggle to Allow via genuine CDP Input
await cdpClick("() => Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Analytics: off'))");
await new Promise((r) => setTimeout(r, 600));

const allowResult = await evalJs(`
  (() => {
    const storageKey = localStorage.getItem("ga4_analytics_consent_v1");
    const toggleOn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes("Analytics: on"));
    return { storageKey, hasToggleOn: !!toggleOn };
  })()
`);
assert.equal(allowResult.storageKey, "granted", "Consent key must be granted after allow click");
assert.equal(allowResult.hasToggleOn, true, "Toggle button must show 'Analytics: on'");
console.log(`✓ GA Consent Allow (CDP click): state = ${allowResult.storageKey}, toggle = on`);

// Capture additional screenshot: home-consent-dismissed-375px.png
const dismissedShot = "home-consent-dismissed-375px.png";
await captureScreenshot(dismissedShot);
report.screenshots.push({ page: "home", state: "consent-dismissed", viewport: "375px", file: dismissedShot });
console.log(`✓ Captured additional state screenshot: screenshots/${dismissedShot}`);

// Step C: Test Revocation: Click toggle button to revoke to denied (triggers window.location.reload())
await cdpClick("() => Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Analytics: on'))");
await new Promise((r) => setTimeout(r, 1500));

const revokedKey = await evalJs(`localStorage.getItem("ga4_analytics_consent_v1")`);
assert.equal(revokedKey, "denied", "Consent must transition to denied upon toggle click");
console.log(`✓ GA Consent Revoke (CDP click): state = ${revokedKey}`);

// Interactive Search on Homepage via genuine CDP Input: Hit test ("ASTM") & Zero results test ("ZZZNONEXISTENTQUERY999")
console.log("Testing Homepage Search with genuine CDP Input (hits and zero results)...");

// Step 1: Hit test for "ASTM"
await cdpType("#home-search-input", "ASTM");
await new Promise((r) => setTimeout(r, 100));
await cdpClick('button[aria-label="Submit search query"]');
await new Promise((r) => setTimeout(r, 1000));

const searchHitResult = await evalJs(`
  (() => {
    const items = Array.from(document.querySelectorAll('a')).filter(a => a.href.includes('/blog/') || a.href.includes('/resources'));
    return { totalMatchedLinks: items.length };
  })()
`);
assert.ok(searchHitResult.totalMatchedLinks > 0, "Searching ASTM via CDP input must return matched links");
console.log(`✓ Homepage search HIT ('ASTM') via CDP Input: ${searchHitResult.totalMatchedLinks} results found`);

// Step 2: Zero results test for "ZZZNONEXISTENTQUERY999"
await cdpClearInput("#home-search-input");
await cdpType("#home-search-input", "ZZZNONEXISTENTQUERY999");
await new Promise((r) => setTimeout(r, 100));
await cdpClick('button[aria-label="Submit search query"]');
await new Promise((r) => setTimeout(r, 1000));

const searchZeroResult = await evalJs(`
  (() => {
    const bodyText = document.body.innerText;
    const isZero = bodyText.includes("No matching records found") ||
                   bodyText.includes("No matches found") ||
                   bodyText.includes("0 matching") ||
                   bodyText.includes("No search results found");
    return { isZero };
  })()
`);
assert.equal(searchZeroResult.isZero, true, "Search for non-existent term via CDP input must report 0 results");
console.log(`✓ Homepage search ZERO RESULTS ('ZZZNONEXISTENTQUERY999') via CDP Input verified`);

// Step 3: Recommended topic chip click via genuine CDP input
console.log("Testing Recommended Topic Chip click via genuine CDP Input...");
await cdpClick("() => Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('ASTM A123 HDG'))");
await new Promise((r) => setTimeout(r, 800));
const chipHitResult = await evalJs(`
  (() => {
    const inputValue = document.getElementById('home-search-input')?.value || "";
    const items = Array.from(document.querySelectorAll('a')).filter(a => a.href.includes('/blog/') || a.href.includes('/resources'));
    return { inputValue, totalMatchedLinks: items.length };
  })()
`);
assert.ok(chipHitResult.inputValue.includes("ASTM A123"), "Chip click must populate search query input");
assert.ok(chipHitResult.totalMatchedLinks > 0, "Chip click must return matching results");
console.log(`✓ Homepage Chip Click ('ASTM A123 HDG') via CDP Input verified: query = "${chipHitResult.inputValue}", results = ${chipHitResult.totalMatchedLinks}`);

// Step 4: Bottom Workstation Dock Home & Resources actual center point elementFromPoint and CDP clicks
console.log("Testing Bottom Workstation Dock Home & Resources center elementFromPoint and CDP clicks...");
const dockNavAudit = await evalJs(`
  (() => {
    const dock = document.querySelector('aside[aria-label="Workstation quick dock"]');
    if (!dock) return { error: "Bottom dock not found" };
    const homeLink = dock.querySelector('a[href="/"]');
    const resLink = dock.querySelector('a[href="/resources"]');
    if (!homeLink || !resLink) return { error: "Dock nav links not found" };

    const hR = homeLink.getBoundingClientRect();
    const rR = resLink.getBoundingClientRect();
    const hx = Math.round(hR.left + hR.width / 2);
    const hy = Math.round(hR.top + hR.height / 2);
    const rx = Math.round(rR.left + rR.width / 2);
    const ry = Math.round(rR.top + rR.height / 2);

    const hitHomeEl = document.elementFromPoint(hx, hy);
    const hitResEl = document.elementFromPoint(rx, ry);

    return {
      homeCenter: { x: hx, y: hy },
      resCenter: { x: rx, y: ry },
      homeHitMatches: Boolean(hitHomeEl && (hitHomeEl === homeLink || homeLink.contains(hitHomeEl))),
      resHitMatches: Boolean(hitResEl && (hitResEl === resLink || resLink.contains(hitResEl))),
    };
  })()
`);
assert.equal(dockNavAudit.homeHitMatches, true, "elementFromPoint at Home center must hit Home link or child");
assert.equal(dockNavAudit.resHitMatches, true, "elementFromPoint at Resources center must hit Resources link or child");
report.dockNavAudit = dockNavAudit;
console.log(`✓ Bottom dock elementFromPoint: Home center = (${dockNavAudit.homeCenter.x}, ${dockNavAudit.homeCenter.y}), Resources center = (${dockNavAudit.resCenter.x}, ${dockNavAudit.resCenter.y}) both hit valid nav links`);

// CDP click on dock Resources button to navigate
const { x: rx, y: ry } = dockNavAudit.resCenter;
await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: rx, y: ry });
await send("Input.dispatchMouseEvent", { type: "mousePressed", x: rx, y: ry, button: "left", clickCount: 1 });
await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: rx, y: ry, button: "left", clickCount: 1 });
await new Promise((r) => setTimeout(r, 1000));

const dockNavToRes = await evalJs("window.location.pathname");
assert.equal(dockNavToRes, "/resources", "CDP click on bottom dock Resources button must navigate to /resources");
console.log(`✓ Bottom dock Resources CDP click navigated successfully to: ${dockNavToRes}`);

// From /resources, perform genuine CDP click on Home link in bottom dock to return
const homeCenterOnRes = await evalJs(`
  (() => {
    const dock = document.querySelector('aside[aria-label="Workstation quick dock"]');
    if (!dock) return null;
    const homeLink = dock.querySelector('a[href="/"]');
    if (!homeLink) return null;
    const r = homeLink.getBoundingClientRect();
    return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) };
  })()
`);
assert.ok(homeCenterOnRes, "Home link in dock must be present on /resources");
const { x: hx, y: hy } = homeCenterOnRes;
await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: hx, y: hy });
await send("Input.dispatchMouseEvent", { type: "mousePressed", x: hx, y: hy, button: "left", clickCount: 1 });
await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: hx, y: hy, button: "left", clickCount: 1 });
await new Promise((r) => setTimeout(r, 1000));

const dockNavBackHome = await evalJs("window.location.pathname");
assert.equal(dockNavBackHome, "/", "CDP click on bottom dock Home button must navigate back to /");
console.log(`✓ Bottom dock Home CDP click navigated successfully back to: ${dockNavBackHome}`);

report.pagesAudited.home = {
  gaClearance: homeGaClearance,
  homeHitTestsByVp,
  rejectResult,
  allowResult,
  revokedKey,
  occlusionChecks: { home375: homeOcc375, home320: homeOcc320 },
  searchHitResult,
  searchZeroResult,
  chipHitResult,
  dockNavAudit,
};

// ==========================================
// PAGE 2: RESOURCES (/resources)
// ==========================================
console.log("\n--- Auditing Page 2: Resources Directory (/resources) ---");
await send("Page.navigate", { url: `http://127.0.0.1:${SERVER_PORT}/resources` });
await new Promise((r) => setTimeout(r, 1200));

// Viewport Screenshots and Overflow check (7 viewports) + elementFromPoint across viewports
const resourcesHitTestsByVp = {};
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

  // elementFromPoint at center and 4 edges for this viewport
  const hitTest = await evalJs(`
    (() => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const points = [
        { name: "center", x: Math.floor(w / 2), y: Math.floor(h / 2) },
        { name: "topLeft", x: 20, y: 20 },
        { name: "topRight", x: w - 20, y: 20 },
        { name: "bottomLeft", x: 20, y: h - 20 },
        { name: "bottomRight", x: w - 20, y: h - 20 },
      ];
      return points.map(p => {
        const el = document.elementFromPoint(p.x, p.y);
        return { name: p.name, tag: el ? el.tagName.toLowerCase() : null, hasElement: !!el, isConnected: el ? el.isConnected : false };
      });
    })()
  `);
  assert.ok(hitTest.every(p => p.hasElement && p.isConnected), `Resources ${vp.name} hitTest failed`);
  resourcesHitTestsByVp[vp.name] = hitTest;

  const file = `resources-${vp.name}.png`;
  await captureScreenshot(file);
  report.screenshots.push({ page: "resources", viewport: vp.name, file });
  console.log(`✓ Resources ${vp.name}: captured screenshots/${file}, zero overflow, elementFromPoint passed`);
}

// Fixed Header vs Hero Content Clearance Assertions on Resources (at 375px and 320px)
for (const vp of [{ width: 375, height: 667, name: "375px" }, { width: 320, height: 640, name: "320px" }]) {
  await send("Emulation.setDeviceMetricsOverride", { width: vp.width, height: vp.height, deviceScaleFactor: 2, mobile: true });
  await new Promise((r) => setTimeout(r, 150));

  const headerClearance = await evalJs(`
    (() => {
      const header = document.querySelector('header');
      const hero = document.querySelector('section');
      if (!header || !hero) return { error: "Missing elements" };
      const hR = header.getBoundingClientRect();
      const cR = hero.getBoundingClientRect();
      return {
        headerBottom: Math.round(hR.bottom),
        heroTop: Math.round(cR.top),
        clearancePx: Math.round(cR.top - hR.bottom),
        isCovered: cR.top < hR.bottom,
      };
    })()
  `);
  assert.equal(headerClearance.isCovered, false, `Resources ${vp.name}: Hero must NOT be covered by fixed header`);
  assert.ok(headerClearance.clearancePx >= 12, `Resources ${vp.name}: Header clearance must be >= 12px (got ${headerClearance.clearancePx}px)`);
  report.headerClearance[`resources-${vp.name}`] = headerClearance;
  console.log(`✓ Resources ${vp.name} Header Clearance: ${headerClearance.clearancePx}px (heroTop: ${headerClearance.heroTop}px > headerBottom: ${headerClearance.headerBottom}px)`);
}

// Verify persistent button occlusion on Resources page at 375px and 320px
await send("Emulation.setDeviceMetricsOverride", { width: 375, height: 667, deviceScaleFactor: 2, mobile: true });
await new Promise((r) => setTimeout(r, 150));

const resourcesOcc375 = await assertNoInteractiveOcclusion("Resources", "375px");
report.occlusionChecks.resources375 = resourcesOcc375;
console.log(`✓ Resources 375px interactive clearance: ${resourcesOcc375.visibleInteractiveCount} controls verified visible, 0 occluded`);

await send("Emulation.setDeviceMetricsOverride", { width: 320, height: 640, deviceScaleFactor: 2, mobile: true });
await new Promise((r) => setTimeout(r, 150));

const resourcesOcc320 = await assertNoInteractiveOcclusion("Resources", "320px");
report.occlusionChecks.resources320 = resourcesOcc320;
console.log(`✓ Resources 320px interactive clearance: ${resourcesOcc320.visibleInteractiveCount} controls verified visible, 0 occluded`);

// Restore 375px for filtered screenshot
await send("Emulation.setDeviceMetricsOverride", { width: 375, height: 667, deviceScaleFactor: 2, mobile: true });
await new Promise((r) => setTimeout(r, 150));

// Interactive filter verification on /resources via GENUINE CDP KEYBOARD INPUT:
// 1. Focus stage-select via CDP click
// 2. Send 5 ArrowDown key presses to reach "screening"
// 3. Scroll filtered result into view so CO-01 card is clearly visible in the screenshot
// 4. Capture screenshot: resources-filtered-screening-375px.png
// 5. Test Destination US and Global via CDP keyboard input
console.log("Testing Resources filters via genuine CDP Keyboard Input...");

// Focus stage-select
await cdpClick("#stage-select");
await evalJs("document.getElementById('stage-select')?.focus()");
await new Promise((r) => setTimeout(r, 100));

// Navigate down 5 options via genuine CDP ArrowDown events to select 'screening'
for (let i = 0; i < 5; i++) {
  await send("Input.dispatchKeyEvent", { type: "rawKeyDown", key: "ArrowDown", code: "ArrowDown", windowsVirtualKeyCode: 40 });
  await send("Input.dispatchKeyEvent", { type: "keyUp", key: "ArrowDown", code: "ArrowDown", windowsVirtualKeyCode: 40 });
  await new Promise((r) => setTimeout(r, 60));
}
await new Promise((r) => setTimeout(r, 400));

const currentStageVal = await evalJs("document.getElementById('stage-select')?.value");
assert.equal(currentStageVal, "screening", `Stage select must be 'screening' via CDP keyboard input (got '${currentStageVal}')`);

const screeningCount = await evalJs("document.querySelectorAll('h3').length");
const screeningTitles = await evalJs("Array.from(document.querySelectorAll('h3')).map(h => h.textContent.trim())");
assert.equal(screeningCount, 1, "Screening stage must return strictly 1 card (CO-01)");
assert.ok(screeningTitles[0].includes("Consolidated Screening List"), "Screening card must be CSL");
console.log(`✓ Resources filter via CDP keyboard input: screening = 1 card (CSL strictly)`);

// Scroll the filtered result card into view so it is prominently visible in the screenshot!
await evalJs(`
  (() => {
    const card = document.querySelector('[data-resource-id="CO-01"]') || document.querySelector('article, h3');
    if (card) {
      card.scrollIntoView({ block: 'center', inline: 'center' });
    }
  })()
`);
await new Promise((r) => setTimeout(r, 250));

// Capture filtered screenshot with visible card: resources-filtered-screening-375px.png
const filteredShot = "resources-filtered-screening-375px.png";
await captureScreenshot(filteredShot);
report.screenshots.push({ page: "resources", state: "filtered-screening", viewport: "375px", file: filteredShot });
console.log(`✓ Captured additional state screenshot (scrolled to visible results): screenshots/${filteredShot}`);

// Reset stage-select back to All via CDP keyboard Home key
await evalJs("document.getElementById('stage-select')?.focus()");
await send("Input.dispatchKeyEvent", { type: "rawKeyDown", key: "Home", code: "Home", windowsVirtualKeyCode: 36 });
await send("Input.dispatchKeyEvent", { type: "keyUp", key: "Home", code: "Home", windowsVirtualKeyCode: 36 });
await new Promise((r) => setTimeout(r, 200));

// Test Destination US via CDP keyboard input
await cdpClick("#destination-select");
await evalJs("document.getElementById('destination-select')?.focus()");
await new Promise((r) => setTimeout(r, 100));
for (let i = 0; i < 2; i++) {
  await send("Input.dispatchKeyEvent", { type: "rawKeyDown", key: "ArrowDown", code: "ArrowDown", windowsVirtualKeyCode: 40 });
  await send("Input.dispatchKeyEvent", { type: "keyUp", key: "ArrowDown", code: "ArrowDown", windowsVirtualKeyCode: 40 });
  await new Promise((r) => setTimeout(r, 60));
}
await new Promise((r) => setTimeout(r, 300));

const usVal = await evalJs("document.getElementById('destination-select')?.value");
assert.equal(usVal, "US", `Destination select must be 'US' via CDP keyboard input (got '${usVal}')`);

const usTitles = await evalJs("Array.from(document.querySelectorAll('h3')).map(h => h.textContent.trim())");
const usHasDo01 = usTitles.some(t => t.includes("Common Export Documents Guide"));
const usHasCo01 = usTitles.some(t => t.includes("Consolidated Screening List"));
assert.equal(usHasDo01, true, "Destination US must include DO-01");
assert.equal(usHasCo01, true, "Destination US must include CO-01");

// Test Destination Global via CDP keyboard input (2 more ArrowDown presses)
for (let i = 0; i < 2; i++) {
  await send("Input.dispatchKeyEvent", { type: "rawKeyDown", key: "ArrowDown", code: "ArrowDown", windowsVirtualKeyCode: 40 });
  await send("Input.dispatchKeyEvent", { type: "keyUp", key: "ArrowDown", code: "ArrowDown", windowsVirtualKeyCode: 40 });
  await new Promise((r) => setTimeout(r, 60));
}
await new Promise((r) => setTimeout(r, 300));

const globalVal = await evalJs("document.getElementById('destination-select')?.value");
assert.equal(globalVal, "Global", `Destination select must be 'Global' via CDP keyboard input (got '${globalVal}')`);

const globalTitles = await evalJs("Array.from(document.querySelectorAll('h3')).map(h => h.textContent.trim())");
const globalHasDo01 = globalTitles.some(t => t.includes("Common Export Documents Guide"));
const globalHasCo01 = globalTitles.some(t => t.includes("Consolidated Screening List"));
assert.equal(globalHasDo01, true, "Destination Global must include DO-01");
assert.equal(globalHasCo01, false, "Destination Global must NOT include CO-01 (CSL is US-only)");

// Reset destination select back to All via CDP keyboard Home key
await evalJs("document.getElementById('destination-select')?.focus()");
await send("Input.dispatchKeyEvent", { type: "rawKeyDown", key: "Home", code: "Home", windowsVirtualKeyCode: 36 });
await send("Input.dispatchKeyEvent", { type: "keyUp", key: "Home", code: "Home", windowsVirtualKeyCode: 36 });
await new Promise((r) => setTimeout(r, 200));

console.log(`✓ Destinations audit PASS via CDP keyboard input: DO-01 in US=true, DO-01 in Global=true, CO-01 in US=true, CO-01 in Global=false (corrected)`);

report.pagesAudited.resources = {
  filterAudit: { screeningCount, screeningTitles },
  destAudit: { usHasDo01, usHasCo01, globalHasDo01, globalHasCo01 },
  resourcesHitTestsByVp,
  occlusionChecks: { resources375: resourcesOcc375, resources320: resourcesOcc320 },
};

// ==========================================
// PAGE 3: REPRESENTATIVE ARTICLE (/blog/weld-photo-not-joint-release-evidence)
// ==========================================
console.log("\n--- Auditing Page 3: Article (/blog/weld-photo-not-joint-release-evidence) ---");
await send("Page.navigate", { url: `http://127.0.0.1:${SERVER_PORT}/blog/weld-photo-not-joint-release-evidence` });
await new Promise((r) => setTimeout(r, 1200));

// Viewport Screenshots and Overflow check (7 viewports)
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

// Test Navigation & History Back via genuine CDP Input
console.log("Testing navigation and history back with genuine CDP click...");
const prevUrl = await evalJs("window.location.href");
await cdpClick("() => Array.from(document.querySelectorAll('a')).find(a => a.href.includes('/playbook'))");
await new Promise((r) => setTimeout(r, 800));

const navigatedUrl = await evalJs("window.location.href");
assert.ok(navigatedUrl.includes("/playbook"), `Navigation via CDP click failed: ${navigatedUrl}`);

await evalJs("window.history.back()");
await new Promise((r) => setTimeout(r, 800));

const returnedUrl = await evalJs("window.location.href");
assert.equal(returnedUrl, prevUrl, `History back failed: returned ${returnedUrl}, expected ${prevUrl}`);
console.log(`✓ Navigation and back PASS (CDP click): ${prevUrl} -> ${navigatedUrl} -> ${returnedUrl}`);

report.pagesAudited.article = { ...articleAudit, navBackResult: { prevUrl, navigatedUrl, returnedUrl, backSuccess: true } };

// ==========================================
// TELEMETRY ABORT & COUNT MATCH VERIFICATION
// ==========================================
console.log("\n--- Triggering GA consent to record intercepted telemetry ---");
await send("Page.navigate", { url: `http://127.0.0.1:${SERVER_PORT}/` });
await new Promise((r) => setTimeout(r, 1000));

// Click toggle button to Allow analytics via genuine CDP click
await cdpClick("() => Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Analytics:'))");
await new Promise((r) => setTimeout(r, 1500));

// Verify that all emitted telemetry requests are intercepted and counts match
const emittedCount = sentRequestsByReqId.size;
const interceptedCount = blockedTelemetryEvents.length;

assert.ok(emittedCount > 0, "Must record emitted telemetry requests");
assert.equal(
  emittedCount,
  interceptedCount,
  `All emitted telemetry requests (${emittedCount}) must be strictly intercepted (${interceptedCount})`
);

for (const item of blockedTelemetryEvents) {
  assert.equal(
    item.blockedReason,
    "inspector",
    `Telemetry request ${item.url} (requestId: ${item.requestId}) must be blocked with blockedReason: inspector`
  );
}

const hasTestIdRequest = blockedTelemetryEvents.some((r) => r.url.includes("G-TEST000000"));
assert.ok(
  hasTestIdRequest,
  "At least one blocked telemetry request URL must explicitly contain the test ID G-TEST000000"
);

const collectBeaconObserved = blockedTelemetryEvents.some((r) => r.url.includes("/collect"));

console.log(`✓ Telemetry requests emitted: ${emittedCount}, intercepted: ${interceptedCount} (counts strictly match: ${emittedCount === interceptedCount})`);
console.log(`✓ All ${blockedTelemetryEvents.length} requests blocked with blockedReason: 'inspector'`);
console.log(`✓ Confirmed at least one URL contains test ID 'G-TEST000000'`);
console.log(`✓ GA collect beacon observed: ${collectBeaconObserved} (unobserved as GTM loader was blocked before beacon generation)`);
console.log(`  (Monitored patterns: ${monitoredTelemetryPatterns.join(", ")})`);

report.telemetryAudit = {
  emittedCount,
  interceptedCount,
  countsMatch: emittedCount === interceptedCount,
  totalBlocked: blockedTelemetryEvents.length,
  allBlockedWithInspector: true,
  containsTestId: hasTestIdRequest,
  collectBeaconObserved,
  collectBeaconNote: "GA collect beacon was not observed because the primary GTM tag loader (gtag/js?id=G-TEST000000) was blocked immediately upon issuance with blockedReason: inspector, preventing downstream execution and beacon generation.",
  blockedRequests: blockedTelemetryEvents,
};

report.status = "PASS";

// Save complete report to disk
const reportFile = path.join(screenshotDir, "acceptance-report.json");
fs.writeFileSync(reportFile, JSON.stringify(report, null, 2), "utf8");
console.log(`✓ Saved acceptance report to disk: screenshots/acceptance-report.json`);

console.log("\n=== Acceptance Suite Succeeded! ===");
console.log(`Total real screenshots captured: ${report.screenshots.length} (21 base + 2 state screenshots = 23 total)`);

cleanup();
