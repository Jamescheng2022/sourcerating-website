import Link from "next/link";
import { QuoteComparisonTool } from "@/components/tools/QuoteComparisonTool";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Free Supplier Quote Comparison Calculator",
  description: "Compare engineering supplier quotes on a common cost basis. Free editable CSV export, transparent FX, landed cost, technical hold points and optional paid buyer-side review.",
  path: "/tools/quote-comparison",
  keywords: [
    "supplier quotation comparison excel template",
    "engineering sourcing quote comparison",
    "landed cost comparison calculator",
    "technical supplier quote review",
  ],
});

export default function QuoteComparisonPage() {
  return (
    <main className="bg-[#f7f8f5] pb-20 pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="text-sm text-gray-500" aria-label="Breadcrumb">
          <Link className="hover:text-brand-700" href="/blog">Buyer guides</Link>
          <span className="mx-2">/</span> Quote comparison tool
        </nav>
        <div className="mt-8 max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Free buyer tool</p>
          <h1 className="mt-3 text-4xl font-bold text-gray-950 sm:text-5xl">
            Supplier quote comparison, without false precision.
          </h1>
          <p className="mt-5 text-lg leading-8 text-gray-700">
            Compare real quotes on the same quantity and currency basis. Record freight, duties, inspection
            and other costs explicitly, then download an editable CSV. No fictitious supplier prices or
            presumed customs rates are supplied.
          </p>
        </div>
        <QuoteComparisonTool />
        <section className="mt-12 grid gap-6 rounded-md bg-brand-950 p-7 text-white md:grid-cols-[1fr_auto] md:items-center sm:p-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-200">Professional next step — paid by written scope and invoice</p>
            <h2 className="mt-3 text-2xl font-bold">Need a technical comparison, not just a cheaper number?</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-200">
              Source Rating offers a buyer-side Technical Supplier Review from USD 500,
              including quotation exceptions, drawing/specification alignment and clarification questions.
              Scope, pricing and payment are confirmed before any work begins. There is no instant checkout on this page.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <TrackedLink href="/contact?source=quote-comparison" eventName="paid_review_intent"
              eventParams={{ location: "quote_comparison", label: "technical_review" }}
              className="rounded-md bg-white px-5 py-3 text-center text-sm font-semibold text-brand-950 hover:bg-gray-100">
              Request paid technical review
            </TrackedLink>
            <TrackedLink href="/pricing" eventName="pricing_click"
              eventParams={{ location: "quote_comparison", label: "pricing" }}
              className="rounded-md border border-white/30 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-white/10">
              See published pricing
            </TrackedLink>
          </div>
        </section>
        <div className="mt-8 max-w-4xl text-sm leading-7 text-gray-600">
          <strong>Important:</strong> This is an early-stage cost normalization aid, not an approval to award a contract,
          import a regulated product, pay a deposit, or accept engineering deviations. The buyer must check
          Incoterms, current tariffs, recoverable taxes, project specifications, drawing revisions,
          quality evidence, and supplier identity before any purchasing decision.
        </div>
      </div>
    </main>
  );
}
