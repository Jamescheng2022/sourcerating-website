import Link from "next/link";
import { ArrowRight, BookOpen, Download, ShieldCheck, Scale, ExternalLink } from "lucide-react";
import { generatePageMetadata } from "@/lib/metadata";
import { ResourceDirectory } from "@/components/resources/ResourceDirectory";
import { sourceReviewDate, officialResources } from "@/data/free-resources";

export const metadata = generatePageMetadata({
  title: "Free Procurement Resource Library · 免费工程采购资源库",
  description:
    "Curated official supplier verification, CBAM steel data, customs tariffs and international shipping compliance resources. English source names with practical Chinese engineering notes.",
  keywords: [
    "free procurement templates",
    "engineering sourcing resource library",
    "CBAM steel supplier guidance",
    "import tariff lookup",
    "China manufacturer verification",
    "Incoterms 2020 checklist",
    "USITC HTS lookup",
  ],
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-[#f7f8f6] pb-36 pt-18 sm:pt-28">
      {/* Hero section */}
      <section className="border-b border-gray-200 bg-brand-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-16 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-800/80 px-3 py-1 text-xs font-semibold text-brand-200">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Free Engineering Procurement Library · 免费资源导航</span>
            </span>
            <h1 className="mt-3 text-2xl font-extrabold tracking-tight sm:mt-4 sm:text-5xl">
              Official Procurement Documents, Organised by Real Decisions.
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-gray-200 sm:mt-4 sm:text-lg">
              {officialResources.length} reviewed entry points for international
              engineering buyers. Direct links to official European Commission,
              USITC, USDA, and ICC publishers — paired with practical Chinese
              operational notes without repackaged copyright files.
            </p>

            {/* Quick Action Badges */}
            <div className="mt-4 flex items-center gap-2.5 overflow-x-auto sm:flex-wrap no-scrollbar pb-1 pt-0.5 sm:mt-6 sm:gap-3">
              <a
                href="/downloads/sourcerating-resource-index-20261024.csv"
                download
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-bold text-brand-950 shadow hover:bg-gray-100 transition-colors shrink-0 whitespace-nowrap"
              >
                <Download className="h-4 w-4" />
                <span>Download Bilingual Index (CSV)</span>
              </a>
              <Link
                href="/playbook"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-white/30 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/10 transition-colors shrink-0 whitespace-nowrap"
              >
                <span>Supplier Playbook</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/risk-screen"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-brand-500/50 bg-brand-900/40 px-4 py-2.5 text-xs font-semibold text-brand-200 hover:bg-brand-900 transition-colors shrink-0 whitespace-nowrap"
              >
                <span>Free Risk Screen</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <p className="mt-4 text-[11px] text-gray-400">
              Official publisher sources reviewed on {sourceReviewDate}. Check
              current revisions, destination customs rules, and qualified advice
              before entering commercial contracts.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content & Interactive Directory */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        {/* Core Value Pillars on Mobile */}
        <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs">
            <div className="flex items-center gap-2 text-brand-900 font-bold text-sm">
              <Scale className="h-4 w-4 text-brand-700" />
              <span>Decisions Over PDFs</span>
            </div>
            <p className="mt-1 text-xs text-gray-600 leading-relaxed">
              Organised by specific buyer pain points (pre-deposit, CBAM emissions, HS code reconciliation) rather than arbitrary file dumps.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs">
            <div className="flex items-center gap-2 text-brand-900 font-bold text-sm">
              <ExternalLink className="h-4 w-4 text-brand-700" />
              <span>Direct Official Sources</span>
            </div>
            <p className="mt-1 text-xs text-gray-600 leading-relaxed">
              Links point directly to official government bodies and standard organizations so you always inspect authentic, updated releases.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs">
            <div className="flex items-center gap-2 text-brand-900 font-bold text-sm">
              <ShieldCheck className="h-4 w-4 text-brand-700" />
              <span>Bilingual Factory Handoff</span>
            </div>
            <p className="mt-1 text-xs text-gray-600 leading-relaxed">
              Includes practical Chinese task instructions to align engineering expectations with Asian manufacturers and suppliers.
            </p>
          </div>
        </div>

        {/* Client Interactive Directory */}
        <ResourceDirectory />

        {/* Legal, Copyright & Rights Notice */}
        <section className="mt-12 rounded-xl border border-gray-200 bg-white p-6 shadow-xs sm:p-8">
          <h2 className="text-base font-bold text-gray-950 sm:text-lg">
            Rights, Fair Reuse & Regulatory Notices
          </h2>
          <div className="mt-3 space-y-3 text-xs leading-relaxed text-gray-600 sm:text-sm">
            <p>
              Free public access does not constitute permission to resell, repackage, or translate third-party works without authorization. European Commission documents are subject to specific reuse conditions and legal notices; International Chamber of Commerce (ICC) publications carry registered trademark and copyright protections; portions of the EU Access2Markets database expressly prohibit commercial data resale.
            </p>
            <p>
              SourceRating provides direct reference links to official institutional publishers for informational and compliance assistance. SourceRating is not sponsored by, endorsed by, or affiliated with the external publishers referenced above.
            </p>
            <p>
              Tariff schedules, environmental reporting mandates (e.g. EU CBAM), and import sanitary regulations change frequently. Always confirm the current statutory text with licensed customs brokers or legal counsel for transaction-specific matters.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-gray-100 pt-5">
            <Link
              href="/risk-screen"
              className="inline-flex min-h-[44px] items-center gap-2 text-xs font-bold text-brand-800 hover:text-brand-950 sm:text-sm"
            >
              <span>Need an order-specific supplier risk assessment?</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
