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

test("HomeSearch.tsx conforms to accessibility, touch target, and security constraints", () => {
  const source = fs.readFileSync(path.join(root, "src/components/home/HomeSearch.tsx"), "utf8");

  // Touch target checks
  assert.ok(source.includes("min-h-[48px]"), "Input should have >=44px touch height");
  assert.ok(source.includes("min-h-[38px]"), "Button should have adequate touch height");
  assert.ok(source.includes("min-h-[36px]"), "Filters should have accessible touch height");
  assert.ok(source.includes("min-h-[32px]"), "Links should have minimum touch height");

  // Accessibility checks
  assert.ok(source.includes('role="search"'), "Search form should have role=search");
  assert.ok(source.includes('aria-label="Search industrial sourcing database"'), "Form has aria-label");
  assert.ok(source.includes('role="status"'), "Loading state has role=status");
  assert.ok(source.includes('role="alert"'), "Error state has role=alert");
  assert.ok(source.includes('role="region"'), "Empty state has accessible container");
  assert.ok(source.includes('htmlFor="home-search-input"'), "Input has accessible label association");

  // Responsive boundary checks
  assert.ok(source.includes("break-words"), "Results should break long words safely");
  assert.ok(source.includes("overflow-x-auto"), "Filters scroll horizontally on mobile");

  // HyperResearch honesty check
  assert.ok(source.includes("0 live") || source.includes("0 currently live"), "Explicitly shows 0 live HyperResearch");
  assert.ok(source.includes("HyperResearch"), "Mentions HyperResearch bridge");
  assert.ok(
    !source.includes("new HyperResearchClient"),
    "No illegal upstream client instantiated"
  );

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
