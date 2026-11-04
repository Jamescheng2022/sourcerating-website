export interface FieldKitItem {
  name: string;
  nameZh: string;
  format: "XLSX" | "PDF" | "DOCX" | "Checklist";
  description: string;
  fileSizeEstimate: string;
}

export interface FieldKit {
  slug: string;
  title: string;
  chinese: string;
  subtitle: string;
  category: "Metals & Traceability" | "Factory Audit" | "Carbon & Compliance";
  stage: "Before Deposit" | "In-Process Inspection" | "Pre-Shipment Release";
  status: "In Development" | "Editorial Review" | "Pilot Field Testing";
  targetUser: string;
  summary: string;
  practicalContext: string;
  problemSolved: string;
  highlights: string[];
  items: FieldKitItem[];
  sampleExcerpt: {
    heading: string;
    rows: Array<{ field: string; checkRule: string; rejectionSignal: string }>;
  };
}

export const fieldKits: FieldKit[] = [
  {
    slug: "steel-mill-test-certificate-audit-kit",
    title: "Steel Mill Test Certificate & Heat Traceability Field Kit",
    chinese: "钢材材质单(MTC)与炉批号实物溯源工具包",
    subtitle:
      "A complete bilingual verification workflow to validate chemical analysis, mechanical properties, and physical member stamps before shipment release.",
    category: "Metals & Traceability",
    stage: "Pre-Shipment Release",
    status: "Editorial Review",
    targetUser: "Procurement Engineers, Quality Managers & On-site Inspectors",
    summary:
      "A fake or substituted MTC leaves you legally liable when steel fails on site. This kit provides the exact formulas, visual inspection protocols, and bilingual factory notices needed to verify authenticity.",
    practicalContext:
      "Use before approving final balance payment or container loading for structural steel, heavy plates, or welded tubulars sourced from China or Southeast Asia.",
    problemSolved:
      "Mills and trading houses frequently submit photocopied MTCs from different heats, mismatch carbon equivalent formulas, or fail to stamp individual members. This kit turns subjective checks into an auditable evidence chain.",
    highlights: [
      "Bilingual Excel workbook with automated CEV / Pcm carbon equivalent formulas",
      "Three-way evidence reconciliation protocol: Receiving -> Shop Cut -> Packing list",
      "ASTM A6 / EN 10204 Type 3.1 inspection certificate compliance gate",
      "Immediate Non-Conformance Notice (NCR) bilingual template in Chinese & English",
    ],
    items: [
      {
        name: "Bilingual MTC Heat-Number Audit Workbook",
        nameZh: "双语钢材材质单与炉号核验工作表",
        format: "XLSX",
        description:
          "Formulas for ASTM A36, A572, A992, and EN 10025 S355JR chemistry and yield/tensile tolerances.",
        fileSizeEstimate: "245 KB",
      },
      {
        name: "Physical Heat Stamp Photo Protocol",
        nameZh: "实物炉号钢印拍摄与存证规范",
        format: "PDF",
        description:
          "Standard angles, macro-focus requirements, and millimeter scale rules for stamping clarity.",
        fileSizeEstimate: "1.4 MB",
      },
      {
        name: "Three-Way Reconciliation Guide",
        nameZh: "原材入库-下料加工-装箱单三单合一核验表",
        format: "Checklist",
        description:
          "Audit trail verification between raw coil receiving slips, shop cut records, and packing manifests.",
        fileSizeEstimate: "420 KB",
      },
      {
        name: "Bilingual Factory Non-Conformance Notice (NCR)",
        nameZh: "中英双语不合格项整改通知书（现场用）",
        format: "DOCX",
        description:
          "Pre-formatted legal and technical letter for halting container loading when heat stamps do not match.",
        fileSizeEstimate: "180 KB",
      },
    ],
    sampleExcerpt: {
      heading: "Field Inspection Gate Checklist (Excerpt)",
      rows: [
        {
          field: "Chemical Carbon Equivalent (CEV)",
          checkRule: "Calculate CEV = C + Mn/6 + (Cr+Mo+V)/5 + (Ni+Cu)/15 against standard maximum",
          rejectionSignal: "CEV exceeds 0.45% for weldable structural steel; MTC omitted Vanadium or Molybdenum values",
        },
        {
          field: "Heat Stamp Legibility",
          checkRule: "Every 6m/12m member must bear distinct die stamp or dot-peen heat matching the MTC header",
          rejectionSignal: "Paint-pen handwritten heat only; ground-off markings; missing heat code on web or flange",
        },
        {
          field: "Tensile vs Yield Ratio",
          checkRule: "Confirm yield-to-tensile ratio meets seismic ductility criteria (ASTM A992 <= 0.85)",
          rejectionSignal: "Tensile test report copied exactly from prior heat; elongation below standard threshold",
        },
      ],
    },
  },
  {
    slug: "factory-audit-acceptance-kit",
    title: "China & SE Asia Industrial Factory Audit Decision Kit",
    chinese: "中东南亚工程工厂审核与准入验收实操工具包",
    subtitle:
      "Evidence-led audit forms to verify legal ownership, manufacturing line capability, calibration logs, and subcontractor dependency before deposit.",
    category: "Factory Audit",
    stage: "Before Deposit",
    status: "Pilot Field Testing",
    targetUser: "Sourcing Directors, Lead Auditors & Engineering Buyers",
    summary:
      "A supplier claiming to own a 50,000 sqm heavy fabrication plant is often renting a corner or outsourcing primary welding. This kit strips away the showroom smoke and proves real factory ownership.",
    practicalContext:
      "Deploy before wire-transferring the initial 30% deposit to any new manufacturing vendor in China, Vietnam, Thailand, or Malaysia.",
    problemSolved:
      "Traditional agency audit checklists focus on bathroom cleanliness and generic ISO certificates. This kit focuses on welding machine calibration, crane capacity, raw material stock ownership, and subcontractor disclosure.",
    highlights: [
      "12-point Legal Entity vs. Operating Shopfront cross-check matrix",
      "Welder Performance Qualification (WPQR) & Welding Procedure (WPS) gate",
      "Subcontractor disclosure sheet with mandatory physical inspection rights",
      "Go / Hold / Reject weighted scoring spreadsheet",
    ],
    items: [
      {
        name: "Gate 1 Pre-Deposit Factory Verification Sheet",
        nameZh: "定金前工厂主体与实际产线核对表",
        format: "XLSX",
        description:
          "Checks land registry, business license scope, power consumption consistency, and corporate bank entity.",
        fileSizeEstimate: "310 KB",
      },
      {
        name: "Welding & NDT Calibration Inspection Protocol",
        nameZh: "焊接与无损检测设备校准审查指南",
        format: "PDF",
        description:
          "Reviewing current calibration stickers, third-party lab scopes, and calibration certificate validity.",
        fileSizeEstimate: "2.1 MB",
      },
      {
        name: "Subcontractor Processing Disclosure Agreement",
        nameZh: "外协委外加工声明与现场核验协议",
        format: "DOCX",
        description:
          "Bilingual contractual clauses barring unauthorized third-party processing without prior written approval.",
        fileSizeEstimate: "195 KB",
      },
    ],
    sampleExcerpt: {
      heading: "Pre-Deposit Factory Audit Critical Gates (Excerpt)",
      rows: [
        {
          field: "Business License & Corporate Bank",
          checkRule: "Bank beneficiary account name must match legal enterprise title on National Credit Information System",
          rejectionSignal: "Beneficiary is an offshore HK/BVI trading entity with zero registered employees",
        },
        {
          field: "Overhead Crane SWL vs. Member Weight",
          checkRule: "Inspect main bay crane Safe Working Load (SWL) data plate and annual municipal inspection seal",
          rejectionSignal: "Member assembly requires 30T lifts but shop crane capacity maxes out at 10T",
        },
        {
          field: "Welder Qualification Registry",
          checkRule: "Audit current welder certificates (AWS D1.1 / ISO 9606) against active shift shop floor rosters",
          rejectionSignal: "Welder certificates expired; welders working on critical joints lack qualified positions",
        },
      ],
    },
  },
  {
    slug: "cbam-steel-emissions-verification-kit",
    title: "EU CBAM Steel Supplier Data Verification Kit",
    chinese: "欧盟CBAM钢铁碳排放数据审查与核验工具包",
    subtitle:
      "Structured worksheets to request, cross-check, and validate non-EU steel installation emissions before submitting CBAM communications.",
    category: "Carbon & Compliance",
    stage: "In-Process Inspection",
    status: "In Development",
    targetUser: "Importers, Compliance Officers & Steel Procurement Specialists",
    summary:
      "Avoid punitive default values and reporting non-compliance. This toolkit helps buyers structure requests to Asian mills without receiving incomplete or zeroed-out emission sheets.",
    practicalContext:
      "Use during supplier selection and quarterly emission reporting for imported steel articles into the European Union.",
    problemSolved:
      "Mills frequently submit unverified Scope 1 estimates, leave scrap ratios blank, or misunderstand installation boundaries. This toolkit structures the exact evidence required.",
    highlights: [
      "Bilingual questionnaire based on official EC Communication Template",
      "Process route classifier: Blast Furnace (BF-BOF) vs. Electric Arc Furnace (EAF)",
      "Missing parameter detector: flags missing natural gas or electricity allocation",
      "Draft bilingual supplier email sequences and data explanation letters",
    ],
    items: [
      {
        name: "Installation Emission Boundary Questionnaire",
        nameZh: "钢铁设施排放核算边界中英对照问卷",
        format: "XLSX",
        description:
          "Pre-populated with official process inputs to prevent suppliers from skipping precursor emissions.",
        fileSizeEstimate: "480 KB",
      },
      {
        name: "Scrap Ratio & Energy Bill Cross-Check Guide",
        nameZh: "废钢比例与能源发票交叉核验指南",
        format: "PDF",
        description:
          "How to verify reported scrap consumption against weighbridge tickets and electricity bills.",
        fileSizeEstimate: "1.6 MB",
      },
    ],
    sampleExcerpt: {
      heading: "CBAM Supplier Communication Gates (Excerpt)",
      rows: [
        {
          field: "Precursor Steel Origin",
          checkRule: "Verify purchased billet or hot-rolled coil origin; verify whether precursor emissions are included",
          rejectionSignal: "Supplier reports rolling mill electricity only, omitting upstream crude steel smelting",
        },
        {
          field: "Scrap Input Ratio",
          checkRule: "Check furnace scrap charge weight against monthly purchasing records and melting logs",
          rejectionSignal: "Reported 80% scrap ratio at a basic oxygen furnace (BF-BOF) installation without evidence",
        },
        {
          field: "Electricity Source Allocation",
          checkRule: "Distinguish between grid average, direct PPA, and on-site captive coal power plant generation",
          rejectionSignal: "Captive coal power plant emissions masked as zero-carbon hydro or green tariff without certificates",
        },
      ],
    },
  },
];
