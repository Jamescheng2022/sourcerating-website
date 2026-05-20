export interface Industry {
  id: string;
  name: string;
  description: string;
  icon: string;
  keywords: string[];
}

export const industries: Industry[] = [
  { id: "industrial-machinery", name: "Industrial Machinery & Equipment", icon: "⚙️", description: "Heavy machinery, processing equipment, production lines, CNC machines, hydraulic systems, and industrial automation components.", keywords: ["industrial machinery China","equipment manufacturing","CNC machining China"] },
  { id: "construction-materials", name: "Construction & Building Materials", icon: "🏗️", description: "Structural steel, precast concrete, aluminum profiles, glass, hardware, fasteners, plumbing, electrical, and finishing materials.", keywords: ["construction materials China","building materials supplier","steel fabrication China"] },
  { id: "automotive-parts", name: "Automotive & Transportation Parts", icon: "🚛", description: "Auto components, EV parts, motorcycle accessories, railway components, container parts, and marine equipment.", keywords: ["auto parts China","automotive supplier China","EV components manufacturing"] },
  { id: "metal-fabrication", name: "Metal Fabrication & Processing", icon: "🔩", description: "Sheet metal, welding, stamping, casting, forging, surface treatment, precision machining, and custom metal components.", keywords: ["metal fabrication China","sheet metal manufacturing","casting foundry China"] },
  { id: "electronics", name: "Electronics & Electrical", icon: "🔌", description: "Consumer electronics, industrial electronics, PCB assembly, wiring harnesses, connectors, sensors, and power supplies.", keywords: ["electronics manufacturing China","PCB assembly China","electronic components supplier"] },
  { id: "renewable-energy", name: "Renewable Energy & Environmental", icon: "☀️", description: "Solar panels, mounting systems, inverters, energy storage, wind turbine components, and environmental equipment.", keywords: ["solar panel manufacturer China","renewable energy equipment","energy storage China"] },
  { id: "packaging-printing", name: "Packaging, Printing & Labeling", icon: "📦", description: "Custom packaging, corrugated boxes, flexible packaging, labels, tags, printed materials, and POP displays.", keywords: ["packaging manufacturer China","custom packaging China","printing factory China"] },
  { id: "home-garden", name: "Home, Garden & Hardware", icon: "🔧", description: "Power tools, hand tools, hardware, outdoor equipment, plumbing fittings, locks, hinges, and decorative hardware.", keywords: ["hardware supplier China","tools manufacturer China","plumbing fittings China"] },
];
