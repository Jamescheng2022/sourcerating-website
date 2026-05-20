import { SectionHeading } from "@/components/ui/SectionHeading";

const differentiators = [
  {
    number: "01",
    title: "Independent from suppliers",
    description: "The buyer is the client. We do not accept supplier commissions, referral fees, or factory-side incentives.",
  },
  {
    number: "02",
    title: "Industrial, not generic",
    description: "The work is structured around production capability, quality control, tolerances, materials, certifications, and delivery risk.",
  },
  {
    number: "03",
    title: "On-site evidence",
    description: "Reports are built from factory visits, photos, documents, interviews, and direct observation instead of remote claims.",
  },
  {
    number: "04",
    title: "Actionable risk notes",
    description: "Each engagement should end with a clear recommendation: proceed, negotiate protections, request corrections, or walk away.",
  },
];

export function WhyChooseMe() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="How we build trust"
          title="Evidence first. Recommendations second."
          description="A sourcing partner should make uncertainty smaller, not simply introduce another supplier."
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
