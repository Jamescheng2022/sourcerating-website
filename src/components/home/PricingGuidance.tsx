import { ArrowRight } from "lucide-react";
import { pricingItems } from "@/data/pricing";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrackedLink } from "@/components/ui/TrackedLink";

export function PricingGuidance() {
  return (
    <section className="py-16 bg-[#fbfbf8] border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[0.42fr_1fr] gap-10 items-start">
          <SectionHeading
            centered={false}
            label="Pricing"
            title="Simple starting points."
            description="Most projects can start with one supplier check, then expand only if the risk justifies it."
          />
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pricingItems.slice(0, 3).map((item) => (
            <div key={item.service} className="rounded-md border border-gray-200 bg-white p-5">
              <h3 className="text-lg font-bold text-gray-950">{item.service}</h3>
              <p className="mt-3 text-2xl font-bold text-brand-700">{item.price}</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.description}</p>
            </div>
          ))}
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <TrackedLink eventName="pricing_click" eventParams={{ location: "pricing_guidance" }} href="/pricing" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800">
                View pricing details <ArrowRight className="h-4 w-4" />
              </TrackedLink>
              <TrackedLink eventName="cta_click" eventParams={{ location: "pricing_guidance", label: "fixed_quote" }} href="/contact" className="text-sm font-semibold text-gray-700 hover:text-gray-950">
                Get a fixed quote within 24 hours
              </TrackedLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
