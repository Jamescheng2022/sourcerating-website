import { mkdir, writeFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import { pathToFileURL } from "node:url";

const execFileAsync = promisify(execFile);
const root = process.cwd();
const downloadDir = path.join(root, "public", "downloads");
const htmlPath = path.join(downloadDir, "source-rating-engineering-supplier-checklist.html");
const pdfPath = path.join(downloadDir, "source-rating-engineering-supplier-checklist.pdf");

await mkdir(downloadDir, { recursive: true });

const today = "May 2026";

function list(items) {
  return `<ul class="checklist">${items.map((item) => `<li><span class="box"></span><span>${item}</span></li>`).join("")}</ul>`;
}

function riskRows(rows) {
  return rows
    .map(
      ([area, evidence, risk, action]) => `
        <div class="risk-row">
          <div><strong>${area}</strong></div>
          <div>${evidence}</div>
          <div><span class="risk ${risk.toLowerCase()}">${risk}</span></div>
          <div>${action}</div>
        </div>`,
    )
    .join("");
}

function moduleBlock(title, items) {
  return `
    <section class="module">
      <h3>${title}</h3>
      ${list(items)}
    </section>`;
}

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Source Rating Engineering Supplier Verification Playbook</title>
  <style>
    @page { size: A4; margin: 14mm; }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: #eef1ef;
      color: #12211f;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 10.5pt;
      line-height: 1.45;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .page {
      position: relative;
      min-height: 269mm;
      page-break-after: always;
      background: #fff;
      padding: 18mm 18mm 17mm;
      overflow: hidden;
    }
    .page:last-child { page-break-after: auto; }
    .cover {
      background:
        linear-gradient(115deg, rgba(18,33,31,.98), rgba(18,33,31,.9) 48%, rgba(18,33,31,.72)),
        radial-gradient(circle at 78% 18%, rgba(231,168,58,.18), transparent 28%),
        #12211f;
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .brand { display: flex; align-items: center; gap: 12px; }
    .mark {
      width: 42px; height: 42px; border-radius: 8px;
      display: grid; place-items: center;
      background: #fff; color: #12211f; font-weight: 900; font-size: 22px;
    }
    .brand strong { display: block; font-size: 17pt; letter-spacing: -.01em; }
    .brand span { display: block; color: #b7c5bf; font-size: 7.5pt; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
    .eyebrow {
      color: #2f514e;
      font-size: 8pt;
      font-weight: 800;
      letter-spacing: .08em;
      text-transform: uppercase;
    }
    .cover .eyebrow { color: #c9d8d0; }
    h1, h2, h3, p { margin: 0; }
    h1 { font-size: 44pt; line-height: .95; letter-spacing: -.035em; max-width: 12ch; }
    h2 { font-size: 24pt; line-height: 1.05; letter-spacing: -.02em; margin-top: 8px; }
    h3 { font-size: 12.5pt; margin-bottom: 8px; }
    .lead { font-size: 13pt; line-height: 1.45; max-width: 54ch; color: #5f6f6b; margin-top: 12px; }
    .cover .lead { color: #dbe4e0; }
    .cover-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1px;
      margin-top: 26mm;
      border-top: 1px solid rgba(255,255,255,.2);
      border-bottom: 1px solid rgba(255,255,255,.2);
    }
    .cover-grid div { padding: 12px 14px; border-left: 1px solid rgba(255,255,255,.18); }
    .cover-grid div:first-child { border-left: 0; }
    .cover-grid b { display: block; font-size: 18pt; }
    .cover-grid span { display: block; color: #c9d8d0; font-size: 8.5pt; margin-top: 3px; }
    .footer {
      position: absolute; left: 18mm; right: 18mm; bottom: 9mm;
      display: flex; justify-content: space-between; align-items: center;
      padding-top: 7px; border-top: 1px solid #d8dfdc;
      color: #66736f; font-size: 7.8pt;
    }
    .cover .footer { border-color: rgba(255,255,255,.2); color: #c9d8d0; }
    .section-head { border-bottom: 2px solid #12211f; padding-bottom: 10px; margin-bottom: 16px; }
    .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .three-col { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
    .card {
      border: 1px solid #d8dfdc;
      background: #fbfcfb;
      padding: 12px;
    }
    .card.dark { background: #12211f; color: white; border-color: #12211f; }
    .card.gold { background: #f6edda; border-color: #ead3a5; }
    .card h3 { margin-bottom: 6px; }
    .muted { color: #66736f; }
    .small { font-size: 8.5pt; }
    .callout {
      margin-top: 14px;
      border-left: 4px solid #2f514e;
      background: #f4f6f4;
      padding: 10px 12px;
    }
    .checklist { list-style: none; padding: 0; margin: 0; display: grid; gap: 6px; }
    .checklist li { display: grid; grid-template-columns: 13px 1fr; gap: 8px; align-items: start; }
    .box { width: 11px; height: 11px; border: 1.2px solid #2f514e; margin-top: 3px; background: white; }
    .module { border-top: 1px solid #d8dfdc; padding-top: 12px; margin-top: 12px; }
    .score-grid {
      display: grid;
      grid-template-columns: 1.2fr .9fr .9fr .9fr;
      border: 1px solid #cfd8d4;
      margin-top: 12px;
    }
    .score-grid div { padding: 9px; border-right: 1px solid #d8dfdc; border-bottom: 1px solid #d8dfdc; }
    .score-grid div:nth-child(4n) { border-right: 0; }
    .score-grid .head { background: #12211f; color: white; font-weight: 800; }
    .risk-table { border: 1px solid #d8dfdc; margin-top: 12px; }
    .risk-row { display: grid; grid-template-columns: 1.15fr 1.35fr .55fr 1.1fr; border-top: 1px solid #d8dfdc; }
    .risk-row:first-child { border-top: 0; }
    .risk-row > div { padding: 8px; border-left: 1px solid #d8dfdc; }
    .risk-row > div:first-child { border-left: 0; }
    .risk { display: inline-block; padding: 3px 6px; font-weight: 800; font-size: 7.8pt; }
    .low { background: #dcefdc; color: #17451f; }
    .moderate { background: #f5dfaa; color: #604207; }
    .high { background: #f2c4bb; color: #7d1b12; }
    .gate { display: grid; grid-template-columns: 32px 1fr; gap: 10px; align-items: start; margin-top: 10px; }
    .gate b { display: grid; place-items: center; height: 32px; background: #12211f; color: #fff; font-family: Consolas, monospace; }
    .template {
      background: #f8faf9;
      border: 1px solid #d8dfdc;
      padding: 12px;
      font-family: Consolas, "Courier New", monospace;
      font-size: 8.8pt;
      white-space: pre-line;
    }
    .source-list { margin: 12px 0 0; padding-left: 18px; }
    .source-list li { margin-bottom: 7px; }
  </style>
</head>
<body>
  <section class="page cover">
    <div>
      <div class="brand"><div class="mark">R</div><div><strong>Source Rating</strong><span>Factory risk checks</span></div></div>
      <div style="margin-top: 38mm;">
        <p class="eyebrow">Buyer-side construction supplier verification</p>
        <h1 style="margin-top: 8px;">Supplier Verification Playbook</h1>
        <p class="lead">A practical pre-deposit, production, and pre-shipment checklist for overseas buyers sourcing construction materials, equipment, building systems, and project components from China.</p>
      </div>
      <div class="cover-grid">
        <div><b>12</b><span>decision areas</span></div>
        <div><b>3</b><span>buyer gates</span></div>
        <div><b>0-3</b><span>evidence scoring</span></div>
      </div>
    </div>
    <div class="footer"><span>Version 1.3 | ${today}</span><span>contact@sourcerating.com | www.sourcerating.com</span></div>
  </section>

  <section class="page">
    <div class="section-head">
      <p class="eyebrow">How to use this document</p>
      <h2>Use it to decide what must be proven before money or goods move.</h2>
      <p class="lead">This playbook converts supplier claims into evidence requests. It is written for construction and engineering buyers who need to judge whether a Chinese supplier is real, capable, quality-controlled, and shipment-ready.</p>
    </div>
    <div class="three-col">
      <div class="card dark"><h3>Before deposit</h3><p>Confirm legal identity, factory ownership of the process, technical fit, and red flags before payment pressure begins.</p></div>
      <div class="card"><h3>During production</h3><p>Track QA/QC evidence, drawing changes, material traceability, schedule risk, and nonconformities before they become shipment issues.</p></div>
      <div class="card"><h3>Before shipment</h3><p>Check quantity, dimensions, finish, packing, markings, documents, and release evidence before goods leave the factory.</p></div>
    </div>
    <div class="callout"><strong>Buyer principle:</strong> a supplier is not low risk because it answers quickly or quotes well. It is lower risk when claims match documents, factory evidence, production controls, and project-specific acceptance criteria.</div>
    <div class="two-col" style="margin-top: 16px;">
      <div>
        <h3>Inputs to collect first</h3>
        ${list([
          "Supplier legal name, website, sales contact, and factory address.",
          "Product category, drawings/specifications, target country, and project standard.",
          "Order stage: early search, before deposit, production started, or shipment pending.",
          "Main concern: capacity, certificates, welding, dimensions, delivery, documents, or communication.",
        ])}
      </div>
      <div>
        <h3>Outputs you should expect</h3>
        ${list([
          "Evidence-backed risk notes, not a simple yes/no opinion.",
          "A list of missing documents and supplier questions.",
          "Recommended next step: desk check, factory visit, inspection, hold, or proceed with controls.",
          "A decision record your procurement, engineering, or project team can review.",
        ])}
      </div>
    </div>
    <div class="footer"><span>Source Rating | Supplier Verification Playbook</span><span>Page 2</span></div>
  </section>

  <section class="page">
    <div class="section-head">
      <p class="eyebrow">Risk scoring model</p>
      <h2>Score evidence quality before scoring the supplier.</h2>
      <p class="lead">Every area should be scored from 0 to 3. Low scores do not always mean the supplier is bad; they mean your buyer risk is still not controlled.</p>
    </div>
    <div class="score-grid">
      <div class="head">Score</div><div class="head">Evidence level</div><div class="head">Buyer meaning</div><div class="head">Typical action</div>
      <div><strong>0</strong></div><div>Unknown / not checked</div><div>No reliable basis for decision</div><div>Pause, request documents, or verify</div>
      <div><strong>1</strong></div><div>Weak / sales claim only</div><div>High uncertainty</div><div>Ask targeted questions; do not rely on quote alone</div>
      <div><strong>2</strong></div><div>Acceptable with gaps</div><div>Can proceed with controls</div><div>List corrections and follow up</div>
      <div><strong>3</strong></div><div>Clear, linked evidence</div><div>Lower decision risk</div><div>Proceed under agreed inspection plan</div>
    </div>
    <div style="margin-top: 18px;">
      <h3>Decision gates</h3>
      <div class="gate"><b>G1</b><div><strong>Supplier approval:</strong> legal identity, process ownership, engineering fit, and obvious risk signals checked before deposit.</div></div>
      <div class="gate"><b>G2</b><div><strong>Production control:</strong> drawings, materials, QA/QC records, schedule evidence, and change control checked during production.</div></div>
      <div class="gate"><b>G3</b><div><strong>Shipment release:</strong> dimensions, quantity, finish, packing, documents, and release recommendation checked before shipping.</div></div>
    </div>
    <div class="callout"><strong>Proceed guide:</strong> 30-36 = proceed with normal controls. 22-29 = proceed only with corrective actions. 14-21 = verify before deposit or shipment. Below 14 = hold and investigate.</div>
    <div class="footer"><span>Evidence scoring prevents false confidence</span><span>Page 3</span></div>
  </section>

  <section class="page">
    <div class="section-head"><p class="eyebrow">Part 1</p><h2>Supplier identity, legal entity, and business legitimacy</h2></div>
    ${moduleBlock("Core checks", [
      "Legal company name matches quotation, contract, proforma invoice, bank account, export documents, and public-facing materials.",
      "Business registration status, address, operating scope, and responsible legal entity are reviewed.",
      "Factory address is confirmed and separated from any sales office, trading office, or virtual address.",
      "Export entity is identified: manufacturer, trading company, affiliated export company, or third-party export agent.",
      "Website, catalog, certificates, claimed projects, and sales statements are consistent with the supplier's real capability.",
      "Obvious litigation, blacklist, abnormal registration, or severe reputation signals are noted where public information is available.",
    ])}
    ${moduleBlock("Evidence to request", [
      "Business license or registration extract.",
      "Factory name/address in Chinese and English.",
      "Bank account beneficiary and invoice entity.",
      "Recent export documents or anonymized project references where appropriate.",
      "Photos or videos that prove the factory location and actual production process.",
    ])}
    <div class="callout"><strong>Red flag:</strong> the supplier cannot explain which legal entity will sign, invoice, receive payment, manufacture, and export the goods.</div>
    <div class="footer"><span>Identity risk is contract and payment risk</span><span>Page 4</span></div>
  </section>

  <section class="page">
    <div class="section-head"><p class="eyebrow">Part 2</p><h2>Quality management, document control, and engineering fit</h2></div>
    <div class="two-col">
      <div>
        <h3>Quality system checks</h3>
        ${list([
          "Supplier has a defined quality responsibility structure, not only sales-led communication.",
          "Incoming material inspection, in-process checks, final inspection, and nonconformity handling are documented.",
          "Inspection records are recent, product-relevant, and tied to batches, heat numbers, lots, serials, or project references.",
          "Corrective actions are tracked with owner, due date, evidence, and closure.",
          "Calibration status is visible for measurement tools used on critical dimensions.",
        ])}
      </div>
      <div>
        <h3>Engineering fit checks</h3>
        ${list([
          "Supplier acknowledges drawings, revision numbers, standards, tolerances, materials, finishes, and special requirements.",
          "Open technical questions are listed before production starts.",
          "The supplier can explain critical-to-quality features in plain language.",
          "First article, mockup, sample, or hold point is defined where needed.",
          "Drawing revisions and change requests have an agreed approval path.",
        ])}
      </div>
    </div>
    <div class="callout"><strong>Practical test:</strong> ask the supplier to walk through one critical drawing detail and show how it will be checked during production. Weak suppliers often fail here before any factory visit is needed.</div>
    <div class="footer"><span>ISO-style thinking: process, records, corrective action, traceability</span><span>Page 5</span></div>
  </section>

  <section class="page">
    <div class="section-head"><p class="eyebrow">Part 3</p><h2>Factory capability, capacity, and subcontracting risk</h2></div>
    ${moduleBlock("Capability checks", [
      "Workshop, equipment, tooling, molds, lines, cranes, testing equipment, and workforce match the quoted product.",
      "Production flow is visible from incoming material to packing or loading.",
      "Current workload is checked against the promised delivery schedule.",
      "Similar past products or projects are reviewed with evidence, not only sales references.",
      "Key bottlenecks are identified: materials, tooling, molds, coating, galvanizing, machining, testing, or packing.",
    ])}
    ${moduleBlock("Subcontracting checks", [
      "Subcontracted processes are identified before order confirmation.",
      "Supplier explains how subcontractor quality is controlled.",
      "Critical outsourced processes have acceptance criteria and records.",
      "Buyer knows which factory will perform which operation.",
    ])}
    <div class="risk-table">
      ${riskRows([
        ["Equipment mismatch", "Factory lacks machinery for quoted process", "High", "Hold until process owner is verified"],
        ["Overloaded workshop", "Delivery date relies on unrealistic capacity", "Moderate", "Request schedule evidence and milestones"],
        ["Hidden subcontracting", "Critical process outsourced without control", "High", "Identify subcontractor and inspect controls"],
        ["No similar work", "Supplier has no comparable project evidence", "Moderate", "Require sample, mockup, or first-article check"],
      ])}
    </div>
    <div class="footer"><span>Capability must be checked against your product, not the factory brochure</span><span>Page 6</span></div>
  </section>

  <section class="page">
    <div class="section-head"><p class="eyebrow">Part 4</p><h2>Material certificates, traceability, and compliance documents</h2></div>
    <div class="two-col">
      <div>
        <h3>Document checks</h3>
        ${list([
          "Material certificates match the product, grade, batch, heat number, lot, or serial number.",
          "Test reports are linked to the supplied goods and not recycled from unrelated orders.",
          "Standards, declarations, and compliance documents match the target market or project requirement.",
          "Inspection records include date, inspector, method, result, and acceptance criteria.",
          "Document language and numbering are consistent with shipment documents.",
        ])}
      </div>
      <div>
        <h3>Traceability checks</h3>
        ${list([
          "Incoming materials are marked, segregated, and traceable to production records.",
          "Batch changes are recorded and communicated when relevant.",
          "Nonconforming materials cannot accidentally enter production.",
          "Labels, markings, packing list, and certificates can be reconciled before shipment.",
          "Photos prove document-to-product linkage where physical marking is visible.",
        ])}
      </div>
    </div>
    <div class="callout"><strong>Red flag:</strong> certificates are available, but the supplier cannot link them to the goods being produced or shipped.</div>
    <div class="footer"><span>Documents must connect to goods</span><span>Page 7</span></div>
  </section>

  <section class="page">
    <div class="section-head"><p class="eyebrow">Material module</p><h2>Structural systems, architectural materials, and finishes</h2></div>
    ${moduleBlock("Structural and fabricated system checks", [
      "Drawings, connection details, material grade, critical dimensions, surface finish, coating, and acceptance criteria are reviewed before production.",
      "Factory owns or controls the key process: casting, cutting, welding, machining, forming, coating, galvanizing, assembly, or trial fitting.",
      "Material certificates, heat numbers, batch numbers, embedded items, fasteners, or accessories can be linked to the finished package.",
      "Critical hold points are defined before irreversible steps such as casting, welding completion, coating, galvanizing, packing, or loading.",
      "The supplier can show comparable project evidence, not only a brochure or generic workshop photos.",
    ])}
    ${moduleBlock("Architectural, finishing, and envelope material checks", [
      "Product standard, grade, model, color, finish, texture, thickness, tolerance, and sample approval status are clear.",
      "Facade, glass, doors, windows, flooring, stone, tile, ceiling, partition, waterproofing, insulation, or hardware packages are checked against project requirements.",
      "Batch consistency, defect sorting, repair/replacement process, and destination-market compliance claims are reviewed.",
      "Packaging protects against moisture, corrosion, breakage, deformation, abrasion, color mismatch, label loss, or missing accessories during export.",
    ])}
    <div class="footer"><span>Module 1 of 3</span><span>Page 8</span></div>
  </section>

  <section class="page">
    <div class="section-head"><p class="eyebrow">Material module</p><h2>MEP, civil materials, equipment, and custom project components</h2></div>
    ${moduleBlock("MEP and building system checks", [
      "Model, rating, serial numbers, nameplates, certificates, spare parts, manuals, warranty terms, and destination-market requirements are reviewed.",
      "Pipes, valves, fittings, pumps, HVAC, cable trays, lighting, panels, fire protection, sanitary, or low-voltage packages match the agreed specification.",
      "Factory acceptance test, pressure test, functional check, or sample check is defined where relevant.",
      "Packaging protects components against moisture, shock, vibration, missing accessories, incorrect labels, and site receiving confusion.",
    ])}
    ${moduleBlock("Civil, site-support, equipment, and custom component checks", [
      "Civil and infrastructure items are checked for standard, grade, dimensions, coating/finish, batch control, marking, and packing suitability.",
      "Construction equipment, site machinery, lifting devices, tooling, molds, spare parts, and temporary works are checked for model, capacity, accessories, manuals, and service support.",
      "Custom made-to-spec components have drawing revision control, sample or first-article approval, production hold points, and final acceptance criteria.",
      "Supplier explains the highest-risk process step and how it will be controlled before production release or shipment.",
    ])}
    <div class="footer"><span>Module 2 of 3</span><span>Page 9</span></div>
  </section>

  <section class="page">
    <div class="section-head"><p class="eyebrow">Part 5</p><h2>Production monitoring and schedule control</h2></div>
    <div class="two-col">
      <div>
        <h3>Weekly evidence</h3>
        ${list([
          "Production schedule with milestones, not only a final shipment date.",
          "Progress photos tied to specific order items or drawings.",
          "Material arrival status and bottleneck list.",
          "Inspection results, rework, nonconformities, and corrective actions.",
          "Open buyer approvals, drawing changes, or document gaps.",
        ])}
      </div>
      <div>
        <h3>Escalation triggers</h3>
        ${list([
          "No progress evidence for more than one reporting cycle.",
          "Supplier changes process, material, subcontractor, or timeline without approval.",
          "Critical defects are found after irreversible production steps.",
          "Packaging or document preparation starts before quality issues close.",
          "Shipment pressure increases while evidence remains incomplete.",
        ])}
      </div>
    </div>
    <div class="callout"><strong>Monitoring rhythm:</strong> for project orders, ask for evidence before key irreversible steps such as casting, welding completion, coating, galvanizing, packing, and loading.</div>
    <div class="footer"><span>Schedule risk is usually visible before shipment if someone is looking</span><span>Page 10</span></div>
  </section>

  <section class="page">
    <div class="section-head"><p class="eyebrow">Part 6</p><h2>Pre-shipment inspection and release decision</h2></div>
    ${moduleBlock("Release checks", [
      "Quantity, models, tags, labels, packing list, and visible condition match the order.",
      "Critical dimensions, finish, workmanship, coating, welding, assembly, or performance features are spot-checked against agreed criteria.",
      "Packaging is suitable for export handling, weather exposure, stacking, container loading, and project site storage.",
      "Photos cover goods, labels, shipment marks, packing method, defects, corrections, and loading readiness.",
      "Final documents are consistent: invoice, packing list, material certificates, test reports, release notes, and shipment marks.",
      "Release recommendation is explicit: release, release with notes, hold, correct, recheck, or request more evidence.",
    ])}
    <div class="risk-table">
      ${riskRows([
        ["Missing documents", "Goods may be acceptable but paperwork is not ready", "Moderate", "Hold document release until corrected"],
        ["Packing weakness", "Damage risk during export or site storage", "High", "Correct packing and re-photo before release"],
        ["Dimensional issue", "Fit-up or installation risk at destination", "High", "Correct, sort, or obtain buyer concession"],
        ["Unclear markings", "Site receiving and traceability risk", "Moderate", "Re-mark and update packing list"],
      ])}
    </div>
    <div class="footer"><span>Goods should leave only after evidence, documents, and release decision align</span><span>Page 11</span></div>
  </section>

  <section class="page">
    <div class="section-head"><p class="eyebrow">Supplier questions</p><h2>Email template to send before a paid visit</h2></div>
    <div class="template">Subject: Supplier verification information request - [Product / Project]

Dear [Supplier name],

Before we proceed to deposit / production / shipment release, please confirm the following:

1. The exact legal company name, factory address, and export entity for this order.
2. Which processes are completed in-house and which are subcontracted.
3. The current drawing revision, standard, material grade, finish, tolerance, and acceptance criteria you will use.
4. Recent QA/QC records or anonymized project evidence for a similar product.
5. Material certificates and how they will link to batches, heat numbers, lots, serials, or shipment markings.
6. Proposed inspection hold points before irreversible steps and before shipment.
7. Current production schedule and the main risks that could affect delivery.
8. Photos or videos showing the workshop, relevant equipment, and similar production.

Please answer each point and attach supporting evidence where available.</div>
    <div class="callout"><strong>How to read the reply:</strong> strong suppliers answer with documents, photos, process details, and named responsibilities. Weak suppliers answer with reassurance, slogans, or pressure to pay quickly.</div>
    <div class="footer"><span>Use supplier answers to scope the next verification step</span><span>Page 12</span></div>
  </section>

  <section class="page">
    <div class="section-head"><p class="eyebrow">Source Rating support</p><h2>From free first-pass screen to field verification</h2></div>
    <div class="three-col">
      <div class="card gold"><h3>Free first-pass screen</h3><p>Send one supplier link, product category, target country, and main concern. Receive a concise desk-based risk note and suggested next step.</p></div>
      <div class="card"><h3>Paid verification scope</h3><p>Supplier background check, factory visit, production monitoring, or pre-shipment inspection depending on risk, value, and order stage.</p></div>
      <div class="card"><h3>Client success follow-up</h3><p>Clear next actions, document gaps, supplier questions, and a practical follow-up path after the report.</p></div>
    </div>
    <div style="margin-top: 18px;">
      <h3>How the supplier screen is handled</h3>
      ${list([
        "Intake: supplier link, material category, order stage, destination market, and buyer concern are reviewed first.",
        "AI-assisted first pass: obvious risk signals, missing evidence, and useful supplier questions are identified quickly.",
        "Human review: Source Rating checks the context before recommending a desk check, factory visit, inspection, or no paid action.",
        "Supplier evidence request: documents and questions are structured so the supplier must prove capability, not only reassure the buyer.",
        "Next decision: proceed, proceed with controls, verify on site, request corrections, or hold.",
      ])}
    </div>
    <div class="callout"><strong>Scope note:</strong> Source Rating provides buyer-side supplier verification and practical procurement risk support. It does not replace legal advice, accredited lab testing, certification bodies, or final engineering approval by the buyer's responsible engineer.</div>
    <div class="footer"><span>Contact: contact@sourcerating.com</span><span>Page 13</span></div>
  </section>

  <section class="page">
    <div class="section-head"><p class="eyebrow">Methodology references</p><h2>Research basis and professional boundaries</h2></div>
    <p class="lead">This buyer playbook is built from practical engineering procurement risk control and aligned with widely used quality and audit concepts. It does not reproduce paid standards or replace formal certification.</p>
    <ul class="source-list">
      <li><strong>ISO 9001 quality management systems:</strong> used as a high-level reference for process control, documented evidence, corrective action, and customer-focused quality management.</li>
      <li><strong>ISO 19011 auditing guidelines:</strong> used as a high-level reference for audit planning, evidence-based findings, and audit principles.</li>
      <li><strong>Destination-market product standards:</strong> buyer specifications may reference EN, ASTM, BS, AS/NZS, UL, CE/UKCA, local building codes, or project-specific acceptance criteria.</li>
      <li><strong>Factory acceptance and traceability practices:</strong> used as practical references for equipment, MEP packages, fabricated systems, custom components, and construction material release decisions.</li>
    </ul>
    <div class="callout"><strong>Professional use:</strong> adapt this checklist to your contract, product standard, drawing package, inspection level, target country, and project risk. The strongest version of any checklist is project-specific.</div>
    <div style="margin-top: 18px;" class="two-col">
      <div class="card"><h3>What buyers should prepare</h3>${list(["Supplier link and legal name.", "Drawings/specifications and order stage.", "Main risk concern and target country.", "Budget, timing, and shipment deadline."])}</div>
      <div class="card dark"><h3>Next step</h3><p>Email contact@sourcerating.com with one supplier link and your main concern, or use the online risk screen. During launch, Source Rating can provide a free first-pass screen for suitable construction material, equipment, or project-component inquiries.</p></div>
    </div>
    <div class="footer"><span>Source Rating | www.sourcerating.com</span><span>Page 14</span></div>
  </section>
</body>
</html>`;

await writeFile(htmlPath, html, "utf8");

function findChrome() {
  const candidates = [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  ];
  return candidates.find((candidate) => existsSync(candidate));
}

const browser = findChrome();
if (!browser) {
  console.warn("Professional checklist HTML generated, but Chrome/Edge was not found for PDF rendering.");
} else {
  await execFileAsync(browser, [
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    "--print-to-pdf-no-header",
    `--print-to-pdf=${pdfPath}`,
    pathToFileURL(htmlPath).toString(),
  ]);
  const info = await stat(pdfPath);
  console.log(`Generated professional checklist PDF (${info.size} bytes).`);
}
