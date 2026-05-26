import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description: "China supplier verification, factory audits, pre-shipment inspection, production monitoring, sourcing support, and visit coordination for engineering and construction materials.",
  keywords: ["China engineering supplier verification", "steel structure factory audit China", "precast concrete supplier audit", "construction materials inspection China"],
};

export default function ServicesPage() {
  return (
    <>
      <section className="pt-28 pb-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-700">Services</span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-gray-950">
              China verification support for engineering procurement.
            </h1>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Each service is designed around a procurement decision: approve a supplier, release a deposit, monitor production, release shipment, or build a qualified supplier shortlist.
            </p>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service) => (
              <div key={service.id} id={service.id} className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-start rounded-md border border-gray-200 bg-white p-7">
                <div>
                  <div className="flex items-center justify-center w-12 h-12 rounded-md bg-brand-50 text-brand-700 mb-5">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-950">{service.title}</h2>
                  <p className="mt-4 text-gray-600 leading-relaxed">{service.longDescription}</p>
                  <Link href="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white bg-brand-700 px-5 py-2.5 rounded-md hover:bg-brand-800 transition-colors">
                    Request this service <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="rounded-md bg-[#fbfbf8] border border-gray-200 p-6">
                  <p className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">Scope can include</p>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
