// Regression checks for the authorized content-site/photo revision.
// Original prose and slugs are compared with the pre-redesign main snapshot.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import ts from 'typescript';
import sharp from 'sharp';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const base='16d749fef5875e46f0f423999e4632321bcf4015';
const baselineDir=process.env.SR_BASELINE_SOURCE;
function loadRegistry({baseline=false,raw=false}={}) {
 const cache=new Map();
 function load(file) {
  if(cache.has(file))return cache.get(file);
  let source;
  if(baseline){if(baselineDir)source=fs.readFileSync(path.join(baselineDir,file),'utf8');else{const r=spawnSync('git',['show',`${base}:${file}`],{cwd:root});assert.equal(r.status,0,`Cannot read baseline ${file}`);source=r.stdout.toString();}}
  else source=fs.readFileSync(path.join(root,file),'utf8');
  if(file.endsWith('.json'))return JSON.parse(source);
  const out=ts.transpileModule(source,{fileName:file,compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}});
  const m={exports:{}};cache.set(file,m.exports);
  function requireLocal(id){
   if(id==='node:crypto')return {createHash:crypto.createHash};
   if(id==='react/jsx-runtime')return {jsx:(type,props,key)=>({type,props,key}),jsxs:(type,props,key)=>({type,props,key}),Fragment:'fragment'};
   if(id==='next/image'||id==='next/link')return {__esModule:true,default:id};
   if(id==='next/navigation')return {notFound:()=>{throw Error('NOT_FOUND')}};
   if(id==='lucide-react')return new Proxy({},{get:(_,name)=>name});
   if(raw&&id==='@/lib/editorial-media')return {applyEditorialMedia:p=>p};
   assert.ok(id.startsWith('@/'),`Unexpected import ${id}`);
   const name='src/'+id.slice(2);return load(name.endsWith('.json')?name:fs.existsSync(path.join(root,name+'.ts'))?name+'.ts':name+'.tsx');
  }
  vm.runInNewContext(out.outputText,{module:m,exports:m.exports,require:requireLocal,URL,Date},{filename:file,timeout:5000});return m.exports;
 }
 return load;
}
const plain=x=>JSON.parse(JSON.stringify(x));
let checks=0;const check=(name,fn)=>{fn();checks++;console.log('PASS '+name)};
const before=loadRegistry({baseline:true}),raw=loadRegistry({raw:true}),after=loadRegistry();
const old=before('src/data/blog.ts').blogPosts,rawPosts=raw('src/data/blog.ts').blogPosts,posts=after('src/data/blog.ts').blogPosts;
check('all original slugs, dates, text and references remain unchanged',()=>{for(const p of old)assert.deepEqual(plain(rawPosts.find(x=>x.slug===p.slug)),plain(p));});
check('new registry has no duplicate slugs',()=>assert.equal(new Set(posts.map(p=>p.slug)).size,posts.length));
const ledger=JSON.parse(fs.readFileSync(path.join(root,'docs/editorial-photo-provenance-20261104.json'),'utf8'));
check('curated media files are distinct and hash-verified',()=>{assert.equal(new Set(ledger.map(x=>x.sha256)).size,ledger.length);for(const x of ledger){assert.ok(x.source&&x.author&&x.license);assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'public',x.src))).digest('hex'),x.sha256);}});
for(const p of posts){
 assert.ok(p.coverImage,`Missing individual cover ${p.slug}`);
 const images=[p.coverImage,...(p.articleBody||[]).filter(b=>b.type==='illustration'),...(p.photoSections||[])];
 for(const im of images){const bytes=fs.readFileSync(path.join(root,'public',im.src));const info=await sharp(bytes).metadata();assert.ok(['jpeg','png','webp','avif'].includes(info.format),`Not raster: ${im.src}`);assert.equal(im.width,info.width);assert.equal(im.height,info.height);assert.ok(im.alt&&im.caption);await sharp(bytes).raw().toBuffer();}
 const page=after('src/app/blog/[slug]/page.tsx');const metadata=plain(await page.generateMetadata({params:Promise.resolve({slug:p.slug})}));
 assert.equal(metadata.alternates.canonical,`https://www.sourcerating.com/blog/${p.slug}`);assert.equal(metadata.openGraph.images[0].url,`https://www.sourcerating.com${p.coverImage.src}`);
 const tree=await page.default({params:Promise.resolve({slug:p.slug})});assert.equal(tree.props['data-publication-sha256'],crypto.createHash('sha256').update(JSON.stringify(p)).digest('hex'));checks++;
}
check('missing article still returns notFound',()=>{});
let missing=false;try{await after('src/app/blog/[slug]/page.tsx').default({params:Promise.resolve({slug:'missing-test'})});}catch(e){missing=e.message==='NOT_FOUND';}assert.ok(missing);
const feed=after('src/components/editorial/ArticleFeed.tsx').ArticleFeed;
const countCards=v=>!v||typeof v!=='object'?0:Array.isArray(v)?v.reduce((n,x)=>n+countCards(x),0):(v.type==='article'?1:0)+countCards(v.props?.children);
check('article feed renders every article',()=>assert.equal(countCards(feed({posts})),posts.length));
check('topic navigation filters the article feed',()=>{const count=countCards(feed({posts,topic:'Markets'}));assert.ok(count>0&&count<posts.length)});
check('search returns only the calibrated gauge article',()=>assert.equal(countCards(feed({posts,query:'calibrated'})),1));
check('no old service slogan or duplicate topic sidebar in shared shell',()=>{const header=fs.readFileSync(path.join(root,'src/components/layout/Header.tsx'),'utf8');assert.ok(!/Free Risk Screen|Factory Risk Checks/.test(header));assert.equal((header.match(/<nav /g)||[]).length,1);});
console.log(JSON.stringify({status:'PASS',checks,originalArticles:old.length,registeredArticles:posts.length,mediaFiles:ledger.length,baseline:base,scope:'Original text, media bytes, source rendering, metadata and search; browser geometry checked separately.'},null,2));
