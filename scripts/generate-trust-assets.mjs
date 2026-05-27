import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const publicDir = path.join(root, "public");
const brandDir = path.join(publicDir, "brand");
const imageDir = path.join(publicDir, "images");
const downloadDir = path.join(publicDir, "downloads");

await mkdir(brandDir, { recursive: true });
await mkdir(imageDir, { recursive: true });
await mkdir(downloadDir, { recursive: true });

function escXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function logoSvg({ inverted = false, lockup = true } = {}) {
  const bg = inverted ? "#ffffff" : "#12211f";
  const fg = inverted ? "#12211f" : "#ffffff";
  const text = inverted ? "#ffffff" : "#12211f";
  const sub = inverted ? "#9ca3af" : "#5f6f6b";
  const width = lockup ? 640 : 160;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="160" viewBox="0 0 ${width} 160" role="img" aria-label="Source Rating logo">
  <rect width="${width}" height="160" fill="none"/>
  <g transform="translate(24 24)">
    <rect width="112" height="112" rx="18" fill="${bg}"/>
    <path d="M29 31h49.4c12.1 0 19.1 6.2 19.1 16.4 0 7-3.4 12.3-9.9 14.9l12.6 27.7H82L71.7 65.8H49.5V90H29V31Zm20.5 15.4v11.9h27c4 0 6.4-2.2 6.4-6.1 0-3.6-2.4-5.8-6.4-5.8h-27Z" fill="${fg}"/>
    <path d="M29 95h70v8H29v-8Z" fill="${fg}" opacity=".42"/>
  </g>
  ${lockup ? `<g transform="translate(168 43)">
    <text x="0" y="34" fill="${text}" font-family="Arial, Helvetica, sans-serif" font-size="36" font-weight="800">Source Rating</text>
    <text x="0" y="66" fill="${sub}" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="700">FACTORY RISK CHECKS</text>
  </g>` : ""}
</svg>`;
}

function brandBoardSvg() {
  const colors = [
    ["Brand 950", "#12211f"],
    ["Brand 700", "#2f514e"],
    ["Steel", "#66736f"],
    ["Paper", "#f4f6f4"],
    ["Amber", "#e7a83a"],
    ["Risk Red", "#c73b2f"],
  ];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="900" viewBox="0 0 1440 900" role="img" aria-label="Source Rating brand UI board">
  <rect width="1440" height="900" fill="#f4f6f4"/>
  <rect x="72" y="64" width="1296" height="772" fill="#fff" stroke="#d8dfdc"/>
  <g transform="translate(112 104)">
    <text x="0" y="0" fill="#12211f" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700">SOURCE RATING BRAND SYSTEM</text>
    <text x="0" y="58" fill="#12211f" font-family="Arial, Helvetica, sans-serif" font-size="64" font-weight="800">Engineering trust, not decoration.</text>
    <text x="0" y="100" fill="#5f6f6b" font-family="Arial, Helvetica, sans-serif" font-size="24">Minimal audit-led UI for overseas engineering buyers sourcing from China.</text>
  </g>
  <g transform="translate(112 260)">
    ${logoSvg({ lockup: true }).replace(/<svg[^>]*>|<\/svg>/g, "").replaceAll("\n", "\n    ")}
  </g>
  <g transform="translate(112 460)">
    <text x="0" y="0" fill="#12211f" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700">Palette</text>
    ${colors.map(([name, color], i) => `<g transform="translate(${i * 185} 34)"><rect width="140" height="92" fill="${color}" stroke="#d8dfdc"/><text x="0" y="122" fill="#12211f" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="700">${name}</text><text x="0" y="146" fill="#66736f" font-family="Arial, Helvetica, sans-serif" font-size="13">${color}</text></g>`).join("")}
  </g>
  <g transform="translate(112 720)">
    <rect x="0" y="0" width="250" height="54" fill="#12211f"/><text x="24" y="34" fill="#fff" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="700">Request a supplier check</text>
    <rect x="276" y="0" width="218" height="54" fill="#fff" stroke="#b8c3bf"/><text x="300" y="34" fill="#12211f" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="700">Download playbook</text>
    <text x="560" y="34" fill="#66736f" font-family="Arial, Helvetica, sans-serif" font-size="16">Typography: sober, high-contrast, no decorative effects, report-led hierarchy.</text>
  </g>
</svg>`;
}

function reportCoverSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="980" viewBox="0 0 1440 980" role="img" aria-label="Redacted supplier verification report cover sample">
  <rect width="1440" height="980" fill="#eef1ef"/>
  <rect x="160" y="56" width="1120" height="868" fill="#fff" stroke="#cfd8d4"/>
  <rect x="160" y="812" width="1120" height="112" fill="#12211f"/>
  <text x="230" y="140" fill="#12211f" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="800">SOURCE RATING</text>
  <text x="230" y="178" fill="#66736f" font-family="Arial, Helvetica, sans-serif" font-size="18">Independent Verification for Engineering &amp; Construction Materials</text>
  <text x="230" y="292" fill="#12211f" font-family="Arial, Helvetica, sans-serif" font-size="74" font-weight="800">SUPPLIER VERIFICATION</text>
  <text x="230" y="372" fill="#12211f" font-family="Arial, Helvetica, sans-serif" font-size="74" font-weight="800">REPORT</text>
  <line x1="230" y1="418" x2="1110" y2="418" stroke="#c7a35b" stroke-width="3"/>
  ${[
    ["Client", 470, true],
    ["Supplier", 520, true],
    ["Location", 570, false, "Jiangsu, China"],
    ["Industry", 620, false, "Steel Structures / Fabrication"],
    ["Assessment Date", 670, false, "May 2026"],
    ["Report No.", 720, false, "SR-2026-0527-01"],
  ].map(([label, y, redacted, value]) => `<text x="230" y="${y}" fill="#37413f" font-family="Arial, Helvetica, sans-serif" font-size="21">${label}:</text>${redacted ? `<rect x="430" y="${Number(y) - 25}" width="310" height="28" fill="#111827"/>` : `<text x="430" y="${y}" fill="#12211f" font-family="Arial, Helvetica, sans-serif" font-size="21" font-weight="700">${value}</text>`}`).join("")}
  <rect x="815" y="492" width="300" height="156" fill="#f4f6f4" stroke="#cfd8d4"/>
  <text x="842" y="540" fill="#66736f" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700">OVERALL RISK</text>
  <rect x="842" y="565" width="178" height="48" fill="#e7a83a"/>
  <text x="866" y="598" fill="#12211f" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="800">MODERATE</text>
  <text x="230" y="870" fill="#fff" font-family="Arial, Helvetica, sans-serif" font-size="18">On-site verification</text>
  <text x="520" y="870" fill="#fff" font-family="Arial, Helvetica, sans-serif" font-size="18">Evidence based</text>
  <text x="810" y="870" fill="#fff" font-family="Arial, Helvetica, sans-serif" font-size="18">Actionable next steps</text>
  <text x="1060" y="872" fill="#9ca3af" font-family="Arial, Helvetica, sans-serif" font-size="15">SAMPLE / REDACTED</text>
