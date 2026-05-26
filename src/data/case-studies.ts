export interface CaseStudy {
  id: string;
  title: string;
  industry: string;
  service: string;
  clientRegion: string;
  challenge: string;
  solution: string;
  result: string;
  tags: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "precast-factory-verification",
    title: "Precast Concrete Supplier Verification for European Contractor",
    industry: "Precast Concrete",
    service: "Engineering Supplier Verification",
    clientRegion: "Europe",
    challenge: "A contractor was evaluating a Chinese precast supplier for project-specific components but needed confidence in mold capability, reinforcement handling, curing controls, embedded parts, and documentation discipline before committing engineering time.",
    solution: "We reviewed supplier documents, checked workshop layout and production flow, assessed mold and reinforcement preparation, reviewed QA/QC records, and summarized gaps against the buyer's project requirements.",
    result: "The buyer received a clear risk brief identifying documentation gaps and process questions to resolve before commercial commitment. The supplier was asked to provide corrected QA documents and additional project references before moving forward.",
    tags: ["Precast Concrete", "Europe", "Supplier Verification", "QA/QC"],
  },
  {
    id: "steel-structure-audit",
    title: "Steel Structure Fabricator Audit Before Deposit Payment",
    industry: "Steel Structures",
    service: "Factory Audit for Construction Materials",
    clientRegion: "United Kingdom",
    challenge: "A UK engineering buyer needed to verify whether a steel fabricator had the equipment, welding controls, coating process, and packaging discipline required for an export project.",
    solution: "We conducted an on-site walkthrough covering cutting, welding, assembly, surface treatment, coating, storage, packing, and material traceability. Findings were mapped to a proceed / correct / reject decision framework.",
    result: "The report highlighted coating and traceability weaknesses that needed correction before deposit release. The buyer used the findings to add quality hold points and document requirements to the purchase terms.",
    tags: ["Steel Fabrication", "UK", "Factory Audit", "Deposit Risk"],
  },
  {
    id: "construction-materials-sourcing",
    title: "Construction Materials Supplier Shortlist for Australian Importer",
    industry: "Construction Materials",
    service: "Engineering Sourcing Support",
    clientRegion: "Australia",
    challenge: "An importer needed alternative suppliers for aluminum profiles, fasteners, and facade-related materials but wanted to avoid trading companies with limited technical control.",
    solution: "We screened suppliers against product scope, export experience, production capability, document readiness, and willingness to support engineering-level communication.",
    result: "The client received a smaller but more qualified supplier shortlist, with recommended next-step verification for each candidate instead of a generic supplier directory.",
    tags: ["Construction Materials", "Australia", "Supplier Screening", "Facade Materials"],
  },
  {
    id: "mep-pre-shipment",
    title: "MEP Component Pre-Shipment Check for Project Cargo",
    industry: "MEP & Industrial Components",
    service: "Pre-Shipment Inspection",
    clientRegion: "Germany",
    challenge: "A project buyer needed a final check on packaged MEP components before shipment because incorrect markings, missing quantities, or packaging issues would delay site installation.",
    solution: "We checked packing lists, visible product condition, markings, packaging, quantity consistency, and selected specification points before the shipment was released.",
    result: "Several marking inconsistencies were corrected before loading, reducing the risk of receiving delays and site-side sorting problems.",
    tags: ["MEP", "Germany", "Pre-Shipment", "Project Cargo"],
  },
  {
    id: "production-monitoring-steel",
    title: "Production Monitoring for Steel Components During Fabrication",
    industry: "Steel Structures",
    service: "Production Monitoring",
    clientRegion: "North America",
    challenge: "A buyer needed visibility into fabrication progress because late discovery of welding, coating, or packing delays would affect downstream installation planning.",
    solution: "We performed periodic checks during production, tracked visible progress, flagged open issues, and requested supplier updates on critical hold points.",
    result: "The buyer had earlier visibility into production status and could manage project expectations before shipment scheduling.",
    tags: ["Steel Components", "North America", "Production Monitoring", "Schedule Risk"],
  },
];
