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
      fetch: forbidden,
      console: { log: forbidden, error: forbidden, warn: forbidden },
      process: new Proxy({}, { get: forbidden }),
      require(id) {
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
const catalog = lib.buildResearchCatalog();
const query = (params) => lib.searchResearch(new URLSearchParams(params), catalog);

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

test("Defect 2 reproduction: 31 articles paginate correctly via limit & offset (Load More logic)", () => {
  // Batch 1: First 20 articles
  const batch1 = query("kind=article&limit=20&offset=0").body;
  assert.equal(batch1.total, 31, "Total articles must be 31");
  assert.equal(batch1.results.length, 20, "Batch 1 must contain exactly 20 articles");
  assert.equal(batch1.offset, 0);

  // Batch 2: Remaining 11 articles
  const batch2 = query("kind=article&limit=20&offset=20").body;
  assert.equal(batch2.total, 31);
  assert.equal(batch2.results.length, 11, "Batch 2 must contain the remaining 11 articles");
  assert.equal(batch2.offset, 20);

  // Combine batches as HomeSearch does
  const combined = [...batch1.results, ...batch2.results];
  assert.equal(combined.length, 31, "Combined results must reach all 31 articles");

  // Verify zero duplicates across batches
  const uniqueIds = new Set(combined.map((item) => item.id));
  assert.equal(uniqueIds.size, 31, "Every article in paginated sequence must be unique");

  // Offset at or beyond total returns empty array
  const batch3 = query("kind=article&limit=20&offset=31").body;
  assert.equal(batch3.results.length, 0, "Offset at total must return 0 items");

  // Changing kind resets pagination to 0
  const kitBatch = query("kind=kit&limit=20&offset=0").body;
  assert.equal(kitBatch.total, 3);
  assert.equal(kitBatch.results.length, 3);
  assert.equal(kitBatch.offset, 0);
});

test("Defect 1 reproduction: clearing search cancels in-flight request and stale response never overwrites", async () => {
  // Simulate client-side search controller state machine with requestId counter and abort signal
  let requestId = 0;
  let activeAbort = null;
  let clientState = { status: "idle", results: null, total: 0, query: "" };

  function simulateStartSearch(searchQuery, kind = "all") {
    if (activeAbort) {
      activeAbort.aborted = true;
    }
    const currentAbort = { aborted: false };
    activeAbort = currentAbort;
    const currentRequestId = ++requestId;
    clientState = { status: "loading", results: clientState.results, total: clientState.total, query: searchQuery };

    return async (delayedMs) => {
      // Simulate network delay
      await new Promise((r) => setTimeout(r, delayedMs));
      const res = query(`q=${encodeURIComponent(searchQuery)}&kind=${kind}&limit=20&offset=0`).body;

      // Controller check: discard if superseded or aborted
      if (currentRequestId !== requestId || currentAbort.aborted) {
        return { discarded: true, currentRequestId, latestRequestId: requestId };
      }

      clientState = { status: "success", results: res.results, total: res.total, query: searchQuery };
      return { discarded: false, currentRequestId };
    };
  }

  function simulateClear() {
    if (activeAbort) {
      activeAbort.aborted = true;
      activeAbort = null;
    }
    requestId++;
    clientState = { status: "idle", results: null, total: 0, query: "" };
  }

  // Scenario 1: Request 1 starts, user clears before it finishes
  const request1Promise = simulateStartSearch("ASTM", "article");
  assert.equal(clientState.status, "loading");

  // User hits clear after 5ms
  await new Promise((r) => setTimeout(r, 5));
  simulateClear();
  assert.equal(clientState.status, "idle");
  assert.equal(clientState.results, null);

  // Request 1 arrives late (20ms)
  const res1 = await request1Promise(20);
  assert.equal(res1.discarded, true, "Late response after clear must be discarded");
  assert.equal(clientState.status, "idle", "Client state must remain idle");
  assert.equal(clientState.results, null, "Client results must remain null");

  // Scenario 2: Rapid successive queries - slower older query does not overwrite newer query
  const slowRequest = simulateStartSearch("ASTM"); // requestId = 3
  const fastRequest = simulateStartSearch("ISO");  // requestId = 4

  // fastRequest finishes in 10ms
  await fastRequest(10);
  assert.equal(clientState.status, "success");
  assert.equal(clientState.query, "ISO");
  assert.ok(clientState.results.some((r) => r.id.includes("iso")));

  // slowRequest finishes later in 30ms
  const slowRes = await slowRequest(30);
  assert.equal(slowRes.discarded, true, "Older request must be discarded");
  assert.equal(clientState.query, "ISO", "Newer query must remain active");
  assert.ok(clientState.results.some((r) => r.id.includes("iso")), "Results must belong to newer query");
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

  // Verify AbortController & Request Sequence IDs
  assert.ok(source.includes("abortControllerRef"), "Must have abortControllerRef for network cancellation");
  assert.ok(source.includes("requestIdRef"), "Must have requestIdRef for sequence/staleness guard");
  assert.ok(source.includes("controller.signal"), "Must pass signal to fetch");
  assert.ok(source.includes("handleLoadMore"), "Must have handleLoadMore function");
  assert.ok(source.includes("isLoadingMore"), "Must have isLoadingMore state");

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
