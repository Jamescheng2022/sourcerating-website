import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ClipboardCheck, Factory, FileSearch, Globe, Headphones, Mail, SearchCheck, ShieldCheck, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Source Rating provides China supplier verification and factory audit support for engineering and construction material buyers, backed by 20+ years of international engineering project experience.",
};

const principles = [
  ["Buyer-side only", "No factory commission or supplier referral fee."],
  ["Engineering context", "Drawings, specifications, QA/QC, materials, fabrication, and delivery constraints."],
  ["China-grounded checks", "Local documents, supplier communication, and factory-floor evidence where required."],
];

const verificationWorkflow = [
  {
    icon: FileSearch,
    title: "Inquiry triage",
    text: "Reviews the supplier link, material category, order stage, destination market, and the decision you need to make.",
  },
  {
    icon: SearchCheck,
    title: "Desk evidence review",
    text: "Checks business signals, documents, certificates, project fit, traceability, and obvious supplier-risk gaps.",
  },
  {
    icon: Factory,
    title: "Factory verification",
    text: "When needed, scopes factory visits, production checks, photo evidence, supplier interviews, and inspection hold points.",
  },
  {
    icon: ClipboardCheck,
    title: "Risk report",
    text: "Turns findings into a concise risk rating, supplier questions, evidence gaps, and recommended next steps.",
  },
  {
    icon: Headphones,
    title: "Follow-up support",
    text: "Helps clarify supplier answers, define a paid verification scope, and decide whether to proceed, correct, or hold.",
  },
  {
    icon: Users,
    title: "Specialist network",
    text: "Adds local inspection, translation, travel coordination, or technical specialist support when the assignment requires it.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-white pt-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 pb-20 pt-12 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase text-brand-700">About Source Rating</p>
            <h1 className="mt-4 text-5xl font-bold text-gray-950 sm:text-6xl">
              Engineering experience applied to China supplier risk.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Source Rating helps overseas buyers verify Chinese suppliers for construction materials, equipment, fabricated systems, MEP packages, and project-related manufacturing.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/risk-screen" className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-950 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-800">
                <Mail className="h-4 w-4" />
                Start a free risk screen
              </Link>
              <Link href="/playbook" className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-800 hover:border-brand-300">
                Download playbook <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-md border border-gray-200 bg-gray-100">
            <Image src="/images/precast-inspection.png" alt="Precast concrete supplier inspection in China" width={1400} height={1050} className="h-full min-h-[420px] w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="border-y border-gray-200 bg-[#f7f8f5] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-md bg-white p-6 ring-1 ring-gray-200">
              <p className="text-5xl font-bold text-gray-950">20+</p>
              <p className="mt-3 font-semibold text-gray-900">years in international engineering projects</p>
            </div>
            <div className="rounded-md bg-white p-6 ring-1 ring-gray-200">
              <Factory className="h-7 w-7 text-brand-700" />
              <p className="mt-5 font-semibold text-gray-900">Factory-floor evidence over sales promises</p>
            </div>
            <div className="rounded-md bg-white p-6 ring-1 ring-gray-200">
              <Globe className="h-7 w-7 text-brand-700" />
              <p className="mt-5 font-semibold text-gray-900">Built for Europe, North America, UK, and Australia buyers</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[0.42fr_1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase text-brand-700">Principles</p>
            <h2 className="mt-3 text-4xl font-bold text-gray-950">Focused, practical, and buyer-side.</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {principles.map(([title, text]) => (
              <div key={title} className="rounded-md border border-gray-200 bg-white p-5">
                <ShieldCheck className="h-5 w-5 text-brand-700" />
                <h3 className="mt-4 font-bold text-gray-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 bg-[#f4f6f4] py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[0.36fr_1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase text-brand-700">Verification workflow</p>
            <h2 className="mt-3 text-4xl font-bold text-gray-950">
              A clear path from supplier link to decision.
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600">
              The public promise is simple: collect the right facts, separate evidence from sales claims, and show you what to do next before money or goods move.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {verificationWorkflow.map((role) => (
              <div key={role.title} className="border border-gray-200 bg-white p-5">
                <role.icon className="h-5 w-5 text-brand-700" />
                <h3 className="mt-4 font-bold text-gray-950">{role.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">{role.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
