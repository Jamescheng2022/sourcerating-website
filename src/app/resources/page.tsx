import Link from "next/link";
import { ArrowRight, Download, ExternalLink } from "lucide-react";
import { generatePageMetadata } from "@/lib/metadata";
import { officialResources, categories, sourceReviewDate } from "@/data/free-resources";

export const metadata = generatePageMetadata({
  title: "Free Procurement Resource Library",
  description: "Curated official supplier, CBAM steel, customs and international shipping resources. English source labels with practical Chinese procurement notes.",
  keywords: ["free procurement templates","engineering sourcing resource library","CBAM steel supplier guidance","import tariff lookup","China manufacturer verification"],
  path: "/resources",
});
const anchor = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g,"-");

export default function ResourcesPage() {
 return (
 <>
  <section className="bg-brand-950 pt-28 pb-16 text-white">
   <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <p className="text-xs font-bold uppercase tracking-widest text-brand-200">Free buyer library · 免费资源导航</p>
    <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl">The useful source is often free. Finding the right one takes work.</h1>
    <p className="mt-6 max-w-3xl text-base leading-8 text-gray-200">{officialResources.length} reviewed entry points, organised by real engineering procurement tasks. English source names, Chinese explanations and publisher links — without repackaged copyrighted files.</p>
    <div className="mt-8 flex flex-wrap gap-3">
     <a href="/downloads/sourcerating-resource-index-20261024.csv" download className="inline-flex items-center gap-2 bg-white px-5 py-3 text-sm font-semibold text-brand-950 hover:bg-gray-100"><Download className="h-4 w-4"/> Download free bilingual index (CSV)</a>
     <Link href="/playbook" className="inline-flex items-center gap-2 border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">Supplier playbook <ArrowRight className="h-4 w-4"/></Link>
    </div>
    <p className="mt-5 text-xs text-gray-300">Official source pages reviewed {sourceReviewDate}; check the latest version and terms before a real purchase decision.</p>
   </div>
  </section>
  <section className="bg-white py-16">
   <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="grid gap-4 md:grid-cols-3">
     <div className="border border-gray-200 bg-[#f4f7f5] p-6"><h2 className="font-bold text-lg">By decision</h2><p className="mt-2 text-sm leading-6 text-gray-600">Start with a procurement question rather than a pile of PDFs.</p></div>
     <div className="border border-gray-200 bg-[#f4f7f5] p-6"><h2 className="font-bold text-lg">Official source</h2><p className="mt-2 text-sm leading-6 text-gray-600">Files remain on original publisher sites, where versions and rights can be checked.</p></div>
     <div className="border border-gray-200 bg-[#f4f7f5] p-6"><h2 className="font-bold text-lg">Bilingual handoff</h2><p className="mt-2 text-sm leading-6 text-gray-600">Share the Chinese task description with the factory and verify the original English document.</p></div>
    </div>
    <nav className="mt-10 flex flex-wrap gap-3 text-sm" aria-label="Resource categories">
     {categories.map(c=><a key={c} href={"#"+anchor(c)} className="border border-gray-200 px-3 py-2 text-brand-800 hover:bg-brand-50">{c}</a>)}
    </nav>
    {categories.map(c=><section key={c} id={anchor(c)} className="scroll-mt-24 border-b border-gray-200 py-12 last:border-b-0">
     <h2 className="mb-6 text-2xl font-semibold text-gray-950">{c}</h2>
     <div className="grid gap-5 lg:grid-cols-2">
      {officialResources.filter(x=>x.category===c).map(x=><article key={x.id} className="flex flex-col border border-gray-200 p-6">
       <p className="font-mono text-xs text-gray-500">{x.id} · {x.stage}</p>
       <h3 className="mt-3 text-xl font-semibold text-gray-950">{x.title}</h3>
       <p className="mt-1 text-sm font-semibold text-brand-800" lang="zh">{x.chinese}</p>
       <p className="mt-4 text-sm leading-7 text-gray-700" lang="zh">{x.summary}</p>
       <div className="mt-auto border-t border-gray-100 pt-5">
        <p className="text-xs text-gray-500">Source: {x.publisher}</p>
        <p className="mt-1 text-xs text-gray-500">Rights: {x.rights}</p>
        <a href={x.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-950">Open original publisher <ExternalLink className="h-4 w-4"/></a>
       </div>
      </article>)}
     </div>
    </section>)}
    <div className="mt-12 max-w-4xl border-l-4 border-brand-700 bg-[#f4f7f5] p-6">
     <h2 className="font-bold text-lg">Rights and change notices</h2>
     <p className="mt-3 text-sm leading-7 text-gray-700">Free access is not permission to resell, translate or republish a third-party file. European Commission general reuse terms can have file-specific exceptions; ICC publications have copyright and trademark requirements, and parts of the Access2Markets database prohibit resale. This library links to original sources and is not sponsored by their publishers.</p>
     <p className="mt-3 text-sm leading-7 text-gray-700">Tariffs, regulations and document versions can change; verify current official requirements, destination rules and qualified advice for each transaction.</p>
     <Link href="/risk-screen" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">Need an order-specific supplier risk review? <ArrowRight className="h-4 w-4"/></Link>
    </div>
   </div>
  </section>
 </>
 );
}
