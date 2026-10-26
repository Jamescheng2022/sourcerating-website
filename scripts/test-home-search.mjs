import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

const root = path.resolve(import.meta.dirname, "..");
const cache = new Map();
const forbidden = () => {
  throw new Error("Forbidden access during isolated search tests");
};

function load(file) {
  if (cache.has(file)) return cache.get(file).exports;
  const source = fs.readFileSync(file, "utf8");
  if (file.endsWith(".json")) return JSON.parse(source);
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
      jsx: ts.JsxEmit.ReactJSX,
    },
  });
  const compiledModule = { exports: {} };
  cache.set(file, compiledModule);
  vm.runInNewContext(
    compiled.outputText,
    {
      module: compiledModule,
      exports: compiledModule.exports,
      URL,
      URLSearchParams,
      Response,
      AbortController,
      window: {
        get gtag() {
          return globalThis.__gtag;
        },
      },
      fetch: forbidden,
      console: { log: forbidden, error: forbidden, warn: forbidden },
      process: new Proxy({}, { get: forbidden }),
      require(id) {
        if (id === "@vercel/analytics") return { track: () => {} };
        assert.ok(id.startsWith(".") || id.startsWith("@/"), `Unexpected dependency: ${id}`);
        const base = id.startsWith("@/")
          ? path.join(root, "src", id.slice(2))
          : path.resolve(path.dirname(file), id);
        const resolved = [base, `${base}.ts`, `${base}.tsx`].find((candidate) =>
          fs.existsSync(candidate)
        );
        assert.ok(resolved, `Missing dependency: ${id}`);
        return load(resolved);
      },
    },
    { filename: file }
  );
  return compiledModule.exports;
}

const lib = load(path.join(root, "src/lib/research-catalog.ts"));
const route = load(path.join(root, "src/app/api/research/search/route.ts"));
const controller = load(path.join(root, "src/lib/home-search-controller.ts"));
const catalog = lib.buildResearchCatalog();
const query = (params) => lib.searchResearch(new URLSearchParams(params), catalog);

