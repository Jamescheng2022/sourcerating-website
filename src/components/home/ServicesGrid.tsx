import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";

const featuredServiceIds = ["supplier-verification", "factory-audit", "pre-shipment-inspection"];

export function ServicesGrid() {
  const featuredServices = services.filter((service) => featuredServiceIds.includes(service.id));

  return (
    <section className="py-16 bg-[#fbfbf8] border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[0.42fr_1fr] gap-10 items-start">
          <div>
            <p className="text-sm font-semibold uppercase text-brand-600">Core services</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-950">Pick the check that matches your order risk.</h2>
            <Link href="/services" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800">
              View all services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {featuredServices.map((service) => (
              <Link key={service.id} href={`/services#${service.id}`} className="group grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] gap-4 items-start rounded-md border border-gray-200 bg-white p-5 hover:border-brand-300 hover:shadow-sm transition-all">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-50 text-brand-700">
                  <service.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-950 group-hover:text-brand-700 transition-colors">{service.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">{service.description}</p>
                </div>
                <ArrowRight className="hidden sm:block h-4 w-4 text-brand-700 mt-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
            <div className="rounded-md border border-gray-200 bg-white p-5">
              <p className="text-sm font-bold text-gray-950">Also available</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Production monitoring, sourcing support, China visit coordination, and engineering supplier shortlisting.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-gray-600">
                {["Precast", "Steel", "MEP", "Construction materials", "Equipment"].map((item) => (
                  <span key={item} className="rounded-md border border-gray-200 bg-[#fbfbf8] px-3 py-1.5">{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
