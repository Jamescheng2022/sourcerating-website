import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';

const root = path.resolve(import.meta.dirname, '..');
const cache = new Map();
const forbidden = () => { throw new Error('Search must not fetch, log or read environment variables'); };
function load(file) {
  if (cache.has(file)) return cache.get(file).exports;
  const source = fs.readFileSync(file, 'utf8');
  if (file.endsWith('.json')) return JSON.parse(source);
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
  });
  const compiledModule = { exports: {} };
  cache.set(file, compiledModule);
  vm.runInNewContext(compiled.outputText, {
    module: compiledModule, exports: compiledModule.exports, URL, URLSearchParams, Response,
    fetch: forbidden, console: { log: forbidden, error: forbidden, warn: forbidden },
    process: new Proxy({}, { get: forbidden }),
    require(id) {
      assert.ok(id.startsWith('.') || id.startsWith('@/'), `Unexpected dependency: ${id}`);
      const base = id.startsWith('@/') ? path.join(root, 'src', id.slice(2)) : path.resolve(path.dirname(file), id);
      const resolved = [base, `${base}.ts`].find(candidate => fs.existsSync(candidate));
      assert.ok(resolved, `Missing dependency: ${id}`);
      return load(resolved);
    },
  }, { filename: file });
  return compiledModule.exports;
}
const lib = load(path.join(root, 'src/lib/research-catalog.ts'));
const route = load(path.join(root, 'src/app/api/research/search/route.ts'));
const catalog = lib.buildResearchCatalog();
const query = value => lib.searchResearch(new URLSearchParams(value), catalog);

test('catalog contains all current articles, 14 official resources and 3 preview kits', () => {
  const { blogPosts } = load(path.join(root, 'src/data/blog.ts'));
  assert.equal(catalog.filter(item => item.kind === 'article').length, blogPosts.length);
  assert.equal(catalog.filter(item => item.kind === 'resource').length, 14);
  assert.equal(catalog.filter(item => item.kind === 'kit').length, 3);
  assert.ok(catalog.filter(item => item.kind === 'kit').every(item => item.status.startsWith('Preview only')));
  assert.equal(new Set(catalog.map(item => item.id)).size, catalog.length);
});

test('search works across article bodies, Chinese resources and kit contents', () => {
  assert.ok(query('q=ASTM+A123&kind=article').body.results.length > 0);
  assert.ok(query('q=炉号&kind=kit').body.results.length > 0);
  assert.ok(query('q=碳关税&kind=resource').body.results.length > 0);
  const item = catalog.find(item => item.kind === 'article' && item.searchText.includes('ISO 9001'));
  assert.ok(item);
  assert.ok(query('q=ISO+9001&kind=article').body.results.some(result => result.id === item.id));
  assert.equal(query('q=zzzz-no-match-123').body.total, 0);
});

test('filter intersections, Unicode normalization, paging and stable results', () => {
  const category = catalog.find(item => item.kind === 'kit').category;
  const result = query(new URLSearchParams({ kind: 'kit', category }));
  assert.ok(result.body.results.length > 0);
  assert.ok(result.body.results.every(item => item.kind === 'kit' && item.category === category));
  assert.equal(query('q=ＡＳＴＭ').body.total, query('q=astm').body.total);
  const first = query('limit=2').body;
  const second = query('limit=2&offset=2').body;
  assert.equal(first.results.length, 2);
  assert.equal(first.total, second.total);
  assert.ok(second.results.every(item => !first.results.some(previous => previous.id === item.id)));
  assert.equal(JSON.stringify(first), JSON.stringify(query('limit=2').body));
  assert.equal(query('offset=99999').body.results.length, 0);
});

test('reject excessive or invalid search parameters without reflecting input', () => {
  for (const params of ['kind=private', 'limit=0', 'limit=51', 'limit=1.5', 'offset=-1', 'offset=100000',
    `q=${'a'.repeat(201)}`, `category=${'a'.repeat(101)}`]) {
    assert.equal(query(params).status, 400, params);
    assert.deepEqual(Object.keys(query(params).body), ['error']);
  }
});

