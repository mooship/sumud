import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";
import { JsonLd } from "~/components/seo/json-ld";
import { ButtonLink } from "~/components/ui/button-link";
import { Container } from "~/components/ui/container";
import { ArrowRight } from "~/components/ui/icons";
import { OrnamentDivider } from "~/components/ui/ornament-divider";
import { PullQuote } from "~/components/ui/pull-quote";
import { HISTORY_CHAPTERS } from "~/content/history-chapters";
import { localizedHead } from "~/content/i18n";
import {
  SITE_DESCRIPTION,
  SITE_DESCRIPTION_AR,
  SITE_URL,
} from "~/content/site";
import {
  getLocaleFromPathname,
  LOCALE_HTML_ATTRS,
  localizedPathname,
} from "~/lib/locale";
import * as styles from "./index.css";

const ROMAN_NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII"];

const COPY = {
  en: {
    heroSubtitle: "Palestine, before 1947 and after",
    heroLede:
      "How did Palestine get here? Begin with life under Ottoman rule, follow the upheavals of the twentieth century, and read about the people and culture beyond the headlines.",
    startHistory: "Start with the history",
    definition: "Sumud / steadfastness",
    definitionBody:
      "The Arabic word for standing firm. In Palestinian life it can mean something as plain as staying on the land. It gives this site its name.",
    sourcesNote:
      "An independent introduction, drawing on historical scholarship, archives and human rights reporting.",
    sourcesLink: "Sources and corrections",
    briefTitle: "From Ottoman rule to the present",
    briefLede:
      "Seven chapters, in order. Start at the beginning or choose a period you want to understand.",
    onwardTitle: "Culture and practical help",
    cultureTitle: "Culture and sumud",
    cultureBody:
      "Food, embroidery, poetry and film, and what sumud means in daily life.",
    cultureLink: "Explore the culture",
    actionTitle: "Take action",
    actionBody:
      "Find humanitarian aid and human rights organisations working in Gaza, the West Bank and with refugees. Visit their own sites to check their work and ways to support it.",
    actionLink: "Find organisations",
    quote: "We have on this land that which makes life worth living.",
    quoteCite: "Mahmoud Darwish, 'On This Land'",
    headTitle: "Sumud: the story of Palestine",
    headDescription: SITE_DESCRIPTION,
  },
  ar: {
    heroSubtitle: "فلسطين، قبل عام 1947 وبعده",
    heroLede:
      "كيف وصلت فلسطين إلى هنا؟ ابدأ بالحياة في ظل الحكم العثماني، وتابع تحولات القرن العشرين، واقرأ عن الناس والثقافة بعيدًا عن عناوين الأخبار.",
    startHistory: "ابدأ بالتاريخ",
    definition: "الصمود / الثبات",
    definitionBody:
      "أن تقف راسخًا. في الحياة الفلسطينية قد يعني شيئًا بسيطًا مثل البقاء في الأرض. ومنه أخذ هذا الموقع اسمه.",
    sourcesNote:
      "مدخل مستقل يستند إلى الدراسات التاريخية والأرشيفات وتقارير حقوق الإنسان.",
    sourcesLink: "المصادر والتصويبات",
    briefTitle: "من الحكم العثماني إلى الحاضر",
    briefLede:
      "سبعة فصول مرتبة زمنيًا. ابدأ من البداية، أو اختر الفترة التي تريد فهمها.",
    onwardTitle: "الثقافة وسبل المساعدة",
    cultureTitle: "الثقافة والصمود",
    cultureBody:
      "الطعام والتطريز والشعر والسينما، ومعنى الصمود في الحياة اليومية.",
    cultureLink: "استكشف الثقافة",
    actionTitle: "بادر بالفعل",
    actionBody:
      "تعرّف على منظمات الإغاثة وحقوق الإنسان العاملة في غزة والضفة الغربية ومع اللاجئين. زر مواقعها للاطلاع على عملها وطرق دعمه.",
    actionLink: "تعرّف على المنظمات",
    quote: "على هذه الأرض ما يستحق الحياة",
    quoteCite: "محمود درويش، «على هذه الأرض»",
    headTitle: "صمود: قصة فلسطين",
    headDescription: SITE_DESCRIPTION_AR,
  },
};

