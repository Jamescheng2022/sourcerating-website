/** Real Chromium regression probes using local, dependency-free HTML fixtures. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
import { buildGeometryScript, resolveChromePath } from './cdp-capture-harness.mjs';

const css = fs.readFileSync('src/app/globals.css', 'utf8');
const topicsSource = fs.readFileSync('src/lib/topics.ts', 'utf8');
const topics = JSON.parse(topicsSource.match(/export const topics = (\[.*?\]);/s)[1]);
const escapeHtml = (s) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const nav = `<header><nav aria-label="Article topics" class="editorial-topics">${topics.map((t, i) => `<a href="#topic-${i}">${escapeHtml(t)}</a>`).join('')}</nav></header>`;
const fixture = `<style>*{box-sizing:border-box}body{margin:0}${css}</style>${nav}`;
const script = `
  const results = [];
  const check = (condition, message) => { if (!condition) throw new Error(message); };
  (async () => {
    for (const width of [320, 375, 390, 430, 1280]) {
      const frame = document.createElement('iframe');
      frame.style.cssText = 'border:0;width:' + width + 'px;height:400px';
      const loaded = new Promise(resolve => frame.onload = resolve);
      frame.srcdoc = ${JSON.stringify(fixture)};
      document.body.append(frame);
      await loaded;
      const w = frame.contentWindow, d = w.document;
      const measure = () => w.eval(${JSON.stringify(buildGeometryScript())});
      const reset = () => { d.body.innerHTML = ${JSON.stringify(nav)}; d.body.style.cssText = ''; d.documentElement.style.cssText = ''; };
      const bounded = () => { const m = measure(); check(m.clientWidth === width && m.scrollWidth === width && m.overflowingElementsCount === 0, 'bounded scroll content at ' + width + ': ' + JSON.stringify(m)); };
      bounded();
      const scroller = d.querySelector('nav');
      const links = [...scroller.querySelectorAll('a')];
      const rawOverflowCount = links.filter(a => a.getBoundingClientRect().right > width + 1).length;
      if (width < 600) check(rawOverflowCount > 0, 'fixture must reproduce the old false positive');
      for (const link of links) {
        link.focus();
        const rect = link.getBoundingClientRect();
        // Native focus may reveal only part of a link. It must still be visible;
        // separately prove the entire label is reachable by horizontal scrolling.
        check(d.activeElement === link && rect.right > 0 && rect.left < width, 'focused topic must be visible: ' + link.textContent);
        bounded();
        check(w.scrollX === 0, 'focusing a topic must not scroll the page horizontally');
      }
      if (width < 600) check(scroller.scrollLeft > 0, 'last topic must scroll into view');
      for (const link of links) {
        link.scrollIntoView({behavior:'instant', block:'nearest', inline:'nearest'});
        const rect = link.getBoundingClientRect();
        check(rect.left >= -1 && rect.right <= width + 1, 'full topic label must be scroll-reachable: ' + link.textContent);
        bounded();
        check(w.scrollX === 0, 'revealing a topic must not scroll the page horizontally');
      }
      scroller.scrollLeft = 0;
      bounded();
      results.push({width, probe:'all topics focus-visible and full labels scroll-reachable; root width unchanged', rawOverflowCount, links:links.length});

      const reject = (name, setup, rootOverflow = false) => {
        reset(); setup(); const m = measure();
        check(m.overflowingElementsCount > 0, name + ' must retain element overflow failure at ' + width);
        if (rootOverflow) check(m.hasHorizontalOverflow && m.scrollWidth > width, name + ' must retain root overflow failure');
        results.push({width, probe:name, rejected:true});
      };
      const add = (style, parent = d.body) => { const el = d.createElement('div'); el.style.cssText = style; el.textContent = 'overflow probe'; parent.append(el); return el; };
      reject('ordinary wide content', () => add('width:' + (width + 100) + 'px;height:20px'), true);
      reject('left-side overflow', () => add('width:40px;height:20px;position:relative;left:-80px'));
      reject('root overflow hidden is not an exemption', () => { d.documentElement.style.overflowX = 'hidden'; add('width:' + (width + 100) + 'px;height:20px'); });
      for (const overflow of ['hidden', 'clip', 'visible']) {
        reject('non-scrollable ' + overflow + ' container', () => { const box = add('width:100%;overflow-x:' + overflow); add('width:80px;margin-left:' + (width + 20) + 'px', box); });
      }
      reject('oversized scroller', () => { const box = add('display:flex;width:' + (width + 100) + 'px;overflow-x:auto'); add('flex:0 0 1000px', box); }, true);
      reject('scroller clipped by a narrower ancestor', () => {
        const outer = add('width:100px;overflow-x:hidden');
        const box = add('display:flex;width:' + width + 'px;overflow-x:auto', outer);
        for (let i = 0; i < 20; i++) add('flex:0 0 80px;height:20px', box);
      });
      reject('fixed descendant escapes scroll clip', () => { const box = add('width:100%;overflow-x:auto'); add('width:2000px', box); add('position:fixed;left:' + (width + 20) + 'px;width:40px;height:20px', box); });
      reject('absolute descendant escapes scroll clip', () => { const box = add('width:100%;overflow-x:auto'); add('width:2000px', box); add('position:absolute;left:' + (width + 20) + 'px;width:40px;height:20px', box); });
      reset();
      const scroll = add('display:flex;width:100%;overflow-x:scroll;border:3px solid black;padding:4px');
      for (let i = 0; i < 20; i++) add('flex:0 0 80px;height:20px', scroll);
      bounded(); scroll.scrollLeft = scroll.scrollWidth; bounded();
      results.push({width, probe:'bordered scroll container at both ends', passed:true});
      frame.remove();
    }
    document.querySelector('#result').textContent = btoa(JSON.stringify({status:'PASS',results}));
  })().catch(error => { document.querySelector('#result').textContent = btoa(JSON.stringify({status:'FAIL',error:error.message,results})); });
`;
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'sr-overflow-browser-'));
const html = path.join(tempDir, 'fixture.html');
fs.writeFileSync(html, `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; frame-src 'self' about:; script-src 'unsafe-inline' 'unsafe-eval'; style-src 'unsafe-inline'"><pre id="result">PENDING</pre><script>${script.replaceAll('</script', '<\\/script')}</script>`);
let completed = false;
try {
  const result = spawnSync(resolveChromePath(), [
    '--headless=new', '--no-sandbox', '--disable-gpu', '--no-first-run',
    '--disable-background-networking', '--disable-extensions', '--disable-sync',
    '--no-proxy-server', '--host-resolver-rules=MAP * ~NOTFOUND',
    '--user-data-dir=' + path.join(tempDir, 'profile'), '--dump-dom',
    '--virtual-time-budget=5000', pathToFileURL(html).href
  ], {encoding:'utf8', timeout:30000, maxBuffer:8 * 1024 * 1024, windowsHide:true});
  completed = result.status !== null;
  assert.equal(result.status, 0, result.error?.message || result.stderr);
  const encoded = result.stdout.match(/<pre id="result">([A-Za-z0-9+/=]+)<\/pre>/)?.[1];
  assert.ok(encoded && encoded !== 'PENDING', 'Browser probes did not finish: ' + result.stdout.slice(0, 500));
  const receipt = JSON.parse(Buffer.from(encoded, 'base64').toString('utf8'));
  console.log(JSON.stringify(receipt, null, 2));
  assert.equal(receipt.status, 'PASS', receipt.error);
} finally {
  if (completed) fs.rmSync(tempDir, {recursive:true, force:true});
  else console.error('Browser exit unconfirmed; temporary evidence retained at ' + tempDir);
}
