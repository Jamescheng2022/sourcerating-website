import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { industries } from "@/data/industries";

export const metadata: Metadata = {
  title: "Industries",
  description: "China supplier verification for construction materials, building systems, structural packages, equipment, civil materials, and made-to-spec project components.",
  keywords: ["China building materials supplier verification", "China construction equipment supplier audit", "construction materials supplier inspection China"],
};

export default function IndustriesPage() {
  return (
    <>
      <section className="pt-28 pb-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-sm font-semibold uppercase text-brand-700">Construction supply focus</span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-gray-950">
              Broad enough for construction projects. Focused enough to avoid consumer-goods sourcing.
            </h1>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Source Rating covers the materials, equipment, and project components that construction buyers source from China: structural systems, finishes, MEP packages, civil materials, site equipment, and custom made-to-spec items.
            </p>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industries.map((industry) => (
              <div key={industry.id} id={industry.id} className="p-7 rounded-md border border-gray-200 bg-white hover:border-brand-200 hover:shadow-sm transition-all">
                <span className="inline-flex h-11 min-w-11 items-center justify-center rounded-md bg-brand-50 border border-brand-100 px-2 text-sm font-bold text-brand-700 mb-5">{industry.icon}</span>
                <h2 className="text-2xl font-bold text-gray-950 mb-3">{industry.name}</h2>
                <p className="text-gray-600 leading-relaxed mb-5">{industry.description}</p>
                <div className="mb-6 space-y-2">
                  {["Supplier identity", "Factory capability", "QA/QC evidence"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="h-4 w-4 text-brand-700" />
                      {item}
                    </div>
                  ))}
                </div>
                <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800 transition-colors">
                  Discuss this category <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
