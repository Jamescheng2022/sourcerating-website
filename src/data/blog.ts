export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  sections: Array<{ heading: string; body: string }>;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "china-precast-concrete-supplier-verification",
    title: "How to Verify a China Precast Concrete Supplier Before Deposit",
    excerpt:
      "A practical buyer-side checklist for checking molds, reinforcement control, curing, dimensional tolerances, certificates, packaging, and project delivery risk.",
    date: "2026-05-26",
    category: "Precast concrete",
    readTime: "5 min read",
    sections: [
      {
        heading: "Start with the drawings, not the brochure",
        body:
          "For precast procurement, the first risk is whether the supplier can understand your drawings, tolerances, reinforcement details, inserts, lifting points, and finish requirements. A verification should compare supplier claims with the actual engineering documents they are expected to produce against.",
      },
      {
        heading: "Check production evidence on the floor",
        body:
          "Useful evidence includes mold condition, reinforcement preparation, embedded part control, curing area, storage method, finished-panel handling, and current workload. A showroom or office meeting is not enough for a project-critical order.",
      },
      {
        heading: "Confirm QA/QC and traceability",
        body:
          "Ask for inspection records, material certificates, concrete mix information, nonconformity handling, and photos tied to recent production. The goal is to know whether quality control is routine or improvised for visitors.",
      },
    ],
  },
  {
    slug: "steel-structure-factory-audit-china",
    title: "What a Steel Structure Factory Audit in China Should Actually Check",
    excerpt:
      "The workshop questions that matter for fabricated steel: welding control, equipment, subcontracting, coatings, packing, documentation, and schedule realism.",
    date: "2026-05-26",
    category: "Steel structures",
    readTime: "6 min read",
    sections: [
      {
        heading: "Separate trading claims from fabrication capability",
        body:
          "Many exporters can quote steel structures, but the buyer needs to know who will fabricate, weld, blast, paint, pack, and document the order. A factory audit should identify owned processes, subcontracted processes, and bottlenecks.",
      },
      {
        heading: "Look at welding, coating, and dimensional control",
        body:
          "Useful checks include welding procedure evidence, welder qualification records where applicable, fit-up controls, cutting and drilling equipment, surface preparation, coating environment, thickness checks, and correction records.",
      },
      {
        heading: "Test the schedule against current workload",
        body:
          "Delivery promises should be compared with workshop capacity, active orders, material availability, coating lead time, packing constraints, and export documentation. A low quote is not useful if the project misses the installation window.",
      },
    ],
  },
  {
    slug: "pre-shipment-inspection-engineering-materials",
    title: "Pre-Shipment Inspection for Engineering Materials: What to Check",
    excerpt:
      "Before release, engineering buyers should verify quantity, markings, packaging, visible quality, dimensions, documents, and shipment readiness.",
    date: "2026-05-26",
    category: "Inspection",
    readTime: "4 min read",
    sections: [
      {
        heading: "Use the purchase documents as the inspection base",
        body:
          "A pre-shipment inspection should be driven by drawings, specifications, purchase order requirements, packing list, and agreed acceptance criteria. Generic visual checks miss the details that cause downstream project cost.",
      },
      {
        heading: "Check goods and documents together",
        body:
          "The inspection should compare physical goods with markings, packing, quantities, material documents, certificates, and export paperwork. Mismatches are often easier to fix before shipment than after arrival.",
      },
      {
        heading: "Make the release recommendation explicit",
        body:
          "The report should state whether to release, hold, correct, recheck, or request additional evidence. The buyer needs a practical decision, not just a photo album.",
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
