import Link from "next/link";
import { ArrowRight, ClipboardCheck, Factory, SearchCheck } from "lucide-react";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Buyer Decision Guides",
  description:
    "Evidence-led guides for verifying engineering suppliers before deposit, during factory review, and before shipment release.",
  path: "/buyer-decisions",
});

const decisions = [
  {
    stage: "Before deposit",
    title: "Is this a real manufacturer, and can it handle the package?",
    answer:
      "Verify the legal entity, factory identity, process ownership, engineering capability, quality system, current workload, payment entity, and the evidence behind major sales claims before money moves.",
    href: "/blog/verify-chinese-steel-structure-supplier-before-deposit",
    link: "Supplier verification guide",
    icon: SearchCheck,
  },
  {
    stage: "Factory capability",
    title: "What should a steel-structure factory audit actually prove?",
    answer:
      "A useful audit connects people, equipment, welding, material traceability, subcontracting, QA/QC records, capacity and current work to the buyer's drawings and specification—not just a factory tour.",
    href: "/blog/steel-structure-factory-audit-china",
    link: "Factory audit guide",
    icon: Factory,
  },
  {
    stage: "Before shipment",
    title: "Can the material and finished goods be traced to the shipment?",
    answer:
      "Sample the evidence chain in both directions: packed piece to fabrication and receiving records, then selected heat or inspection unit forward to finished members and packing records.",
    href: "/blog/how-to-verify-mill-test-certificates-and-heat-number-traceability-before-steel-shipment",
    link: "MTC and heat-number guide",
    icon: ClipboardCheck,
  },
] as const;

export default function BuyerDecisionsPage() {
  return (
    <>
      <section className="border-b border-gray-200 bg-[#f4f6f4] pb-16 pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase text-brand-700">Buyer decision library</p>
            <h1 className="mt-4 text-5xl font-semibold leading-tight text-gray-950">
              Start with the decision. Then ask for the evidence.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              These guides are organized around procurement gates: before deposit, during supplier approval and production, and before shipment release. They separate what documents can support from what still needs to be verified on the factory floor.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="divide-y divide-gray-200 border-y border-gray-200">
            {decisions.map((item) => (
              <article key={item.title} className="grid grid-cols-1 gap-6 py-9 lg:grid-cols-[180px_1fr_auto] lg:items-start">
                <div className="flex items-center gap-3 text-brand-700">
                  <item.icon className="h-5 w-5" />
                  <span className="font-mono text-sm font-semibold">{item.stage}</span>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-950">{item.title}</h2>
                  <p className="mt-3 max-w-[76ch] text-base leading-7 text-gray-600">{item.answer}</p>
                </div>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 lg:justify-self-end"
                >
                  {item.link} <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-12 grid gap-6 border border-gray-200 bg-[#f8f9f7] p-7 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-2xl font-semibold text-gray-950">Not sure which check is worth paying for?</h2>
              <p className="mt-2 max-w-[70ch] text-sm leading-6 text-gray-600">
                Send one supplier link, product category, target country and the main concern. The free first-pass screen is desk-based and does not claim to replace an on-site audit, legal review or laboratory test.
              </p>
            </div>
            <Link
              href="/risk-screen"
              className="inline-flex items-center justify-center gap-2 bg-brand-950 px-5 py-3 text-sm font-semibold text-white"
            >
              Request free risk screen <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
