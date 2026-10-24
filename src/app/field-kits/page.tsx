import Link from "next/link";
import { ArrowRight, Wrench, Shield, FileSpreadsheet, Lock } from "lucide-react";
import { generatePageMetadata } from "@/lib/metadata";
import { fieldKits } from "@/data/field-kits";

export const metadata = generatePageMetadata({
  title: "Bilingual Field Kits · 采购实战工具包",
  description:
    "Practical bilingual engineering toolkits: Mill Test Certificate audit workbooks, factory audit checklists, and CBAM steel verification protocols.",
  keywords: [
    "steel mill test certificate checklist",
    "factory audit toolkit China",
    "CBAM steel questionnaire template",
    "engineering procurement toolkits",
    "bilingual sourcing checklists",
  ],
  path: "/field-kits",
});

export default function FieldKitsPage() {
  return (
    <div className="min-h-screen bg-[#f7f8f6] pb-24 pt-24 sm:pt-28 overflow-x-hidden w-full max-w-full">
      {/* Hero section */}
      <section className="border-b border-gray-200 bg-brand-950 text-white w-full min-w-0">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 w-full min-w-0">
          <div className="max-w-3xl min-w-0">
            <span className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full bg-brand-800/80 px-3 py-1 text-xs font-semibold text-brand-200">
              <Wrench className="h-3.5 w-3.5 shrink-0" />
              <span className="break-words">Engineering Procurement Toolkits · 实战工具包</span>
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl break-words">
              Turn Ambiguous Mill Promises Into Verifiable Evidence.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-gray-200 sm:text-lg break-words">
              Bilingual spreadsheets, ASTM/EN formula checkbooks, and factory floor
              non-conformance notice templates designed for buyers and inspectors
              verifying Chinese and Southeast Asian manufacturers.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/resources"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-bold text-brand-950 shadow hover:bg-gray-100 transition-colors"
              >
                <span>Free Resources</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/app"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-white/30 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
              >
                <span>Mobile App Preview</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Kits Catalog */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8 w-full min-w-0">
        {/* Preview Concept Disclosure Banner */}
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-5 shadow-xs min-w-0">
          <div className="flex items-start gap-3 min-w-0">
            <Lock className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
            <div className="min-w-0 flex-1">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 break-words">
                Editorial Preview & Toolkit Concept
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-gray-600 sm:text-sm break-words">
                These field kits are currently undergoing pilot testing on active
                factory audits in China and Thailand. Detail pages below show full
                worksheets, formula samples, and inspection procedures. No
                checkout is active and no prices are final.
              </p>
            </div>
          </div>
        </div>

        {/* Kits Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 min-w-0 w-full">
          {fieldKits.map((kit) => (
            <div
              key={kit.slug}
              className="min-w-0 flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-xs transition-shadow hover:border-brand-300 hover:shadow-md"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3 min-w-0">
                  <span className="rounded bg-brand-50 px-2 py-0.5 font-mono text-[11px] font-bold text-brand-900">
                    {kit.stage}
                  </span>
                  <span className="rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
                    {kit.status}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-bold text-gray-950 sm:text-xl break-words">
                  <Link
                    href={`/field-kits/${kit.slug}`}
                    className="hover:text-brand-700 hover:underline"
                  >
                    {kit.title}
                  </Link>
                </h3>
                <p className="mt-1 text-sm font-semibold text-brand-800 break-words" lang="zh">
                  {kit.chinese}
                </p>

                <p className="mt-3 text-xs leading-relaxed text-gray-600 sm:text-sm break-words line-clamp-3">
                  {kit.summary}
                </p>

                {/* What's included preview */}
                <div className="mt-4 min-w-0 rounded-lg bg-gray-50 p-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700 min-w-0">
                    <FileSpreadsheet className="h-3.5 w-3.5 text-brand-700 shrink-0" />
                    <span className="break-words">Includes {kit.items.length} Practical Assets:</span>
                  </div>
                  <ul className="mt-2 space-y-1.5 text-xs text-gray-600 min-w-0">
                    {kit.items.map((item, i) => (
                      <li key={i} className="min-w-0 break-words leading-relaxed">
                        • {item.name} <span className="text-gray-400 font-mono text-[11px]">({item.format})</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 border-t border-gray-100 pt-4 flex flex-wrap items-center justify-between gap-2 min-w-0">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 shrink-0">
                  Concept Preview
                </span>
                <Link
                  href={`/field-kits/${kit.slug}`}
                  className="inline-flex min-h-[44px] items-center gap-1.5 text-xs font-bold text-brand-800 hover:text-brand-950 shrink-0"
                >
                  <span>Inspect Kit Contents</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Context Callout */}
        <div className="mt-12 rounded-xl bg-brand-950 p-6 text-white sm:p-8 min-w-0">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between min-w-0">
            <div className="max-w-2xl min-w-0">
              <h2 className="text-lg font-bold text-white sm:text-xl break-words">
                Need On-Site Factory Verification in Asia Right Now?
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-gray-300 sm:text-sm break-words">
                While our digital field kits are being finalized, our team is
                actively auditing steel fabricators, precast suppliers, and MEP
                manufacturers in China, Vietnam, and Thailand.
              </p>
            </div>
            <Link
              href="/risk-screen"
              className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-xs font-bold text-brand-950 shadow hover:bg-gray-100 transition-colors w-full sm:w-auto"
            >
              <Shield className="h-4 w-4 text-brand-800" />
              <span>Request Free Risk Screen</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
