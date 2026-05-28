import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Code2, Factory, Globe, Headphones, Mail, SearchCheck, ShieldCheck, Users } from "lucide-react";

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

const operatingRoles = [
  {
    icon: BriefcaseBusiness,
    title: "Product and positioning",
    text: "Keeps the offer focused on overseas engineering buyers, supplier risk, and practical decision support.",
  },
  {
    icon: SearchCheck,
    title: "Research and quality analysis",
    text: "Reviews supplier signals, documents, certificates, traceability, QA/QC records, and engineering-fit gaps.",
  },
  {
    icon: Factory,
    title: "Field verification",
    text: "Scopes factory visits, evidence capture, production checks, pre-shipment inspection, and local supplier communication.",
  },
  {
    icon: Headphones,
    title: "Client success",
    text: "Handles inquiry triage, response time, quotation follow-up, report handover, and post-report next actions.",
  },
  {
    icon: Code2,
    title: "Technology and SEO",
    text: "Maintains the site, inquiry form, analytics events, buyer resources, AI-readable content, and search landing pages.",
  },
  {
    icon: Users,
    title: "Operations network",
    text: "Builds a controlled network for translation, travel coordination, specialist inspectors, and document support as demand grows.",
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
              Source Rating helps overseas buyers verify Chinese suppliers for precast concrete, steel structures, construction materials, MEP components, and project-related manufacturing.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-950 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-800">
                <Mail className="h-4 w-4" />
                Start a supplier check
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
            <p className="text-sm font-semibold uppercase text-brand-700">Operating model</p>
            <h2 className="mt-3 text-4xl font-bold text-gray-950">
              Built like a small specialist verification team.
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600">
              The first version is intentionally lean, but the service model is designed around the roles a serious buyer expects: technical judgment, field evidence, operations, client follow-up, and digital acquisition.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {operatingRoles.map((role) => (
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