export default component$(() => {
  const loc = useLocation();
  const locale = getLocaleFromPathname(loc.url.pathname);
  const copy = COPY[locale];
  const path = (p: string) => localizedPathname(p, locale);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Sumud",
          url: `${SITE_URL}${path("/")}`,
          description: locale === "ar" ? SITE_DESCRIPTION_AR : SITE_DESCRIPTION,
          inLanguage: LOCALE_HTML_ATTRS[locale].lang,
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              // `{search_term_string}` is a Schema.org URL template, not a JS interpolation.
              urlTemplate: `${SITE_URL}${path("/search/")}?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        }}
      />
      <section class={styles.hero} aria-labelledby="home-title">
        <Container width="content">
          <h1 id="home-title" class={styles.heroTitle} translate="no">
            Sumud
          </h1>
          <p class={styles.heroSubtitle}>{copy.heroSubtitle}</p>
          <p class={styles.heroLede}>{copy.heroLede}</p>
          <aside class={styles.definition} aria-labelledby="sumud-definition">
            <span class={styles.heroWord} lang="ar" dir="rtl" translate="no">
              صمود
            </span>
            <h2 id="sumud-definition" class={styles.definitionTitle}>
              {copy.definition}
            </h2>
            <p>{copy.definitionBody}</p>
            <p class={styles.sourcesNote}>
              {copy.sourcesNote}{" "}
              <a class={styles.inlineLink} href={path("/sources/")}>
                {copy.sourcesLink}
              </a>
            </p>
          </aside>
          <div class={styles.heroActions}>
            <ButtonLink href={path("/history/")} variant="primary">
              {copy.startHistory}
              <ArrowRight size={16} class="rtl-mirror" />
            </ButtonLink>
          </div>
        </Container>
      </section>
      <section class={styles.section} aria-labelledby="history-title">
        <Container width="content">
          <h2 id="history-title" class={styles.sectionTitle}>
            {copy.briefTitle}
          </h2>
          <p class={styles.sectionLede}>{copy.briefLede}</p>
          <ol class={styles.chapterIndex}>
            {HISTORY_CHAPTERS.map((chapter, i) => {
              const text = locale === "ar" ? chapter.ar : chapter;
              return (
                <li key={chapter.slug}>
                  <a
                    href={path(`/history/${chapter.slug}/`)}
                    class={styles.chapterLink}
                  >
                    <span class={styles.chapterNumeral} aria-hidden="true">
                      {ROMAN_NUMERALS[i]}
                    </span>
                    <span class={styles.chapterPeriod}>{text.period}</span>
                    <span class={styles.chapterTitle}>{text.title}</span>
                    <span class={styles.chapterSummary}>{text.summary}</span>
                  </a>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>
      <section class={styles.section} aria-labelledby="onward-title">
        <Container width="content">
          <h2 id="onward-title" class={styles.sectionTitle}>
            {copy.onwardTitle}
          </h2>
          <h3 class={styles.onwardTitle}>{copy.cultureTitle}</h3>
          <p class={styles.onwardBody}>
            {copy.cultureBody}{" "}
            <a href={path("/culture/")} class={styles.inlineLink}>
              {copy.cultureLink}
            </a>
          </p>
          <h3 class={styles.onwardTitle}>{copy.actionTitle}</h3>
          <p class={styles.onwardBody}>
            {copy.actionBody}{" "}
            <a href={path("/take-action/")} class={styles.inlineLink}>
              {copy.actionLink}
            </a>
          </p>
          <OrnamentDivider tone="sand" class={styles.centeredDivider} />
          <PullQuote quote={copy.quote} cite={copy.quoteCite} />
        </Container>
      </section>{" "}
    </>
  );
});

export const head: DocumentHead = ({ url }) =>
  localizedHead(getLocaleFromPathname(url.pathname), COPY);
