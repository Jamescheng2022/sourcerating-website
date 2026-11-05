/**
 * Deterministic Mobile CDP Capture & DOM Measurement Harness
 *
 * Round 4 Static Architectural Implementation:
 *
 * 1. Multi-layer PNG format & full-pixel decompression validation:
 *    validateScreenshotPng verifies:
 *    a) 8-byte PNG magic signature (\x89PNG\r\n\x1a\n) - rejects non-PNG files including JPEGs.
 *    b) sharp.metadata() input format === "png" - rejects non-PNG containers.
 *    c) sharp.raw().toBuffer() full pixel decompression - rejects corrupt IDAT streams.
 *    d) Exact pixel width (targetWidth * DPR) and height (Math.ceil(scrollHeight) * DPR).
 *
 * 2. Complete simultaneous Run + Cleanup error preservation:
 *    If both run execution fails AND owned cleanup fails (stuck child or locked profile),
 *    the harness records BOTH runError and cleanupError plus ownedResourcesUnresolved
 *    (chromePidAlive, tempProfileLocked) in hold-receipt.json.
 *    Throws a combined error preserving both outcomes. PASS manifest is NEVER written.
 *
 * 3. Cryptographic child DevTools URL & browser GUID verification:
 *    Captures exact DevTools listening URL and browser GUID from child process stderr,
 *    asserts boundPort === cdpPort, and verifies that /json/version webSocketDebuggerUrl
 *    and GUID match before creating or targeting any page.
 *
 * 4. Canonical origin comparison:
 *    isAllowedRequestUrl and validateTargetUrl compare parsed.origin strictly against
 *    canonical origins (http://127.0.0.1:<port> and http://localhost:<port>).
 *    Port-less URLs (defaulting to port 80) are strictly rejected when configured for port 3000.
 *
 * 5. Dependency-injected runHarness lifecycle:
 *    Supports injected spawnChrome, fetchImpl, WebSocketImpl, checkPort, and rmSync
 *    for 100% deterministic testing of the real code path without launching external browsers.
 */

import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import sharp from "sharp";

export const TARGET_WIDTHS = [320, 375, 390, 430];
export const INITIAL_VIEWPORT_HEIGHT = 1200;
export const DEVICE_SCALE_FACTOR = 2;
export const DEFAULT_PORT = 3000;
export const DEFAULT_URL = "http://127.0.0.1:3000/blog/calibration-sticker-measurement-tolerance";
export function resolveChromePath() {
  if (process.env.CHROME_BIN && (fs.existsSync(process.env.CHROME_BIN) || process.platform !== "win32")) {
    return process.env.CHROME_BIN;
  }
  if (process.platform === "win32") {
    const candidates = [
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
      path.join(process.env.LOCALAPPDATA || "", "Google\\Chrome\\Application\\chrome.exe")
    ];
    for (const p of candidates) {
      if (fs.existsSync(p)) return p;
    }
    return candidates[0];
  }
  const unixCandidates = [
    "/usr/bin/google-chrome-stable",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium-browser",
    "/usr/bin/chromium"
  ];
  for (const p of unixCandidates) {
    if (fs.existsSync(p)) return p;
  }
  return "google-chrome";
}

export const CHROME_PATH = resolveChromePath();
export const RUNS_BASE_DIR = path.resolve("docs/editorial/evidence/runs");
export const PER_COMMAND_TIMEOUT_MS = 8000;
export const READINESS_TIMEOUT_MS = 25000;
export const OVERALL_HARNESS_TIMEOUT_MS = 90000;

export const EXPECTED_ARTICLE = {
  slug: "calibration-sticker-measurement-tolerance",
  pathname: "/blog/calibration-sticker-measurement-tolerance",
  title: "The Gauge Is Calibrated. Can It Decide This Tolerance?",
  metadata: {
    canonical: "https://www.sourcerating.com/blog/calibration-sticker-measurement-tolerance",
    ogTitle: "The Gauge Is Calibrated. Can It Decide This Tolerance? | Source Rating",
    ogUrl: "https://www.sourcerating.com/blog/calibration-sticker-measurement-tolerance",
    ogImage: "https://www.sourcerating.com/assets/photography/calibration-sticker-measurement-tolerance-cover.jpg",
    twitterCard: "summary_large_image",
    twitterTitle: "The Gauge Is Calibrated. Can It Decide This Tolerance? | Source Rating",
    twitterImage: "https://www.sourcerating.com/assets/photography/calibration-sticker-measurement-tolerance-cover.jpg"
  },
  expectedFiguresCount: 3,
  figures: [
    {
      index: 0,
      role: "cover",
      expectedDesktopSrc: "calibration-sticker-measurement-tolerance-cover.jpg",
      expectedMobileSrc: "calibration-sticker-measurement-tolerance-cover.jpg",
      captionSubstring: "NASA Armstrong metrology laboratory: plug-gauge calibration.",
      expectedLinkHref: "https://commons.wikimedia.org/wiki/File:Calibration_Laboratory_Provides_Key_Aircraft_Support_(AFRC2019-0098-16).jpg"
    },
    {
      index: 1,
      role: "inline-1",
      expectedDesktopSrc: "calibration-sticker-measurement-tolerance-body0.jpg",
      expectedMobileSrc: "calibration-sticker-measurement-tolerance-body0.jpg",
      captionSubstring: "Metric gauge-block reference set.",
      expectedLinkHref: "https://commons.wikimedia.org/wiki/File:GaugeBlockMetricSet.jpg",
      expectedLicenseHref: "https://creativecommons.org/licenses/by-sa/3.0/"
    },
    {
      index: 2,
      role: "inline-2",
      expectedDesktopSrc: "calibration-sticker-measurement-tolerance-body1.jpg",
      expectedMobileSrc: "calibration-sticker-measurement-tolerance-body1.jpg",
      captionSubstring: "Calibration using a digital protractor at NASA Armstrong.",
      expectedLinkHref: "https://commons.wikimedia.org/wiki/File:Calibration_Laboratory_Provides_Key_Aircraft_Support_(AFRC2019-0098-02).jpg"
    }
  ]
};

export const PLYWOOD_ARTICLE = {
  slug: "plywood-crate-solid-wood-skids-ispm15",
  pathname: "/blog/plywood-crate-solid-wood-skids-ispm15",
  title: "The Crate Is Plywood. What Are the Skids Made Of?",
  metadata: {
    canonical: "https://www.sourcerating.com/blog/plywood-crate-solid-wood-skids-ispm15",
    ogTitle: "The Crate Is Plywood. What Are the Skids Made Of? | Source Rating",
    ogUrl: "https://www.sourcerating.com/blog/plywood-crate-solid-wood-skids-ispm15",
    ogImage: "https://www.sourcerating.com/assets/photography/plywood-crate-solid-wood-skids-ispm15-cover.jpg",
    twitterCard: "summary_large_image",
    twitterTitle: "The Crate Is Plywood. What Are the Skids Made Of? | Source Rating",
    twitterImage: "https://www.sourcerating.com/assets/photography/plywood-crate-solid-wood-skids-ispm15-cover.jpg"
  },
  expectedFiguresCount: 3,
  figures: [
    {
      index: 0,
      role: "cover",
      expectedDesktopSrc: "plywood-crate-solid-wood-skids-ispm15-cover.jpg",
      expectedMobileSrc: "plywood-crate-solid-wood-skids-ispm15-cover.jpg",
      captionSubstring: "Plywood-clad shipping cases"
    },
    {
      index: 1,
      role: "inline-1",
      expectedDesktopSrc: "plywood-crate-solid-wood-skids-ispm15-body0.jpg",
      expectedMobileSrc: "plywood-crate-solid-wood-skids-ispm15-body0.jpg",
      captionSubstring: "support and forklift-entry geometry"
    },
    {
      index: 2,
      role: "inline-2",
      expectedDesktopSrc: "plywood-crate-solid-wood-skids-ispm15-body1.jpg",
      expectedMobileSrc: "plywood-crate-solid-wood-skids-ispm15-body1.jpg",
      captionSubstring: "photographed ISPM 15 mark"
    }
  ]
};

export const SMOKE_ARTICLES = [EXPECTED_ARTICLE, PLYWOOD_ARTICLE];

/**
 * Validates target URL against canonical origin, protocol, slug, and forbidden preview tokens.
 */
export function validateTargetUrl(urlStr, allowedPort = DEFAULT_PORT, allowedPathnames = [EXPECTED_ARTICLE.pathname, PLYWOOD_ARTICLE.pathname]) {
  let parsed;
  try {
    parsed = new URL(urlStr);
  } catch {
    throw new Error(`Invalid URL string provided: ${urlStr}`);
  }
  if (parsed.protocol !== "http:") {
    throw new Error(`Disallowed protocol: must be http: (got: ${parsed.protocol})`);
  }
  const canonicalOrigin127 = allowedPort === 80 ? "http://127.0.0.1" : `http://127.0.0.1:${allowedPort}`;
  const canonicalOriginLocalhost = allowedPort === 80 ? "http://localhost" : `http://localhost:${allowedPort}`;
  if (parsed.origin !== canonicalOrigin127 && parsed.origin !== canonicalOriginLocalhost) {
    throw new Error(`Disallowed target origin: expected ${canonicalOrigin127} or ${canonicalOriginLocalhost} (got: ${parsed.origin})`);
  }
  const allowedList = Array.isArray(allowedPathnames) ? allowedPathnames : [allowedPathnames];
  if (!allowedList.includes(parsed.pathname)) {
    throw new Error(`Disallowed target path: expected one of [${allowedList.join(', ')}] (got: ${parsed.pathname})`);
  }
  if (parsed.searchParams.has("vercel") || parsed.pathname.includes("_preview")) {
    throw new Error("Disallowed: protected preview routes or query params are forbidden");
  }
  return true;
}

/**
 * Real-time request confinement: checks whether a request in flight matches canonical local origin.
 * Rejects external hosts, port 80 defaults when port 3000 is expected, redirects, and preview tokens.
 */
export function isAllowedRequestUrl(reqUrl, allowedPort = DEFAULT_PORT) {
  try {
    const parsed = new URL(reqUrl);
    if (parsed.protocol === "data:" || parsed.protocol === "blob:") return true;
    if (parsed.protocol !== "http:") return false;

    const canonicalOrigin127 = allowedPort === 80 ? "http://127.0.0.1" : `http://127.0.0.1:${allowedPort}`;
    const canonicalOriginLocalhost = allowedPort === 80 ? "http://localhost" : `http://localhost:${allowedPort}`;

    if (parsed.origin !== canonicalOrigin127 && parsed.origin !== canonicalOriginLocalhost) {
      return false;
    }

    if (parsed.searchParams.has("vercel") || parsed.pathname.includes("_preview")) return false;
    return true;
  } catch {
    return false;
  }
}

/**
 * Resolves the underlying original asset pathname from Next.js /_next/image?url=...
 */
export function resolveImageSourceUrl(rawSrc, origin = "http://127.0.0.1:3000") {
  if (!rawSrc) return "";
  try {
    const parsed = new URL(rawSrc, origin);
    if (parsed.pathname === "/_next/image") {
      const inner = parsed.searchParams.get("url");
      if (inner) return decodeURIComponent(inner);
    }
    return parsed.pathname;
  } catch {
    return rawSrc;
  }
}

/**
 * Checks whether a TCP port is currently free on 127.0.0.1.
 */
export function checkPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once("error", () => resolve(false));
    server.once("listening", () => {
      server.close(() => resolve(true));
    });
    server.listen(port, "127.0.0.1");
  });
}

/**
 * Builds Chrome command line arguments ensuring isolated profile and no security bypass.
 */
export function buildChromeArgs({ cdpPort, userDataDir }) {
  return [
    "--headless=new",
    `--remote-debugging-port=${cdpPort}`,
    `--user-data-dir=${userDataDir}`,
    "--disable-gpu",
    "--disable-extensions",
    "--disable-background-networking"
  ];
}

