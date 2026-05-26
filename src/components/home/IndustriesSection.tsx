import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { industries } from "@/data/industries";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function IndustriesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Engineering material focus"
          title="Focused on the construction and engineering supply chain"
          description="A narrower focus is the point. The service is designed for project buyers who need to verify manufacturing capability for construction materials and engineered components."
        />
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {industries.map((industry) => (
            <Link key={industry.id} href={`/industries#${industry.id}`} className="group p-5 rounded-md bg-[#fbfbf8] border border-gray-200 hover:border-brand-200 hover:shadow-sm transition-all">
              <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-md bg-white border border-gray-200 px-2 text-sm font-bold text-brand-700 mb-4">{industry.icon}</span>
              <h4 className="text-sm font-bold text-gray-950 group-hover:text-brand-700 transition-colors">{industry.name}</h4>
              <p className="mt-2 text-xs leading-relaxed text-gray-600">{industry.description}</p>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/industries" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800 transition-colors">
            View material categories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
