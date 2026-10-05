import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Buyer Guides & Deep Sourcing Research",
  description: "Evidence-led buyer guides and deep sourcing research on supplier risk, technical equivalence, landed cost, and whether importing from China makes commercial sense.",
  keywords: ["China sourcing research", "supplier verification China", "landed cost analysis", "factory audit China", "industrial procurement"],
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <section className="border-b border-gray-200 bg-[#f7f8f5] pb-16 pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-sm font-semibold uppercase text-brand-700">Buyer Guides · Deep Sourcing</span>
            <h1 className="mt-3 text-4xl font-bold text-gray-950 sm:text-5xl">
              Evidence-led sourcing decisions for industrial buyers.
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              Supplier verification, technical equivalence, landed-cost checks, destination-market research, and practical go / hold / reject decisions.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {blogPosts.map((post) => (
            <article key={post.slug} className="rounded-md border border-gray-200 bg-white p-6 hover:border-brand-300 hover:shadow-sm">
              <p className="text-sm font-semibold text-brand-700">{post.category}</p>
              <h2 className="mt-4 text-2xl font-bold leading-tight text-gray-950">{post.title}</h2>
              <p className="mt-4 text-sm leading-6 text-gray-600">{post.excerpt}</p>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-500">
                <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{post.readTime}</span>
              </div>
              <Link href={`/blog/${post.slug}`} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900">
                Read guide <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
