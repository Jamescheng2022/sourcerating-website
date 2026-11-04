import type { Metadata } from "next";
import { blogPosts } from "@/data/blog";
import { ArticleFeed } from "@/components/editorial/ArticleFeed";
import { generatePageMetadata } from "@/lib/metadata";
export const metadata: Metadata = generatePageMetadata({title:"Procurement articles",description:"Independent reporting and practical perspectives on industrial sourcing, quality, logistics and global procurement.",path:"/blog"});
export default async function BlogPage({searchParams}:{searchParams:Promise<{topic?:string;q?:string}>}){const q=await searchParams;return <ArticleFeed posts={blogPosts} topic={q.topic} query={q.q}/>;}
