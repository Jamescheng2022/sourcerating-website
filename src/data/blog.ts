export interface BlogPost {
  slug: string;
  title: string;
  seoTitle?: string;
  excerpt: string;
  date: string;
  dateModified?: string;
  category: string;
  readTime: string;
  directAnswer?: string;
  keyTakeawaysHeading?: string;
  keyTakeaways?: string[];
  sections: Array<{
    heading: string;
    body: string;
    bullets?: string[];
    callout?: { label: string; text: string; tone?: "neutral" | "warning" | "positive" };
  }>;
  checklistHeading?: string;
  checklist?: Array<{ category: string; evidence: string[] }>;
  decisionMatrix?: Array<{ signal: string; decision: "PROCEED" | "HOLD" | "REJECT"; response: string }>;
  faqs?: Array<{ question: string; answer: string }>;
  references?: Array<{ title: string; publisher: string; href: string; note: string }>;
  relatedLinks?: Array<{ title: string; href: string; description: string }>;
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
    relatedLinks: [
      {
        title: "Steel structure factory audit checklist",
        href: "/blog/steel-structure-factory-audit-china",
        description: "Turn the desk-review gaps into an on-site audit of engineering, welding, traceability, subcontracting, capacity, coating, and packing controls.",
      },
      {
        title: "Pre-shipment inspection for engineering materials",
        href: "/blog/pre-shipment-inspection-engineering-materials",
        description: "Define the finished-goods and document release gate before the balance payment or shipment.",
      },
      {
        title: "Engineering supplier verification playbook",
        href: "/playbook",
        description: "Use the broader evidence scoring and deposit-to-shipment workflow across engineering supplier categories.",
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
    title: "Steel Structure Factory Audit Checklist for China Sourcing",
    seoTitle: "Steel Structure Factory Audit Checklist in China",
    excerpt:
      "Buyer-side checklist for verifying a steel fabricator's engineering, welding, traceability, subcontracting, capacity, coating, packing, and delivery controls.",
    date: "2026-05-26",
    dateModified: "2026-08-11",
    category: "Steel structures",
    readTime: "14 min read",
    directAnswer:
      "A useful steel-structure factory audit does not ask only whether the workshop exists. It tests whether the named legal and payment entities, the visited factory, and every critical subcontractor can execute your actual drawings, materials, welding, coating, inspection, packing, and delivery sequence. The audit should sample live records and work on the floor, reconcile contradictions, and end with a PROCEED, HOLD, or REJECT decision tied to contract controls.",
    keyTakeawaysHeading: "What a buyer-side steel factory audit must prove",
    keyTakeaways: [
      "The contract party, bank beneficiary, export entity, visited workshop, and process owners form one accountable chain.",
      "The engineering team controls drawing revisions, technical clarifications, bills of material, shop details, and production release.",
      "WPS, supporting PQR, welder qualifications, inspection plans, and production records apply to the actual project welds.",
      "Material certificates and heat or batch identifiers can be followed through the traceability level required by the contract.",
      "Subcontracted blasting, coating, galvanizing, machining, NDT, or fabrication remains visible and controlled.",
      "Current workload, bottlenecks, labor, inspection resources, and packing space support the promised schedule.",
      "Piece marks, packing lists, documents, and loading plans support the buyer's erection sequence—not merely shipment departure.",
    ],
    sections: [
      {
        heading: "1. Set the buyer decision before setting the factory itinerary",
        body:
          "There is no useful universal tour. Define what the audit must decide: supplier approval, deposit release, capacity confirmation, corrective-action closure, or production readiness. Give the auditor the quotation, proposed contract entity, project specification, controlled drawing sample, required codes, quality plan, schedule, and known concerns. Without that brief, the visit will drift toward clean offices, selected machines, and generic certificates.",
        bullets: [
          "Exact supplier, factory, and subcontractor sites in scope",
          "Order stage and the money or production decision that follows the audit",
          "Project drawing revision, specification, material grades, welding and coating requirements",
          "Processes and records that must be witnessed rather than accepted remotely",
          "Critical evidence gaps already found during the desk review",
        ],
        callout: {
          label: "Audit objective",
          text: "A factory audit evaluates the supplier's ability and control system. A pre-shipment inspection evaluates a defined batch of finished goods. Buyers often need both, at different decision gates.",
          tone: "neutral",
        },
      },
      {
        heading: "2. Map the entity and process chain instead of arguing about factory versus trader",
        body:
          "A trading company is not automatically unacceptable, and a registered manufacturer is not automatically capable. Record who sells, signs, invoices, receives payment, exports, details, buys material, fabricates, coats, inspects, packs, and answers for defects. Then verify the relationship among those entities and locations. The decision turns on transparent control and accountability, not the label printed on a brochure.",
        bullets: [
          "Chinese legal name, registration identifier, registered address, and operating status",
          "Contract party, invoice issuer, bank beneficiary, and export entity",
          "Visited factory address, ownership or lease relationship, and workforce relationship",
          "In-house and subcontracted process map with named locations",
          "Authority for technical changes, nonconformity decisions, payment claims, and warranty response",
        ],
        callout: {
          label: "HOLD signal",
          text: "The sales company arranges the visit but cannot document its relationship with the workshop, explain why another entity receives payment, or identify who is contractually responsible for rework and delay.",
          tone: "warning",
        },
      },
      {
        heading: "3. Challenge engineering control with one live drawing sample",
        body:
          "Do not settle for software screenshots or a wall of past projects. Select one representative connection, member, or assembly from the buyer's controlled package and ask the supplier to walk it from technical clarification to shop drawing, bill of material, nesting or CNC data, fabrication traveler, inspection points, piece mark, and packing plan. This reveals whether engineering and production share one revision-controlled system.",
        bullets: [
          "Applicable code, design responsibility, scope boundaries, assumptions, and unresolved RFIs",
          "Shop drawing and connection-detail review, approval, revision, and superseded-file control",
          "Bill of material, cutting list, nesting, CNC file, and piece-mark consistency",
          "Treatment of difficult weld access, distortion, tolerances, trial assembly, and erection interfaces",
          "Evidence that released information reaches the correct workstation before fabrication starts",
        ],
      },
      {
        heading: "4. Follow one material identity through the system",
        body:
          "Choose one current or recent material item relevant to the proposed order. Reconcile the purchase specification, supplier approval, receiving record, mill test certificate, heat or batch identifier, storage marking, cutting record, piece mark, inspection status, packing list, and final dossier. Do not assume that full heat-number traceability is automatic: define the traceability level in the contract and audit the factory against that requirement.",
        bullets: [
          "Material grade, product standard, dimensions, quantity, and any toughness or supplementary requirement",
          "MTC or MTR source, heat or batch number, and consistency with physical stock",
          "Identification transfer after cutting, drilling, blasting, painting, and repacking where required",
          "Control of remnants, mixed heats, unidentified stock, and proposed substitutions",
          "Bolts, welding consumables, coating materials, and other critical bought-out items",
        ],
        callout: {
          label: "Evidence rule",
          text: "A certificate is useful only when the factory can connect it to the material and component that will be delivered under the buyer's required traceability level.",
          tone: "neutral",
        },
      },
      {
        heading: "5. Link WPS, PQR, welder qualifications, and shop practice",
        body:
          "Select a project weld and ask the welding coordinator or responsible engineer to identify the applicable WPS, its supporting qualification record, the qualified welder or operator range, the production inspection steps, and the acceptance criteria. Then compare the paperwork with fit-up, consumable handling, machine settings, preheat or interpass control where required, welder identification, visual inspection, NDT, repair, and closeout on the floor.",
        bullets: [
          "Contract welding code and edition, joint detail, process, material group, thickness, position, and backing condition",
          "WPS-to-PQR relationship and approval status for the sampled production weld",
          "Welder or operator qualification range, identification, and continuity evidence",
          "Consumable receipt, storage, issue, return, baking, and batch control where applicable",
          "Inspection and NDT plan, personnel qualifications, report traceability, repair procedure, and re-inspection",
        ],
        callout: {
          label: "Common presentation trap",
          text: "A large certificate package is not proof of coverage. The factory must show which qualified procedure and person apply to a selected project weld and how the resulting record will be traced.",
          tone: "warning",
        },
      },
      {
        heading: "6. Observe dimensional control before defects become expensive",
        body:
          "Check how the factory converts approved geometry into controlled fabrication. Sample receiving dimensions, cutting and drilling accuracy, jigs and fixtures, fit-up, tack welding, distortion control, overall dimensions, hole patterns, camber or preset geometry, and trial assembly where the risk requires it. Review calibrated instruments and recent nonconformity records, but also watch operators perform or explain the checks.",
        bullets: [
          "Inspection points before welding, before concealed work, and before coating",
          "Measuring equipment identification, calibration status, range, and condition",
          "First-off or first-article checks for repeated members and connections",
          "Tolerance source and escalation path when drawings and specifications conflict",
          "Segregation, repair approval, re-inspection, and release of nonconforming components",
        ],
      },
      {
        heading: "7. Make every critical subcontracted process visible",
        body:
          "Subcontracting can be commercially sensible, but invisible subcontracting breaks the audit trail. Identify who performs detailing, heavy cutting, machining, bending, welding, galvanizing, blasting, painting, fire protection, NDT, trial assembly, and packing. For each material process, confirm the approved source, documents and drawings issued, inspection access, record return, change approval, and nonconformity responsibility.",
        bullets: [
          "Named subcontractor, location, scope, approval status, and current capacity",
          "Flow-down of project specifications, revisions, quality plan, WPS, and acceptance criteria",
          "Buyer or inspector access to work and records at the subcontract site",
          "Traceability and inspection status across transport between facilities",
          "Written approval before changing a critical factory, process, or subcontractor",
        ],
      },
      {
        heading: "8. Audit coating and surface preparation as a controlled system",
        body:
          "Coating quality cannot be judged from finished color alone. Compare the specified system with surface preparation, environmental conditions, mixing and pot-life control, stripe coats, wet and dry film thickness checks, curing, repair, handling, and final protection. If blasting, painting, or galvanizing is subcontracted, inspect or verify that process owner and its returned records.",
        bullets: [
          "Approved coating system, product data, batch numbers, shelf life, and storage",
          "Surface cleanliness and profile criteria, inspection method, and records",
          "Temperature, humidity, dew-point margin, mixing, thinning, recoat interval, and cure controls where specified",
          "Dry film thickness sampling plan, calibration checks, defect repair, and re-inspection",
          "Protection during stacking, packing, container loading, and long-distance transport",
        ],
      },
      {
        heading: "9. Build the capacity answer from current work, not installed machines",
        body:
          "Installed equipment states theoretical capability; work in progress reveals available capability. Reconcile the proposed schedule with engineering release, material lead time, active orders, bottleneck work centers, qualified labor, inspection and NDT resources, coating throughput, rework, packing space, transport, and planned shutdowns. Ask the factory to defend one promised milestone week by week.",
        bullets: [
          "Current and committed tonnage by process—not one undifferentiated monthly capacity number",
          "Bottleneck machine and labor loading for the buyer's member types and weld volume",
          "Engineering, QC, NDT, coating, packing, and documentation resources",
          "Material procurement dates, buyer approval dates, float, recovery plan, and escalation owner",
          "Evidence from comparable orders delivered with similar complexity and logistics",
        ],
      },
      {
        heading: "10. Check whether packing supports erection, not just export",
        body:
          "A shipment can be commercially complete and still be unusable on site. Trace piece marks to approved drawings, packing lists, zones or erection sequence, bundle tags, fastener packages, document dossiers, and the proposed container or breakbulk loading plan. Check protection of coatings and small parts, lifting points, weight limits, moisture exposure, unloading constraints, and how shortages or transit damage will be reconciled.",
        bullets: [
          "Piece mark, drawing, packing list, bundle, container, and erection-zone relationship",
          "Loose parts, bolts, shims, touch-up materials, templates, and installation accessories",
          "Bundle stability, dunnage, edge protection, drainage, lifting, and safe unloading",
          "Photo record before closure and container or shipment identification",
          "Final document index and release evidence required before goods leave the factory",
        ],
      },
      {
        heading: "11. Sample claims against documents, people, and the floor",
        body:
          "The strongest audit method is reconciliation. For each critical claim, request a controlled document, select a record without allowing the supplier to curate every sample, speak with the responsible person, and inspect the corresponding material, component, workstation, or storage location. Record what was verified, what was supplied by the buyer, what remains a supplier claim, what is missing, and what is an auditor inference.",
        callout: {
          label: "Four-level evidence note",
          text: "Verified observation is not the same as a supplier statement. A useful report keeps observation, document review, claim, and inference separate so the buyer can judge confidence.",
          tone: "positive",
        },
      },
      {
        heading: "12. Convert audit findings into payment and production controls",
        body:
          "The report should not end with a generic score. For every material gap, name the evidence or corrective action, owner, deadline, verifier, acceptance rule, and commercial consequence. Put approved entities, factories, subcontractors, specifications, inspection hold points, document schedule, change control, and payment-release evidence into the purchase agreement and quality plan.",
        bullets: [
          "PROCEED only with the normal contract controls that still apply after supplier approval",
          "HOLD payment or production release until critical evidence gaps close",
          "REJECT when accountability, evidence integrity, access, or capability cannot be established",
          "Require buyer approval before critical material, design, process, factory, or subcontractor changes",
          "Preserve inspection access and hold points before concealed work, coating, packing, and shipment",
        ],
      },
    ],
    checklistHeading: "The minimum steel factory audit evidence file",
    checklist: [
      {
        category: "Audit brief and identities",
        evidence: ["Decision gate and scope", "Legal and payment entity map", "Factory and subcontractor locations", "Project document register", "Known risk list"],
      },
      {
        category: "Engineering control",
        evidence: ["Design and detailing responsibility", "RFI and clarification log", "Approved drawing register", "Revision and production-release control", "Sample drawing-to-piece trail"],
      },
      {
        category: "Materials and traceability",
        evidence: ["Purchase specification", "Receiving record", "MTC/MTR and heat or batch link", "Identification-transfer method", "Substitution and remnant control"],
      },
      {
        category: "Welding and NDT",
        evidence: ["Applicable code and edition", "WPS and supporting PQR", "Welder/operator qualifications", "Consumable records", "Inspection, NDT, repair, and closeout trail"],
      },
      {
        category: "Fabrication and dimensional QC",
        evidence: ["Process flow and hold points", "First-off and in-process records", "Calibrated measuring equipment", "Tolerance and trial-assembly records", "NCR and re-inspection evidence"],
      },
      {
        category: "Coating and subcontracting",
        evidence: ["Approved process owners", "Flowed-down requirements", "Surface-preparation records", "Environmental and DFT records", "Subcontract access and change approval"],
      },
      {
        category: "Capacity and schedule",
        evidence: ["Current workload", "Bottleneck loading", "Qualified labor and QC resources", "Milestone plan and float", "Recovery and escalation plan"],
      },
      {
        category: "Packing and release",
        evidence: ["Piece-mark and packing-list trail", "Erection-sequence mapping", "Packing and loading method", "Small-parts control", "Document index and shipment hold point"],
      },
    ],
    decisionMatrix: [
      {
        signal: "Entities and process owners are transparent, sampled project evidence is consistent, capacity is credible, and only minor dated actions remain.",
        decision: "PROCEED",
        response: "Approve the supplier for the defined scope while keeping contract change control, production hold points, and shipment inspection active.",
      },
      {
        signal: "The factory may be capable, but project-specific welding coverage, traceability, subcontractor control, coating evidence, or schedule support remains materially incomplete.",
        decision: "HOLD",
        response: "Do not release the affected payment or production gate. Assign each gap, acceptance evidence, verifier, and due date.",
      },
      {
        signal: "Evidence is altered or contradictory, the payment/factory chain cannot be explained, access to critical work is refused, or essential processes and capacity are concealed.",
        decision: "REJECT",
        response: "Stop supplier approval for this scope or restart qualification with an independently verifiable factory and evidence chain.",
      },
    ],
    faqs: [
      {
        question: "What should a steel structure factory audit check?",
        answer:
          "It should check the legal and payment chain, engineering and revision control, material traceability, WPS/PQR and welder coverage, fabrication and dimensional controls, NDT, coating, subcontracting, current capacity, packing, document readiness, and contract controls against the buyer's actual project package.",
      },
      {
        question: "What is the difference between a factory audit and a pre-shipment inspection?",
        answer:
          "A factory audit asks whether the supplier's organization, people, processes, and capacity can execute the order. A pre-shipment inspection checks a defined batch of goods and documents before release. Passing one does not replace the other.",
      },
      {
        question: "Is a trading company automatically worse than a factory?",
        answer:
          "No. A transparent trading or export company can add useful coordination. The buyer must know who controls engineering, fabrication, quality, subcontractors, payment, export, and corrective action. An unexplained chain is the risk, not the label alone.",
      },
      {
        question: "Do ISO 9001, AISC, EN 1090, or welding certificates replace a project audit?",
        answer:
          "No. Valid certificates can support confidence in a defined system or scope, but they do not prove that the sampled factory, people, procedures, materials, capacity, and records cover your current project. Verify certificate validity, scope, site, standard edition, and project application.",
      },
      {
        question: "Can a remote video audit replace an on-site steel factory audit?",
        answer:
          "Remote review can screen documents, identities, engineering answers, and obvious inconsistencies. It is weaker when the order is large or complex, evidence is contradictory, subcontracting matters, live work must be sampled, or production and inspection controls need to be witnessed independently.",
      },
      {
        question: "What documents should the buyer send before the audit?",
        answer:
          "Send the audit decision, supplier and payment details, proposed scope, controlled drawing sample, specification, applicable codes and editions, material and coating requirements, quality plan, schedule, subcontractor assumptions, and known concerns. Sensitive files can be limited to the smallest package needed for a meaningful test.",
      },
    ],
    references: [
      {
        title: "AISC 207 — Standard for Certification Programs",
        publisher: "American Institute of Steel Construction",
        href: "https://www.aisc.org/aisc/publications/current-standards/aisc-207/",
        note: "A current official benchmark for documented quality systems in steel fabrication, erection, and metal component manufacturing when the applicable contract or program uses AISC requirements.",
      },
      {
        title: "AWS D1.1/D1.1M — Structural Welding Code—Steel",
        publisher: "American Welding Society",
        href: "https://www.aws.org/standards-and-publications/codes-and-standards/d1-1/",
        note: "The official code page describes requirements for structural-steel welding, procedure and welder qualification, fabrication, inspection, and acceptance. Confirm the project-specified edition.",
      },
      {
        title: "ISO 3834-1:2021 — Quality requirements for fusion welding",
        publisher: "International Organization for Standardization",
        href: "https://www.iso.org/standard/81650.html",
        note: "The ISO 3834 series provides a framework for selecting welding quality requirement levels in workshops and at field installation sites; it is not a substitute for the buyer's project specification.",
      },
      {
        title: "ISO 9606-1 — Qualification testing of welders for steels",
        publisher: "International Organization for Standardization",
        href: "https://www.iso.org/standard/54936.html",
        note: "Use the official status page to confirm the current standard and then compare a welder's qualified range with the actual project welds.",
      },
      {
        title: "IAF CertSearch — accredited certificate validation",
        publisher: "International Accreditation Forum",
        href: "https://www.iafcertsearch.org/",
        note: "Use the official global database to validate accredited management-system certificates where coverage exists; certificate validity alone does not establish project capability.",
      },
    ],
    relatedLinks: [
      {
        title: "Verify a Chinese steel supplier before paying a deposit",
        href: "/blog/verify-chinese-steel-structure-supplier-before-deposit",
        description: "Build the identity, engineering, welding, traceability, payment, and contract evidence file before money moves.",
      },
      {
        title: "Pre-shipment inspection for engineering materials",
        href: "/blog/pre-shipment-inspection-engineering-materials",
        description: "Use the finished-goods and document gate after supplier approval and production control.",
      },
      {
        title: "Engineering supplier verification playbook",
        href: "/playbook",
        description: "Apply Source Rating's broader evidence scoring, supplier questions, and deposit-to-shipment decision workflow.",
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