const approved = {
  id: 'synthetic-export', title: 'Synthetic public research fixture', excerpt: 'Synthetic excerpt',
  category: 'Verification', publicUrl: 'https://www.sourcerating.com/blog/synthetic-fixture',
  qaStatus: 'approved', rightToPublish: true, sourceDate: '2026-10-24', reviewedAt: '2026-10-26',
  provenance: [{ title: 'Published evidence', url: 'https://sourcerating.com/blog/synthetic-evidence' }],
  privateNotes: 'DO-NOT-EXPORT', internalJobId: 'private-job',
};
test('research bridge is empty by default and exports only approved public projections', () => {
  assert.equal(query('').body.researchBridge.available, 0);
  assert.equal(query('').body.researchBridge.liveResearch, false);
  const result = lib.approvedPublicResearch([approved, approved]);
  assert.equal(result.length, 1);
  assert.ok(!JSON.stringify(result).includes('DO-NOT-EXPORT'));
  assert.ok(!JSON.stringify(result).includes('private-job'));
  const searched = lib.searchResearch(new URLSearchParams('kind=research&q=synthetic'), lib.buildResearchCatalog([approved]));
  assert.equal(searched.body.total, 1);
});

test('unapproved exports, private hosts, malformed dates and missing provenance fail closed', () => {
  for (const patch of [
    { qaStatus: 'pending' }, { rightToPublish: false }, { reviewedAt: '2026-02-30' },
    { sourceDate: '2026-10-27' }, { provenance: [] }, { excerpt: '<script>bad</script>' },
    ...['http://localhost/private', 'https://127.0.0.1/private', 'https://10.0.0.1/private',
      'https://sourcerating.com.evil.example/blog/a', 'https://user:secret@sourcerating.com/blog/a',
      'https://sourcerating.com/api/private', 'https://sourcerating.com/blog/a?token=secret'].map(publicUrl => ({ publicUrl })),
    { provenance: [{ title: 'Private vault', url: 'https://10.0.0.1/vault' }] },
  ]) assert.equal(lib.approvedPublicResearch([{ ...approved, ...patch }]).length, 0, JSON.stringify(patch));
  assert.equal(lib.approvedPublicResearch(null).length, 0);
});

test('real HTTP handler returns bounded JSON without full index/private fields', async () => {
  const response = route.GET(new Request('https://sourcerating.com/api/research/search?q=steel&limit=3'));
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  const body = await response.json();
  assert.ok(body.results.length <= 3);
  assert.ok(body.results.every(item => !('searchText' in item)));
  assert.equal(route.GET(new Request('https://sourcerating.com/api/research/search?limit=999')).status, 400);
});

