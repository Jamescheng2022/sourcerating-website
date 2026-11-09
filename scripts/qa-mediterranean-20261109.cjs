const { chromium } = require('D:\\precastworldv2\\node_modules\\playwright');
(async()=> {
 const b=await chromium.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:true,args:['--no-sandbox']});
 const url='https://www.sourcerating.com/blog/maersk-mediterranean-pss-heavy-load-vgm-november-2026';
 for (const width of [390,768,1440]){
  const p=await b.newPage({viewport:{width,height:860},deviceScaleFactor:1});
  const response=await p.goto(url,{waitUntil:'domcontentloaded',timeout:30000});
  if(width===390) await p.screenshot({path:'D:\\AgentWorkspaces\\sr-publish-20261109\\sr-mobile-qa-20261109.png',fullPage:true});
  const v=await p.evaluate(()=>({title:document.title,heading:document.querySelector('h1')?.textContent,description:document.querySelector('meta[name="description"]')?.content,viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,photos:[...document.images].filter(x=>x.src.includes('maersk')||x.src.includes('vgm-')).map(x=>({loaded:x.complete&&x.naturalWidth>0,src:x.currentSrc.slice(0,125)})),canonical:document.querySelector('link[rel="canonical"]')?.href,noindex:!!document.querySelector('meta[name="robots"][content*="noindex"]'),sourceLinks:[...document.querySelectorAll('a[href]')].filter(x=>x.href.includes('maersk.com/news/articles/2026/11/04')).length}));
  console.log(JSON.stringify({width,status:response.status(),...v}));
  await p.close();
 }
 await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
