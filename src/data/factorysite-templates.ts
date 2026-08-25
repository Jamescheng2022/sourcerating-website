export type FactorysiteTemplate = {
  slug: string;
  name: string;
  eyebrow: string;
  fit: string;
  headline: string;
  deck: string;
  accent: string;
  benchmark: string;
  capabilities: string[];
  facts: { value: string; label: string }[];
};

export const factorysiteTemplates: FactorysiteTemplate[] = [
  {
    slug: "global-corporate-clean",
    name: "Global Corporate Clean",
    eyebrow: "Multi-site manufacturing group",
    fit: "Listed groups · diversified manufacturers",
    headline: "Industrial capability, clearly connected worldwide.",
    deck: "A calm, investor-grade system that routes customers into businesses, locations and proof without becoming a corporate brochure.",
    accent: "#2457ff",
    benchmark: "Schaeffler · Siemens · Jabil",
    capabilities: ["Business divisions", "Global footprint", "Innovation", "Investor & ESG proof"],
    facts: [{ value: "18", label: "manufacturing sites" }, { value: "42", label: "markets served" }, { value: "98.6%", label: "on-time delivery" }],
  },
  {
    slug: "precision-engineering",
    name: "Precision Engineering",
    eyebrow: "Machining · casting · tooling",
    fit: "Automotive · EV · precision components",
    headline: "Microns matter. So does every handoff.",
    deck: "A dark, image-led system that sells process control, equipment depth and engineering response—not empty futurism.",
    accent: "#c8ff35",
    benchmark: "TRUMPF · KUKA · Rockwell",
    capabilities: ["Casting", "5-axis machining", "Tooling", "Metrology"],
    facts: [{ value: "±5 μm", label: "process capability" }, { value: "24/7", label: "controlled production" }, { value: "IATF", label: "quality pathway" }],
  },
  {
    slug: "industrial-product-catalog",
    name: "Industrial Product Catalog",
    eyebrow: "Equipment and spare parts",
    fit: "Pumps · machinery · industrial systems",
    headline: "Find the right system before the next shutdown.",
    deck: "A product-first catalog shell with model filters, comparison, downloads, service and quotation utilities close at hand.",
    accent: "#ff5c22",
    benchmark: "Atlas Copco · SKF · Komatsu",
    capabilities: ["Product finder", "Model comparison", "CAD & downloads", "Service network"],
    facts: [{ value: "320+", label: "configurations" }, { value: "48 h", label: "quote response" }, { value: "12", label: "service regions" }],
  },
  {
    slug: "electronics-advanced-technology",
    name: "Electronics / Advanced Tech",
    eyebrow: "Electronics · controls · EV",
    fit: "PCB · automation · data-center supply chain",
    headline: "From signal integrity to factory scale.",
    deck: "A high-density technical system for buyers who need platform, process, compliance and application evidence in one path.",
    accent: "#22d3ee",
    benchmark: "ABB · Schneider Electric · Yokogawa",
    capabilities: ["Platforms", "Process engineering", "Compliance", "Application labs"],
    facts: [{ value: "18", label: "process stages" }, { value: "6", label: "engineering labs" }, { value: "100%", label: "traceability" }],
  },
  {
    slug: "heavy-industry-materials",
    name: "Heavy Industry / Materials",
    eyebrow: "Steel · materials · industrial minerals",
    fit: "Steel · cement · chemicals · mining",
    headline: "Built for heat, load and long service life.",
    deck: "A robust editorial shell where material grades, production assets, logistics and safety carry more weight than decorative effects.",
    accent: "#d9512c",
    benchmark: "Sandvik · Caterpillar",
    capabilities: ["Material grades", "Production assets", "Testing", "Bulk logistics"],
    facts: [{ value: "1.2 Mt", label: "annual capacity" }, { value: "34", label: "material grades" }, { value: "0", label: "lost-time target" }],
  },
  {
    slug: "engineering-project",
    name: "Engineering Project",
    eyebrow: "Design · fabricate · install",
    fit: "PEB · steel structure · precast · EPC",
    headline: "One accountable path from load to handover.",
    deck: "A blueprint-informed system organized around delivery stages, engineering controls, project evidence and tender action.",
    accent: "#63a9ff",
    benchmark: "Danfoss lifecycle clarity · Komatsu support",
    capabilities: ["Concept engineering", "BIM coordination", "Fabrication", "Site installation"],
    facts: [{ value: "1,800 t", label: "monthly fabrication" }, { value: "12", label: "project controls" }, { value: "4", label: "delivery regions" }],
  },
  {
    slug: "japanese-minimal-trust",
    name: "Japanese Minimal Trust",
    eyebrow: "Quality before claims",
    fit: "Japanese-owned manufacturers · conservative B2B",
    headline: "Steady quality, made visible.",
    deck: "A restrained, quiet hierarchy that lets process discipline, people and documented continuity establish trust.",
    accent: "#d6262e",
    benchmark: "Mitsubishi Electric · Komatsu",
    capabilities: ["Monozukuri", "Quality assurance", "People & training", "Local continuity"],
    facts: [{ value: "30 yr", label: "process heritage" }, { value: "7", label: "quality gates" }, { value: "99.2%", label: "delivery performance" }],
  },
  {
    slug: "german-technical-documentation",
    name: "German Technical Documentation",
    eyebrow: "Specifications before superlatives",
    fit: "Engineered components · application engineering",
    headline: "Engineering data your team can act on.",
    deck: "A specification-led shell with product families, capability matrices, standards, downloads and direct engineering contact.",
    accent: "#e21d2f",
    benchmark: "TRUMPF · Festo · SKF",
    capabilities: ["Technical matrix", "Standards", "Application notes", "Document center"],
    facts: [{ value: "42", label: "controlled processes" }, { value: "85", label: "data sheets" }, { value: "2 h", label: "engineering triage" }],
  },
  {
    slug: "sustainability-global-group",
    name: "Sustainability / Global Group",
    eyebrow: "Performance with accountability",
    fit: "Global groups · new materials · energy transition",
    headline: "Manufacturing progress within measurable limits.",
    deck: "A warm global narrative anchored to operations, governance, emissions data, people and regional impact.",
    accent: "#2f7c57",
    benchmark: "Danfoss · Bosch · Tetra Pak",
    capabilities: ["Impact dashboard", "Responsible operations", "Circularity", "People & communities"],
    facts: [{ value: "-38%", label: "scope 1 & 2 intensity" }, { value: "71%", label: "renewable electricity" }, { value: "96%", label: "material recovery" }],
  },
  {
    slug: "sme-export-manufacturer",
    name: "SME Export Manufacturer",
    eyebrow: "OEM / ODM factory",
    fit: "Export SMEs · owner-led factories",
    headline: "Send the drawing. Get a manufacturable answer.",
    deck: "A conversion-focused export site that answers capability, MOQ, lead time, quality and quotation questions without looking cheap.",
    accent: "#d8a62e",
    benchmark: "Jabil task clarity · Atlas Copco contact utility",
    capabilities: ["OEM / ODM", "Fast DFM", "Sampling", "RFQ with files"],
    facts: [{ value: "24 h", label: "DFM response" }, { value: "50+", label: "export markets" }, { value: "NDA", label: "on request" }],
  },
];

export function getFactorysiteTemplate(slug: string) {
  return factorysiteTemplates.find((item) => item.slug === slug);
}
