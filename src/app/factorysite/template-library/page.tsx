import type { Metadata } from "next";
import Link from "next/link";
import { factorysiteTemplates } from "@/data/factorysite-templates";
import "../factorysite.css";

export const metadata: Metadata = {
  title: "FactorySite Industrial Template Library",
  description: "Ten executable manufacturing website design families.",
  robots: { index: false, follow: false },
};

export default function TemplateLibraryPage() {
  return (
    <div className="fs-overlay">
      <div className="fs-library">
        <div className="fs-wrap">
          <div className="fs-kicker" style={{ color: "#8be0ff" }}>FactorySite OS · Design system checkpoint</div>
          <h1>Ten industrial families. One maintainable foundation.</h1>
          <p className="fs-library-intro">Each route below is a runnable, responsive manufacturing-site skeleton—not a screenshot. They share content primitives while materially changing hierarchy, typography, density, palette, geometry and buyer flow.</p>
          <div className="fs-library-meta"><span>20 official sites benchmarked</span><span>22 open-source resources scored</span><span>10 executable families</span></div>
          <div className="fs-library-grid">
            {factorysiteTemplates.map((item, index) => (
              <Link className="fs-library-card" href={`/factorysite/templates/${item.slug}`} key={item.slug} style={{ "--cardAccent": item.accent } as React.CSSProperties}>
                <div>
                  <div className="fs-kicker">{String(index + 1).padStart(2, "0")} · {item.fit}</div>
                  <h2>{item.name}</h2>
                  <p>{item.deck}</p>
                </div>
                <footer><span>{item.benchmark}</span><span>Open skeleton →</span></footer>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Link href="/" className="fs-back">Exit library</Link>
    </div>
  );
}
