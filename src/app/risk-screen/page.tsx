import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, FileText, ShieldCheck } from "lucide-react";
import { RiskScreenForm } from "@/components/shared/RiskScreenForm";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Free Supplier Risk Screen",
  description:
    "Run a no-login preliminary China supplier risk screen for construction materials, equipment, building systems, and project components before deposit, production, or shipment.",
  keywords: [
    "free China supplier risk screen",
    "construction materials supplier verification China",
    "China factory audit preliminary check",
    "China construction equipment supplier verification",
  ],
  alternates: { canonical: `${siteConfig.url}/risk-screen` },
};

export default function RiskScreenPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Free Supplier Risk Screen",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    serviceType: "China supplier risk screening",
    areaServed: ["Europe", "North America", "Australia", "United Kingdom"],
    description: metadata.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <section className="border-b border-gray-200 bg-brand-950 pt-28 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase text-brand-200">Launch offer</p>
            <h1 className="mt-4 max-w-[13ch] text-5xl font-bold leading-none sm:text-6xl">
              Free supplier risk screen.
            </h1>
            <p className="mt-6 max-w-[68ch] text-lg leading-8 text-gray-200">
              Submit one Chinese supplier and your main concern. Get an immediate preliminary risk view, then Source Rating can follow up with a human review if the case is a good fit.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#screen-form" className="inline-flex items-center justify-center gap-2 bg-white px-5 py-3 text-sm font-semibold text-brand-950 transition hover:-translate-y-0.5 hover:bg-gray-100">
                Start the screen <ArrowRight className="h-4 w-4" />
              </a>
              <Link href="/playbook" className="inline-flex items-center justify-center gap-2 border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/15">
                Read the playbook <FileText className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:self-end">
            {[
              [Clock, "3-5 minutes", "No login or payment required."],
              [ShieldCheck, "AI + human path", "Automated first pass, manual review after submission."],
              [FileText, "Better questions", "Evidence list before you pay or travel."],
            ].map(([Icon, title, text]) => (
              <div key={String(title)} className="border border-white/15 bg-white/8 p-5">
                <Icon className="h-5 w-5 text-brand-200" />
                <h2 className="mt-4 font-bold text-white">{String(title)}</h2>
                <p className="mt-2 text-sm leading-6 text-gray-300">{String(text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="screen-form" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase text-brand-700">Online risk screen</p>
            <h2 className="mt-3 text-4xl font-bold text-gray-950">Tell us what the supplier must prove.</h2>
            <p className="mt-4 text-base leading-7 text-gray-600">
              This MVP does not need a database or customer login. The form produces an initial screen and sends the case by email for follow-up. Add a portal later when customers need file history, paid reports, order tracking, or repeated supplier comparisons.
            </p>
          </div>
          <RiskScreenForm />
        </div>
      </section>

      <section className="border-t border-gray-200 bg-[#f4f6f4] py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[0.45fr_1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase text-brand-700">No-login MVP</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-950">Why no database yet?</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              ["Faster conversion", "A buyer can test you before creating an account."],
              ["Lower compliance burden", "No sensitive file storage in the first release."],
              ["Clear upgrade path", "Add database, uploads, and login when repeat usage proves demand."],
            ].map(([title, text]) => (
              <div key={title} className="border border-gray-200 bg-white p-5">
                <h3 className="font-bold text-gray-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
