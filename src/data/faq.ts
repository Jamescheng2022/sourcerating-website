export interface FAQItem { question: string; answer: string; }

export const faqItems: FAQItem[] = [
  {
    question: "What engineering materials do you focus on?",
    answer: "The strongest fit is project-related manufacturing: precast concrete, steel structures, construction materials, MEP and industrial components, engineering equipment, molds, embedded parts, facade materials, and similar technical supply packages.",
  },
  {
    question: "Can you verify whether a supplier can actually handle our drawings and specifications?",
    answer: "Yes. Supplier verification can include review of drawings/specifications, engineering communication, QA/QC documents, material certificates, production process, equipment, workload, and the supplier's ability to answer project-specific technical questions.",
  },
  {
    question: "What does a factory audit include?",
    answer: "A typical audit checks business identity, workshop layout, equipment, production flow, capacity, QA/QC process, material traceability, inspection records, packaging, export readiness, and project-fit risks. The scope is adapted to the material category and decision you need to make.",
  },
  {
    question: "Can you inspect precast concrete or steel structure suppliers?",
    answer: "Yes. These are core focus areas. For precast, checks may cover molds, reinforcement preparation, embedded parts, curing controls, production records, and QA/QC documentation. For steel structures, checks may cover cutting, welding, assembly, coating, traceability, packing, and fabrication capacity.",
  },
  {
    question: "Do you take commissions from suppliers?",
    answer: "No. The service is buyer-side. Fees are agreed with the overseas client, and recommendations are based on project risk and supplier evidence rather than supplier-side incentives.",
  },
  {
    question: "How quickly can you start?",
    answer: "For urgent checks, initial scoping can usually begin within 24 hours after receiving supplier details, material category, project location, order stage, and available documents. On-site scheduling depends on factory location and supplier availability.",
  },
  {
    question: "How do you charge?",
    answer: "Pricing starts from published guidance, then becomes a fixed quote after scope review. Final cost depends on factory location, product complexity, drawings/spec depth, number of suppliers or SKUs, report depth, urgency, and travel requirements.",
  },
  {
    question: "Can you help us find suppliers, not only verify existing ones?",
    answer: "Yes, but the focus is qualified sourcing rather than long supplier lists. The aim is to shortlist manufacturers that match drawings, specifications, order size, export requirements, and project constraints.",
  },
  {
    question: "Do you handle logistics and shipping?",
    answer: "The primary focus is supplier verification, production visibility, and quality risk before shipment. Loading checks and coordination with your freight forwarder can be included when relevant, but logistics brokerage is not the core service.",
  },
  {
    question: "What should I send for an initial quote?",
    answer: "Send the supplier name or link, material category, project country, current order stage, available drawings/specifications, target timeline, and your main concern. If documents are sensitive, send a summary first and we can define a safer review process.",
  },
];

export const faqSchemaData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};
