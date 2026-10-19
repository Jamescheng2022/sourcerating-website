import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { generatePageMetadata } from "@/lib/metadata";
import { BlogDirectory } from "@/components/blog/BlogDirectory";

export const metadata = generatePageMetadata({
  title: "Industrial Sourcing Articles & Standards References",
  description: "Browse articles on industrial materials, standards, supplier documentation, and sourcing research. Read the available context and source links to inform your own assessment.",
  keywords: ["China sourcing research", "supplier verification China", "landed cost analysis", "factory audit China", "industrial procurement"],
  path: "/blog",
});

export default function BlogPage() {
  const categories = Array.from(new Set(blogPosts.map((post) => post.category)));
  const filterItems = blogPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
  }));

  return (
    <>
      <section className="border-b border-gray-200 bg-[#f7f8f5] pb-16 pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-sm font-semibold uppercase text-brand-700">Articles & references</span>
            <h1 className="mt-3 text-4xl font-bold text-gray-950 sm:text-5xl">
              Industrial sourcing information, in context.
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              Explore articles on materials, standards, supplier documentation, and sourcing research. Read the available context and source links, and use your own professional judgment.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-white py-20">
        <BlogDirectory items={filterItems} categories={categories}>
          {blogPosts.map((post) => (
            <article key={post.slug} className="rounded-md border border-gray-200 bg-white p-6 hover:border-brand-300 hover:shadow-sm">
              {post.coverImage ? (
                <Image
                  src={post.coverImage.src}
                  alt={post.coverImage.alt}
                  width={post.coverImage.width}
                  height={post.coverImage.height}
                  sizes="(max-width: 1023px) 100vw, 384px"
                  className="mb-5 h-auto w-full rounded-md"
                />
              ) : null}
              <p className="text-sm font-semibold text-brand-700">{post.category}</p>
              <h2 className="mt-4 text-2xl font-bold leading-tight text-gray-950">{post.title}</h2>
              <p className="mt-4 text-sm leading-6 text-gray-600">{post.excerpt}</p>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-500">
                <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />Published {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{post.readTime}</span>
              </div>
              <Link href={`/blog/${post.slug}`} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900">
                Read article <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </BlogDirectory>
      </section>
    </>
  );
}
