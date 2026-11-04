import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Download, Search } from "lucide-react";
import { factorysiteTemplates, getFactorysiteTemplate } from "@/data/factorysite-templates";
import "../../factorysite.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return factorysiteTemplates.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const template = getFactorysiteTemplate(slug);
  return { title: template ? `${template.name} · FactorySite` : "FactorySite", robots: { index: false, follow: false } };
}

const cardCopy = [
  "Clear buyer entry point with evidence and technical depth.",
  "Structured for comparison, qualification and engineering review.",
  "Local support and inquiry paths remain visible throughout.",
  "Reusable content model, company-specific design fingerprint.",
];

export default async function TemplateSkeletonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getFactorysiteTemplate(slug);
  if (!item) notFound();

  return (
    <div className={`fs-overlay fs-${item.slug}`} style={{ "--accent": item.accent } as React.CSSProperties}>
      <header className="fs-wrap fs-topbar">
        <div className="fs-brand"><span className="fs-brandmark">NX</span><span>NEXUS INDUSTRIES</span></div>
        <nav className="fs-nav"><a href="#capabilities">Capabilities</a><a href="#proof">Quality</a><a href="#documents">Downloads</a><a href="#contact" className="fs-cta">Request a quote</a></nav>
      </header>
      <section className="fs-hero">
        <div className="fs-hero-copy">
          <div className="fs-kicker">{item.eyebrow}</div>
          <h1>{item.headline}</h1>
          <p>{item.deck}</p>
          <div className="fs-actions"><a className="fs-cta" href="#capabilities">Explore capabilities <ArrowRight size={15}/></a><a className="fs-textlink" href="#documents">Technical documents</a></div>
        </div>
        <div className="fs-hero-visual" role="img" aria-label="Generic precision manufacturing reference image" />
      </section>
      <section className="fs-facts fs-wrap">
        {item.facts.map((fact) => <div className="fs-fact" key={fact.label}><b>{fact.value}</b><span>{fact.label}</span></div>)}
      </section>
      <section className="fs-section" id="capabilities">
        <div className="fs-section-head"><div><div className="fs-kicker">Capability system</div><h2>Built around buyer questions.</h2></div><p>Every family uses a common manufacturing content model, but the presentation and conversion path are selected for the company’s industry, scale, buyer and available proof.</p></div>
        <div className="fs-grid">{item.capabilities.map((capability, index) => <article className="fs-card" key={capability}><span className="fs-card-num">0{index + 1}</span><div><h3>{capability}</h3><p>{cardCopy[index]}</p></div></article>)}</div>
      </section>
      <section className="fs-proof" id="proof"><div className="fs-section"><div className="fs-section-head"><div><div className="fs-kicker">Controlled delivery</div><h2>Proof follows the part.</h2></div><p>Process controls, inspection records, certificates, traceability and response ownership are mapped to the questions an engineering buyer asks before nomination.</p></div><div className="fs-process">{["Review", "Engineer", "Manufacture", "Verify"].map((label,index)=><div className="fs-step" key={label}><b>0{index+1}</b><h3>{label}</h3><p>{["Drawing, material and application review.","DFM, control plan and launch readiness.","Controlled production with accountable gates.","Inspection pack, traceability and release."][index]}</p></div>)}</div></div></section>
      <section className="fs-section" id="documents"><div className="fs-section-head"><div><div className="fs-kicker">Buyer utilities</div><h2>Data before the meeting.</h2></div><p>Downloads and RFQ are treated as primary product experiences, not footer links.</p></div><div className="fs-docs"><div className="fs-doclist">{["Capability overview · PDF","Quality system overview · PDF","Equipment matrix · XLSX","Supplier requirements · PDF"].map(doc=><div className="fs-doc" key={doc}><span>{doc}</span><span><Download size={15}/></span></div>)}</div><aside className="fs-panel" id="contact"><Search size={22}/><h3>Start with a drawing.</h3><p>Tell the engineering team the material, annual volume and target schedule. Attachments and NDA requests are supported.</p><a className="fs-cta" href="mailto:engineering@example.com">Open RFQ</a></aside></div></section>
      <footer className="fs-footer"><div className="fs-wrap"><div className="fs-brand"><span className="fs-brandmark">NX</span><span>NEXUS INDUSTRIES</span></div><p>Executable design-family skeleton · {item.name}. Generic content is intentionally used here; client versions bind only verified company facts.</p></div></footer>
      <Link href="/factorysite/template-library" className="fs-back">← Template library</Link>
    </div>
  );
}
