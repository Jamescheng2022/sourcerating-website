import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights and practical guides on China factory inspection, supplier verification, quality control, supply chain management, and industrial sourcing.",
  keywords: ["China sourcing blog","factory inspection tips","China supply chain blog","supplier verification guide"],
};

const placeholderPosts = [
  { slug: "coming-soon", title: "Articles Coming Soon", excerpt: "We're preparing in-depth articles on China factory inspection, supplier verification best practices, quality control strategies, and supply chain risk management. Check back soon.", date: "2026-05-19" },
];

export default function BlogPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-b from-brand-950 to-brand-900"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-3xl"><span className="text-sm font-semibold uppercase tracking-wider text-brand-300">Blog</span><h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-white">Insights on China sourcing &amp; supply chain</h1><p className="mt-4 text-lg text-gray-300 leading-relaxed">Practical guides, industry observations, and lessons learned from years of on-the-ground factory inspection and supplier management in China.</p></div></div></section>
      <section className="py-24 bg-gray-50"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><div className="space-y-8">{placeholderPosts.map((post) => (<article key={post.slug} className="bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-sm transition-all"><div className="flex items-center gap-2 text-sm text-gray-500 mb-3"><Calendar className="h-4 w-4" /><time dateTime={post.date}>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time></div><h2 className="text-2xl font-bold text-gray-900 mb-3">{post.title}</h2><p className="text-gray-600 leading-relaxed mb-4">{post.excerpt}</p></article>))}</div><div className="mt-16 p-8 rounded-2xl bg-brand-50 border border-brand-100 text-center"><h3 className="text-lg font-bold text-brand-900 mb-2">Content coming soon</h3><p className="text-brand-700 mb-4 max-w-lg mx-auto">The blog infrastructure is ready. Add MDX files to <code className="px-1.5 py-0.5 bg-brand-100 rounded text-sm">src/content/blog/</code> and they will appear here with full SEO support.</p><Link href="/contact" className="inline-flex items-center gap-2 text-sm font-medium text-white bg-brand-700 px-4 py-2 rounded-lg hover:bg-brand-800 transition-colors">Get notified <ArrowRight className="h-4 w-4" /></Link></div></div></section>
    </>
  );
}
