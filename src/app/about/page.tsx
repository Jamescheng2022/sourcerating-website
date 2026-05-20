import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Award, Factory, Globe, Mail, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Independent China factory inspection and industrial sourcing partner focused on supplier verification, production risk, and on-site evidence.",
  keywords: ["China sourcing agent", "China factory inspector", "independent sourcing China", "China supply chain partner"],
};

const principles = [
  {
    icon: Shield,
    title: "Independent and objective",
    description: "No factory commissions, no supplier referral fees, and no incentive to push you toward the wrong partner.",
  },
  {
    icon: Factory,
    title: "Manufacturing-grounded",
    description: "The work focuses on production reality: equipment, process flow, quality controls, materials, capacity, and delivery risk.",
  },
  {
    icon: Globe,
    title: "On the ground in China",
    description: "Supplier claims are checked through local documents, direct communication, and factory-floor evidence wherever the scope requires it.",
  },
  {
    icon: Award,
    title: "Built for decisions",
    description: "Reports are designed to help you decide whether to proceed, renegotiate, request corrections, or walk away.",
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
              Independent factory verification for overseas buyers.
            </h1>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Source Rating helps overseas businesses verify suppliers, inspect production, and reduce sourcing risk in China with direct, practical, evidence-based support.
            </p>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What the service is built around</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              The goal is not to make sourcing feel easy. The goal is to make it more knowable, more controlled, and less dependent on supplier promises.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </section>
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="rounded-md border border-dashed border-gray-300 bg-white p-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">Asset placeholder</p>
              <h2 className="mt-3 text-2xl font-bold text-gray-950">Add a real profile or site photo here</h2>
              <p className="mt-3 text-gray-600 leading-relaxed">
                A real factory-floor photo, inspection report screenshot, or professional profile image will improve trust more than stock photography.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">A focused partner, not a faceless marketplace</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Overseas buyers often lose visibility once supplier communication starts. Source Rating is designed to close that gap with direct checks, local follow-up, and plain-English reporting.
                </p>
                <p>
                  The service is best suited for industrial buyers, importers, distributors, and operators who need to verify a supplier before payment, inspect a production run, or understand whether a sourcing opportunity is real.
                </p>
                <p>
                  Every engagement is scoped around the decision you need to make, not a generic package.
                </p>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-brand-700 rounded-md hover:bg-brand-800 transition-colors">
                  <Mail className="h-4 w-4" /> Request a Check <ArrowRight className="h-4 w-4" />
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
