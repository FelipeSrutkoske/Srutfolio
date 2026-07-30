import { createNavigation } from "next-intl/navigation";

import { routing } from "./i18n";

/**
 * Navegação consciente de locale (next-intl).
 * Usada pelo toggle de idioma para montar os links /pt e /en.
 */
export const { Link, usePathname, useRouter, getPathname } =
  createNavigation(routing);
