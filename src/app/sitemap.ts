import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
import { siteConfig } from "@/data/site-config";

const staticRoutes = [
  ["/", "weekly", 1],
  ["/services", "monthly", 0.9],
  ["/pricing", "monthly", 0.85],
  ["/playbook", "monthly", 0.95],
  ["/risk-screen", "weekly", 0.95],
  ["/industries", "monthly", 0.85],
  ["/case-studies", "monthly", 0.8],
  ["/about", "monthly", 0.75],
  ["/contact", "monthly", 0.9],
  ["/blog", "weekly", 0.7],
  ["/faq", "monthly", 0.7],
  ["/privacy", "yearly", 0.3],
  ["/terms", "yearly", 0.3],
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const buildTime = new Date();

  const pages: MetadataRoute.Sitemap = staticRoutes.map(
    ([path, changeFrequency, priority]) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: buildTime,
      changeFrequency,
      priority,
    }),
  );

  const posts: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(`${post.date}T00:00:00Z`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...pages, ...posts];
}
