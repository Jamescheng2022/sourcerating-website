import Link from "next/link";
import { ArrowRight, Compass, Sparkles, CheckCircle2 } from "lucide-react";
import { generatePageMetadata } from "@/lib/metadata";
import { IntelligenceDirectory } from "@/components/intelligence/IntelligenceDirectory";

export const metadata = generatePageMetadata({
  title: "Industrial Intelligence & Deep Research · 工业供应链深度研报",
  description:
    "Evidence-based sourcing intelligence, metallurgy verification, landed cost reality, and factory capability investigations across China, Vietnam, and Southeast Asia.",
  keywords: [
    "industrial sourcing research",
    "China steel mill verification",
    "CBAM steel emissions audit",
    "factory audit intelligence",
    "landed cost analysis China",
    "engineering procurement research",
  ],
  path: "/intelligence",
});

export default function IntelligencePage() {
  return (
    <div className="min-h-screen bg-[#f7f8f6] pb-24 pt-24 sm:pt-28">
      {/* Hero section */}
      <section className="border-b border-gray-200 bg-brand-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-800/80 px-3 py-1 text-xs font-semibold text-brand-200">
              <Compass className="h-3.5 w-3.5" />
              <span>Independent Engineering Sourcing Research</span>
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
              Industrial Intelligence Based on Physical Evidence.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-gray-200 sm:text-lg">
              We investigate real engineering sourcing questions: can imported
              Chinese steel coil actually compete in Latin America? How do you
              reconcile mill test certificates with physical heat numbers? What
              CBAM emissions disclosures can mills actually provide?
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/resources"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-bold text-brand-950 shadow hover:bg-gray-100 transition-colors"
              >
                <span>Free Resource Library</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/field-kits"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-white/30 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
              >
                <span>Field Kits Preview</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        {/* Explanation-Only Future Intelligence Model Banner */}
        <section className="mb-8 rounded-xl border border-brand-200 bg-white p-5 shadow-xs sm:p-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Subscription Concept · In Preparation</span>
              </div>
              <h2 className="mt-2 text-xl font-bold text-gray-950 sm:text-2xl">
                Deep Research Dossiers: What We Are Building
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-gray-600 sm:text-sm">
                Beyond public buyer guides, we are preparing deep technical dossiers:
                unredacted plant capacity benchmarks, raw calculation spreadsheets,
                and micro-level tariff risk analyses.
              </p>
              <div className="mt-3 grid grid-cols-1 gap-2 text-xs text-gray-700 sm:grid-cols-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Public buyer guides and articles remain 100% free forever</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>No price commitments, forms, or charges active on this page</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Transparent refund, delivery, and licensing terms prior to release</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Independent buyer-side verification without factory sponsorships</span>
                </div>
              </div>
            </div>

            <div className="shrink-0 rounded-xl bg-gray-50 p-4 border border-gray-200 text-center lg:w-64">
              <span className="text-xs font-semibold uppercase text-gray-500">
                Current Access Status
              </span>
              <p className="mt-1 text-sm font-bold text-brand-900">
                Open Access (Free)
              </p>
              <p className="mt-1 text-[11px] text-gray-500">
                No account or payment required to read all research below.
              </p>
            </div>
          </div>
        </section>

        {/* Directory with Published Investigations & Planned Dossiers */}
        <IntelligenceDirectory />
      </div>
    </div>
  );
}