/**
 * Unpacks CDP Runtime.evaluate response envelope.
 * Safely handles remoteObj.type === "undefined" (returns undefined) and subtype === "null" (returns null).
 * Unwraps remoteObj.value for returnByValue payloads, and rejects descriptors lacking 'value'.
 */
export function unpackCdpEvaluateResponse(evalResult) {
  if (!evalResult) {
    throw new Error("CDP evaluate returned null or undefined response");
  }
  if (evalResult.exceptionDetails) {
    const details = evalResult.exceptionDetails;
    const desc = details.exception?.description || details.text || "Unknown eval exception";
    throw new Error(`CDP evaluate exception: ${desc} at line ${details.lineNumber || 0}:${details.columnNumber || 0}`);
  }
  if (!evalResult.result) {
    throw new Error("CDP evaluate response missing remote object 'result'");
  }
  const remoteObj = evalResult.result;

  if (remoteObj.type === "undefined") {
    return undefined;
  }
  if (remoteObj.type === "object" && remoteObj.subtype === "null") {
    return null;
  }
  if (Object.prototype.hasOwnProperty.call(remoteObj, "value")) {
    return remoteObj.value;
  }
  throw new Error(
    `CDP evaluate remote object missing 'value' property (got descriptor: type=${remoteObj.type}, subtype=${remoteObj.subtype}, description=${remoteObj.description})`
  );
}

/**
 * Generates browser-side DOM readiness check script.
 */
export function buildReadinessScript(targetWidth) {
  return `(async () => {
    // 0. Mandatory scroll position at rest at top
    if (window.scrollY !== 0 || window.scrollX !== 0) {
      return { ready: false, reason: 'scroll_not_at_top', scrollY: window.scrollY, scrollX: window.scrollX };
    }

    // 1. Mandatory fonts check
    if (!document.fonts) {
      return { ready: false, reason: 'fonts_api_missing' };
    }
    if (document.fonts.ready) {
      await document.fonts.ready;
    }
    if (document.fonts.status !== 'loaded') {
      return { ready: false, reason: 'fonts_not_loaded', status: document.fonts.status };
    }

    // 2. Check H1 presence and text
    const h1 = document.querySelector('h1');
    if (!h1 || !h1.textContent.trim()) {
      return { ready: false, reason: 'h1_missing_or_empty' };
    }

    // 3. Check figures count (1 cover + 2 inline figures = 3 total)
    const figures = Array.from(document.querySelectorAll('figure'));
    if (figures.length < 3) {
      return { ready: false, reason: 'figures_count_insufficient', expected: 3, actual: figures.length };
    }

    // 4. Check all figure images have decoded with non-zero natural dimensions
    for (let i = 0; i < figures.length; i++) {
      const img = figures[i].querySelector('img');
      if (!img) {
        return { ready: false, reason: 'figure_img_element_missing', index: i };
      }
      if (typeof img.decode === 'function') {
        try {
          await img.decode();
        } catch {
          return { ready: false, reason: 'img_decode_failed', index: i, src: img.currentSrc || img.src };
        }
      }
      if (!img.complete || img.naturalWidth === 0 || img.naturalHeight === 0) {
        return {
          ready: false,
          reason: 'figure_img_not_decoded',
          index: i,
          complete: img.complete,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          currentSrc: img.currentSrc || img.src
        };
      }
    }

    // 5. Check exact viewport metrics match requested targetWidth
    if (window.innerWidth !== ${targetWidth}) {
      return { ready: false, reason: 'innerWidth_mismatch', expected: ${targetWidth}, actual: window.innerWidth };
    }
    if (document.documentElement.clientWidth !== ${targetWidth}) {
      return { ready: false, reason: 'clientWidth_mismatch', expected: ${targetWidth}, actual: document.documentElement.clientWidth };
    }

    return { ready: true };
  })()`;
}

/**
 * Generates browser-side script to wait for and assert target figure image load and decode.
 * Strictly verifies complete === true, natural dimensions > 0, awaits img.decode(), and ensures fonts ready.
 */
export function buildTargetFigureReadinessScript(targetFigureIndex = 1) {
  return `(async () => {
    // 0. Ensure fonts are ready
    if (document.fonts && document.fonts.ready) {
      try { await document.fonts.ready; } catch {}
    }
    if (document.fonts && document.fonts.status !== 'loaded') {
      return { ready: false, reason: 'fonts_not_loaded', status: document.fonts.status };
    }

    // 1. Target figure existence
    const figures = document.querySelectorAll('figure');
    const targetFig = figures[${targetFigureIndex}] || figures[0];
    if (!targetFig) {
      return { ready: false, reason: 'target_figure_missing', targetIndex: ${targetFigureIndex} };
    }

    // 2. Target visible img element existence
    const img = targetFig.querySelector('img');
    if (!img) {
      return { ready: false, reason: 'target_img_element_missing', targetIndex: ${targetFigureIndex} };
    }

    // 3. Await decode promise if available (bounded to 4s to prevent indefinite browser-side hang)
    if (typeof img.decode === 'function') {
      try {
        await Promise.race([
          img.decode(),
          new Promise((_, reject) => setTimeout(() => reject(new Error('decode_timeout')), 4000))
        ]);
      } catch (err) {
        return { ready: false, reason: 'img_decode_failed', error: String(err), src: img.currentSrc || img.src };
      }
    }

    // 4. Strictly assert complete and non-zero natural dimensions
    if (!img.complete || img.naturalWidth <= 0 || img.naturalHeight <= 0) {
      return {
        ready: false,
        reason: 'target_img_not_decoded',
        complete: img.complete,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        currentSrc: img.currentSrc || img.src
      };
    }

    // 5. Ensure non-zero rendered bounding box
    const rect = img.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) {
      return {
        ready: false,
        reason: 'target_img_zero_rendered_dimensions',
        width: rect.width,
        height: rect.height
      };
    }

    return {
      ready: true,
      complete: img.complete,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      renderedWidth: Math.round(rect.width),
      renderedHeight: Math.round(rect.height),
      currentSrc: img.currentSrc || img.src
    };
  })()`;
}

/**
 * Self-test / negative probe for target figure image readiness script logic.
 * Evaluates the readiness script string against mock DOM environments to assert fail-closed behavior.
 */
export async function testTargetFigureReadinessProbe() {
  const scriptStr = buildTargetFigureReadinessScript(1);
  const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;

  // Probe 1: Target figure missing -> returns target_figure_missing
  {
    const mockDocument = { querySelectorAll: () => [] };
    const fn = new AsyncFunction("document", "return await " + scriptStr);
    const res = await fn(mockDocument);
    assert.equal(res.ready, false);
    assert.equal(res.reason, "target_figure_missing");
  }

  // Probe 2: Target img missing -> returns target_img_element_missing
  {
    const mockFig = { querySelector: () => null };
    const mockDocument = { querySelectorAll: () => [mockFig, mockFig] };
    const fn = new AsyncFunction("document", "return await " + scriptStr);
    const res = await fn(mockDocument);
    assert.equal(res.ready, false);
    assert.equal(res.reason, "target_img_element_missing");
  }

  // Probe 3: Img not complete or zero naturalWidth -> returns target_img_not_decoded
  {
    const mockImg = { complete: false, naturalWidth: 0, naturalHeight: 0, decode: async () => {} };
    const mockFig = { querySelector: () => mockImg };
    const mockDocument = { querySelectorAll: () => [mockFig, mockFig] };
    const fn = new AsyncFunction("document", "return await " + scriptStr);
    const res = await fn(mockDocument);
    assert.equal(res.ready, false);
    assert.equal(res.reason, "target_img_not_decoded");
  }

  // Probe 4: Img decode rejects -> returns img_decode_failed
  {
    const mockImg = {
      complete: true,
      naturalWidth: 100,
      naturalHeight: 100,
      decode: async () => { throw new Error("GPU decode error"); }
    };
    const mockFig = { querySelector: () => mockImg };
    const mockDocument = { querySelectorAll: () => [mockFig, mockFig] };
    const fn = new AsyncFunction("document", "return await " + scriptStr);
    const res = await fn(mockDocument);
    assert.equal(res.ready, false);
    assert.equal(res.reason, "img_decode_failed");
  }

  // Probe 5: Happy path -> returns ready: true
  {
    const mockImg = {
      complete: true,
      naturalWidth: 800,
      naturalHeight: 600,
      getBoundingClientRect: () => ({ width: 350, height: 200 }),
      decode: async () => {}
    };
    const mockFig = { querySelector: () => mockImg };
    const mockDocument = { querySelectorAll: () => [mockFig, mockFig] };
    const fn = new AsyncFunction("document", "return await " + scriptStr);
    const res = await fn(mockDocument);
    assert.equal(res.ready, true);
    assert.equal(res.naturalWidth, 800);
  }
}

/**
 * Computes the true geometric intersection of an element's bounding client rect with the viewport,
 * inset by borderInsetCss pixels from unclipped image edges to sample strictly the image INTERIOR
 * (excluding borders, outlines, antialiased rounded corners, and drop-shadows),
 * scaled to backing-store pixels by devicePixelRatio (DPR).
 *
 * Fails closed (throws) if:
 * 1. imageRect is missing, null, or undefined.
 * 2. Any coordinate (left, top, width, height, right, bottom) is missing, non-finite (NaN, Infinity),
 *    or width/height <= 0.
 * 3. There is no intersection (completely above, left, below, or right of viewport).
 * 4. The resulting visible interior intersection is smaller than minDimensionPx (default 20px)
 *    in width or height, preventing false passes on subpixel edges or slivers.
 */
