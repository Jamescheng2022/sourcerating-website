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
  expectedFiguresCount: 3,
  figures: [
    {
      index: 0,
      role: "cover",
      expectedDesktopSrc: "calibration-photo-20261031-calibration-lab-desktop.jpg",
      expectedMobileSrc: "calibration-photo-20261031-calibration-lab-mobile.jpg",
      captionSubstring: "Real NASA Armstrong laboratory photograph:",
      expectedLinkHref: "https://commons.wikimedia.org/wiki/File:Calibration_Laboratory_Provides_Key_Aircraft_Support_%28AFRC2019-0098-16%29.jpg"
    },
    {
      index: 1,
      role: "inline-1",
      expectedDesktopSrc: "calibration-photo-20261031-gauge-blocks-desktop.jpg",
      expectedMobileSrc: "calibration-photo-20261031-gauge-blocks-mobile.jpg",
      captionSubstring: "Figure 1. Metric gauge-block set",
      expectedLinkHref: "https://commons.wikimedia.org/wiki/File:GaugeBlockMetricSet.jpg",
      expectedLicenseHref: "https://creativecommons.org/licenses/by-sa/3.0/"
    },
    {
      index: 2,
      role: "inline-2",
      expectedDesktopSrc: "calibration-photo-20261031-digital-protractor-desktop.jpg",
      expectedMobileSrc: "calibration-photo-20261031-digital-protractor-mobile.jpg",
      captionSubstring: "Figure 2. Instrument and setup matter",
      expectedLinkHref: "https://commons.wikimedia.org/wiki/File:Calibration_Laboratory_Provides_Key_Aircraft_Support_%28AFRC2019-0098-02%29.jpg"
    }
  ]
};

/**
 * Validates target URL against canonical origin, protocol, slug, and forbidden preview tokens.
 */
