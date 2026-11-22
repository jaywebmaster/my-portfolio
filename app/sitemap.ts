import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { getSiteUrl } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({
      url: `${base}/projects/${p.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: p.featured ? 0.7 : 0.5,
    })),
  ];
}
