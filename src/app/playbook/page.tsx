import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  Download,
  Factory,
  FileText,
  Mail,
  SearchCheck,
  ShieldCheck,
} from "lucide-react";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "China Engineering Supplier Verification Playbook",
  description:
    "Read Source Rating's online supplier verification playbook for overseas engineering buyers evaluating Chinese suppliers before deposit, production, or shipment release.",
  keywords: [
    "China engineering supplier verification playbook",
    "China supplier audit guide",
    "building materials supplier verification China",
    "construction equipment supplier verification China",
    "steel structure factory audit China",
    "precast concrete supplier verification China",
  ],
  alternates: { canonical: `${siteConfig.url}/playbook` },
};

const navItems = [
  ["how-to-use", "How to use"],
  ["scoring", "Evidence scoring"],
  ["identity", "Supplier identity"],
  ["quality", "Quality and engineering fit"],
  ["capability", "Factory capability"],
  ["documents", "Certificates and traceability"],
  ["materials", "Material modules"],
  ["monitoring", "Production and shipment"],
  ["template", "Supplier email template"],
  ["workflow", "Review workflow"],
];

const gates = [
  ["G1", "Supplier approval", "Legal identity, process ownership, engineering fit, and obvious risk signals checked before deposit."],
  ["G2", "Production control", "Drawings, materials, QA/QC records, schedule evidence, and change control checked during production."],
  ["G3", "Shipment release", "Dimensions, quantity, finish, packing, documents, and release recommendation checked before shipping."],
];

const scores = [
  ["0", "Unknown / not checked", "No reliable basis for decision", "Pause, request documents, or verify"],
  ["1", "Weak / sales claim only", "High uncertainty", "Ask targeted questions; do not rely on quote alone"],
  ["2", "Acceptable with gaps", "Can proceed with controls", "List corrections and follow up"],
  ["3", "Clear, linked evidence", "Lower decision risk", "Proceed under agreed inspection plan"],
];

const identityChecks = [
  "Legal company name matches quotation, contract, invoice, bank account, export documents, and public materials.",
  "Business registration status, address, operating scope, and responsible legal entity are reviewed.",
  "Factory address is confirmed and separated from sales offices, trading offices, or virtual addresses.",
  "Export entity is identified: manufacturer, trading company, affiliated export company, or export agent.",
  "Website, catalog, certificates, claimed projects, and sales statements are consistent with real capability.",
];

const qualityChecks = [
  "Supplier has a defined quality responsibility structure, not only sales-led communication.",
  "Incoming material inspection, in-process checks, final inspection, and nonconformity handling are documented.",
  "Inspection records are recent, product-relevant, and tied to batches, heat numbers, lots, serials, or project references.",
  "Corrective actions are tracked with owner, due date, evidence, and closure.",
  "Drawing revisions and change requests have an agreed approval path before production starts.",
];

const capabilityRisks = [
  ["Equipment mismatch", "Factory lacks machinery or tooling for the quoted process.", "Hold until process owner is verified."],
  ["Overloaded workshop", "Delivery date relies on unrealistic capacity.", "Request schedule evidence and milestone checks."],
  ["Hidden subcontracting", "Critical process outsourced without buyer visibility.", "Identify subcontractor and inspect controls."],
  ["No similar work", "Supplier has no comparable product or project evidence.", "Require sample, mockup, or first-article check."],
];

const documentChecks = [
  "Material certificates match the product, grade, batch, heat number, lot, or serial number.",
  "Test reports are linked to supplied goods and not recycled from unrelated orders.",
  "Standards, declarations, and compliance documents match the target market or project requirement.",
  "Incoming materials are marked, segregated, and traceable to production records.",
  "Labels, markings, packing list, and certificates can be reconciled before shipment.",
];

const materialModules = [
  {
    title: "Structural and fabricated systems",
    checks: [
      "Review drawings, material grade, connection details, welds or cast-in items, tolerances, finish, coating, and release criteria.",
      "Check process ownership for cutting, welding, casting, machining, coating, assembly, and subcontracted steps.",
      "Confirm traceability from raw material to finished component before irreversible production steps.",
    ],
  },
  {
    title: "Architectural and finishing materials",
    checks: [
      "Review samples, finish standards, mockups, color/texture control, packaging, installation accessories, and project approval status.",
      "Check batch consistency, supplier test reports, compliance claims, and how defects are sorted or replaced.",
      "Confirm packing, labeling, palletizing, and moisture/shock protection for long-distance shipping.",
    ],
  },
  {
    title: "MEP, equipment, and site-support packages",
    checks: [
      "Review model, rating, serial numbers, nameplates, certificates, spare parts, manuals, warranty terms, and destination-market compliance.",
      "Define factory acceptance test or functional check where relevant.",
      "Confirm packaging protects components against moisture, shock, vibration, and missing accessories.",
    ],
  },
];

