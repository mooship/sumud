import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { LOCALE_AUTONYMS } from "~/content/i18n";
import {
  LOCALE_STORAGE_KEY,
  getLocaleFromPathname,
  localizedPathname,
  otherLocale,
} from "~/lib/locale";
import { getLocalStorage, safeSetItem } from "~/lib/safe-storage";
import * as styles from "./language-switcher.css";

/**
 * Links to the current page's equivalent in the other locale. A plain `<a>`, not Qwik City's
 * `Link` -- this is a real cross-locale navigation (a full `<html lang dir>` change baked in at
 * build time, see `src/lib/locale.ts`), and `Link`'s own click-preload handler intercepts
 * simulated clicks in this project's test harness before a component's own `onClick$` gets a
 * turn (see `header.tsx`'s mobile-nav-close handler, and `vitest.config.ts`'s coverage note).
 */
export const LanguageSwitcher = component$(() => {
  const loc = useLocation();
  const current = getLocaleFromPathname(loc.url.pathname);
  const target = otherLocale(current);
  const href = localizedPathname(loc.url.pathname, target);

  return (
    <a
      href={href}
      hreflang={target}
      lang={target}
      class={styles.switcher}
      onClick$={() => {
        safeSetItem(getLocalStorage(), LOCALE_STORAGE_KEY, target);
      }}
    >
      {LOCALE_AUTONYMS[target]}
    </a>
  );
});
