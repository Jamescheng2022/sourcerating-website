import { blogPosts as existingPosts } from "@/content/blog/legacy-posts";
import type { BlogPost } from "@/content/blog/legacy-posts";
import { acceptanceSamplingPost } from "@/content/blog/accepted-sampling-lot-not-zero-defects";

export type { BlogPost } from "@/content/blog/legacy-posts";

// The original registry is retained byte-for-byte; new articles are independent files.
export const blogPosts: BlogPost[] = [acceptanceSamplingPost, ...existingPosts];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
