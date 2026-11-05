import Link from "next/link";
import { Fragment } from "react";
import { NewsletterSignup } from "@/components/editorial/NewsletterSignup";
import { ArticleViews } from "@/components/editorial/ArticleViews";
import type { BlogPost } from "@/data/blog";
import { articleTopics } from "@/lib/topics";
import { normalizeArticleFeedParams, type QueryValue } from "@/lib/article-feed-params";
export function ArticleFeed({ posts, topic = "All", query = "" }: { posts: BlogPost[]; topic?:QueryValue; query?:QueryValue }) {
 const normalized=normalizeArticleFeedParams({topic,q:query});
 const filter={topic:normalized.topic,q:normalized.query};
 const articles=posts.filter(p=>(filter.topic==="All"||articleTopics(p.slug,p.category).includes(filter.topic)) && `${p.title} ${p.excerpt} ${articleTopics(p.slug,p.category).join(" ")}`.toLowerCase().includes(filter.q.toLowerCase()));
 return <div className="editorial-feed-layout"><section aria-label="Articles" className="editorial-feed"><h1 className="sr-only">{filter.topic === "All" ? "Procurement articles" : filter.topic}</h1>{filter.q && <p className="editorial-results">{articles.length} results for “{filter.q}”</p>}{articles.map((p, index)=><Fragment key={p.slug}><article className="editorial-card"><div><span className="editorial-category">{articleTopics(p.slug,p.category)[0]}</span><Link href={`/blog/${p.slug}`}><h2>{p.title}</h2></Link><p>{p.excerpt}</p><div className="editorial-meta">James Cheng · <time dateTime={p.date}>{p.date}</time> · {p.readTime} · <ArticleViews slug={p.slug}/></div></div>{p.coverImage && <Link href={`/blog/${p.slug}`} tabIndex={-1} aria-hidden="true"><img src={p.coverImage.src} alt="" loading="lazy" width={p.coverImage.width} height={p.coverImage.height}/></Link>}</article>{index === Math.min(2, articles.length - 1) && <NewsletterSignup />}</Fragment>)}{!articles.length && <p>No matching articles. <Link href="/">See all articles</Link></p>}</section><aside className="editorial-author"><h2>James Cheng</h2><p>Engineering, industrial sourcing and cross-border procurement.</p><Link href="/about">About the author →</Link><a href="mailto:contact@sourcerating.com">contact@sourcerating.com</a><a href="https://www.linkedin.com/in/hcrdi/">LinkedIn</a></aside></div>;
}
