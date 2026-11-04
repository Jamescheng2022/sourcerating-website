import { blogPosts } from "../data/blog";
import { officialResources } from "../data/free-resources";
import { fieldKits } from "../data/field-kits";
import publicResearch from "../data/public-research.json";

export type ResearchKind = "article" | "resource" | "kit" | "research";

export interface ResearchItem {
  id: string;
  kind: ResearchKind;
  title: string;
  summary: string;
  category: string;
  url: string;
  status: string;
  updatedAt?: string;
  provenance?: Array<{ title: string; url: string }>;
}

interface IndexedItem extends ResearchItem {
  searchText: string;
}

const normalize = (value: string) => value.normalize("NFKC").toLocaleLowerCase("en");

function dateIsValid(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)
    && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
}

function textIsValid(value: unknown, max: number): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.length <= max
    && !/[\u0000-\u001f<>]/.test(value);
}

// Only already-published pages on our own site can be exported from the research lane.
// No request may choose a host, database, manifest URL, file path or upstream fetch.
function publicationUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  return /^https:\/\/(?:www\.)?sourcerating\.com\/(?:blog|intelligence)\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

/** Fail closed per record; explicit projection prevents internal notes/IDs leaking. */
export function approvedPublicResearch(input: unknown): ResearchItem[] {
  if (!Array.isArray(input)) return [];
  const seen = new Set<string>();
  return input.flatMap((raw: unknown): ResearchItem[] => {
    if (!raw || typeof raw !== "object") return [];
    const record = raw as Record<string, unknown>;
    if (record.qaStatus !== "approved" || record.rightToPublish !== true
      || !textIsValid(record.id, 80) || !/^[a-z0-9-]+$/.test(record.id)
      || seen.has(record.id) || !textIsValid(record.title, 240)
      || !textIsValid(record.excerpt, 1000) || !textIsValid(record.category, 100)
      || !publicationUrl(record.publicUrl) || !dateIsValid(record.sourceDate)
      || !dateIsValid(record.reviewedAt) || record.reviewedAt < record.sourceDate
      || !Array.isArray(record.provenance) || record.provenance.length === 0
      || record.provenance.length > 20) return [];
    const provenance: Array<{ title: string; url: string }> = [];
    for (const source of record.provenance) {
      if (!source || typeof source !== "object") return [];
      const entry = source as Record<string, unknown>;
      // References point to public pages already reviewed for publication, never raw vault URLs.
      if (!textIsValid(entry.title, 240) || !publicationUrl(entry.url)) return [];
      provenance.push({ title: entry.title, url: entry.url });
    }
    seen.add(record.id);
    return [{ id: `research:${record.id}`, kind: "research", title: record.title,
      summary: record.excerpt, category: record.category, url: record.publicUrl,
      status: "Published research", updatedAt: record.reviewedAt, provenance }];
  });
}

export function buildResearchCatalog(research: unknown = publicResearch): IndexedItem[] {
  const articles: IndexedItem[] = blogPosts.map((post) => ({
    id: `article:${post.slug}`, kind: "article", title: post.title,
    summary: post.excerpt, category: post.category, url: `/blog/${post.slug}`,
    status: "Free article", updatedAt: post.dateModified ?? post.date,
    searchText: [post.title, post.excerpt, post.category, post.directAnswer ?? "",
      ...(post.keyTakeaways ?? []),
      ...post.sections.flatMap((section) => [section.heading, section.body, ...(section.bullets ?? [])]),
      ...(post.articleBody ?? []).flatMap((block) => {
        if (block.type === "table") return [...block.headers, ...block.rows.flat()];
        if (block.type === "list") return block.items;
        if (block.type === "illustration") return [block.alt, block.caption];
        return [block.text];
      }),
    ].join(" "),
  }));
  const resources: IndexedItem[] = officialResources.map((resource) => ({
    id: `resource:${resource.id}`, kind: "resource", title: resource.title,
    summary: resource.summaryEn, category: resource.category, url: resource.url,
    status: "Official source link", updatedAt: resource.lastReviewDate,
    searchText: [resource.title, resource.chinese, resource.summary, resource.summaryEn,
      resource.publisher, resource.category, resource.categoryZh, resource.stage,
      resource.stageZh, resource.region].join(" "),
  }));
  const kits: IndexedItem[] = fieldKits.map((kit) => ({
    id: `kit:${kit.slug}`, kind: "kit", title: kit.title, summary: kit.summary,
    category: kit.category, url: `/field-kits/${kit.slug}`,
    status: `Preview only — ${kit.status}`,
    searchText: [kit.title, kit.chinese, kit.subtitle, kit.summary, kit.category,
      kit.stage, kit.problemSolved, ...kit.highlights,
      ...kit.items.flatMap((item) => [item.name, item.nameZh, item.description])].join(" "),
  }));
  const approved = approvedPublicResearch(research).map((item) => ({
    ...item, searchText: [item.title, item.summary, item.category].join(" "),
  }));
  return [...articles, ...resources, ...kits, ...approved];
}

export function searchResearch(params: URLSearchParams, catalog = buildResearchCatalog()) {
  const query = params.get("q")?.trim() ?? "";
  const kind = params.get("kind") ?? "all";
  const category = params.get("category") ?? "";
  const limitText = params.get("limit") ?? "20";
  const offsetText = params.get("offset") ?? "0";
  if (query.length > 200 || category.length > 100
    || !["all", "article", "resource", "kit", "research"].includes(kind)
    || !/^\d{1,2}$/.test(limitText) || +limitText < 1 || +limitText > 50
    || !/^\d{1,5}$/.test(offsetText)) {
    return { status: 400, body: { error: "Invalid search parameters. Use q (max 200), kind, category, limit (1–50) and offset (0–99999)." } };
  }
  const terms = normalize(query).split(/\s+/u).filter(Boolean);
  const matches = catalog.filter((item) => {
    const text = normalize(item.searchText);
    return (kind === "all" || kind === item.kind)
      && (!category || category === item.category)
      && terms.every((term) => text.includes(term));
  }).sort((a, b) => {
    const score = (item: IndexedItem) => terms.reduce((sum, term) => sum + (normalize(item.title).includes(term) ? 1 : 0), 0);
    return score(b) - score(a) || (b.updatedAt ?? "").localeCompare(a.updatedAt ?? "") || a.id.localeCompare(b.id);
  });
  const results = matches.slice(+offsetText, +offsetText + +limitText).map(({ searchText: _text, ...item }) => {
    void _text;
    return item;
  });
  return { status: 200, body: {
    query, kind, category, total: matches.length, limit: +limitText, offset: +offsetText, results,
    categories: [...new Set(catalog.map((item) => item.category))].sort(),
    researchBridge: { mode: "curated-public-exports", available: catalog.filter((item) => item.kind === "research").length,
      liveResearch: false },
  } };
}
