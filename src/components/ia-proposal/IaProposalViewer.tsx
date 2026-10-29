"use client";

import { useMobileIa } from "@/components/layout/MobileIaContext";
import {
  Layers,
  BookOpen,
  CheckCircle2,
  SlidersHorizontal,
  Smartphone,
  ArrowRight,
  Compass,
  Wrench,
} from "lucide-react";
import Link from "next/link";

export function IaProposalViewer() {
  const { iaMode, setIaMode } = useMobileIa();

  return (
    <div className="space-y-10">
      {/* Interactive Mode Selector Hero */}
      <div className="rounded-2xl border-2 border-brand-900 bg-white p-6 shadow-md sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-900">
              <SlidersHorizontal className="h-3.5 w-3.5 text-brand-700" />
              <span>Interactive Switcher</span>
            </div>
            <h2 className="mt-2 text-2xl font-black text-gray-950 sm:text-3xl">
              Currently Active:{" "}
              <span className="text-brand-800">
                {iaMode === "directory"
                  ? "Direction A (Trade Directory & Workstation)"
                  : "Direction B (Intelligence Journal & Decision Brief)"}
              </span>
            </h2>
            <p className="mt-2 text-xs text-gray-600 sm:text-sm max-w-2xl">
              Toggle between the two directions below. Your selection updates
              the live mobile navigation header, bottom action dock, and card
              density across this entire website in real time.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIaMode("directory")}
              className={`flex min-h-[48px] items-center gap-2 rounded-xl px-5 py-3 text-xs font-extrabold transition-all ${
                iaMode === "directory"
                  ? "bg-brand-950 text-white shadow-md ring-2 ring-brand-700 ring-offset-2"
                  : "border border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Layers className="h-4 w-4" />
              <span>Direction A: Directory</span>
            </button>
            <button
              type="button"
              onClick={() => setIaMode("editorial")}
              className={`flex min-h-[48px] items-center gap-2 rounded-xl px-5 py-3 text-xs font-extrabold transition-all ${
                iaMode === "editorial"
                  ? "bg-brand-950 text-white shadow-md ring-2 ring-brand-700 ring-offset-2"
                  : "border border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>Direction B: Editorial</span>
            </button>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Direction A Card */}
        <div
          className={`rounded-2xl border-2 p-6 transition-all ${
            iaMode === "directory"
              ? "border-brand-950 bg-white shadow-md ring-1 ring-brand-950/10"
              : "border-gray-200 bg-gray-50/70"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="rounded-md bg-brand-900 px-2.5 py-1 font-mono text-xs font-bold text-white">
              DIRECTION A
            </span>
            <span className="text-xs font-medium text-gray-500">
              Ref: ThomasNet / WOP
            </span>
          </div>

          <h3 className="mt-4 text-xl font-black text-gray-950">
            Trade Directory & Field Workstation
          </h3>
          <p className="mt-1 text-xs text-brand-800 font-semibold">
            Utility-First · Dense Triage · Persistent Thumb Dock
          </p>

          <p className="mt-3 text-xs leading-relaxed text-gray-600 sm:text-sm">
            Modeled on industrial procurement databases (e.g. ThomasNet, World of
            Procurement). Optimised for buyers and inspectors who need fast,
            uninterrupted access to tools, codes, and documents on the go.
          </p>

          <div className="mt-5 space-y-2.5 border-t border-gray-200/70 pt-4 text-xs">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-700 mt-0.5" />
              <span>
                <strong>Sticky Bottom Dock:</strong> 5 primary tools (Home,
                Resources, Intelligence, Field Kits, App) fixed at the base of
                the phone screen for one-thumb reachability.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-700 mt-0.5" />
              <span>
                <strong>Dense 2x3 Grid Menu:</strong> Mobile hamburger expands
                into a compact tile workstation with monospace IDs (RES, INT,
                KITS, APP) for rapid scanning.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-700 mt-0.5" />
              <span>
                <strong>Tabular Data Cards:</strong> High information density per
                vertical inch; instant copy actions; code badges.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-700 mt-0.5" />
              <span>
                <strong>Best For:</strong> Procurement engineers, inspectors,
                and buyers actively verifying suppliers in the field.
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={() => setIaMode("directory")}
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-brand-950 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-brand-800"
            >
              <span>Activate Direction A in Preview</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Direction B Card */}
        <div
          className={`rounded-2xl border-2 p-6 transition-all ${
            iaMode === "editorial"
              ? "border-brand-950 bg-white shadow-md ring-1 ring-brand-950/10"
              : "border-gray-200 bg-gray-50/70"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="rounded-md bg-brand-800 px-2.5 py-1 font-mono text-xs font-bold text-white">
              DIRECTION B
            </span>
            <span className="text-xs font-medium text-gray-500">
              Ref: Freightos / SupplyChainDive
            </span>
          </div>

          <h3 className="mt-4 text-xl font-black text-gray-950">
            Intelligence Journal & Decision Brief
          </h3>
          <p className="mt-1 text-xs text-brand-800 font-semibold">
            Editorial Narrative · Clean Canvas · Thematic Dossiers
          </p>

          <p className="mt-3 text-xs leading-relaxed text-gray-600 sm:text-sm">
            Modeled on analytical industry journals (e.g. SupplyChainDive, Freightos
            Research). Prioritises distraction-free reading, narrative context,
            and executive decision-making.
          </p>

          <div className="mt-5 space-y-2.5 border-t border-gray-200/70 pt-4 text-xs">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-700 mt-0.5" />
              <span>
                <strong>Uncluttered Reading Canvas:</strong> No bottom dock; 100%
                of vertical screen height dedicated to research articles and
                source cards.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-700 mt-0.5" />
              <span>
                <strong>Thematic Slide-Over Dossiers:</strong> Navigation
                categorized into editorial dossiers (Sourcing Research, Field
                Toolkits, Commercial Services).
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-700 mt-0.5" />
              <span>
                <strong>Narrative Context Cards:</strong> Generous whitespace,
                bold Chinese/English subtitles, and decision-tree callouts.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-700 mt-0.5" />
              <span>
                <strong>Best For:</strong> Sourcing directors, executives, and
                analysts assessing geopolitical, tariff, and supplier risk.
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={() => setIaMode("editorial")}
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-brand-950 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-brand-800"
            >
              <span>Activate Direction B in Preview</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Surface Tour Links */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs sm:p-8">
        <h3 className="text-lg font-bold text-gray-950">
          Test The 4 New Mobile Surfaces In The Active Direction:
        </h3>
        <p className="mt-1 text-xs text-gray-500">
          Switch directions using the pill or the buttons above, then tap through each surface to observe the interaction:
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/resources"
            className="group flex flex-col rounded-xl border border-gray-200 p-4 transition-all hover:border-brand-700 hover:shadow-xs"
          >
            <div className="flex items-center justify-between">
              <BookOpen className="h-5 w-5 text-brand-800" />
              <ArrowRight className="h-4 w-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <h4 className="mt-3 text-sm font-bold text-gray-900 group-hover:text-brand-900">
              1. Resource Library
            </h4>
            <p className="mt-1 text-xs text-gray-500 leading-relaxed">
              14 official bilingual sources with search, stage chips & CSV export.
            </p>
          </Link>

          <Link
            href="/intelligence"
            className="group flex flex-col rounded-xl border border-gray-200 p-4 transition-all hover:border-brand-700 hover:shadow-xs"
          >
            <div className="flex items-center justify-between">
              <Compass className="h-5 w-5 text-brand-800" />
              <ArrowRight className="h-4 w-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <h4 className="mt-3 text-sm font-bold text-gray-900 group-hover:text-brand-900">
              2. Intelligence Surface
            </h4>
            <p className="mt-1 text-xs text-gray-500 leading-relaxed">
              Original deep sourcing studies & planned dossiers (subscription concept).
            </p>
          </Link>

          <Link
            href="/field-kits/steel-mill-test-certificate-audit-kit"
            className="group flex flex-col rounded-xl border border-gray-200 p-4 transition-all hover:border-brand-700 hover:shadow-xs"
          >
            <div className="flex items-center justify-between">
              <Wrench className="h-5 w-5 text-brand-800" />
              <ArrowRight className="h-4 w-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <h4 className="mt-3 text-sm font-bold text-gray-900 group-hover:text-brand-900">
              3. Field Kit Detail Page
            </h4>
            <p className="mt-1 text-xs text-gray-500 leading-relaxed">
              Bilingual MTC workbook template with disabled Gumroad-shaped CTA.
            </p>
          </Link>

          <Link
            href="/app"
            className="group flex flex-col rounded-xl border border-gray-200 p-4 transition-all hover:border-brand-700 hover:shadow-xs"
          >
            <div className="flex items-center justify-between">
              <Smartphone className="h-5 w-5 text-brand-800" />
              <ArrowRight className="h-4 w-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <h4 className="mt-3 text-sm font-bold text-gray-900 group-hover:text-brand-900">
              4. Mobile App Waitlist
            </h4>
            <p className="mt-1 text-xs text-gray-500 leading-relaxed">
              Offline shopfloor verifier preview with local preview test capture.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