test('procurement resource classification integrity: zero substring false-positives for screening and DO-01', () => {
  const { officialResources } = load(path.join(root, 'src/data/free-resources.ts'));
  assert.equal(officialResources.length, 14);

  // 1. Stage "screening" must match ONLY CO-01 (U.S. Consolidated Screening List)
  const screeningResources = officialResources.filter(r => r.stageKey === 'screening');
  assert.equal(screeningResources.length, 1, 'Counterparty screening must match strictly 1 resource');
  assert.equal(screeningResources[0].id, 'CO-01', 'Counterparty screening must match strictly CO-01, zero tariff compliance false positives');

  // CO-01 must strictly target US destination (not Global)
  const co01 = officialResources.find(r => r.id === 'CO-01');
  assert.ok(co01, 'CO-01 must exist');
  assert.deepEqual(Array.from(co01.destinations), ['US'], 'CO-01 destinations must strictly be US only');
  assert.equal(co01.destinations.includes('Global'), false, 'CO-01 must NOT have Global tag');
  assert.deepEqual(Array.from(co01.sectors), ['compliance']);
  assert.equal(co01.stageKey, 'screening');

  // 2. DO-01 (Common Export Documents Guide) must match US, Global, logistics, shipment
  const do01 = officialResources.find(r => r.id === 'DO-01');
  assert.ok(do01, 'DO-01 must exist');
  assert.ok(do01.destinations.includes('US'), 'DO-01 must match US destination');
  assert.ok(do01.destinations.includes('Global'), 'DO-01 must match Global destination');
  assert.ok(do01.sectors.includes('logistics'), 'DO-01 must match logistics sector');
  assert.equal(do01.stageKey, 'shipment', 'DO-01 stage must be shipment');

  // 3. Stage "shipment" must match DO-01 and DO-02 only
  const shipmentResources = officialResources.filter(r => r.stageKey === 'shipment');
  assert.deepEqual(Array.from(shipmentResources.map(r => r.id)), ['DO-01', 'DO-02']);

  // 4. Stage "deposit" must match SR-01 and DO-03 only
  const depositResources = officialResources.filter(r => r.stageKey === 'deposit');
  assert.deepEqual(Array.from(depositResources.map(r => r.id)), ['SR-01', 'DO-03']);

  // 5. Stage "technical" must match CB-01, CB-02, CB-03
  const technicalResources = officialResources.filter(r => r.stageKey === 'technical');
  assert.deepEqual(Array.from(technicalResources.map(r => r.id)), ['CB-01', 'CB-02', 'CB-03']);

  // 6. Stage "cost" must match CB-04, TR-01, TR-02, TR-03, TR-04, TR-05
  const costResources = officialResources.filter(r => r.stageKey === 'cost');
  assert.deepEqual(Array.from(costResources.map(r => r.id)), ['CB-04', 'TR-01', 'TR-02', 'TR-03', 'TR-04', 'TR-05']);

  // 7. Fixed mapping test for all 14 resources (destinations and sectors fixed integrity)
  const expectedTags = {
    'SR-01': { destinations: ['Global'], sectors: ['manufacturing', 'steel'], stageKey: 'deposit' },
    'CB-01': { destinations: ['EU'], sectors: ['steel'], stageKey: 'technical' },
    'CB-02': { destinations: ['EU'], sectors: ['steel'], stageKey: 'technical' },
    'CB-03': { destinations: ['EU'], sectors: ['steel'], stageKey: 'technical' },
    'CB-04': { destinations: ['EU'], sectors: ['steel'], stageKey: 'cost' },
    'TR-01': { destinations: ['EU', 'Global'], sectors: ['manufacturing', 'compliance'], stageKey: 'cost' },
    'TR-02': { destinations: ['EU'], sectors: ['compliance', 'manufacturing'], stageKey: 'cost' },
    'TR-03': { destinations: ['US'], sectors: ['compliance', 'manufacturing'], stageKey: 'cost' },
    'TR-04': { destinations: ['UK'], sectors: ['compliance', 'manufacturing'], stageKey: 'cost' },
    'DO-01': { destinations: ['US', 'Global'], sectors: ['logistics'], stageKey: 'shipment' },
    'DO-02': { destinations: ['US'], sectors: ['logistics'], stageKey: 'shipment' },
    'DO-03': { destinations: ['Global'], sectors: ['logistics', 'compliance'], stageKey: 'deposit' },
    'CO-01': { destinations: ['US'], sectors: ['compliance'], stageKey: 'screening' },
    'TR-05': { destinations: ['US'], sectors: ['compliance', 'manufacturing'], stageKey: 'cost' },
  };

  for (const [id, expected] of Object.entries(expectedTags)) {
    const res = officialResources.find(r => r.id === id);
    assert.ok(res, `Resource ${id} must exist in officialResources`);
    assert.deepEqual(Array.from(res.destinations), expected.destinations, `${id} destinations must match fixed expectation`);
    assert.deepEqual(Array.from(res.sectors), expected.sectors, `${id} sectors must match fixed expectation`);
    assert.equal(res.stageKey, expected.stageKey, `${id} stageKey must match fixed expectation`);
  }

  // Steel sector integrity
  const steelResources = officialResources.filter(r => r.sectors.includes('steel'));
  assert.deepEqual(Array.from(steelResources.map(r => r.id)), ['SR-01', 'CB-01', 'CB-02', 'CB-03', 'CB-04'], 'Steel sector must match exactly SR-01 and CB-01 to CB-04');

  // Tariffs resources integrity
  const tariffResources = officialResources.filter(r => r.id.startsWith('TR-'));
  assert.equal(tariffResources.length, 5, 'Must have exactly 5 tariff resources (TR-01 to TR-05)');
  assert.ok(tariffResources.every(r => r.stageKey === 'cost'), 'All tariff resources must be categorized under cost stage');
});
