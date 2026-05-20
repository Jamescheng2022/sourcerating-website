import Link from "next/link";
import { ArrowRight, Shield, Factory, Eye } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 pb-20 bg-gradient-to-b from-brand-950 via-brand-900 to-brand-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.08),transparent_50%)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-800/50 border border-brand-700/30 text-sm text-brand-200 mb-8">
            <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-brand-400" /></span>
            On-the-ground in China&apos;s industrial regions
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">China Factory Inspection<br /><span className="text-brand-400">&amp; Industrial Sourcing</span></h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl">Helping overseas clients verify factories, inspect production, coordinate suppliers, and reduce sourcing risks in China — with an independent, technical partner who is physically on the ground.</p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-white bg-brand-600 rounded-lg hover:bg-brand-500 transition-all shadow-lg shadow-brand-600/25">Get a Free Consultation <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/services" className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-gray-200 bg-white/10 rounded-lg hover:bg-white/15 transition-all border border-white/10">Explore Services</Link>
          </div>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[{ icon: Shield, title: "Independent & Objective", desc: "No factory commissions — we work only for you" },{ icon: Factory, title: "Industrial Specialists", desc: "Engineering & manufacturing expertise on the ground" },{ icon: Eye, title: "Full Transparency", desc: "Detailed reports, photos, and real-time updates" }].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-brand-800/50 border border-brand-700/30"><item.icon className="h-5 w-5 text-brand-400" /></div>
                <div><p className="text-sm font-semibold text-white">{item.title}</p><p className="text-sm text-gray-400 mt-0.5">{item.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
