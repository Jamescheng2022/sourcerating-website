import { ArrowRight } from "lucide-react";
import { pricingItems } from "@/data/pricing";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrackedLink } from "@/components/ui/TrackedLink";

export function PricingGuidance() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Pricing guidance"
          title="Clear starting points for engineering supplier checks."
          description="Final pricing depends on factory location, product complexity, drawings/specification depth, inspection scope, travel requirements, and report detail."
        />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pricingItems.slice(0, 5).map((item) => (
            <div key={item.service} className="rounded-md border border-gray-200 bg-white p-6">
              <h3 className="text-lg font-bold text-gray-950">{item.service}</h3>
              <p className="mt-3 text-2xl font-bold text-brand-700">{item.price}</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <TrackedLink eventName="pricing_click" eventParams={{ location: "pricing_guidance" }} href="/pricing" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800">
            View pricing details <ArrowRight className="h-4 w-4" />
          </TrackedLink>
          <span className="hidden sm:block text-gray-300">|</span>
          <TrackedLink eventName="cta_click" eventParams={{ location: "pricing_guidance", label: "fixed_quote" }} href="/contact" className="text-sm font-semibold text-gray-700 hover:text-gray-950">
            Send supplier and project details for a fixed quote within 24 hours
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
