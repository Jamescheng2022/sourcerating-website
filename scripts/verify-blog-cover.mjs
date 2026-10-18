// Regression against the pinned pre-cover baseline. Framework imports are explicit stubs.
// Run with: node scripts/verify-blog-cover.mjs
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import sharp from 'sharp';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASE_REF = '7c2486d654a8e61bf0a173303e753859dc0da8b9';
let checks = 0;
function check(name, fn) { fn(); checks++; console.log(`PASS ${name}`); }
const original = file => {
  const result = spawnSync('git', ['show', BASE_REF + ':' + file], { cwd: root });
  if (result.status !== 0) throw new Error('Cannot read pinned baseline: ' + file);
  return result.stdout;
};
function loader(baseline) {
  const cache = new Map();
  function load(file) {
    if (cache.has(file)) return cache.get(file);
    const code = baseline ? original(file).toString('utf8') : fs.readFileSync(path.join(root,file),'utf8');
    const result = ts.transpileModule(code,{fileName:file,compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.ReactJSX},reportDiagnostics:true});
    const errors = (result.diagnostics??[]).filter(x=>x.category===ts.DiagnosticCategory.Error);
    assert.equal(errors.length,0,`${file}: syntactic diagnostics`);
    const compiledModule = {exports:{}};
    cache.set(file,compiledModule.exports);
    function requireStub(id) {
      if (id==='react/jsx-runtime') return {jsx:(type,props,key)=>({type,props,key}),jsxs:(type,props,key)=>({type,props,key}),Fragment:'fragment'};
      if (id==='next/image') return {__esModule:true,default:'Image'};
      if (id==='next/link') return {__esModule:true,default:'Link'};
      if (id==='next/navigation') return {notFound:()=>{throw new Error('NOT_FOUND');}};
      if (id==='lucide-react') return Object.fromEntries(['ArrowLeft','ArrowRight','Check','ShieldAlert','Calendar','Clock'].map(x=>[x,x]));
      if (id==='@/components/shared/ArticleBody') return {ArticleBody:'ArticleBody'};
      if (id==='@/components/ui/TrackedLink') return {TrackedLink:'TrackedLink'};
      if (id.startsWith('@/')) return load('src/'+id.slice(2)+'.ts');
      throw new Error('Unexpected dependency '+id);
    }
    vm.runInNewContext(result.outputText,{module:compiledModule,exports:compiledModule.exports,require:requireStub,URL,Date},{filename:file});
    return compiledModule.exports;
  }
  return load;
}
const plain = value => JSON.parse(JSON.stringify(value));
function nodes(value, predicate) {
  if (!value || typeof value!=='object') return [];
  if (Array.isArray(value)) return value.flatMap(x=>nodes(x,predicate));
  return [...(predicate(value)?[value]:[]),...nodes(value.props?.children,predicate)];
}
async function main() {
  const before = loader(true), after = loader(false);
  const oldData = before('src/data/blog.ts').blogPosts;
  const data = after('src/data/blog.ts').blogPosts;
  const puSlug = 'polyurethane-screen-panels-china-vs-local';
  const pu = data.find(x=>x.slug===puSlug);
  const oldPage = before('src/app/blog/[slug]/page.tsx');
  const page = after('src/app/blog/[slug]/page.tsx');
  const metadata = after('src/lib/metadata.ts');
  const oldMetadata = before('src/lib/metadata.ts');
  const input = {params:Promise.resolve({slug:puSlug})};
  const meta = plain(await page.generateMetadata(input));
  const tree = await page.default(input);
  const url = 'https://www.sourcerating.com/images/blog/polyurethane-screen-panels-inspection-v2.jpg';
  const caption = 'AI-generated editorial image; not a photograph of a specific supplier or installation.';
  check('only PU receives an explicit cover',()=>assert.deepEqual(plain(data.filter(x=>x.coverImage).map(x=>x.slug)),[puSlug]));
  check('PU body and editorial content unchanged',()=>{const rest=plain(pu);delete rest.coverImage;assert.deepEqual(rest,plain(oldData.find(x=>x.slug===puSlug)));});
  check('PU OG absolute URL, real dimensions and alt',()=>assert.deepEqual(meta.openGraph.images,[{url,width:1600,height:900,alt:pu.coverImage.alt}]));
  check('PU Twitter matches OG image descriptor',()=>assert.deepEqual(meta.twitter.images,meta.openGraph.images));
  check('PU canonical retained',()=>assert.equal(meta.alternates.canonical,'https://www.sourcerating.com/blog/'+puSlug));
  const article = nodes(tree,n=>n.type==='script').map(n=>JSON.parse(n.props.dangerouslySetInnerHTML.__html)).find(x=>x['@type']==='Article');
  check('Article image matches metadata URL, dimensions and caption',()=>assert.deepEqual(article.image,{'@type':'ImageObject',url,width:1600,height:900,caption}));
  check('Article canonical matches metadata',()=>assert.equal(article.mainEntityOfPage,meta.alternates.canonical));
  const covers = nodes(tree,n=>n.type==='Image');
  check('articleBody does not suppress explicit cover',()=>{assert.ok(pu.articleBody);assert.equal(covers.length,1);assert.equal(covers[0].props.src,pu.coverImage.src);assert.equal(nodes(tree,n=>n.type==='ArticleBody').length,1);});
  check('cover intrinsic dimensions/alt and responsive height',()=>{const p=covers[0].props;assert.equal(p.width,1600);assert.equal(p.height,900);assert.equal(p.alt,pu.coverImage.alt);assert.match(p.className,/h-auto w-full/);assert.ok(p.sizes);});
  check('AI caption visibly follows cover',()=>assert.equal(nodes(tree,n=>n.type==='figcaption')[0].props.children,caption));
  const added = data.filter(x => !oldData.some(prev => prev.slug === x.slug));
  check('only the HDG guide is newly registered',()=>assert.deepEqual(plain(added.map(x=>x.slug)),['hot-dip-galvanized-steel-china-astm-a123-inspection']));
  check('new guide preserves editorial evidence',()=>{const p=added[0];assert.ok(p.articleBody.length>15);assert.ok(p.references.length>=6);assert.equal(p.coverImage,undefined);});
  const legacy = oldData.filter(x=>x.slug!==puSlug);
  for (const post of legacy) {
    const params={params:Promise.resolve({slug:post.slug})};
    const oldPost=oldData.find(x=>x.slug===post.slug);
    const actualTree=await page.default(params), expectedTree=await oldPage.default(params);
    const actualMeta=await page.generateMetadata(params), expectedMeta=await oldPage.generateMetadata(params);
    check(`legacy regression: ${post.slug}`,()=>{assert.deepEqual(plain(post),plain(oldPost));assert.deepEqual(plain(actualMeta),plain(expectedMeta));assert.deepEqual(plain(actualTree),plain(expectedTree));});
  }
  for (const ogImage of [undefined,'/custom.jpg']) {
    check(`metadata fallback unchanged: ${ogImage??'default'}`,()=>{const args={title:'Home',description:'test',path:'/',ogImage};assert.deepEqual(plain(metadata.generatePageMetadata(args)),plain(oldMetadata.generatePageMetadata(args)));});
  }
  check('absolute custom image URL remains absolute',()=>assert.equal(metadata.generatePageMetadata({title:'x',description:'y',path:'/x',ogImage:{src:'https://cdn.example.com/a.jpg',width:400,height:300,alt:'a'}}).openGraph.images[0].url,'https://cdn.example.com/a.jpg'));
  const list=after('src/app/blog/page.tsx').default();
  check('list has exactly one correctly matched cover',()=>{const imgs=nodes(list,n=>n.type==='Image');assert.equal(imgs.length,1);assert.equal(imgs[0].props.src,pu.coverImage.src);assert.equal(nodes(list,n=>n.type==='article').length,data.length);});
  check('homepage Git content unchanged (checkout CRLF normalized)',()=>assert.equal(fs.readFileSync(path.join(root,'src/app/page.tsx'),'utf8').replace(/\r\n/g,'\n'),original('src/app/page.tsx').toString('utf8')));
  const puOldTree=await oldPage.default(input);
  check('PU CTA links unchanged',()=>assert.deepEqual(plain(nodes(tree,n=>n.type==='TrackedLink')),plain(nodes(puOldTree,n=>n.type==='TrackedLink'))));
  let did404=false;try {await page.default({params:Promise.resolve({slug:'missing-test'})});}catch(error){did404=error.message==='NOT_FOUND';}
  check('missing article still returns notFound',()=>assert.ok(did404));
  const bytes=fs.readFileSync(path.join(root,'public',pu.coverImage.src));
  const info=await sharp(bytes).metadata();
  check('real JPEG dimensions match all declarations',()=>{assert.equal(info.format,'jpeg');assert.equal(info.width,1600);assert.equal(info.height,900);assert.equal(bytes[0],0xff);assert.equal(bytes[1],0xd8);});
  const asset={derivative:{sha256:'aef330e40b3d9ffb6b039fc3c6ae0a5c20c610376e08d62223eb60833b8754b8'}};
  check('derivative SHA256 matches recorded asset',()=>assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),asset.derivative.sha256));
  const report={status:'PASS',checks,articles:data.length,legacyArticles:legacy.length,toolchain:{typescript:ts.version,sharp:sharp.versions.sharp},scope:'Isolated transpiled source execution with framework stubs; not project typecheck, Next build, HTTP metadata rendering or browser verification.',withoutIndependentCover:legacy.map(x=>({slug:x.slug,title:x.title})),sourceReady:false};
  console.log(JSON.stringify(report, null, 2));
}
main().catch(error=>{console.error(error);process.exitCode=1;});
