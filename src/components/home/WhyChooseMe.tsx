import { SectionHeading } from "@/components/ui/SectionHeading";

const differentiators = [
  { number: "01", title: "Independent, Not Intermediary", description: "Most China sourcing agents take commissions from factories, creating a conflict of interest. We never do. You pay us directly for our expertise and oversight — and that keeps our advice unbiased and our loyalty clear." },
  { number: "02", title: "Engineering Background, Not General Trading", description: "We come from an engineering and industrial supply chain background. We understand manufacturing processes, quality tolerances, material specifications, and production workflows. This technical depth means we catch issues that a general trading agent would miss." },
  { number: "03", title: "Physically Present, Not Remote", description: "We don't coordinate from a desk in another country. We are based in China's industrial heartland, visiting factories, walking production floors, and meeting suppliers in person — every week. When you hire us, you get real eyes on the ground." },
  { number: "04", title: "Risk Reduction Focus", description: "Our entire approach is built around reducing your sourcing risk — not just finding a factory. We identify problems before they become costly mistakes, verify claims before you commit capital, and monitor production to prevent quality failures." },
];

export function WhyChooseMe() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading label="Why Work With Me" title="Not just another China sourcing agent" description="The difference between an intermediary and a true partner is independence, expertise, and presence." />
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
          {differentiators.map((item) => (
            <div key={item.number} className="flex gap-6">
              <span className="shrink-0 text-5xl font-bold text-gray-100 leading-none">{item.number}</span>
              <div><h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3><p className="text-gray-600 leading-relaxed">{item.description}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
