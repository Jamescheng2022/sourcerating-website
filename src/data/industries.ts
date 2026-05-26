export interface Industry {
  id: string;
  name: string;
  description: string;
  icon: string;
  keywords: string[];
}

export const industries: Industry[] = [
  {
    id: "precast-concrete",
    name: "Precast Concrete",
    icon: "PC",
    description: "Precast panels, beams, columns, segments, molds, embedded parts, lifting systems, reinforcement cages, and project-specific concrete components.",
    keywords: ["China precast concrete supplier verification", "precast concrete factory audit China", "precast supplier China"],
  },
  {
    id: "steel-structures",
    name: "Steel Structures",
    icon: "ST",
    description: "Steel frames, bridges, warehouses, pipe racks, platforms, welded assemblies, coating systems, bolt sets, and fabrication packages.",
    keywords: ["China steel structure factory audit", "steel fabrication supplier China", "structural steel inspection China"],
  },
  {
    id: "construction-materials",
    name: "Construction Materials",
    icon: "CM",
    description: "Aluminum profiles, glass, facade systems, waterproofing, fasteners, hardware, finishing materials, and project procurement packages.",
    keywords: ["construction materials supplier inspection China", "China building materials sourcing", "building materials factory audit"],
  },
  {
    id: "mep-industrial-components",
    name: "MEP & Industrial Components",
    icon: "MEP",
    description: "Pipes, valves, fittings, cable trays, pumps, HVAC components, electrical materials, skids, and engineered industrial parts.",
    keywords: ["China MEP supplier verification", "industrial components inspection China", "China valve fitting supplier audit"],
  },
  {
    id: "engineering-equipment",
    name: "Engineering Equipment",
    icon: "EQ",
    description: "Construction equipment, site machinery, lifting devices, production line equipment, tooling, molds, and project support equipment.",
    keywords: ["China engineering equipment supplier", "construction equipment factory audit China", "equipment supplier verification China"],
  },
];
