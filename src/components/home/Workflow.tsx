import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    step: "01",
    title: "Send the supplier or product brief",
    description: "Share the factory name, product, order stage, risk concerns, drawings, specifications, or links.",
  },
  {
    step: "02",
    title: "Define the verification scope",
    description: "We confirm the right check: company background, factory audit, production inspection, or sourcing research.",
  },
  {
    step: "03",
    title: "Conduct the on-site or desk review",
    description: "We verify identity, capability, quality controls, documents, production status, and practical risk indicators.",
  },
  {
    step: "04",
    title: "Deliver the report",
    description: "You receive findings, photos, risk rating, red flags, and recommended next steps in plain English.",
  },
  {
    step: "05",
    title: "Review decisions together",
    description: "We discuss what the evidence means for payment terms, supplier choice, quality controls, and negotiation.",
  },
  {
    step: "06",
    title: "Monitor what matters",
    description: "For production orders, we can follow up with inspections, progress checks, and issue escalation.",
  },
];

export function Workflow() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Process"
          title="Simple enough to start quickly. Structured enough to reduce risk."
          description="The first engagement can be as focused as checking one supplier before a deposit, or as broad as building a qualified supplier shortlist."
        />
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((item) => (
            <div key={item.step} className="relative p-6 rounded-md border border-gray-200 hover:border-brand-200 hover:shadow-sm transition-all">
              <span className="text-sm font-bold text-brand-700">Step {item.step}</span>
              <h3 className="text-lg font-bold text-gray-900 mt-2 mb-2">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
