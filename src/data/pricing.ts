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
    description: "A desk-based first look at one engineering supplier before you decide whether a deeper paid review, visit, audit, or inspection is worth it.",
    deliverables: ["Supplier website and business-signal screen", "Engineering fit and obvious red flags", "Recommended next verification step"],
  },
  {
    service: "Engineering Supplier Background Check",
    price: "USD 300 launch",
    description: "Desk-based verification for a construction material, steel, precast, MEP, prefab, or engineering component supplier.",
    deliverables: ["Business identity review", "Ownership and legal signal check", "Engineering fit and document-risk summary"],
  },
  {
    service: "Factory Verification Visit",
    price: "From USD 600 + travel",
    description: "On-site visit before deposit, contract signature, supplier approval, or a major engineering procurement decision.",
    deliverables: ["Workshop and equipment walkthrough", "QA/QC and document review", "Photo report with risk rating and next-step recommendation"],
  },
  {
    service: "Technical Supplier Review",
    price: "From USD 500",
    description: "Engineering-focused review when the buyer already has one or more candidate suppliers and needs help comparing capability, drawings, specifications, and quotations.",
    deliverables: ["Supplier capability comparison", "Drawing/specification and quotation review", "Technical and commercial clarification list"],
  },
  {
    service: "Procurement Project Setup",
    price: "USD 800–1,500",
    description: "A defined project setup for buyers who want Source Rating to help structure the RFQ, shortlist suppliers, compare offers, and prepare the negotiation path.",
    deliverables: ["RFQ and requirement structuring", "Supplier shortlist and comparison framework", "Initial technical/commercial coordination"],
  },
  {
    service: "Buyer-Side Procurement Success Fee",
    price: "Typically 1–2% of PO value",
    description: "For an agreed procurement mandate that proceeds to an actual supplier award. The percentage, milestone, and scope are agreed in writing before supplier selection or commercial negotiation begins.",
    deliverables: ["Supplier selection and bid coordination", "Technical and commercial negotiation support", "Award, order handoff, and agreed follow-up support"],
  },
  {
    service: "Pre-Shipment Inspection",
    price: "From USD 450 + travel",
    description: "Final check before shipment release for fabricated components, project cargo, or construction material orders.",
    deliverables: ["Quantity, marking, and packaging check", "Drawing/spec spot checks", "Shipment release recommendation"],
  },
  {
    service: "Production Monitoring",
    price: "Custom project scope",
    description: "Scheduled production visibility for project orders where delays, rework, and quality drift carry real cost.",
    deliverables: ["Progress updates", "Critical-stage checks", "Issue escalation and follow-up"],
  },
];

export const pricingFactors = [
  "Factory location and travel requirements",
  "Product complexity, drawings, and specification depth",
  "Number of suppliers, SKUs, molds, lines, or workshops",
  "Purchase value and procurement-success scope",
  "Urgency, report depth, and follow-up requirements",
];
