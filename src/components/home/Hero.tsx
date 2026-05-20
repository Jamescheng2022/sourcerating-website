import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, ShieldCheck } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-28 pb-20 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700 mb-7">
              Independent China-based inspection partner
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-950 leading-[1.06]">
              Verify the factory before you pay the supplier.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
              Source Rating conducts on-site factory audits, supplier due diligence, production inspections, and industrial sourcing support for overseas buyers working with China.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-brand-700 rounded-md hover:bg-brand-800 transition-colors">
                Request a Factory Check <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="mailto:contact@sourcerating.com" className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-gray-800 bg-white rounded-md border border-gray-300 hover:border-gray-400 transition-colors">
                contact@sourcerating.com
              </a>
            </div>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {["No supplier commissions", "Photo-based reports", "24h response"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-brand-700" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="border border-gray-200 rounded-md bg-gray-50 p-5">
            <div className="bg-white border border-gray-200 rounded-md shadow-sm">
              <div className="border-b border-gray-200 px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-950">Factory Verification Brief</p>
                  <p className="text-xs text-gray-500 mt-1">Sample deliverables overview</p>
                </div>
                <ShieldCheck className="h-5 w-5 text-brand-700" />
              </div>
              <div className="p-5 space-y-4">
                {[
                  ["Business identity", "License, ownership, export status"],
                  ["Real capability", "Workshop, equipment, workforce"],
                  ["Quality control", "Incoming, in-process, final checks"],
                  ["Risk rating", "Findings, severity, next actions"],
                ].map(([title, desc]) => (
                  <div key={title} className="grid grid-cols-[140px_1fr] gap-4 border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                    <p className="text-sm font-semibold text-gray-900">{title}</p>
                    <p className="text-sm text-gray-600">{desc}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 bg-gray-50 px-5 py-4 flex items-center gap-3 text-sm text-gray-700">
                <FileText className="h-4 w-4 text-brand-700" />
                PDF report, inspection photos, risk notes, and follow-up call.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
