export interface CaseStudy {
  id: string; title: string; industry: string; service: string;
  clientRegion: string; challenge: string; solution: string; result: string; tags: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "german-machinery-audit", title: "Pre-Contract Factory Audit for German Machinery Importer",
    industry: "Industrial Machinery", service: "Factory Audit & Verification", clientRegion: "Germany",
    challenge: "A German importer was about to sign a EUR 500K contract with a Chinese CNC machine manufacturer but had never visited the factory. They needed independent verification of the supplier's claimed capabilities and certifications.",
    solution: "We conducted a two-day comprehensive factory audit including facility inspection, equipment inventory verification, QC system assessment, and certification authentication. We identified discrepancies between claimed and actual ISO certifications.",
    result: "The audit revealed the supplier had overstated their quality certifications and outsourced key processes without disclosure. The client renegotiated terms with better protections. Estimated EUR 80K in potential losses avoided.",
    tags: ["Factory Audit","Machinery","Germany","Due Diligence"],
  },
  {
    id: "us-construction-sourcing", title: "Multi-Supplier Sourcing for US Construction Materials Distributor",
    industry: "Construction & Building Materials", service: "Supplier Sourcing & Screening", clientRegion: "United States",
    challenge: "A US building materials distributor wanted to diversify their supplier base in China for aluminum profiles, steel hardware, and glass products. They had no China presence and needed a trusted partner on the ground.",
    solution: "We researched and shortlisted 12 potential suppliers across 3 categories, conducted factory visits to 8, and presented detailed comparison reports with sample coordination and negotiation support.",
    result: "The client onboarded 4 new suppliers with verified capabilities. First-year procurement exceeded USD 1.2M with zero major quality issues. Material costs reduced by approximately 18%.",
    tags: ["Supplier Sourcing","Construction","USA","Multi-Supplier"],
  },
  {
    id: "australian-qc-monitoring", title: "Ongoing Production QC for Australian Electronics Brand",
    industry: "Electronics & Electrical", service: "Production Monitoring & QC", clientRegion: "Australia",
    challenge: "An Australian consumer electronics brand was experiencing inconsistent quality with defect rates reaching 12%. They needed regular on-site quality oversight but couldn't justify a full-time China-based employee.",
    solution: "We established a scheduled inspection program with weekly production visits, in-process quality checks at critical stages, pre-shipment AQL inspections, and root-cause analysis for recurring defects.",
    result: "Defect rate dropped from 12% to under 2% within three months. The client gained full visibility into their production process. On-time delivery improved from 70% to 95%.",
    tags: ["Production QC","Electronics","Australia","Quality Improvement"],
  },
  {
    id: "uk-investigation", title: "Background Investigation for UK Private Equity Acquisition",
    industry: "Metal Fabrication & Processing", service: "Company Background Investigation", clientRegion: "United Kingdom",
    challenge: "A UK private equity firm evaluating a Chinese metal fabrication company acquisition needed thorough due diligence beyond sell-side disclosures.",
    solution: "We conducted multi-layer investigation: business registration verification, litigation searches, financial health analysis, ownership tracing, export history verification, and discreet market reputation inquiries.",
    result: "Investigation uncovered undisclosed related-party transactions and pending environmental litigation. The PE firm adjusted valuation downward by 30% and restructured with earn-out provisions.",
    tags: ["Background Check","Metal Fabrication","UK","M&A"],
  },
  {
    id: "canadian-coordination", title: "Factory Visit Coordination for Canadian Engineering Firm",
    industry: "Industrial Machinery", service: "On-Site Coordination & Representation", clientRegion: "Canada",
    challenge: "A Canadian engineering firm needed to audit 5 potential equipment suppliers across 3 provinces in 8 days. They needed logistical coordination, technical interpretation, and local representation.",
    solution: "We planned the complete itinerary, arranged inter-city transportation, provided technical English-Chinese interpretation at all meetings, and prepared pre-visit briefing documents on each supplier.",
    result: "All 5 supplier visits completed on schedule. Client identified 2 qualified suppliers. Trip was reported as '3x more productive' than their previous uncoordinated China visit.",
    tags: ["Factory Visit","Machinery","Canada","Coordination"],
  },
  {
    id: "french-supply-chain", title: "Supply Chain Restructuring for French Industrial Parts Distributor",
    industry: "Metal Fabrication & Processing", service: "Supply Chain Advisory", clientRegion: "France",
    challenge: "A French industrial parts distributor faced margin pressure from buying through a trading company that lacked transparency on factory pricing and quality control.",
    solution: "We analyzed their product portfolio, identified the actual factories, conducted audits at 6 direct manufacturers, and designed a new direct-sourcing model with defined quality standards and logistics.",
    result: "The client transitioned to direct factory relationships, achieving 22% cost reduction while improving quality consistency. They now have full transparency into their supply chain.",
    tags: ["Supply Chain","Metal Parts","France","Direct Sourcing"],
  },
];
