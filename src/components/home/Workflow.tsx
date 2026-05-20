import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  { step: "01", title: "Initial Consultation", description: "We discuss your sourcing needs, product requirements, quality expectations, budget, and timeline to define the right service scope for you." },
  { step: "02", title: "Research & Shortlisting", description: "We leverage our local network to identify qualified manufacturers that match your requirements. Each candidate is pre-screened against your specifications." },
  { step: "03", title: "On-Site Verification", description: "We visit shortlisted factories in person — inspecting facilities, reviewing quality systems, verifying certifications, and assessing real capabilities." },
  { step: "04", title: "Negotiation & Setup", description: "We help you negotiate terms, clarify specifications, align on quality standards, and set up communication protocols with your chosen supplier." },
  { step: "05", title: "Production Oversight", description: "Throughout production, we conduct regular on-site inspections, track progress, catch issues early, and provide you with detailed reports." },
  { step: "06", title: "Ongoing Partnership", description: "We continue as your long-term partner in China — managing supplier relationships, conducting periodic audits, and helping you scale with confidence." },
];

export function Workflow() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading label="How It Works" title="A structured process built on years of on-the-ground experience" description="From first conversation to ongoing partnership, every step is designed to reduce your risk and give you confidence in your China supply chain." />
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((item, index) => (
            <div key={item.step} className="relative p-6 rounded-xl border border-gray-100 hover:border-brand-100 hover:shadow-sm transition-all">
              <span className="text-sm font-bold text-brand-600">Step {item.step}</span>
              <h3 className="text-lg font-bold text-gray-900 mt-2 mb-2">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
