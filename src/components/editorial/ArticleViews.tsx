import views from "@/data/article-views.json";
export function ArticleViews({ slug, publishedAt }: { slug: string; publishedAt: string }) {
  const count = (views.counts as Record<string, number>)[slug];
  const available = publishedAt <= views.periodEnd && Number.isFinite(count) && count >= 0;
  return <span>
    {available ? `${count.toLocaleString("en-US")} views` : "Views not yet available"}
    <span className="sr-only">. Recorded page views for {views.periodStart} to {views.periodEnd}; not realtime. Repeated visits count, not unique readers or completed reads. Visits without analytics consent may be absent.</span>
  </span>;
}
