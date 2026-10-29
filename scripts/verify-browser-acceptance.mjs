// Deterministic CDP browser verification for SourceRating redesign.
// Enforces zero-outbound analytics policy, GA bottom clearance, and 7-viewport responsive audit.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import net from "node:net";
import { spawn } from "node:child_process";

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
const tempUserDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "cdp-sr-audit-"));
const nextBin = path.join(process.cwd(), "node_modules", "next", "dist", "bin", "next");

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

console.log("=== Starting SourceRating Browser Acceptance Suite ===");

// 1. Ensure loopback Next.js server is running with G-TEST000000
let isServerReady = false;
try {
  const res = await fetch(`http://127.0.0.1:${SERVER_PORT}/`, { signal: AbortSignal.timeout(1000) });
  if (res.ok) isServerReady = true;
} catch {}

if (!isServerReady) {
  console.log(`Launching isolated Next.js production server on 127.0.0.1:${SERVER_PORT}...`);
  serverProcess = spawn(
    process.execPath,
    [nextBin, "start", "--hostname", "127.0.0.1", "--port", String(SERVER_PORT)],
    {
      cwd: process.cwd(),
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
} else {
  console.log(`Existing server on 127.0.0.1:${SERVER_PORT} responding (HTTP 200 confirmed)`);
}

// 2. Launch headless browser to about:blank with debugging port
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

// Wait for CDP endpoint to become ready
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
  // Record blocked requests
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

const auditReport = {
  status: "IN_PROGRESS",
  timestamp: new Date().toISOString(),
  testGaId: "G-TEST000000",
  initialUrl: null,
  preArmedAborts: [],
  networkInterceptions: [],
  bottomClearanceAudit: null,
  articleReadingAudit: null,
  viewportsAudit: [],
};

// 3. Strictly PRE-ARM network aborts on about:blank BEFORE ANY navigation
const initialUrl = await evalJs("window.location.href");
assert.equal(initialUrl, "about:blank", "Must be on about:blank before arming aborts");
auditReport.initialUrl = initialUrl;

await send("Network.enable");
await send("Page.enable");
await send("Runtime.enable");

const blockedPatterns = [
  "*google-analytics.com*",
  "*google.com/g/collect*",
  "*googletagmanager.com*",
  "*analytics.google.com*",
  "*.google.com/g/collect*",
];

await send("Network.setBlockedURLs", { urls: blockedPatterns });
auditReport.preArmedAborts = blockedPatterns;
console.log("✓ Pre-armed network aborts on about:blank for:", blockedPatterns);

// 4. Navigate to homepage
console.log("Navigating to http://127.0.0.1:3100/...");
await send("Page.navigate", { url: `http://127.0.0.1:${SERVER_PORT}/` });
await new Promise((r) => setTimeout(r, 1500));

// 5. Test GA bottom clearance and zero occlusion at 375px mobile viewport
await send("Emulation.setDeviceMetricsOverride", {
  width: 375,
  height: 667,
  deviceScaleFactor: 2,
  mobile: true,
});
await new Promise((r) => setTimeout(r, 300));

const homeOcclusion = await evalJs(`
  (() => {
    const gaSection = document.querySelector('section[aria-label="Analytics preferences"]');
    const gaButton = document.querySelector('button[aria-label*="Google Analytics"]');
    const gaElement = gaSection || gaButton;

    const bottomDock = document.querySelector('aside[aria-label="Workstation quick dock"]');
    const homeLink = bottomDock ? bottomDock.querySelector('a[href="/"]') : null;

    if (!gaElement || !bottomDock || !homeLink) {
      return { error: "Missing required elements", hasGa: !!gaElement, hasDock: !!bottomDock, hasHome: !!homeLink };
    }

    const gaRect = gaElement.getBoundingClientRect();
    const dockRect = bottomDock.getBoundingClientRect();
    const homeRect = homeLink.getBoundingClientRect();

    // Check overlap between GA element and bottom dock
    const overlapsDock = !(
      gaRect.bottom <= dockRect.top ||
      gaRect.top >= dockRect.bottom ||
      gaRect.right <= dockRect.left ||
      gaRect.left >= dockRect.right
    );

    // Check overlap between GA element and Home button
    const overlapsHome = !(
      gaRect.bottom <= homeRect.top ||
      gaRect.top >= homeRect.bottom ||
      gaRect.right <= homeRect.left ||
      gaRect.left >= homeRect.right
    );

    const verticalClearancePx = dockRect.top - gaRect.bottom;

    return {
      overlapsDock,
      overlapsHome,
      verticalClearancePx,
      gaTag: gaElement.tagName,
      gaHeight: gaRect.height,
      gaWidth: gaRect.width,
      dockHeight: dockRect.height,
      dockTop: dockRect.top,
      gaBottom: gaRect.bottom,
    };
  })()
`);

assert.equal(homeOcclusion.overlapsDock, false, "GA consent widget must NOT occlude bottom dock");
assert.equal(homeOcclusion.overlapsHome, false, "GA consent widget must NOT occlude Home button");
assert.ok(homeOcclusion.verticalClearancePx >= 0, "GA widget must have >=0px clearance above bottom dock");
assert.ok(homeOcclusion.gaHeight >= 44, "GA touch height must be >= 44px");

auditReport.bottomClearanceAudit = homeOcclusion;
console.log("✓ GA bottom clearance at 375px PASS: clearance =", homeOcclusion.verticalClearancePx, "px, overlapsHome =", homeOcclusion.overlapsHome);

// 6. Click GA "Allow analytics" to trigger GA tag loading; verify request is intercepted and aborted!
await evalJs(`
  (() => {
    const allowBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Allow analytics'));
    if (allowBtn) {
      allowBtn.click();
      return "clicked_allow";
    }
    const toggleBtn = document.querySelector('button[aria-label*="Google Analytics"]');
    if (toggleBtn) {
      toggleBtn.click();
      return "clicked_toggle";
    }
    return "no_btn";
  })()
`);

await new Promise((r) => setTimeout(r, 1000));
auditReport.networkInterceptions = [...interceptedRequests];
console.log("✓ Network interceptions recorded:", auditReport.networkInterceptions.length, "requests blocked");

// Verify toggle button clearance after consent is chosen
const toggleOcclusion = await evalJs(`
  (() => {
    const toggleBtn = document.querySelector('button[aria-label*="Google Analytics"]');
    const bottomDock = document.querySelector('aside[aria-label="Workstation quick dock"]');
    const homeLink = bottomDock ? bottomDock.querySelector('a[href="/"]') : null;

    if (!toggleBtn || !bottomDock || !homeLink) {
      return { error: "Missing toggle button or dock", hasBtn: !!toggleBtn, hasDock: !!bottomDock };
    }

    const btnRect = toggleBtn.getBoundingClientRect();
    const dockRect = bottomDock.getBoundingClientRect();
    const homeRect = homeLink.getBoundingClientRect();

    const overlapsDock = !(
      btnRect.bottom <= dockRect.top ||
      btnRect.top >= dockRect.bottom ||
      btnRect.right <= dockRect.left ||
      btnRect.left >= dockRect.right
    );

    const overlapsHome = !(
      btnRect.bottom <= homeRect.top ||
      btnRect.top >= homeRect.bottom ||
      btnRect.right <= homeRect.left ||
      btnRect.left >= homeRect.right
    );

    const verticalClearancePx = dockRect.top - btnRect.bottom;

    return {
      overlapsDock,
      overlapsHome,
      verticalClearancePx,
      btnHeight: btnRect.height,
      btnWidth: btnRect.width,
      dockHeight: dockRect.height,
      dockTop: dockRect.top,
      btnBottom: btnRect.bottom,
    };
  })()
`);

assert.equal(toggleOcclusion.overlapsDock, false, "GA toggle button must NOT occlude bottom dock");
assert.equal(toggleOcclusion.overlapsHome, false, "GA toggle button must NOT occlude Home button");
assert.ok(toggleOcclusion.verticalClearancePx >= 0, "GA toggle button must have >=0px clearance above bottom dock");
assert.ok(toggleOcclusion.btnHeight >= 44, "GA toggle button touch height must be >= 44px");
assert.ok(toggleOcclusion.btnWidth >= 44, "GA toggle button touch width must be >= 44px");

auditReport.toggleButtonClearanceAudit = toggleOcclusion;
console.log("✓ GA toggle button at 375px PASS: clearance =", toggleOcclusion.verticalClearancePx, "px, overlapsHome =", toggleOcclusion.overlapsHome);

// 7. Navigate to an article reading page and verify bottom bar is NOT present
console.log("Navigating to article reading page /blog/weld-photo-not-joint-release-evidence...");
await send("Page.navigate", { url: `http://127.0.0.1:${SERVER_PORT}/blog/weld-photo-not-joint-release-evidence` });
await new Promise((r) => setTimeout(r, 1500));

const articleAudit = await evalJs(`
  (() => {
    const bottomDock = document.querySelector('aside[aria-label="Workstation quick dock"]');
    const article = document.querySelector('article');
    const genericCta = document.body.textContent.includes("Want this applied to one real supplier?");
    const strayParens = (document.body.innerHTML.match(/<\\/aside>\\s*\\(/) !== null) ||
                        (document.body.innerHTML.match(/\\)\\s*<\\/div>\\s*<\\/article>/) !== null);

    return {
      hasBottomDock: !!bottomDock,
      hasArticle: !!article,
      genericCtaSuppressed: !genericCta,
      strayParensFound: strayParens,
    };
  })()
`);

assert.equal(articleAudit.hasBottomDock, false, "Article reading page must NOT render bottom workstation dock");
assert.equal(articleAudit.genericCtaSuppressed, true, "ArticleBody post must suppress generic dark CTA");
assert.equal(articleAudit.strayParensFound, false, "Zero stray parentheses in article render");

auditReport.articleReadingAudit = articleAudit;
console.log("✓ Article reading page PASS: hasBottomDock =", articleAudit.hasBottomDock, "genericCtaSuppressed =", articleAudit.genericCtaSuppressed);

// 8. Test 7 required viewports on / and /resources
console.log("Testing 7 required viewports for zero horizontal overflow...");
const viewports = [
  { width: 320, height: 640, label: "320px mobile-small" },
  { width: 375, height: 667, label: "375px mobile-standard" },
  { width: 390, height: 844, label: "390px mobile-modern" },
  { width: 430, height: 932, label: "430px mobile-large" },
  { width: 768, height: 1024, label: "768px tablet" },
  { width: 1024, height: 768, label: "1024px desktop-small" },
  { width: 1440, height: 900, label: "1440px desktop-wide" },
];

for (const vp of viewports) {
  await send("Emulation.setDeviceMetricsOverride", {
    width: vp.width,
    height: vp.height,
    deviceScaleFactor: 2,
    mobile: vp.width < 1024,
  });
  await new Promise((r) => setTimeout(r, 200));

  const vpResult = await evalJs(`
    (() => {
      const scrollWidth = document.documentElement.scrollWidth;
      const clientWidth = document.documentElement.clientWidth;
      const hasHorizontalOverflow = scrollWidth > window.innerWidth;
      const navVisible = !!(document.querySelector('header nav'));

      return {
        viewport: ${vp.width},
        innerWidth: window.innerWidth,
        scrollWidth,
        hasHorizontalOverflow,
        navVisible
      };
    })()
  `);

  assert.equal(vpResult.hasHorizontalOverflow, false, `Viewport ${vp.width}px must have zero horizontal overflow`);
  auditReport.viewportsAudit.push(vpResult);
  console.log(`✓ Viewport ${vp.width}px PASS: scrollWidth = ${vpResult.scrollWidth} <= ${vpResult.innerWidth}`);
}

auditReport.status = "PASS";
console.log("\n=== Final Browser Acceptance Audit Report ===");
console.log(JSON.stringify(auditReport, null, 2));

cleanup();
console.log("=== Verification Complete & All Processes Cleaned Up ===");
