"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  X,
  ArrowRight,
  Clock,
  Calendar,
  Layers,
  Sparkles,
  Info,
} from "lucide-react";
import { blogPosts } from "@/data/blog";
import { plannedDossiers } from "@/data/intelligence";

const researchCategories = [
  "All Research",
  "Deep Sourcing Studies",
  "Steel & Metallurgy",
  "Factory Audits",
  "Industrial Equivalence",
] as const;

type ResearchCategory = (typeof researchCategories)[number];

export function IntelligenceDirectory() {
  const [activeTab, setActiveTab] = useState<"articles" | "dossiers">("articles");
  const [selectedCategory, setSelectedCategory] =
    useState<ResearchCategory>("All Research");
  const [query, setQuery] = useState("");

  // Map category to blog posts
  const filteredArticles = useMemo(() => {
    return blogPosts.filter((post) => {
      // Category filter
      let matchesCat = true;
      if (selectedCategory === "Deep Sourcing Studies") {
        matchesCat =
          post.category.includes("Deep Sourcing") ||
          post.slug.includes("guatemala") ||
          post.slug.includes("china-vs-local");
      } else if (selectedCategory === "Steel & Metallurgy") {
        matchesCat =
          post.category.toLowerCase().includes("steel") ||
          post.title.toLowerCase().includes("steel") ||
          post.title.toLowerCase().includes("mill test");
      } else if (selectedCategory === "Factory Audits") {
        matchesCat =
          post.category.toLowerCase().includes("inspection") ||
          post.title.toLowerCase().includes("audit") ||
          post.title.toLowerCase().includes("supplier");
      } else if (selectedCategory === "Industrial Equivalence") {
        matchesCat =
          post.category.toLowerCase().includes("industrial") ||
          post.title.toLowerCase().includes("polyurethane") ||
          post.title.toLowerCase().includes("baghouse") ||
          post.title.toLowerCase().includes("precast");
      }

      if (!matchesCat) return false;

      // Text query
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q)
      );
    });
  }, [selectedCategory, query]);

  return (
    <div className="w-full">
      {/* Primary Tab Switcher */}
      <div className="flex border-b border-gray-200">
        <button
          type="button"
          onClick={() => setActiveTab("articles")}
          className={`flex min-h-[48px] flex-1 items-center justify-center gap-2 border-b-2 px-4 py-3 text-sm font-bold transition-colors ${
            activeTab === "articles"
              ? "border-brand-900 text-brand-950 bg-white"
              : "border-transparent text-gray-500 hover:text-gray-900 bg-gray-50/50"
          }`}
        >
          <Layers className="h-4 w-4" />
          <span>Published Research ({blogPosts.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("dossiers")}
          className={`flex min-h-[48px] flex-1 items-center justify-center gap-2 border-b-2 px-4 py-3 text-sm font-bold transition-colors ${
            activeTab === "dossiers"
              ? "border-brand-900 text-brand-950 bg-white"
              : "border-transparent text-gray-500 hover:text-gray-900 bg-gray-50/50"
          }`}
        >
          <Sparkles className="h-4 w-4 text-brand-700" />
          <span>Planned Dossiers ({plannedDossiers.length})</span>
        </button>
      </div>

      {activeTab === "articles" ? (
        <div className="mt-6 space-y-6">
          {/* Search and Category Chips */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs sm:p-5">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search research by title, metal, standard, or country..."
                className="block w-full min-h-[48px] rounded-lg border border-gray-300 bg-gray-50 py-3 pl-11 pr-10 text-sm text-gray-900 focus:border-brand-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-700/20"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-0 top-0 flex min-h-[48px] min-w-[44px] items-center justify-center text-gray-400 hover:text-gray-700"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Category horizontal scrolling pills */}
            <div className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 py-1 sm:mx-0 sm:flex-wrap sm:px-0">
              {researchCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`inline-flex min-h-[44px] shrink-0 items-center rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    selectedCategory === cat
                      ? "bg-brand-950 text-white"
                      : "border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Research Articles List */}
          <div className="grid gap-5 md:grid-cols-2">
            {filteredArticles.map((post) => (
              <article
                key={post.slug}
                className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-xs transition-all hover:border-brand-300 hover:shadow-md sm:p-6"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-md bg-brand-50 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-800">
                      {post.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500 font-medium">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="mt-3 text-lg font-bold text-gray-950 sm:text-xl">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-brand-700 hover:underline"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-gray-600 sm:text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-5 border-t border-gray-100 pt-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex min-h-[44px] items-center gap-1.5 text-xs font-bold text-brand-800 hover:text-brand-950"
                  >
                    <span>Read Investigation</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : (
        /* PLANNED INTELLIGENCE DOSSIERS TAB */
        <div className="mt-6 space-y-6">
          {/* Explanation Banner */}
          <div className="rounded-xl border-l-4 border-brand-800 bg-white p-5 shadow-xs sm:p-6">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-brand-800 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-brand-900">
                  Concept Dossiers · In Preparation
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-gray-600 sm:text-sm">
                  These deep industrial intelligence dossiers represent planned,
                  in-depth technical investigations currently underway in the
                  field. They examine supply chain integrity, metallurgy proof,
                  and carbon border metrics.
                </p>
                <div className="mt-3 rounded-md bg-amber-50 border border-amber-200 p-3 text-xs text-amber-950">
                  <strong>Notice on Availability:</strong> This is a concept
                  preview of our research roadmap. No membership or subscription
                  is available for purchase on this site. No prices or delivery
                  cadences are committed. All public research above remains 100%
                  free.
                </div>
              </div>
            </div>
          </div>

          {/* Dossiers Grid */}
          <div className="grid gap-6">
            {plannedDossiers.map((dossier) => (
              <div
                key={dossier.id}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs sm:p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold rounded bg-brand-950 px-2 py-0.5 text-white">
                      {dossier.code}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">
                      Region: {dossier.focusRegion}
                    </span>
                  </div>
                  <span className="rounded-full bg-brand-50 border border-brand-200 px-2.5 py-0.5 text-xs font-semibold text-brand-800">
                    {dossier.status}
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-bold text-gray-950 sm:text-xl">
                  {dossier.title}
                </h3>
                <p className="mt-1 text-xs font-medium text-brand-700">
                  Scope: {dossier.scope}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-gray-700 sm:text-sm">
                  {dossier.summary}
                </p>

                {/* Evidence Gates */}
                <div className="mt-4 rounded-lg bg-gray-50 p-3.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    Field Verification Gates:
                  </h4>
                  <ul className="mt-2 space-y-1.5 text-xs text-gray-600">
                    {dossier.evidenceGates.map((gate, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-brand-700 font-bold">✓</span>
                        <span>{gate}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action - Disabled / Coming Soon */}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
                  <span className="text-xs text-gray-500">
                    Planned Format: Technical PDF Dossier + Raw Calculation Model
                  </span>
                  <button
                    type="button"
                    disabled
                    className="inline-flex min-h-[44px] cursor-not-allowed items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-400 border border-gray-200"
                  >
                    <span>Publication Planned · Not Available</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