export function computeVisibleImageRoi(imageRect, viewportWidth, viewportHeight, dpr = 1, minDimensionPx = 20, borderInsetCss = 6) {
  if (!imageRect) {
    throw new Error("Cannot compute visible image ROI: imageRect is missing or undefined");
  }

  if (
    imageRect.left === undefined ||
    imageRect.top === undefined ||
    imageRect.width === undefined ||
    imageRect.height === undefined
  ) {
    throw new Error(`Cannot compute visible image ROI: missing required coordinates in imageRect ${JSON.stringify(imageRect)}`);
  }

  const imgLeft = Number(imageRect.left);
  const imgTop = Number(imageRect.top);
  const imgWidth = Number(imageRect.width);
  const imgHeight = Number(imageRect.height);
  const imgRight = imageRect.right !== undefined ? Number(imageRect.right) : imgLeft + imgWidth;
  const imgBottom = imageRect.bottom !== undefined ? Number(imageRect.bottom) : imgTop + imgHeight;

  if (
    !Number.isFinite(imgLeft) ||
    !Number.isFinite(imgTop) ||
    !Number.isFinite(imgWidth) ||
    !Number.isFinite(imgHeight) ||
    !Number.isFinite(imgRight) ||
    !Number.isFinite(imgBottom)
  ) {
    throw new Error(`Cannot compute visible image ROI: non-finite coordinates in imageRect ${JSON.stringify(imageRect)}`);
  }

  if (imgWidth <= 0 || imgHeight <= 0) {
    throw new Error(`Cannot compute visible image ROI: non-positive image dimensions (${imgWidth}x${imgHeight}) in imageRect ${JSON.stringify(imageRect)}`);
  }

  // 1. Compute true visible intersection in CSS viewport coordinates
  const interLeftCss = Math.max(0, imgLeft);
  const interTopCss = Math.max(0, imgTop);
  const interRightCss = Math.min(viewportWidth, imgRight);
  const interBottomCss = Math.min(viewportHeight, imgBottom);

  if (interRightCss <= interLeftCss || interBottomCss <= interTopCss) {
    throw new Error(
      `No visible intersection between target image (${imgWidth}x${imgHeight} at [${imgLeft},${imgTop}]) and viewport (${viewportWidth}x${viewportHeight})`
    );
  }

  // 2. Inset from genuine image boundaries to strictly sample the INTERIOR
  // If an edge is inside the viewport (i.e. is the image's physical border), inset by borderInsetCss.
  // If an edge is clipped by the viewport boundary, that boundary is already deep inside the image.
  const insetLeft = (imgLeft >= 0) ? borderInsetCss : 0;
  const insetRight = (imgRight <= viewportWidth) ? borderInsetCss : 0;
  const insetTop = (imgTop >= 0) ? borderInsetCss : 0;
  const insetBottom = (imgBottom <= viewportHeight) ? borderInsetCss : 0;

  const interiorLeftCss = interLeftCss + insetLeft;
  const interiorRightCss = interRightCss - insetRight;
  const interiorTopCss = interTopCss + insetTop;
  const interiorBottomCss = interBottomCss - insetBottom;

  const interiorWidthCss = Math.max(0, interiorRightCss - interiorLeftCss);
  const interiorHeightCss = Math.max(0, interiorBottomCss - interiorTopCss);

  // 3. Scaled pixel coordinates in backing screenshot buffer
  const totalVpWidth = Math.round(viewportWidth * dpr);
  const totalVpHeight = Math.round(viewportHeight * dpr);

  const cropLeft = Math.max(0, Math.floor(interiorLeftCss * dpr));
  const cropTop = Math.max(0, Math.floor(interiorTopCss * dpr));
  const cropRight = Math.min(totalVpWidth, Math.floor(interiorRightCss * dpr));
  const cropBottom = Math.min(totalVpHeight, Math.floor(interiorBottomCss * dpr));

  const cropWidth = Math.max(0, cropRight - cropLeft);
  const cropHeight = Math.max(0, cropBottom - cropTop);

  // 4. Fail closed on minimum interior size threshold
  if (cropWidth < minDimensionPx || cropHeight < minDimensionPx) {
    throw new Error(
      `No meaningful visible interior intersection between target image (${imgWidth}x${imgHeight} at [${imgLeft},${imgTop}]) and viewport (${viewportWidth}x${viewportHeight}): visible interior ROI is only ${cropWidth}x${cropHeight}px (minimum threshold is ${minDimensionPx}px)`
    );
  }

  return {
    left: cropLeft,
    top: cropTop,
    width: cropWidth,
    height: cropHeight,
    borderInsetCss,
    cssIntersection: {
      left: interLeftCss,
      top: interTopCss,
      right: interRightCss,
      bottom: interBottomCss,
      width: interRightCss - interLeftCss,
      height: interBottomCss - interTopCss
    },
    cssInterior: {
      left: interiorLeftCss,
      top: interiorTopCss,
      right: interiorRightCss,
      bottom: interiorBottomCss,
      width: interiorWidthCss,
      height: interiorHeightCss
    }
  };
}

/**
 * Self-test / deterministic negative probes for computeVisibleImageRoi logic.
 * Exercises:
 * 1. undefined / null imageRect -> throws
 * 2. non-finite (NaN, Infinity) endpoints -> throws
 * 3. non-positive dimensions -> throws
 * 4. completely offscreen (above, left, below, right) -> throws
 * 5. visible interior sliver below minimum threshold (< 20px) -> throws
 * 6. DPR scaling and interior insets.
 */
export function testVisibleImageRoiProbes() {
  const vpWidth = 390;
  const vpHeight = 844;

  // 1. Missing / undefined / null imageRect
  assert.throws(
    () => computeVisibleImageRoi(undefined, vpWidth, vpHeight, 1),
    /imageRect is missing or undefined/
  );
  assert.throws(
    () => computeVisibleImageRoi(null, vpWidth, vpHeight, 1),
    /imageRect is missing or undefined/
  );

  // 2. Missing required coordinates
  assert.throws(
    () => computeVisibleImageRoi({ left: 10, top: 20 }, vpWidth, vpHeight, 1),
    /missing required coordinates/
  );

  // 3. NaN / non-finite endpoints
  assert.throws(
    () => computeVisibleImageRoi({ left: NaN, top: 100, width: 350, height: 200 }, vpWidth, vpHeight, 1),
    /non-finite coordinates/
  );
  assert.throws(
    () => computeVisibleImageRoi({ left: 20, top: NaN, width: 350, height: 200 }, vpWidth, vpHeight, 1),
    /non-finite coordinates/
  );
  assert.throws(
    () => computeVisibleImageRoi({ left: 20, top: 100, width: NaN, height: 200 }, vpWidth, vpHeight, 1),
    /non-finite coordinates/
  );
  assert.throws(
    () => computeVisibleImageRoi({ left: 20, top: 100, width: 350, height: NaN }, vpWidth, vpHeight, 1),
    /non-finite coordinates/
  );
  assert.throws(
    () => computeVisibleImageRoi({ left: 20, top: 100, width: 350, height: 200, right: NaN }, vpWidth, vpHeight, 1),
    /non-finite coordinates/
  );
  assert.throws(
    () => computeVisibleImageRoi({ left: 20, top: 100, width: 350, height: 200, bottom: NaN }, vpWidth, vpHeight, 1),
    /non-finite coordinates/
  );
  assert.throws(
    () => computeVisibleImageRoi({ left: 20, top: 100, width: 350, height: 200, right: Infinity }, vpWidth, vpHeight, 1),
    /non-finite coordinates/
  );

  // 4. Non-positive image dimensions
  assert.throws(
    () => computeVisibleImageRoi({ left: 20, top: 100, width: 0, height: 200 }, vpWidth, vpHeight, 1),
    /non-positive image dimensions/
  );
  assert.throws(
    () => computeVisibleImageRoi({ left: 20, top: 100, width: 350, height: -10 }, vpWidth, vpHeight, 1),
    /non-positive image dimensions/
  );

  // 5. Fully visible interior image (happy path, DPR=1, borderInset=6)
  {
    const rect = { left: 20, top: 100, width: 350, height: 200, right: 370, bottom: 300 };
    const roi = computeVisibleImageRoi(rect, vpWidth, vpHeight, 1, 20, 6);
    assert.equal(roi.left, 26);  // 20 + 6
    assert.equal(roi.top, 106);  // 100 + 6
    assert.equal(roi.width, 338); // (370 - 6) - (20 + 6) = 364 - 26 = 338
    assert.equal(roi.height, 188); // (300 - 6) - (100 + 6) = 294 - 106 = 188
  }

  // 6. Partially offscreen above (top < 0, bottom inside viewport)
  // Top boundary is viewport edge (already deep inside image), so top inset is 0
  // Bottom boundary is physical image border, so bottom inset is 6
  {
    const rect = { left: 10, top: -100, width: 350, height: 300, right: 360, bottom: 200 };
    const roi = computeVisibleImageRoi(rect, vpWidth, vpHeight, 1, 20, 6);
    assert.equal(roi.left, 16); // 10 + 6
    assert.equal(roi.top, 0);   // interTop is 0, clipped edge: 0 inset
    assert.equal(roi.width, 338); // (360 - 6) - (10 + 6) = 354 - 16 = 338
    assert.equal(roi.height, 194); // (200 - 6) - 0 = 194
  }

  // 7. Partially offscreen left (left < 0, right inside viewport)
  {
    const rect = { left: -50, top: 50, width: 300, height: 200, right: 250, bottom: 250 };
    const roi = computeVisibleImageRoi(rect, vpWidth, vpHeight, 1, 20, 6);
    assert.equal(roi.left, 0);  // interLeft is 0, clipped edge: 0 inset
    assert.equal(roi.top, 56);  // 50 + 6
    assert.equal(roi.width, 244); // (250 - 6) - 0 = 244
    assert.equal(roi.height, 188); // (250 - 6) - (50 + 6) = 188
  }

  // 8. Partially offscreen bottom (bottom > vpHeight)
  {
    const rect = { left: 20, top: 750, width: 350, height: 200, right: 370, bottom: 950 };
    const roi = computeVisibleImageRoi(rect, vpWidth, vpHeight, 1, 20, 6);
    assert.equal(roi.left, 26);
    assert.equal(roi.top, 756); // 750 + 6
    assert.equal(roi.width, 338);
    assert.equal(roi.height, 88); // 844 - (750 + 6) = 88
  }

  // 9. Completely offscreen above (bottom <= 0) -> throws
  {
    const rect = { left: 0, top: -300, width: 350, height: 200, right: 350, bottom: -100 };
    assert.throws(
      () => computeVisibleImageRoi(rect, vpWidth, vpHeight, 1),
      /No visible intersection/
    );
  }

  // 10. Completely offscreen left (right <= 0) -> throws
  {
    const rect = { left: -400, top: 100, width: 350, height: 200, right: -50, bottom: 300 };
    assert.throws(
      () => computeVisibleImageRoi(rect, vpWidth, vpHeight, 1),
      /No visible intersection/
    );
  }

  // 11. Completely offscreen below (top >= vpHeight) -> throws
  {
    const rect = { left: 0, top: 900, width: 350, height: 200, right: 350, bottom: 1100 };
    assert.throws(
      () => computeVisibleImageRoi(rect, vpWidth, vpHeight, 1),
      /No visible intersection/
    );
  }

  // 12. Sliver below minimum threshold (10px visible < 20px threshold) -> throws
  {
    const rect = { left: 0, top: -190, width: 350, height: 200, right: 350, bottom: 10 };
    assert.throws(
      () => computeVisibleImageRoi(rect, vpWidth, vpHeight, 1, 20, 0),
      /visible interior ROI is only.*minimum threshold/
    );
  }

  // 13. DPR scaling verification (DPR=2)
  {
    const rect = { left: 10, top: 20, width: 100, height: 100, right: 110, bottom: 120 };
    const roi = computeVisibleImageRoi(rect, vpWidth, vpHeight, 2, 20, 5);
    // Inset CSS: left = 15, top = 25, right = 105, bottom = 115
    // Scaled DPR=2: left = 30, top = 50, right = 210, bottom = 230
    // width = 180, height = 180
    assert.equal(roi.left, 30);
    assert.equal(roi.top, 50);
    assert.equal(roi.width, 180);
    assert.equal(roi.height, 180);
  }
}

/**
 * Deterministic negative probe: Border-only blank box vs genuine varied interior (Sharp buffer probe).
 * 1. Creates a bordered blank box (2px dark border, solid white interior).
 *    Proves that full un-inset extraction would falsely pass (stdev > 1),
 *    while computeVisibleImageRoi with borderInsetCss=6 extracts pure interior (stdev < 1),
 *    strictly failing the blank check!
 * 2. Creates a genuinely varied image and proves it passes.
 */
