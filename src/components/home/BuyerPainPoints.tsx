import { AlertTriangle, FileQuestion, Gauge, PackageX } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="For engineering buyers"
          title="The expensive mistakes usually happen before the purchase order looks risky."
          description="Engineering procurement needs more than a supplier list. It needs evidence that the factory can handle drawings, documents, materials, QA/QC, and project delivery pressure."
        />
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5">
          {risks.map((risk) => (
            <div key={risk.title} className="rounded-md border border-gray-200 bg-[#fbfbf8] p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-white text-brand-700 border border-gray-200">
                  <risk.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-950">{risk.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{risk.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
