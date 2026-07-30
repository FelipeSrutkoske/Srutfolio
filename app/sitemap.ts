import { routing } from "@/i18n";

const BASE_URL = "https://example.com";

export default function sitemap() {
  return routing.locales.map((locale) => {
    const path = locale === routing.defaultLocale ? "" : `/${locale}`;
    return {
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          pt: `${BASE_URL}`,
          en: `${BASE_URL}/en`,
        },
      },
    };
  });
}
