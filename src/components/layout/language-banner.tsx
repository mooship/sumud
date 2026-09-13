import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { LANGUAGE_OFFER } from "~/content/i18n";
import {
  LOCALE_BANNER_DISMISSED_KEY,
  LOCALE_STORAGE_KEY,
  getLocaleFromPathname,
  localizedPathname,
  type Locale,
} from "~/lib/locale";
import { getLocalStorage, safeSetItem } from "~/lib/safe-storage";
import { shouldOfferLocale } from "./language-banner-logic";
import * as styles from "./language-banner.css";

/**
 * First-visit suggestion, not an auto-redirect: research on language-based redirects (and
 * Google's own guidance against them) shows they trap crawlers and returning visitors on the
 * wrong page, so this only ever offers a switch and lets the visitor decide. Detection needs
 * `navigator.language`/`localStorage`, both browser-only, hence the visible task -- see
 * `language-banner-logic.ts` for the (directly unit-tested) decision itself.
 */
export const LanguageBanner = component$(() => {
  const loc = useLocation();
  const currentLocale = getLocaleFromPathname(loc.url.pathname);
  const offered = useSignal<Locale | undefined>(undefined);

  // eslint-disable-next-line qwik/no-use-visible-task -- navigator.language and localStorage are only readable client-side; there's no non-visible hook for a first-visit preference check.
  useVisibleTask$(() => {
    offered.value = shouldOfferLocale({
      currentLocale,
      languages: navigator.languages ?? [navigator.language],
      storage: getLocalStorage(),
    });
  });

  const target = offered.value;

  return (
    <>
      {target && (
        <div
          class={styles.banner}
          role="note"
          lang={target}
          dir={target === "ar" ? "rtl" : "ltr"}
        >
          <p class={styles.text}>{LANGUAGE_OFFER[target].bannerText}</p>
          <div class={styles.actions}>
            <a
              href={localizedPathname(loc.url.pathname, target)}
              class={styles.accept}
              onClick$={() =>
                safeSetItem(getLocalStorage(), LOCALE_STORAGE_KEY, target)
              }
            >
              {LANGUAGE_OFFER[target].accept}
            </a>
            <button
              type="button"
              class={styles.dismiss}
              onClick$={() => {
                safeSetItem(
                  getLocalStorage(),
                  LOCALE_BANNER_DISMISSED_KEY,
                  "1",
                );
                offered.value = undefined;
              }}
            >
              {LANGUAGE_OFFER[target].dismiss}
            </button>
          </div>
        </div>
      )}
    </>
  );
});
