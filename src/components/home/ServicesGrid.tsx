import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ServicesGrid() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading label="Our Services" title="Comprehensive sourcing support, from verification to delivery" description="Six core services designed to give you confidence in your China supply chain." />
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link key={service.id} href={`/services#${service.id}`} className="group relative p-8 rounded-2xl bg-white border border-gray-100 hover:border-brand-200 hover:shadow-md transition-all duration-300 flex flex-col">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-50 text-brand-700 mb-5 group-hover:bg-brand-100 transition-colors"><service.icon className="h-6 w-6" /></div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-brand-700 transition-colors">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm flex-grow">{service.description}</p>
              <div className="mt-5 flex items-center gap-2 text-sm font-medium text-brand-600 group-hover:text-brand-700 transition-colors">Learn more <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" /></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
