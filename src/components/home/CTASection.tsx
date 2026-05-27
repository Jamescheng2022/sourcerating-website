import { ArrowRight, Mail } from "lucide-react";
import { TrackedLink } from "@/components/ui/TrackedLink";

export function CTASection() {
  return (
    <section className="py-20 bg-brand-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <p className="text-sm font-semibold uppercase text-brand-300">Start with one engineering supplier</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">
              Have a precast, steel, MEP, or construction material supplier you need checked?
            </h2>
            <p className="mt-4 text-lg text-gray-300 leading-relaxed">
              Send the supplier name, product details, drawings/specification status, order stage, and what you are worried about. You will get a practical next-step recommendation within 24 hours.
            </p>
          </div>
          <div className="flex flex-col gap-3 min-w-[250px]">
            <TrackedLink eventName="cta_click" eventParams={{ location: "final_cta", label: "request_check" }} href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-brand-950 bg-white rounded-md hover:bg-gray-100 transition-all">
              <Mail className="h-4 w-4" /> Request a Check
            </TrackedLink>
            <a href="mailto:contact@sourcerating.com" className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-white/10 rounded-md hover:bg-white/15 transition-all border border-white/10">
              Email Directly <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
