import type { Metadata } from "next";
import { faqItems, faqSchemaData } from "@/data/faq";

export const metadata: Metadata = {
  title: "FAQ", description: "Frequently asked questions about China factory inspection, supplier verification, production monitoring, pricing, and how our sourcing services work.",
  keywords: ["China factory audit FAQ","supplier verification questions","China sourcing FAQ","factory inspection pricing"],
};

export default function FAQPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }} />
      <section className="pt-32 pb-20 bg-gradient-to-b from-brand-950 to-brand-900"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-3xl"><span className="text-sm font-semibold uppercase tracking-wider text-brand-300">FAQ</span><h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-white">Frequently asked questions</h1><p className="mt-4 text-lg text-gray-300 leading-relaxed">Answers to the most common questions from overseas clients about factory inspection, supplier verification, and China sourcing services.</p></div></div></section>
      <section className="py-24 bg-white"><div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"><div className="space-y-8">{faqItems.map((item, index) => (<div key={index} className="pb-8 border-b border-gray-100 last:border-0"><h2 className="text-xl font-bold text-gray-900 mb-3">{item.question}</h2><p className="text-gray-600 leading-relaxed">{item.answer}</p></div>))}</div></div></section>
    </>
  );
}
