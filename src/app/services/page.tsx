import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Comprehensive China factory inspection, supplier verification, production monitoring, and industrial sourcing services for overseas clients.",
  keywords: ["China factory audit services","supplier verification China","production quality control China","factory inspection China","China sourcing services"],
};

export default function ServicesPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-b from-brand-950 to-brand-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-300">Our Services</span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-white">End-to-end China sourcing support</h1>
            <p className="mt-4 text-lg text-gray-300 leading-relaxed">From factory verification to production oversight, each service is designed to reduce your risk and give you confidence in your China supply chain.</p>
          </div>
        </div>
      </section>
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div key={service.id} id={service.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center`}>
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-50 text-brand-700 mb-6"><service.icon className="h-7 w-7" /></div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">{service.longDescription}</p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature) => (<li key={feature} className="flex items-start gap-3"><Check className="h-5 w-5 text-brand-600 shrink-0 mt-0.5" /><span className="text-gray-700">{feature}</span></li>))}
                  </ul>
                  <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-medium text-white bg-brand-700 px-5 py-2.5 rounded-lg hover:bg-brand-800 transition-colors">Inquire About This Service <ArrowRight className="h-4 w-4" /></Link>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="aspect-[4/3] rounded-2xl bg-gray-100 flex items-center justify-center"><span className="text-gray-400 text-sm">[Service image placeholder]</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
