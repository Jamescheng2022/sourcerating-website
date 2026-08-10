import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { getBlogPost } from "@/data/blog";
import { generatePageMetadata } from "@/lib/metadata";

interface PageProps { params: Promise<{ slug: string }>; }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Guide not found" };
  return generatePageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <article className="bg-white pb-24 pt-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900">
          <ArrowLeft className="h-4 w-4" />
          Back to guides
        </Link>
        <p className="text-sm font-semibold uppercase text-brand-700">{post.category}</p>
        <h1 className="mt-3 text-4xl font-bold text-gray-950 sm:text-5xl">{post.title}</h1>
        <p className="mt-5 text-lg leading-8 text-gray-600">{post.excerpt}</p>
        <div className="mt-10 space-y-10 border-t border-gray-200 pt-10">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-bold text-gray-950">{section.heading}</h2>
              <p className="mt-4 leading-8 text-gray-700">{section.body}</p>
            </section>
          ))}
        </div>
        <div className="mt-12 rounded-md border border-gray-200 bg-[#f7f8f5] p-6">
          <h2 className="text-xl font-bold text-gray-950">Need this applied to a real supplier?</h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            Send the supplier link, drawings/specification status, and main risk concern. Source Rating will recommend the right verification scope.
          </p>
          <Link href="/contact" className="mt-5 inline-flex items-center gap-2 rounded-md bg-brand-950 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-800">
            Request a supplier check <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
