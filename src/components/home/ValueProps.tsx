import { ClipboardCheck, Building2, MessageSquare } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const values = [
  {
    icon: ClipboardCheck,
    title: "Verify what is real",
    description: "Confirm the company, workshop, equipment, certifications, production capacity, and quality system before funds are committed.",
    highlight: "Built for pre-payment due diligence",
  },
  {
    icon: Building2,
    title: "Get eyes inside the factory",
    description: "On-site visits replace guesswork with photos, observations, checklists, and practical risk notes from the production floor.",
    highlight: "Factory-floor evidence, not broker claims",
  },
  {
    icon: MessageSquare,
    title: "Remove supplier-side bias",
    description: "We do not take factory commissions. The work is scoped, paid, and reported to the overseas buyer only.",
    highlight: "Independent from supplier incentives",
  },
];

export function ValueProps() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="First principles"
          title="Most sourcing failures start with unverified assumptions."
          description="A professional sourcing process should prove identity, capability, quality controls, and communication reliability before commercial exposure grows."
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
