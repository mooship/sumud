import {
  LOCALE_BANNER_DISMISSED_KEY,
  LOCALE_STORAGE_KEY,
  type Locale,
} from "~/lib/locale";
import { safeGetItem } from "~/lib/safe-storage";

// The visitor's preferred locale, going only by their browser's language list: Arabic if any
// entry is an Arabic variant (`ar`, `ar-EG`, ...), English otherwise.
export function detectPreferredLocale(languages: readonly string[]): Locale {
  return languages.some((lang) => lang.toLowerCase().startsWith("ar"))
    ? "ar"
    : "en";
}

/**
 * Decides which locale, if any, the first-visit banner should offer: the browser's preferred
 * locale, but only when it differs from the page currently being read, and only when the
 * visitor hasn't already made an explicit choice or dismissed the banner before. Returns
 * `undefined` when nothing should be shown.
 */
export function shouldOfferLocale(params: {
  currentLocale: Locale;
  languages: readonly string[];
  storage: Storage | undefined;
}): Locale | undefined {
  const { currentLocale, languages, storage } = params;
  if (safeGetItem(storage, LOCALE_STORAGE_KEY)) return undefined;
  if (safeGetItem(storage, LOCALE_BANNER_DISMISSED_KEY)) return undefined;

  const preferred = detectPreferredLocale(languages);
  return preferred === currentLocale ? undefined : preferred;
}
