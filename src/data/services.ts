import {
  ClipboardCheck, Factory, Search, Users, PackageCheck, Globe, Scale,
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
    description: "Comprehensive on-site factory audits to verify capabilities, certifications, production capacity, and quality management systems before you commit.",
    longDescription: "Before placing an order, you need to know if the factory is real, capable, and reliable. Our thorough on-site audits cover facility inspection, equipment assessment, workforce evaluation, quality control systems, certifications verification, and production capacity analysis. Each audit includes a detailed report with photographic evidence, compliance scores, and actionable recommendations.",
    icon: ClipboardCheck,
    features: ["Facility walkthrough & equipment inspection","Quality management system evaluation","Production capacity verification","Certification & license checks","Workforce & labor conditions review","Detailed audit report with photos"],
    keywords: ["factory audit China","supplier verification","factory inspection","quality audit"],
  },
  {
    id: "supplier-sourcing",
    title: "Supplier Sourcing & Screening",
    description: "Find and qualify the right Chinese manufacturers for your specific product requirements — from initial research to shortlist with verified credentials.",
    longDescription: "Finding the right supplier in China is about more than just matching product categories. We leverage our local network and industry knowledge to identify manufacturers that match your technical requirements, quality standards, and business scale. Every candidate goes through preliminary screening before being presented to you.",
    icon: Search,
    features: ["Custom supplier research based on your specs","Preliminary qualification screening","Factory visit & initial assessment","Sample coordination & review","Comparative supplier analysis","Negotiation support"],
    keywords: ["China supplier sourcing","find manufacturer China","supplier screening","factory matching"],
  },
  {
    id: "production-monitoring",
    title: "Production Monitoring & QC",
    description: "On-site production follow-up, in-process quality checks, pre-shipment inspections, and real-time progress reporting throughout your order.",
    longDescription: "Being thousands of miles away from production shouldn't mean losing visibility. We provide regular on-site monitoring throughout your production cycle — from raw material inspection to final packaging. You receive detailed progress reports, photos, and quality data so you always know exactly where your order stands.",
    icon: PackageCheck,
    features: ["In-process quality inspections","Production progress tracking","Pre-shipment final inspection (AQL)","Defect analysis & corrective actions","Packaging & labeling verification","Loading supervision"],
    keywords: ["production monitoring China","quality control inspection","pre-shipment inspection","production tracking"],
  },
  {
    id: "background-check",
    title: "Company Background Investigation",
    description: "Deep-dive company background checks including legal records, financial health, trade history, ownership structure, and reputation analysis.",
    longDescription: "Before entering a significant business relationship, you need to know who you're dealing with. Our background investigations go beyond surface-level checks to verify legal registration, financial standing, litigation history, ownership structure, trade records, and market reputation.",
    icon: Scale,
    features: ["Business license & registration verification","Litigation & legal history check","Financial health assessment","Ownership & related-party analysis","Trade & export history review","Reputation & reference checks"],
    keywords: ["China company background check","supplier due diligence","Chinese company verification","business credit check China"],
  },
  {
    id: "on-site-coordination",
    title: "On-Site Coordination & Representation",
    description: "Professional on-site representation for client visits, meetings, negotiations, inspections, and ongoing liaison with your Chinese suppliers.",
    longDescription: "When you can't be in China yourself, we act as your eyes, ears, and voice on the ground. From accompanying you on factory visits to representing your interests in meetings and negotiations, we ensure clear communication and protect your position.",
    icon: Users,
    features: ["Client visit coordination & interpretation","Meeting representation & facilitation","Technical discussion translation","Contract & specification review support","Ongoing supplier relationship management","Issue resolution & escalation"],
    keywords: ["China factory visit coordination","on-site representation China","supplier meeting translation","factory liaison service"],
  },
  {
    id: "supply-chain-advisory",
    title: "Supply Chain Advisory",
    description: "Strategic advice on supply chain setup, risk mitigation, logistics coordination, and operational best practices for sourcing from China.",
    longDescription: "Sourcing from China involves more than finding a factory. We help you design and optimize your entire supply chain — from supplier strategy and contract terms to logistics planning and risk management. Our advisory service helps you build a resilient, cost-effective China sourcing operation.",
    icon: Globe,
    features: ["Supply chain risk assessment","Sourcing strategy development","Contract & payment term advisory","Logistics & shipping optimization","Quality standard definition","Compliance & regulatory guidance"],
    keywords: ["China supply chain advisory","sourcing strategy China","supply chain risk management","China logistics consulting"],
  },
];
