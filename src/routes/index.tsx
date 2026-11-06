import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";
import { Container } from "~/components/ui/container";
import { ButtonLink } from "~/components/ui/button-link";
import { PullQuote } from "~/components/ui/pull-quote";
import { OrnamentDivider } from "~/components/ui/ornament-divider";
import { ArrowRight } from "~/components/ui/icons";
import { HISTORY_CHAPTERS } from "~/content/history-chapters";
import { localizedHead } from "~/content/i18n";
import {
  SITE_DESCRIPTION,
  SITE_DESCRIPTION_AR,
  SITE_URL,
} from "~/content/site";
import {
  LOCALE_HTML_ATTRS,
  getLocaleFromPathname,
  localizedPathname,
} from "~/lib/locale";
import { JsonLd } from "~/components/seo/json-ld";
import * as styles from "./index.css";

const COPY = {
  en: {
    heroSubtitle: "Palestine, before 1947 and after",
    heroLede:
      "How did Palestine get here? Begin with life under Ottoman rule, follow the upheavals of the twentieth century, and read about the people and culture beyond the headlines.",
    startHistory: "Start with the history",
    definition: "Sumud / steadfastness",
    definitionBody:
      "The Arabic word for standing firm. In Palestinian life, it can mean staying on the land, tending an olive grove or rebuilding a home. It gives this site its name.",
    sourcesNote:
      "An independent introduction, drawing on historical scholarship, archives and human rights reporting.",
    sourcesLink: "Sources and corrections",
    briefEyebrow: "Read the history",
    briefTitle: "From Ottoman rule to the present",
    briefLede:
      "Seven chapters, in order. Start at the beginning or choose a period you want to understand.",
    onwardTitle: "Culture and practical help",
    cultureTitle: "Culture & Sumud",
    cultureBody:
      "The patterns of a thobe, the autumn olive harvest, a plate of musakhan. Read about Palestinian food, craft, poetry and film, and what sumud means in daily life.",
    cultureLink: "Explore the culture",
    actionTitle: "Take Action",
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
      "أن تقف راسخًا. في الحياة الفلسطينية، قد يعني البقاء في الأرض، أو العناية ببستان زيتون، أو إعادة بناء بيت. ومنه أخذ هذا الموقع اسمه.",
    sourcesNote:
      "مدخل مستقل يستند إلى الدراسات التاريخية والأرشيفات وتقارير حقوق الإنسان.",
    sourcesLink: "المصادر والتصويبات",
    briefEyebrow: "اقرأ التاريخ",
    briefTitle: "من الحكم العثماني إلى الحاضر",
    briefLede:
      "سبعة فصول مرتبة زمنيًا. ابدأ من البداية، أو اختر الفترة التي تريد فهمها.",
    onwardTitle: "الثقافة وسبل المساعدة",
    cultureTitle: "الثقافة والصمود",
    cultureBody:
      "نقوش الثوب، وموسم قطف الزيتون، وطبق المسخن. اقرأ عن الطعام والحرف والشعر والسينما الفلسطينية، وعن معنى الصمود في الحياة اليومية.",
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
              // eslint-disable-next-line unicorn/no-incorrect-template-string-interpolation -- Schema.org URL template, not a JS interpolation.
              urlTemplate: `${SITE_URL}${path("/search/")}?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        }}
      />
      <section class={styles.hero} aria-labelledby="home-title">
        <Container width="wide">
          <div class={styles.heroGrid}>
            <div>
              <h1 id="home-title" class={styles.heroTitle} translate="no">
                Sumud
              </h1>
              <p class={styles.heroSubtitle}>{copy.heroSubtitle}</p>
              <p class={styles.heroLede}>{copy.heroLede}</p>
              <div class={styles.heroActions}>
                <ButtonLink href={path("/history/")} variant="primary">
                  {copy.startHistory}
                  <ArrowRight size={16} class="rtl-mirror" />
                </ButtonLink>
              </div>
            </div>
            <aside class={styles.definition} aria-labelledby="sumud-definition">
              <span class={styles.heroWord} lang="ar" dir="rtl" translate="no">
                صمود
              </span>
              <h2 id="sumud-definition" class={styles.definitionTitle}>
                {copy.definition}
              </h2>
              <p>{copy.definitionBody}</p>
              <p class={styles.sourcesNote}>{copy.sourcesNote}</p>
              <a class={styles.textLink} href={path("/sources/")}>
                {copy.sourcesLink}
              </a>
            </aside>
          </div>
        </Container>
      </section>

      <section class={styles.sectionAlt} aria-labelledby="history-title">
        <Container width="wide">
          <div class={styles.historyGrid}>
            <div>
              <p class={styles.eyebrow}>{copy.briefEyebrow}</p>
              <h2 id="history-title" class={styles.sectionTitle}>
                {copy.briefTitle}
              </h2>
              <p class={styles.sectionLede}>{copy.briefLede}</p>
            </div>
            <ol class={styles.timelineStrip}>
              {HISTORY_CHAPTERS.map((chapter) => (
                <li key={chapter.slug}>
                  <a
                    href={path(`/history/${chapter.slug}/`)}
                    class={styles.timelineItem}
                  >
                    <span
                      class={
                        chapter.current
                          ? styles.timelineDotCurrent
                          : styles.timelineDot
                      }
                      aria-hidden="true"
                    />
                    <span class={styles.timelineYear}>
                      {locale === "ar" ? chapter.ar.period : chapter.period}
                    </span>
                    <span class={styles.timelineLabel}>
                      {locale === "ar" ? chapter.ar.title : chapter.title}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section class={styles.section} aria-labelledby="onward-title">
        <Container width="wide">
          <h2 id="onward-title" class="visually-hidden">
            {copy.onwardTitle}
          </h2>
          <div class={styles.cardGrid}>
            <div class={styles.card}>
              <h3 class={styles.cardTitle}>{copy.cultureTitle}</h3>
              <p class={styles.cardBody}>{copy.cultureBody}</p>
              <a href={path("/culture/")} class={styles.textLink}>
                {copy.cultureLink} <ArrowRight size={14} class="rtl-mirror" />
              </a>
            </div>
            <div class={styles.card}>
              <h3 class={styles.cardTitle}>{copy.actionTitle}</h3>
              <p class={styles.cardBody}>{copy.actionBody}</p>
              <a href={path("/take-action/")} class={styles.textLink}>
                {copy.actionLink} <ArrowRight size={14} class="rtl-mirror" />
              </a>
            </div>
          </div>
        </Container>
        <Container width="content">
          <OrnamentDivider tone="sand" class={styles.centeredDivider} />
          <PullQuote quote={copy.quote} cite={copy.quoteCite} />
        </Container>
      </section>
    </>
  );
});

export const head: DocumentHead = ({ url }) =>
  localizedHead(getLocaleFromPathname(url.pathname), COPY);
