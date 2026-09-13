import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";
import { Container } from "~/components/ui/container";
import { ButtonLink } from "~/components/ui/button-link";
import { PullQuote } from "~/components/ui/pull-quote";
import { OrnamentDivider } from "~/components/ui/ornament-divider";
import {
  ArrowRight,
  ScrollText,
  Users,
  HeartHandshake,
} from "~/components/ui/icons";
import { HISTORY_CHAPTERS } from "~/content/history-chapters";
import {
  SITE_DESCRIPTION,
  SITE_DESCRIPTION_AR,
  SITE_URL,
} from "~/content/site";
import { getLocaleFromPathname, localizedPathname } from "~/lib/locale";
import { JsonLd } from "~/components/seo/json-ld";
import * as styles from "./index.css";

const COPY = {
  en: {
    heroLede:
      "The story of Palestine and its people, before 1947 and after: a history of a land, a people driven from most of it, and the steadfastness that has kept their story alive.",
    startHistory: "Start with the history",
    exploreCulture: "Explore Sumud & culture",
    whyEyebrow: "Why this site exists",
    whyTitle: "A people's history, told plainly",
    whyLede1:
      "Palestine rarely gets told as a continuous story. It is more often reduced to a single week's news, stripped of the centuries that came before it and the people who have lived through all of it. This project tries to put that back together: the Ottoman province, the Mandate, the Nakba, the decades of exile and occupation, and the Palestine of today -- alongside the culture, language and everyday resilience that have carried people through it.",
    whyLede2Pre:
      "It draws on mainstream historical scholarship and the documented record of United Nations bodies and human rights organisations. Where facts are disputed, we say so. See the ",
    sourcesLink: "sources page",
    whyLede2Post: " for the full picture and how to flag a correction.",
    briefEyebrow: "The history, in brief",
    briefTitle: "Seven chapters, one thread",
    historyCardTitle: "History",
    historyCardBody:
      "From Ottoman Palestine to the present day: seven chapters covering partition, the Nakba, occupation and the decades since.",
    historyCardLink: "Read the history",
    cultureCardTitle: "Culture & Sumud",
    cultureCardBody:
      "Olive groves, embroidery, poetry and cuisine -- and the idea of sumud itself, steadfastness as a way of holding on to a place and a story.",
    cultureCardLink: "Explore the culture",
    actionCardTitle: "Take Action",
    actionCardBody:
      "Reputable humanitarian and human rights organisations working on the ground, for anyone who wants to do more than read.",
    actionCardLink: "See how to help",
    quote: "We have on this land that which makes life worth living.",
    quoteCite: "Mahmoud Darwish, 'On This Land'",
  },
  ar: {
    heroLede:
      "قصة فلسطين وأهلها، قبل عام 1947 وبعده: تاريخ أرض، وشعب طُرد من معظمها، والصمود الذي أبقى قصتهم حية.",
    startHistory: "ابدأ بالتاريخ",
    exploreCulture: "استكشف الصمود والثقافة",
    whyEyebrow: "لماذا يوجد هذا الموقع",
    whyTitle: "تاريخ شعب، يُروى ببساطة",
    whyLede1:
      "نادرًا ما تُروى فلسطين كقصة متصلة. فهي غالبًا ما تُختزل في أخبار أسبوع واحد، مجردة من القرون التي سبقتها ومن الناس الذين عاشوها كاملة. يحاول هذا المشروع إعادة تجميع ذلك: الولاية العثمانية، والانتداب، والنكبة، وعقود المنفى والاحتلال، وفلسطين اليوم -- إلى جانب الثقافة واللغة والصمود اليومي الذي حمل الناس عبر كل ذلك.",
    whyLede2Pre:
      "يعتمد على الدراسات التاريخية المعتمدة والسجل الموثق لهيئات الأمم المتحدة ومنظمات حقوق الإنسان. وحيثما تكون الوقائع محل خلاف، نذكر ذلك. انظر ",
    sourcesLink: "صفحة المصادر",
    whyLede2Post: " للاطلاع على الصورة الكاملة ولمعرفة كيفية الإبلاغ عن تصويب.",
    briefEyebrow: "التاريخ، بإيجاز",
    briefTitle: "سبعة فصول، خيط واحد",
    historyCardTitle: "التاريخ",
    historyCardBody:
      "من فلسطين العثمانية إلى يومنا هذا: سبعة فصول تغطي التقسيم والنكبة والاحتلال والعقود التي تلتها.",
    historyCardLink: "اقرأ التاريخ",
    cultureCardTitle: "الثقافة والصمود",
    cultureCardBody:
      "بساتين الزيتون، والتطريز، والشعر، والمطبخ -- وفكرة الصمود نفسها، بوصفه طريقة للتشبث بمكان وبحكاية.",
    cultureCardLink: "استكشف الثقافة",
    actionCardTitle: "بادر بالفعل",
    actionCardBody:
      "منظمات إنسانية وحقوقية موثوقة تعمل على الأرض، لمن يريد فعل أكثر من القراءة.",
    actionCardLink: "تعرّف كيف تساعد",
    quote: "على هذه الأرض ما يستحق الحياة",
    quoteCite: "محمود درويش، «على هذه الأرض»",
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
          inLanguage: locale === "ar" ? "ar" : "en-GB",
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              // eslint-disable-next-line unicorn/no-incorrect-template-string-interpolation -- `{search_term_string}` is Schema.org's own URL template placeholder syntax, not a JS interpolation.
              urlTemplate: `${SITE_URL}${path("/search/")}?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        }}
      />
      <section class={styles.hero}>
        <svg
          class={styles.heroMark}
          viewBox="0 0 32 32"
          role="presentation"
          aria-hidden="true"
        >
          <path
            d="M16 27c-1-6.5 1.5-11.5 6-15"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
          />
          <ellipse
            cx="19.5"
            cy="9.5"
            rx="3.6"
            ry="2"
            transform="rotate(-40 19.5 9.5)"
            fill="currentColor"
          />
          <ellipse
            cx="15.2"
            cy="14.6"
            rx="3.8"
            ry="2.1"
            transform="rotate(-35 15.2 14.6)"
            fill="currentColor"
          />
          <ellipse
            cx="12"
            cy="20.4"
            rx="3.6"
            ry="2"
            transform="rotate(-25 12 20.4)"
            fill="currentColor"
          />
          <circle cx="16" cy="27.4" r="1.6" fill="currentColor" />
        </svg>
        <Container width="wide">
          <span class={styles.heroWord} lang="ar" dir="rtl">
            صمود
          </span>
          <h1 class={styles.heroTitle}>Sumud</h1>
          <p class={styles.heroLede}>{copy.heroLede}</p>
          <div class={styles.heroActions}>
            <ButtonLink href={path("/history/")} variant="primary">
              {copy.startHistory}
              <ArrowRight size={16} class="rtl-mirror" />
            </ButtonLink>
            <ButtonLink href={path("/culture/")} variant="secondary">
              {copy.exploreCulture}
            </ButtonLink>
          </div>
        </Container>
        <OrnamentDivider tone="olive" class={styles.heroDivider} />
      </section>

      <section class={styles.section}>
        <Container width="wide">
          <p class={styles.eyebrow}>{copy.whyEyebrow}</p>
          <h2 class={styles.sectionTitle}>{copy.whyTitle}</h2>
          <p class={styles.sectionLede}>{copy.whyLede1}</p>
          <p class={styles.sectionLede}>
            {copy.whyLede2Pre}
            <a href={path("/sources/")}>{copy.sourcesLink}</a>
            {copy.whyLede2Post}
          </p>
        </Container>
      </section>

      <section class={styles.sectionAlt}>
        <Container width="content">
          <p class={styles.eyebrow}>{copy.briefEyebrow}</p>
          <h2 class={styles.sectionTitle}>{copy.briefTitle}</h2>
          <div class={styles.timelineStrip}>
            {HISTORY_CHAPTERS.map((chapter) => (
              <a
                key={chapter.slug}
                href={path(`/history/${chapter.slug}/`)}
                class={styles.timelineItem}
              >
                <span
                  class={
                    chapter.current
                      ? styles.timelineDotCurrent
                      : styles.timelineDot
                  }
                />
                <span class={styles.timelineYear}>
                  {locale === "ar" ? chapter.ar.period : chapter.period}
                </span>
                <span class={styles.timelineLabel}>
                  {locale === "ar" ? chapter.ar.title : chapter.title}
                </span>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <section class={styles.section}>
        <Container width="wide">
          <div class={styles.cardGrid}>
            <a href={path("/history/")} class={styles.card}>
              <span class={styles.cardIconBadge}>
                <ScrollText size={22} />
              </span>
              <h3 class={styles.cardTitle}>{copy.historyCardTitle}</h3>
              <p class={styles.cardBody}>{copy.historyCardBody}</p>
              <span class={styles.cardLink}>
                {copy.historyCardLink}{" "}
                <ArrowRight size={14} class="rtl-mirror" />
              </span>
            </a>

            <a href={path("/culture/")} class={styles.card}>
              <span class={styles.cardIconBadge}>
                <Users size={22} />
              </span>
              <h3 class={styles.cardTitle}>{copy.cultureCardTitle}</h3>
              <p class={styles.cardBody}>{copy.cultureCardBody}</p>
              <span class={styles.cardLink}>
                {copy.cultureCardLink}{" "}
                <ArrowRight size={14} class="rtl-mirror" />
              </span>
            </a>

            <a href={path("/take-action/")} class={styles.card}>
              <span class={styles.cardIconBadge}>
                <HeartHandshake size={22} />
              </span>
              <h3 class={styles.cardTitle}>{copy.actionCardTitle}</h3>
              <p class={styles.cardBody}>{copy.actionCardBody}</p>
              <span class={styles.cardLink}>
                {copy.actionCardLink}{" "}
                <ArrowRight size={14} class="rtl-mirror" />
              </span>
            </a>
          </div>
        </Container>
      </section>

      <section class={styles.section}>
        <Container width="content">
          <OrnamentDivider tone="sand" class={styles.centeredDivider} />
          <PullQuote quote={copy.quote} cite={copy.quoteCite} />
        </Container>
      </section>
    </>
  );
});

export const head: DocumentHead = ({ url }) => {
  const locale = getLocaleFromPathname(url.pathname);
  return locale === "ar"
    ? {
        title: "صمود -- قصة فلسطين",
        meta: [{ name: "description", content: SITE_DESCRIPTION_AR }],
      }
    : {
        title: "Sumud -- the story of Palestine",
        meta: [{ name: "description", content: SITE_DESCRIPTION }],
      };
};
