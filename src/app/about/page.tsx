import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Award, Factory, Globe, Mail, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Source Rating provides China supplier verification and factory audit support for engineering and construction material buyers, backed by 20+ years of international engineering project experience.",
  keywords: ["China engineering supplier verification", "construction materials sourcing China", "factory audit China engineering", "precast steel supplier verification"],
};

const principles = [
  {
    icon: Shield,
    title: "Buyer-side independence",
    description: "No factory commissions, no supplier referral fees, and no incentive to push you toward the wrong partner.",
  },
  {
    icon: Factory,
    title: "Engineering project mindset",
    description: "The work considers drawings, QA/QC, material traceability, fabrication capacity, packaging, and project delivery risk.",
  },
  {
    icon: Globe,
    title: "China-based verification",
    description: "Supplier claims are checked through local documents, direct communication, and factory-floor evidence wherever the scope requires it.",
  },
  {
    icon: Award,
    title: "Decision-ready reporting",
    description: "Reports are designed to help you approve, renegotiate, request corrections, inspect again, or walk away.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-28 pb-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-700">About</span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-gray-950">
              Engineering experience applied to China supplier verification.
            </h1>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Source Rating is built for overseas engineering buyers who need to verify Chinese suppliers for precast concrete, steel structures, construction materials, MEP components, and project-related manufacturing.
            </p>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start">
            <div className="rounded-md border border-gray-200 bg-[#fbfbf8] p-7">
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">Operating background</p>
              <p className="mt-4 text-5xl font-bold tracking-tight text-gray-950">20+</p>
              <p className="mt-2 text-lg font-semibold text-gray-900">years in international engineering</p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                The service is strongest where engineering context matters: drawings, specifications, materials, QA/QC documents, fabrication process, and project delivery constraints.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What the service is built around</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                The goal is not to make sourcing feel easy. The goal is to make supplier risk more visible, more controlled, and less dependent on supplier promises.
              </p>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
                {principles.map((p) => (
                  <div key={p.title} className="flex gap-5 p-6 rounded-md border border-gray-200 hover:border-brand-200 transition-colors">
                    <div className="shrink-0 flex items-center justify-center w-11 h-11 rounded-md bg-brand-50 text-brand-700">
                      <p.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{p.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{p.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="rounded-md border border-dashed border-gray-300 bg-white p-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">Photo placeholder</p>
              <h2 className="mt-3 text-2xl font-bold text-gray-950">Add real site and factory photos here</h2>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Best assets to provide: your site visit photo, factory workshop photo, QA/QC inspection photo, steel fabrication photo, precast plant photo, or a blurred report screenshot.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">A focused partner, not a faceless marketplace</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Overseas engineering buyers often lose visibility once supplier communication starts. Source Rating closes that gap with direct checks, local follow-up, and plain-English reporting.
                </p>
                <p>
                  The best-fit clients are contractors, importers, distributors, project procurement teams, and engineering firms that need to verify a supplier before payment, monitor an order, or source a project package in China.
                </p>
                <p>
                  Every engagement is scoped around the decision you need to make, not a generic inspection package.
                </p>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-brand-700 rounded-md hover:bg-brand-800 transition-colors">
                  <Mail className="h-4 w-4" /> Request a Supplier Check <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/case-studies" className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-brand-700 bg-brand-50 rounded-md hover:bg-brand-100 transition-colors">
                  View Case Studies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
