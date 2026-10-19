import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Industrial Sourcing Research & Buyer Field Notes",
  description: "Original industrial sourcing articles on specifications, supplier evidence and the details behind a purchase. Read the context, follow the sources and form your own judgment.",
  path: "/",
});

const topics = [
  { title: "Specifications & standards", text: "Read the designation, edition and scope before comparing requirements.", href: "/blog/chinese-steel-standard-edition-implementation-translation-dates" },
  { title: "Material & inspection records", text: "Connect what a document says to the material being shipped.", href: "/blog/how-to-verify-mill-test-certificates-and-heat-number-traceability-before-steel-shipment" },
  { title: "The scope behind a price", text: "Separate a cheaper quote from a different technical or commercial offer.", href: "/blog/compare-industrial-supplier-quotes-like-for-like" },
];
const focusLink = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700";

export default function HomePage() {
  const recent = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);
  return (
    <div className="bg-[#f7f6f2] pb-20 pt-28 text-brand-950 sm:pt-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <section aria-labelledby="home-heading" className="grid gap-10 border-b border-brand-950/20 pb-14 lg:grid-cols-[1.7fr_1fr] lg:gap-20 lg:pb-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">Source Rating / Research & field notes</p>
            <h1 id="home-heading" className="mt-6 max-w-[15ch] text-5xl font-semibold leading-[1.06] tracking-tight sm:text-6xl lg:text-7xl">Industrial sourcing, in context.</h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-gray-700">The specification, the supplier record, the shipment. Original articles that look closely at the evidence behind an industrial purchase.</p>
            <Link href="/blog" className={`mt-8 inline-flex min-h-12 items-center gap-5 bg-brand-950 px-6 py-3 font-semibold text-white hover:bg-brand-800 ${focusLink}`}>Browse articles <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
          </div>
          <div className="self-end border-l border-brand-950/20 pl-6 lg:pb-1">
            <h2 className="text-xl font-semibold">A closer reading of the purchase.</h2>
            <p className="mt-4 max-w-sm leading-7 text-gray-700">For procurement and engineering professionals who need more than a supplier claim. Explore technical distinctions, source notes and practical questions you can take back to your team.</p>
            <p className="mt-4 max-w-sm text-sm leading-7 text-gray-600">Read each article for its evidence and limits. The judgment on a particular part or project stays with the people responsible for it.</p>
          </div>
        </section>

        <section aria-labelledby="recent-heading" className="py-14 sm:py-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">From the journal</p><h2 id="recent-heading" className="mt-3 text-3xl font-semibold tracking-tight">Recent reading</h2></div>
            <Link href="/blog" className={`inline-flex items-center gap-3 py-2 text-sm font-semibold text-brand-700 underline underline-offset-4 ${focusLink}`}>All articles <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
          </div>
          <div className="grid gap-x-12 lg:grid-cols-2">
            {recent.map((post, index) => (
              <article key={post.slug} className={`min-w-0 border-t border-brand-950/20 py-7 ${index === 0 ? "lg:row-span-3" : ""}`}>
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">{post.category}</p>
                <h3 className={`mt-3 font-semibold leading-tight tracking-tight ${index === 0 ? "text-3xl sm:text-4xl" : "text-2xl"}`}><Link href={`/blog/${post.slug}`} className={`hover:text-brand-700 ${focusLink}`}>{post.title}</Link></h3>
                <p className="mt-4 max-w-xl leading-7 text-gray-700">{post.excerpt}</p>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600"><time dateTime={post.date}>{new Date(`${post.date}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })}</time><span>{post.readTime}</span></div>
                {post.coverImage ? <figure className="mt-6"><Image src={post.coverImage.src} alt={post.coverImage.alt} width={post.coverImage.width} height={post.coverImage.height} sizes="(min-width: 1024px) 48vw, 100vw" className="h-auto w-full border border-brand-950/10" /><figcaption className="mt-3 text-xs leading-6 text-gray-600">{post.coverImage.caption}</figcaption></figure> : null}
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="topics-heading" className="border-t border-brand-950/20 py-12">
          <h2 id="topics-heading" className="text-3xl font-semibold tracking-tight">Follow a question</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">{topics.map(topic => <div key={topic.href} className="min-w-0 border-t border-brand-950/20 pt-5"><h3 className="text-xl font-semibold"><Link href={topic.href} className={`underline decoration-brand-950/25 underline-offset-4 hover:text-brand-700 ${focusLink}`}>{topic.title}</Link></h3><p className="mt-3 leading-7 text-gray-700">{topic.text}</p></div>)}</div>
        </section>

        <section aria-labelledby="membership-heading" className="mt-4 grid gap-6 border-y border-brand-950/20 py-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">Looking further</p><h2 id="membership-heading" className="mt-3 text-3xl font-semibold tracking-tight">Research with more depth.</h2></div>
          <div><p className="max-w-xl leading-7 text-gray-700">A research membership is being prepared. The scope and delivery details are still taking shape; the public article collection remains free to read.</p><Link href="/membership" className={`mt-5 inline-flex py-2 font-semibold text-brand-700 underline underline-offset-4 ${focusLink}`}>Read about the planned membership</Link></div>
        </section>
        <aside aria-label="Supplier services" className="pt-9 text-sm leading-7 text-gray-600">Working on a specific supplier question? <Link href="/services" className={`font-semibold text-brand-700 underline underline-offset-4 ${focusLink}`}>Explore services</Link>, <Link href="/pricing" className={`underline underline-offset-4 ${focusLink}`}>review scopes and pricing</Link> or <Link href="/risk-screen" className={`underline underline-offset-4 ${focusLink}`}>request a risk screen</Link>.</aside>
      </div>
    </div>
  );
}
