import { SectionHeading } from "@/components/ui/SectionHeading";

const differentiators = [
  {
    number: "01",
    title: "20+ years in international engineering",
    description: "The service is grounded in real engineering project work, not general import/export brokerage.",
  },
  {
    number: "02",
    title: "Construction material focus",
    description: "Precast concrete, steel structures, facade materials, MEP components, and project-related manufacturing are the core fit.",
  },
  {
    number: "03",
    title: "Buyer-side evidence",
    description: "Findings are reported to the overseas buyer with photos, documents, risk notes, and follow-up questions.",
  },
  {
    number: "04",
    title: "Decision language",
    description: "Reports are written to support procurement decisions: approve, correct, negotiate safeguards, inspect again, or stop.",
  },
];

export function WhyChooseMe() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Operator credibility"
          title="A specialist engineering background is the core advantage."
          description="General sourcing agents often miss engineering risk. Source Rating is positioned for buyers who care about project execution, not just supplier discovery."
        />
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-10">
          {differentiators.map((item) => (
            <div key={item.number} className="flex gap-6 border-t border-gray-200 pt-6">
              <span className="shrink-0 text-5xl font-bold text-gray-100 leading-none">{item.number}</span>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
