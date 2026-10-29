"use client";

import React, { useState, useEffect, useCallback, useTransition } from "react";
import Link from "next/link";
import {
  Search,
  X,
  ArrowRight,
  ExternalLink,
  FileText,
  Database,
  Package,
  Sparkles,
  Loader2,
  RotateCcw,
} from "lucide-react";
import {
  ResearchKind,
  SearchResultItem,
  HomeSearchManager,
  isSearchInputDirty,
} from "@/lib/home-search-controller";

export type { ResearchKind, SearchResultItem } from "@/lib/home-search-controller";

const filterKinds: Array<{ id: ResearchKind; label: string; count: number; desc: string }> = [
  { id: "all", label: "All Items", count: 48, desc: "Articles, Resources, Field Kits" },
  { id: "article", label: "Articles", count: 31, desc: "Field notes & inspection guides" },
  { id: "resource", label: "Official Sources", count: 14, desc: "Chinese standards & customs registries" },
  { id: "kit", label: "Field Kits", count: 3, desc: "Inspection & audit checklists (preview)" },
  { id: "research", label: "HyperResearch", count: 0, desc: "Audited public research (0 live)" },
];

const quickTopics = [
  { label: "MTC Traceability", query: "MTC Traceability" },
  { label: "ASTM A123 HDG", query: "ASTM A123" },
  { label: "ISO 9001 Scope", query: "ISO 9001" },
  { label: "Weld Evidence", query: "Weld Evidence" },
  { label: "Acceptance Sampling", query: "Acceptance Sampling" },
  { label: "CBAM Steel", query: "CBAM" },
];

const focusLink =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700";

