"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqItems } from "@/data/faq";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export function HomeFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const displayedItems = faqItems.slice(0, 6);
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading label="FAQ" title="Common questions about China factory inspection and sourcing" description="Quick answers to the questions we hear most often from overseas clients." />
        <div className="mt-12 space-y-3">
          {displayedItems.map((item, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full flex items-center justify-between px-6 py-5 text-left">
                <span className="text-base font-medium text-gray-900 pr-4">{item.question}</span>
                <ChevronDown className={cn("h-5 w-5 text-gray-400 shrink-0 transition-transform duration-200", openIndex === index && "rotate-180")} />
              </button>
              {openIndex === index && <div className="px-6 pb-5"><p className="text-gray-600 leading-relaxed">{item.answer}</p></div>}
            </div>
          ))}
        </div>
        <div className="mt-8 text-center"><a href="/faq" className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors">View all frequently asked questions →</a></div>
      </div>
    </section>
  );
}
