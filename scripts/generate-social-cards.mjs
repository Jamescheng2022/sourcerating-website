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
  "Standards reference": { bg: "#0c4a6e", text: "#38bdf8", accent: "#0284c7" },
  "Buyer guides": { bg: "#064e3b", text: "#34d399", accent: "#059669" },
  "Industrial sourcing": { bg: "#78350f", text: "#fbbf24", accent: "#d97706" },
  "Steel materials": { bg: "#1e3a8a", text: "#60a5fa", accent: "#2563eb" },
  "Steel structures": { bg: "#4c1d95", text: "#a78bfa", accent: "#7c3aed" },
  "Precast concrete": { bg: "#334155", text: "#cbd5e1", accent: "#64748b" },
  "Inspection": { bg: "#7f1d1d", text: "#f87171", accent: "#dc2626" },
  "Deep Sourcing #001": { bg: "#7c2d12", text: "#fb923c", accent: "#ea580c" },
};

function escapeXml(unsafe) {
  return String(unsafe || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function wrapText(text, maxCharsPerLine, maxLines = 3) {
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
  const colors = categoryColors[post.category] || { bg: "#1e293b", text: "#94a3b8", accent: "#0ea5e9" };

  const titleLines = wrapText(post.title, 42, 3);
  const excerptLines = wrapText(post.excerpt, 65, 2);

  const titleY = 230;
  const titleLineHeight = 54;
  const excerptY = titleY + titleLines.length * titleLineHeight + 25;
  const excerptLineHeight = 32;

  const titleSvg = titleLines
    .map((line, idx) => `<text x="96" y="${titleY + idx * titleLineHeight}" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="800" fill="#f8fafc" letter-spacing="-0.5">${escapeXml(line)}</text>`)
    .join("\n    ");

  const excerptSvg = excerptLines
    .map((line, idx) => `<text x="96" y="${excerptY + idx * excerptLineHeight}" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="400" fill="#94a3b8">${escapeXml(line)}</text>`)
    .join("\n    ");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b1329" />
      <stop offset="100%" stop-color="#050814" />
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" stroke-width="0.7" opacity="0.35" />
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#bgGrad)" />
  <rect width="${width}" height="${height}" fill="url(#grid)" />

  <!-- Outer frame border -->
  <rect x="36" y="36" width="${width - 72}" height="${height - 72}" rx="12" fill="none" stroke="#1e293b" stroke-width="2" />

  <!-- Top bar -->
  <g transform="translate(96, 85)">
    <!-- Brand -->
    <text x="0" y="24" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="900" fill="#f8fafc" letter-spacing="3">SOURCERATING</text>
    <text x="180" y="24" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#64748b" letter-spacing="2">/ BUYER DECISION RECORD</text>
  </g>

  <!-- Category badge -->
  <g transform="translate(96, 135)">
    <rect x="0" y="0" width="${post.category.length * 11 + 32}" height="32" rx="16" fill="${colors.bg}" stroke="${colors.accent}" stroke-width="1.5" />
    <text x="16" y="21" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="${colors.text}" letter-spacing="0.5">${escapeXml(post.category.toUpperCase())}</text>
  </g>

  <!-- Title & Excerpt -->
  ${titleSvg}
  ${excerptSvg}

  <!-- Divider line -->
  <line x1="96" y1="${height - 110}" x2="${width - 96}" y2="${height - 110}" stroke="#1e293b" stroke-width="1.5" />

  <!-- Bottom metadata bar -->
  <g transform="translate(96, ${height - 65})">
    <text x="0" y="0" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="600" fill="#64748b">sourcerating.com/blog/${escapeXml(post.slug)}</text>
    <text x="${width - 192}" y="0" text-anchor="end" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#475569">SourceRating Typographic Field Note Card • Not a photograph / not AI art</text>
  </g>
</svg>`;

  const outPath = path.join(outputDir, `${post.slug}-social-card.png`);
  await sharp(Buffer.from(svg)).png({ quality: 95, compressionLevel: 8 }).toFile(outPath);
  return outPath;
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
  console.log("All 18 independent social cards successfully generated!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
