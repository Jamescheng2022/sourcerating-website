#!/usr/bin/env node

/**
 * Deterministic SourceRating article preflight.
 *
 * Checks registered blog content, local imagery, source-link syntax and duplicate slugs.
 * Optionally checks actual production HTML, images, blog index and sitemap.
 *
 * It does NOT replace independent fact, copyright, editorial or code review.
 *
 * npm run check:publication
 * node scripts/check-editorial-publication.mjs --slug <slug>
 * node scripts/check-editorial-publication.mjs --slug <slug> --live --origin https://www.sourcerating.com
 */
import fs from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "public");
const DEFAULT_ORIGIN = "https://www.sourcerating.com";
const RASTER_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const SOCIAL_EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);
const errors = [];
const warnings = [];
const checks = [];
const imageCache = new Map();

function usage() {
  console.log("Usage: node scripts/check-editorial-publication.mjs --all | --slug <slug> [--live] [--origin https://www.sourcerating.com]");
}

function parseArgs() {
  const options = { all: false, slug: null, live: false, origin: DEFAULT_ORIGIN };
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--all") options.all = true;
    else if (arg === "--slug") options.slug = args[++i];
    else if (arg === "--live") options.live = true;
    else if (arg === "--origin") options.origin = args[++i];
    else if (arg === "--help" || arg === "-h") { usage(); process.exit(0); }
    else throw new Error("Unknown argument: " + arg);
  }
  if ((options.all && options.slug) || (!options.all && !options.slug)) {
    throw new Error("Choose exactly one of --all or --slug <slug>.");
  }
  if (options.live && !options.slug) throw new Error("--live requires --slug.");
  const base = new URL(options.origin);
  if (base.protocol !== "https:") throw new Error("--origin must use HTTPS.");
  options.origin = base.origin;
  return options;
}

function pass(description) { checks.push(description); }
function fail(description) { errors.push(description); }
function warn(description) { warnings.push(description); }
function assert(condition, description) { if (condition) pass(description); else fail(description); }

function loadBlogPosts() {
  // TypeScript CommonJS transpilation is deliberately scoped to the checked-in blog modules.
  // The canonical registry is src/data/blog.ts; the markdown content directory alone is not a route.
  const cache = new Map();
  const importPrefix = "@/content/blog/";
  function load(relativePath) {
    const safePath = path.posix.normalize(relativePath.replaceAll("\\", "/"));
    if (!safePath.startsWith("src/") || safePath.includes("../")) {
      throw new Error("Unexpected module path " + relativePath);
    }
    if (cache.has(safePath)) return cache.get(safePath);
    const absolutePath = path.join(ROOT, safePath);
    const source = fs.readFileSync(absolutePath, "utf8");
    const output = ts.transpileModule(source, {
      fileName: safePath,
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
      reportDiagnostics: true
    });
    const problems = (output.diagnostics ?? []).filter(x => x.category === ts.DiagnosticCategory.Error);
    if (problems.length) throw new Error("TypeScript syntax error in " + safePath);
    const loadedModule = { exports: {} };
    cache.set(safePath, loadedModule.exports);
    function requireLocal(specifier) {
      if (!specifier.startsWith(importPrefix)) {
        throw new Error("Unexpected blog registry import: " + specifier);
      }
      return load("src/content/blog/" + specifier.slice(importPrefix.length) + ".ts");
    }
    vm.runInNewContext(output.outputText, {
      module: loadedModule, exports: loadedModule.exports, require: requireLocal
    }, { filename: safePath, timeout: 2500 });
    return loadedModule.exports;
  }
  const posts = load("src/data/blog.ts").blogPosts;
  if (!Array.isArray(posts)) throw new Error("The blogPosts registry was not an array.");
  return JSON.parse(JSON.stringify(posts));
}

function localAsset(source, label) {
  if (typeof source !== "string" || !source.startsWith("/") ||
      source.startsWith("//") || source.includes("\\") ||
      source.includes("?") || source.includes("#") ||
      source.split("/").includes("..")) {
    fail(label + ": image must be an absolute, local /public URL without traversal/query.");
    return null;
  }
  const resolved = path.resolve(PUBLIC, "." + source);
  if (!resolved.startsWith(PUBLIC + path.sep) || !fs.existsSync(resolved)) {
    fail(label + ": image file missing from public: " + source);
    return null;
  }
  if (!fs.statSync(resolved).isFile() || fs.statSync(resolved).size === 0) {
    fail(label + ": image is empty or not a file: " + source);
    return null;
  }
  return resolved;
}

