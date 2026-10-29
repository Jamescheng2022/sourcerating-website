import Link from "next/link";
import {
  Smartphone,
  WifiOff,
  Camera,
  Languages,
  Clock,
  ArrowRight,
  Shield,
  Layers,
} from "lucide-react";
import { generatePageMetadata } from "@/lib/metadata";
import { AppWaitlistForm } from "@/components/app/AppWaitlistForm";

export const metadata = generatePageMetadata({
  title: "SourceRating Mobile App · Early Access & In Development",
  description:
    "The on-site factory verification companion for engineering procurement buyers and inspectors across China and Southeast Asia. Offline MTC checking, photo evidence stamps, and bilingual dispute cards.",
  keywords: [
    "factory inspection mobile app",
    "mill test certificate scanner",
    "offline supplier audit tool",
    "bilingual manufacturing dispute cards",
    "procurement inspection app",
  ],
  path: "/app",
});

export default function AppPage() {
  return (
    <div className="min-h-screen bg-[#f7f8f6] pb-24 pt-24 sm:pt-28">
      {/* Hero Section */}
      <section className="border-b border-gray-200 bg-brand-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 border border-amber-400/30 px-3 py-1 text-xs font-bold text-amber-300">
              <Clock className="h-3.5 w-3.5" />
              <span>In Active Development · Early Access Preview</span>
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
              The Inspector&apos;s Field Companion for Asian Factory Audits.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-gray-200 sm:text-lg">
              Designed for procurement engineers standing on greasy factory
              floors with patchy cellular service in Hebei, Jiangsu, or Rayong.
              Verify heat numbers offline, watermark photographic evidence, and
              communicate non-conformances in fluent technical Chinese.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#waitlist"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-bold text-brand-950 shadow hover:bg-gray-100 transition-colors"
              >
                <span>View Early Access Status</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/resources"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-white/30 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
              >
                <span>Browse Free Library</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        {/* Development Status Disclaimer */}
        <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50/60 p-4 sm:p-5 text-xs text-amber-950">
          <div className="flex items-start gap-2.5">
            <Smartphone className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold uppercase tracking-wider text-amber-900">
                Application Status Notice:
              </strong>{" "}
              The SourceRating mobile application is currently under private
              alpha development and closed field testing. It is not currently
              downloadable from the iOS App Store or Google Play. Public download is not currently active and waitlist registration is paused. Real-time factory verification needs are serviced through our free resources and on-ground engineering teams below.
            </div>
          </div>
        </div>

        {/* Four Core Mobile Capabilities */}
        <div className="mb-12">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-xl font-extrabold text-gray-950 sm:text-3xl">
              Engineered For The Realities Of The Shopfloor
            </h2>
            <p className="mt-2 text-xs text-gray-600 sm:text-sm">
              Standard consumer apps fail in industrial plants. Here is what we
              are building specifically for engineering buyers:
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Capability 1 */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-900">
                <WifiOff className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-gray-950">
                100% Offline MTC Matching
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-gray-600">
                Enter chemical heat analysis and member stamps in metal-clad
                warehouses where signal drops out. Formulas calculate CEV / Pcm
                locally on device.
              </p>
              <div className="mt-3 font-mono text-[11px] text-brand-700 bg-brand-50/50 p-2 rounded">
                Status: Core logic tested
              </div>
            </div>

            {/* Capability 2 */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-900">
                <Camera className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-gray-950">
                Tamper-Proof Photo Logs
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-gray-600">
                Photos are embedded with unalterable GPS coordinates, NIST
                timestamp, mill lux level, and member heat ID to prevent supplier
                file reuse.
              </p>
              <div className="mt-3 font-mono text-[11px] text-brand-700 bg-brand-50/50 p-2 rounded">
                Status: Camera sandbox v1
              </div>
            </div>

            {/* Capability 3 */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-900">
                <Languages className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-gray-950">
                Bilingual Dispute Cards
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-gray-600">
                Show your phone screen to factory QC managers. Precise technical
                Chinese phrases for weld undercut, zinc peeling, and missing mill
                stamps.
              </p>
              <div className="mt-3 font-mono text-[11px] text-brand-700 bg-brand-50/50 p-2 rounded">
                Status: 60+ cards authored
              </div>
            </div>

            {/* Capability 4 */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-900">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-gray-950">
                Fast Gate 1/2/3 Scoring
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-gray-600">
                Walk through pre-deposit, in-process, and pre-shipment gates in 15
                minutes. Produces an immediate PDF summary report to justify hold
                decisions.
              </p>
              <div className="mt-3 font-mono text-[11px] text-brand-700 bg-brand-50/50 p-2 rounded">
                Status: Schema complete
              </div>
            </div>
          </div>
        </div>

        {/* Waitlist Section & Form */}
        <section
          id="waitlist"
          className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10"
        >
          <div className="text-center">
            <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-900">
              Closed Preview Cohort
            </span>
            <h2 className="mt-3 text-2xl font-bold text-gray-950 sm:text-3xl">
              Mobile App Early Access Status
            </h2>
            <p className="mt-2 text-xs text-gray-600 sm:text-sm">
              The mobile field verifier is currently undergoing closed engineering testing. Public intake is paused; no personal information or email addresses are collected.
            </p>
          </div>

          <div className="mt-8">
            <AppWaitlistForm />
          </div>
        </section>

        {/* Existing Service Fallback */}
        <div className="mt-12 rounded-xl bg-gray-50 border border-gray-200 p-6 text-center sm:p-8">
          <Shield className="mx-auto h-8 w-8 text-brand-800" />
          <h3 className="mt-3 text-base font-bold text-gray-950 sm:text-lg">
            Have a Shipment Ready For Inspection Today?
          </h3>
          <p className="mt-1 text-xs text-gray-600 max-w-xl mx-auto sm:text-sm">
            Don&apos;t wait for software. Our engineering inspection partners are on
            the ground across mainland China, Vietnam, and Thailand.
          </p>
          <div className="mt-4">
            <Link
              href="/risk-screen"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-brand-950 px-5 py-2.5 text-xs font-bold text-white shadow hover:bg-brand-800 transition-colors"
            >
              <span>Request Free Supplier Risk Screen</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
