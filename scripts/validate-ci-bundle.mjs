#!/usr/bin/env node
/**
 * Deterministic CI Run Bundle Validator
 * Validates manifest.json, measured-metrics.json, and all 4 viewport PNGs with full-pixel decode.
 * Verifies historic rejected screenshots remain untouched.
 * Writes safe build-identity.json with actual HEAD and parents array.
 */

import assert from "node:assert/strict";
import { execSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

import { TARGET_WIDTHS, INITIAL_VIEWPORT_HEIGHT, DEVICE_SCALE_FACTOR } from "./cdp-capture-harness.mjs";
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

const HISTORIC_REJECTED_HASHES = {
  "320px": "1C3FFB668531EFD2BAE19805AC294FFE581CAF13C233A509FFB7F739988EB4CA",
  "375px": "45CE4B1ECBAF7A578304DE21EC6D8393183D701C4EB3C60B5E07EE270FED18FD",
  "390px": "2F5F9880B9F450C4F596052561D6B06558ECC990356D9BBAE0F26CD2F70E3361",
  "430px": "3D87B85BD1115FD42EEF67344E8D2A490CF61161AD8E1B505191A8E256EB6322"
};

function sha256(bufferOrString) {
  return crypto.createHash("sha256").update(bufferOrString).digest("hex").toUpperCase();
}

function sha256File(filePath) {
  return sha256(fs.readFileSync(filePath));
}

export async function validateCiBundle(options = {}) {
  const runsBase = options.runsBase || path.resolve("docs/editorial/evidence/runs");
  let bundleDir = options.bundleDir;

  if (!bundleDir) {
    if (!fs.existsSync(runsBase)) {
      throw new Error(`Runs directory not found at ${runsBase}`);
    }
    const entries = fs.readdirSync(runsBase, { withFileTypes: true })
      .filter(d => d.isDirectory() && d.name.startsWith("run-"))
      .map(d => path.join(runsBase, d.name));
    if (entries.length !== 1) {
      throw new Error(`Expected exactly one run bundle directory in ${runsBase}, found: ${entries.length}`);
    }
    bundleDir = entries[0];
  }

  console.log(`[CI Validator] Validating run bundle directory: ${bundleDir}`);

  // 1. Validate manifest.json
  const manifestPath = path.join(bundleDir, "manifest.json");
  if (!fs.existsSync(manifestPath)) {
    throw new Error(`Missing manifest.json in bundle ${bundleDir}`);
  }
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  assert.equal(manifest.status, "VALIDATED_PASS", "Manifest status must be VALIDATED_PASS");
  assert.equal(Array.isArray(manifest.viewports), true, "Manifest viewports must be an array");
  assert.equal(manifest.viewports.length, TARGET_WIDTHS.length, `Manifest must contain exactly ${TARGET_WIDTHS.length} viewports`);
  const manifestWidths = manifest.viewports.map(v => v.widthCssPx);
  assert.equal(new Set(manifestWidths).size, TARGET_WIDTHS.length, "Manifest viewports must contain 4 unique widths");
  for (const w of TARGET_WIDTHS) {
    assert.ok(manifestWidths.includes(w), `Manifest missing required target width ${w}px`);
  }

  // 2. Validate measured-metrics.json
  const metricsPath = path.join(bundleDir, "measured-metrics.json");
  if (!fs.existsSync(metricsPath)) {
    throw new Error(`Missing measured-metrics.json in bundle ${bundleDir}`);
  }
  const metrics = JSON.parse(fs.readFileSync(metricsPath, "utf8"));
  assert.equal(metrics.status, "PASS", "Metrics status must be PASS");
  assert.equal(Array.isArray(metrics.viewports), true, "Metrics viewports must be an array");
  assert.equal(metrics.viewports.length, TARGET_WIDTHS.length, `Metrics must contain exactly ${TARGET_WIDTHS.length} viewports`);
  const metricsWidths = metrics.viewports.map(v => v.widthCssPx);
  assert.equal(new Set(metricsWidths).size, TARGET_WIDTHS.length, "Metrics viewports must contain 4 unique widths");
  for (const w of TARGET_WIDTHS) {
    assert.ok(metricsWidths.includes(w), `Metrics missing required target width ${w}px`);
  }
  assert.equal(Array.isArray(metrics.pageExceptions), true, "pageExceptions must be an array");
  assert.equal(metrics.pageExceptions.length, 0, "pageExceptions must be empty for PASS");
  assert.equal(Array.isArray(metrics.blockedRequests), true, "blockedRequests must be an array");

  // 3. Full-pixel Sharp decode and dimension validation joined with manifest & metrics
  const screenshotHashes = {};
  for (const width of TARGET_WIDTHS) {
    const manifestEntry = manifest.viewports.find(v => v.widthCssPx === width);
    assert.ok(manifestEntry, `Missing manifest entry for width ${width}`);
    const metricEntry = metrics.viewports.find(v => v.widthCssPx === width);
    assert.ok(metricEntry, `Missing metric entry for width ${width}`);
    assert.ok(metricEntry.metrics && typeof metricEntry.metrics.scrollHeight === "number", `Metric entry for ${width}px missing scrollHeight`);
    assert.equal(metricEntry.metrics.scrollY, 0, `Metric entry for ${width}px scrollY must be 0`);
    assert.ok(metricEntry.metrics.header, `Metric entry for ${width}px missing header rect`);
    if (metricEntry.metrics.h1 && typeof metricEntry.metrics.h1.top === "number") {
      assert.ok(metricEntry.metrics.header.bottom <= metricEntry.metrics.h1.top, `Header bottom (${metricEntry.metrics.header.bottom}px) must not exceed H1 top (${metricEntry.metrics.h1.top}px) at ${width}px`);
    }
    // Mandatory representative scrolled viewport PNG for visual review
    assert.ok(metricEntry.scrolledViewportEvidence, `Metric entry for ${width}px missing scrolledViewportEvidence`);
    const scrolledFileName = metricEntry.scrolledViewportEvidence.fileName || `calibration-scrolled-viewport-${width}px.png`;
    const scrolledFilePath = path.join(bundleDir, scrolledFileName);
    if (!fs.existsSync(scrolledFilePath)) {
      throw new Error(`Missing representative scrolled viewport screenshot ${scrolledFileName} in bundle ${bundleDir}`);
    }
    const scrolledBuf = fs.readFileSync(scrolledFilePath);
    if (scrolledBuf.length < 8 || !scrolledBuf.subarray(0, 8).equals(PNG_SIGNATURE)) {
      throw new Error(`Scrolled viewport screenshot ${scrolledFileName} is not a valid PNG (magic signature mismatch)`);
    }
    const scrolledDecoded = await sharp(scrolledBuf).raw().toBuffer({ resolveWithObject: true });
    const expectedScrolledWidth = width * DEVICE_SCALE_FACTOR;
    const expectedScrolledHeight = INITIAL_VIEWPORT_HEIGHT * DEVICE_SCALE_FACTOR;
    assert.equal(scrolledDecoded.info.width, expectedScrolledWidth, `${scrolledFileName} pixel width mismatch: expected ${expectedScrolledWidth}, got ${scrolledDecoded.info.width}`);
    assert.equal(scrolledDecoded.info.height, expectedScrolledHeight, `${scrolledFileName} pixel height mismatch: expected ${expectedScrolledHeight}, got ${scrolledDecoded.info.height}`);
    assert.ok(typeof metricEntry.scrolledViewportEvidence.scrollPosition?.scrollY === "number", `scrolledViewportEvidence missing scrollY for ${width}px`);
    assert.ok(metricEntry.scrolledViewportEvidence.scrollPosition.scrollY > 0, `scrolledViewportEvidence scrollY must be > 0 at ${width}px`);

    // Verify scrolled screenshot is not blank / solid uniform color
    const scrolledStats = await sharp(scrolledBuf).stats();
    const isScrolledBlank = scrolledStats.channels.slice(0, 3).every((c) => c.min === c.max || c.stdev < 1);
    if (isScrolledBlank) {
      throw new Error(`Scrolled viewport screenshot ${scrolledFileName} is completely blank (solid uniform color RGB ${scrolledStats.channels.slice(0, 3).map((c) => c.min).join(",")})`);
    }

    screenshotHashes[`scrolled_${width}px`] = sha256(scrolledBuf);

    const fileName = `calibration-viewport-${width}px.png`;
    const filePath = path.join(bundleDir, fileName);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Missing screenshot ${fileName} in bundle ${bundleDir}`);
    }
    const buf = fs.readFileSync(filePath);

    // Assert 8-byte PNG magic signature
    if (buf.length < 8 || !buf.subarray(0, 8).equals(PNG_SIGNATURE)) {
      throw new Error(`Screenshot ${fileName} is not a valid PNG (magic signature mismatch)`);
    }

    // Full pixel decompression
    const decoded = await sharp(buf).raw().toBuffer({ resolveWithObject: true });
    const expectedPixelWidth = width * DEVICE_SCALE_FACTOR;
    const expectedPixelHeight = Math.ceil(metricEntry.metrics.scrollHeight) * DEVICE_SCALE_FACTOR;

    assert.equal(decoded.info.width, expectedPixelWidth, `${fileName} pixel width mismatch: expected ${expectedPixelWidth}, got ${decoded.info.width}`);
    assert.equal(decoded.info.height, expectedPixelHeight, `${fileName} pixel height mismatch: expected ${expectedPixelHeight} (scrollHeight ${metricEntry.metrics.scrollHeight} * DPR ${DEVICE_SCALE_FACTOR}), got ${decoded.info.height}`);
    assert.equal(manifestEntry.pixelDimensions, `${expectedPixelWidth}x${expectedPixelHeight}`, `Manifest pixelDimensions mismatch for ${width}px`);

    // Verify full-page screenshot is not blank / solid uniform color
    const fullStats = await sharp(buf).stats();
    const isFullBlank = fullStats.channels.slice(0, 3).every((c) => c.min === c.max || c.stdev < 1);
    if (isFullBlank) {
      throw new Error(`Screenshot ${fileName} is completely blank (solid uniform color RGB ${fullStats.channels.slice(0, 3).map((c) => c.min).join(",")})`);
    }

    screenshotHashes[`${width}px`] = sha256(buf);
    console.log(`[CI Validator] Verified PNG ${fileName}: ${decoded.info.width}x${decoded.info.height} (${buf.length} bytes, SHA256: ${screenshotHashes[`${width}px`].slice(0, 16)}...)`);
  }

  // 4. Verify historic rejected screenshots remain untouched
  const historicDir = options.historicDir || path.resolve("docs/editorial/evidence/screenshots");
  const verifiedHistoric = {};
  for (const [wKey, expectedHash] of Object.entries(HISTORIC_REJECTED_HASHES)) {
    const hFile = path.join(historicDir, `calibration-viewport-${wKey}.png`);
    if (!fs.existsSync(hFile)) {
      throw new Error(`Mandatory historic rejected screenshot missing: ${hFile}`);
    }
    const hHash = sha256File(hFile);
    assert.equal(hHash, expectedHash, `Historic rejected screenshot ${hFile} was mutated! Expected ${expectedHash}, got ${hHash}`);
    verifiedHistoric[wKey] = hHash;
  }

  // 5. Build and write safe build-identity.json
  let checkoutSha = "unknown";
  let checkoutParents = [];
  try {
    checkoutSha = execSync("git rev-parse HEAD", { encoding: "utf8" }).trim();
    const rawParents = execSync("git log -1 --format=%P HEAD", { encoding: "utf8" }).trim();
    checkoutParents = rawParents ? rawParents.split(/\s+/).filter(Boolean) : [];
  } catch {}

  const harnessSha = fs.existsSync("scripts/cdp-capture-harness.mjs")
    ? sha256File("scripts/cdp-capture-harness.mjs")
    : "unknown";
  const testsSha = fs.existsSync("scripts/test-cdp-harness-static.mjs")
    ? sha256File("scripts/test-cdp-harness-static.mjs")
    : "unknown";

  const buildIdentity = {
    headSha: options.headSha || process.env.HEAD_SHA || checkoutSha,
    baseSha: options.baseSha || process.env.BASE_SHA || "origin/main",
    checkoutSha,
    checkoutParents,
    githubRunId: options.runId || process.env.GITHUB_RUN_ID || "local",
    chromeBin: options.chromeBin || process.env.CHROME_BIN || "google-chrome",
    harnessSha256: harnessSha,
    staticTestsSha256: testsSha,
    screenshotHashes,
    historicRejectedHashes: verifiedHistoric,
    timestamp: new Date().toISOString()
  };

  const identityPath = path.join(bundleDir, "build-identity.json");
  fs.writeFileSync(identityPath, JSON.stringify(buildIdentity, null, 2));
  console.log(`[CI Validator] Recorded verified build identity in ${identityPath}`);

  return { bundleDir, manifest, metrics, buildIdentity };
}

// CLI invocation
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve("scripts/validate-ci-bundle.mjs")) {
  validateCiBundle().then(() => {
    console.log("[CI Validator] All bundle validation checks passed cleanly.");
    process.exit(0);
  }).catch((err) => {
    console.error("[CI Validator] Fatal bundle validation error:", err);
    try {
      const runsBase = path.resolve("docs/editorial/evidence/runs");
      fs.mkdirSync(runsBase, { recursive: true });
      fs.writeFileSync(path.join(runsBase, "validator-failure-receipt.json"), JSON.stringify({
        status: "VALIDATOR_FAILURE",
        error: err.message,
        timestamp: new Date().toISOString()
      }, null, 2));
    } catch {}
    process.exit(1);
  });
}