async function imageInfo(source, label, declaredWidth, declaredHeight) {
  const file = localAsset(source, label);
  if (!file) return null;
  const ext = path.extname(file).toLowerCase();
  if (![...RASTER_EXTENSIONS, ".svg"].includes(ext)) {
    fail(label + ": unsupported image extension: " + ext);
    return null;
  }
  try {
    if (!imageCache.has(file)) imageCache.set(file, await sharp(file).metadata());
    const info = imageCache.get(file);
    assert(Number.isInteger(info.width) && info.width > 0 &&
      Number.isInteger(info.height) && info.height > 0, label + ": image decodes and has dimensions");
    if (declaredWidth !== undefined) {
      assert(info.width === declaredWidth && info.height === declaredHeight,
        label + ": declared " + declaredWidth + "x" + declaredHeight +
        " matches source " + info.width + "x" + info.height);
    }
    pass(label + ": local image exists: " + source);
    return { ext, width: info.width, height: info.height, file };
  } catch (error) {
    fail(label + ": image cannot be decoded: " + source + " (" + String(error.message) + ")");
    return null;
  }
}

function textLinks(text) {
  return Array.from(String(text || "").matchAll(/\[[^\]]+\]\((https?:\/\/[^\s)]+)\)/g), x => x[1]);
}

function verifyLinks(post, slugs) {
  for (const reference of post.references || []) {
    try {
      const url = new URL(reference.href);
      assert(url.protocol === "https:" && !!url.hostname,
        post.slug + ": valid HTTPS reference " + reference.title);
    } catch {
      fail(post.slug + ": invalid reference URL: " + reference.href);
    }
  }
  for (const block of post.articleBody || []) {
    const strings = block.type === "paragraph" ? [block.text] :
      block.type === "list" ? block.items || [] : [];
    for (const string of strings) {
      for (const link of textLinks(string)) {
        try {
          const url = new URL(link);
          assert(["https:", "http:"].includes(url.protocol),
            post.slug + ": well-formed prose link " + url.hostname);
        } catch {
          fail(post.slug + ": malformed article-body link " + link);
        }
      }
    }
  }
  for (const link of post.relatedLinks || []) {
    if (!link.href || !link.href.startsWith("/") || link.href.startsWith("//")) {
      fail(post.slug + ": related link must be an internal path: " + link.href);
    } else if (link.href.startsWith("/blog/")) {
      const relatedSlug = link.href.slice("/blog/".length).split(/[?#]/)[0];
      // Missing legacy cross-references are reported; do not make an unrelated older
      // post block a documentation-only PR.
      if (!slugs.has(relatedSlug)) warn(post.slug + ": related article not registered: " + relatedSlug);
    }
  }
}

async function verifyPost(post, slugs) {
  const label = "article " + post.slug;
  assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug), label + ": stable URL-safe slug");
  assert(typeof post.title === "string" && post.title.length >= 16, label + ": meaningful headline");
  assert(typeof post.excerpt === "string" && post.excerpt.length >= 35,
    label + ": nonempty search description");
  assert(typeof post.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(post.date) &&
    !Number.isNaN(Date.parse(post.date + "T00:00:00Z")), label + ": ISO publish date");
  assert(Array.isArray(post.sections) && Array.isArray(post.articleBody || []),
    label + ": compatible registered article structure");
  if ((!post.articleBody || post.articleBody.length === 0) &&
      (!post.sections || post.sections.length === 0)) {
    fail(label + ": registered article has no body.");
  }
  if (post.articleBody?.length && (post.ctaHeading || post.ctaBody || post.ctaLabel)) {
    fail(label + ": template CTA is hidden when articleBody exists. Put an honest inline link in the text.");
  }

  verifyLinks(post, slugs);
  if (!(post.references || []).length) {
    warn(label + ": references not supplied; independently confirm sourcing and applicability.");
  }

  if (post.coverImage) {
    const cover = post.coverImage;
    assert(typeof cover.alt === "string" && cover.alt.length >= 18,
      label + ": hero alternative text");
    assert(typeof cover.caption === "string" && cover.caption.length >= 18,
      label + ": hero editorial caption and attribution");
    await imageInfo(cover.src, label + " cover", cover.width, cover.height);
    if (cover.mobileSrc) await imageInfo(cover.mobileSrc, label + " mobile cover");
    if (!SOCIAL_EXTENSIONS.has(path.extname(cover.src).toLowerCase())) {
      warn(label + ": " + cover.src + " is not a universal social-card format; verify production og:image is JPG/PNG.");
    }
  }
  for (const [index, block] of (post.articleBody || []).entries()) {
    if (block.type !== "illustration") continue;
    const figureLabel = label + " figure " + (index + 1);
    assert(typeof block.alt === "string" && block.alt.length >= 18,
      figureLabel + ": alternative text");
    assert(typeof block.caption === "string" && block.caption.length >= 18,
      figureLabel + ": factual caption");
    const desktop = await imageInfo(block.src, figureLabel + " desktop",
      block.width, block.height);
    let mobile = null;
    if (block.mobileSrc) mobile = await imageInfo(block.mobileSrc, figureLabel + " mobile");
    if (desktop?.ext === ".svg" && desktop.width / desktop.height > 1.5 &&
        fs.readFileSync(desktop.file, "utf8").includes("<text") && !mobile) {
      fail(figureLabel + ": wide text-heavy SVG needs an actual mobile-specific figure.");
    }
    if (desktop && mobile && mobile.width > mobile.height) {
      warn(figureLabel + ": mobile-specific figure is still landscape; inspect phone readability.");
    }
  }
}

