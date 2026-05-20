import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Briefcase } from "lucide-react";
import { caseStudies } from "@/data/case-studies";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Real examples of factory audits, supplier verification, production monitoring, and sourcing projects we've completed for clients from Europe, North America, and Australia.",
  keywords: ["China factory audit case study","supplier verification example","China sourcing success story","factory inspection results"],
};

export default function CaseStudiesPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-b from-brand-950 to-brand-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-300">Case Studies</span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-white">Real projects, real results</h1>
            <p className="mt-4 text-lg text-gray-300 leading-relaxed">Each engagement is unique, but the pattern is consistent: independent verification, on-the-ground presence, and a focus on reducing our clients&apos; sourcing risk.</p>
          </div>
        </div>
      </section>
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {caseStudies.map((study) => (
              <article key={study.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-all">
                <div className="p-8">
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-medium"><Briefcase className="h-3 w-3" />{study.service}</span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium"><MapPin className="h-3 w-3" />{study.clientRegion}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">{study.title}</h2>
                  <div className="mb-4"><h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">Challenge</h3><p className="text-gray-600 leading-relaxed text-sm">{study.challenge}</p></div>
                  <div className="mb-4"><h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">Our Approach</h3><p className="text-gray-600 leading-relaxed text-sm">{study.solution}</p></div>
                  <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-100"><h3 className="text-sm font-semibold text-green-800 uppercase tracking-wider mb-1">Result</h3><p className="text-green-700 leading-relaxed text-sm">{study.result}</p></div>
                  <div className="flex flex-wrap gap-2 mb-6">{study.tags.map((tag) => (<span key={tag} className="px-2.5 py-1 bg-gray-100 text-gray-500 text-xs rounded-md">{tag}</span>))}</div>
                  <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors">Discuss a similar project <ArrowRight className="h-4 w-4" /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