export function validateTargetUrl(urlStr, allowedPort = DEFAULT_PORT) {
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
  if (parsed.pathname !== EXPECTED_ARTICLE.pathname) {
    throw new Error(`Disallowed target path: expected ${EXPECTED_ARTICLE.pathname} (got: ${parsed.pathname})`);
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
 * Generates browser-side geometry extraction script.
 */
export function buildGeometryScript() {
  return `(() => {
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
      if (r.right > clientWidth + 1 && r.width > 0) {
        overflowing.push({
          tag: el.tagName,
          className: typeof el.className === 'string' ? el.className : '',
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
export function validateDomMetrics(metrics, targetWidth, expectedDpr = DEVICE_SCALE_FACTOR) {
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

  if (metrics.pathname !== EXPECTED_ARTICLE.pathname) {
    throw new Error(`Wrong article pathname at ${targetWidth}px: expected '${EXPECTED_ARTICLE.pathname}', got '${metrics.pathname}'`);
  }
  if (!metrics.h1 || metrics.h1.text !== EXPECTED_ARTICLE.title) {
    throw new Error(`Wrong article headline at ${targetWidth}px: expected '${EXPECTED_ARTICLE.title}', got '${metrics.h1?.text}'`);
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

  if (!Array.isArray(metrics.figures) || metrics.figures.length !== EXPECTED_ARTICLE.expectedFiguresCount) {
    throw new Error(`Expected ${EXPECTED_ARTICLE.expectedFiguresCount} figures, found ${metrics.figures?.length} at ${targetWidth}px`);
  }

  for (let i = 0; i < EXPECTED_ARTICLE.figures.length; i++) {
    const expected = EXPECTED_ARTICLE.figures[i];
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
    const hasLink = actual.caption.links && actual.caption.links.some((l) => l.href.includes(expected.expectedLinkHref));
    if (!hasLink) {
      throw new Error(
        `Figure ${i} (${expected.role}) caption credit link missing at ${targetWidth}px: expected link containing '${expected.expectedLinkHref}', got links: ${JSON.stringify(actual.caption.links)}`
      );
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
  const checkPortImpl = options.checkPort || checkPortAvailable;
  const chromePath = options.chromePath || CHROME_PATH;
  const runsBaseDir = options.runsBaseDir || RUNS_BASE_DIR;

  const url = options.url || DEFAULT_URL;
  const targetPort = options.targetPort || DEFAULT_PORT;
  validateTargetUrl(url, targetPort);

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
    console.log(`[CDP Harness] Launching headless Chrome (isolated profile, port ${cdpPort})...`);
    const chromeArgs = buildChromeArgs({ cdpPort, userDataDir: tempProfileDir });
    chromeProc = spawnChrome(chromePath, chromeArgs, { stdio: ["ignore", "ignore", "pipe"] });

    chromeProc.once("exit", () => {
      chromeExited = true;
    });

    const { childDevToolsWsUrl, childGuid } = await new Promise((resolve, reject) => {
      let stderrAccum = "";
      const timer = setTimeout(() => {
        reject(new Error(`Timed out waiting for Chrome DevTools listening log from PID ${chromeProc?.pid}`));
      }, 10000);

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
        reject(new Error(`Chrome spawn error: ${err.message}`));
      });

      chromeProc.once("exit", (code, signal) => {
        clearTimeout(timer);
        reject(new Error(`Chrome exited prematurely with code ${code}, signal ${signal}`));
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

    for (const width of TARGET_WIDTHS) {
      if (abortController.signal.aborted) {
        throw abortController.signal.reason || new Error("Run aborted");
      }

      console.log(`\n======================================================`);
      console.log(`[CDP Harness] Viewport: ${width} CSS px (DPR: ${DEVICE_SCALE_FACTOR})`);
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

      console.log(`[CDP Harness] Navigating to ${url}...`);
      const navRes = await send("Page.navigate", { url });
      if (navRes.errorText) {
        throw new Error(`Navigation failed at ${width}px: ${navRes.errorText}`);
      }

      console.log(`[CDP Harness] Awaiting new document commitment...`);
      const docCommitStart = Date.now();
      let docCommitted = false;
      while (Date.now() - docCommitStart < 15000) {
        if (abortController.signal.aborted) throw abortController.signal.reason;
        const state = await evaluate(`(() => {
          if (document.readyState !== 'interactive' && document.readyState !== 'complete') {
            return { committed: false, reason: 'readyState_' + document.readyState };
          }
          if (window.location.pathname !== '${EXPECTED_ARTICLE.pathname}') {
            return { committed: false, reason: 'wrong_pathname_' + window.location.pathname };
          }
          const h1 = document.querySelector('h1');
          if (!h1 || h1.textContent.trim() !== ${JSON.stringify(EXPECTED_ARTICLE.title)}) {
            return { committed: false, reason: 'wrong_h1_' + (h1 ? h1.textContent.trim() : 'missing') };
          }
          const figures = document.querySelectorAll('figure');
          if (figures.length < 3) {
            return { committed: false, reason: 'figures_count_' + figures.length };
          }
          return { committed: true };
        })()`);

        if (state?.committed) {
          docCommitted = true;
          break;
        }
        await new Promise((r) => setTimeout(r, 250));
      }

      if (!docCommitted) {
        throw new Error(`Document failed to commit expected article at ${width}px within 15s`);
      }
      console.log(`[CDP Harness] Document committed in ${Date.now() - docCommitStart}ms. Triggering lazy image loading...`);

      // Explicitly override CSS smooth scrolling behavior so all scrolls are instantaneous
      await evaluate(`(() => {
        if (document.documentElement) document.documentElement.style.scrollBehavior = 'auto';
        if (document.body) document.body.style.scrollBehavior = 'auto';
        return { scrollBehaviorAuto: true };
      })()`);

      // 1. Scroll through figures to trigger lazy image loading
      for (let figIdx = 0; figIdx < 3; figIdx++) {
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
      console.log(`[CDP Harness] Capturing representative scrolled viewport at ${width}px...`);
      await evaluate(`(() => {
        const figures = document.querySelectorAll('figure');
        const targetFig = figures[1] || figures[0];
        if (targetFig) {
          targetFig.scrollIntoView({ behavior: 'instant', block: 'center' });
        }
        return { scrollInitiated: true };
      })()`);
      await new Promise((r) => setTimeout(r, 150));

      // Sample settled scrolled geometry immediately before capture to bind actual state
      const scrolledState = await evaluate(`(() => {
        /* scrolledStateEval */
        const figures = document.querySelectorAll('figure');
        const header = document.querySelector('header');
        const targetFig = figures[1] || figures[0];
        const fRect = targetFig ? targetFig.getBoundingClientRect() : null;
        const hRect = header ? header.getBoundingClientRect() : null;
        return {
          scrollY: Math.round(window.scrollY),
          scrollX: Math.round(window.scrollX),
          viewportWidth: window.innerWidth,
          viewportHeight: window.innerHeight,
          figureIndex: targetFig ? 1 : 0,
          figureRect: fRect ? { top: Math.round(fRect.top), bottom: Math.round(fRect.bottom), height: Math.round(fRect.height) } : null,
          headerRect: hRect ? { top: Math.round(hRect.top), bottom: Math.round(hRect.bottom), height: Math.round(hRect.height) } : null,
          clearanceFromHeaderBottomPx: (fRect && hRect) ? Math.round(fRect.top - hRect.bottom) : null
        };
      })()`);

      const scrolledShotRes = await send("Page.captureScreenshot", {
        format: "png",
        captureBeyondViewport: false,
        fromSurface: true,
        clip: {
          x: 0,
          y: 0,
          width,
          height: INITIAL_VIEWPORT_HEIGHT,
          scale: 1
        }
      });

      const scrolledFileName = `calibration-scrolled-viewport-${width}px.png`;
      const scrolledFilePath = path.join(runBundleDir, scrolledFileName);
      const scrolledBuffer = Buffer.from(scrolledShotRes.data, "base64");
      fs.writeFileSync(scrolledFilePath, scrolledBuffer);

      const scrolledMeta = await sharp(scrolledBuffer).metadata();
      const expectedScrolledWidth = width * DEVICE_SCALE_FACTOR;
      const expectedScrolledHeight = INITIAL_VIEWPORT_HEIGHT * DEVICE_SCALE_FACTOR;
      if (scrolledMeta.width !== expectedScrolledWidth || scrolledMeta.height !== expectedScrolledHeight) {
        throw new Error(
          `Scrolled viewport PNG dimension mismatch at ${width}px: expected ${expectedScrolledWidth}x${expectedScrolledHeight}, got ${scrolledMeta.width}x${scrolledMeta.height}`
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
        headerRect: scrolledState.headerRect,
        clearanceFromHeaderBottomPx: scrolledState.clearanceFromHeaderBottomPx
      };

      // 3. Instantaneous top reset: explicitly override smooth scroll and assert scroll coordinates reach (0, 0)
      console.log(`[CDP Harness] Executing instantaneous top reset at ${width}px...`);
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
          /* scrollResetPoll */
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
        throw new Error(`Scroll position failed to reset cleanly to (0, 0) at ${width}px within 5s`);
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
        throw new Error(`Readiness gate failed at ${width}px after ${READINESS_TIMEOUT_MS}ms. State: ${JSON.stringify(readinessState)}`);
      }
      console.log(`[CDP Harness] Readiness verified in ${Date.now() - readinessStartTime}ms.`);

      // Verify geometry stability before capture: sample scrollY, H1 and header rect across 100ms
      console.log(`[CDP Harness] Verifying geometry stability before capture at ${width}px...`);
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
          `Unstable scroll state at ${width}px: sample1=(${stab1.scrollX},${stab1.scrollY}), sample2=(${stab2.scrollX},${stab2.scrollY})`
        );
      }
      if (Math.abs(stab1.h1Top - stab2.h1Top) > 1 || Math.abs(stab1.headerBottom - stab2.headerBottom) > 1) {
        throw new Error(
          `Geometry shifted during stabilization at ${width}px: H1 top ${stab1.h1Top} -> ${stab2.h1Top}, Header bottom ${stab1.headerBottom} -> ${stab2.headerBottom}`
        );
      }

      const metrics = await evaluate(buildGeometryScript());
      validateDomMetrics(metrics, width, DEVICE_SCALE_FACTOR);
      console.log(`[CDP Harness] DOM metrics validated cleanly: scrollWidth=${metrics.scrollWidth}, clientWidth=${metrics.clientWidth}, H1 right=${metrics.h1.right}px, clearance=${metrics.h1.top - metrics.header.bottom}px`);

      if (pageExceptions.length > 0) {
        throw new Error(`Page threw unhandled exception(s) during execution: ${JSON.stringify(pageExceptions)}`);
      }

      console.log(`[CDP Harness] Capturing full article screenshot (height: ${Math.ceil(metrics.scrollHeight)} CSS px)...`);
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

      const fileName = `calibration-viewport-${width}px.png`;
      const bundleShotPath = path.join(runBundleDir, fileName);
      const imgBuffer = Buffer.from(shotRes.data, "base64");
      fs.writeFileSync(bundleShotPath, imgBuffer);

      const pngDims = await validateScreenshotPng(imgBuffer, metrics, width, DEVICE_SCALE_FACTOR);
      console.log(`[CDP Harness] Fully decompressed & validated candidate PNG: ${bundleShotPath} (${imgBuffer.length} bytes, pixel dimensions: ${pngDims.width}x${pngDims.height})`);

      expectedArtifacts.push(fileName);
      sessionReport.viewports.push({
        widthCssPx: width,
        pixelWidth: pngDims.width,
        pixelHeight: pngDims.height,
        fileName,
        sizeBytes: imgBuffer.length,
        metrics,
        scrolledViewportEvidence
      });
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

    try {
      if (tempProfileDir && fs.existsSync(tempProfileDir)) {
        rmSyncImpl(tempProfileDir, { recursive: true, force: true });
        console.log(`[CDP Harness] Removed temporary profile: ${tempProfileDir}`);
      }
    } catch (e) {
      const rmErr = new Error(`Cleanup failure: Could not remove temporary profile ${tempProfileDir}: ${e.message}`);
      cleanupError = cleanupError ? new Error(`${cleanupError.message}; ${rmErr.message}`) : rmErr;
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
        artifacts: expectedArtifacts,
        viewports: sessionReport.viewports.map((v) => ({
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
