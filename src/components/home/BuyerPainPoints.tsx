import { AlertTriangle, FileQuestion, Gauge, PackageX } from "lucide-react";

const risks = [
  {
    icon: FileQuestion,
    title: "Drawings and specifications are accepted too quickly",
    description: "A supplier may say yes before confirming tolerances, embedded parts, coating standards, or inspection hold points.",
  },
  {
    icon: Gauge,
    title: "Production capacity is unclear",
    description: "Workshop size, molds, welding stations, QA staffing, and project workload can all affect real delivery capability.",
  },
  {
    icon: AlertTriangle,
    title: "Certificates do not prove project readiness",
    description: "Business licenses, ISO certificates, material documents, and test reports need to be checked against the actual order risk.",
  },
  {
    icon: PackageX,
    title: "Problems appear after shipment",
    description: "Wrong markings, poor packaging, missing documents, and quality drift become expensive once goods are already on the water.",
  },
];

export function BuyerPainPoints() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[0.55fr_1fr] gap-10 items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Why buyers ask us</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950">
              The risk is usually hidden in the details.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {risks.map((risk) => (
            <div key={risk.title} className="rounded-md border border-gray-200 bg-[#fbfbf8] p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white text-brand-700 border border-gray-200">
                  <risk.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-950">{risk.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{risk.description}</p>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