const monitoringChecks = [
  "Production schedule includes milestones, not only a final shipment date.",
  "Progress photos are tied to specific order items, drawings, or production stages.",
  "Material arrival, bottlenecks, rework, nonconformities, and corrective actions are visible before shipment pressure starts.",
  "Shipment release decision is explicit: release, release with notes, hold, correct, recheck, or request more evidence.",
];

const teamRoles = [
  ["1. Intake", "You submit the supplier link, material category, order stage, destination market, and the concern you want checked."],
  ["2. AI-assisted first pass", "The online screen highlights obvious risk signals, missing evidence, and useful supplier questions."],
  ["3. Human review", "Source Rating reviews the context before recommending a desk check, factory visit, inspection, or no paid action."],
  ["4. Supplier evidence request", "A focused document and question list is prepared so the supplier must prove capability, not only reassure you."],
  ["5. Next decision", "The outcome is practical: proceed, proceed with controls, verify on site, request corrections, or hold."],
];

const supplierEmail = `Subject: Supplier verification information request - [Product / Project]

Dear [Supplier name],

Before we proceed to deposit / production / shipment release, please confirm:

1. The exact legal company name, factory address, and export entity for this order.
2. Which processes are completed in-house and which are subcontracted.
3. The current drawing revision, standard, material grade, finish, tolerance, and acceptance criteria you will use.
4. Recent QA/QC records or anonymized project evidence for a similar product.
5. Material certificates and how they will link to batches, heat numbers, lots, serials, or shipment markings.
6. Proposed inspection hold points before irreversible steps and before shipment.
7. Current production schedule and the main risks that could affect delivery.
8. Photos or videos showing the workshop, relevant equipment, and similar production.`;

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-6 text-gray-700">
          <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PlaybookPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "China Engineering Supplier Verification Playbook",
    description: metadata.description,
    url: `${siteConfig.url}/playbook`,
    image: `${siteConfig.url}/images/checklist-report-pack.png`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/brand/source-rating-logo.svg`,
    },
    about: [
      "China supplier verification",
      "Engineering procurement",
      "Factory audit",
      "Construction materials inspection",
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <section className="relative overflow-hidden bg-brand-950 pt-28 text-white">
        <Image
          src="/images/checklist-report-pack.png"
          alt="Engineering supplier verification playbook and report documents"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/92 to-brand-950/58" />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase text-brand-200">Online buyer playbook</p>
            <h1 className="mt-4 max-w-[14ch] text-5xl font-bold leading-none sm:text-6xl lg:text-7xl">
              China Engineering Supplier Verification Playbook
            </h1>
            <p className="mt-6 max-w-[70ch] text-lg leading-8 text-gray-200">
              A practical online guide for overseas engineering buyers checking Chinese suppliers before deposit, during production, or before shipment release.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="/downloads/source-rating-engineering-supplier-checklist.pdf"
                download
                className="inline-flex items-center justify-center gap-2 bg-white px-5 py-3 text-sm font-semibold text-brand-950 transition hover:-translate-y-0.5 hover:bg-gray-100"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </a>
              <Link href="/risk-screen" className="inline-flex items-center justify-center gap-2 border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/15">
                Request free supplier screen <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="mt-14 grid max-w-4xl grid-cols-1 divide-y divide-white/15 border-y border-white/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[["14 pages", "downloadable PDF"], ["3 gates", "deposit, production, shipment"], ["0-3 score", "evidence quality model"]].map(([value, label]) => (
              <div key={value} className="py-4 sm:px-5 sm:first:pl-0">
                <p className="font-mono text-2xl font-semibold text-white">{value}</p>
                <p className="mt-1 text-sm text-gray-300">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
          <aside className="hidden lg:block">
            <div className="sticky top-24 border-l border-gray-200 pl-5">
              <p className="font-mono text-xs font-semibold uppercase text-gray-500">Contents</p>
              <nav className="mt-4 flex flex-col gap-2">
                {navItems.map(([href, label]) => (
                  <a key={href} href={`#${href}`} className="text-sm font-semibold text-gray-600 transition hover:text-brand-700">
                    {label}
                  </a>
                ))}
              </nav>
              <a
                href="/downloads/source-rating-engineering-supplier-checklist.pdf"
                download
                className="mt-7 inline-flex items-center gap-2 bg-brand-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800"
              >
                <Download className="h-4 w-4" />
                PDF version
              </a>
            </div>
          </aside>

          <article className="min-w-0">
            <section id="how-to-use" className="scroll-mt-24 border-b border-gray-200 pb-14">
              <p className="text-sm font-semibold uppercase text-brand-700">How to use this document</p>
              <h2 className="mt-3 text-4xl font-bold leading-tight text-gray-950">
                Use it to decide what must be proven before money or goods move.
              </h2>
              <p className="mt-5 max-w-[76ch] text-base leading-7 text-gray-600">
                This playbook converts supplier claims into evidence requests. It is written for buyers who need to judge whether a supplier is real, capable, quality-controlled, and shipment-ready.
              </p>
              <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                {gates.map(([code, title, text]) => (
                  <div key={code} className="border border-gray-200 bg-[#fbfcfb] p-5">
                    <p className="font-mono text-sm font-semibold text-brand-700">{code}</p>
                    <h3 className="mt-3 text-lg font-bold text-gray-950">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-gray-600">{text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="scoring" className="scroll-mt-24 border-b border-gray-200 py-14">
              <p className="text-sm font-semibold uppercase text-brand-700">Evidence scoring model</p>
              <h2 className="mt-3 text-3xl font-bold text-gray-950">Score evidence quality before scoring the supplier.</h2>
              <div className="mt-8 divide-y divide-gray-200 border-y border-gray-200">
                {scores.map(([score, evidence, meaning, action]) => (
                  <div key={score} className="grid grid-cols-1 gap-3 py-5 md:grid-cols-[80px_1fr_1fr_1.2fr]">
                    <p className="font-mono text-3xl font-bold text-brand-700">{score}</p>
                    <p className="font-semibold text-gray-950">{evidence}</p>
                    <p className="text-sm leading-6 text-gray-600">{meaning}</p>
                    <p className="text-sm leading-6 text-gray-600">{action}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 border-l-4 border-brand-700 bg-[#f4f6f4] p-5 text-sm leading-6 text-gray-700">
                Proceed guide: 30-36 = proceed with normal controls. 22-29 = proceed only with corrective actions. 14-21 = verify before deposit or shipment. Below 14 = hold and investigate.
              </div>
            </section>

            <section id="identity" className="scroll-mt-24 border-b border-gray-200 py-14">
              <p className="text-sm font-semibold uppercase text-brand-700">Supplier identity</p>
              <h2 className="mt-3 text-3xl font-bold text-gray-950">Legal identity is contract and payment risk.</h2>
              <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
                <CheckList items={identityChecks} />
                <div className="bg-brand-950 p-6 text-white">
                  <ShieldCheck className="h-6 w-6 text-brand-200" />
                  <h3 className="mt-4 text-xl font-bold">Red flag</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-200">
                    The supplier cannot explain which legal entity will sign, invoice, receive payment, manufacture, and export the goods.
                  </p>
                </div>
              </div>
            </section>

            <section id="quality" className="scroll-mt-24 border-b border-gray-200 py-14">
              <p className="text-sm font-semibold uppercase text-brand-700">Quality and engineering fit</p>
              <h2 className="mt-3 text-3xl font-bold text-gray-950">A good quote is not enough. The factory must understand the package.</h2>
              <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.9fr]">
                <CheckList items={qualityChecks} />
                <div className="border border-gray-200 bg-[#fbfcfb] p-6">
                  <ClipboardCheck className="h-6 w-6 text-brand-700" />
                  <h3 className="mt-4 text-xl font-bold text-gray-950">Practical test</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Ask the supplier to walk through one critical drawing detail and show how it will be checked during production. Weak suppliers often fail here before a factory visit is needed.
                  </p>
                </div>
              </div>
            </section>

            <section id="capability" className="scroll-mt-24 border-b border-gray-200 py-14">
              <p className="text-sm font-semibold uppercase text-brand-700">Factory capability</p>
              <h2 className="mt-3 text-3xl font-bold text-gray-950">Capability must be checked against your product, not the brochure.</h2>
              <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                {capabilityRisks.map(([risk, signal, action]) => (
                  <div key={risk} className="border border-gray-200 bg-white p-5">
                    <Factory className="h-5 w-5 text-brand-700" />
                    <h3 className="mt-4 font-bold text-gray-950">{risk}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600">{signal}</p>
                    <p className="mt-3 border-t border-gray-200 pt-3 text-sm font-semibold text-brand-700">{action}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="documents" className="scroll-mt-24 border-b border-gray-200 py-14">
              <p className="text-sm font-semibold uppercase text-brand-700">Certificates and traceability</p>
              <h2 className="mt-3 text-3xl font-bold text-gray-950">Documents must connect to goods.</h2>
              <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="relative min-h-[320px] overflow-hidden border border-gray-200 bg-gray-100">
                  <Image src="/images/report-risk-matrix-redacted.svg" alt="Redacted supplier verification risk matrix sample" fill sizes="(min-width: 1024px) 38vw, 100vw" className="object-cover" />
                </div>
                <CheckList items={documentChecks} />
              </div>
            </section>

            <section id="materials" className="scroll-mt-24 border-b border-gray-200 py-14">
              <p className="text-sm font-semibold uppercase text-brand-700">Engineering material modules</p>
              <h2 className="mt-3 text-3xl font-bold text-gray-950">Adapt the check to the material package.</h2>
              <div className="mt-8 grid grid-cols-1 gap-5">
                {materialModules.map((module) => (
                  <div key={module.title} className="grid grid-cols-1 gap-5 border border-gray-200 bg-[#fbfcfb] p-5 lg:grid-cols-[260px_1fr]">
                    <h3 className="text-xl font-bold text-gray-950">{module.title}</h3>
                    <CheckList items={module.checks} />
                  </div>
                ))}
              </div>
            </section>

            <section id="monitoring" className="scroll-mt-24 border-b border-gray-200 py-14">
              <p className="text-sm font-semibold uppercase text-brand-700">Production and shipment</p>
              <h2 className="mt-3 text-3xl font-bold text-gray-950">Schedule risk is often visible before shipment if someone is looking.</h2>
              <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.95fr]">
                <CheckList items={monitoringChecks} />
                <div className="border border-gray-200 bg-white p-6">
                  <FileText className="h-6 w-6 text-brand-700" />
                  <h3 className="mt-4 text-xl font-bold text-gray-950">Release decision</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Goods should leave only after evidence, documents, packing, and the release recommendation align with the buyer's acceptance criteria.
                  </p>
                </div>
              </div>
            </section>

            <section id="template" className="scroll-mt-24 border-b border-gray-200 py-14">
              <p className="text-sm font-semibold uppercase text-brand-700">Supplier questions</p>
              <h2 className="mt-3 text-3xl font-bold text-gray-950">Email template to send before a paid visit.</h2>
              <pre className="mt-8 whitespace-pre-wrap border border-gray-200 bg-[#f8faf9] p-5 font-mono text-xs leading-6 text-gray-800">
                {supplierEmail}
              </pre>
              <p className="mt-5 border-l-4 border-brand-700 bg-[#f4f6f4] p-5 text-sm leading-6 text-gray-700">
                Strong suppliers answer with documents, photos, process details, and named responsibilities. Weak suppliers answer with reassurance, slogans, or pressure to pay quickly.
              </p>
            </section>

            <section id="workflow" className="scroll-mt-24 py-14">
              <p className="text-sm font-semibold uppercase text-brand-700">Review workflow</p>
              <h2 className="mt-3 text-3xl font-bold text-gray-950">From online screen to a practical supplier decision.</h2>
              <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                {teamRoles.map(([role, text]) => (
                  <div key={role} className="border border-gray-200 bg-white p-5">
                    <SearchCheck className="h-5 w-5 text-brand-700" />
                    <h3 className="mt-4 font-bold text-gray-950">{role}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600">{text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10 grid grid-cols-1 gap-6 border-y border-gray-200 bg-[#f4f6f4] p-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-950">Want a quick opinion before ordering an audit?</h3>
                  <p className="mt-3 max-w-[72ch] text-sm leading-6 text-gray-600">
                    During launch, submit one supplier link, product category, target country, and main concern. Source Rating can provide a free first-pass risk screen for suitable construction material, equipment, or project-component inquiries.
                  </p>
                </div>
                <Link href="/risk-screen" className="inline-flex items-center justify-center gap-2 bg-brand-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-800">
                  <Mail className="h-4 w-4" />
                  Request free screen
                </Link>
              </div>
            </section>
          </article>
        </div>
      </section>
    </>
  );
}
