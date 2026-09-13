/** The two locales this site renders: English (default, unprefixed routes) and Arabic (every
 *  route mirrored under `/ar/` with identical slugs -- see `src/routes/ar/`). */
export const LOCALES = ["en", "ar"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

// localStorage keys shared by the language switcher and the first-visit suggestion banner.
export const LOCALE_STORAGE_KEY = "sumud:locale";
export const LOCALE_BANNER_DISMISSED_KEY = "sumud:locale-banner-dismissed";

export const LOCALE_HTML_ATTRS: Record<
  Locale,
  { lang: string; dir: "ltr" | "rtl" }
> = {
  en: { lang: "en-GB", dir: "ltr" },
  ar: { lang: "ar", dir: "rtl" },
};

const AR_PREFIX = "/ar";

// Whether `pathname` falls under the `/ar/` route tree.
export function getLocaleFromPathname(pathname: string): Locale {
  return pathname === AR_PREFIX || pathname.startsWith(`${AR_PREFIX}/`)
    ? "ar"
    : "en";
}

// Strips the `/ar` prefix, if present, leaving the locale-independent path.
function stripLocalePrefix(pathname: string): string {
  if (pathname === AR_PREFIX || pathname === `${AR_PREFIX}/`) return "/";
  if (pathname.startsWith(`${AR_PREFIX}/`))
    return pathname.slice(AR_PREFIX.length);
  return pathname;
}

/**
 * Maps a pathname to its equivalent under a different locale. Both locales use identical
 * slugs (translated page titles live in content/head, never in the URL), so this is purely
 * prefix arithmetic -- no per-route lookup table to keep in sync.
 */
export function localizedPathname(pathname: string, locale: Locale): string {
  const bare = stripLocalePrefix(pathname);
  if (locale === "en") return bare;
  return bare === "/" ? `${AR_PREFIX}/` : `${AR_PREFIX}${bare}`;
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "ar" : "en";
}
