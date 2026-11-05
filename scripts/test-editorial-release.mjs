import assert from 'node:assert/strict';
import {test} from 'node:test';
import fs from 'node:fs';
import vm from 'node:vm';
import {createRequire} from 'node:module';
import ts from 'typescript';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';

const nativeRequire=createRequire(import.meta.url), cache=new Map();
function load(file) {
  if(cache.has(file))return cache.get(file).exports;
  if(file.endsWith('.json'))return JSON.parse(fs.readFileSync(file,'utf8'));
  const source=fs.readFileSync(file,'utf8');
  const code=ts.transpileModule(source,{fileName:file,compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText;
  const module={exports:{}};cache.set(file,module);
  const requireLocal=id=>{
    if(id==='next/link')return {__esModule:true,default:({children,...props})=>React.createElement('a',props,children)};
    if(!id.startsWith('@/'))return nativeRequire(id);
    const base='src/'+id.slice(2);
    return load(base.endsWith('.json')?base:fs.existsSync(base+'.ts')?base+'.ts':base+'.tsx');
  };
  vm.runInNewContext(code,{module,exports:module.exports,require:requireLocal,URL,Date},{filename:file,timeout:5000});
  return module.exports;
}
const {normalizeArticleFeedParams}=load('src/lib/article-feed-params.ts');
const {ArticleFeed}=load('src/components/editorial/ArticleFeed.tsx');
const {blogPosts}=load('src/data/blog.ts');
const home=load('src/app/page.tsx'), blog=load('src/app/blog/page.tsx'), about=load('src/app/about/page.tsx');
const {ArticleViews}=load('src/components/editorial/ArticleViews.tsx');

test('view labels preserve verified counts, distinguish missing/out-of-period data and expose period to assistive technology',()=>{
  const expected={
    'plywood-crate-solid-wood-skids-ispm15':5,
    'calibration-sticker-measurement-tolerance':2,
    'salt-spray-hours-not-service-life':2,
    'supplier-hs-code-destination-import-classification':2,
  };
  for(const [slug,count] of Object.entries(expected)){
    const html=renderToStaticMarkup(React.createElement(ArticleViews,{slug,publishedAt:'2026-11-03'}));
    assert.ok(html.includes(count+' views'));
    assert.match(html,/class="sr-only"/);assert.match(html,/2026-01-01 to 2026-11-03/);assert.match(html,/not realtime/);
  }
  for(const props of [{slug:'missing',publishedAt:'2026-10-01'},{slug:'calibration-sticker-measurement-tolerance',publishedAt:'2026-11-04'}]){
    const html=renderToStaticMarkup(React.createElement(ArticleViews,props));assert.match(html,/Views not yet available/);assert.doesNotMatch(html,/>0 views/);
  }
  const newPosts=blogPosts.filter(p=>p.date>'2026-11-03');assert.equal(newPosts.length,9);
  for(const post of newPosts)assert.match(renderToStaticMarkup(React.createElement(ArticleViews,{slug:post.slug,publishedAt:post.date})),/Views not yet available/);
});

test('first repeated q/topic value wins, including empty values; whitespace trimmed and unknown topics reset',()=>{
  const cases=[
    [{q:['calibration','steel'],topic:['Markets','Quality & Inspection']},{query:'calibration',topic:'Markets'}],
    [{q:['','steel'],topic:['','Markets']},{query:'',topic:'All'}],
    [{q:[],topic:[]},{query:'',topic:'All'}],
    [{q:'  calibrated ',topic:'unknown'},{query:'calibrated',topic:'All'}],
    [{},{query:'',topic:'All'}]
  ];
  for(const [input,expected] of cases)assert.deepEqual(JSON.parse(JSON.stringify(normalizeArticleFeedParams(input))),expected);
});
test('real React SSR feed accepts repeated q and topic without a TypeError',()=>{
  for(const props of [{query:['calibrated','steel']},{topic:['Markets','Quality & Inspection']},{query:['','steel'],topic:['unknown','Markets']}]){
    const html=renderToStaticMarkup(React.createElement(ArticleFeed,{posts:blogPosts,...props}));
    assert.match(html,/editorial-feed/);
  }
  const html=renderToStaticMarkup(React.createElement(ArticleFeed,{posts:blogPosts,query:['calibrated','steel']}));
  assert.equal((html.match(/class="editorial-card"/g)||[]).length,1);
});
test('home/blog clean canonicals, independent About metadata and noindex/follow filtered variants',async()=>{
  for(const [page,pathname] of [[home,'/'],[blog,'/blog']]){
    for(const [params,index] of [[{},true],[{q:['calibrated','steel']},false],[{topic:['Markets','All']},false],[{q:['','steel'],topic:'unknown'},true]]){
      const meta=await page.generateMetadata({searchParams:Promise.resolve(params)});
      assert.equal(meta.alternates.canonical,'https://www.sourcerating.com'+pathname);
      assert.equal(meta.openGraph.url,meta.alternates.canonical);assert.equal(meta.robots.index,index);assert.equal(meta.robots.follow,true);
    }
  }
  assert.equal(about.metadata.alternates.canonical,'https://www.sourcerating.com/about');
  assert.equal(about.metadata.openGraph.url,about.metadata.alternates.canonical);
  assert.match(about.metadata.title.absolute,/About James Cheng/);
  assert.match(about.metadata.description,/James Cheng/);
});

const origin=process.argv.find(a=>a.startsWith('--origin='))?.slice(9);
if(origin){
  assert.equal(new URL(origin).hostname,'127.0.0.1','Only task-owned localhost is permitted');
  test('actual Next SSR handles duplicate/empty/unknown params and emits correct head metadata',async()=>{
    for(const route of ['/?q=calibration&q=steel','/blog?q=calibration&q=steel','/?topic=Markets&topic=All','/blog?topic=Markets&topic=All','/?q=&q=steel&topic=unknown','/blog?q=&topic=','/?q=calibrated','/','/about']){
      const res=await fetch(origin+route,{headers:{'User-Agent':'Googlebot'}});assert.equal(res.status,200,route);
      const html=await res.text(),head=html.match(/<head>([\s\S]*?)<\/head>/)?.[1];assert.ok(head,route);
      const pathname=route.startsWith('/blog')?'/blog':route==='/about'?'/about':'/';
      const canonical='https://www.sourcerating.com'+pathname;
      assert.ok(head.includes('rel="canonical" href="'+canonical+'"'),route+' canonical');
      assert.ok(head.includes('property="og:url" content="'+canonical+'"'),route+' og:url');
      if(route.includes('q=calib')||route.includes('topic=Markets'))assert.match(head,/<meta name="robots" content="noindex, follow"/);
      if(route==='/about'){assert.match(head,/<title>About James Cheng \| Source Rating<\/title>/);assert.match(head,/name="description" content="Meet James Cheng/);}
      console.log('SSR 200 + canonical/OG/robots verified: '+route);
    }
  });
}
