import {
  ClipboardCheck,
  FileSearch,
  HardHat,
  PackageCheck,
  Route,
  Users,
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
    id: "supplier-verification",
    title: "Engineering Supplier Verification",
    description: "Verify Chinese suppliers for construction materials, equipment, fabricated systems, and project components before deposits or contracts.",
    longDescription: "For engineering buyers, supplier risk is rarely just identity risk. You need to know whether the factory can read drawings, control tolerances, document materials, manage QA/QC, and deliver to project requirements. This service checks the supplier's business identity, production setup, engineering communication, and practical readiness for your project.",
    icon: FileSearch,
    features: [
      "Business license and manufacturer identity check",
      "Engineering capability and drawing/spec review",
      "Material certificate and QA/QC document review",
      "Production capacity and project-fit assessment",
      "Red flags, risk rating, and recommended next steps",
    ],
    keywords: ["China supplier verification", "engineering supplier verification China", "construction materials supplier check"],
  },
  {
    id: "factory-audit",
    title: "Factory Audit for Construction Materials",
    description: "On-site factory audits for structural packages, architectural materials, MEP systems, construction equipment, and project-related manufacturing.",
    longDescription: "A site visit turns supplier claims into observable evidence. We check workshops, equipment, process flow, workforce, incoming material controls, in-process QA/QC, storage, packaging, and production records. The audit is structured around the decision you need to make: proceed, negotiate safeguards, request corrections, or walk away.",
    icon: ClipboardCheck,
    features: [
      "Workshop, equipment, and process walkthrough",
      "Fabrication capacity and bottleneck assessment",
      "QA/QC procedure and inspection record review",
      "Material traceability and certificate checks",
      "Photo-based report with practical risk notes",
    ],
    keywords: ["China factory audit", "steel structure factory audit China", "precast concrete factory audit"],
  },
  {
    id: "pre-shipment-inspection",
    title: "Pre-Shipment Inspection",
    description: "Final inspection before shipment release for engineering materials, fabricated components, and project cargo.",
    longDescription: "Before goods leave the factory, the key question is whether they match the agreed drawings, specifications, quantity, markings, packaging, and visible quality requirements. We inspect according to your requirements and flag issues before shipment release.",
    icon: PackageCheck,
    features: [
      "Quantity, markings, packaging, and label checks",
      "Visual workmanship and dimensional spot checks",
      "Drawing/specification checklist review",
      "Material document and packing list consistency check",
      "Shipment release recommendation",
    ],
    keywords: ["pre shipment inspection China", "construction materials inspection China", "project cargo inspection"],
  },
  {
    id: "production-monitoring",
    title: "Production Monitoring",
    description: "Periodic production follow-up for project orders where delays, rework, and quality drift can create downstream cost.",
    longDescription: "Engineering procurement often fails late because problems are hidden until shipping. Production monitoring provides scheduled visibility during fabrication, assembly, finishing, packaging, and loading so you can act before issues become expensive.",
    icon: HardHat,
    features: [
      "Production progress checks against schedule",
      "Critical-stage QA/QC observation",
      "Issue tracking and supplier follow-up",
      "Photo updates and concise progress notes",
      "Escalation support for project risks",
    ],
    keywords: ["production monitoring China", "construction materials production follow up", "China factory progress inspection"],
  },
  {
    id: "sourcing-support",
    title: "Engineering Sourcing Support",
    description: "Shortlist and screen Chinese manufacturers for construction materials, equipment, building systems, fabricated packages, and made-to-spec project components.",
    longDescription: "The goal is not a long list of suppliers. The goal is a qualified shortlist that matches your drawings, specification requirements, order size, destination market, and project constraints. We help screen candidates before you spend time negotiating with the wrong factory.",
    icon: Route,
    features: [
      "Supplier research based on drawings/specifications",
      "Initial capability and market-fit screening",
      "Comparison of shortlisted candidates",
      "Sample or document coordination",
      "Recommendation for next verification step",
    ],
    keywords: ["China construction materials sourcing", "China engineering sourcing", "steel fabrication sourcing China"],
  },
  {
    id: "china-visit-coordination",
    title: "China Visit Coordination",
    description: "Plan and support factory visits, technical meetings, supplier interviews, and local follow-up for overseas engineering teams.",
    longDescription: "When your team comes to China, every visit should produce decision-quality information. We help prepare supplier agendas, coordinate visits, support technical conversations, document findings, and follow up after meetings.",
    icon: Users,
    features: [
      "Factory visit planning and agenda preparation",
      "Technical meeting support and note-taking",
      "Supplier question list and document request support",
      "Post-visit findings summary",
      "Follow-up and issue clarification",
    ],
    keywords: ["China factory visit coordination", "engineering supplier visit China", "China supplier meeting support"],
  },
];