async function getUrl(url, options = {}) {
  const response = await fetch(url, {
    method: options.method || "GET", redirect: "follow",
    headers: { "user-agent": "SourceRating-Publication-Preflight/1.0" },
    signal: AbortSignal.timeout(20000)
  });
  return response;
}

/**
 * Extract only server-rendered article text; Next.js embeds a second copy of
 * the page in RSC/JSON scripts, which must NOT satisfy the publication gate.
 * Keep inline HTML tags adjacent so emphasized/link text is not split.
 */
export function normalizeVisibleArticleText(html) {
  const scope = String(html).match(/<article\b[^>]*>([\s\S]*?)<\/article>/i)?.[1] || "";
  const withoutScripts = scope
    .replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style\s*>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<\/?(?:p|div|h[1-6]|section|header|footer|li|ol|ul|table|tr|td|th|figure|figcaption|br)\b[^>]*>/gi, " ")
    .replace(/<[^>]+>/g, "");
  return normalizedText(withoutScripts);
}

function normalizedText(value) {
  return String(value ?? "")
    .replace(/&(#x[0-9a-f]+|#[0-9]+|amp|quot|apos|nbsp|lt|gt|ldquo|rdquo|lsquo|rsquo|mdash|ndash);/gi, (matched, code) => {
      const lower = code.toLowerCase();
      if (lower.startsWith("#x")) return String.fromCodePoint(Number.parseInt(lower.slice(2), 16));
      if (lower.startsWith("#")) return String.fromCodePoint(Number.parseInt(lower.slice(1), 10));
      return { amp: "&", quot: '"', apos: "'", nbsp: " ", lt: "<", gt: ">",
        ldquo: "“", rdquo: "”", lsquo: "‘", rsquo: "’", mdash: "—", ndash: "–" }[lower] ?? matched;
    })
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ").trim();
}

