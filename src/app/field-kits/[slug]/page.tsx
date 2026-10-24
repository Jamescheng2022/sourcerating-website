import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  FolderArchive,
  Wrench,
  ShieldCheck,
} from "lucide-react";
import { generatePageMetadata } from "@/lib/metadata";
import { fieldKits } from "@/data/field-kits";
import { GumroadPreviewCta } from "@/components/field-kits/GumroadPreviewCta";

interface FieldKitPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: FieldKitPageProps): Promise<Metadata> {
  const { slug } = await params;
  const kit = fieldKits.find((k) => k.slug === slug);
  if (!kit) return { title: "Field Kit Not Found" };

  return generatePageMetadata({
    title: `${kit.title} | SourceRating Field Kit`,
    description: kit.subtitle,
    keywords: [
      kit.title,
      kit.chinese,
      "engineering procurement toolkit",
      "supplier verification checklist",
      "China manufacturing inspection",
    ],
    path: `/field-kits/${kit.slug}`,
  });
}

export function generateStaticParams() {
  return fieldKits.map((kit) => ({ slug: kit.slug }));
}

export default async function FieldKitDetailPage({ params }: FieldKitPageProps) {
  const { slug } = await params;
  const kit = fieldKits.find((k) => k.slug === slug);

  if (!kit) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f7f8f6] pb-24 pt-24 sm:pt-28">
      {/* Top Breadcrumb & Navigation */}
      <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/field-kits"
          className="inline-flex min-h-[44px] items-center gap-2 text-xs font-bold text-brand-800 hover:text-brand-950"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Field Kits</span>
        </Link>
      </div>

      {/* Main Kit Header & Hero */}
      <section className="border-y border-gray-200 bg-white py-8 sm:py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-brand-900 px-2.5 py-1 font-mono text-xs font-bold text-white">
              {kit.stage}
            </span>
            <span className="rounded-md bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-800 border border-brand-200">
              {kit.category}
            </span>
            <span className="rounded-full bg-amber-50 px-3 py-0.5 text-xs font-bold text-amber-800 border border-amber-200">
              {kit.status} · Concept
            </span>
          </div>

          <h1 className="mt-4 text-2xl font-extrabold text-gray-950 sm:text-4xl break-words">
            {kit.title}
          </h1>
          <p className="mt-1 text-base font-semibold text-brand-800 break-words sm:text-lg" lang="zh">
            {kit.chinese}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-base">
            {kit.subtitle}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-gray-500 border-t border-gray-100 pt-4">
            <span>
              Target Audience: <strong className="text-gray-800">{kit.targetUser}</strong>
            </span>
            <span>•</span>
            <span>Files Included: <strong className="text-gray-800">{kit.items.length} Production Templates</strong></span>
          </div>
        </div>
      </section>

      {/* Content Columns */}
      <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6 lg:px-8 space-y-8">
        {/* Core Value Props & Highlights */}
        <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs sm:p-7">
          <h2 className="text-base font-bold text-gray-950 sm:text-lg">
            Toolkit Highlights & Verification Gates
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {kit.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-700 sm:text-sm">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Included Files Breakdown */}
        <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs sm:p-7">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <FolderArchive className="h-5 w-5 text-brand-800" />
              <h2 className="text-base font-bold text-gray-950 sm:text-lg">
                What&apos;s Included In This Kit
              </h2>
            </div>
            <span className="text-xs text-gray-400 font-mono">
              {kit.items.length} Files
            </span>
          </div>

          <div className="mt-4 divide-y divide-gray-100">
            {kit.items.map((item, idx) => (
              <div key={idx} className="py-4 first:pt-1 last:pb-1">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-gray-100 px-2 py-0.5 font-mono text-[11px] font-bold text-gray-800 border border-gray-200">
                        {item.format}
                      </span>
                      <h3 className="text-sm font-bold text-gray-900 sm:text-base">
                        {item.name}
                      </h3>
                    </div>
                    <p className="mt-0.5 text-xs font-semibold text-brand-800" lang="zh">
                      {item.nameZh}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-gray-600 sm:text-sm">
                      {item.description}
                    </p>
                  </div>
                  <span className="shrink-0 text-[11px] font-mono text-gray-400 pt-1 sm:pt-0">
                    Est: {item.fileSizeEstimate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Practical Factory Scenario & Field Problem Solved */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs sm:p-6">
            <div className="flex items-center gap-2 text-brand-900 font-bold text-sm">
              <Wrench className="h-4 w-4 text-brand-700" />
              <span>When To Deploy On Site</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-gray-700 sm:text-sm">
              {kit.practicalContext}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs sm:p-6">
            <div className="flex items-center gap-2 text-brand-900 font-bold text-sm">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <span>Common Supplier Failure Avoided</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-gray-700 sm:text-sm">
              {kit.problemSolved}
            </p>
          </div>
        </section>

        {/* Sample Inspection Excerpt Table */}
        <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs sm:p-7 overflow-hidden">
          <h2 className="text-base font-bold text-gray-950 sm:text-lg">
            {kit.sampleExcerpt.heading}
          </h2>
          <p className="mt-1 text-xs text-gray-500">
            A preview excerpt from the bilingual verification matrix:
          </p>

          <div className="no-scrollbar mt-4 -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[500px] border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-gray-700 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-2.5 px-3">Inspection Checkpoint</th>
                  <th className="py-2.5 px-3">Verification Rule</th>
                  <th className="py-2.5 px-3">Rejection Signal (HOLD/REJECT)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {kit.sampleExcerpt.rows.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50/50">
                    <td className="py-3 px-3 font-semibold text-gray-900 align-top">
                      {row.field}
                    </td>
                    <td className="py-3 px-3 text-gray-600 align-top leading-relaxed">
                      {row.checkRule}
                    </td>
                    <td className="py-3 px-3 text-red-900 bg-red-50/40 font-medium align-top leading-relaxed">
                      {row.rejectionSignal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Gumroad-Shaped CTA (Disabled Preview State) */}
        <GumroadPreviewCta kitTitle={kit.title} />

        {/* Cross-Link to Resources and Playbook */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl bg-brand-50/60 border border-brand-100 p-5">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-brand-800 shrink-0" />
            <div className="text-xs text-brand-950">
              <span className="font-bold">Looking for free official source guides?</span>
              <p className="text-gray-600">Access official EU, USITC and ICC compliance resources without delay.</p>
            </div>
          </div>
          <Link
            href="/resources"
            className="inline-flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-lg bg-brand-950 px-4 py-2 text-xs font-bold text-white hover:bg-brand-800 transition-colors"
          >
            <span>Open Free Library</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
