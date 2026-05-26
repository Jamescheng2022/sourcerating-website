import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    step: "01",
    title: "Send project and supplier context",
    description: "Share material category, supplier link, drawings/specifications, order stage, target country, and timing.",
  },
  {
    step: "02",
    title: "Define the engineering risk scope",
    description: "We decide whether you need background checks, an on-site audit, pre-shipment inspection, sourcing support, or monitoring.",
  },
  {
    step: "03",
    title: "Prepare the checklist",
    description: "The checklist is built around drawings, standards, QA/QC documents, material traceability, capacity, packaging, and delivery risk.",
  },
  {
    step: "04",
    title: "Verify supplier evidence",
    description: "We review documents, visit the factory when needed, capture photo evidence, and ask the questions a project buyer would ask.",
  },
  {
    step: "05",
    title: "Deliver the decision brief",
    description: "You receive findings, gaps, red flags, risk rating, supplier questions, and recommended next commercial steps.",
  },
  {
    step: "06",
    title: "Follow up or monitor production",
    description: "For active orders, we can track production progress, inspect critical stages, and escalate issues before shipment.",
  },
];

export function Workflow() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Process"
          title="A practical verification workflow for engineering procurement."
          description="The first engagement can be as focused as checking one steel fabricator before deposit, or as broad as building a qualified supplier shortlist for a project package."
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
