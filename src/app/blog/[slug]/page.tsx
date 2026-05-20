import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

interface PageProps { params: Promise<{ slug: string }>; }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return { title: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()), description: "Blog post about China sourcing and factory inspection." };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  // Replace with real MDX/content loading
  if (slug === "coming-soon") {
    return (
      <article className="pt-32 pb-24"><div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"><Link href="/blog" className="inline-flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700 mb-8"><ArrowLeft className="h-4 w-4" />Back to Blog</Link><h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4">Articles Coming Soon</h1><p className="text-gray-600 leading-relaxed">We are preparing in-depth content on China factory inspection, supplier verification, and supply chain management. Check back soon.</p></div></article>
    );
  }
  notFound();
}
