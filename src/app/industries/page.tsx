import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { industries } from "@/data/industries";

export const metadata: Metadata = {
  title: "Industries",
  description: "Industrial and engineering supply chain expertise across machinery, construction, metal fabrication, electronics, automotive, and renewable energy sectors in China.",
  keywords: ["China industrial sourcing","machinery manufacturer China","construction materials China","metal fabrication China","electronics manufacturing China"],
};

export default function IndustriesPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-b from-brand-950 to-brand-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-300">Industries</span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-white">Industrial expertise that general sourcing agents lack</h1>
            <p className="mt-4 text-lg text-gray-300 leading-relaxed">We focus on sectors where technical knowledge, engineering understanding, and manufacturing process expertise make the difference between a successful supplier relationship and costly mistake.</p>
          </div>
        </div>
      </section>
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((industry) => (
              <div key={industry.id} id={industry.id} className="p-8 rounded-2xl border border-gray-100 hover:border-brand-200 hover:shadow-sm transition-all">
                <span className="text-4xl mb-4 block">{industry.icon}</span>
                <h2 className="text-xl font-bold text-gray-900 mb-3">{industry.name}</h2>
                <p className="text-gray-600 leading-relaxed mb-4">{industry.description}</p>
                <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors">Discuss your project <ArrowRight className="h-4 w-4" /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
