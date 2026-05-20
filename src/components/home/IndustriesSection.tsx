import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { industries } from "@/data/industries";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function IndustriesSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading label="Industries Covered" title="Deep experience across industrial and engineering supply chains" description="We focus on sectors where technical knowledge matters — machinery, construction, metal fabrication, electronics, and more." />
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {industries.map((industry) => (
            <Link key={industry.id} href={`/industries#${industry.id}`} className="group p-6 rounded-xl bg-white border border-gray-100 hover:border-brand-200 hover:shadow-sm transition-all text-center">
              <span className="text-3xl mb-3 block">{industry.icon}</span>
              <h4 className="text-sm font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">{industry.name}</h4>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/industries" className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors">View all industries <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  );
}
