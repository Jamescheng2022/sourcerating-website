// Read-only HTTP acceptance against an isolated production build. Never touches a merchant.
// Run: npm run build; npm start -- --hostname 127.0.0.1 --port 3100
// Then: node scripts/verify-commercial-delivery.mjs http://127.0.0.1:3100
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const base = new URL(process.argv[2] ?? 'http://127.0.0.1:3100');
assert.ok(['127.0.0.1', 'localhost', '[::1]'].includes(base.hostname) && base.protocol === 'http:',
  'This test is intentionally loopback-only. No merchant, production URL or credentials accepted.');
assert.equal(base.username + base.password + base.search + base.hash, '');
const observations = [];
let checks = 0;
function check(condition, message) { assert.ok(condition, message); checks++; }
function visibleHtml(html) { return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ''); }
async function get(urlPath) {
  const response = await fetch(new URL(urlPath, base), { redirect: 'manual', signal: AbortSignal.timeout(15000) });
  const bytes = Buffer.from(await response.arrayBuffer());
  const observation = { path: urlPath, status: response.status, bytes: bytes.length,
    contentType: response.headers.get('content-type'), location: response.headers.get('location') };
  observations.push(observation);
  return { response, bytes, html: visibleHtml(bytes.toString('utf8')), observation };
}
function hrefs(html) { return [...html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)].map(match => match[1]); }

const resources = await get('/resources');
check(resources.response.status === 200, 'Resource page renders');
const csvPath = '/downloads/sourcerating-resource-index-20261024.csv';
check(hrefs(resources.html).includes(csvPath), 'Rendered resource page links to real CSV');
const playbook = await get('/playbook');
check(playbook.response.status === 200, 'Playbook renders');
const pdfPath = '/downloads/source-rating-engineering-supplier-checklist.pdf';
check(hrefs(playbook.html).includes(pdfPath), 'Rendered playbook links to real PDF');

for (const filePath of [csvPath, pdfPath]) {
  const delivered = await get(filePath);
  check(delivered.response.status === 200, `${filePath} returns 200`);
  const local = fs.readFileSync(path.join(root, 'public', filePath));
  check(local.equals(delivered.bytes), `${filePath} HTTP bytes match committed artifact`);
  delivered.observation.sha256 = crypto.createHash('sha256').update(delivered.bytes).digest('hex');
  if (filePath.endsWith('.pdf')) {
    check(delivered.bytes.subarray(0, 5).toString() === '%PDF-', 'PDF header is valid');
    check(delivered.bytes.subarray(-100).toString().includes('%%EOF'), 'PDF has an EOF marker');
    check(delivered.response.headers.get('content-type')?.includes('application/pdf'), 'PDF served with PDF MIME type');
  } else {
    const rows = delivered.bytes.toString('utf8').trim().split(/\r?\n/);
    check(rows.length === 15, 'CSV contains header + 14 source records');
    check(rows[0].includes('Official source URL'), 'CSV identifies official source URLs');
    check(!delivered.bytes.toString('utf8').includes('\uFFFD'), 'CSV is valid readable UTF-8');
    check(delivered.response.headers.get('content-type')?.includes('text/csv'), 'CSV served with CSV MIME type');
  }
}

const legacy = await get('/checklist');
check(legacy.response.status === 308 && legacy.response.headers.get('location') === '/playbook',
  'Legacy checklist entry preserves the playbook destination');

const membership = await get('/membership');
check(membership.response.status === 200, 'Membership explanation renders');
check(membership.html.includes('Membership is being prepared.'), 'Membership availability is explicit');
check(membership.html.includes('no membership available to'), 'No purchasable membership promise');
check(!hrefs(membership.html).some(href => /gumroad\.com|\/go\/membership/.test(href)), 'No live checkout link on membership page');
for (const query of ['', '?checkout=success', '?success=true&paid=true&membership=active']) {
  const result = await get(`/go/membership${query}`);
  check(result.response.status === 503, 'Disabled redirect cannot be enabled by query parameters');
  check(result.response.headers.get('location') === null, 'Disabled redirect never exposes a merchant URL');
  check(result.response.headers.get('cache-control') === 'no-store', 'Unavailability is not cached');
}
const spoofed = await get('/membership?checkout=success&paid=true');
check(spoofed.html.includes('Membership is being prepared.'), 'Success query string grants no membership UI');

for (const slug of ['steel-mill-test-certificate-audit-kit', 'factory-audit-acceptance-kit', 'cbam-steel-emissions-verification-kit']) {
  const kit = await get(`/field-kits/${slug}`);
  check(kit.response.status === 200, `${slug} renders`);
  const button = [...kit.html.matchAll(/<button\b[^>]*>[\s\S]*?<\/button>/gi)].map(match => match[0])
    .find(value => value.includes('Get Field Kit'));
  check(button && /\bdisabled(?:="")?(?=[\s>])/.test(button), `${slug} purchase control is disabled`);
  check(kit.html.includes('no Gumroad checkout is wired'), `${slug} checkout notice is visible`);
  check(!hrefs(kit.html).some(href => /gumroad\.com|\/go\/membership|\.(?:xlsx|docx|zip)(?:[?#]|$)/i.test(href)),
    `${slug} has no implied paid attachment or checkout link`);
}
console.log(JSON.stringify({ status: 'PASS', checks, scope: 'Loopback production-build HTTP only; not browser, merchant, payment, entitlement or production-release acceptance',
  merchantCalls: 0, validFormSubmissions: 0, observations }, null, 2));
