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
function assert(condition, description) { condition ? pass(description) : fail(description); }

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
    const module = { exports: {} };
    cache.set(safePath, module.exports);
    function requireLocal(specifier) {
      if (!specifier.startsWith(importPrefix)) {
        throw new Error("Unexpected blog registry import: " + specifier);
      }
      return load("src/content/blog/" + specifier.slice(importPrefix.length) + ".ts");
    }
    vm.runInNewContext(output.outputText, {
      module, exports: module.exports, require: requireLocal
    }, { filename: safePath, timeout: 2500 });
    return module.exports;
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

async function verifyLive(post, origin) {
  const slug = post.slug;
  const articlePath = "/blog/" + slug;
  const articleUrl = origin + articlePath;
  const articleResponse = await getUrl(articleUrl);
  assert(articleResponse.status === 200, "production article returns 200: " + articleUrl);
  if (articleResponse.status !== 200) return;
  const html = await articleResponse.text();
  assert(html.includes(slug) && html.includes("<h1"), "article HTML includes expected route and headline");
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
    const response = await getUrl(origin + asset, { method: "HEAD" });
    assert(response.status === 200 && (response.headers.get("content-type") || "").startsWith("image/"),
      "public visual is accessible: " + asset);
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

run().catch(error => {
  console.error(JSON.stringify({
    status: "FAIL", cause: String(error.message || error), errors, warnings
  }, null, 2));
  process.exitCode = 1;
});
