import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, FileText, Mail, SearchCheck, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Engineering Supplier Verification Checklist",
  description:
    "Download Source Rating's engineering supplier verification checklist for overseas buyers evaluating Chinese suppliers before deposit, production, or shipment.",
};

const checklistSections = [
  "Legal identity and export entity",
  "Drawings, specifications, tolerances, and standards",
  "Factory capability and current workload",
  "QA/QC controls, certificates, and traceability",
  "Packaging, markings, documents, and shipment release",
];

const includedSections = [
  "Supplier identity and business legitimacy",
  "Engineering documents and technical fit",
  "Factory capability and production capacity",
  "QA/QC, certificates, and traceability",
  "Production monitoring and schedule risk",
  "Pre-shipment inspection and release",
  "Risk scoring matrix",
  "Supplier questions before a visit",
  "When to request Source Rating support",
];

const sampleReports = [
  {
    src: "/images/report-cover-redacted.svg",
    alt: "Redacted supplier verification report cover sample",
    title: "Supplier report cover",
  },
  {
    src: "/images/report-risk-matrix-redacted.svg",
    alt: "Redacted supplier verification risk matrix sample",
    title: "Risk matrix preview",
  },
  {
    src: "/images/report-photo-evidence-redacted.svg",
    alt: "Redacted supplier verification photo evidence sample",
    title: "Photo evidence page",
  },
];

export default function ChecklistPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-950 pt-28 text-white">
        <Image
          src="/images/checklist-report-pack.png"
          alt="Engineering supplier verification checklist and report package"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-38"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/88 to-brand-950/45" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 pb-20 pt-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase text-brand-200">Free buyer resource</p>
            <h1 className="mt-4 text-5xl font-bold sm:text-6xl">
              Engineering Supplier Verification Checklist
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-200">
              A practical pre-deposit and pre-shipment checklist for overseas buyers evaluating Chinese engineering and construction material suppliers.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="/downloads/source-rating-engineering-supplier-checklist.pdf"
                download
                className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-brand-950 hover:bg-gray-100"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </a>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/15">
                Ask about a supplier <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="rounded-md border border-white/15 bg-white/10 p-6 backdrop-blur">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-brand-200" />
              <h2 className="text-xl font-bold">What it helps you check</h2>
            </div>
            <div className="mt-6 space-y-4">
              {checklistSections.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-200" />
                  <p className="text-sm leading-6 text-gray-100">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase text-brand-700">How to use it</p>
            <h2 className="mt-3 text-4xl font-bold text-gray-950">
              Use the checklist before you release money or shipment.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              ["Before deposit", "Check legal identity, supplier claims, engineering fit, and factory capability."],
              ["During production", "Track QA/QC evidence, documents, nonconformities, and production progress."],
              ["Before shipment", "Confirm quantity, dimensions, finish, markings, packaging, and release documents."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-md border border-gray-200 bg-[#fbfbf8] p-5">
                <h3 className="font-bold text-gray-950">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-gray-200 bg-white py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[0.42fr_1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase text-brand-700">Inside the PDF</p>
            <h2 className="mt-3 text-4xl font-bold text-gray-950">
              A buyer-side checklist, not a generic supplier form.
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600">
              The document gives your procurement or project team a simple way to score supplier risk before deposit, during production, and before shipment release.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {includedSections.map((section, index) => (
              <div key={section} className="flex items-start gap-3 border border-gray-200 bg-[#fbfbf8] p-4">
                <span className="font-mono text-sm font-semibold text-brand-700">{String(index + 1).padStart(2, "0")}</span>
                <p className="text-sm font-semibold leading-6 text-gray-800">{section}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f6f4] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase text-brand-700">Report preview</p>
            <h2 className="mt-3 text-4xl font-bold text-gray-950">
              Example outputs are redacted so clients can understand the format.
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600">
              These are sample visuals for the website. Real client reports include project-specific acceptance criteria, real factory evidence, and redacted buyer/supplier information where needed.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {sampleReports.map((report) => (
              <div key={report.src} className="border border-gray-200 bg-white p-3 shadow-sm">
                <div className="relative aspect-[1.08/1.38] overflow-hidden bg-gray-100">
                  <Image
                    src={report.src}
                    alt={report.alt}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-3 font-mono text-xs font-semibold uppercase text-gray-500">Sample / redacted</p>
                <h3 className="mt-1 font-bold text-gray-950">{report.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div className="relative min-h-[420px] overflow-hidden border border-gray-200 bg-gray-100">
            <Image
              src="/images/audit-report-desk-mockup.png"
              alt="Anonymized engineering supplier verification report mockup"
              fill
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase text-brand-700">Launch offer</p>
            <h2 className="mt-3 text-4xl font-bold text-gray-950">
              Want a quick opinion before ordering an audit?
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600">
              During launch, Source Rating can review one supplier link for free and tell you whether the obvious risk profile looks suitable for a deeper paid check.
            </p>
            <div className="mt-7 divide-y divide-gray-200 border-y border-gray-200">
              {[
                "Send one supplier link, product category, target country, and main concern.",
                "Receive a concise first-pass risk screen, not a legal opinion or lab result.",
                "If the supplier looks worth checking, you get a recommended next step and scope.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 py-4">
                  <SearchCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
                  <p className="text-sm font-semibold leading-6 text-gray-800">{item}</p>
                </div>
              ))}
            </div>
            <Link href="/contact" className="mt-8 inline-flex w-fit items-center justify-center gap-2 bg-brand-950 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-800">
              Request the free screen <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-gray-200 bg-[#f7f8f5] py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase text-brand-700">Need a factory checked?</p>
            <h2 className="mt-3 text-4xl font-bold text-gray-950">
              Send the supplier link and your main concern.
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Source Rating can turn the checklist into a scoped supplier verification visit, desk check, or pre-shipment inspection.
            </p>
          </div>
          <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-950 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-800">
            <Mail className="h-4 w-4" />
            Request a scope
          </Link>
        </div>
      </section>
    </>
  );
}
