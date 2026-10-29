import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

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

test("social card registry covers all 31 registered blog posts", () => {
  const { blogPosts } = loadModule("src/data/blog.ts");
  const { blogSocialCards } = loadModule("src/data/blog-social-cards.ts");

  assert.equal(blogPosts.length, 31, "Total registered blog posts must be 31");
  assert.equal(Object.keys(blogSocialCards).length, 31, "Total registered social cards must be 31");

  for (const post of blogPosts) {
    assert.ok(blogSocialCards[post.slug], `Post ${post.slug} must have an explicit social card`);
    assert.equal(blogSocialCards[post.slug].slug, post.slug);
  }
});

test("all 31 social card files exist on disk with valid raster formats", () => {
  const { blogSocialCards } = loadModule("src/data/blog-social-cards.ts");

  for (const [slug, card] of Object.entries(blogSocialCards)) {
    assert.ok(card.src.startsWith("/images/"), `${slug}: src must be an absolute public image path`);
    const filePath = path.join(root, "public", card.src.slice(1));
    assert.ok(fs.existsSync(filePath), `${slug}: file must exist on disk at ${filePath}`);
    const stat = fs.statSync(filePath);
    assert.ok(stat.size > 0, `${slug}: file must not be empty`);
    assert.match(card.src, /\.(?:png|jpg|jpeg)$/i, `${slug}: must be a universal raster format (PNG/JPG)`);
  }
});

test("all 31 social cards have strict per-article uniqueness (zero duplicate generic cards)", () => {
  const { blogSocialCards } = loadModule("src/data/blog-social-cards.ts");
  const seenSrcs = new Set();

  for (const [slug, card] of Object.entries(blogSocialCards)) {
    assert.ok(!seenSrcs.has(card.src), `Duplicate social card detected for ${slug}: ${card.src}`);
    seenSrcs.add(card.src);
  }

  assert.equal(seenSrcs.size, 31, "All 31 articles must have completely unique social card files");
});

test("social cards decode cleanly and match declared dimensions", async () => {
  const { blogSocialCards } = loadModule("src/data/blog-social-cards.ts");

  for (const [slug, card] of Object.entries(blogSocialCards)) {
    const filePath = path.join(root, "public", card.src.slice(1));
    const meta = await sharp(filePath).metadata();
    assert.equal(meta.width, card.width, `${slug}: decoded width must match declared width`);
    assert.equal(meta.height, card.height, `${slug}: decoded height must match declared height`);
    assert.ok(meta.width >= 1200, `${slug}: width must be at least 1200px`);
    assert.ok(meta.height >= 630, `${slug}: height must be at least 630px`);
  }
});

test("HDG and typographic cards disclose real attributes honestly without faking photos", () => {
  const { blogSocialCards } = loadModule("src/data/blog-social-cards.ts");

  // 1. HDG must be disclosed as an AI editorial illustration, NOT a real photo
  const hdg = blogSocialCards["hot-dip-galvanized-steel-china-astm-a123-inspection"];
  assert.equal(hdg.cardType, "ai-illustration");
  assert.match(hdg.attribution, /AI-generated editorial illustration/i);
  assert.match(hdg.attribution, /Not a photograph/i);

  // 2. The 18 typographic cards must be declared as editorial cards
  const editorialCardSlugs = [
    "chinese-steel-standard-edition-implementation-translation-dates",
    "cement-baghouse-filter-bags-china-vs-local",
    "steel-mep-quotation-scope-exclusions-checklist",
    "supplier-quotation-drawing-revision-control",
    "procurement-handover-decision-record-checklist",
    "technical-sourcing-brief-before-rfq",
    "procurement-dispute-evidence-pack",
    "specification-change-during-sourcing-requote-checklist",
    "supplier-document-handover-data-book-checklist",
    "expired-supplier-quotation-revalidation-checklist",
    "procurement-submittal-status-fabrication-release",
    "compare-industrial-supplier-quotes-like-for-like",
    "can-chinese-galvanized-steel-coil-compete-in-guatemala",
    "how-to-verify-mill-test-certificates-and-heat-number-traceability-before-steel-shipment",
    "verify-chinese-steel-structure-supplier-before-deposit",
    "china-precast-concrete-supplier-verification",
    "steel-structure-factory-audit-china",
    "pre-shipment-inspection-engineering-materials",
  ];

  assert.equal(editorialCardSlugs.length, 18, "Exactly 18 typographic cards must be tracked");

  for (const slug of editorialCardSlugs) {
    const card = blogSocialCards[slug];
    assert.equal(card.cardType, "editorial-card", `${slug} must be typed as editorial-card`);
    assert.match(card.attribution, /not a photograph/i, `${slug} must state not a photograph`);
  }

  // 3. Technical diagrams must be declared as technical diagrams
  const diagramSlugs = [
    "weld-photo-not-joint-release-evidence",
    "iso-9001-certificate-factory-scope",
    "calibration-sticker-measurement-tolerance",
    "salt-spray-hours-not-service-life",
    "accredited-laboratory-specific-test-scope",
    "xrf-316l-carbon-verification",
    "plywood-crate-solid-wood-skids-ispm15",
    "packing-list-weight-container-vgm",
    "supplier-hs-code-destination-import-classification",
    "epd-carbon-comparison-functional-unit-boundary",
    "accepted-sampling-lot-not-zero-defects",
  ];

  assert.equal(diagramSlugs.length, 11, "Exactly 11 technical diagrams must be tracked");

  for (const slug of diagramSlugs) {
    const card = blogSocialCards[slug];
    assert.equal(card.cardType, "technical-diagram", `${slug} must be typed as technical-diagram`);
  }
});
