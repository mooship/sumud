import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";
import { Container } from "~/components/ui/container";
import { SOURCE_SECTIONS } from "~/content/sources";
import { getLocaleFromPathname, localizedPathname } from "~/lib/locale";
import * as styles from "./index.css";

const COPY = {
  en: {
    eyebrow: "Sources",
    title: "How this was written",
    lede1:
      "This project synthesises mainstream historical scholarship, UN and archival records, and reporting from human rights organisations across the political spectrum -- Israeli, Palestinian and international. Where historians genuinely disagree, we have tried to say so rather than flatten the disagreement. Figures for casualties and displacement, particularly for events since 2023, are attributed to their source rather than stated as uncontested fact, because they often are contested.",
    lede2Pre:
      "This is not an academic work with a footnote for every sentence. It is a synthesis, and synthesis involves judgement. The list below is not exhaustive, but it represents the kinds of sources drawn on throughout the site. For a longer list of books, including memoir, fiction and poetry, see ",
    furtherReadingLink: "further reading",
    lede2Post: ".",
    correctionTitle: "Found an error?",
    correctionPre:
      "If something on this site is factually wrong, out of date, or misattributed, please ",
    correctionLink: "open an issue on GitHub",
    correctionOpensNewTab: " (opens in a new tab)",
    correctionPost:
      ". Corrections are welcome and will be reviewed and, where warranted, applied promptly.",
  },
  ar: {
    eyebrow: "المصادر",
    title: "كيف كُتب هذا",
    lede1:
      "يجمع هذا المشروع بين الدراسات التاريخية المعتمدة، والسجلات الأممية والأرشيفية، وتقارير منظمات حقوق الإنسان عبر الطيف السياسي -- الإسرائيلي والفلسطيني والدولي. وحيثما يختلف المؤرخون فعلًا، حاولنا ذكر ذلك بدلًا من تسطيح الخلاف. وتُنسب أرقام الضحايا والتهجير، لا سيما للأحداث منذ عام 2023، إلى مصدرها بدلًا من تقديمها كحقيقة غير متنازع عليها، لأنها كثيرًا ما تكون كذلك.",
    lede2Pre:
      "هذا ليس عملًا أكاديميًا بحاشية لكل جملة. إنه توليف، والتوليف ينطوي على اجتهاد. القائمة أدناه ليست شاملة، لكنها تمثل أنواع المصادر المعتمدة في أنحاء الموقع. للاطلاع على قائمة أطول من الكتب، بما فيها المذكرات والأدب الروائي والشعر، انظر ",
    furtherReadingLink: "قراءات إضافية",
    lede2Post: ".",
    correctionTitle: "وجدت خطأ؟",
    correctionPre:
      "إذا كان هناك شيء غير دقيق أو قديم أو منسوب خطأً في هذا الموقع، يرجى ",
    correctionLink: "فتح تذكرة على GitHub",
    correctionOpensNewTab: " (يفتح في تبويب جديد)",
    correctionPost:
      ". التصويبات موضع ترحيب وستُراجَع، وتُطبَّق سريعًا متى استدعى الأمر ذلك.",
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
        <p class={styles.lede}>{copy.lede1}</p>
        <p class={styles.lede}>
          {copy.lede2Pre}
          <a href={localizedPathname("/further-reading/", locale)}>
            {copy.furtherReadingLink}
          </a>
          {copy.lede2Post}
        </p>
      </header>

      {SOURCE_SECTIONS.map((section) => (
        <section key={section.title} class={styles.section}>
          <h2 class={styles.sectionTitle}>
            {locale === "ar" ? section.ar.title : section.title}
          </h2>
          <div class={styles.entryList}>
            {section.entries.map((entry) => (
              <div key={entry.id} id={entry.id} class={styles.entry}>
                <p class={styles.entryName}>{entry.name}</p>
                <p class={styles.entryMeta}>
                  {locale === "ar" ? entry.ar.meta : entry.meta}
                </p>
              </div>
            ))}
          </div>
        </section>
      ))}

      <div class={styles.correctionBox}>
        <p class={styles.correctionTitle}>{copy.correctionTitle}</p>
        <p>
          {copy.correctionPre}
          <a
            href="https://github.com/mooship/sumud/issues/new"
            target="_blank"
            rel="noopener noreferrer"
          >
            {copy.correctionLink}
            <span class="visually-hidden">{copy.correctionOpensNewTab}</span>
          </a>
          {copy.correctionPost}
        </p>
      </div>
    </Container>
  );
});

export const head: DocumentHead = ({ url }) => {
  const locale = getLocaleFromPathname(url.pathname);
  return locale === "ar"
    ? {
        title: "المصادر",
        meta: [
          {
            name: "description",
            content:
              "الكتب والأرشيفات وسجلات الأمم المتحدة ومنظمات حقوق الإنسان التي يعتمد عليها هذا المشروع، وكيفية الإبلاغ عن تصويب.",
          },
        ],
      }
    : {
        title: "Sources",
        meta: [
          {
            name: "description",
            content:
              "The books, archives, UN records and human rights organisations this project draws on, and how to flag a correction.",
          },
        ],
      };
};
