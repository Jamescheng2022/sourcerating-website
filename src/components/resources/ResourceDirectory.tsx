"use client";

import { useState, useMemo, useTransition } from "react";
import {
  Search,
  X,
  ExternalLink,
  Download,
  Filter,
  Check,
  Copy,
  Layers,
  LayoutGrid,
  ListFilter,
  RotateCcw,
  Globe,
  Calendar,
  Compass,
} from "lucide-react";
import {
  officialResources,
  resourceCategories,
  type ProcurementResource,
  type ResourceCategory,
  sourceReviewDate,
} from "@/data/free-resources";

interface ResourceDirectoryProps {
  initialCategory?: ResourceCategory;
  defaultDense?: boolean;
}

const destinationOptions = [
  { id: "All", label: "All Destinations (全部目的地)" },
  { id: "EU", label: "EU / Europe (欧洲)" },
  { id: "US", label: "US / North America (美国)" },
  { id: "UK", label: "United Kingdom (英国)" },
  { id: "Global", label: "Global / China (全球/中国)" },
] as const;

const stageOptions = [
  { id: "All", label: "All Stages (全部阶段)" },
  { id: "deposit", label: "Pre-Deposit (付定金前)" },
  { id: "technical", label: "Technical & CBAM (技术核验与碳关税)" },
  { id: "cost", label: "Landed Cost & Tariffs (到岸成本与关税)" },
  { id: "shipment", label: "Shipping & Packing (出货交接与包装)" },
  { id: "screening", label: "Counterparty Screening (主体审查)" },
] as const;

function matchesDestination(resRegion: string, dest: string): boolean {
  if (dest === "All") return true;
  if (dest === "EU") return resRegion.includes("EU");
  if (dest === "US") return resRegion.includes("United States") || resRegion.includes("US");
  if (dest === "UK") return resRegion.includes("United Kingdom") || resRegion.includes("UK");
  if (dest === "Global") return resRegion.includes("Global") || resRegion.includes("China") || resRegion.includes("Cross-border");
  return true;
}

function matchesStage(res: ProcurementResource, stageId: string): boolean {
  if (stageId === "All") return true;
  if (stageId === "deposit") return res.id === "SR-01" || res.id === "DO-03";
  if (stageId === "technical") return res.id === "CB-01" || res.id === "CB-02" || res.id === "CB-03";
  if (stageId === "cost") return res.id === "CB-04" || res.id === "TR-01" || res.id === "TR-02" || res.id === "TR-03" || res.id === "TR-04" || res.id === "TR-05";
  if (stageId === "shipment") return res.id === "DO-01" || res.id === "DO-02";
  if (stageId === "screening") return res.id === "CO-01";
  return true;
}

