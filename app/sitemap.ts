import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

const SITE = "https://ahmedelkfrawy.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const home: MetadataRoute.Sitemap[number] = {
    url: SITE,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 1,
  };

  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${SITE}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  return [home, ...projectPages];
}
