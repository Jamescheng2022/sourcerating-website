import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { pricingFactors, pricingItems } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Pricing guidance for China engineering supplier verification, construction materials factory audits, pre-shipment inspection, sourcing projects, and production monitoring.",
  keywords: ["China engineering supplier verification pricing", "construction materials factory audit cost", "China sourcing service price"],
};

export default function PricingPage() {
  return (
    <>
      <section className="pt-28 pb-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-sm font-semibold uppercase text-brand-700">Pricing</span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-gray-950">
              Transparent starting points for engineering supplier checks.
            </h1>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Final pricing depends on factory location, product complexity, drawings/specification depth, inspection scope, travel requirements, and report depth. Send supplier and project details for a fixed quote within 24 hours.
            </p>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {pricingItems.map((item) => (
              <div key={item.service} className="rounded-md border border-gray-200 bg-white p-7">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold text-gray-950">{item.service}</h2>
                    <p className="mt-3 text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                  <p className="shrink-0 text-xl font-bold text-brand-700">{item.price}</p>
                </div>
                <div className="mt-6 border-t border-gray-100 pt-5">
                  <p className="text-sm font-semibold text-gray-950 mb-3">Typical deliverables</p>
                  <ul className="space-y-2">
                    {item.deliverables.map((deliverable) => (
                      <li key={deliverable} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="h-4 w-4 text-brand-700 shrink-0 mt-0.5" />
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-md border border-gray-200 bg-gray-50 p-7">
            <h2 className="text-xl font-bold text-gray-950">What affects the final quote?</h2>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
              {pricingFactors.map((factor) => (
                <div key={factor} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-brand-700 shrink-0 mt-0.5" />
                  {factor}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-brand-700 rounded-md hover:bg-brand-800 transition-colors">
              Request a fixed quote <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="mailto:contact@sourcerating.com" className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-gray-800 bg-white rounded-md border border-gray-300 hover:border-gray-400 transition-colors">
              contact@sourcerating.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
