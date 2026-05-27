import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, FileText, Mail, ShieldCheck } from "lucide-react";

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