export async function testBorderOnlyBlankProbe() {
  const boxWidth = 200;
  const boxHeight = 150;
  const borderPx = 2;

  // Create a 200x150 buffer with a 2px dark border (RGB 50,50,50) and solid white interior (RGB 255,255,255)
  const rawBox = Buffer.alloc(boxWidth * boxHeight * 3, 255);
  for (let y = 0; y < boxHeight; y++) {
    for (let x = 0; x < boxWidth; x++) {
      if (x < borderPx || x >= boxWidth - borderPx || y < borderPx || y >= boxHeight - borderPx) {
        const idx = (y * boxWidth + x) * 3;
        rawBox[idx] = 50;
        rawBox[idx + 1] = 50;
        rawBox[idx + 2] = 50;
      }
    }
  }
  const borderOnlyPng = await sharp(rawBox, { raw: { width: boxWidth, height: boxHeight, channels: 3 } }).png().toBuffer();

  // Verify un-inset extraction would falsely pass: standard deviation > 1 due to border pixels!
  const uninsetStats = await sharp(borderOnlyPng).stats();
  assert.ok(
    uninsetStats.channels[0].stdev > 1,
    "Un-inset extraction on bordered blank box must have stdev > 1 (confirming false-PASS risk)"
  );

  // Verify computeVisibleImageRoi with borderInsetCss=6 excludes the border:
  const mockRect = { left: 10, top: 10, width: boxWidth, height: boxHeight, right: 10 + boxWidth, bottom: 10 + boxHeight };
  const interiorRoi = computeVisibleImageRoi(mockRect, 390, 844, 1, 20, 6);

  // Extract the interior from the borderOnlyPng
  const interiorBuf = await sharp(borderOnlyPng)
    .extract({ left: interiorRoi.borderInsetCss, top: interiorRoi.borderInsetCss, width: interiorRoi.width, height: interiorRoi.height })
    .toBuffer();
  const interiorStats = await sharp(interiorBuf).stats();

  // Interior must be pure uniform white (stdev === 0), strictly failing the non-blank check
  const isInteriorBlank = interiorStats.channels.slice(0, 3).every((c) => c.min === c.max || c.stdev < 1);
  assert.equal(
    isInteriorBlank,
    true,
    "Interior extraction on bordered blank box must strictly detect blank interior (stdev < 1)"
  );

  // Create genuine varied interior: add non-uniform gradient in the interior
  const variedRaw = Buffer.from(rawBox);
  for (let y = 20; y < boxHeight - 20; y++) {
    for (let x = 20; x < boxWidth - 20; x++) {
      const idx = (y * boxWidth + x) * 3;
      variedRaw[idx] = (x * 7 + y * 13) % 256;
      variedRaw[idx + 1] = (x * 11 + y * 5) % 256;
      variedRaw[idx + 2] = (x * 3 + y * 17) % 256;
    }
  }
  const variedPng = await sharp(variedRaw, { raw: { width: boxWidth, height: boxHeight, channels: 3 } }).png().toBuffer();
  const variedInteriorBuf = await sharp(variedPng)
    .extract({ left: interiorRoi.borderInsetCss, top: interiorRoi.borderInsetCss, width: interiorRoi.width, height: interiorRoi.height })
    .toBuffer();
  const variedInteriorStats = await sharp(variedInteriorBuf).stats();
  const isVariedBlank = variedInteriorStats.channels.slice(0, 3).every((c) => c.min === c.max || c.stdev < 1);
  assert.equal(
    isVariedBlank,
    false,
    "Interior extraction on genuinely varied image must PASS (isInteriorBlank === false)"
  );
  assert.ok(variedInteriorStats.channels[0].stdev > 10, "Varied interior must have substantial variance");
}

/**
 * A normal-flow item can extend beyond the viewport inside a bounded horizontal
 * scroller without overflowing the page. Do not exempt hidden/clip containers,
 * root clipping, out-of-flow items or content outside the reachable scroll area.
 * This function is serialized into the browser; keep it self-contained.
 */
export function isReachableInHorizontalScroller(el, viewportWidth) {
  const rect = el.getBoundingClientRect();
  let contained = false;
  for (let node = el; node && node !== document.body && node !== document.documentElement; node = node.parentElement) {
    const style = window.getComputedStyle(node);
    // Positioned/transformed descendants may escape an ancestor's scroll clip.
    // Keep the original strict check for these ambiguous cases.
    if (style.position === 'fixed' || style.position === 'absolute' || style.transform !== 'none') return false;
    if (node === el) continue;
    if (style.overflowX === 'hidden' || style.overflowX === 'clip') return false;
    if (contained) continue;
    if (style.overflowX !== 'auto' && style.overflowX !== 'scroll') continue;
    const box = node.getBoundingClientRect();
    if (node.clientWidth <= 0 || node.scrollWidth <= node.clientWidth ||
        box.left < -1 || box.right > viewportWidth + 1 ||
        style.direction !== 'ltr' || rect.width > node.clientWidth) return false;
    const contentLeft = box.left + node.clientLeft - node.scrollLeft;
    contained = rect.left >= contentLeft - 1 && rect.right <= contentLeft + node.scrollWidth + 1;
    if (!contained) return false;
  }
  return contained;
}

/**
 * Generates browser-side geometry extraction script.
 */
export function buildGeometryScript() {
  return `(() => {
    const isReachableInHorizontalScroller = ${isReachableInHorizontalScroller.toString()};
    function resolveImgUrl(raw) {
      if (!raw) return '';
      try {
        const u = new URL(raw, window.location.origin);
        if (u.pathname === '/_next/image') {
          const q = u.searchParams.get('url');
          if (q) return decodeURIComponent(q);
        }
        return u.pathname;
      } catch {
        return raw;
      }
    }

    const clientWidth = document.documentElement.clientWidth;
    const scrollWidth = document.documentElement.scrollWidth;
    const innerWidth = window.innerWidth;
    const dpr = window.devicePixelRatio;
    const pathname = window.location.pathname;

    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    const header = document.querySelector('header');
    const headerRect = header ? header.getBoundingClientRect() : null;

    const footer = document.querySelector('footer');
    const footerRect = footer ? footer.getBoundingClientRect() : null;
    const footerBottom = footer ? Math.ceil(footerRect.bottom + window.scrollY) : 0;

    const scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      document.documentElement.offsetHeight,
      document.body.offsetHeight,
      footerBottom
    );

    const h1 = document.querySelector('h1');
    const h1R = h1 ? h1.getBoundingClientRect() : null;

    const excerpt = document.querySelector('h1 + p');
    const excerptR = excerpt ? excerpt.getBoundingClientRect() : null;

    const figures = Array.from(document.querySelectorAll('figure')).map((fig, idx) => {
      const fR = fig.getBoundingClientRect();
      const imgs = Array.from(fig.querySelectorAll('img'));
      const visibleImg = imgs.find((im) => {
        const style = window.getComputedStyle(im);
        const r = im.getBoundingClientRect();
        return style.display !== 'none' && style.visibility !== 'hidden' && r.width > 0;
      }) || imgs[0] || null;

      const cap = fig.querySelector('figcaption');
      const links = cap ? Array.from(cap.querySelectorAll('a')).map(a => ({ text: a.textContent.trim(), href: a.href })) : [];

      return {
        figureIndex: idx,
        rect: {
          left: Math.round(fR.left),
          right: Math.round(fR.right),
          top: Math.round(fR.top),
          bottom: Math.round(fR.bottom),
          width: Math.round(fR.width),
          height: Math.round(fR.height)
        },
        img: {
          naturalWidth: visibleImg ? visibleImg.naturalWidth : 0,
          naturalHeight: visibleImg ? visibleImg.naturalHeight : 0,
          renderedWidth: visibleImg ? Math.round(visibleImg.getBoundingClientRect().width) : 0,
          renderedHeight: visibleImg ? Math.round(visibleImg.getBoundingClientRect().height) : 0,
          rawSrc: visibleImg ? (visibleImg.currentSrc || visibleImg.src || '') : '',
          resolvedSrc: visibleImg ? resolveImgUrl(visibleImg.currentSrc || visibleImg.src) : ''
        },
        caption: {
          text: cap ? cap.textContent.trim() : '',
          links
        }
      };
    });

    const overflowing = [];
    document.querySelectorAll('body *').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && (r.right > clientWidth + 1 || r.left < -1) &&
          !isReachableInHorizontalScroller(el, clientWidth)) {
        overflowing.push({
          tag: el.tagName,
          className: typeof el.className === 'string' ? el.className : '',
          left: Math.round(r.left),
          right: Math.round(r.right),
          width: Math.round(r.width)
        });
      }
    });

    return {
      pathname,
      innerWidth,
      clientWidth,
      scrollWidth,
      scrollHeight,
      dpr,
      scrollY,
      scrollX,
      hasHorizontalOverflow: scrollWidth > clientWidth,
      overflowDeltaPx: Math.max(0, scrollWidth - clientWidth),
      header: headerRect ? {
        top: Math.round(headerRect.top),
        bottom: Math.round(headerRect.bottom),
        left: Math.round(headerRect.left),
        right: Math.round(headerRect.right),
        width: Math.round(headerRect.width),
        height: Math.round(headerRect.height)
      } : null,
      h1: h1R ? {
        left: Math.round(h1R.left),
        right: Math.round(h1R.right),
        top: Math.round(h1R.top),
        bottom: Math.round(h1R.bottom),
        width: Math.round(h1R.width),
        height: Math.round(h1R.height),
        text: h1 ? h1.textContent.trim() : ''
      } : null,
      excerpt: excerptR ? {
        left: Math.round(excerptR.left),
        right: Math.round(excerptR.right),
        top: Math.round(excerptR.top),
        bottom: Math.round(excerptR.bottom),
        width: Math.round(excerptR.width),
        height: Math.round(excerptR.height)
      } : null,
      figures,
      footer: footerRect ? {
        left: Math.round(footerRect.left),
        right: Math.round(footerRect.right),
        top: Math.round(footerRect.top),
        bottom: footerBottom,
        width: Math.round(footerRect.width),
        height: Math.round(footerRect.height)
      } : null,
      overflowingElementsCount: overflowing.length,
      sampleOverflowing: overflowing.slice(0, 3)
    };
  })()`;
}

/**
 * Validates DOM geometry and article content identity against expected invariants.
 */
