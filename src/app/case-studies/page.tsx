import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Briefcase, MapPin } from "lucide-react";
import { caseStudies } from "@/data/case-studies";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Anonymized examples of China supplier verification, factory audits, pre-shipment inspections, and production monitoring for engineering and construction material buyers.",
  keywords: ["China engineering supplier verification case study", "steel structure audit China", "precast concrete supplier verification"],
};

export default function CaseStudiesPage() {
  return (
    <>
      <section className="pt-28 pb-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-sm font-semibold uppercase text-brand-700">Anonymized case studies</span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-gray-950">
              Engineering supplier risk, checked before it becomes project cost.
            </h1>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              These examples are anonymized and simplified to protect client and supplier confidentiality. The focus is on the type of problem, the verification method, and the decision value created.
            </p>
          </div>
        </div>
      </section>
      <section className="py-20 bg-[#fbfbf8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {caseStudies.map((study) => (
              <article key={study.id} className="bg-white rounded-md border border-gray-200 overflow-hidden hover:shadow-sm transition-all">
                <div className="p-7">
                  <div className="flex flex-wrap gap-3 mb-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-brand-50 text-brand-700 text-xs font-semibold">
                      <Briefcase className="h-3 w-3" />{study.service}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-semibold">
                      <MapPin className="h-3 w-3" />{study.clientRegion}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-950 mb-4">{study.title}</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-950 uppercase mb-2">Problem</h3>
                      <p className="text-gray-600 leading-relaxed text-sm">{study.challenge}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-950 uppercase mb-2">Verification method</h3>
                      <p className="text-gray-600 leading-relaxed text-sm">{study.solution}</p>
                    </div>
                    <div className="p-4 rounded-md bg-green-50 border border-green-100">
                      <h3 className="text-sm font-semibold text-green-900 uppercase mb-1">Decision value</h3>
                      <p className="text-green-800 leading-relaxed text-sm">{study.result}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 my-6">
                    {study.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 bg-gray-100 text-gray-500 text-xs rounded-md">{tag}</span>
                    ))}
                  </div>
                  <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800 transition-colors">
                    Discuss a similar supplier check <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
