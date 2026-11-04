"use client";

import React, { useState, useRef, useMemo } from "react";
import { filterArticles, ArticleFilterItem } from "./filterArticles";

export interface BlogDirectoryProps {
  items: ArticleFilterItem[];
  categories: string[];
  children: React.ReactNode;
}

export function BlogDirectory({ items, categories, children }: BlogDirectoryProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    return filterArticles(items, query, selectedCategory);
  }, [items, query, selectedCategory]);

  const childArray = useMemo(() => {
    return React.Children.toArray(children);
  }, [children]);

  const matchingIndices = useMemo(() => {
    const set = new Set<number>();
    for (const item of filtered) {
      const idx = items.findIndex((orig) => orig.slug === item.slug);
      if (idx !== -1) {
        set.add(idx);
      }
    }
    return set;
  }, [filtered, items]);

  const matchingChildren = useMemo(() => {
    return childArray.filter((_, idx) => matchingIndices.has(idx));
  }, [childArray, matchingIndices]);

  const handleReset = () => {
    setQuery("");
    setSelectedCategory("All categories");
    searchInputRef.current?.focus();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-end">
          <div className="w-full sm:max-w-xs">
            <label
              htmlFor="article-search"
              className="block text-xs font-semibold uppercase tracking-wider text-gray-700"
            >
              Search titles, summaries and categories
            </label>
            <input
              ref={searchInputRef}
              id="article-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. steel, audit, standards..."
              className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-950 placeholder-gray-400 focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
            />
          </div>
          <div className="w-full sm:w-56">
            <label
              htmlFor="article-category"
              className="block text-xs font-semibold uppercase tracking-wider text-gray-700"
            >
              Category
            </label>
            <select
              id="article-category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-950 focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
            >
              <option value="All categories">All categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div aria-live="polite" className="text-xs font-semibold text-gray-500 sm:text-right">
          Showing {filtered.length} of {items.length} articles
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {matchingChildren}
        </div>
      ) : (
        <div className="rounded-md border border-gray-200 bg-[#f7f8f5] p-12 text-center">
          <p className="text-base text-gray-700">No articles match these filters.</p>
          <div className="mt-4">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center rounded-md bg-brand-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
            >
              Reset filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogDirectory;
