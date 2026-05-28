export interface Industry {
  id: string;
  name: string;
  description: string;
  icon: string;
  keywords: string[];
}

export const industries: Industry[] = [
  {
    id: "structural-fabricated-systems",
    name: "Structural & Fabricated Systems",
    icon: "SF",
    description: "Steel structures, precast packages, metal fabrication, aluminum systems, welded assemblies, bridges, platforms, pipe racks, and project-specific structural components.",
    keywords: ["China steel structure factory audit", "China precast concrete supplier verification", "fabricated components supplier audit China"],
  },
  {
    id: "architectural-finishing-materials",
    name: "Architectural & Finishing Materials",
    icon: "AF",
    description: "Facade systems, glass, doors, windows, flooring, stone, tiles, ceiling systems, partitions, hardware, waterproofing, insulation, coatings, and interior fit-out materials.",
    keywords: ["China building materials supplier verification", "construction finishing materials inspection China", "facade supplier audit China"],
  },
  {
    id: "mep-building-systems",
    name: "MEP & Building Systems",
    icon: "MEP",
    description: "Pipes, valves, fittings, pumps, HVAC components, cable trays, lighting, electrical panels, fire protection, sanitary systems, and low-voltage project materials.",
    keywords: ["China MEP supplier verification", "HVAC components inspection China", "pipe valve fitting supplier audit China"],
  },
  {
    id: "civil-infrastructure-materials",
    name: "Civil & Infrastructure Materials",
    icon: "CI",
    description: "Road, rail, utility, drainage, geosynthetic, fastener, anchoring, fencing, formwork, temporary works, and public infrastructure supply packages.",
    keywords: ["China civil construction materials sourcing", "infrastructure materials inspection China", "construction hardware supplier verification China"],
  },
  {
    id: "construction-equipment-site-support",
    name: "Construction Equipment & Site Support",
    icon: "EQ",
    description: "Construction equipment, site machinery, lifting devices, tooling, molds, spare parts, temporary facilities, production line equipment, and jobsite support products.",
    keywords: ["China engineering equipment supplier", "construction equipment factory audit China", "equipment supplier verification China"],
  },
  {
    id: "custom-project-components",
    name: "Custom Project Components",
    icon: "CP",
    description: "Non-standard components made to drawings or project specifications where supplier capability, document control, sample approval, and production monitoring matter.",
    keywords: ["custom construction components China", "project component supplier audit China", "made to drawing supplier verification China"],
  },
];
