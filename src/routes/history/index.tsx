import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link, useLocation } from "@builder.io/qwik-city";
import { Container } from "~/components/ui/container";
import { PageHeader } from "~/components/ui/page-header";
import { HISTORY_CHAPTERS } from "~/content/history-chapters";
import { localizedHead } from "~/content/i18n";
import { getLocaleFromPathname, localizedPathname } from "~/lib/locale";
import * as styles from "./index.css";

const COPY = {
  en: {
    title: "Palestine, chapter by chapter",
    lede: "Begin under Ottoman rule and follow Palestine through the British Mandate, the Nakba, exile and occupation. The seven chapters work best in order, but you can also go straight to a particular period.",
    headTitle: "History",
    headDescription:
      "The history of Palestine from Ottoman rule through the British Mandate, the Nakba, occupation and exile, to the present day.",
  },
  ar: {
    title: "فلسطين، فصلاً فصلاً",
    lede: "ابدأ بالحكم العثماني وتابع تاريخ فلسطين عبر الانتداب البريطاني والنكبة والمنفى والاحتلال. الأفضل قراءة الفصول السبعة بالترتيب، ويمكنك أيضًا الانتقال مباشرة إلى فترة بعينها.",
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
      <PageHeader title={copy.title}>
        <p>{copy.lede}</p>
      </PageHeader>

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
