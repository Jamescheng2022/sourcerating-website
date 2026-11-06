import Link from "next/link";
import { generatePageMetadata } from "@/lib/metadata";
export const metadata = generatePageMetadata({
  title: "About James Cheng",
  description: "Meet James Cheng and Source Rating: independent insights on international engineering procurement, global sourcing, supplier evaluation, and cross-border trade.",
  path: "/about",
});
export default function AboutPage(){return <div className="mx-auto max-w-3xl px-5 py-12"><h1 className="font-serif text-4xl">James Cheng</h1><p className="mt-6 text-lg leading-8">I write about the commercial decisions behind international industrial procurement: finding reliable suppliers, evaluating quotations, managing sourcing risks, and navigating cross-border trade.</p><p className="mt-5 leading-8">For more than a decade, I have worked in international engineering procurement, supplier sourcing, and overseas trade, with experience across industrial materials, equipment, and project supply chains. My focus at Source Rating is helping buyers ask better questions before they place an order.</p><div className="mt-8 space-y-4"><p><a href="mailto:contact@sourcerating.com">contact@sourcerating.com</a></p><p><a href="https://www.linkedin.com/in/hcrdi/">LinkedIn</a></p><p><Link href="/services">Procurement support</Link></p></div></div>;}
