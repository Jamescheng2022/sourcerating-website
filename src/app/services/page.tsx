import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { services } from "@/data/services";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Services",
  description:
    "China supplier verification, factory audits, pre-shipment inspection, production monitoring, sourcing support, and visit coordination for engineering buyers.",
  path: "/services",
  ogImage: "/images/hero-factory-audit.png",
});

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-950 pt-28 text-white">
        <Image src="/images/hero-factory-audit.png" alt="China factory audit for engineering buyers" fill priority sizes="100vw" className="object-cover opacity-38" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/88 to-brand-950/40" />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase text-brand-200">Services</p>
            <h1 className="mt-4 text-5xl font-bold sm:text-6xl">
              Checks built around real procurement decisions.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-200">
              Verify the supplier, audit the factory, monitor the order, or inspect the shipment before the risk becomes expensive.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-5">
            {services.map((service) => (
              <div key={service.id} id={service.id} className="grid grid-cols-1 gap-8 border-b border-gray-200 py-10 last:border-b-0 lg:grid-cols-[0.38fr_0.62fr]">
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-50 text-brand-700">
                    <service.icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-5 text-3xl font-bold text-gray-950">{service.title}</h2>
                  <p className="mt-4 text-gray-600 leading-7">{service.longDescription}</p>
                  <Link href="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900">
                    Request this service <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3 rounded-md bg-[#fbfbf8] p-4">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                      <span className="text-sm leading-6 text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
