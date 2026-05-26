import { Building2, ClipboardCheck, MessageSquare } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const values = [
  {
    icon: ClipboardCheck,
    title: "Engineering documents are part of the check",
    description: "Drawings, specifications, material certificates, QA/QC records, packing requirements, and inspection points are reviewed as part of supplier readiness.",
    highlight: "Built for project procurement",
  },
  {
    icon: Building2,
    title: "Factory-floor evidence replaces assumptions",
    description: "The work focuses on visible production capability: molds, jigs, welding bays, coating lines, storage, packaging, and workload pressure.",
    highlight: "Evidence from the workshop",
  },
  {
    icon: MessageSquare,
    title: "Commercial advice stays buyer-side",
    description: "No factory commissions. No supplier-side referral fees. Recommendations are based on the buyer's project risk, not supplier incentives.",
    highlight: "Aligned with overseas buyers",
  },
];

export function ValueProps() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Why Source Rating"
          title="Engineering buyers need supplier evidence that matches project reality."
          description="A factory can look capable on a website and still fail on drawings, tolerances, documentation, packaging, or schedule control. The service is designed to test those assumptions before commitment."
        />
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((value) => (
            <div key={value.title} className="group relative p-7 rounded-md border border-gray-200 bg-white hover:border-brand-200 hover:shadow-sm transition-all duration-300">
              <div className="flex items-center justify-center w-11 h-11 rounded-md bg-brand-50 text-brand-700 mb-6 group-hover:bg-brand-100 transition-colors">
                <value.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{value.description}</p>
              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm font-medium text-brand-700">{value.highlight}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
