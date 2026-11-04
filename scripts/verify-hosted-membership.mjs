// Offline checks of the actual TypeScript functions and HTTP boundary. Synthetic
// fixtures only; never reads/mutates real process.env or contacts a checkout.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

let checks = 0;
async function check(name, fn) {
  await fn();
  checks++;
  console.log(`PASS ${name}`);
}
const fixture = 'https://sr-synthetic-fixture.gumroad.com/l/sr_synthetic_membership';
const destination = `${fixture}?wanted=true`;
const environment = {};
let environmentReads = [];
const forbidden = () => { throw new Error('Unexpected network or logging side effect'); };
function load(file, imports = {}) {
  const source = fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
  const result = ts.transpileModule(source, {
    fileName: file,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    reportDiagnostics: true,
  });
  assert.equal((result.diagnostics ?? []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0);
  const compiledModule = { exports: {} };
  vm.runInNewContext(result.outputText, {
    module: compiledModule, exports: compiledModule.exports, URL, Headers, Response,
    process: { env: new Proxy(environment, {
      get(target, key) { environmentReads.push(key); return target[key]; },
      set() { throw new Error('Unexpected environment mutation'); },
    }) },
    fetch: forbidden, console: { log: forbidden, warn: forbidden, error: forbidden },
    require(id) { assert.ok(Object.hasOwn(imports, id), `Unexpected import ${id}`); return imports[id]; },
  }, { filename: file });
  return compiledModule.exports;
}
const lib = load('src/lib/hosted-membership.ts');
const route = load('src/app/go/membership/route.ts', { '@/lib/hosted-membership': lib });
await check('dynamic handler, no environment reads at module load', () => {
  assert.equal(route.dynamic, 'force-dynamic');
  assert.deepEqual(environmentReads, []);
});
for (const enabled of [undefined, '', 'false', 'TRUE', '1', ' true ', 'unapproved']) {
  await check(`disabled flag ${String(enabled)}`, () => {
    assert.equal(lib.resolveHostedMembershipUrl({ enabled, url: fixture }), null);
  });
}
const invalid = [
  undefined, '', ' ', 'not a URL',
  'http://gumroad.com/l/synthetic', 'javascript:alert(1)',
  'https://localhost/l/synthetic', 'https://127.0.0.1/l/synthetic',
  'https://gumroad.com.evil.example/l/synthetic', 'https://evilgumroad.com/l/synthetic',
  'https://gumroad.com@evil.example/l/synthetic', 'https://user@gumroad.com/l/synthetic',
  'https://user:pass@gumroad.com/l/synthetic', 'https://gumroad.com:443/l/synthetic',
  'https://gumroad.com:8443/l/synthetic', 'https://gumroad.com./l/synthetic',
  'https://a.b.gumroad.com/l/synthetic', 'https://-bad.gumroad.com/l/synthetic',
  'https://bad-.gumroad.com/l/synthetic', 'https://gumroad.com/l/',
  'https://gumroad.com/l/synthetic/extra', 'https://gumroad.com/l/synthetic/',
  'https://gumroad.com/other/synthetic', 'https://gumroad.com/l/../synthetic',
  'https://gumroad.com/x/../l/synthetic', 'https://gumroad.com/l/%66imaf',
  'https://gumroad.com/l/%73ynthetic', 'https://gumroad.com/l/a%2Fb',
  'https://gumroad.com/l/a%252Fb', 'https://gumroad.com/l/a%5Cb',
  'https://gumroad.com/l/synthetic\\extra', 'https:\\gumroad.com\\l\\synthetic',
  ' https://gumroad.com/l/synthetic', 'https://gumroad.com/l/synthetic\n',
  'https://gumroad.com/l/fimaf', 'https://gumroad.com/l/FIMAF',
  'https://gumroad.com/l/fi-maf', 'https://gumroad.com/l/no-god-owns-me',
  'https://gumroad.com/l/nogodownsme-fiction', 'https://nogodownsme.gumroad.com/l/other',
  'https://no-god-owns-me.gumroad.com/l/other', 'https://nogodwinsme.gumroad.com/l/other',
];
for (const [index, url] of invalid.entries()) {
  await check(`reject invalid or wrong-brand fixture ${index + 1}`, () => {
    assert.equal(lib.resolveHostedMembershipUrl({ enabled: 'true', url }), null);
  });
}
for (const url of [fixture, `${fixture}?email=private%40example.invalid&price=1&wanted=false#secret`]) {
  await check('valid synthetic destination strips configuration query and fragment', () => {
    assert.equal(lib.resolveHostedMembershipUrl({ enabled: 'true', url }), destination);
  });
}
await check('root Gumroad host is structurally valid, not seller/product approval', () => {
  assert.equal(lib.resolveHostedMembershipUrl({ enabled: 'true', url: 'https://gumroad.com/l/synthetic_fixture' }),
    'https://gumroad.com/l/synthetic_fixture?wanted=true');
});
async function assertHeaders(response) {
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.equal(response.headers.get('referrer-policy'), 'no-referrer');
  assert.equal(response.headers.get('x-robots-tag'), 'noindex, nofollow');
  assert.equal(response.headers.get('set-cookie'), null);
}
for (const config of [{}, { enabled: 'true' }, { enabled: 'false', url: fixture },
  { enabled: 'true', url: invalid[34] }, { enabled: 'true', url: 'https://evil.example/l/synthetic' }]) {
  await check('unavailable HTTP response exposes no destination', async () => {
    const response = lib.createHostedMembershipResponse(config);
    assert.equal(response.status, 503);
    assert.equal(response.headers.get('location'), null);
    await assertHeaders(response);
    assert.equal(await response.text(), 'Membership checkout is unavailable.');
  });
}
await check('enabled fixture returns only 303 destination, no payment/access assertion', async () => {
  const response = lib.createHostedMembershipResponse({ enabled: 'true', url: fixture });
  assert.equal(response.status, 303);
  assert.equal(response.headers.get('location'), destination);
  assert.equal(await response.text(), '');
  await assertHeaders(response);
});
for (const enabled of [undefined, 'true']) {
  await check(`HTTP route ignores malicious client query, repeated requests; enabled=${enabled}`, async () => {
    environment.SOURCERATING_MEMBERSHIP_ENABLED = enabled;
    environment.SOURCERATING_MEMBERSHIP_URL = fixture;
    const before = JSON.stringify(environment);
    environmentReads = [];
    for (let i = 0; i < 3; i++) {
      const request = new Request('https://www.sourcerating.example/go/membership?success=true&url=https://evil.example&email=private@example.invalid&price=1');
      const response = route.GET(request);
      assert.equal(response.status, enabled === 'true' ? 303 : 503);
      assert.equal(response.headers.get('location'), enabled === 'true' ? destination : null);
      await assertHeaders(response);
      const body = await response.text();
      assert.ok(!body.includes('private') && !body.includes('success') && !body.includes('evil'));
    }
    assert.equal(JSON.stringify(environment), before);
    assert.deepEqual(environmentReads, Array.from({ length: 3 }, () =>
      ['SOURCERATING_MEMBERSHIP_ENABLED', 'SOURCERATING_MEMBERSHIP_URL']).flat());
  });
}
console.log(JSON.stringify({ status: 'PASS', checks, scope: 'Offline synthetic fixtures; transpiled actual source and native HTTP Responses. No provider, account, checkout, lifecycle, runtime Next server, build, browser or revenue acceptance.' }));