function createMockFetch(delayMs = 0) {
  return async (url, init) => {
    if (delayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
    if (init?.signal?.aborted) {
      const err = new Error("This operation was aborted");
      err.name = "AbortError";
      throw err;
    }
    const fullUrl = new URL(url, "https://sourcerating.com");
    return route.GET(new Request(fullUrl.toString(), { signal: init?.signal }));
  };
}

test("B search endpoint delivers 31 articles, 14 official resources and 3 field kits to homepage", () => {
  const allResult = query("").body;
  assert.equal(allResult.total, 48);
  assert.equal(allResult.results.length, 20); // default limit 20
  assert.equal(allResult.researchBridge.available, 0); // HyperResearch honest count 0
  assert.equal(allResult.researchBridge.liveResearch, false);

  const articles = query("kind=article&limit=50").body;
  assert.equal(articles.total, 31);
  assert.ok(articles.results.every((item) => item.kind === "article" && item.url.startsWith("/blog/")));

  const resources = query("kind=resource&limit=50").body;
  assert.equal(resources.total, 14);
  assert.ok(resources.results.every((item) => item.kind === "resource" && item.url.startsWith("http")));

  const kits = query("kind=kit&limit=50").body;
  assert.equal(kits.total, 3);
  assert.ok(kits.results.every((item) => item.kind === "kit" && item.url.startsWith("/field-kits/")));
  assert.ok(kits.results.every((item) => item.status.includes("Preview only")));

  const research = query("kind=research&limit=50").body;
  assert.equal(research.total, 0);
  assert.equal(research.results.length, 0);
});

test("search queries match relevant terms and preserve ranking", () => {
  const astm = query("q=ASTM+A123").body;
  assert.ok(astm.total >= 1);
  assert.ok(
    astm.results.some(
      (r) => r.id === "article:hot-dip-galvanized-steel-china-astm-a123-inspection"
    )
  );

  const mtc = query("q=MTC+Traceability").body;
  assert.ok(mtc.total >= 1);
  assert.ok(mtc.results.some((r) => r.id.includes("mill-test-certificates")));

  const iso = query("q=ISO+9001").body;
  assert.ok(iso.total >= 1);
  assert.ok(iso.results.some((r) => r.id.includes("iso-9001")));
});

test("HTTP GET handler returns JSON with search results matching query", async () => {
  const response = route.GET(
    new Request("https://sourcerating.com/api/research/search?q=ASTM+A123&kind=article&limit=5")
  );
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.ok(data.results.length >= 1);
  assert.ok(data.results.every((r) => r.kind === "article"));
});

test("REAL CONTROLLER: pagination pins to submitted query and rejects unsubmitted input divergence", async () => {
  const manager = new controller.HomeSearchManager({ fetchFn: createMockFetch() });

  // 1. Initial query: fetch articles (total 31, first 20)
  const ok = await manager.search("", "article");
  assert.ok(ok);
  let state = manager.getState();
  assert.equal(state.status, "success");
  assert.equal(state.total, 31);
  assert.equal(state.results.length, 20);
  assert.equal(state.submittedQuery, "");
  assert.equal(state.submittedKind, "article");

  // 2. User types "ISO" into the input box but DOES NOT submit search
  manager.setQuery("ISO");
  state = manager.getState();
  assert.equal(state.query, "ISO");
  assert.equal(state.submittedQuery, "");

  // Assert dirty detection: live query !== submitted query
  assert.equal(controller.isSearchInputDirty(state.query, state.submittedQuery), true);

  // Assert getPaginationParams uses submittedQuery (""), NOT unsubmitted live query ("ISO")
  const params = controller.getPaginationParams({
    submittedQuery: state.submittedQuery,
    submittedKind: state.submittedKind,
    currentCount: state.results.length,
    limit: 20,
  });
  assert.equal(params.q, "");
  assert.equal(params.kind, "article");
  assert.equal(params.offset, 20);

  // LoadMore must be blocked while input is dirty
  const loadMoreAttempt = await manager.loadMore();
  assert.equal(loadMoreAttempt, false, "Load more must refuse to execute while input is unsubmitted/dirty");
  assert.equal(manager.getState().results.length, 20, "Result set must not change");

  // 3. User reverts input back to "" (or clears unsubmitted text)
  manager.setQuery("");
  assert.equal(controller.isSearchInputDirty(manager.getState().query, manager.getState().submittedQuery), false);

  // Now LoadMore proceeds using the submittedQuery baseline ("")
  const loadMoreOk = await manager.loadMore();
  assert.ok(loadMoreOk);
  state = manager.getState();
  assert.equal(state.results.length, 31, "Accumulated results reach all 31 articles");
  assert.equal(state.total, 31);

  // Verify all 31 IDs are unique
  const uniqueIds = new Set(state.results.map((r) => r.id));
  assert.equal(uniqueIds.size, 31, "All 31 paginated articles must be unique");

  // End of results: further loadMore returns false
  const endAttempt = await manager.loadMore();
  assert.equal(endAttempt, false, "Load more returns false when all results are loaded");
});

test("REAL CONTROLLER: clearing search aborts in-flight request and stale response never overwrites", async () => {
  let delay = 30;
  const manager = new controller.HomeSearchManager({
    fetchFn: async (url, init) => {
      await new Promise((r) => setTimeout(r, delay));
      if (init?.signal?.aborted) {
        const err = new Error("Aborted");
        err.name = "AbortError";
        throw err;
      }
      return route.GET(new Request(new URL(url, "https://sourcerating.com").toString()));
    },
  });

  // Start slow search
  delay = 50;
  const searchPromise = manager.search("ASTM", "article");
  assert.equal(manager.getState().status, "loading");

  // Clear search after 5ms
  await new Promise((r) => setTimeout(r, 5));
  manager.clear();
  assert.equal(manager.getState().status, "idle");
  assert.equal(manager.getState().results, null);
  assert.equal(manager.getState().submittedQuery, "");

  // Wait for the slow search to finish
  await searchPromise;
  // Assert state remains completely idle and clean!
  const state = manager.getState();
  assert.equal(state.status, "idle", "Status must remain idle after late response");
  assert.equal(state.results, null, "Results must remain null");
  assert.equal(state.submittedQuery, "");
});

test("Touch Target Audit: HomeSearch.tsx has all interactive targets >= 44px", () => {
  const source = fs.readFileSync(path.join(root, "src/components/home/HomeSearch.tsx"), "utf8");

  // Verify presence of >=44px touch targets
  assert.ok(source.includes("min-h-[48px]"), "Input should have 48px touch height");
  assert.ok(source.includes("min-h-[44px]"), "Interactive elements should have min-h-[44px]");
  assert.ok(source.includes("min-w-[44px]"), "Clear button must have min-w-[44px] touch target");

  // Verify complete elimination of sub-44px touch targets
  assert.ok(!source.includes("min-h-[32px]"), "No elements should have 32px height");
  assert.ok(!source.includes("min-h-[36px]"), "No elements should have 36px height");
  assert.ok(!source.includes("min-h-[38px]"), "No elements should have 38px height");

  // Accessibility checks
  assert.ok(source.includes('role="search"'), "Search form should have role=search");
  assert.ok(source.includes('aria-label="Search industrial sourcing database"'), "Form has aria-label");
  assert.ok(source.includes('role="status"'), "Loading state has role=status");
  assert.ok(source.includes('role="alert"'), "Error state has role=alert");
  assert.ok(source.includes('role="region"'), "Empty state has accessible container");
  assert.ok(source.includes('htmlFor="home-search-input"'), "Input has accessible label association");

  // HyperResearch honesty check
  assert.ok(source.includes("0 live") || source.includes("0 currently live"), "Explicitly shows 0 live HyperResearch");
  assert.ok(source.includes("HyperResearch"), "Mentions HyperResearch bridge");

  // Security checks
  assert.ok(
    source.includes('target="_blank"') && source.includes('rel="noopener noreferrer"'),
    "External links must have rel=noopener noreferrer"
  );
  assert.ok(
    !source.includes("gumroad.com") && !source.includes("checkout"),
    "No commerce or checkout links in search"
  );
});

test("Homepage page.tsx integrates HomeSearch and retains required SEO invariants", () => {
  const homeSource = fs.readFileSync(path.join(root, "src/app/page.tsx"), "utf8");
  assert.ok(homeSource.includes("HomeSearch"), "page.tsx must import and render HomeSearch");
  assert.ok(homeSource.includes("Industrial sourcing, in context."), "h1 title preserved");
  assert.ok(homeSource.includes('href="/blog"'), "Link to /blog preserved");
  assert.ok(homeSource.includes('href="/resources"'), "Link to /resources preserved");
  assert.ok(homeSource.includes('href="/field-kits"'), "Link to /field-kits preserved");
  assert.ok(homeSource.includes('href="/risk-screen"'), "Link to /risk-screen preserved");
});

test("GA4 regression: trackEvent forwards only bounded event labels and strips arbitrary/PII data", () => {
  const analyticsLib = load(path.join(root, "src/lib/analytics.ts"));
  let gtagCalled = false;
  let gtagEvent = "";
  let gtagParams = {};

  globalThis.__gtag = (cmd, eventName, params) => {
    gtagCalled = true;
    gtagEvent = eventName;
    gtagParams = params;
  };

  analyticsLib.trackEvent("cta_click", {
    form: "risk_screen",
    location: "header",
    label: "hero_search",
    email: "user@example.com", // sensitive / PII
    token: "secret_12345", // token
    userInput: "<script>alert(1)</script>", // arbitrary/XSS
    landing_source: "google_search",
  });

  assert.equal(gtagCalled, true);
  assert.equal(gtagEvent, "cta_click");
  assert.equal(gtagParams.form, "risk_screen");
  assert.equal(gtagParams.location, "header");
  assert.equal(gtagParams.label, "hero_search");
  assert.equal(gtagParams.landing_source, "google_search");
  // Sensitive and unapproved keys must be stripped
  assert.equal(gtagParams.email, undefined, "Email must not be forwarded to GA4");
  assert.equal(gtagParams.token, undefined, "Token must not be forwarded to GA4");
  assert.equal(gtagParams.userInput, undefined, "Arbitrary input must not be forwarded to GA4");

  delete globalThis.__gtag;
});

test("GA4 regression: GoogleAnalyticsConsent gates on consent and blocks private paths", () => {
  const consentSource = fs.readFileSync(
    path.join(root, "src/components/analytics/GoogleAnalyticsConsent.tsx"),
    "utf8"
  );
  assert.ok(consentSource.includes("ga4_analytics_consent_v1"), "Consent key must be v1");
  assert.ok(consentSource.includes("/jbxz"), "Must block /jbxz private path");
  assert.ok(consentSource.includes("/admin"), "Must block /admin private path");
  assert.ok(consentSource.includes("ad_storage:'denied'"), "Ad storage must be denied by default");
  assert.ok(consentSource.includes("ad_user_data:'denied'"), "Ad user data must be denied by default");
  assert.ok(consentSource.includes("ad_personalization:'denied'"), "Personalization must be denied by default");
});