function plainBodyText(value) {
  return String(value ?? "")
    .replace(/\[([^\]]+)\]\(https?:\/\/[^\s)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1");
}

function visibleTableHeaderRows(html) {
  const article = String(html).match(/<article\b[^>]*>([\s\S]*?)<\/article>/i)?.[1] || "";
  const rows = [];
  for (const table of article.matchAll(/<table\b[^>]*>([\s\S]*?)<\/table\s*>/gi)) {
    const head = table[1].match(/<thead\b[^>]*>([\s\S]*?)<\/thead\s*>/i)?.[1] || "";
    const headers = Array.from(head.matchAll(/<th\b[^>]*>([\s\S]*?)<\/th\s*>/gi),
      part => normalizedText(part[1].replace(/<[^>]+>/g, "")));
    if (headers.length) rows.push(headers);
  }
  return rows;
}

/**
 * Canonical source-record proof: any changed URL, numeric table cell, image
 * caption or other post property must change the server-rendered digest.
 */
export function hasMatchingPublicationDigest(html, post) {
  const articleTag = String(html).match(/<article\b[^>]*>/i)?.[0] || "";
  const found = articleTag.match(/\bdata-publication-sha256=["']([a-f0-9]{64})["']/i)?.[1] || "";
  const expected = createHash("sha256").update(JSON.stringify(post)).digest("hex");
  return !!found && found === expected;
}

export function missingDeployedText(html, post) {
  const visible = normalizeVisibleArticleText(html);
  const expected = [post.title, post.excerpt, post.coverImage?.caption];
  const requestedHeaders = [];
  if (post.directAnswer) expected.push(post.directAnswer);
  if (post.keyTakeaways?.length) {
    expected.push(post.keyTakeawaysHeading);
    expected.push(...post.keyTakeaways);
  }
  if (post.evidenceChain?.length) {
    expected.push(post.evidenceChainHeading);
    for (const row of post.evidenceChain) {
      expected.push(row.gate, row.evidence, row.requiredMatch);
    }
  }
  for (const block of post.articleBody || []) {
    if (block.type === "paragraph" || block.type === "heading") {
      expected.push(plainBodyText(block.text));
    } else if (block.type === "list") {
      for (const item of block.items || []) expected.push(plainBodyText(item));
    } else if (block.type === "table") {
      requestedHeaders.push(block.headers.map(normalizedText));
      for (const row of block.rows || []) {
        for (const value of row) expected.push(String(value));
      }
    } else if (block.type === "illustration") {
      expected.push(block.caption);
    }
  }
  for (const section of post.sections || []) {
    expected.push(section.heading, plainBodyText(section.body));
    for (const bullet of section.bullets || []) expected.push(plainBodyText(bullet));
    if (section.callout) expected.push(section.callout.label, section.callout.text);
  }
  if (post.checklist?.length) {
    expected.push(post.checklistHeading);
    for (const group of post.checklist) expected.push(group.category, ...group.evidence);
  }
  for (const row of post.decisionMatrix || []) expected.push(row.signal, row.response);
  for (const faq of post.faqs || []) expected.push(faq.question, faq.answer);
  if (post.references?.length) {
    expected.push(post.referencesHeading, post.referencesIntro);
    for (const reference of post.references) expected.push(reference.title, reference.publisher, reference.note);
  }
  for (const related of post.relatedLinks || []) expected.push(related.title, related.description);
  if (!post.articleBody?.length) expected.push(post.ctaHeading, post.ctaBody, post.ctaLabel);

  // Prose and captions must match actual server-rendered article text. An RSC
  // hydration script, canonical slug or metadata copy cannot satisfy this gate.
  const meaningful = expected.filter(value => value != null && String(value).trim())
    .map(normalizedText).filter(value => value.length >= 8);
  if (!meaningful.length || !visible) return ["No rendered article text or no expected editorial text found"];
  const missing = meaningful.filter(value => !visible.includes(value));

  // Exact table THEAD comparisons catch changes in short headers, units, or
  // acceptance categories that would be too short for prose substring checks.
  const availableHeaders = visibleTableHeaderRows(html);
  for (const expectedHeaders of requestedHeaders) {
    const index = availableHeaders.findIndex(row =>
      row.length === expectedHeaders.length &&
      row.every((value, i) => value === expectedHeaders[i]));
    if (index === -1) missing.push("Missing current table header row: " + expectedHeaders.join(" | "));
    else availableHeaders.splice(index, 1);
  }
  return missing;
}

async function verifyLive(post, origin) {
  const slug = post.slug;
  const articlePath = "/blog/" + slug;
  const articleUrl = origin + articlePath;
  const articleResponse = await getUrl(articleUrl);
  assert(articleResponse.status === 200, "production article returns 200: " + articleUrl);
  if (articleResponse.status !== 200) return;
  const html = await articleResponse.text();
  assert(html.includes(slug) && /<h1\b/i.test(html), "article HTML includes expected route and headline");
  assert(hasMatchingPublicationDigest(html, post),
    "production source revision SHA256 matches the exact current registered post (including URLs, table cells and captions)");
  // Unlike a slug/image-only check, this catches stale deployments of revised
  // articles whose URL and media filenames stayed identical.
  const missing = missingDeployedText(html, post);
  assert(missing.length === 0,
    "production rendered article title, excerpt and all prose match the reviewed version" +
    (missing.length ? "; first missing: " + missing[0].slice(0, 130) : ""));
  assert(html.includes(post.coverImage?.src.split("/").pop() || post.slug) ||
         (!post.coverImage && html.includes(post.title)),
    "article HTML includes expected hero asset");
  for (const block of post.articleBody || []) {
    if (block.type !== "illustration") continue;
    assert(html.includes(block.src.split("/").pop()), "inline figure present in public HTML");
    if (block.mobileSrc) {
      assert(html.includes(block.mobileSrc.split("/").pop()), "mobile inline figure present in HTML");
    }
  }
  // Social platforms need an actual raster image. This is independent of the HTML body hero.
  const ogTag = html.match(/<meta\b[^>]*\bproperty=["']og:image["'][^>]*>/i)?.[0] || "";
  const ogSource = ogTag.match(/\bcontent=["']([^"']+)["']/i)?.[1] || "";
  let ogPath = "";
  try { ogPath = new URL(ogSource, origin).pathname.toLowerCase(); } catch { /* check below */ }
  assert([...SOCIAL_EXTENSIONS].some(ext => ogPath.endsWith(ext)),
    "production OpenGraph image uses JPG/PNG rather than SVG/AVIF");

  const [indexResponse, sitemapResponse] = await Promise.all([
    getUrl(origin + "/blog"), getUrl(origin + "/sitemap.xml")
  ]);
  assert(indexResponse.status === 200 &&
    (await indexResponse.text()).includes(articlePath),
    "public blog index lists the new article");
  assert(sitemapResponse.status === 200 &&
    (await sitemapResponse.text()).includes(articlePath),
    "public sitemap includes the article");
  const assets = new Set();
  if (post.coverImage?.src) assets.add(post.coverImage.src);
  if (post.coverImage?.mobileSrc) assets.add(post.coverImage.mobileSrc);
  for (const block of post.articleBody || []) {
    if (block.type === "illustration") {
      assets.add(block.src);
      if (block.mobileSrc) assets.add(block.mobileSrc);
    }
  }
  for (const asset of assets) {
    // The exact public file path must serve the same bytes as the reviewed
    // checkout, even if a publisher reuses an old image filename.
    const expectedPath = localAsset(asset, "production image " + asset);
    if (!expectedPath) continue;
    const response = await getUrl(origin + asset);
    if (response.status !== 200 ||
        !(response.headers.get("content-type") || "").startsWith("image/")) {
      fail("public visual returns non-image or non-200: " + asset);
      continue;
    }
    const reviewedBytes = fs.readFileSync(expectedPath);
    const liveBytes = Buffer.from(await response.arrayBuffer());
    const sha256 = value => createHash("sha256").update(value).digest("hex");
    assert(sha256(liveBytes) === sha256(reviewedBytes),
      "production asset bytes match the reviewed file SHA256: " + asset);
  }
}

async function run() {
  const options = parseArgs();
  const posts = loadBlogPosts();
  const slugs = new Set();
  for (const post of posts) {
    if (slugs.has(post.slug)) fail("Duplicate article slug: " + post.slug);
    slugs.add(post.slug);
  }
  assert(posts.length > 0, "blog registry contains articles");
  assert(slugs.size === posts.length, "no duplicate blog slugs");
  const selected = options.all ? posts : posts.filter(post => post.slug === options.slug);
  if (!selected.length) fail("Requested slug not found in registered blogPosts: " + options.slug);
  for (const post of selected) await verifyPost(post, slugs);
  if (options.live && selected.length && errors.length === 0) {
    await verifyLive(selected[0], options.origin);
  }
  const result = {
    status: errors.length ? "FAIL" : "PASS",
    mode: options.live ? "production-readback" : "source-preflight",
    slug: options.slug || "all", articles: selected.length,
    checks: checks.length, warnings, errors
  };
  console.log(JSON.stringify(result, null, 2));
  if (errors.length) process.exitCode = 1;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) run().catch(error => {
  console.error(JSON.stringify({
    status: "FAIL", cause: String(error.message || error), errors, warnings
  }, null, 2));
  process.exitCode = 1;
});
