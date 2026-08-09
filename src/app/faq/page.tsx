import { faqItems, faqSchemaData } from "@/data/faq";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "FAQ", description: "Frequently asked questions about China factory inspection, supplier verification, production monitoring, pricing, and how our sourcing services work.",
  keywords: ["China factory audit FAQ","supplier verification questions","China sourcing FAQ","factory inspection pricing"],
  path: "/faq",
});

export default function FAQPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }} />
      <section className="border-b border-gray-200 bg-[#f7f8f5] pb-16 pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-sm font-semibold uppercase text-brand-700">FAQ</span>
            <h1 className="mt-3 text-4xl font-bold text-gray-950 sm:text-5xl">Frequently asked questions</h1>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              Practical answers for overseas buyers planning supplier verification, factory audits, inspection, or sourcing support in China.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="divide-y divide-gray-200 border-y border-gray-200">
            {faqItems.map((item) => (
              <div key={item.question} className="py-7">
                <h2 className="text-xl font-bold text-gray-950">{item.question}</h2>
                <p className="mt-3 leading-7 text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
