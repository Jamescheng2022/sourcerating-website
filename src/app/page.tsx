import { blogPosts } from "@/data/blog";
import { ArticleFeed } from "@/components/editorial/ArticleFeed";
type Query = Promise<{topic?:string;q?:string}>;
export default async function HomePage({searchParams}:{searchParams:Query}) { const q=await searchParams;return <ArticleFeed posts={blogPosts} topic={q.topic} query={q.q}/>; }
