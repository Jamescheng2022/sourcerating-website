"use client";

import { useState } from "react";
import { Lock, Sparkles, Check, HelpCircle } from "lucide-react";

interface GumroadPreviewCtaProps {
  kitTitle: string;
}

export function GumroadPreviewCta({ kitTitle }: GumroadPreviewCtaProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-white p-5 shadow-xs sm:p-6 max-w-full overflow-hidden">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between min-w-0">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
            <Lock className="h-3 w-3 text-gray-500" />
            <span>One-Time Download · Editorial Preview</span>
          </div>
          <h3 className="mt-2 text-lg font-bold text-gray-950 sm:text-xl break-words">
            Acquire the {kitTitle}
          </h3>
          <p className="mt-1 text-xs text-gray-500 sm:text-sm break-words">
            Lifetime access to spreadsheets, verification guides, and bilingual templates.
          </p>
        </div>

        {/* Pricing & Gumroad-Shaped CTA Button */}
        <div className="flex flex-col gap-2 shrink-0 sm:items-end">
          <div className="flex items-baseline gap-2">
            <span className="text-xs uppercase font-bold tracking-wider text-gray-400">
              Pricing:
            </span>
            <span className="text-xl font-extrabold text-gray-900">
              TBA · Concept Only
            </span>
          </div>

          {/* Gumroad-shaped button (Disabled state) */}
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="group relative inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-xl border-2 border-brand-950 bg-[#ff90e8] px-6 py-3 text-sm font-extrabold text-brand-950 shadow-[4px_4px_0px_0px_rgba(18,33,31,1)] cursor-not-allowed opacity-90 transition-all sm:w-auto"
          >
            <Sparkles className="h-4 w-4 text-brand-950" />
            <span>Get Field Kit (Preview · In Development)</span>
          </button>
        </div>
      </div>

      {/* Honest Disclosure Box */}
      <div className="mt-5 rounded-xl bg-gray-50 p-3.5 text-xs text-gray-600 border border-gray-200">
        <div className="flex items-start justify-between gap-2">
          <p className="leading-relaxed">
            <strong className="text-gray-900">Preview Notice:</strong> This
            practical engineering kit is currently undergoing field validation
            and editorial review. The checkout button above is disabled for this
            Preview. No payment is collected, no Gumroad checkout is wired, and
            no price commitment has been made.
          </p>
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="text-brand-800 hover:text-brand-950 font-bold shrink-0 min-h-[44px] inline-flex items-center gap-1"
            aria-expanded={showDetails}
          >
            <HelpCircle className="h-4 w-4" />
            <span className="hidden xs:inline">{showDetails ? "Hide" : "Details"}</span>
          </button>
        </div>

        {showDetails && (
          <div className="mt-3 border-t border-gray-200 pt-3 text-[11px] space-y-1.5 text-gray-500">
            <p>• Commercial release will occur via a verified distributor with full receipt and refund terms.</p>
            <p>• Files will include unencrypted Excel workbooks with transparent, un-obfuscated formulas.</p>
            <p>• All referenced legal frameworks and ASTM/EN standard gates are independently validated.</p>
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-4 text-[11px] text-gray-500">
        <span className="inline-flex items-center gap-1">
          <Check className="h-3.5 w-3.5 text-emerald-600" /> Instant digital files
        </span>
        <span className="inline-flex items-center gap-1">
          <Check className="h-3.5 w-3.5 text-emerald-600" /> Bilingual EN/ZH
        </span>
        <span className="inline-flex items-center gap-1">
          <Check className="h-3.5 w-3.5 text-emerald-600" /> Unlocked Excel formulas
        </span>
      </div>
    </div>
  );
}