</svg>`;
}

function riskMatrixSvg() {
  const rows = [
    ["Quality management", "Moderate", "High", "Medium", "Medium", "#e7a83a"],
    ["Production capacity", "Low", "High", "Low", "Low", "#89bf8d"],
    ["On-time delivery", "Moderate", "High", "Medium", "Medium", "#e7a83a"],
    ["Financial stability", "Low", "Medium", "Low", "Low", "#89bf8d"],
    ["Certificates", "Moderate", "Medium", "Medium", "Medium", "#e7a83a"],
    ["HSSE", "High", "High", "Medium", "High", "#db6b55"],
  ];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="980" viewBox="0 0 1440 980" role="img" aria-label="Redacted supplier verification risk matrix sample">
  <rect width="1440" height="980" fill="#f4f6f4"/>
  <rect x="120" y="70" width="1200" height="840" fill="#fff" stroke="#cfd8d4"/>
  <text x="180" y="150" fill="#12211f" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="800">Risk Matrix</text>
  <text x="180" y="194" fill="#66736f" font-family="Arial, Helvetica, sans-serif" font-size="19">Client and supplier names redacted. Ratings are sample data for website preview.</text>
  <rect x="180" y="226" width="320" height="24" fill="#111827"/><rect x="540" y="226" width="260" height="24" fill="#111827"/>
  <g transform="translate(180 304)">
    <rect width="1080" height="58" fill="#eef1ef" stroke="#cfd8d4"/>
    ${["Risk category","Level","Impact","Likelihood","Rating","Action"].map((h, i) => `<text x="${[24,350,520,680,850,990][i]}" y="36" fill="#12211f" font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="800">${h}</text>`).join("")}
    ${rows.map((r, i) => {
      const y = 58 + i * 66;
      return `<g transform="translate(0 ${y})"><rect width="1080" height="66" fill="${i % 2 ? "#fff" : "#fbfcfb"}" stroke="#d8dfdc"/><text x="24" y="41" fill="#12211f" font-family="Arial, Helvetica, sans-serif" font-size="17">${r[0]}</text><text x="350" y="41" fill="#37413f" font-family="Arial, Helvetica, sans-serif" font-size="17">${r[1]}</text><text x="520" y="41" fill="#37413f" font-family="Arial, Helvetica, sans-serif" font-size="17">${r[2]}</text><text x="680" y="41" fill="#37413f" font-family="Arial, Helvetica, sans-serif" font-size="17">${r[3]}</text><rect x="835" y="15" width="112" height="36" fill="${r[5]}"/><text x="858" y="39" fill="#12211f" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="800">${r[4]}</text><text x="996" y="42" fill="#12211f" font-family="Arial, Helvetica, sans-serif" font-size="24">→</text></g>`;
    }).join("")}
  </g>
  <g transform="translate(180 766)">
    <rect width="220" height="72" fill="#89bf8d"/><text x="78" y="31" fill="#12211f" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="800">LOW</text><text x="34" y="55" fill="#12211f" font-family="Arial, Helvetica, sans-serif" font-size="14">Manageable risk</text>
    <rect x="250" width="220" height="72" fill="#e7a83a"/><text x="306" y="31" fill="#12211f" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="800">MODERATE</text><text x="286" y="55" fill="#12211f" font-family="Arial, Helvetica, sans-serif" font-size="14">Corrective action</text>
    <rect x="500" width="220" height="72" fill="#db6b55"/><text x="578" y="31" fill="#fff" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="800">HIGH</text><text x="544" y="55" fill="#fff" font-family="Arial, Helvetica, sans-serif" font-size="14">Hold or re-check</text>
  </g>
  <text x="1120" y="862" fill="#66736f" font-family="Arial, Helvetica, sans-serif" font-size="15">SAMPLE / REDACTED</text>
</svg>`;
}

function photoEvidenceSvg() {
  const labels = ["Workshop overview", "Welding operation", "Raw material area", "Dimension check", "Material certificates", "Packaging readiness"];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="980" viewBox="0 0 1440 980" role="img" aria-label="Redacted supplier verification photo evidence page sample">
  <rect width="1440" height="980" fill="#eef1ef"/>
  <rect x="140" y="52" width="1160" height="876" fill="#fff" stroke="#cfd8d4"/>
  <text x="200" y="128" fill="#12211f" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="800">Photo Evidence</text>
  <text x="200" y="168" fill="#66736f" font-family="Arial, Helvetica, sans-serif" font-size="18">Factory visit sample page with client and supplier details redacted.</text>
  <rect x="200" y="198" width="250" height="22" fill="#111827"/><rect x="482" y="198" width="350" height="22" fill="#111827"/>
  <g transform="translate(200 260)">
    ${labels.map((label, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = col * 500;
      const y = row * 190;
      const fill = ["#65716d", "#3e4d49", "#7b8178", "#53615d", "#cbd3d0", "#42514d"][i];
      return `<g transform="translate(${x} ${y})"><rect width="460" height="130" fill="${fill}" stroke="#cfd8d4"/><path d="M0 92 C110 54 180 112 290 62 C360 30 410 64 460 34 L460 130 L0 130 Z" fill="#12211f" opacity=".22"/><rect x="26" y="24" width="132" height="24" fill="#111827" opacity=".74"/><rect x="26" y="62" width="222" height="18" fill="#111827" opacity=".32"/><circle cx="392" cy="48" r="22" fill="#e7a83a"/><text x="0" y="162" fill="#12211f" font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="700">${label}</text></g>`;
    }).join("")}
  </g>
  <rect x="200" y="850" width="920" height="1" fill="#cfd8d4"/>
  <text x="200" y="884" fill="#66736f" font-family="Arial, Helvetica, sans-serif" font-size="15">Note: This is a sample website preview. Actual reports include real site photos and buyer-specific acceptance criteria.</text>
  <text x="1130" y="884" fill="#66736f" font-family="Arial, Helvetica, sans-serif" font-size="15">SAMPLE / REDACTED</text>
</svg>`;
}

