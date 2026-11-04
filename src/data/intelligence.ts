export interface PlannedDossier {
  id: string;
  code: string;
  title: string;
  status: "In Research" | "Field Verification" | "Editorial Review";
  scope: string;
  focusRegion: string;
  summary: string;
  evidenceGates: string[];
}

export const plannedDossiers: PlannedDossier[] = [
  {
    id: "dossier-01",
    code: "INT-2026-01",
    title: "Southeast Asia Secondary Steel Capacity & Billet Origin Verification",
    status: "Field Verification",
    scope: "Steel billet origin, melt and pour traceability, third-country re-export risks",
    focusRegion: "Thailand, Vietnam, Indonesia & China",
    summary:
      "Investigating the real metallurgical origin of structural steel and rebar re-exported through Southeast Asia to evade trade remedies, including billet heat-number cross-checks and furnace power consumption ratios.",
    evidenceGates: [
      "Smelter electricity log vs. stated output capacity",
      "Billet import customs declarations vs. rolling mill heat numbers",
      "Chemical composition spectrometer baseline audits",
    ],
  },
  {
    id: "dossier-02",
    code: "INT-2026-02",
    title: "EU CBAM Installation Benchmark: 12 China Steel Mills Scope 1/2 Data",
    status: "In Research",
    scope: "Direct emissions, blast furnace vs. EAF electricity accounting, default value gaps",
    focusRegion: "Hebei, Jiangsu, Shandong",
    summary:
      "A systematic benchmark of installation communication templates across 12 blast furnace-basic oxygen furnace (BF-BOF) and electric arc furnace (EAF) mills, highlighting critical omissions that trigger punitive default tariffs.",
    evidenceGates: [
      "Furnace charge scrap ratio verification against purchase slips",
      "Grid emission factor boundary methodology compliance",
      "Independent verification body accreditation scopes",
    ],
  },
  {
    id: "dossier-03",
    code: "INT-2026-03",
    title: "Heavy Mining Wear Liners: Polyurethane & Bimetallic Second-Source Economics",
    status: "Editorial Review",
    scope: "Interchangeability, wear life testing, landed cost break-even modeling",
    focusRegion: "China to Latin America & Africa",
    summary:
      "Real field test comparisons measuring actual wear life of Chinese secondary screen media and bimetallic chute liners against OEM components, accounting for downtime cost and fitment tolerances.",
    evidenceGates: [
      "DIN 53516 abrasion loss lab reports vs. run-time wear measurements",
      "Fastener bolt pattern tolerance inspections",
      "Landed tariff and ocean freight sensitivity matrices",
    ],
  },
];
