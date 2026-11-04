"use client";

import Link from "next/link";
import { Clock, ShieldCheck, ArrowRight, Construction } from "lucide-react";

export function AppWaitlistForm() {
  return (
    <div className="rounded-2xl border border-amber-200/80 bg-amber-50/50 p-6 sm:p-8 text-center max-w-xl mx-auto break-words min-w-0">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-800">
        <Clock className="h-6 w-6" />
      </div>

      <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900 border border-amber-300/60">
        <Construction className="h-3.5 w-3.5 text-amber-800" />
        <span>Registration In Preparation</span>
      </div>

      <h3 className="mt-3 text-lg font-bold text-gray-950 sm:text-xl">
        Public Waitlist Intake Paused
      </h3>

      <p className="mt-2 text-xs leading-relaxed text-gray-700 sm:text-sm">
        Public early-access registration is currently in preparation while the mobile inspection companion is undergoing closed alpha field testing. Public signups and cloud data storage are not active in this release.
      </p>

      <div className="mt-5 rounded-xl bg-white p-4 border border-amber-200/70 text-left text-xs space-y-1.5 text-gray-600 shadow-xs">
        <div className="flex items-center gap-1.5 font-bold text-gray-900 text-xs uppercase tracking-wider">
          <ShieldCheck className="h-4 w-4 text-brand-700" />
          <span>Status & Privacy Notice</span>
        </div>
        <p>• No personal information or email addresses are collected on this page.</p>
        <p>• Persistent storage remains an Owner gate before public onboarding opens.</p>
        <p>• Field testing is currently restricted to active inspection partners.</p>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="/resources"
          className="inline-flex min-h-[44px] w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-brand-950 px-5 py-2.5 text-xs font-bold text-white shadow hover:bg-brand-800 transition-colors"
        >
          <span>Browse Free Field Guides</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/risk-screen"
          className="inline-flex min-h-[44px] w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <span>Request Supplier Risk Screen</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