export function ResourceDirectory({
  initialCategory = "All",
  defaultDense = false,
}: ResourceDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<ResourceCategory>(initialCategory);
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [selectedStage, setSelectedStage] = useState<string>("All");
  const [isDense, setIsDense] = useState(defaultDense);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  // Multi-dimensional filter logic: Category + Destination + Stage + Search Query
  const filteredResources = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return officialResources.filter((res) => {
      const matchesCat =
        selectedCategory === "All" || res.category === selectedCategory;
      if (!matchesCat) return false;

      const matchesDest = matchesDestination(res.region, selectedRegion);
      if (!matchesDest) return false;

      const matchesStg = matchesStage(res, selectedStage);
      if (!matchesStg) return false;

      if (!q) return true;

      const searchableText = [
        res.id,
        res.title,
        res.chinese,
        res.category,
        res.categoryZh,
        res.publisher,
        res.stage,
        res.stageZh,
        res.summary,
        res.summaryEn,
        res.region,
        res.rights,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(q);
    });
  }, [searchQuery, selectedCategory, selectedRegion, selectedStage]);

  const handleCopyLink = (res: ProcurementResource) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(`${res.title} - ${res.url}`);
      setCopiedId(res.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleClearFilters = () => {
    startTransition(() => {
      setSearchQuery("");
      setSelectedCategory("All");
      setSelectedRegion("All");
      setSelectedStage("All");
    });
  };

  return (
    <div className="w-full max-w-full overflow-hidden">
      {/* Search & Mode Switcher Bar */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Search Input with min-48px touch height */}
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
              <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword, task, CBAM, HS code, or standard..."
              className="block w-full min-h-[48px] rounded-lg border border-gray-300 bg-gray-50 py-3 pl-11 pr-11 text-base text-gray-900 placeholder:text-gray-400 focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-600/20 sm:text-sm"
              aria-label="Search resources"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 flex min-h-[48px] min-w-[44px] items-center justify-center p-2 text-gray-400 hover:text-gray-700 focus:outline-none"
                aria-label="Clear search query"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Density toggle & quick actions */}
          <div className="flex items-center justify-between gap-2 sm:justify-end">
            <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1">
              <button
                type="button"
                onClick={() => setIsDense(false)}
                className={`inline-flex min-h-[38px] items-center gap-1.5 rounded-md px-3 text-xs font-semibold transition-colors ${
                  !isDense
                    ? "bg-white text-brand-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                aria-label="Editorial card view"
              >
                <LayoutGrid className="h-4 w-4" />
                <span>Cards</span>
              </button>
              <button
                type="button"
                onClick={() => setIsDense(true)}
                className={`inline-flex min-h-[38px] items-center gap-1.5 rounded-md px-3 text-xs font-semibold transition-colors ${
                  isDense
                    ? "bg-white text-brand-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                aria-label="Dense directory view"
              >
                <Layers className="h-4 w-4" />
                <span>Dense</span>
              </button>
            </div>

            <a
              href="/downloads/sourcerating-resource-index-20261024.csv"
              download
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-brand-800 bg-brand-50 px-3 py-2 text-xs font-bold text-brand-900 hover:bg-brand-100 transition-colors"
              title="Download CSV"
            >
              <Download className="h-4 w-4" />
              <span className="hidden xs:inline">CSV Index</span>
              <span className="xs:hidden">CSV</span>
            </a>
          </div>
        </div>

        {/* Primary Filter: Procurement Decision / Category */}
        <div className="mt-4 border-t border-gray-100 pt-3">
          <div className="flex items-center justify-between pb-2 text-xs font-medium text-gray-500">
            <span className="inline-flex items-center gap-1.5">
              <Filter className="h-3.5 w-3.5 text-gray-400" />
              <span>Procurement Decision / Category (采购决策与主题):</span>
            </span>
            <span>
              Showing {filteredResources.length} of {officialResources.length}
            </span>
          </div>
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 py-1 sm:mx-0 sm:flex-wrap sm:px-0">
            {resourceCategories.map((cat) => {
              const count =
                cat === "All"
                  ? officialResources.length
                  : officialResources.filter((r) => r.category === cat).length;
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`inline-flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-brand-600/30 ${
                    isSelected
                      ? "bg-brand-900 text-white shadow-sm"
                      : "border border-gray-200 bg-white text-gray-700 hover:border-brand-300 hover:bg-brand-50/50"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                      isSelected
                        ? "bg-brand-700 text-brand-100"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary Filters: Destination & Stage */}
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-gray-100 pt-3">
          {/* Destination / Market Filter */}
          <div>
            <label htmlFor="destination-select" className="block text-xs font-medium text-gray-600 mb-1 flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-gray-400" />
              <span>Destination Market (目的地筛选):</span>
            </label>
            <select
              id="destination-select"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="block w-full min-h-[44px] rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-800 shadow-xs focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
            >
              {destinationOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Procurement Stage Filter */}
          <div>
            <label htmlFor="stage-select" className="block text-xs font-medium text-gray-600 mb-1 flex items-center gap-1.5">
              <Compass className="h-3.5 w-3.5 text-gray-400" />
              <span>Procurement Stage (采购阶段筛选):</span>
            </label>
            <select
              id="stage-select"
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="block w-full min-h-[44px] rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-800 shadow-xs focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
            >
              {stageOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Active filters summary */}
      {(searchQuery || selectedCategory !== "All" || selectedRegion !== "All" || selectedStage !== "All") && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-brand-50/70 px-4 py-2.5 text-xs text-brand-900">
          <div className="flex flex-wrap items-center gap-2">
            <ListFilter className="h-3.5 w-3.5 text-brand-700" />
            <span>Active filters:</span>
            {selectedCategory !== "All" && (
              <span className="inline-flex items-center gap-1 rounded bg-white px-2 py-0.5 font-semibold shadow-xs">
                Category: {selectedCategory}
              </span>
            )}
            {selectedRegion !== "All" && (
              <span className="inline-flex items-center gap-1 rounded bg-white px-2 py-0.5 font-semibold shadow-xs">
                Destination: {destinationOptions.find((d) => d.id === selectedRegion)?.label.split(" ")[0]}
              </span>
            )}
            {selectedStage !== "All" && (
              <span className="inline-flex items-center gap-1 rounded bg-white px-2 py-0.5 font-semibold shadow-xs">
                Stage: {stageOptions.find((s) => s.id === selectedStage)?.label.split(" ")[0]}
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 rounded bg-white px-2 py-0.5 font-semibold shadow-xs">
                Query: &quot;{searchQuery}&quot;
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={handleClearFilters}
            className="inline-flex min-h-[36px] items-center gap-1 font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-950"
          >
            <RotateCcw className="h-3 w-3" />
            Reset all filters
          </button>
        </div>
      )}

      {/* Resources List / Grid */}
      <div className="mt-6">
        {filteredResources.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center sm:p-12">
            <Search className="mx-auto h-10 w-10 text-gray-300" />
            <h3 className="mt-4 text-base font-semibold text-gray-900">
              No matching resources found
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              We couldn&apos;t find any source documents matching the current combination of filters.
            </p>
            <button
              type="button"
              onClick={handleClearFilters}
              className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-brand-900 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-brand-800"
            >
              <RotateCcw className="h-4 w-4" />
              Reset search & filters
            </button>
          </div>
        ) : isDense ? (
          /* DENSE DIRECTORY VIEW */
          <div className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white shadow-xs">
            {filteredResources.map((res) => (
              <div
                key={res.id}
                className="p-4 transition-colors hover:bg-gray-50/80 sm:p-5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    {/* Meta badges row */}
                    <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                      <span className="rounded bg-brand-100 px-1.5 py-0.5 font-bold text-brand-900">
                        {res.id}
                      </span>
                      <span className="rounded bg-gray-100 px-2 py-0.5 font-medium text-gray-700">
                        {res.category}
                      </span>
                      <span className="rounded border border-gray-200 px-2 py-0.5 text-gray-600">
                        {res.stage}
                      </span>
                      <span className="text-gray-400">· {res.publisher}</span>
                      <span className="inline-flex items-center gap-1 text-gray-400">
                        <Calendar className="h-3 w-3" />
                        Audited: {res.lastReviewDate}
                      </span>
                    </div>

                    {/* Titles */}
                    <h3 className="mt-2 text-base font-bold text-gray-950 break-words sm:text-lg">
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-brand-700 hover:underline"
                      >
                        {res.title}
                      </a>
                    </h3>
                    <p
                      className="mt-0.5 text-sm font-semibold text-brand-800 break-words"
                      lang="zh"
                    >
                      {res.chinese}
                    </p>

                    {/* Bilingual summary */}
                    <p
                      className="mt-2 text-xs leading-5 text-gray-700 break-words"
                      lang="zh"
                    >
                      <strong className="text-gray-900">实操要点：</strong>
                      {res.summary}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-500 break-words">
                      <strong className="text-gray-700">How to use: </strong>
                      {res.summaryEn}
                    </p>

                    {/* Rights & Region note */}
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-gray-400 break-words">
                      <span>Region: <strong>{res.region}</strong></span>
                      <span>·</span>
                      <span>Rights: {res.rights}</span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex shrink-0 items-center gap-2 pt-2 sm:flex-col sm:items-end sm:pt-0">
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] min-w-[120px] items-center justify-center gap-1.5 rounded-lg bg-brand-950 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-brand-800 focus:outline-none focus:ring-2 focus:ring-brand-700"
                    >
                      <span>Open Source</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopyLink(res)}
                      className="inline-flex min-h-[44px] items-center justify-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      aria-label={`Copy link for ${res.id}`}
                    >
                      {copiedId === res.id ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-semibold">
                            Copied
                          </span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 text-gray-400" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* EDITORIAL CARD VIEW */
          <div className="grid gap-5 md:grid-cols-2">
            {filteredResources.map((res) => (
              <article
                key={res.id}
                className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-xs transition-shadow hover:border-brand-300 hover:shadow-md sm:p-6"
              >
                <div>
                  {/* Top metadata badge strip */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="rounded bg-brand-900 px-2 py-0.5 font-bold text-white">
                        {res.id}
                      </span>
                      <span className="rounded bg-brand-50 px-2 py-0.5 font-medium text-brand-800">
                        {res.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                      <span className="rounded-full bg-gray-100 px-2.5 py-0.5 font-medium text-gray-600">
                        {res.stage}
                      </span>
                      <span className="hidden sm:inline text-gray-300">·</span>
                      <span className="hidden sm:inline-flex items-center gap-1 text-gray-400">
                        <Calendar className="h-3 w-3" />
                        {res.lastReviewDate}
                      </span>
                    </div>
                  </div>

                  {/* Title & Chinese name */}
                  <h3 className="mt-4 text-lg font-bold text-gray-950 break-words sm:text-xl">
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-brand-700 hover:underline"
                    >
                      {res.title}
                    </a>
                  </h3>
                  <p
                    className="mt-1 text-sm font-semibold text-brand-800 break-words"
                    lang="zh"
                  >
                    {res.chinese}
                  </p>

                  {/* Practical takeaway callouts */}
                  <div className="mt-4 space-y-2 rounded-lg bg-gray-50 p-3.5 text-xs text-gray-700 sm:text-sm">
                    <div lang="zh" className="break-words">
                      <span className="font-bold text-gray-900">
                        🇨🇳 采购核验指引：
                      </span>
                      <p className="mt-0.5 text-gray-800 leading-relaxed">
                        {res.summary}
                      </p>
                    </div>
                    <div className="border-t border-gray-200/60 pt-2 break-words">
                      <span className="font-bold text-gray-900">
                        🌐 Procurement Action:
                      </span>
                      <p className="mt-0.5 text-gray-600 leading-relaxed">
                        {res.summaryEn}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer and link out */}
                <div className="mt-5 border-t border-gray-100 pt-4">
                  <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] text-gray-500">
                    <span>
                      Publisher: <strong className="text-gray-700">{res.publisher}</strong>
                    </span>
                    <span>Region: <strong className="text-gray-700">{res.region}</strong></span>
                  </div>
                  <p className="mt-1.5 text-[11px] text-gray-400 break-words">
                    Rights: {res.rights}
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => handleCopyLink(res)}
                      className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    >
                      {copiedId === res.id ? (
                        <>
                          <Check className="h-4 w-4 text-emerald-600" />
                          <span className="text-emerald-700 font-semibold">
                            Link Copied
                          </span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 text-gray-400" />
                          <span>Share</span>
                        </>
                      )}
                    </button>

                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg bg-brand-950 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-brand-800 focus:outline-none focus:ring-2 focus:ring-brand-700"
                    >
                      <span>Open Official Publisher</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Review date footer note */}
      <div className="mt-8 text-center text-xs text-gray-500">
        All {officialResources.length} sources independently audited and
        verified on {sourceReviewDate}. Terms and official file versions must be
        reviewed prior to real commercial transactions.
      </div>
    </div>
  );
}
