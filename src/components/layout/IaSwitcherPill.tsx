"use client";

import { useMobileIa } from "./MobileIaContext";
import { SlidersHorizontal, BookOpen, Layers } from "lucide-react";
import Link from "next/link";

export function IaSwitcherPill() {
  const { iaMode, setIaMode } = useMobileIa();

  return (
    <div className="fixed bottom-16 right-3 z-40 sm:right-4 lg:bottom-4">
      <div className="flex items-center gap-1 rounded-full border border-gray-300 bg-white/95 px-2 py-1 shadow-lg backdrop-blur-md">
        <span className="hidden items-center gap-1 pl-1 text-[11px] font-bold uppercase tracking-wider text-gray-500 sm:inline-flex">
          <SlidersHorizontal className="h-3 w-3 text-brand-700" />
          <span>IA:</span>
        </span>

        {/* Direction A Button */}
        <button
          type="button"
          onClick={() => setIaMode("directory")}
          className={`inline-flex min-h-[44px] items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
            iaMode === "directory"
              ? "bg-brand-950 text-white shadow-xs"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          title="Direction A: Trade Directory & Workstation (ThomasNet Style)"
          aria-pressed={iaMode === "directory"}
        >
          <Layers className="h-3.5 w-3.5" />
          <span>Dir A</span>
        </button>

        {/* Direction B Button */}
        <button
          type="button"
          onClick={() => setIaMode("editorial")}
          className={`inline-flex min-h-[44px] items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
            iaMode === "editorial"
              ? "bg-brand-950 text-white shadow-xs"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          title="Direction B: Intelligence Journal & Decision Brief (Freightos Style)"
          aria-pressed={iaMode === "editorial"}
        >
          <BookOpen className="h-3.5 w-3.5" />
          <span>Dir B</span>
        </button>

        {/* Link to Proposal doc */}
        <Link
          href="/ia-proposal"
          className="ml-0.5 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-xs font-bold text-gray-400 hover:text-brand-900"
          title="View Mobile IA Redesign Proposal"
        >
          ?
        </Link>
      </div>
    </div>
  );
}
