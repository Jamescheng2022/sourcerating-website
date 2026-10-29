import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
import { fieldKits } from "@/data/field-kits";
import { siteConfig } from "@/data/site-config";

const staticRoutes = [
  ["/", "weekly", 1],
  ["/resources", "weekly", 0.95],
  ["/intelligence", "weekly", 0.9],
  ["/field-kits", "weekly", 0.9],
  ["/membership", "monthly", 0.85],
  ["/app", "monthly", 0.8],
  ["/services", "monthly", 0.9],
  ["/buyer-decisions", "monthly", 0.95],
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
  const pages: MetadataRoute.Sitemap = staticRoutes.map(
    ([path, changeFrequency, priority]) => ({
      url: `${siteConfig.url}${path}`,
      changeFrequency,
      priority,
    }),
  );

  const posts: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(`${post.dateModified ?? post.date}T00:00:00Z`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const kits: MetadataRoute.Sitemap = fieldKits.map((kit) => ({
    url: `${siteConfig.url}/field-kits/${kit.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...pages, ...posts, ...kits];
}
