export interface FAQItem { question: string; answer: string; }

export const faqItems: FAQItem[] = [
  { question: "What does a factory audit include and how long does it take?", answer: "A standard factory audit covers facility inspection, equipment assessment, quality management system evaluation, production capacity verification, certification checks, and workforce assessment. It typically takes 1-2 days on-site, with the full report delivered within 3 business days with detailed photographic evidence and actionable recommendations." },
  { question: "How do you verify a Chinese supplier is legitimate and not a trading company?", answer: "We conduct multi-layer verification: physical factory visits to confirm real production capabilities, business license authentication through government databases, cross-referencing of export records, ownership structure tracing, and discreet market reputation checks. We can distinguish genuine manufacturers from trading companies posing as factories." },
  { question: "Can you help with supplier negotiations and pricing?", answer: "Yes. Having local market knowledge allows us to help you negotiate fair pricing and favorable terms. We understand Chinese business culture and bridge communication gaps. Importantly, we never take commissions from suppliers — our loyalty is entirely to you, ensuring our negotiation advice is always in your best interest." },
  { question: "What industries do you specialize in?", answer: "Our core expertise is in industrial and engineering sectors: machinery and equipment, construction and building materials, metal fabrication and processing, automotive and transportation parts, electronics and electrical components, and renewable energy equipment. This technical focus means we understand manufacturing processes and quality standards at a deeper level than general agents." },
  { question: "How do you handle quality control during production?", answer: "We offer tiered QC programs from spot-check inspections to full-time production monitoring, based on your order complexity and risk level. This includes in-process quality checks at critical stages, adherence verification against agreed specifications, pre-shipment AQL sampling inspections, and loading supervision. Reports are delivered within 24 hours." },
  { question: "What makes you different from a standard sourcing agent?", answer: "Three key differences: First, we are independent — we never take commissions or kickbacks from suppliers. Second, we are technical — our background is in engineering and industrial supply chains, not general trading. Third, we are on the ground — physically present in China's industrial regions providing real oversight, not remote coordination." },
  { question: "How do you charge for your services?", answer: "We charge transparent, pre-agreed fees based on the scope of work — typically per-audit, per-project, or monthly retainer for ongoing services. We do not take any commissions from suppliers, ensuring our interests are fully aligned with yours. Contact us for a tailored proposal based on your specific needs." },
  { question: "Do you handle logistics and shipping?", answer: "Our primary focus is on the upstream side — finding, verifying, and managing suppliers and production quality. However, we can coordinate with your freight forwarder or recommend trusted logistics partners for shipping, customs clearance, and delivery. Our loading supervision service ensures your goods are properly packed and shipped." },
  { question: "Can you work with small businesses or only large companies?", answer: "We work with businesses of all sizes, from startups placing their first China order to multinational corporations with established supply chains. Our service packages are flexible and scalable. For smaller businesses, we often recommend starting with a focused supplier verification and initial production monitoring package." },
  { question: "How quickly can you start on a project?", answer: "For urgent needs, we can typically begin within 48-72 hours. For standard projects, we recommend 1-2 weeks lead time to properly prepare, align on requirements, and schedule visits. Contact us with your timeline and requirements for a realistic start date." },
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
