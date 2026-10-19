import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Planned Research Membership",
  description: "Learn about Source Rating's planned industrial sourcing research membership. Public articles remain free; scope, pricing and delivery details are not yet available.",
  path: "/membership",
});

export default function MembershipPage() {
  return (
    <div className="bg-[#f7f6f2] pb-24 pt-28 text-brand-950 sm:pt-36">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">Research membership / In preparation</p>
        <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">Membership is being prepared.</h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-700">Deeper context for industrial sourcing: original research, readable source notes and comparison materials that help you examine the evidence.</p>
        <p className="mt-5 max-w-2xl leading-8 text-gray-600">This is a description of the direction we are developing. There is no membership available to purchase here yet. Pricing, update frequency, the exact materials and delivery arrangements have not been announced.</p>
        <Link href="/blog" className="mt-8 inline-flex min-h-12 items-center gap-5 bg-brand-950 px-6 py-3 font-semibold text-white hover:bg-brand-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700">Read the free articles <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>

        <section aria-labelledby="direction-heading" className="mt-16 grid gap-7 border-t border-brand-950/20 py-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <h2 id="direction-heading" className="text-3xl font-semibold tracking-tight">What we are working toward</h2>
          <div className="space-y-5 leading-8 text-gray-700"><p>The aim is research that adds something useful beyond the free story: closer examination of a sourcing question, clear source trails and comparison materials whose assumptions you can inspect.</p><p>Any eventual offer will explain what is included, where the material is delivered and how access works. It will also set out the price, billing period, cancellation, refund and support terms before you decide whether to buy.</p></div>
        </section>
        <section aria-labelledby="free-heading" className="grid gap-7 border-t border-brand-950/20 py-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <h2 id="free-heading" className="text-3xl font-semibold tracking-tight">The journal stays open.</h2>
          <div className="space-y-5 leading-8 text-gray-700"><p>The existing public articles remain free. You do not need a Source Rating account to read them, and this page does not collect an email address or create an account.</p><p>There is no on-site paid library at present. If hosted delivery is chosen, the offer will identify the provider and explain its receipt and library access before checkout. No membership access is being granted by this page.</p></div>
        </section>
        <div className="border-t border-brand-950/20 pt-8 text-sm leading-7 text-gray-600">Start with the <Link href="/blog" className="font-semibold text-brand-700 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700">article directory</Link>. For a question about Source Rating, visit <Link href="/contact" className="font-semibold text-brand-700 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700">Contact</Link>.</div>
      </div>
    </div>
  );
}
