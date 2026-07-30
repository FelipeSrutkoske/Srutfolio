import { defineRouting } from "next-intl/routing";
import { getRequestConfig } from "next-intl/server";

/**
 * Configuração de i18n (next-intl).
 * - `pt` é o idioma padrão.
 * - `localePrefix: 'always'` força /pt e /en para simplificar o redirecionamento da raiz.
 */
export const routing = defineRouting({
  locales: ["pt", "en"],
  defaultLocale: "pt",
  localePrefix: "always",
});

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as "pt" | "en")) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
