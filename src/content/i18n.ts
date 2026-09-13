import type { Locale } from "~/lib/locale";
import { NAV_ITEMS } from "~/content/nav";

/** Chrome strings (nav, footer, chapter navigation) that appear on every page, in both
 *  locales. Long-form prose lives in each page's own MDX/route file instead -- it can't be
 *  templated the way a handful of short UI strings can. The `en` values are exactly what was
 *  previously hardcoded in each component, so switching a component over to this dictionary
 *  changes nothing about its English output. */
export interface UiStrings {
  skipToContent: string;
  primaryNav: string;
  openMenu: string;
  closeMenu: string;
  footerTagline: string;
  footerReadHeading: string;
  footerProjectHeading: string;
  sourceOnGithub: string;
  opensNewTab: string;
  sourcingAndCorrections: string;
  privacy: string;
  allChapters: string;
  previousChapter: string;
  nextChapter: string;
  factsVerifiedPrefix: string;
}

export const UI_STRINGS: Record<Locale, UiStrings> = {
  en: {
    skipToContent: "Skip to content",
    primaryNav: "Primary",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    footerTagline:
      "An independent, non-commercial project telling the story of Palestine and its people -- before 1947 and after. Sumud means steadfastness: staying rooted in the land and the story, whatever comes.",
    footerReadHeading: "Read",
    footerProjectHeading: "Project",
    sourceOnGithub: "Source on GitHub",
    opensNewTab: " (opens in a new tab)",
    sourcingAndCorrections: "Sourcing & corrections",
    privacy: "Privacy",
    allChapters: "All chapters",
    previousChapter: "Previous",
    nextChapter: "Next",
    factsVerifiedPrefix: "Facts and figures last verified",
  },
  ar: {
    skipToContent: "تخطَّ إلى المحتوى",
    primaryNav: "التنقل الرئيسي",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    footerTagline:
      "مشروع مستقل وغير ربحي يروي قصة فلسطين وأهلها، قبل عام 1947 وبعده. الصمود يعني الثبات: البقاء متجذرًا في الأرض وفي الحكاية، مهما حدث.",
    footerReadHeading: "القراءة",
    footerProjectHeading: "المشروع",
    sourceOnGithub: "المصدر على GitHub",
    opensNewTab: " (يفتح في تبويب جديد)",
    sourcingAndCorrections: "المصادر والتصويبات",
    privacy: "الخصوصية",
    allChapters: "كل الفصول",
    previousChapter: "السابق",
    nextChapter: "التالي",
    factsVerifiedPrefix: "آخر تحقق من الوقائع والأرقام:",
  },
};

/** Arabic labels for `NAV_ITEMS`, keyed by the same (locale-independent) `href`. English labels
 *  live on `NAV_ITEMS` itself. */
export const NAV_LABELS_AR: Record<string, string> = {
  "/history/": "التاريخ",
  "/culture/": "الثقافة والصمود",
  "/further-reading/": "قراءات إضافية",
  "/glossary/": "المصطلحات",
  "/sources/": "المصادر",
  "/take-action/": "بادر بالفعل",
  "/search/": "بحث",
  "/about/": "عن الموقع",
};

// Each locale's own name for itself, i.e. what a switcher offering that locale should read.
export const LOCALE_AUTONYMS: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
};

/** Copy for the first-visit "read this in your language?" suggestion banner, written entirely
 *  in the locale being offered so it's legible to someone who may not read the current page's
 *  language well. */
export interface LanguageOffer {
  bannerText: string;
  accept: string;
  dismiss: string;
}

export const LANGUAGE_OFFER: Record<Locale, LanguageOffer> = {
  en: {
    bannerText: "Would you like to read this site in English?",
    accept: "Switch to English",
    dismiss: "No thanks",
  },
  ar: {
    bannerText: "هل تريد قراءة هذا الموقع بالعربية؟",
    accept: "التبديل إلى العربية",
    dismiss: "لا، شكرًا",
  },
};

// `NAV_ITEMS` localized for `locale`: Arabic labels plus `/ar`-prefixed hrefs.
export function localizedNavItems(
  locale: Locale,
): { href: string; label: string }[] {
  if (locale === "en") return NAV_ITEMS;
  return NAV_ITEMS.map((item) => ({
    href: `/ar${item.href}`,
    label: NAV_LABELS_AR[item.href]!,
  }));
}
