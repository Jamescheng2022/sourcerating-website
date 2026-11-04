export type ResearchKind = "all" | "article" | "resource" | "kit" | "research";

export interface SearchResultItem {
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

export interface SearchResponse {
  query: string;
  kind: string;
  category: string;
  total: number;
  limit: number;
  offset: number;
  results: SearchResultItem[];
  categories: string[];
  researchBridge: {
    mode: string;
    available: number;
    liveResearch: boolean;
  };
}

export interface HomeSearchState {
  query: string;
  activeKind: ResearchKind;
  submittedQuery: string;
  submittedKind: ResearchKind;
  results: SearchResultItem[] | null;
  total: number;
  status: "idle" | "loading" | "success" | "empty" | "error";
  errorMessage: string | null;
  isLoadingMore: boolean;
  loadMoreError: string | null;
}

export const INITIAL_SEARCH_STATE: HomeSearchState = {
  query: "",
  activeKind: "all",
  submittedQuery: "",
  submittedKind: "all",
  results: null,
  total: 0,
  status: "idle",
  errorMessage: null,
  isLoadingMore: false,
  loadMoreError: null,
};

/**
 * Checks whether the current text input differs from the query that produced the current results.
 */
export function isSearchInputDirty(liveQuery: string, submittedQuery: string): boolean {
  return liveQuery.trim() !== submittedQuery.trim();
}

/**
 * Builds the exact parameters for paginating the current result set.
 * Always pins to the submitted query and submitted kind baseline, never unsubmitted input.
 */
export function getPaginationParams(state: {
  submittedQuery: string;
  submittedKind: ResearchKind;
  currentCount: number;
  limit?: number;
}): { q: string; kind: ResearchKind; offset: number; limit: number } {
  return {
    q: state.submittedQuery.trim(),
    kind: state.submittedKind,
    offset: state.currentCount,
    limit: state.limit ?? 20,
  };
}

export function formatSearchUrl(params: {
  q?: string;
  kind?: ResearchKind;
  limit?: number;
  offset?: number;
}): string {
  const searchParams = new URLSearchParams();
  if (params.q) searchParams.set("q", params.q);
  if (params.kind && params.kind !== "all") searchParams.set("kind", params.kind);
  if (params.limit !== undefined) searchParams.set("limit", String(params.limit));
  if (params.offset !== undefined) searchParams.set("offset", String(params.offset));
  const qs = searchParams.toString();
  return `/api/research/search${qs ? `?${qs}` : ""}`;
}

/**
 * Pure state reducer / manager for search interactions.
 * Shared between HomeSearch component and regression tests.
 */
export class HomeSearchManager {
  private state: HomeSearchState;
  private requestId = 0;
  private abortController: AbortController | null = null;
  private fetchFn: typeof fetch;
  private onStateChange?: (state: HomeSearchState) => void;

  constructor(options: {
    initialState?: Partial<HomeSearchState>;
    fetchFn?: typeof fetch;
    onStateChange?: (state: HomeSearchState) => void;
  } = {}) {
    this.state = { ...INITIAL_SEARCH_STATE, ...options.initialState };
    this.fetchFn = options.fetchFn ?? ((url, init) => fetch(url, init));
    this.onStateChange = options.onStateChange;
  }

  public getState(): HomeSearchState {
    return { ...this.state };
  }

  private updateState(patch: Partial<HomeSearchState>) {
    this.state = { ...this.state, ...patch };
    this.onStateChange?.(this.state);
  }

  public setQuery(query: string) {
    this.updateState({ query });
  }

  public setActiveKind(activeKind: ResearchKind) {
    this.updateState({ activeKind });
  }

  public async search(searchQuery: string, kind: ResearchKind): Promise<boolean> {
    const trimmed = searchQuery.trim();

    // Cancel in-flight request
    if (this.abortController) {
      this.abortController.abort();
    }
    const currentRequestId = ++this.requestId;

    // Empty query and 'all' resets to idle
    if (!trimmed && kind === "all") {
      this.updateState({
        query: "",
        activeKind: "all",
        submittedQuery: "",
        submittedKind: "all",
        results: null,
        total: 0,
        status: "idle",
        errorMessage: null,
        isLoadingMore: false,
        loadMoreError: null,
      });
      return true;
    }

    this.updateState({
      query: searchQuery,
      activeKind: kind,
      submittedQuery: trimmed,
      submittedKind: kind,
      status: "loading",
      errorMessage: null,
      isLoadingMore: false,
      loadMoreError: null,
    });

    const controller = new AbortController();
    this.abortController = controller;

    try {
      const url = formatSearchUrl({ q: trimmed, kind, limit: 20, offset: 0 });
      const res = await this.fetchFn(url, { signal: controller.signal });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        if (currentRequestId === this.requestId) {
          this.updateState({
            status: "error",
            errorMessage: errData.error || `Search failed with status ${res.status}`,
          });
        }
        return false;
      }

      const data: SearchResponse = await res.json();
      if (currentRequestId === this.requestId && !controller.signal.aborted) {
        const results = data.results || [];
        this.updateState({
          results,
          total: data.total ?? 0,
          status: results.length === 0 ? "empty" : "success",
        });
        return true;
      }
      return false;
    } catch (err) {
      if (
        !(err instanceof Error && err.name === "AbortError") &&
        currentRequestId === this.requestId
      ) {
        this.updateState({
          status: "error",
          errorMessage: err instanceof Error ? err.message : "Network error.",
        });
      }
      return false;
    }
  }

  public async loadMore(): Promise<boolean> {
    const { results, total, isLoadingMore, submittedQuery, submittedKind, query } = this.state;
    if (isLoadingMore || !results || results.length >= total) return false;

    // Disallow pagination if live input is dirty
    if (isSearchInputDirty(query, submittedQuery)) {
      return false;
    }

    this.updateState({ isLoadingMore: true, loadMoreError: null });

    const currentRequestId = ++this.requestId;
    const controller = new AbortController();
    this.abortController = controller;

    // Use strict pagination params based on submittedQuery and submittedKind
    const pagingParams = getPaginationParams({
      submittedQuery,
      submittedKind,
      currentCount: results.length,
      limit: 20,
    });

    try {
      const url = formatSearchUrl(pagingParams);
      const res = await this.fetchFn(url, { signal: controller.signal });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        if (currentRequestId === this.requestId) {
          this.updateState({
            isLoadingMore: false,
            loadMoreError: errData.error || `Failed to load more (status ${res.status})`,
          });
        }
        return false;
      }

      const data: SearchResponse = await res.json();
      if (currentRequestId === this.requestId && !controller.signal.aborted) {
        const newResults = [...results, ...(data.results || [])];
        this.updateState({
          results: newResults,
          total: data.total ?? total,
          isLoadingMore: false,
        });
        return true;
      }
      return false;
    } catch (err) {
      if (
        !(err instanceof Error && err.name === "AbortError") &&
        currentRequestId === this.requestId
      ) {
        this.updateState({
          isLoadingMore: false,
          loadMoreError: err instanceof Error ? err.message : "Failed to load more.",
        });
      }
      return false;
    }
  }

  public clear() {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
    this.requestId++;
    this.updateState({
      query: "",
      activeKind: "all",
      submittedQuery: "",
      submittedKind: "all",
      results: null,
      total: 0,
      status: "idle",
      errorMessage: null,
      isLoadingMore: false,
      loadMoreError: null,
    });
  }
}
