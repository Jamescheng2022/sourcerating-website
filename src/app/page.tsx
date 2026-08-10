import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  Download,
  Factory,
  FileText,
  Gauge,
  HardHat,
  SearchCheck,
  ShieldCheck,
} from "lucide-react";
import { pricingItems } from "@/data/pricing";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "China Supplier Verification for Construction Buyers",
  description:
    "Factory audits, supplier verification, inspection, and sourcing support in China for construction materials, equipment, fabricated systems, MEP packages, and project components.",
  path: "/",
  ogImage: "/images/hero-factory-audit.png",
});

const materialFocus = [
  "Structural systems",
  "Architectural materials",
  "MEP packages",
  "Civil materials",
  "Construction equipment",
];

const decisionChecks = [
  {
    question: "Is this a real manufacturer or a trading wrapper?",
    method: "License, export entity, factory address, process ownership, and website claim consistency.",
  },
  {
    question: "Can the factory handle the engineering package?",
    method: "Drawing/spec review, equipment check, current workload, QA/QC records, and project-fit notes.",
  },
  {
    question: "What must be fixed before deposit or shipment?",
    method: "Risk rating, supplier questions, document gaps, photo evidence, and recommended next step.",
  },
];

const verificationAreas = [
  {
    icon: ShieldCheck,
    title: "Identity",
    text: "Business license, export entity, bank-risk signals, and document consistency.",
  },
  {
    icon: Factory,
    title: "Capability",
    text: "Workshop, equipment, molds, workforce, subcontracting, and current project load.",
  },
  {
    icon: ClipboardCheck,
    title: "Quality evidence",
    text: "Material traceability, certificates, inspection records, hold points, and corrections.",
  },
  {
    icon: Gauge,
    title: "Delivery risk",
    text: "Schedule realism, packaging, markings, export documents, and release readiness.",
  },
];

const servicePackages = [
  {
    stage: "01 / Before deposit",
    title: "Supplier verification visit",
    text: "On-site check before supplier approval, contract signature, or first payment.",
    href: "/services#supplier-verification",
  },
  {
    stage: "02 / During production",
    title: "Factory audit and monitoring",
    text: "Production capacity, QA controls, progress evidence, and issue escalation.",
    href: "/services#factory-audit",
  },
  {
    stage: "03 / Before shipment",
    title: "Pre-shipment inspection",
    text: "Quantity, dimensions, packaging, markings, documents, and release recommendation.",
    href: "/services#pre-shipment-inspection",
  },
];

const deliverables = [
  "PDF report",
  "Photo evidence",
  "Risk rating",
  "Supplier questions",
  "Recommended next steps",
  "Shipment release notes",
];

