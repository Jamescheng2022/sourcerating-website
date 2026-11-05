import { blogPosts } from "@/data/blog";
import { ArticleFeed } from "@/components/editorial/ArticleFeed";
import { generatePageMetadata } from "@/lib/metadata";
import { normalizeArticleFeedParams, type FeedSearchParams } from "@/lib/article-feed-params";

type Props = { searchParams: Promise<FeedSearchParams> };
export async function generateMetadata({ searchParams }: Props) {
  const filter = normalizeArticleFeedParams(await searchParams);
  return {
    ...generatePageMetadata({ title: "Procurement Reporting & Field Notes", description: "Independent articles on industrial suppliers, production, quality, logistics, customs and cross-border procurement, by James Cheng.", path: "/" }),
    // Filter/search variants share the clean index canonical and are not indexed.
    robots: { index: !filter.query && filter.topic === "All", follow: true },
  };
}
export default async function HomePage({ searchParams }: Props) {
  const filter = normalizeArticleFeedParams(await searchParams);
  return <ArticleFeed posts={blogPosts} {...filter} />;
}