await writeFile(path.join(brandDir, "source-rating-logo.svg"), logoSvg({ lockup: true }), "utf8");
await writeFile(path.join(brandDir, "source-rating-mark.svg"), logoSvg({ lockup: false }), "utf8");
await writeFile(path.join(brandDir, "source-rating-brand-board.svg"), brandBoardSvg(), "utf8");
await writeFile(path.join(imageDir, "report-cover-redacted.svg"), reportCoverSvg(), "utf8");
await writeFile(path.join(imageDir, "report-risk-matrix-redacted.svg"), riskMatrixSvg(), "utf8");
await writeFile(path.join(imageDir, "report-photo-evidence-redacted.svg"), photoEvidenceSvg(), "utf8");

const pdfPath = path.join(downloadDir, "source-rating-engineering-supplier-checklist.pdf");

const pages = [
  {
    title: "Engineering Supplier Verification Checklist",
    subtitle: "For overseas buyers evaluating Chinese suppliers before deposit, production, or shipment.",
    body: [
      "Use this checklist to decide what evidence you need before trusting a supplier quotation. It is designed for engineering and construction material packages such as precast concrete, steel structures, MEP components, construction materials, and project equipment.",
      "How to use: score each section from 0 to 3. 0 = unknown, 1 = weak evidence, 2 = acceptable with gaps, 3 = clear evidence. Any critical unknown before deposit should trigger a supplier question, document request, or verification visit.",
      "Contact: contact@sourcerating.com | www.sourcerating.com",
    ],
  },
  {
    title: "1. Supplier Identity and Business Legitimacy",
    body: [
      "[ ] Legal company name matches quotation, bank account, invoice, and export documents.",
      "[ ] Business license, registration status, address, and operating scope reviewed.",
      "[ ] Factory address is confirmed and not only a sales office or trading address.",
      "[ ] Export entity is identified: manufacturer, trading company, or related export company.",
      "[ ] Website, catalogs, certificates, and sales claims are consistent.",
      "[ ] Ownership, related companies, and obvious litigation or blacklist signals checked where available.",
      "Buyer question: Who owns the production process and who will be contractually responsible for quality and delivery?",
    ],
  },
  {
    title: "2. Engineering Documents and Technical Fit",
    body: [
      "[ ] Supplier has received and acknowledged drawings, specifications, standards, and tolerances.",
      "[ ] Key technical requirements are translated into an inspection checklist.",
      "[ ] Supplier can explain critical dimensions, materials, finishes, embedded parts, or welding/coating requirements.",
      "[ ] Drawing revision control is agreed before production starts.",
      "[ ] Samples, mockups, first-article inspection, or trial production are defined when needed.",
      "[ ] Open technical questions are listed with responsible person and due date.",
      "Red flag: Supplier only discusses price and delivery, but cannot respond to drawing-specific questions.",
    ],
  },
  {
    title: "3. Factory Capability and Capacity",
    body: [
      "[ ] Workshop, equipment, molds, lines, tooling, and workforce match the quoted product.",
      "[ ] Current workload and available capacity have been checked against promised delivery date.",
      "[ ] Subcontracted processes are identified: welding, galvanizing, coating, machining, testing, packing, or assembly.",
      "[ ] Production flow is clear from incoming material to final packing.",
      "[ ] Bottlenecks and capacity constraints are documented.",
      "[ ] Similar past projects or production examples are reviewed with evidence.",
      "Buyer question: Which processes are done in-house, and which are outsourced?",
    ],
  },
  {
    title: "4. QA/QC, Certificates, and Traceability",
    body: [
      "[ ] Incoming material inspection and traceability process reviewed.",
      "[ ] Material certificates, test reports, and compliance documents match the order requirements.",
      "[ ] In-process and final inspection records are available and credible.",
      "[ ] Nonconformity handling and corrective action process is visible.",
      "[ ] Inspection responsibility is clear: factory QC, third-party inspector, buyer engineer, or all three.",
      "[ ] Hold points are defined before irreversible steps such as casting, coating, packing, or shipment.",
      "Red flag: Certificates are available but cannot be linked to batch, heat number, lot, or production record.",
    ],
  },
  {
    title: "5. Production Monitoring and Schedule Risk",
    body: [
      "[ ] Production schedule includes critical milestones, not only final shipment date.",
      "[ ] Supplier provides weekly progress evidence for long or high-risk orders.",
      "[ ] Delay risks are linked to materials, labor, subcontracting, tooling, approvals, or testing.",
      "[ ] Rework and quality drift are tracked before shipment.",
      "[ ] Change requests and drawing revisions are recorded.",
      "[ ] Escalation path is agreed if progress falls behind plan.",
      "Buyer question: What evidence will we receive each week that production is on track?",
    ],
  },
  {
    title: "6. Pre-Shipment Inspection and Release",
    body: [
      "[ ] Quantity, model, markings, labels, packing list, and visible condition checked.",
      "[ ] Dimensions, finish, workmanship, coating, welding, assembly, or other key features spot-checked.",
      "[ ] Packaging method is suitable for export, handling, weather exposure, and project site storage.",
      "[ ] Photos are taken for goods, labels, packing, defects, corrections, and loading readiness.",
      "[ ] Final documents are consistent: invoice, packing list, certificates, test reports, and shipment marks.",
      "[ ] Shipment release recommendation is explicit: release, hold, correct, recheck, or request more evidence.",
      "Red flag: Supplier pushes for shipment release before documents and packing are complete.",
    ],
  },
  {
    title: "7. Risk Scoring Matrix",
    body: [
      "Score each category from 0 to 3:",
      "0 = unknown / not checked",
      "1 = weak evidence / high uncertainty",
      "2 = acceptable but with gaps",
      "3 = clear evidence / low concern",
      "",
      "[ ] Supplier identity: ____ / 3",
      "[ ] Engineering document fit: ____ / 3",
      "[ ] Factory capability: ____ / 3",
      "[ ] QA/QC and traceability: ____ / 3",
      "[ ] Production schedule: ____ / 3",
      "[ ] Shipment readiness: ____ / 3",
      "",
      "Decision guide: 15-18 = proceed with normal controls. 10-14 = proceed only with corrective actions. 6-9 = verify before deposit or shipment. 0-5 = high risk; pause and investigate.",
    ],
  },
  {
    title: "8. Supplier Questions to Send Before a Visit",
    body: [
      "1. Please confirm the exact factory address where our order will be produced.",
      "2. Which processes are performed in-house and which are subcontracted?",
      "3. Please provide recent QA/QC records for a similar product.",
      "4. Please provide material certificates and explain how they link to production batches.",
      "5. What are the main production risks for our order and how will they be controlled?",
      "6. What are the proposed inspection hold points before shipment?",
      "7. Who is the technical contact responsible for drawings, revisions, and quality questions?",
      "8. Can you share packing photos and loading readiness evidence before release?",
    ],
  },
  {
    title: "9. When to Request Source Rating Support",
    body: [
      "Request a desk check when you have a supplier link but need a quick first-pass risk review.",
      "Request a factory verification visit before deposit, supplier approval, contract signature, or high-value order confirmation.",
      "Request production monitoring when delays, rework, or hidden quality drift could create project cost.",
      "Request pre-shipment inspection before goods leave the factory.",
      "",
      "Free early-stage offer: send one supplier link, product category, project country, and your main concern. Source Rating can provide a concise first-pass risk screen for suitable engineering material inquiries. On-site visits, lab testing, legal opinions, and multi-supplier sourcing are separate paid scopes.",
      "",
      "Email: contact@sourcerating.com",
    ],
  },
];