const sampleReports = [
  {
    src: "/images/report-cover-redacted.svg",
    alt: "Redacted Source Rating supplier verification report cover sample",
    label: "Report cover",
  },
  {
    src: "/images/report-risk-matrix-redacted.svg",
    alt: "Redacted engineering supplier risk matrix sample",
    label: "Risk matrix",
  },
  {
    src: "/images/report-photo-evidence-redacted.svg",
    alt: "Redacted factory audit photo evidence page sample",
    label: "Photo evidence",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[720px] overflow-hidden bg-brand-950 pt-24 text-white">
        <Image
          src="/images/hero-factory-audit.png"
          alt="Factory audit for steel structure supplier verification in China"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,33,31,0.98)_0%,rgba(18,33,31,0.84)_43%,rgba(18,33,31,0.28)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-brand-950 to-transparent" />

        <div className="relative mx-auto flex min-h-[620px] max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 border border-white/15 bg-white/10 px-3 py-1.5 text-sm font-semibold text-brand-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur">
              <HardHat className="h-4 w-4" />
              China engineering supplier verification
            </div>
            <h1 className="mt-7 max-w-[12ch] text-5xl font-semibold leading-none sm:text-6xl lg:text-7xl">
              Know the factory before you trust the quote.
            </h1>
            <p className="mt-6 max-w-[64ch] text-base leading-7 text-gray-200 sm:text-lg sm:leading-8">
              Buyer-side factory audits, supplier checks, and inspection support for overseas engineering and construction material buyers.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/risk-screen" className="inline-flex items-center justify-center gap-2 bg-white px-5 py-3 text-sm font-semibold text-brand-950 transition hover:-translate-y-0.5 hover:bg-gray-100">
                Get a free risk screen <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/playbook" className="inline-flex items-center justify-center gap-2 border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/15">
                Download playbook <FileText className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-16 grid max-w-4xl grid-cols-1 divide-y divide-white/15 border-y border-white/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[
              ["20+ years", "international engineering context"],
              ["24 hours", "initial scope guidance"],
              ["Buyer-side", "no factory commission model"],
            ].map(([value, label]) => (
              <div key={value} className="py-4 sm:px-5 sm:first:pl-0">
                <p className="font-mono text-2xl font-semibold text-white">{value}</p>
                <p className="mt-1 text-sm text-gray-300">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-gray-200 px-4 sm:px-6 md:grid-cols-5 md:divide-x md:divide-y-0 lg:px-8">
          {materialFocus.map((item) => (
            <div key={item} className="py-4 text-sm font-semibold text-gray-700 md:px-4 md:first:pl-0">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[0.42fr_1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase text-brand-700">Decision ledger</p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight text-gray-950">
              Sales claims become useful only when they are checked against evidence.
            </h2>
          </div>
          <div className="border-y border-gray-200">
            {decisionChecks.map((item, index) => (
              <div key={item.question} className="grid grid-cols-1 gap-4 border-b border-gray-200 py-6 last:border-b-0 md:grid-cols-[120px_1fr]">
                <p className="font-mono text-sm font-semibold text-brand-700">0{index + 1}</p>
                <div>
                  <h3 className="text-xl font-semibold text-gray-950">{item.question}</h3>
                  <p className="mt-2 max-w-[72ch] text-sm leading-6 text-gray-600">{item.method}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-gray-200 bg-[#f4f6f4] py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[1.06fr_0.94fr] lg:px-8">
          <div className="relative min-h-[430px] overflow-hidden border border-gray-200 bg-gray-100">
            <Image
              src="/images/precast-inspection.png"
              alt="Precast concrete inspection in a China factory yard"
              fill
              sizes="(min-width: 1024px) 53vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase text-brand-700">Verification protocol</p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight text-gray-950">
              A practical field check, not a generic visit note.
            </h2>
            <div className="mt-9 divide-y divide-gray-200 border-y border-gray-200">
              {verificationAreas.map((area) => (
                <div key={area.title} className="flex gap-4 py-5">
                  <area.icon className="mt-1 h-5 w-5 shrink-0 text-brand-700" />
                  <div>
                    <h3 className="font-semibold text-gray-950">{area.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-gray-600">{area.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase text-brand-700">Service paths</p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight text-gray-950">
              Start with the decision you need to make.
            </h2>
          </div>
          <div className="mt-10 divide-y divide-gray-200 border-y border-gray-200">
            {servicePackages.map((service) => (
              <Link key={service.title} href={service.href} className="group grid grid-cols-1 gap-4 py-7 transition hover:bg-[#f7f9f7] md:grid-cols-[190px_1fr_auto] md:items-center">
                <p className="font-mono text-sm font-semibold text-brand-700">{service.stage}</p>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-950">{service.title}</h3>
                  <p className="mt-2 max-w-[64ch] text-sm leading-6 text-gray-600">{service.text}</p>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 md:justify-self-end">
                  Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-950 py-20 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase text-brand-300">Deliverable</p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight">
              Evidence your team can review before money moves.
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-4 border-y border-white/15 py-6 sm:grid-cols-2">
              {deliverables.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <BadgeCheck className="h-5 w-5 text-brand-300" />
                  <span className="font-semibold text-gray-100">{item}</span>
                </div>
              ))}
            </div>
            <Link href="/playbook" className="mt-8 inline-flex items-center gap-2 bg-white px-5 py-3 text-sm font-semibold text-brand-950 transition hover:-translate-y-0.5 hover:bg-gray-100">
              Get the buyer playbook <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative min-h-[360px] overflow-hidden border border-white/15 bg-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <Image
              src="/images/checklist-report-pack.png"
              alt="Engineering supplier verification playbook and report pack"
              fill
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-gray-200 bg-[#f4f6f4] py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[0.45fr_1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase text-brand-700">Sample report pack</p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight text-gray-950">
              Show your team evidence, not a sales opinion.
            </h2>
            <p className="mt-5 max-w-[58ch] text-base leading-7 text-gray-600">
              The preview below is anonymized and redacted. Real reports use your project criteria, supplier documents, factory photos, and a clear release or hold recommendation.
            </p>
            <Link href="/playbook" className="mt-8 inline-flex items-center gap-2 bg-brand-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-800">
              View playbook page <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {sampleReports.map((report) => (
              <div key={report.src} className="border border-gray-200 bg-white p-3 shadow-sm">
                <div className="relative aspect-[1.08/1.38] overflow-hidden bg-gray-100">
                  <Image
                    src={report.src}
                    alt={report.alt}
                    fill
                    sizes="(min-width: 768px) 24vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-3 font-mono text-xs font-semibold uppercase text-gray-500">Sample / redacted</p>
                <p className="mt-1 text-sm font-semibold text-gray-950">{report.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="relative min-h-[430px] overflow-hidden border border-gray-200 bg-gray-100">
            <Image
              src="/images/audit-report-desk-mockup.png"
              alt="Anonymized engineering supplier verification report mockup on a desk"
              fill
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase text-brand-700">Launch offer</p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight text-gray-950">
              Send one supplier link. Get a free first-pass risk screen.
            </h2>
            <p className="mt-5 text-base leading-7 text-gray-600">
              For early overseas engineering buyers, Source Rating will review one supplier link and your main risk concern at no cost. You receive a concise note on obvious red flags, engineering fit, and whether a paid visit or inspection is worth it.
            </p>
            <div className="mt-8 divide-y divide-gray-200 border-y border-gray-200">
              {[
                "Best for early supplier screening before deposit",
                "Desk-based only: no legal opinion, lab test, or on-site claim",
                "Send supplier link, product category, target country, and concern",
              ].map((item) => (
                <div key={item} className="flex gap-3 py-4">
                  <SearchCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
                  <p className="text-sm font-semibold text-gray-800">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/risk-screen" className="inline-flex items-center justify-center gap-2 bg-brand-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-800">
                Request free screen <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="/downloads/source-rating-engineering-supplier-checklist.pdf" download className="inline-flex items-center justify-center gap-2 border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 transition hover:-translate-y-0.5 hover:border-brand-300">
                Download PDF <Download className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[0.34fr_1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase text-brand-700">Pricing</p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight text-gray-950">
              Start with the free screen. Expand only if risk requires it.
            </h2>
          </div>
          <div className="divide-y divide-gray-200 border-y border-gray-200">
            {pricingItems.slice(0, 3).map((item) => (
              <div key={item.service} className="grid grid-cols-1 gap-4 py-6 md:grid-cols-[1fr_160px] md:items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-950">{item.service}</h3>
                  <p className="mt-2 max-w-[66ch] text-sm leading-6 text-gray-600">{item.description}</p>
                </div>
                <p className="font-mono text-lg font-semibold text-brand-700 md:text-right">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 bg-[#f4f6f4] py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase text-brand-700">Ready for one supplier check</p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight text-gray-950">
              Send the supplier link, product category, and what worries you.
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              You will get practical scope and fixed quote guidance within 24 hours.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link href="/risk-screen" className="inline-flex items-center justify-center gap-2 bg-brand-950 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-800">
              Request a check <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="mailto:contact@sourcerating.com" className="inline-flex items-center justify-center border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-800 transition hover:-translate-y-0.5 hover:border-brand-300">
              contact@sourcerating.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
