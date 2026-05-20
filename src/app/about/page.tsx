import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Factory, Globe, Award, ArrowRight, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Independent, on-the-ground China factory inspection and industrial sourcing partner. Engineering background, zero factory commissions, focused on reducing your sourcing risk.",
  keywords: ["China sourcing agent","China factory inspector","independent sourcing China","China supply chain partner"],
};

const principles = [
  { icon: Shield, title: "Independent & Objective", description: "I never take commissions or kickbacks from factories. My fees come from you, my loyalty is to you, and every recommendation is based on what's best for your business." },
  { icon: Factory, title: "Engineering-Grounded", description: "My background is in engineering and industrial supply chains, not general trading. I understand manufacturing processes, material specifications, and what actually happens on a factory floor." },
  { icon: Globe, title: "On the Ground, Not Remote", description: "I am based in China's industrial heartland and visit factories, production lines, and supplier facilities in person every week. You get real oversight from someone who is physically present." },
  { icon: Award, title: "Results-Driven", description: "My entire approach is focused on measurable outcomes: lower defect rates, verified supplier claims, on-time deliveries, and reduced sourcing risk." },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-b from-brand-950 to-brand-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-300">About</span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-white">Your partner on the ground in China</h1>
            <p className="mt-4 text-lg text-gray-300 leading-relaxed">I help overseas businesses verify, source, and manage industrial supply chains in China — with independence, technical expertise, and real physical presence.</p>
          </div>
        </div>
      </section>
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16"><h2 className="text-3xl font-bold text-gray-900 mb-4">What I stand for</h2><p className="text-lg text-gray-600 leading-relaxed">The China sourcing industry is full of intermediaries who add cost without adding value. I built this service around four principles that directly address what overseas clients actually need.</p></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {principles.map((p) => (
              <div key={p.title} className="flex gap-5 p-6 rounded-xl border border-gray-100 hover:border-brand-100 transition-colors">
                <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-brand-50 text-brand-700"><p.icon className="h-6 w-6" /></div>
                <div><h3 className="text-lg font-bold text-gray-900 mb-2">{p.title}</h3><p className="text-gray-600 leading-relaxed">{p.description}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div><div className="aspect-[3/4] rounded-2xl bg-gray-200 flex items-center justify-center"><span className="text-gray-400">[Profile photo placeholder]</span></div></div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Not a faceless agency — a dedicated professional</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>When you work with me, you get direct access to one person who knows your project, your suppliers, and your requirements inside and out. There is no handoff to junior staff, no call center, and no lost-in-translation moments.</p>
                <p>I bring years of experience in industrial supply chains and manufacturing. My background includes hands-on work with engineering firms, equipment manufacturers, and construction material suppliers — which means I can have substantive technical conversations with factory engineers and quickly identify issues that non-technical agents would miss.</p>
                <p>Most importantly, I&apos;m independent. I don&apos;t represent any factory, I don&apos;t take commissions from suppliers, and I don&apos;t push you toward partners that benefit me. My only goal is helping you build a more reliable, cost-effective, and lower-risk China supply chain.</p>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-brand-700 rounded-lg hover:bg-brand-800 transition-colors"><Mail className="h-4 w-4" /> Get in Touch <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/case-studies" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-brand-700 bg-brand-50 rounded-lg hover:bg-brand-100 transition-colors">View Case Studies</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