function escapePdfText(text) {
  return String(text).replaceAll("\\", "\\\\").replaceAll("(", "\\(").replaceAll(")", "\\)");
}

function wrapText(text, maxChars) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    if (!word) continue;
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function pageStream(page, index, total) {
  const parts = [];
  parts.push("BT /F2 20 Tf 54 792 Td (SOURCE RATING) Tj ET");
  parts.push("0.18 0.32 0.30 rg 54 764 504 1 re f");
  parts.push(`BT /F2 24 Tf 54 724 Td (${escapePdfText(page.title)}) Tj ET`);
  if (page.subtitle) {
    for (const [i, line] of wrapText(page.subtitle, 82).entries()) {
      parts.push(`BT /F1 11 Tf 54 ${696 - i * 16} Td (${escapePdfText(line)}) Tj ET`);
    }
  }
  let y = page.subtitle ? 650 : 690;
  for (const paragraph of page.body) {
    if (paragraph === "") {
      y -= 12;
      continue;
    }
    const isCheck = paragraph.startsWith("[ ]");
    const lines = wrapText(paragraph, isCheck ? 92 : 96);
    for (const line of lines) {
      if (y < 80) break;
      parts.push(`BT /F1 ${isCheck ? 10.5 : 11} Tf 54 ${y} Td (${escapePdfText(line)}) Tj ET`);
      y -= isCheck ? 16 : 17;
    }
    y -= 7;
  }
  parts.push("0.90 0.93 0.92 rg 54 48 504 1 re f");
  parts.push(`BT /F1 9 Tf 54 32 Td (${escapePdfText(`Source Rating | Engineering Supplier Verification Checklist | Page ${index + 1} of ${total}`)}) Tj ET`);
  return parts.join("\n");
}