export function validateDomMetrics(metrics, targetWidth, expectedDpr = DEVICE_SCALE_FACTOR, expectedArticle = EXPECTED_ARTICLE) {
  if (!metrics) {
    throw new Error(`DOM metrics object is null or undefined for ${targetWidth}px`);
  }

  // 1. Assert scroll position at rest at top
  if (metrics.scrollY !== 0 || metrics.scrollX !== 0) {
    throw new Error(
      `Viewport scroll is not at top (0, 0) at ${targetWidth}px: scrollY=${metrics.scrollY}, scrollX=${metrics.scrollX}`
    );
  }

  // 2. Assert header presence and non-zero dimensions
  if (!metrics.header || metrics.header.width <= 0 || metrics.header.height <= 0) {
    throw new Error(`Header element missing or non-positive dimensions at ${targetWidth}px: ${JSON.stringify(metrics.header)}`);
  }

  if (metrics.innerWidth !== targetWidth) {
    throw new Error(`innerWidth mismatch at ${targetWidth}px: expected ${targetWidth}, got ${metrics.innerWidth}`);
  }
  if (metrics.clientWidth !== targetWidth) {
    throw new Error(`clientWidth mismatch at ${targetWidth}px: expected ${targetWidth}, got ${metrics.clientWidth}`);
  }
  if (metrics.dpr !== expectedDpr) {
    throw new Error(`DPR mismatch at ${targetWidth}px: expected ${expectedDpr}, got ${metrics.dpr}`);
  }

  if (metrics.hasHorizontalOverflow || metrics.scrollWidth > metrics.clientWidth || metrics.overflowDeltaPx > 0) {
    throw new Error(
      `Horizontal overflow detected at ${targetWidth}px: scrollWidth=${metrics.scrollWidth} > clientWidth=${metrics.clientWidth} (delta: ${metrics.overflowDeltaPx}px)`
    );
  }
  if (metrics.overflowingElementsCount > 0) {
    throw new Error(
      `Horizontal overflow: ${metrics.overflowingElementsCount} overflowing element(s) detected at ${targetWidth}px. Sample: ${JSON.stringify(metrics.sampleOverflowing)}`
    );
  }

  if (metrics.pathname !== expectedArticle.pathname) {
    throw new Error(`Wrong article pathname at ${targetWidth}px: expected '${expectedArticle.pathname}', got '${metrics.pathname}'`);
  }
  if (!metrics.h1 || metrics.h1.text !== expectedArticle.title) {
    throw new Error(`Wrong article headline at ${targetWidth}px: expected '${expectedArticle.title}', got '${metrics.h1?.text}'`);
  }
  if (metrics.h1.right > metrics.clientWidth) {
    throw new Error(`H1 right edge (${metrics.h1.right}px) exceeds clientWidth (${metrics.clientWidth}px) at ${targetWidth}px`);
  }
  if (metrics.h1.left < 0) {
    throw new Error(`H1 left edge (${metrics.h1.left}px) is off-screen left at ${targetWidth}px`);
  }

  // 3. Assert header does not obstruct H1 headline (require non-overlap, smaller gap acceptable)
  if (typeof metrics.h1?.top === "number" && typeof metrics.header?.bottom === "number") {
    if (metrics.header.bottom > metrics.h1.top) {
      throw new Error(
        `Fixed header overlaps H1 headline at ${targetWidth}px: header bottom (${metrics.header.bottom}px) > H1 top (${metrics.h1.top}px)`
      );
    }
  }

  if (metrics.excerpt && metrics.excerpt.right > metrics.clientWidth) {
    throw new Error(`Excerpt right edge (${metrics.excerpt.right}px) exceeds clientWidth (${metrics.clientWidth}px) at ${targetWidth}px`);
  }

  // 4. Assert header does not obstruct excerpt
  if (metrics.excerpt && typeof metrics.excerpt.top === "number" && typeof metrics.header.bottom === "number") {
    if (metrics.header.bottom > metrics.excerpt.top) {
      throw new Error(
        `Fixed header overlaps excerpt at ${targetWidth}px: header bottom (${metrics.header.bottom}px) > excerpt top (${metrics.excerpt.top}px)`
      );
    }
  }

  if (!metrics.footer || metrics.footer.width <= 0) {
    throw new Error(`Footer element missing or 0 width at ${targetWidth}px`);
  }
  if (!metrics.footer.bottom || metrics.footer.bottom <= 0) {
    throw new Error(`Footer bottom (${metrics.footer.bottom}) is non-positive at ${targetWidth}px`);
  }

  if (!Array.isArray(metrics.figures) || metrics.figures.length !== expectedArticle.expectedFiguresCount) {
    throw new Error(`Expected ${expectedArticle.expectedFiguresCount} figures, found ${metrics.figures?.length} at ${targetWidth}px`);
  }

  for (let i = 0; i < expectedArticle.figures.length; i++) {
    const expected = expectedArticle.figures[i];
    const actual = metrics.figures[i];
    if (!actual) {
      throw new Error(`Figure ${i} (${expected.role}) missing at ${targetWidth}px`);
    }
    if (actual.img.naturalWidth <= 0 || actual.img.naturalHeight <= 0) {
      throw new Error(`Figure ${i} (${expected.role}) image not loaded (naturalWidth=${actual.img.naturalWidth}, naturalHeight=${actual.img.naturalHeight}) at ${targetWidth}px`);
    }

    // Check cover figure is not obstructed by header at rest
    if (i === 0 && typeof actual.rect.top === "number" && typeof metrics.header.bottom === "number") {
      if (metrics.header.bottom > actual.rect.top) {
        throw new Error(
          `Fixed header overlaps cover figure at rest at ${targetWidth}px: header bottom (${metrics.header.bottom}px) > cover top (${actual.rect.top}px)`
        );
      }
    }

    if (targetWidth <= 430) {
      if (!actual.img.resolvedSrc.includes(expected.expectedMobileSrc)) {
        throw new Error(
          `Figure ${i} (${expected.role}) visible image mismatch at ${targetWidth}px: expected mobile asset '${expected.expectedMobileSrc}', got '${actual.img.resolvedSrc}' (desktop asset rejected on mobile viewport)`
        );
      }
    }

    if (!actual.caption.text.includes(expected.captionSubstring)) {
      throw new Error(
        `Figure ${i} (${expected.role}) caption mismatch at ${targetWidth}px: expected to include '${expected.captionSubstring}', got '${actual.caption.text}'`
      );
    }
    if (expected.expectedLinkHref) {
      const hasLink = actual.caption.links && actual.caption.links.some((l) => l.href.includes(expected.expectedLinkHref));
      if (!hasLink) {
        throw new Error(
          `Figure ${i} (${expected.role}) caption credit link missing at ${targetWidth}px: expected link containing '${expected.expectedLinkHref}', got links: ${JSON.stringify(actual.caption.links)}`
        );
      }
    }
    if (expected.expectedLicenseHref) {
      const hasLicense = actual.caption.links && actual.caption.links.some((l) => l.href.includes(expected.expectedLicenseHref));
      if (!hasLicense) {
        throw new Error(
          `Figure ${i} (${expected.role}) caption license link missing at ${targetWidth}px: expected link containing '${expected.expectedLicenseHref}'`
        );
      }
    }
    if (actual.rect.right > metrics.clientWidth + 1) {
      throw new Error(`Figure ${i} (${expected.role}) right edge (${actual.rect.right}px) exceeds clientWidth (${metrics.clientWidth}px) at ${targetWidth}px`);
    }
  }

  return true;
}

/**
 * Generates browser-side DOM metadata extraction script for canonical, OpenGraph, and Twitter tags.
 */
export function buildMetadataScript() {
  return `(() => {
    const getMeta = (attr) => {
      const el = document.querySelector(\`meta[property="\${attr}"], meta[name="\${attr}"]\`);
      return el ? el.getAttribute('content') : null;
    };
    const canonicalEl = document.querySelector('link[rel="canonical"]');
    return {
      canonical: canonicalEl ? canonicalEl.getAttribute('href') : null,
      ogTitle: getMeta('og:title'),
      ogUrl: getMeta('og:url'),
      ogImage: getMeta('og:image'),
      twitterCard: getMeta('twitter:card'),
      twitterTitle: getMeta('twitter:title'),
      twitterImage: getMeta('twitter:image')
    };
  })()`;
}

/**
 * Validates actual rendered page metadata against expected canonical, OpenGraph, and Twitter tags.
 */
export function validatePageMetadata(actual, expectedArticle) {
  if (!expectedArticle || !expectedArticle.metadata) return true;
  const exp = expectedArticle.metadata;
  if (!actual) {
    throw new Error(`Rendered page metadata missing for ${expectedArticle.slug}`);
  }
  if (actual.canonical !== exp.canonical) {
    throw new Error(`Canonical URL mismatch for ${expectedArticle.slug}: expected '${exp.canonical}', got '${actual.canonical}'`);
  }
  if (actual.ogTitle !== exp.ogTitle) {
    throw new Error(`OG title mismatch for ${expectedArticle.slug}: expected '${exp.ogTitle}', got '${actual.ogTitle}'`);
  }
  if (actual.ogUrl !== exp.ogUrl) {
    throw new Error(`OG url mismatch for ${expectedArticle.slug}: expected '${exp.ogUrl}', got '${actual.ogUrl}'`);
  }
  if (actual.ogImage !== exp.ogImage) {
    throw new Error(`OG image mismatch for ${expectedArticle.slug}: expected '${exp.ogImage}', got '${actual.ogImage}'`);
  }
  if (actual.twitterCard !== exp.twitterCard) {
    throw new Error(`Twitter card mismatch for ${expectedArticle.slug}: expected '${exp.twitterCard}', got '${actual.twitterCard}'`);
  }
  if (actual.twitterTitle !== exp.twitterTitle) {
    throw new Error(`Twitter title mismatch for ${expectedArticle.slug}: expected '${exp.twitterTitle}', got '${actual.twitterTitle}'`);
  }
  if (actual.twitterImage !== exp.twitterImage) {
    throw new Error(`Twitter image mismatch for ${expectedArticle.slug}: expected '${exp.twitterImage}', got '${actual.twitterImage}'`);
  }
  return true;
}

/**
 * Validates screenshot PNG buffer using multi-layer format inspection & full Sharp pixel decompression.
 * Rejects non-PNG buffers (including JPEGs of expected size), corrupt IDAT streams,
 * and enforces exact Math.ceil(scrollHeight) * DPR height.
 */
export async function validateScreenshotPng(buffer, metrics, targetWidth, dpr = DEVICE_SCALE_FACTOR) {
  if (!Buffer.isBuffer(buffer)) {
    throw new Error(`Screenshot buffer at ${targetWidth}px is not a Buffer`);
  }

  // 1. Verify 8-byte PNG magic signature
  const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (buffer.length < 8 || !buffer.subarray(0, 8).equals(PNG_SIGNATURE)) {
    throw new Error(`Screenshot buffer at ${targetWidth}px is not a PNG (invalid PNG magic signature)`);
  }

  // 2. Verify format via metadata()
  let meta;
  try {
    meta = await sharp(buffer).metadata();
  } catch (err) {
    throw new Error(`Screenshot buffer at ${targetWidth}px failed PNG metadata inspection: ${err.message}`);
  }
  if (meta.format !== "png") {
    throw new Error(`Screenshot buffer at ${targetWidth}px input format is ${meta.format}, expected png`);
  }

  // 3. Fully decompress raw pixel stream to catch corrupt IDAT streams
  let info;
  try {
    const res = await sharp(buffer).raw().toBuffer({ resolveWithObject: true });
    info = res.info;
  } catch (err) {
    throw new Error(`Screenshot buffer at ${targetWidth}px failed complete PNG decode (corrupt IDAT/stream): ${err.message}`);
  }

  if (!info || !info.width || !info.height) {
    throw new Error(`Screenshot at ${targetWidth}px could not decode raw pixel stream`);
  }

  const expectedPixelWidth = targetWidth * dpr;
  if (info.width !== expectedPixelWidth) {
    throw new Error(`Screenshot PNG pixel width mismatch at ${targetWidth}px: expected ${expectedPixelWidth}px (${targetWidth} CSS px * DPR ${dpr}), got ${info.width}px`);
  }

  const expectedPixelHeight = Math.ceil(metrics.scrollHeight) * dpr;
  if (info.height !== expectedPixelHeight) {
    throw new Error(
      `Screenshot PNG pixel height mismatch at ${targetWidth}px: expected ${expectedPixelHeight}px (scrollHeight ${Math.ceil(metrics.scrollHeight)} CSS px * DPR ${dpr}), got ${info.height}px`
    );
  }

  return { width: info.width, height: info.height, channels: info.channels };
}

/**
 * Creates an isolated run bundle directory.
 */
export function createRunBundleDir(baseDir = RUNS_BASE_DIR) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const runBundleDir = path.join(baseDir, `run-${timestamp}`);
  fs.mkdirSync(runBundleDir, { recursive: true });
  return runBundleDir;
}

/**
 * Validates that all candidate files in bundleDir exist.
 */
