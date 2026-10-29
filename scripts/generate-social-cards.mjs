#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(root, "public", "images", "blog", "cards");
fs.mkdirSync(outputDir, { recursive: true });

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

const posts = loadModule("src/data/blog.ts").blogPosts;

const categoryColors = {
  "Standards reference": { bg: "#0c4a6e", text: "#38bdf8", border: "#0284c7" },
  "Buyer guides": { bg: "#064e3b", text: "#34d399", border: "#059669" },
  "Industrial sourcing": { bg: "#78350f", text: "#fbbf24", border: "#d97706" },
  "Steel materials": { bg: "#1e3a8a", text: "#60a5fa", border: "#2563eb" },
  "Steel structures": { bg: "#4c1d95", text: "#a78bfa", border: "#7c3aed" },
  "Precast concrete": { bg: "#334155", text: "#cbd5e1", border: "#64748b" },
  "Inspection": { bg: "#7f1d1d", text: "#f87171", border: "#dc2626" },
  "Deep Sourcing #001": { bg: "#7c2d12", text: "#fb923c", border: "#ea580c" },
};

function escapeXml(unsafe) {
  return String(unsafe || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function wrapText(text, maxCharsPerLine, maxLines = 4) {
  const words = text.split(/\s+/);
  const lines = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (testLine.length <= maxCharsPerLine) {
      currentLine = testLine;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
      if (lines.length === maxLines - 1) {
        break;
      }
    }
  }
  if (currentLine && lines.length < maxLines) {
    lines.push(currentLine);
  }
  return lines;
}

const targetSlugs = [
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

async function generateCard(post) {
  const width = 1200;
  const height = 630;
  const colors = categoryColors[post.category] || { bg: "#1e293b", text: "#94a3b8", border: "#0ea5e9" };

  // Dynamic font size and line height based on title length to prevent any truncation
  const titleLen = post.title.length;
  let titleFontSize = 44;
  let titleLineHeight = 52;
  let maxCharsPerTitleLine = 40;

  if (titleLen > 80) {
    titleFontSize = 34;
    titleLineHeight = 42;
    maxCharsPerTitleLine = 52;
  } else if (titleLen > 50) {
    titleFontSize = 38;
    titleLineHeight = 46;
    maxCharsPerTitleLine = 46;
  }

  const titleLines = wrapText(post.title, maxCharsPerTitleLine, 4);
  const excerptLines = wrapText(post.excerpt, 68, 3);

  const titleY = 195;
  const excerptY = titleY + titleLines.length * titleLineHeight + 28;
  const excerptLineHeight = 30;

  const fontStack = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

  const titleSvg = titleLines
    .map((line, idx) => `<text x="80" y="${titleY + idx * titleLineHeight}" font-family="${fontStack}" font-size="${titleFontSize}" font-weight="700" fill="#f8fafc" letter-spacing="-0.3">${escapeXml(line)}</text>`)
    .join("\n    ");

  const excerptSvg = excerptLines
    .map((line, idx) => `<text x="80" y="${excerptY + idx * excerptLineHeight}" font-family="${fontStack}" font-size="20" font-weight="400" fill="#94a3b8" letter-spacing="0.1">${escapeXml(line)}</text>`)
    .join("\n    ");

  const badgeText = `FIELD NOTE · ${post.category.toUpperCase()}`;
  const badgeWidth = Math.max(160, badgeText.length * 8.5 + 28);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <!-- Dignified solid editorial background (no generic SaaS gradients) -->
  <rect width="${width}" height="${height}" fill="#0b1120" />

  <!-- Clean inner architectural border -->
  <rect x="32" y="32" width="${width - 64}" height="${height - 64}" rx="8" fill="none" stroke="#1e293b" stroke-width="2" />

  <!-- Top bar: Brand & Section cleanly separated with zero overlap -->
  <g transform="translate(80, 75)">
    <text x="0" y="20" font-family="${fontStack}" font-size="20" font-weight="900" fill="#f8fafc" letter-spacing="4">SOURCERATING</text>
  </g>

  <!-- Category & Section Badge: Distinct FIELD NOTE badge positioned safely below brand -->
  <g transform="translate(80, 115)">
    <rect x="0" y="0" width="${badgeWidth}" height="30" rx="15" fill="${colors.bg}" stroke="${colors.border}" stroke-width="1.5" />
    <text x="14" y="20" font-family="${fontStack}" font-size="12" font-weight="700" fill="${colors.text}" letter-spacing="0.8">${escapeXml(badgeText)}</text>
  </g>

  <!-- Title & Excerpt -->
  ${titleSvg}
  ${excerptSvg}

  <!-- Lower divider rule -->
  <line x1="80" y1="${height - 95}" x2="${width - 80}" y2="${height - 95}" stroke="#1e293b" stroke-width="1.5" />

  <!-- Bottom metadata bar -->
  <g transform="translate(80, ${height - 55})">
    <text x="0" y="0" font-family="${fontStack}" font-size="15" font-weight="600" fill="#64748b">sourcerating.com/blog/${escapeXml(post.slug)}</text>
    <text x="${width - 160}" y="0" text-anchor="end" font-family="${fontStack}" font-size="13" font-weight="500" fill="#64748b">SourceRating Editorial Field Note • Typographic layout card (not a photograph / not AI art)</text>
  </g>
</svg>`;

  const outPath = path.join(outputDir, `${post.slug}-social-card.png`);
  await sharp(Buffer.from(svg)).png({ quality: 95, compressionLevel: 8 }).toFile(outPath);
  return outPath;
}

// Composite explicit AI disclosure badge on HDG raster social card
async function generateHdgCard() {
  const avifPath = path.join(root, "public", "images", "blog", "hdg-inspection-editorial-photo-20261019.avif");
  const outPngPath = path.join(root, "public", "images", "blog", "hdg-inspection-editorial-photo-20261019.png");

  const fontStack = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
  const badgeSvg = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="555" width="1200" height="75" fill="rgba(11, 17, 32, 0.92)" />
    <line x1="0" y1="555" x2="1200" y2="555" stroke="#334155" stroke-width="1.5" />
    <text x="40" y="600" font-family="${fontStack}" font-size="16" font-weight="700" fill="#f8fafc" letter-spacing="2">SOURCERATING EDITORIAL</text>
    <text x="1160" y="600" text-anchor="end" font-family="${fontStack}" font-size="15" font-weight="500" fill="#cbd5e1">AI-generated editorial illustration • Not a photograph of a specific factory, supplier or inspection</text>
  </svg>`);

  await sharp(avifPath)
    .resize(1200, 630, { fit: "cover", position: "center" })
    .composite([{ input: badgeSvg, top: 0, left: 0 }])
    .png({ quality: 95, compressionLevel: 8 })
    .toFile(outPngPath);

  console.log(`Updated HDG social card with explicit AI disclosure: ${path.basename(outPngPath)}`);
}

async function main() {
  console.log(`Generating ${targetSlugs.length} independent typographic social cards...`);
  for (const slug of targetSlugs) {
    const post = posts.find((p) => p.slug === slug);
    if (!post) throw new Error(`Post not found: ${slug}`);
    const out = await generateCard(post);
    const stat = fs.statSync(out);
    console.log(`Generated: ${path.basename(out)} (${stat.size} bytes)`);
  }
  await generateHdgCard();
  console.log("All 18 independent social cards + HDG AI card successfully generated!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