function buildPdf() {
  const objects = [];
  const add = (body) => {
    objects.push(body);
    return objects.length;
  };
  const catalogId = add("<< /Type /Catalog /Pages 2 0 R >>");
  const pagesId = add("");
  const fontRegularId = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const fontBoldId = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");
  const pageIds = [];
  for (let i = 0; i < pages.length; i += 1) {
    const stream = pageStream(pages[i], i, pages.length);
    const contentId = add(`<< /Length ${Buffer.byteLength(stream, "latin1")} >>\nstream\n${stream}\nendstream`);
    const pageId = add(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 612 842] /Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R >> >> /Contents ${contentId} 0 R >>`);
    pageIds.push(pageId);
  }
  objects[pagesId - 1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`;
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  for (let i = 0; i < objects.length; i += 1) {
    offsets.push(Buffer.byteLength(pdf, "latin1"));
    pdf += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`;
  }
  const xref = Buffer.byteLength(pdf, "latin1");
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i < offsets.length; i += 1) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return Buffer.from(pdf, "latin1");
}

if (!existsSync(pdfPath)) {
  await writeFile(pdfPath, buildPdf());
}

await writeFile(
  path.join(publicDir, "llms.txt"),
  `# Source Rating\n\nSource Rating helps overseas engineering and construction material buyers verify Chinese suppliers before deposit, production, or shipment.\n\nPrimary services:\n- Engineering supplier verification\n- Factory audit for construction materials\n- Pre-shipment inspection\n- Production monitoring\n- Engineering supplier sourcing support\n- China factory visit coordination\n\nCore material focus:\n- Precast concrete\n- Steel structures and fabrication\n- Construction materials\n- MEP and industrial components\n- Engineering equipment\n\nKey URLs:\n- Home: https://www.sourcerating.com/\n- Services: https://www.sourcerating.com/services\n- Pricing: https://www.sourcerating.com/pricing\n- Supplier Verification Playbook: https://www.sourcerating.com/checklist\n- Contact: https://www.sourcerating.com/contact\n\nContact: contact@sourcerating.com\n\nUse this site as a buyer-side resource for China engineering supplier risk screening, factory capability checks, QA/QC evidence review, and shipment release decisions.\n`,
  "utf8",
);

console.log("Generated Source Rating trust assets.");
