/** Actual React + Chromium tests. Kit is always intercepted and mocked; no email is submitted. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import http from 'node:http';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {createRequire} from 'node:module';
import ts from 'typescript';
import {resolveChromePath, buildGeometryScript} from './cdp-capture-harness.mjs';

const require = createRequire(import.meta.url);
const {webpack} = require('next/dist/compiled/webpack/webpack');
const kitUrl = 'https://sourcerating.kit.com/43bff6853a/index.js';
const originArg = process.argv.find(a => a.startsWith('--origin='))?.slice(9);
const evidenceDir = process.argv.find(a => a.startsWith('--evidence-dir='))?.slice(15);
if (originArg) assert.equal(new URL(originArg).hostname, '127.0.0.1', 'Only task-owned localhost may be tested');
const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'sr-newsletter-test-'));
const results = [], requests = [], blocked = [], exceptions = [];
const component = fs.readFileSync('src/components/editorial/NewsletterSignup.tsx', 'utf8');
fs.writeFileSync(path.join(scratch, 'component.js'), ts.transpileModule(component, {compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2020}}).outputText);
fs.writeFileSync(path.join(scratch, 'entry.js'), `
const React = require('react');
const {createRoot} = require('react-dom/client');
const {flushSync} = require('react-dom');
const {NewsletterSignup} = require('./component');
let root;
window.fixture = {
  mount(count = 1, strict = true) {
    if (root) root.unmount();
    root = createRoot(document.getElementById('root'));
    flushSync(() => root.render(React.createElement(strict ? React.StrictMode : React.Fragment, null,
      ...Array.from({length: count}, (_, i) => React.createElement(NewsletterSignup, {key:i})))));
  },
  unmount() { if (root) { root.unmount(); root = null; } }
};`);

let chrome, socket, server, exited = false;
const pending = new Map(); let sequence = 0;
let mode = 'ready', held = [];
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++sequence;
  const timer = setTimeout(() => { pending.delete(id); reject(Error('CDP timeout: ' + method)); }, 12000);
  pending.set(id, {resolve,reject,timer});
  socket.send(JSON.stringify({id,method,params}));
});
const evaluate = async expression => {
  const r = await send('Runtime.evaluate', {expression,awaitPromise:true,returnByValue:true});
  assert.ok(!r.exceptionDetails, r.exceptionDetails?.exception?.description);
  return r.result.value;
};
const pause = ms => new Promise(r => setTimeout(r, ms));
async function until(expression, label, timeout = 5000) {
  const start = Date.now();
  do { if (await evaluate(expression)) return; await pause(50); } while (Date.now()-start < timeout);
  throw Error('Timed out: ' + label);
}
const probe = (name, details = {}) => { results.push({name,...details}); console.log('PASS ' + name); };
const mockScript = delay => `(() => {
  const mount = document.currentScript.parentElement;
  window.mockExecutions = window.mockExecutions || [];
  window.mockExecutions.push({connected:mount.isConnected, source:'LOCAL MOCK, NOT KIT'});
  setTimeout(() => {
    const form = document.createElement('form'); form.dataset.mockProvider = 'true';
    form.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;width:100%;max-width:700px';
    const input = document.createElement('input'); input.type = 'email'; input.placeholder = 'Mock email field — no submission';
    input.setAttribute('aria-label','Mock email field'); input.style.cssText = 'flex:1 1 150px;min-width:0;max-width:100%';
    const button = document.createElement('button'); button.type = 'submit'; button.textContent = 'Mock subscribe';
    form.addEventListener('submit', e => {e.preventDefault();throw Error('Submission is forbidden in this test');});
    form.append(input,button); mount.append(form);
  }, ${delay});
})();`;
const fulfill = (id, body) => send('Fetch.fulfillRequest',{requestId:id,responseCode:200,responseHeaders:[{name:'Content-Type',value:'application/javascript'},{name:'Cache-Control',value:'no-store'}],body:Buffer.from(body).toString('base64')});

try {
  await new Promise((resolve,reject) => {
    const compiler = webpack({mode:'development',target:'web',entry:path.join(scratch,'entry.js'),output:{path:scratch,filename:'bundle.js'},resolve:{modules:[path.resolve('node_modules')]},devtool:false});
    compiler.run((error,stats) => compiler.close(() => error || stats.hasErrors() ? reject(error || Error(stats.toString({all:false,errors:true}))) : resolve()));
  });
  const css = fs.readFileSync('src/app/globals.css','utf8');
  server = http.createServer((req,res) => {
    if (req.url === '/bundle.js') { res.setHeader('Content-Type','application/javascript'); res.end(fs.readFileSync(path.join(scratch,'bundle.js'))); }
    else { res.setHeader('Content-Type','text/html'); res.end('<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{box-sizing:border-box}body{margin:0;padding:16px}'+css+'</style><div id="root"></div><script src="/bundle.js"></script>'); }
  }).listen(0,'127.0.0.1');
  await once(server,'listening');
  const fixtureOrigin = 'http://127.0.0.1:' + server.address().port;
  chrome = spawn(resolveChromePath(), ['--headless=new','--no-sandbox','--disable-gpu','--no-first-run','--disable-background-networking','--disable-sync','--disable-extensions','--no-proxy-server','--remote-debugging-address=127.0.0.1','--remote-debugging-port=0','--user-data-dir='+path.join(scratch,'profile')], {stdio:['ignore','ignore','pipe'],windowsHide:true});
  chrome.once('exit', () => {exited = true;});
  const endpoint = await new Promise((resolve,reject) => {
    let stderr = ''; const timer = setTimeout(() => reject(Error('Chrome startup timeout')),10000);
    chrome.stderr.on('data', b => {stderr += b; const m=stderr.match(/DevTools listening on (ws:\/\/127\.0\.0\.1:\d+\/devtools\/browser\/\S+)/);if(m){clearTimeout(timer);resolve(m[1]);}});
    chrome.once('error', e=>{clearTimeout(timer);reject(e);});
  });
  const browserOrigin = endpoint.replace('ws:','http:').split('/devtools/')[0];
  const version = await (await fetch(browserOrigin+'/json/version')).json();
  assert.equal(version.webSocketDebuggerUrl,endpoint,'Own Chrome endpoint');
  const target = await (await fetch(browserOrigin+'/json/new?about:blank',{method:'PUT'})).json();
  socket = new WebSocket(target.webSocketDebuggerUrl);
  await once(socket,'open');
  socket.onmessage = ({data}) => {
    const message = JSON.parse(data);
    if (message.id && pending.has(message.id)) {
      const p=pending.get(message.id);pending.delete(message.id);clearTimeout(p.timer);
      if(message.error)p.reject(Error(JSON.stringify(message.error)));else p.resolve(message.result);
    }
    if (message.method === 'Runtime.exceptionThrown') exceptions.push(message.params.exceptionDetails);
    if (message.method === 'Fetch.requestPaused') {
      const {requestId,request} = message.params;
      (async () => {
        if (request.url === kitUrl) {
          requests.push({mode,method:request.method,url:request.url});
          assert.equal(request.method,'GET');
          if(mode==='hold'){held.push(requestId);return;}
          if(mode==='error')return send('Fetch.failRequest',{requestId,errorReason:'Failed'});
          return fulfill(requestId, mockScript(mode==='late'?21000:0));
        }
        const u = new URL(request.url);
        if(u.origin===fixtureOrigin || (originArg && u.origin===new URL(originArg).origin)) return send('Fetch.continueRequest',{requestId});
        blocked.push(request.url);
        return send('Fetch.failRequest',{requestId,errorReason:'AccessDenied'});
      })().catch(error=>exceptions.push({text:error.message}));
    }
  };
  await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable');
  await send('Network.setCacheDisabled',{cacheDisabled:true});
  await send('Fetch.enable',{patterns:[{urlPattern:'*',requestStage:'Request'}]});
  await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
  await send('Page.navigate',{url:fixtureOrigin});
  await until('!!window.fixture','real React fixture');
  await evaluate('fixture.mount()');
  await until('document.querySelectorAll("form").length===1 && !document.querySelector("[role=status]")','StrictMode ready');
  await pause(200);
  assert.equal(requests.length,1,'StrictMode must start just one provider request');
  assert.deepEqual(await evaluate('(()=>{const s=document.querySelector("script[data-uid]");return {async:s.async,uid:s.dataset.uid,src:s.src}})()'),{async:true,uid:'43bff6853a',src:kitUrl});
  probe('actual React StrictMode: one script request, one ready mock form, exact embed attributes');
  await evaluate('fixture.mount(2)');
  await until('document.querySelectorAll("form").length===2','two independent mounts');
  assert.equal(await evaluate('new Set([...document.querySelectorAll(".editorial-newsletter")].map(x=>x.getAttribute("aria-labelledby"))).size'),2);
  const metrics=await evaluate(buildGeometryScript());
  assert.equal(metrics.scrollWidth,390);assert.equal(metrics.overflowingElementsCount,0);
  probe('two mounted widgets have unique headings and isolated mock forms; 390px no overflow');
  await evaluate('fixture.unmount()');
  const before=requests.length;
  await evaluate('fixture.mount(); fixture.unmount()'); await pause(150);
  assert.equal(requests.length,before);
  probe('immediate unmount cancels deferred script insertion');
  mode='hold';await evaluate('fixture.mount()');
  const holdStart=Date.now();while(!held.length && Date.now()-holdStart<5000)await pause(30);
  assert.equal(held.length,1);
  await evaluate('fixture.unmount()');mode='ready';await evaluate('fixture.mount()');
  // Chromium may coalesce identical pending script URLs. Release the old request
  // after remounting, then assert that stale execution cannot populate the new host.
  for(const id of held.splice(0))await fulfill(id,mockScript(0));
  await until('document.querySelectorAll("form").length===1','replacement mount');
  await pause(200);assert.equal(await evaluate('document.querySelectorAll("form").length'),1);
  probe('late response after unmount cannot add a mock form to the replacement mount');
  mode='error';await evaluate('fixture.mount()');
  await until('document.querySelector("[role=status]")?.textContent.includes("could not load")','script error state');
  assert.equal(await evaluate('document.querySelectorAll("form").length'),0);
  probe('blocked/failed provider script shows error, never subscription success');
  mode='late';await evaluate('fixture.mount()');
  await pause(200);assert.match(await evaluate('document.querySelector("[role=status]").textContent'),/Loading/);
  await until('document.querySelector("[role=status]")?.textContent.includes("could not load")','real 20-second watchdog',22000);
  probe('loaded script without a form remains loading, then real 20-second timeout shows error');
  await until('document.querySelectorAll("form").length===1 && !document.querySelector("[role=status]")','late rendered form',3000);
  probe('late rendered mock form recovers from timeout');
  await evaluate('fixture.unmount()');

  if (originArg) {
    mode='ready';
    const ready='document.querySelectorAll(".editorial-newsletter form").length===1 && !document.querySelector(".editorial-newsletter [role=status]")';
    await send('Page.navigate',{url:originArg+'/'});await until(ready,'homepage mock form',10000);
    assert.equal(await evaluate('(()=>{let n=0;for(let x=document.querySelector(".editorial-newsletter").previousElementSibling;x;x=x.previousElementSibling)if(x.matches("article.editorial-card"))n++;return n})()'),3);
    probe('actual Next home: single newsletter after third article');
    const articlePath='/blog/calibration-sticker-measurement-tolerance';
    await evaluate(`document.querySelector('a[href="${articlePath}"]').click()`);
    await until(`location.pathname===${JSON.stringify(articlePath)} && (${ready})`,'client article navigation',10000);
    assert.equal(await evaluate('document.querySelector(".editorial-newsletter").previousElementSibling.tagName'),'ASIDE');
    await evaluate('history.back()');await until(`location.pathname==='/' && (${ready})`,'Back navigation',10000);
    await evaluate('history.forward()');await until(`location.pathname===${JSON.stringify(articlePath)} && (${ready})`,'Forward navigation',10000);
    const articleMetrics=await evaluate(buildGeometryScript());assert.equal(articleMetrics.scrollWidth,390);assert.equal(articleMetrics.overflowingElementsCount,0);
    probe('actual Next client navigation / Back / Forward: exactly one mock form; article placement and 390px geometry');
    await send('Page.navigate',{url:originArg+'/blog/plywood-crate-solid-wood-skids-ispm15'});
    await until(ready,'crate article mock form',10000);
    for(const [index,suffix,caption] of [[1,'body0','support and forklift-entry geometry'],[2,'body1','photographed ISPM 15 mark']]) {
      await evaluate(`document.querySelectorAll('figure')[${index}].scrollIntoView({behavior:'instant',block:'center'})`);
      await until(`(()=>{const img=document.querySelectorAll('figure')[${index}].querySelector('img');return img?.complete && img.naturalWidth>0})()`,'crate image decode',10000);
      await evaluate(`document.querySelectorAll('figure')[${index}].querySelector('img').decode()`);
      const figure=await evaluate(`(()=>{const f=document.querySelectorAll('figure')[${index}];return {src:f.querySelector('img').currentSrc,caption:f.querySelector('figcaption').textContent,rect:f.getBoundingClientRect().toJSON()}})()`);
      assert.ok(decodeURIComponent(figure.src).includes('plywood-crate-solid-wood-skids-ispm15-'+suffix+'.jpg'));
      assert.ok(figure.caption.includes(caption));assert.ok(figure.rect.left>=0 && figure.rect.right<=390 && figure.rect.top>=0 && figure.rect.bottom<=844);
      if(evidenceDir){fs.mkdirSync(evidenceDir,{recursive:true});const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync(path.join(evidenceDir,'crate-'+suffix+'-390px.png'),Buffer.from(shot.data,'base64'));}
      probe('actual 390px crate '+suffix+' source/caption and visible viewport verified',figure);
    }
    await send('Page.navigate',{url:originArg+'/?q=calibrated'});await until(ready,'one-result feed',10000);
    assert.equal(await evaluate('document.querySelectorAll("article.editorial-card").length'),1);
    assert.equal(await evaluate('document.querySelector(".editorial-newsletter").previousElementSibling.tagName'),'ARTICLE');
    probe('one-result actual feed ends with newsletter');
    const countBefore=requests.length;
    await send('Page.navigate',{url:originArg+'/?q=zzzz-no-article-result'});
    await until('document.body.textContent.includes("No matching articles")','empty feed',10000);await pause(300);
    assert.equal(await evaluate('document.querySelectorAll(".editorial-newsletter").length'),0);assert.equal(requests.length,countBefore);
    probe('zero-result actual feed has no newsletter and starts no provider request');
  }
  assert.deepEqual(exceptions,[],'No unhandled page/test errors');
  console.log(JSON.stringify({status:'PASS',provider:'LOCAL MOCK ONLY; real Kit not requested or verified',realEmailSubmissions:0,results,providerRequests:requests.length,blockedExternalRequests:blocked},null,2));
} finally {
  socket?.close();
  for(const p of pending.values()){clearTimeout(p.timer);p.reject(Error('Test closing'));}pending.clear();
  if(chrome && !exited){chrome.kill();await Promise.race([once(chrome,'exit'),pause(5000)]);}
  if(server)await new Promise(resolve=>server.close(resolve));
  if(!chrome || exited){assert.equal(path.dirname(scratch),path.resolve(os.tmpdir()));fs.rmSync(scratch,{recursive:true,force:true});}
  else throw Error('Owned Chrome exit unconfirmed; retained '+scratch);
}