export function HomeSearch() {
  const [query, setQuery] = useState("");
  const [activeKind, setActiveKind] = useState<ResearchKind>("all");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [submittedKind, setSubmittedKind] = useState<ResearchKind>("all");
  const [results, setResults] = useState<SearchResultItem[] | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "empty" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loadMoreError, setLoadMoreError] = useState<string | null>(null);

  const [, startTransition] = useTransition();

  const syncUrl = useCallback((q: string, kind: ResearchKind) => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (q.trim()) {
      url.searchParams.set("q", q.trim());
    } else {
      url.searchParams.delete("q");
    }
    if (kind !== "all") {
      url.searchParams.set("kind", kind);
    } else {
      url.searchParams.delete("kind");
    }
    window.history.replaceState(null, "", url.toString());
  }, []);

  const [manager] = useState(
    () =>
      new HomeSearchManager({
        onStateChange: (next) => {
          startTransition(() => {
            setQuery(next.query);
            setActiveKind(next.activeKind);
            setSubmittedQuery(next.submittedQuery);
            setSubmittedKind(next.submittedKind);
            setResults(next.results);
            setTotal(next.total);
            setStatus(next.status);
            setErrorMessage(next.errorMessage);
            setIsLoadingMore(next.isLoadingMore);
            setLoadMoreError(next.loadMoreError);
          });
        },
      })
  );

  const performSearch = useCallback(
    async (searchQuery: string, kind: ResearchKind) => {
      syncUrl(searchQuery.trim(), kind);
      await manager.search(searchQuery, kind);
    },
    [manager, syncUrl]
  );

  // Initialize search from URL on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const searchParams = new URLSearchParams(window.location.search);
    const initialQ = searchParams.get("q") ?? "";
    const rawKind = searchParams.get("kind") ?? "all";
    const initialKind: ResearchKind = [
      "all",
      "article",
      "resource",
      "kit",
      "research",
    ].includes(rawKind)
      ? (rawKind as ResearchKind)
      : "all";

    if (initialQ || initialKind !== "all") {
      const timer = setTimeout(() => {
        void performSearch(initialQ, initialKind);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [performSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void performSearch(query, activeKind);
  };

  const handleKindChange = (newKind: ResearchKind) => {
    setActiveKind(newKind);
    manager.setActiveKind(newKind);
    if (status !== "idle" || query.trim() || newKind !== "all") {
      void performSearch(query, newKind);
    }
  };

  const handleTopicClick = (topicQuery: string) => {
    setQuery(topicQuery);
    manager.setQuery(topicQuery);
    void performSearch(topicQuery, activeKind);
  };

  const handleClear = () => {
    manager.clear();
    syncUrl("", "all");
  };

  const handleLoadMore = () => {
    void manager.loadMore();
  };

  const isDirty = isSearchInputDirty(query, submittedQuery);

  const kindBadge = (kind: ResearchKind, itemStatus: string) => {
    switch (kind) {
      case "article":
        return (
          <span className="inline-flex items-center gap-1 rounded bg-blue-50 px-2 py-0.5 text-[11px] font-bold text-blue-800 border border-blue-200">
            <FileText className="h-3 w-3" />
            <span>{itemStatus || "Free article"}</span>
          </span>
        );
      case "resource":
        return (
          <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-800 border border-emerald-200">
            <Database className="h-3 w-3" />
            <span>{itemStatus || "Official source link"}</span>
          </span>
        );
      case "kit":
        return (
          <span className="inline-flex items-center gap-1 rounded bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-800 border border-amber-200">
            <Package className="h-3 w-3" />
            <span>{itemStatus || "Preview only"}</span>
          </span>
        );
      case "research":
        return (
          <span className="inline-flex items-center gap-1 rounded bg-purple-50 px-2 py-0.5 text-[11px] font-bold text-purple-800 border border-purple-200">
            <Sparkles className="h-3 w-3" />
            <span>{itemStatus || "Published research"}</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mt-4 sm:mt-6 w-full max-w-4xl">
      {/* Search Bar Form */}
      <form
        role="search"
        aria-label="Search industrial sourcing database"
        onSubmit={handleSubmit}
        className="relative"
      >
        <div className="relative flex items-center">
          <label htmlFor="home-search-input" className="sr-only">
            Search specifications, standards, and supplier evidence
          </label>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
            <Search className="h-4 w-4 text-gray-400" aria-hidden="true" />
          </div>
          <input
            id="home-search-input"
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              manager.setQuery(e.target.value);
            }}
            placeholder="Search 48 records: ASTM, GB/T, MTC chemistry, ISO scope, weld inspection..."
            className="block w-full min-h-[48px] rounded-xl border border-gray-300 bg-white pl-10 pr-28 text-xs text-gray-900 placeholder:text-gray-400 shadow-xs focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700 sm:text-sm"
          />

          <div className="absolute inset-y-0.5 right-0.5 flex items-center gap-1">
            {query && (
              <button
                type="button"
                onClick={handleClear}
                aria-label="Clear search input"
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <button
              type="submit"
              disabled={status === "loading"}
              aria-label="Submit search query"
              className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-lg bg-brand-950 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-brand-800 disabled:opacity-50 transition-colors ${focusLink}`}
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span className="hidden sm:inline">Searching</span>
                </>
              ) : (
                <span>Search</span>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Filter Tabs by Content Kind - all with >=44px touch height */}
      <div className="mt-2.5 sm:mt-3 flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 shrink-0 mr-1 hidden sm:inline">
          Filter:
        </span>
        {filterKinds.map((filter) => {
          const isSelected = activeKind === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => handleKindChange(filter.id)}
              aria-pressed={isSelected}
              className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
                isSelected
                  ? "bg-brand-950 text-white shadow-xs"
                  : "bg-gray-100/80 text-gray-700 hover:bg-gray-200 hover:text-gray-900 border border-gray-200/60"
              } ${focusLink}`}
            >
              <span>{filter.label}</span>
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                  isSelected ? "bg-brand-800 text-brand-100" : "bg-gray-200 text-gray-600"
                }`}
              >
                {filter.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Recommended Topic Chips with >=44px touch height */}
      <div className="mt-2.5 sm:mt-3 flex items-center gap-1.5 sm:gap-2 overflow-x-auto sm:flex-wrap pb-1 pt-0.5 no-scrollbar">
        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mr-1 shrink-0">
          Recommended:
        </span>
        {quickTopics.map((topic) => (
          <button
            key={topic.label}
            type="button"
            onClick={() => handleTopicClick(topic.query)}
            className="inline-flex min-h-[44px] items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-brand-700 hover:bg-brand-50 hover:text-brand-900 transition-colors shrink-0 whitespace-nowrap"
          >
            {topic.label}
          </button>
        ))}
      </div>

      {/* Dynamic Results / Status Display Container */}
      {status !== "idle" && (
        <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50/70 p-4 sm:p-5">
          {/* Status: Loading */}
          {status === "loading" && (
            <div
              role="status"
              aria-live="polite"
              className="flex items-center justify-center gap-3 py-8 text-sm text-gray-600"
            >
              <Loader2 className="h-5 w-5 animate-spin text-brand-700" />
              <span>Querying 48 verified industrial records across articles, standards, and kits...</span>
            </div>
          )}

          {/* Status: Error */}
          {status === "error" && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 p-4 text-xs sm:text-sm text-red-800"
            >
              <p className="font-bold">Search error:</p>
              <p className="mt-1 text-red-700">{errorMessage || "Unknown error encountered."}</p>
              <button
                type="button"
                onClick={() => void performSearch(query, activeKind)}
                className="mt-3 inline-flex min-h-[44px] items-center gap-1.5 rounded-md bg-red-800 px-4 py-2 text-xs font-bold text-white hover:bg-red-900"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Retry</span>
              </button>
            </div>
          )}

          {/* Status: Empty */}
          {status === "empty" && (
            <div
              role="region"
              aria-label="No search results found"
              className="py-6 text-center text-xs sm:text-sm text-gray-600"
            >
              <p className="font-bold text-gray-900">
                No matches found for &ldquo;{submittedQuery || query}&rdquo;
                {submittedKind !== "all" ? ` under category ${submittedKind}` : ""}
              </p>
              <p className="mt-1.5 text-gray-500 max-w-lg mx-auto leading-relaxed">
                Matches are computed across 31 full article texts, 14 official standards/customs
                registries, and 3 field kits. Check for typos or try searching with &ldquo;ASTM&rdquo;,
                &ldquo;ISO&rdquo;, &ldquo;MTC&rdquo;, or &ldquo;steel&rdquo;.
              </p>
              <div className="mt-4 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={handleClear}
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs font-bold text-gray-800 hover:bg-gray-50 shadow-xs"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Clear Search</span>
                </button>
              </div>
            </div>
          )}

          {/* Status: Success with results */}
          {status === "success" && results && (
            <div>
              {/* Results Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-gray-200 pb-3">
                <div className="text-xs font-semibold text-gray-800">
                  Showing <span className="font-bold text-brand-950">{results.length}</span> of{" "}
                  <span className="font-bold text-brand-950">{total}</span> matching{" "}
                  {total === 1 ? "record" : "records"}
                  {submittedQuery && (
                    <span>
                      {" "}
                      for &ldquo;<span className="text-brand-900">{submittedQuery}</span>&rdquo;
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-gray-500">
                    Filter: <strong>{filterKinds.find((k) => k.id === submittedKind)?.label}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={handleClear}
                    className="inline-flex min-h-[44px] items-center px-3 text-xs font-bold text-brand-700 underline hover:text-brand-900 ml-2"
                  >
                    Clear results
                  </button>
                </div>
              </div>

              {/* Research bridge advisory if user selected research filter */}
              {submittedKind === "research" && total === 0 && (
                <div className="mt-3 rounded-lg border border-purple-200 bg-purple-50/70 p-3 text-xs text-purple-900">
                  <strong>HyperResearch Public Bridge:</strong> Currently 0 audited public research
                  exports are published. In accordance with safety policies, no internal worker or
                  unverified database outputs are shown.
                </div>
              )}

              {/* Result items list */}
              <div className="mt-3 divide-y divide-gray-200/70">
                {results.map((item) => {
                  const isExternal = item.kind === "resource";
                  return (
                    <article
                      key={item.id}
                      className="py-3.5 first:pt-1 last:pb-1 flex flex-col gap-1.5"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        {kindBadge(item.kind, item.status)}
                        <span className="text-[11px] font-medium text-gray-500">
                          {item.category}
                        </span>
                        {item.updatedAt && (
                          <span className="text-[11px] text-gray-400">
                            · Updated {item.updatedAt}
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm font-bold text-gray-950 hover:text-brand-700">
                        {isExternal ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 break-words"
                          >
                            <span>{item.title}</span>
                            <ExternalLink className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                          </a>
                        ) : (
                          <Link href={item.url} className="break-words">
                            {item.title}
                          </Link>
                        )}
                      </h3>

                      <p className="text-xs leading-relaxed text-gray-600 line-clamp-2 break-words">
                        {item.summary}
                      </p>

                      <div className="pt-1">
                        {isExternal ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[44px] items-center gap-1.5 text-xs font-bold text-brand-900 hover:text-brand-700 underline underline-offset-2"
                          >
                            <span>Open Official Registry</span>
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        ) : (
                          <Link
                            href={item.url}
                            className="inline-flex min-h-[44px] items-center gap-1.5 text-xs font-bold text-brand-900 hover:text-brand-700 underline underline-offset-2"
                          >
                            <span>
                              {item.kind === "article" ? "Read Article" : "View Field Kit"}
                            </span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Load More Button or Complete End State */}
              <div className="mt-5 flex flex-col items-center justify-center gap-2 pt-3 border-t border-gray-200/60">
                {results.length < total ? (
                  <div className="flex flex-col items-center gap-2 w-full sm:w-auto">
                    {isDirty && (
                      <div
                        role="status"
                        className="text-xs text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200 w-full text-center"
                      >
                        Search input changed to &ldquo;{query.trim()}&rdquo;. Press <strong>Search</strong> to query new term.
                      </div>
                    )}
                    {loadMoreError && (
                      <div
                        role="alert"
                        className="text-xs text-red-700 bg-red-50 p-2.5 rounded-lg border border-red-200 w-full text-center"
                      >
                        {loadMoreError}
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={handleLoadMore}
                      disabled={isLoadingMore || isDirty}
                      aria-label={
                        isDirty
                          ? `Search input has changed. Click Search to query '${query.trim()}'`
                          : `Load more records (${results.length} of ${total} currently displayed)`
                      }
                      className={`inline-flex min-h-[44px] w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-brand-950 px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-brand-800 disabled:opacity-50 transition-colors ${focusLink}`}
                    >
                      {isLoadingMore ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Loading more records...</span>
                        </>
                      ) : (
                        <>
                          <span>
                            {isDirty
                              ? "Click Search to Query New Term"
                              : `Load More Results (${results.length} of ${total})`}
                          </span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="text-xs font-medium text-gray-500 py-2">
                    ✓ All {total} matching {total === 1 ? "record" : "records"} loaded
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
