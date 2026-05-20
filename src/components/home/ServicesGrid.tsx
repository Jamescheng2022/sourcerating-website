import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ServicesGrid() {
  return (
    <section className="py-20 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Core services"
          title="Practical checks for real sourcing risk"
          description="Focused support for buyers who need facts before they place orders, pay deposits, or scale production."
        />
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <Link key={service.id} href={`/services#${service.id}`} className="group relative p-7 rounded-md bg-white border border-gray-200 hover:border-brand-300 hover:shadow-sm transition-all duration-300 flex flex-col">
              <div className="flex items-center justify-center w-11 h-11 rounded-md bg-brand-50 text-brand-700 mb-5 group-hover:bg-brand-100 transition-colors">
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-brand-700 transition-colors">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm flex-grow">{service.description}</p>
              <div className="mt-5 flex items-center gap-2 text-sm font-medium text-brand-700 transition-colors">
                Learn more <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
