export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateModified?: string;
  category: string;
  readTime: string;
  directAnswer?: string;
  keyTakeaways?: string[];
  sections: Array<{
    heading: string;
    body: string;
    bullets?: string[];
    callout?: { label: string; text: string; tone?: "neutral" | "warning" | "positive" };
  }>;
  checklist?: Array<{ category: string; evidence: string[] }>;
  decisionMatrix?: Array<{ signal: string; decision: "PROCEED" | "HOLD" | "REJECT"; response: string }>;
  faqs?: Array<{ question: string; answer: string }>;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "verify-chinese-steel-structure-supplier-before-deposit",
    title: "How to Verify a Chinese Steel Structure Supplier Before Paying a Deposit",
    excerpt:
      "A buyer-side verification method for checking factory identity, engineering capability, welding control, material traceability, subcontracting, capacity, and payment risk before money moves.",
    date: "2026-08-10",
    category: "Steel structures",
    readTime: "11 min read",
    directAnswer:
      "Before paying a deposit, verify two things separately: that the company receiving the money is the company you investigated, and that the actual fabricator can execute your specific drawings, welding, materials, coating, inspection, packing, and delivery requirements. A business license, ISO certificate, Alibaba badge, factory video, or low quotation proves neither point on its own.",
    keyTakeaways: [
      "Match the quoted company, contract party, export entity, bank beneficiary, factory address, and website claims.",
      "Test engineering capability against your project drawings and specifications, not a supplier brochure.",
      "Trace WPS/PQR and welder qualifications to the welding processes, materials, thickness ranges, and joint types in your order.",
      "Require a material trail from mill certificates and heat numbers to cutting, fabrication, piece marks, packing, and final documents.",
      "Identify every subcontracted process and decide which changes require your written approval.",
      "Release a deposit only after critical evidence gaps are closed or protected by explicit contract hold points.",
    ],
    sections: [
      {
        heading: "1. Verify who is selling, fabricating, exporting, and receiving payment",
        body:
          "Steel exporters often use related companies, export agents, leased workshops, or subcontract factories. That is not automatically unacceptable. The risk begins when the buyer assumes all names and locations represent one controlled manufacturing system. Build a simple entity map before discussing capability.",
        bullets: [
          "Chinese business license name and unified social credit code",
          "English quotation name and the legal entity named in the contract",
          "Bank beneficiary and country of the receiving account",
          "Export entity shown on commercial documents",
          "Factory address, workshop ownership or lease evidence, and the processes performed there",
          "Relationship between the website, email domain, sales team, factory, and any subcontractors",
        ],
        callout: {
          label: "Deposit rule",
          text: "Do not send money to a personal account or an unexplained third party. If the beneficiary differs from the investigated supplier, require a documented relationship and contract language that preserves accountability.",
          tone: "warning",
        },
      },
      {
        heading: "2. Test engineering capability with the actual project package",
        body:
          "A factory may be real and still be wrong for your project. Send a controlled sample of the actual design basis, drawings, connection details, tolerances, material grades, coating system, applicable code, inspection plan, and destination requirements. Then assess the questions the supplier asks, the assumptions it records, and the revisions it returns.",
        bullets: [
          "Can the team explain the design basis, applicable code, load assumptions, and scope boundary?",
          "Who prepares shop drawings, connection calculations, bills of materials, nesting, and CNC files?",
          "How are drawing revisions approved and prevented from reaching production prematurely?",
          "Can the supplier identify difficult connections, weld access, distortion risk, tolerances, erection interfaces, and shipping constraints?",
          "Are technical clarifications answered by an engineer or merely relayed by sales staff?",
        ],
      },
      {
        heading: "3. Check whether welding evidence applies to your order",
        body:
          "Collecting certificates is not the same as qualifying the work. Review the WPS, supporting PQR, and welder qualification records against the code, welding process, base material group, filler material, thickness and diameter range, joint type, welding position, and validity required by the project. Confirm that production welders can be traced to their qualifications and that consumables are controlled.",
        bullets: [
          "Applicable welding code and contract-specific acceptance criteria",
          "WPS number linked to a valid supporting PQR",
          "Welder or welding-operator qualification range and current continuity",
          "Filler-metal storage, baking, issue, and return records where required",
          "Fit-up, preheat, interpass temperature, distortion, repair, and visual inspection controls",
          "NDT method, sampling rate, technician qualification, report traceability, and repair closeout",
        ],
        callout: {
          label: "Common red flag",
          text: "A supplier sends a thick certificate package but cannot identify which WPS applies to a selected drawing weld or which qualified welder performed a sampled joint.",
          tone: "warning",
        },
      },
      {
        heading: "4. Follow material traceability from the mill to the shipping mark",
        body:
          "Request a sample evidence chain for a recent comparable order. The mill test certificate should connect to receiving inspection, heat or batch identification, stock records, cutting lists, piece marks, fabrication records, inspection status, packing lists, and final dossier. Where full traceability is required, ask how identification survives cutting, blasting, painting, and repacking.",
        bullets: [
          "Specified material grade, standard, dimensions, and any required impact-test condition",
          "MTC issuer, heat number, quantity, and consistency with the received material",
          "Positive material identification or independent testing when the risk warrants it",
          "Substitution approval and treatment of mixed heats, remnants, and unidentified stock",
          "Piece marking and packing-list links to drawings, zones, or erection sequence",
        ],
      },
      {
        heading: "5. Map owned and subcontracted production processes",
        body:
          "Do not ask only whether the company is a factory. Ask who performs each process: detailing, procurement, cutting, drilling, assembly, welding, machining, galvanizing, blasting, painting, NDT, trial assembly, packing, and export loading. Subcontracting can be controlled, but invisible subcontracting breaks the evidence chain.",
        bullets: [
          "Name and location of each approved subcontractor",
          "Which quality plan, drawings, WPS, inspection criteria, and records apply at that site",
          "Who releases work, manages nonconformities, and closes corrective actions",
          "Whether subcontractor or process changes require written buyer approval",
          "How Source Rating or the buyer's inspector can access subcontract production",
        ],
      },
      {
        heading: "6. Test capacity and schedule realism against current workload",
        body:
          "Installed equipment is not the same as available capacity. Compare the proposed production plan with current orders, material lead times, engineering release dates, bottleneck machines, skilled labor, coating capacity, inspection resources, packing space, container or breakbulk planning, and holiday shutdowns. Ask for a week-by-week plan tied to measurable release points.",
        callout: {
          label: "Useful test",
          text: "Select one promised milestone and ask the supplier to show its required drawings, materials, work centers, labor, inspection hold points, packing method, and float. Vague answers reveal more than a polished capacity slide.",
          tone: "neutral",
        },
      },
      {
        heading: "7. Put the evidence chain into the contract before the deposit",
        body:
          "Verification findings matter only if they change the commercial controls. Attach the approved technical package, supplier and factory identities, subcontractor list, inspection and test plan, document schedule, change-control rule, packing standard, and payment milestones to the purchase agreement. Define the evidence required for each payment instead of paying only against a calendar date.",
        bullets: [
          "No material, design, process, factory, or subcontractor substitution without written approval",
          "Buyer or third-party access for agreed inspections and record review",
          "Hold points before concealed work, coating, packing, and shipment",
          "Nonconformity, repair, re-inspection, delay, and rejection responsibilities",
          "Final payment or shipment release tied to accepted goods and a complete document dossier",
        ],
      },
      {
        heading: "8. An anonymized HOLD case: the factory claim did not match the evidence",
        body:
          "In one anonymized early-stage review, an exporter presented itself as an established steel-structure factory. The public profile and quotation looked credible, but the legal, factory, and technical evidence did not form a consistent chain. The sales entity could not clearly demonstrate control of the claimed workshop, project-specific engineering answers remained superficial, and key welding and traceability documents were generic rather than tied to the proposed scope. The correct decision was HOLD—not an accusation of fraud, but a refusal to release a deposit until identity, production control, and project capability were independently verified.",
        callout: {
          label: "Why HOLD matters",
          text: "Verification is not a hunt for a perfect supplier. It is a way to stop unresolved critical risks from becoming irreversible payments, fabricated defects, or missed installation dates.",
          tone: "positive",
        },
      },
    ],
    checklist: [
      {
        category: "Identity and payment",
        evidence: ["Business license", "Contract entity", "Bank beneficiary", "Export entity", "Factory relationship and address"],
      },
      {
        category: "Engineering",
        evidence: ["Design basis and code", "Controlled drawings", "Connection/detailing responsibility", "Revision register", "Technical clarification log"],
      },
      {
        category: "Welding and inspection",
        evidence: ["Applicable WPS/PQR", "Welder qualifications", "Consumable control", "NDT plan and qualifications", "Repair and closeout records"],
      },
      {
        category: "Materials",
        evidence: ["Approved grades and standards", "MTC and heat-number trail", "Receiving records", "Substitution control", "Piece marks and packing traceability"],
      },
      {
        category: "Production and delivery",
        evidence: ["Owned/subcontracted process map", "Current workload", "Milestone plan", "Coating controls", "Packing and shipment release plan"],
      },
    ],
    decisionMatrix: [
      {
        signal: "Entities match, project-specific evidence is complete, and minor gaps have dated corrective actions.",
        decision: "PROCEED",
        response: "Release only the contractually agreed deposit and keep inspection hold points active.",
      },
      {
        signal: "The supplier may be capable, but identity, WPS/PQR coverage, traceability, subcontracting, or schedule evidence remains material and unresolved.",
        decision: "HOLD",
        response: "Do not pay yet. Assign each evidence gap, deadline, verifier, and acceptance rule.",
      },
      {
        signal: "Bank beneficiary is unexplained, evidence is falsified or contradictory, factory access is refused, or critical substitutions are concealed.",
        decision: "REJECT",
        response: "Stop the transaction or restart qualification with a different supplier and independently controlled evidence.",
      },
    ],
    faqs: [
      {
        question: "Does a Chinese business license prove that a supplier owns a steel factory?",
        answer:
          "No. It proves that a legal entity is registered, but not that it owns or controls the workshop shown online. Match the entity to the factory address, equipment, employees, process records, export documents, contract, and bank beneficiary.",
      },
      {
        question: "Are ISO 9001 and Alibaba verification enough before paying a deposit?",
        answer:
          "No. They can be useful signals, but they do not prove project-specific engineering, welding qualification coverage, material traceability, current capacity, subcontractor control, or delivery readiness.",
      },
      {
        question: "What welding documents should a steel-structure buyer request?",
        answer:
          "Request the applicable WPS, supporting PQR, welder or operator qualification records, consumable controls, inspection and NDT plan, technician qualifications, and sample production records. Check that their qualified ranges cover the actual code, process, materials, thicknesses, joints, and positions in the order.",
      },
      {
        question: "Can remote supplier verification replace a factory audit?",
        answer:
          "Remote verification can screen identity, documents, engineering responses, and obvious inconsistencies. It should not replace an on-site audit when the order is large, fabrication is complex, evidence is inconsistent, subcontracting is material, or production and inspection controls must be witnessed.",
      },
      {
        question: "When should a buyer use HOLD instead of rejecting the supplier?",
        answer:
          "Use HOLD when the supplier may still be acceptable but a critical evidence gap remains unresolved. Define what must be produced, who verifies it, and the deadline. Reject when evidence is falsified, accountability cannot be established, critical access is refused, or the risk cannot be contractually controlled.",
      },
    ],
  },
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