export function validateBundleComplete(bundleDir, expectedFiles) {
  for (const f of expectedFiles) {
    const fullPath = path.join(bundleDir, f);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Incomplete bundle: missing candidate file ${f}`);
    }
  }
  return true;
}

/**
 * Executes deterministic CDP capture harness with support for dependency-injected primitives.
 */
export async function runHarness(options = {}) {
  const spawnChrome = options.spawnChrome || spawn;
  const fetchImpl = options.fetchImpl || globalThis.fetch;
  const WebSocketImpl = options.WebSocketImpl || globalThis.WebSocket;
  const rmSyncImpl = options.rmSync || fs.rmSync;
  const sleepImpl = options.sleepImpl || ((ms) => new Promise((resolve) => setTimeout(resolve, ms)));
  const checkPortImpl = options.checkPort || checkPortAvailable;
  const chromePath = options.chromePath || CHROME_PATH;
  const runsBaseDir = options.runsBaseDir || RUNS_BASE_DIR;

  const isSmoke390 = Boolean(options.smoke390 || process.argv.includes("--smoke-390"));
  const targetArticles = isSmoke390 ? (options.articles || SMOKE_ARTICLES) : [options.article || EXPECTED_ARTICLE];
  const targetWidths = isSmoke390 ? [390] : (options.widths || TARGET_WIDTHS);

  const url = options.url || DEFAULT_URL;
  const targetPort = options.targetPort || DEFAULT_PORT;
  if (!isSmoke390) {
    validateTargetUrl(url, targetPort);
  }

  const cdpPort = options.port || 9222;
  const overallTimeoutMs = options.overallTimeoutMs || OVERALL_HARNESS_TIMEOUT_MS;

  const portFree = await checkPortImpl(cdpPort);
  if (!portFree) {
    throw new Error(`Port ${cdpPort} is already in use. Aborting to avoid touching unknown browser sessions.`);
  }

  const runBundleDir = createRunBundleDir(runsBaseDir);
  console.log(`[CDP Harness] Run bundle directory: ${runBundleDir}`);

  const tempProfileDir = fs.mkdtempSync(path.join(os.tmpdir(), "sr-chrome-profile-"));
  console.log(`[CDP Harness] Isolated user-data-dir created: ${tempProfileDir}`);

  const abortController = new AbortController();
  const overallTimer = setTimeout(() => {
    abortController.abort(new Error(`CDP Harness exceeded overall execution deadline (${overallTimeoutMs}ms)`));
  }, overallTimeoutMs);

  let chromeProc = null;
  let chromeExited = false;
  let ws = null;
  let targetId = null;
  const consoleLogs = [];
  const pageExceptions = [];
  const blockedRequests = [];
  const expectedArtifacts = [];
  const sessionReport = {
    timestamp: new Date().toISOString(),
    url,
    deviceScaleFactor: DEVICE_SCALE_FACTOR,
    viewports: [],
    consoleLogs,
    pageExceptions,
    blockedRequests,
    status: "IN_PROGRESS"
  };

  const pending = new Map();
  let msgId = 1;

  abortController.signal.addEventListener("abort", () => {
    const reason = abortController.signal.reason || new Error("Operation aborted");
    for (const [, { reject, timer }] of pending) {
      clearTimeout(timer);
      reject(reason);
    }
    pending.clear();
    if (ws) {
      try { ws.close(); } catch {}
    }
  });

  let runError = null;
  let allViewportsPassed = false;

  try {
    // Round 5: Verify target figure readiness and ROI logic via negative probes before launch
    await testTargetFigureReadinessProbe();
    testVisibleImageRoiProbes();

    console.log(`[CDP Harness] Launching headless Chrome (isolated profile, port ${cdpPort})...`);
    const chromeArgs = buildChromeArgs({ cdpPort, userDataDir: tempProfileDir });
    chromeProc = spawnChrome(chromePath, chromeArgs, { stdio: ["ignore", "ignore", "pipe"] });

    chromeProc.once("exit", () => {
      chromeExited = true;
    });

    const { childDevToolsWsUrl, childGuid } = await new Promise((resolve, reject) => {
      let stderrAccum = "";
      const timer = setTimeout(() => {
        reject(new Error(`Timed out waiting for Chrome DevTools listening log from PID ${chromeProc?.pid}. Stderr: [${stderrAccum.trim()}]`));
      }, 15000);

      chromeProc.stderr.on("data", (chunk) => {
        const text = chunk.toString();
        stderrAccum += text;
        const match = stderrAccum.match(/DevTools listening on (ws:\/\/(?:127\.0\.0\.1|localhost):(\d+)\/devtools\/browser\/([^\s\r\n]+))/i);
        if (match) {
          clearTimeout(timer);
          const boundPort = parseInt(match[2], 10);
          if (boundPort !== cdpPort) {
            reject(new Error(`Chrome bound to port ${boundPort}, expected ${cdpPort}`));
          } else {
            resolve({ childDevToolsWsUrl: match[1], childGuid: match[3] });
          }
        }
      });

      chromeProc.once("error", (err) => {
        clearTimeout(timer);
        reject(new Error(`Chrome spawn error: ${err.message}. Stderr: [${stderrAccum.trim()}]`));
      });

      chromeProc.once("exit", (code, signal) => {
        clearTimeout(timer);
        reject(new Error(`Chrome exited prematurely with code ${code}, signal ${signal}. Stderr: [${stderrAccum.trim()}]`));
      });
    });

    console.log(`[CDP Harness] Verified child Chrome PID ${chromeProc.pid} listening at ${childDevToolsWsUrl} (GUID: ${childGuid})`);

    const versionRes = await fetchImpl(`http://127.0.0.1:${cdpPort}/json/version`, {
      signal: AbortSignal.any([abortController.signal, AbortSignal.timeout(3000)])
    });
    if (!versionRes.ok) {
      throw new Error(`Failed to fetch /json/version on port ${cdpPort}: HTTP ${versionRes.status}`);
    }
    const versionData = await versionRes.json();
    if (!versionData.webSocketDebuggerUrl) {
      throw new Error(`/json/version missing webSocketDebuggerUrl`);
    }

    const versionWsUrlNormalized = versionData.webSocketDebuggerUrl.replace("ws://localhost:", "ws://127.0.0.1:");
    const childWsUrlNormalized = childDevToolsWsUrl.replace("ws://localhost:", "ws://127.0.0.1:");

    if (versionWsUrlNormalized !== childWsUrlNormalized || !versionData.webSocketDebuggerUrl.includes(childGuid)) {
      throw new Error(
        `DevTools endpoint verification failed: /json/version webSocketDebuggerUrl (${versionData.webSocketDebuggerUrl}) does not match child process DevTools URL (${childDevToolsWsUrl})`
      );
    }
    console.log(`[CDP Harness] Endpoint ownership cryptographically verified for browser GUID ${childGuid}`);

    const createTargetRes = await fetchImpl(`http://127.0.0.1:${cdpPort}/json/new?about:blank`, {
      method: "PUT",
      signal: AbortSignal.any([abortController.signal, AbortSignal.timeout(3000)])
    });
    if (!createTargetRes.ok) {
      throw new Error(`Failed to create dedicated target: HTTP ${createTargetRes.status}`);
    }
    const targetInfo = await createTargetRes.json();
    targetId = targetInfo.id;
    const targetWsUrl = targetInfo.webSocketDebuggerUrl;

    if (!targetWsUrl) {
      throw new Error("Dedicated target created but missing webSocketDebuggerUrl");
    }

    ws = new WebSocketImpl(targetWsUrl);
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("WebSocket connect timeout (5s)")), 5000);
      ws.onopen = () => {
        clearTimeout(timer);
        resolve();
      };
      ws.onerror = (err) => {
        clearTimeout(timer);
        reject(err);
      };
    });
    console.log("[CDP Harness] Dedicated WebSocket connected.");

    ws.onclose = (event) => {
      for (const [, { reject, timer }] of pending) {
        clearTimeout(timer);
        reject(new Error(`WebSocket closed unexpectedly with code ${event.code}`));
      }
      pending.clear();
    };

    ws.onmessage = async (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.method === "Runtime.consoleAPICalled") {
          consoleLogs.push({
            type: msg.params.type,
            text: msg.params.args.map((a) => a.value ?? a.description ?? "").join(" ")
          });
        } else if (msg.method === "Runtime.exceptionThrown") {
          const exc = {
            text: msg.params.exceptionDetails?.text,
            description: msg.params.exceptionDetails?.exception?.description,
            lineNumber: msg.params.exceptionDetails?.lineNumber
          };
          pageExceptions.push(exc);
          console.error(`[CDP Harness] Page exception thrown: ${exc.description || exc.text}`);
        } else if (msg.method === "Fetch.requestPaused") {
          const { requestId, request } = msg.params;
          const allowed = isAllowedRequestUrl(request.url, targetPort);
          if (allowed) {
            send("Fetch.continueRequest", { requestId }).catch(() => {});
          } else {
            console.warn(`[CDP Security] Blocked non-local subrequest: ${request.url}`);
            blockedRequests.push({ url: request.url, stage: "Fetch.requestPaused" });
            send("Fetch.failRequest", { requestId, errorReason: "AccessDenied" }).catch(() => {});
          }
        }

        if (msg.id && pending.has(msg.id)) {
          const { resolve, reject, timer } = pending.get(msg.id);
          clearTimeout(timer);
          pending.delete(msg.id);

          if (msg.error) {
            reject(new Error(`CDP error (${msg.error.code}): ${msg.error.message}`));
          } else if (msg.result?.exceptionDetails) {
            const details = msg.result.exceptionDetails;
            const desc = details.exception?.description || details.text || "Unknown exception";
            reject(new Error(`CDP execution exception: ${desc} at line ${details.lineNumber || 0}`));
          } else {
            resolve(msg.result);
          }
        }
      } catch (err) {
        console.error("[CDP Harness] Failed to parse message:", err);
      }
    };

    function send(method, params = {}, timeoutMs = PER_COMMAND_TIMEOUT_MS) {
      if (abortController.signal.aborted) {
        return Promise.reject(abortController.signal.reason || new Error("Operation aborted"));
      }
      return new Promise((resolve, reject) => {
        const id = msgId++;
        const timer = setTimeout(() => {
          pending.delete(id);
          reject(new Error(`CDP command timeout after ${timeoutMs}ms for ${method}`));
        }, timeoutMs);
        pending.set(id, { resolve, reject, timer });
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    async function evaluate(expression, timeoutMs = PER_COMMAND_TIMEOUT_MS) {
      const rawRes = await send("Runtime.evaluate", {
        expression,
        returnByValue: true,
        awaitPromise: true
      }, timeoutMs);
      return unpackCdpEvaluateResponse(rawRes);
    }

    await send("Page.enable");
    await send("Runtime.enable");
    await send("DOM.enable");
    await send("Network.enable");

    await send("Fetch.enable", {
      patterns: [{ urlPattern: "*", requestStage: "Request" }]
    });

    for (const article of targetArticles) {
      const articleUrl = `http://127.0.0.1:${targetPort}${article.pathname}`;
      validateTargetUrl(articleUrl, targetPort);

      for (const width of targetWidths) {
        if (abortController.signal.aborted) {
          throw abortController.signal.reason || new Error("Run aborted");
        }

        console.log(`\n======================================================`);
        console.log(`[CDP Harness] Article: ${article.slug} | Viewport: ${width} CSS px (DPR: ${DEVICE_SCALE_FACTOR})`);
        console.log(`======================================================`);

        await send("Emulation.setDeviceMetricsOverride", {
          width,
          height: INITIAL_VIEWPORT_HEIGHT,
          deviceScaleFactor: DEVICE_SCALE_FACTOR,
          mobile: true,
          screenOrientation: { angle: 0, type: "portraitPrimary" }
        });

        await send("Emulation.setUserAgentOverride", {
          userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
        });

        console.log(`[CDP Harness] Navigating to ${articleUrl}...`);
        const navRes = await send("Page.navigate", { url: articleUrl });
        if (navRes.errorText) {
          throw new Error(`Navigation failed at ${width}px for ${article.slug}: ${navRes.errorText}`);
        }

        console.log(`[CDP Harness] Awaiting new document commitment...`);
        const DOC_COMMIT_BUDGET_MS = 15000;
        const docCommitStart = Date.now();
        let docCommitted = false;
        let lastDocCommitError = null;

        while (Date.now() - docCommitStart < DOC_COMMIT_BUDGET_MS) {
          if (abortController.signal.aborted) throw abortController.signal.reason;
          const remainingMs = Math.max(0, DOC_COMMIT_BUDGET_MS - (Date.now() - docCommitStart));
          if (remainingMs <= 100) break;
          const perEvalTimeoutMs = Math.max(500, Math.min(PER_COMMAND_TIMEOUT_MS, remainingMs));
          try {
            const state = await evaluate(`(() => {
              if (document.readyState !== 'interactive' && document.readyState !== 'complete') {
                return { committed: false, reason: 'readyState_' + document.readyState };
              }
              if (window.location.pathname !== '${article.pathname}') {
                return { committed: false, reason: 'wrong_pathname_' + window.location.pathname };
              }
              const h1 = document.querySelector('h1');
              if (!h1 || h1.textContent.trim() !== ${JSON.stringify(article.title)}) {
                return { committed: false, reason: 'wrong_h1_' + (h1 ? h1.textContent.trim() : 'missing') };
              }
              const figures = document.querySelectorAll('figure');
              if (figures.length < ${article.expectedFiguresCount || 3}) {
                return { committed: false, reason: 'figures_count_' + figures.length };
              }
              return { committed: true };
            })()`, perEvalTimeoutMs);

            if (state?.committed) {
              docCommitted = true;
              break;
            }
          } catch (err) {
            lastDocCommitError = err;
          }
          await new Promise((r) => setTimeout(r, 250));
        }

        const docCommitElapsedMs = Date.now() - docCommitStart;
        if (!docCommitted) {
          throw new Error(
            `Document failed to commit expected article ${article.slug} at ${width}px within ${Math.round(docCommitElapsedMs / 1000)}s (budget ${DOC_COMMIT_BUDGET_MS / 1000}s). Last error: ${lastDocCommitError ? lastDocCommitError.message : "none"}`
          );
        }
        console.log(`[CDP Harness] Document committed in ${docCommitElapsedMs}ms. Triggering lazy image loading...`);

        // Explicitly override CSS smooth scrolling behavior so all scrolls are instantaneous
        await evaluate(`(() => {
          if (document.documentElement) document.documentElement.style.scrollBehavior = 'auto';
          if (document.body) document.body.style.scrollBehavior = 'auto';
          return { scrollBehaviorAuto: true };
        })()`);

        // 1. Scroll through figures to trigger lazy image loading
        for (let figIdx = 0; figIdx < (article.expectedFiguresCount || 3); figIdx++) {
          await evaluate(`(() => {
            const figures = document.querySelectorAll('figure');
            if (figures[${figIdx}]) {
              figures[${figIdx}].scrollIntoView({ behavior: 'instant', block: 'center' });
              return { scrolled: true, figureIndex: ${figIdx} };
            }
            return { scrolled: false, figureIndex: ${figIdx} };
          })()`);
          await new Promise((r) => setTimeout(r, 200));
        }

        // 2. Capture bounded representative scrolled viewport PNG for visual review (scrolled to Figure 1)
        console.log(`[CDP Harness] Scrolling to target figure at ${width}px for ${article.slug}...`);
        await evaluate(`(() => {
          const figures = document.querySelectorAll('figure');
          const targetFig = figures[1] || figures[0];
          if (targetFig) {
            targetFig.scrollIntoView({ behavior: 'instant', block: 'center' });
          }
          return { scrollInitiated: true };
        })()`);
        await new Promise((r) => setTimeout(r, 100));

        // Bounded wait for target figure actual visible image load + decode
        console.log(`[CDP Harness] Waiting for target figure image load and decode at ${width}px for ${article.slug}...`);
        const TARGET_FIG_READINESS_BUDGET_MS = 15000;
        const targetFigStartTime = Date.now();
        let targetFigReadiness = null;
        let lastTargetFigError = null;

        while (Date.now() - targetFigStartTime < TARGET_FIG_READINESS_BUDGET_MS) {
          if (abortController.signal.aborted) throw abortController.signal.reason;
          const remainingMs = Math.max(0, TARGET_FIG_READINESS_BUDGET_MS - (Date.now() - targetFigStartTime));
          if (remainingMs <= 100) break;
          const perEvalTimeoutMs = Math.max(500, Math.min(PER_COMMAND_TIMEOUT_MS, remainingMs));
          try {
            targetFigReadiness = await evaluate(buildTargetFigureReadinessScript(1), perEvalTimeoutMs);
            if (targetFigReadiness?.ready) {
              break;
            }
          } catch (err) {
            lastTargetFigError = err;
          }
          await new Promise((r) => setTimeout(r, 100));
        }

        const targetFigElapsedMs = Date.now() - targetFigStartTime;
        if (!targetFigReadiness?.ready) {
          throw new Error(
            `Target figure image failed to load and decode at ${width}px for ${article.slug} within ${Math.round(targetFigElapsedMs / 1000)}s (budget ${TARGET_FIG_READINESS_BUDGET_MS / 1000}s). State: ${JSON.stringify(targetFigReadiness)}, Last error: ${lastTargetFigError ? lastTargetFigError.message : "none"}`
          );
        }
        console.log(`[CDP Harness] Target figure image loaded & decoded (${targetFigReadiness.naturalWidth}x${targetFigReadiness.naturalHeight}) in ${targetFigElapsedMs}ms.`);

        // Re-center after image decode layout settlement
        await evaluate(`(() => {
          const figures = document.querySelectorAll('figure');
          const targetFig = figures[1] || figures[0];
          if (targetFig) {
            targetFig.scrollIntoView({ behavior: 'instant', block: 'center' });
          }
          return { reCentered: true };
        })()`);
        await new Promise((r) => setTimeout(r, 100));

        // Sample settled scrolled geometry immediately before capture to bind actual state
        const scrolledState = await evaluate(`(() => {
          const figures = document.querySelectorAll('figure');
          const header = document.querySelector('header');
          const targetFig = figures[1] || figures[0];
          const img = targetFig ? targetFig.querySelector('img') : null;
          const fRect = targetFig ? targetFig.getBoundingClientRect() : null;
          const iRect = img ? img.getBoundingClientRect() : null;
          const hRect = header ? header.getBoundingClientRect() : null;
          return {
            scrollY: Math.round(window.scrollY),
            scrollX: Math.round(window.scrollX),
            viewportWidth: window.innerWidth,
            viewportHeight: window.innerHeight,
            figureIndex: targetFig ? 1 : 0,
            figureRect: fRect ? { top: Math.round(fRect.top), bottom: Math.round(fRect.bottom), height: Math.round(fRect.height), left: Math.round(fRect.left), right: Math.round(fRect.right), width: Math.round(fRect.width) } : null,
            imageRect: iRect ? { top: Math.round(iRect.top), bottom: Math.round(iRect.bottom), height: Math.round(iRect.height), left: Math.round(iRect.left), right: Math.round(iRect.right), width: Math.round(iRect.width) } : null,
            headerRect: hRect ? { top: Math.round(hRect.top), bottom: Math.round(hRect.bottom), height: Math.round(hRect.height) } : null,
            clearanceFromHeaderBottomPx: (fRect && hRect) ? Math.round(fRect.top - hRect.bottom) : null
          };
        })()`);

        // Capture visible viewport without document-origin clip to avoid off-viewport blank rendering
        const scrolledShotRes = await send("Page.captureScreenshot", {
          format: "png",
          captureBeyondViewport: false,
          fromSurface: true
        });

        const filePrefix = isSmoke390 ? `${article.slug}` : "calibration";
        const scrolledFileName = `${filePrefix}-scrolled-viewport-${width}px.png`;
        const scrolledFilePath = path.join(runBundleDir, scrolledFileName);
        const scrolledBuffer = Buffer.from(scrolledShotRes.data, "base64");
        fs.writeFileSync(scrolledFilePath, scrolledBuffer);

        const scrolledMeta = await sharp(scrolledBuffer).metadata();
        const expectedScrolledWidth = width * DEVICE_SCALE_FACTOR;
        const expectedScrolledHeight = INITIAL_VIEWPORT_HEIGHT * DEVICE_SCALE_FACTOR;
        if (scrolledMeta.width !== expectedScrolledWidth || scrolledMeta.height !== expectedScrolledHeight) {
          throw new Error(
            `Scrolled viewport PNG dimension mismatch at ${width}px for ${article.slug}: expected ${expectedScrolledWidth}x${expectedScrolledHeight}, got ${scrolledMeta.width}x${scrolledMeta.height}`
          );
        }
        const scrolledStats = await sharp(scrolledBuffer).stats();
        const isBlankScrolled = scrolledStats.channels.slice(0, 3).every((c) => c.min === c.max || c.stdev < 1);
        if (isBlankScrolled) {
          throw new Error(
            `Scrolled viewport screenshot at ${width}px for ${article.slug} is blank (solid color RGB ${scrolledStats.channels.slice(0, 3).map((c) => c.min).join(",")}): check capture coordinates/clip`
          );
        }

        // Verify target figure image subregion is not an empty/blank box using true geometric interior intersection
        if (!scrolledState?.imageRect) {
          throw new Error(
            `Target figure image rect is missing or undefined at ${width}px for ${article.slug}: target figure image element or bounding box was not resolved`
          );
        }

        const visibleRoi = computeVisibleImageRoi(
          scrolledState.imageRect,
          width,
          INITIAL_VIEWPORT_HEIGHT,
          DEVICE_SCALE_FACTOR,
          20,
          6
        );

        const imgSubBuffer = await sharp(scrolledBuffer)
          .extract({ left: visibleRoi.left, top: visibleRoi.top, width: visibleRoi.width, height: visibleRoi.height })
          .toBuffer();
        const imgSubStats = await sharp(imgSubBuffer).stats();
        const isImgSubBlank = imgSubStats.channels.slice(0, 3).every((c) => c.min === c.max || c.stdev < 1);
        if (isImgSubBlank) {
          throw new Error(
            `Scrolled viewport target figure image interior region at ${width}px for ${article.slug} is blank / empty box (solid RGB ${imgSubStats.channels.slice(0, 3).map((c) => c.min).join(",")}, interior ROI ${visibleRoi.width}x${visibleRoi.height} at [${visibleRoi.left},${visibleRoi.top}], borderInset ${visibleRoi.borderInsetCss}px)`
          );
        }

        await sharp(scrolledBuffer).raw().toBuffer();
        expectedArtifacts.push(scrolledFileName);

        const scrolledViewportEvidence = {
          fileName: scrolledFileName,
          pixelDimensions: `${expectedScrolledWidth}x${expectedScrolledHeight}`,
          sizeBytes: scrolledBuffer.length,
          scrollPosition: {
            scrollY: scrolledState.scrollY,
            scrollX: scrolledState.scrollX
          },
          viewportDimensions: {
            widthCssPx: width,
            heightCssPx: INITIAL_VIEWPORT_HEIGHT,
            dpr: DEVICE_SCALE_FACTOR
          },
          targetFigureIndex: scrolledState.figureIndex,
          figureRect: scrolledState.figureRect,
          imageRect: scrolledState.imageRect,
          visibleRoi,
          headerRect: scrolledState.headerRect,
          clearanceFromHeaderBottomPx: scrolledState.clearanceFromHeaderBottomPx
        };

        // 3. Instantaneous top reset: explicitly override smooth scroll and assert scroll coordinates reach (0, 0)
        console.log(`[CDP Harness] Executing instantaneous top reset at ${width}px for ${article.slug}...`);
        await evaluate(`(() => {
          if (document.documentElement) document.documentElement.style.scrollBehavior = 'auto';
          if (document.body) document.body.style.scrollBehavior = 'auto';
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          return {
            scrollY: window.scrollY,
            scrollX: window.scrollX,
            resetInitiated: true
          };
        })()`);

        let scrollResetClean = false;
        const scrollResetStart = Date.now();
        while (Date.now() - scrollResetStart < 5000) {
          if (abortController.signal.aborted) throw abortController.signal.reason;
          const pos = await evaluate(`(() => {
            if (window.scrollY !== 0 || window.scrollX !== 0) {
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }
            return { scrollY: window.scrollY, scrollX: window.scrollX };
          })()`);
          if (pos && pos.scrollY === 0 && pos.scrollX === 0) {
            scrollResetClean = true;
            break;
          }
          await new Promise((r) => setTimeout(r, 100));
        }
        if (!scrollResetClean) {
          throw new Error(`Scroll position failed to reset cleanly to (0, 0) at ${width}px for ${article.slug} within 5s`);
        }

        console.log(`[CDP Harness] Polling for full DOM, font, and image decode readiness...`);
        const readinessStartTime = Date.now();
        let readinessState = null;

        while (Date.now() - readinessStartTime < READINESS_TIMEOUT_MS) {
          if (abortController.signal.aborted) throw abortController.signal.reason;
          readinessState = await evaluate(buildReadinessScript(width));
          if (readinessState?.ready) {
            break;
          }
          await new Promise((r) => setTimeout(r, 300));
        }

        if (!readinessState?.ready) {
          throw new Error(`Readiness gate failed at ${width}px for ${article.slug} after ${READINESS_TIMEOUT_MS}ms. State: ${JSON.stringify(readinessState)}`);
        }
        console.log(`[CDP Harness] Readiness verified in ${Date.now() - readinessStartTime}ms.`);

        // Verify geometry stability before capture
        console.log(`[CDP Harness] Verifying geometry stability before capture at ${width}px for ${article.slug}...`);
        const stab1 = await evaluate(`(() => ({
          scrollY: window.scrollY,
          scrollX: window.scrollX,
          h1Top: Math.round(document.querySelector('h1')?.getBoundingClientRect()?.top ?? 0),
          headerBottom: Math.round(document.querySelector('header')?.getBoundingClientRect()?.bottom ?? 0)
        }))()`);
        await new Promise((r) => setTimeout(r, 100));
        const stab2 = await evaluate(`(() => ({
          scrollY: window.scrollY,
          scrollX: window.scrollX,
          h1Top: Math.round(document.querySelector('h1')?.getBoundingClientRect()?.top ?? 0),
          headerBottom: Math.round(document.querySelector('header')?.getBoundingClientRect()?.bottom ?? 0)
        }))()`);

        if (stab1.scrollY !== 0 || stab2.scrollY !== 0 || stab1.scrollX !== 0 || stab2.scrollX !== 0) {
          throw new Error(
            `Unstable scroll state at ${width}px for ${article.slug}: sample1=(${stab1.scrollX},${stab1.scrollY}), sample2=(${stab2.scrollX},${stab2.scrollY})`
          );
        }
        if (Math.abs(stab1.h1Top - stab2.h1Top) > 1 || Math.abs(stab1.headerBottom - stab2.headerBottom) > 1) {
          throw new Error(
            `Geometry shifted during stabilization at ${width}px for ${article.slug}: H1 top ${stab1.h1Top} -> ${stab2.h1Top}, Header bottom ${stab1.headerBottom} -> ${stab2.headerBottom}`
          );
        }

        const metrics = await evaluate(buildGeometryScript());
        validateDomMetrics(metrics, width, DEVICE_SCALE_FACTOR, article);
        console.log(`[CDP Harness] DOM metrics validated cleanly for ${article.slug}: scrollWidth=${metrics.scrollWidth}, clientWidth=${metrics.clientWidth}, H1 right=${metrics.h1.right}px, clearance=${metrics.h1.top - metrics.header.bottom}px`);

        const pageMetadata = await evaluate(buildMetadataScript());
        if (pageMetadata) {
          validatePageMetadata(pageMetadata, article);
          console.log(`[CDP Harness] Rendered DOM metadata validated for ${article.slug}: canonical=${pageMetadata.canonical}, og:image=${pageMetadata.ogImage}`);
        } else if (isSmoke390) {
          throw new Error(`Rendered DOM metadata missing in smoke-390 mode for ${article.slug}`);
        }

        if (pageExceptions.length > 0) {
          throw new Error(`Page threw unhandled exception(s) during execution: ${JSON.stringify(pageExceptions)}`);
        }

        console.log(`[CDP Harness] Capturing full article screenshot (height: ${Math.ceil(metrics.scrollHeight)} CSS px) for ${article.slug}...`);
        const shotRes = await send("Page.captureScreenshot", {
          format: "png",
          captureBeyondViewport: true,
          fromSurface: true,
          clip: {
            x: 0,
            y: 0,
            width,
            height: Math.ceil(metrics.scrollHeight),
            scale: 1
          }
        });

        const fullFileName = `${filePrefix}-viewport-${width}px.png`;
        const bundleShotPath = path.join(runBundleDir, fullFileName);
        const imgBuffer = Buffer.from(shotRes.data, "base64");
        fs.writeFileSync(bundleShotPath, imgBuffer);

        const pngDims = await validateScreenshotPng(imgBuffer, metrics, width, DEVICE_SCALE_FACTOR);
        console.log(`[CDP Harness] Fully decompressed & validated candidate PNG: ${bundleShotPath} (${imgBuffer.length} bytes, pixel dimensions: ${pngDims.width}x${pngDims.height})`);

        expectedArtifacts.push(fullFileName);
        sessionReport.viewports.push({
          slug: article.slug,
          widthCssPx: width,
          pixelWidth: pngDims.width,
          pixelHeight: pngDims.height,
          fileName: fullFileName,
          sizeBytes: imgBuffer.length,
          metrics,
          metadata: pageMetadata || null,
          scrolledViewportEvidence
        });
      }
    }

    if (abortController.signal.aborted) {
      throw abortController.signal.reason || new Error("Run aborted prior to completion");
    }

    sessionReport.status = "PASS";
    const reportFileName = "measured-metrics.json";
    const reportPath = path.join(runBundleDir, reportFileName);
    fs.writeFileSync(reportPath, JSON.stringify(sessionReport, null, 2));
    expectedArtifacts.push(reportFileName);

    validateBundleComplete(runBundleDir, expectedArtifacts);
    allViewportsPassed = true;
  } catch (err) {
    runError = err;
    sessionReport.status = "FAIL";
    sessionReport.failure = {
      message: err.message,
      stack: err.stack
    };
    console.error(`[CDP Harness] Execution error: ${err.message}`);
  } finally {
    clearTimeout(overallTimer);
    if (ws) {
      try {
        if (targetId) {
          await fetchImpl(`http://127.0.0.1:${cdpPort}/json/close/${targetId}`, {
            method: "PUT",
            signal: AbortSignal.timeout(2000)
          }).catch(() => {});
        }
      } catch {}
      try { ws.close(); } catch {}
    }

    let cleanupError = null;

    if (chromeProc && !chromeExited) {
      console.log("[CDP Harness] Terminating headless Chrome process...");
      chromeProc.kill("SIGTERM");
      const exitPromise = new Promise((resolve) => {
        if (chromeExited) resolve();
        else chromeProc.once("exit", resolve);
      });
      const exited = await Promise.race([
        exitPromise.then(() => true),
        new Promise((resolve) => setTimeout(() => resolve(false), 2000))
      ]);
      if (!exited && !chromeExited) {
        console.warn("[CDP Harness] Chrome did not exit after 2s, sending SIGKILL...");
        chromeProc.kill("SIGKILL");
        await Promise.race([
          exitPromise,
          new Promise((resolve) => setTimeout(resolve, 2000))
        ]);
      }
    }

    if (chromeProc && !chromeExited) {
      cleanupError = new Error(`Cleanup failure: Chrome PID ${chromeProc.pid} is still alive after SIGKILL`);
    }

    const ownChromeExited = !chromeProc || chromeExited;
    if (tempProfileDir && fs.existsSync(tempProfileDir)) {
      if (!ownChromeExited) {
        // Unconfirmed own-Chrome exit: SKIP profile deletion entirely (0 rm calls)
        // Calling recursive rmSync while Chrome process may still be active is unsafe;
        // preserve tempProfileDir path in HOLD receipt for inspection.
        console.warn(`[CDP Harness] Skipping temporary profile deletion: Chrome PID ${chromeProc.pid} exit is unconfirmed`);
      } else {
        // Bounded retry for hypothesized transient ENOTEMPTY / EBUSY directory lock only AFTER verified own-Chrome exit
        // Strictly targeted to own generated tempProfileDir; zero process enumeration or external kills
        const MAX_RM_ATTEMPTS = 5;
        let profileRemoved = false;
        let lastRmErr = null;

        for (let attempt = 1; attempt <= MAX_RM_ATTEMPTS; attempt++) {
          try {
            // maxRetries not nested so outer 5 attempts is true five-attempt bound
            rmSyncImpl(tempProfileDir, { recursive: true, force: true });
            profileRemoved = true;
            console.log(`[CDP Harness] Removed temporary profile: ${tempProfileDir}${attempt > 1 ? ` (on attempt ${attempt})` : ""}`);
            break;
          } catch (e) {
            lastRmErr = e;
            const isTransient = e.code === "ENOTEMPTY" || e.code === "EBUSY" || /ENOTEMPTY|directory not empty|EBUSY|resource busy/i.test(e.message);
            if (isTransient && attempt < MAX_RM_ATTEMPTS) {
              await sleepImpl(100);
              continue;
            }
            break;
          }
        }

        if (!profileRemoved && lastRmErr) {
          const rmErr = new Error(`Cleanup failure: Could not remove temporary profile ${tempProfileDir}: ${lastRmErr.message}`);
          cleanupError = cleanupError ? new Error(`${cleanupError.message}; ${rmErr.message}`) : rmErr;
        }
      }
    }

    const ownedResourcesUnresolved = {
      chromePidAlive: chromeProc && !chromeExited ? chromeProc.pid : null,
      tempProfileLocked: tempProfileDir && fs.existsSync(tempProfileDir) ? tempProfileDir : null
    };

    // Round 4 Item 1: Complete simultaneous preservation of runError, cleanupError, and unresolved resources
    if (runError || cleanupError) {
      const errorReceipt = {
        status: cleanupError ? "HOLD_CLEANUP_FAILURE" : "FAIL",
        timestamp: new Date().toISOString(),
        runError: runError ? { message: runError.message, stack: runError.stack } : null,
        cleanupError: cleanupError ? { message: cleanupError.message, stack: cleanupError.stack } : null,
        ownedResourcesUnresolved,
        sessionReport
      };
      const receiptFileName = cleanupError ? "hold-receipt.json" : "failure-receipt.json";
      try {
        fs.writeFileSync(path.join(runBundleDir, receiptFileName), JSON.stringify(errorReceipt, null, 2));
      } catch {}

      if (runError && cleanupError) {
        const combinedError = new Error(
          `Simultaneous Run and Cleanup Failure:\n[RunError]: ${runError.message}\n[CleanupError]: ${cleanupError.message}`
        );
        combinedError.runError = runError;
        combinedError.cleanupError = cleanupError;
        combinedError.ownedResourcesUnresolved = ownedResourcesUnresolved;
        throw combinedError;
      }
      if (cleanupError) {
        cleanupError.ownedResourcesUnresolved = ownedResourcesUnresolved;
        throw cleanupError;
      }
      if (runError) {
        throw runError;
      }
    }

    if (allViewportsPassed) {
      const manifest = {
        bundleTimestamp: new Date().toISOString(),
        runBundleDir,
        status: "VALIDATED_PASS",
        mode: isSmoke390 ? "smoke-390" : "full-4width",
        artifacts: expectedArtifacts,
        viewports: sessionReport.viewports.map((v) => ({
          slug: v.slug,
          widthCssPx: v.widthCssPx,
          pixelDimensions: `${v.pixelWidth}x${v.pixelHeight}`,
          file: v.fileName,
          sizeBytes: v.sizeBytes
        }))
      };
      fs.writeFileSync(path.join(runBundleDir, "manifest.json"), JSON.stringify(manifest, null, 2));
      console.log(`[CDP Harness] Run bundle complete. Manifest written to ${path.join(runBundleDir, "manifest.json")}`);
      return { sessionReport, runBundleDir, manifest };
    }
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve("scripts/cdp-capture-harness.mjs")) {
  runHarness().catch((err) => {
    console.error("[CDP Harness] Fatal error:", err);
    process.exit(1);
  });
}
