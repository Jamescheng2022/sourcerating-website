import Link from "next/link";
import { generatePageMetadata } from "@/lib/metadata";
export const metadata = generatePageMetadata({
  title: "About James Cheng",
  description: "Meet James Cheng, the author of Source Rating's reporting and field notes on industrial sourcing and cross-border procurement.",
  path: "/about",
});
export default function AboutPage(){return <div className="mx-auto max-w-3xl px-5 py-12"><h1 className="font-serif text-4xl">James Cheng</h1><p className="mt-6 text-lg leading-8">I write about the practical work behind cross-border industrial procurement: suppliers, production, quality, logistics and the records that connect them.</p><p className="mt-5 leading-8">My background includes civil engineering, industrial building materials and overseas business development. I am based in Thailand and work across Chinese and international markets.</p><div className="mt-8 space-y-4"><p><a href="mailto:contact@sourcerating.com">contact@sourcerating.com</a></p><p><a href="https://www.linkedin.com/in/hcrdi/">LinkedIn</a></p><p><Link href="/services">Procurement support</Link></p></div></div>;}
