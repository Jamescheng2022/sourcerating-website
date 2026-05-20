import { ClipboardCheck, Building2, MessageSquare } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const values = [
  { icon: ClipboardCheck, title: "Verify Before You Commit", description: "Every supplier relationship starts with thorough verification. We audit factories in person — checking facilities, equipment, certifications, and real production capabilities — so you never commit to an unknown partner.", highlight: "100+ factory audits conducted" },
  { icon: Building2, title: "Your Partner on the Ground", description: "You need more than a remote coordinator. We are physically present in China's industrial regions — visiting factories, overseeing production, attending meetings, and managing relationships as your direct representative.", highlight: "Present in 8+ industrial provinces" },
  { icon: MessageSquare, title: "Independent, Transparent, Aligned", description: "We never take commissions or kickbacks from suppliers. Our fees are transparent and our loyalty is to you alone. Every recommendation is based on what's best for your business, not what earns us the most.", highlight: "Zero supplier commissions — ever" },
];

export function ValueProps() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading label="Why Source Rating" title="Independent verification. On-the-ground presence. Your interests first." description="We're not a trading company or a commission-driven agent. We're your technical partner in China, focused entirely on reducing your risk and ensuring quality." />
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value) => (
            <div key={value.title} className="group relative p-8 rounded-2xl border border-gray-100 bg-white hover:border-brand-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-50 text-brand-700 mb-6 group-hover:bg-brand-100 transition-colors"><value.icon className="h-6 w-6" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{value.description}</p>
              <div className="pt-4 border-t border-gray-50"><p className="text-sm font-medium text-brand-600">{value.highlight}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
