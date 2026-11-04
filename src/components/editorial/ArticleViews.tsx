import views from "@/data/article-views.json";
export function ArticleViews({slug}:{slug:string}) {
 const count=(views.counts as Record<string,number>)[slug] ?? 0;
 return <span title={`Recorded page views, ${views.periodStart} to ${views.periodEnd}. Updated ${views.updatedAt}; repeated visits count. Visits without analytics consent may be absent.`}>{count.toLocaleString("en-US")} views</span>;
}
