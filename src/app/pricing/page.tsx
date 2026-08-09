import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { pricingFactors, pricingItems } from "@/data/pricing";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Pricing",
  description: "Launch pricing for engineering supplier verification, factory visits, technical supplier review, procurement support, pre-shipment inspection, and buyer-side success-fee projects.",
  keywords: ["China engineering supplier verification pricing", "construction materials factory audit cost", "engineering procurement advisor fee", "China sourcing service price"],
  path: "/pricing",
});

const paymentSteps = [
  {
    title: "Small verification scopes",
    text: "Background checks, technical reviews, and factory visits are quoted as fixed scopes. Payment is made against an invoice, with Thailand bank transfer as the launch default.",
  },
  {
    title: "Procurement project setup",
    text: "For a live RFQ or sourcing assignment, the initial setup is normally USD 800–1,500. Where agreed in advance, part or all of this setup fee can be credited against the later success fee.",
  },
  {
    title: "Success fee only when procurement proceeds",
    text: "For buyer-side procurement mandates, the typical success fee is 1–2% of the awarded supplier PO value. The percentage and payment milestone are agreed in writing before supplier award or negotiation support begins.",
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="border-b border-gray-100 bg-white pb-16 pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-sm font-semibold uppercase text-brand-700">Pricing</span>
            <h1 className="mt-3 text-4xl font-bold text-gray-950 sm:text-5xl">
              Start small. Scale only when the procurement gets real.
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              Source Rating is designed to reduce the buyer&apos;s risk before a large purchase commitment. Start with a focused supplier check or factory visit, then move into deeper procurement support only when the project justifies it.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-200 bg-[#f4f6f4] py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
          <div>
            <span className="font-mono text-sm font-semibold uppercase text-brand-700">Launch offer</span>
            <h2 className="mt-2 text-3xl font-bold text-gray-950">Free first-pass screen for one supplier link.</h2>
            <p className="mt-3 max-w-[76ch] text-base leading-7 text-gray-600">
              Send the supplier website, product category, target country, and your main concern. I will give a concise desk-based risk note and suggest whether a deeper paid check is worth it.
            </p>
          </div>
          <Link href="/risk-screen" className="inline-flex items-center justify-center gap-2 bg-brand-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-800">
            Request free screen <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {pricingItems.map((item) => (
              <div key={item.service} className="rounded-md border border-gray-200 bg-white p-7">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-950">{item.service}</h2>
                    <p className="mt-3 leading-relaxed text-gray-600">{item.description}</p>
                  </div>
                  <p className="shrink-0 text-xl font-bold text-brand-700">{item.price}</p>
                </div>
                <div className="mt-6 border-t border-gray-100 pt-5">
                  <p className="mb-3 text-sm font-semibold text-gray-950">Typical deliverables</p>
                  <ul className="space-y-2">
                    {item.deliverables.map((deliverable) => (
                      <li key={deliverable} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 border-y border-gray-200 py-10">
            <div className="max-w-3xl">
              <span className="text-sm font-semibold uppercase text-brand-700">How payment works</span>
              <h2 className="mt-3 text-3xl font-bold text-gray-950">Simple invoicing first. No heavy payment stack required.</h2>
              <p className="mt-4 text-base leading-7 text-gray-600">
                During launch, paid work is confirmed by written scope and invoice. Bank details are provided on the invoice rather than published on the website.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
              {paymentSteps.map((step, index) => (
                <div key={step.title} className="border border-gray-200 bg-[#f7f8f5] p-6">
                  <p className="font-mono text-sm font-semibold text-brand-700">0{index + 1}</p>
                  <h3 className="mt-3 text-lg font-bold text-gray-950">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-600">{step.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 border border-brand-100 bg-brand-50 p-5">
              <p className="text-sm leading-6 text-brand-950">
                <strong>Buyer-side conflict rule:</strong> when Source Rating is engaged and paid by the buyer, there is no undisclosed supplier commission. If James has a commercial relationship with a candidate supplier, that relationship is disclosed before the supplier is evaluated or recommended.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-md border border-gray-200 bg-gray-50 p-7">
            <h2 className="text-xl font-bold text-gray-950">What affects the final quote?</h2>
            <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
              {pricingFactors.map((factor) => (
                <div key={factor} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                  {factor}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-800">
              Request a scope and invoice <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="mailto:contact@sourcerating.com" className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 transition-colors hover:border-gray-400">
              contact@sourcerating.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
