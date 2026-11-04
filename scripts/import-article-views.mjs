// Import a completed, public-domain-only GA4 article page-view report.
// No analytics credentials are embedded in this repository or browser code.
import fs from 'node:fs';
import assert from 'node:assert/strict';
const args=process.argv.slice(2),arg=name=>args[args.indexOf(name)+1];
assert.ok(args.includes('--input')&&args.includes('--through'),'Required: --input completed-report.json --through YYYY-MM-DD');
const through=arg('--through'),from=args.includes('--from')?arg('--from'):'2026-01-01';
assert.match(from,/^\d{4}-\d{2}-\d{2}$/);assert.match(through,/^\d{4}-\d{2}-\d{2}$/);assert.ok(through>=from);
const report=JSON.parse(fs.readFileSync(arg('--input'),'utf8'));
assert.equal(report.status,'done','Do not import a pending or failed report');assert.ok(Array.isArray(report.data));assert.equal(report.total_rows,report.data.length,'Do not import a truncated report');
const counts={};
for(const row of report.data){
 assert.ok(['sourcerating.com','www.sourcerating.com'].includes(row.hostname),'Only production-domain records are accepted');
 const match=row.page_path.match(/^\/blog\/([a-z0-9-]+)\/?$/);assert.ok(match,'Unexpected article URL: '+row.page_path);
 const value=Number(row.screen_page_views);assert.ok(Number.isSafeInteger(value)&&value>=0,'Invalid page-view count');
 counts[match[1]]=(counts[match[1]]||0)+value;
}
const snapshot={source:'Google Analytics 4',periodStart:from,periodEnd:through,updatedAt:new Date().toLocaleDateString('en-CA',{timeZone:'Asia/Bangkok'}),metric:'screen_page_views',counts};
fs.writeFileSync('src/data/article-views.json',JSON.stringify(snapshot,null,2)+'\n');
console.log(`Imported ${Object.keys(counts).length} article records through ${through}. Repeated page views count; this is not unique readers or a live counter.`);
