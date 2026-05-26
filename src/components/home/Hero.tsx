import Image from "next/image";
import { ArrowRight, CheckCircle2, FileText } from "lucide-react";
import { TrackedLink } from "@/components/ui/TrackedLink";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 bg-[#f7f8f5] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-10 lg:gap-14 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-md border border-brand-200 bg-white px-3 py-1.5 text-sm font-semibold text-brand-800 mb-6">
              China engineering supplier checks
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-950 leading-[1.02]">
              Verify Chinese engineering suppliers before you commit.
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Buyer-side factory checks for precast concrete, steel structures, construction materials, MEP components, and engineering equipment.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <TrackedLink eventName="cta_click" eventParams={{ location: "hero", label: "request_factory_check" }} href="/contact" className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-brand-700 rounded-md hover:bg-brand-800 transition-colors">
                Request a supplier check <ArrowRight className="h-4 w-4" />
              </TrackedLink>
              <TrackedLink eventName="pricing_click" eventParams={{ location: "hero" }} href="/pricing" className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-gray-800 bg-white rounded-md border border-gray-300 hover:border-brand-300 transition-colors">
                View pricing
              </TrackedLink>
            </div>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-200 pt-6">
              {[
                ["20+ years", "international engineering"],
                ["24h", "initial scope response"],
                ["PDF", "risk report + evidence"],
              ].map(([metric, label]) => (
                <div key={metric}>
                  <p className="text-2xl font-bold text-gray-950">{metric}</p>
                  <p className="mt-1 text-sm text-gray-500">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[1.18/1] overflow-hidden rounded-md border border-gray-200 bg-gray-900 shadow-sm">
              <Image
                src="/images/ai-engineering-inspection.png"
                alt="Engineering supplier verification inside a steel fabrication workshop"
                fill
                priority
                sizes="(min-width: 1024px) 54vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/65 via-gray-950/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <div className="max-w-sm rounded-md border border-white/15 bg-white/92 p-4 shadow-sm backdrop-blur">
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-950">
                    <FileText className="h-4 w-4 text-brand-700" />
                    Supplier verification brief
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-600">
                    {["Factory capability", "QA/QC evidence", "Delivery risk", "Next steps"].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-brand-700" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-gray-600">
              {["Precast concrete", "Steel structures", "Construction materials", "MEP components"].map((item) => (
                <span key={item} className="rounded-md border border-gray-200 bg-white px-3 py-2">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
