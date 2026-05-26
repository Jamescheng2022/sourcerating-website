import { ArrowRight, CheckCircle2, ClipboardCheck, FileText, ShieldCheck } from "lucide-react";
import { TrackedLink } from "@/components/ui/TrackedLink";

export function Hero() {
  return (
    <section className="relative pt-28 pb-18 bg-[#fbfbf8] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.03fr_0.97fr] gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md border border-brand-200 bg-white px-3 py-1.5 text-sm font-semibold text-brand-800 mb-7">
              20+ years in international engineering projects
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-950 leading-[1.04]">
              China Supplier Verification for Engineering &amp; Construction Materials
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
              Buyer-side factory audits, supplier checks, pre-shipment inspections, and sourcing support for precast concrete, steel structures, construction materials, and engineered project components.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <TrackedLink eventName="cta_click" eventParams={{ location: "hero", label: "request_factory_check" }} href="/contact" className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-brand-700 rounded-md hover:bg-brand-800 transition-colors">
                Request a Factory Check <ArrowRight className="h-4 w-4" />
              </TrackedLink>
              <TrackedLink eventName="pricing_click" eventParams={{ location: "hero" }} href="/pricing" className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-gray-800 bg-white rounded-md border border-gray-300 hover:border-brand-300 transition-colors">
                View pricing
              </TrackedLink>
            </div>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {["Engineering materials focus", "Buyer-side only", "Quote within 24 hours"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-brand-700" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="border border-gray-200 rounded-md bg-white p-4 sm:p-5">
            <div className="bg-white border border-gray-200 rounded-md">
              <div className="border-b border-gray-200 px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-950">Engineering Supplier Verification Brief</p>
                  <p className="text-xs text-gray-500 mt-1">Sample evidence structure</p>
                </div>
                <ShieldCheck className="h-5 w-5 text-brand-700" />
              </div>
              <div className="p-5 space-y-4">
                {[
                  ["Project fit", "Drawings, specifications, standards"],
                  ["Factory capability", "Workshops, molds, equipment, workforce"],
                  ["QA/QC controls", "Inspection records, traceability, certificates"],
                  ["Delivery risk", "Capacity, schedule, packaging, export readiness"],
                ].map(([title, desc]) => (
                  <div key={title} className="grid grid-cols-[140px_1fr] gap-4 border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                    <p className="text-sm font-semibold text-gray-900">{title}</p>
                    <p className="text-sm text-gray-600">{desc}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 bg-[#f6f7f3] px-5 py-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-brand-700" />
                  PDF report and photo evidence
                </div>
                <div className="flex items-center gap-2">
                  <ClipboardCheck className="h-4 w-4 text-brand-700" />
                  Risk rating and next actions
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs font-semibold text-gray-600">
              <div className="rounded-md border border-gray-200 bg-[#fbfbf8] px-3 py-2">Precast</div>
              <div className="rounded-md border border-gray-200 bg-[#fbfbf8] px-3 py-2">Steel</div>
              <div className="rounded-md border border-gray-200 bg-[#fbfbf8] px-3 py-2">MEP</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
