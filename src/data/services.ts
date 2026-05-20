import {
  ClipboardCheck, Globe, PackageCheck, Scale, Search, Users,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  features: string[];
  keywords: string[];
}

export const services: Service[] = [
  {
    id: "factory-audit",
    title: "Factory Audit & Verification",
    description: "On-site audits to verify factory identity, capabilities, equipment, certifications, production capacity, and quality systems before you commit.",
    longDescription: "Before placing an order, you need to know if the factory is real, capable, and reliable. Our on-site audits cover facility inspection, equipment assessment, workforce review, quality control systems, certification verification, and production capacity analysis. Each audit is designed to support a clear commercial decision.",
    icon: ClipboardCheck,
    features: ["Facility walkthrough and equipment inspection", "Quality management system evaluation", "Production capacity verification", "Certification and license checks", "Workforce and process review", "Audit report with photos and risk notes"],
    keywords: ["factory audit China", "supplier verification", "factory inspection", "quality audit"],
  },
  {
    id: "supplier-sourcing",
    title: "Supplier Sourcing & Screening",
    description: "Find and qualify Chinese manufacturers that match your product requirements, quality expectations, order size, and risk tolerance.",
    longDescription: "Finding the right supplier is about more than matching a product category. We identify manufacturers that fit your technical requirements, quality standards, and business scale, then screen candidates before they reach your shortlist.",
    icon: Search,
    features: ["Supplier research based on your specifications", "Preliminary qualification screening", "Factory visit and initial assessment", "Sample coordination and review", "Comparative supplier analysis", "Negotiation support"],
    keywords: ["China supplier sourcing", "find manufacturer China", "supplier screening", "factory matching"],
  },
  {
    id: "production-monitoring",
    title: "Production Monitoring & QC",
    description: "On-site production follow-up, in-process quality checks, pre-shipment inspections, and progress reporting throughout your order.",
    longDescription: "Being far from production should not mean losing visibility. We provide scheduled on-site monitoring from raw materials to final packaging, with progress notes, photos, and quality findings so you know where the order stands.",
    icon: PackageCheck,
    features: ["In-process quality inspections", "Production progress tracking", "Pre-shipment final inspection", "Defect analysis and corrective actions", "Packaging and labeling verification", "Loading supervision"],
    keywords: ["production monitoring China", "quality control inspection", "pre-shipment inspection", "production tracking"],
  },
  {
    id: "background-check",
    title: "Company Background Investigation",
    description: "Company background checks covering legal registration, ownership, litigation indicators, trade history, and reputation risk.",
    longDescription: "Before entering a significant business relationship, you need to know who you are dealing with. Background investigations verify legal registration, ownership structure, litigation signals, trade records, and other practical risk indicators.",
    icon: Scale,
    features: ["Business license and registration verification", "Litigation and legal history check", "Ownership and related-party review", "Trade and export history review", "Reputation and reference checks", "Practical red-flag summary"],
    keywords: ["China company background check", "supplier due diligence", "Chinese company verification", "business credit check China"],
  },
  {
    id: "on-site-coordination",
    title: "On-Site Coordination & Representation",
    description: "Professional on-site representation for factory visits, technical meetings, negotiations, inspections, and supplier communication.",
    longDescription: "When you cannot be in China yourself, we act as your eyes and ears on the ground. From factory visit planning to meeting support and issue follow-up, the work is focused on clear communication and protecting your position.",
    icon: Users,
    features: ["Client visit coordination", "Meeting representation and facilitation", "Technical discussion support", "Specification review support", "Supplier relationship follow-up", "Issue escalation and resolution"],
    keywords: ["China factory visit coordination", "on-site representation China", "supplier meeting translation", "factory liaison service"],
  },
  {
    id: "supply-chain-advisory",
    title: "Supply Chain Advisory",
    description: "Practical advice on sourcing strategy, supplier risk, payment terms, quality standards, logistics coordination, and operational controls.",
    longDescription: "Sourcing from China involves more than finding a factory. We help you define supplier strategy, risk controls, quality expectations, payment protections, and logistics considerations for a more resilient sourcing operation.",
    icon: Globe,
    features: ["Supply chain risk assessment", "Sourcing strategy development", "Contract and payment term advisory", "Logistics and shipping coordination", "Quality standard definition", "Compliance and regulatory guidance"],
    keywords: ["China supply chain advisory", "sourcing strategy China", "supply chain risk management", "China logistics consulting"],
  },
];
