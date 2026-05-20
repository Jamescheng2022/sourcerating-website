import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 bg-brand-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.15),transparent_60%)]" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Ready to reduce your China sourcing risk?</h2>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">Whether you&apos;re evaluating a new supplier, concerned about quality, or need ongoing production oversight — let&apos;s talk about how I can help.</p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-brand-900 bg-white rounded-lg hover:bg-gray-100 transition-all shadow-lg"><Mail className="h-5 w-5" /> Request a Consultation <ArrowRight className="h-4 w-4" /></Link>
          <Link href="/case-studies" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-white bg-white/10 rounded-lg hover:bg-white/15 transition-all border border-white/10">View Case Studies</Link>
        </div>
        <p className="mt-6 text-sm text-gray-400">No obligation. Response within 24 hours.</p>
      </div>
    </section>
  );
}
