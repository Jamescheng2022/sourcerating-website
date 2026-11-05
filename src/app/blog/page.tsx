import { blogPosts } from "@/data/blog";
import { ArticleFeed } from "@/components/editorial/ArticleFeed";
import { generatePageMetadata } from "@/lib/metadata";
import { normalizeArticleFeedParams, type FeedSearchParams } from "@/lib/article-feed-params";
type Props = { searchParams: Promise<FeedSearchParams> };
export async function generateMetadata({ searchParams }: Props) {
  const filter = normalizeArticleFeedParams(await searchParams);
  return {
    ...generatePageMetadata({title:"Procurement articles",description:"Independent reporting and practical perspectives on industrial sourcing, quality, logistics and global procurement.",path:"/blog"}),
    robots: { index: !filter.query && filter.topic === "All", follow: true },
  };
}
export default async function BlogPage({ searchParams }: Props) {
  const filter = normalizeArticleFeedParams(await searchParams);
  return <ArticleFeed posts={blogPosts} {...filter} />;
}
