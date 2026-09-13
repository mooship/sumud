import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link, useLocation } from "@builder.io/qwik-city";
import { Container } from "~/components/ui/container";
import { HISTORY_CHAPTERS } from "~/content/history-chapters";
import { localizedHead } from "~/content/i18n";
import { getLocaleFromPathname, localizedPathname } from "~/lib/locale";
import * as styles from "./index.css";

const COPY = {
  en: {
    eyebrow: "History",
    title: "Palestine, chapter by chapter",
    lede: "This is one continuous story told in seven parts: an Ottoman province, a British Mandate, a partition and a catastrophe, decades of exile and occupation, and the Palestine of today. Each chapter stands alone, but they are meant to be read in order.",
    headTitle: "History",
    headDescription:
      "The history of Palestine from Ottoman rule through the British Mandate, the Nakba, occupation and exile, to the present day.",
  },
  ar: {
    eyebrow: "التاريخ",
    title: "فلسطين، فصلاً فصلاً",
    lede: "هذه قصة واحدة متصلة تُروى في سبعة أجزاء: ولاية عثمانية، وانتداب بريطاني، وتقسيم وكارثة، وعقود من المنفى والاحتلال، وفلسطين اليوم. يقف كل فصل بذاته، لكن الأفضل قراءتها بالترتيب.",
    headTitle: "التاريخ",
    headDescription:
      "تاريخ فلسطين من الحكم العثماني مرورًا بالانتداب البريطاني والنكبة والاحتلال والمنفى، وصولًا إلى يومنا هذا.",
  },
};

export default component$(() => {
  const loc = useLocation();
  const locale = getLocaleFromPathname(loc.url.pathname);
  const copy = COPY[locale];

  return (
    <Container width="content">
      <header class={styles.header}>
        <p class={styles.eyebrow}>{copy.eyebrow}</p>
        <h1 class={styles.title}>{copy.title}</h1>
        <p class={styles.lede}>{copy.lede}</p>
      </header>

      <div class={styles.list}>
        {HISTORY_CHAPTERS.map((chapter) => (
          <Link
            key={chapter.slug}
            href={localizedPathname(`/history/${chapter.slug}/`, locale)}
            class={styles.item}
          >
            <span class={styles.itemDot} />
            <span class={styles.itemPeriod}>
              {locale === "ar" ? chapter.ar.period : chapter.period}
            </span>
            <div>
              <h2 class={styles.itemTitle}>
                {locale === "ar" ? chapter.ar.title : chapter.title}
              </h2>
              <p class={styles.itemSummary}>
                {locale === "ar" ? chapter.ar.summary : chapter.summary}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
});

export const head: DocumentHead = ({ url }) =>
  localizedHead(getLocaleFromPathname(url.pathname), COPY);
