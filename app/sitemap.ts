import type { MetadataRoute } from "next";

import { routing } from "@/i18n";
import { projects } from "@/data/projects";

const BASE_URL = "https://felipesrutkoske.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const homeEntries: MetadataRoute.Sitemap = routing.locales.map((locale) => ({
    url: `${BASE_URL}/${locale}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 1,
    alternates: {
      languages: {
        pt: `${BASE_URL}/pt`,
        en: `${BASE_URL}/en`,
      },
    },
  }));

  const projectEntries: MetadataRoute.Sitemap = routing.locales.flatMap(
    (locale) =>
      projects.map((project) => ({
        url: `${BASE_URL}/${locale}/projects/${project.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.85,
        alternates: {
          languages: {
            pt: `${BASE_URL}/pt/projects/${project.slug}`,
            en: `${BASE_URL}/en/projects/${project.slug}`,
          },
        },
      }))
  );

  return [...homeEntries, ...projectEntries];
}
