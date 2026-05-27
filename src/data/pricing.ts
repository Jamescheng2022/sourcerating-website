export interface PricingItem {
  service: string;
  price: string;
  description: string;
  deliverables: string[];
}

export const pricingItems: PricingItem[] = [
  {
    service: "Free First-Pass Supplier Risk Screen",
    price: "Free during launch",
    description: "A desk-based first look at one China engineering supplier before you decide whether a paid visit, audit, or inspection is worth it.",
    deliverables: ["Supplier website and business-signal screen", "Engineering fit and obvious red flags", "Recommended next verification step"],
  },
  {
    service: "Engineering Supplier Background Check",
    price: "From USD 300",
    description: "Desk-based verification for a construction material, steel, precast, MEP, or engineering component supplier.",
    deliverables: ["Business identity review", "Ownership and legal signal check", "Engineering fit risk summary"],
  },
  {
    service: "Factory Verification Visit",
    price: "From USD 600",
    description: "On-site visit before deposit, contract signature, supplier approval, or major engineering procurement decision.",
    deliverables: ["Workshop and equipment walkthrough", "QA/QC and document review", "Photo report with risk rating"],
  },
  {
    service: "Pre-Shipment Inspection",
    price: "From USD 450",
    description: "Final check before shipment release for fabricated components, project cargo, or construction material orders.",
    deliverables: ["Quantity, marking, and packaging check", "Drawing/spec spot checks", "Shipment release recommendation"],
  },
  {
    service: "Engineering Supplier Sourcing",
    price: "From USD 1,200",
    description: "Shortlist and screen manufacturers for a defined engineering material or project package.",
    deliverables: ["Qualified supplier shortlist", "Capability screening notes", "Recommended verification route"],
  },
  {
    service: "Production Monitoring",
    price: "Custom monthly scope",
    description: "Scheduled production visibility for project orders where delays, rework, and quality drift carry real cost.",
    deliverables: ["Progress updates", "Critical-stage checks", "Issue escalation and follow-up"],
  },
];

export const pricingFactors = [
  "Factory location and travel requirements",
  "Product complexity, drawings, and specification depth",
  "Number of suppliers, SKUs, molds, lines, or workshops",
  "Urgency, report depth, and follow-up requirements",
];
