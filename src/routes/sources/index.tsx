import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";
import { Container } from "~/components/ui/container";
import { PageHeader } from "~/components/ui/page-header";
import { UI_STRINGS, localizedHead } from "~/content/i18n";
import { SOURCE_SECTIONS } from "~/content/sources";
import { getLocaleFromPathname, localizedPathname } from "~/lib/locale";
import * as styles from "./index.css";

const COPY = {
  en: {
    title: "Sources and corrections",
    lede1:
      "The history chapters draw on books, UN and archival records, and reporting by Palestinian, Israeli and international human rights organisations. Disagreements between historians are noted in the text. Casualty and displacement figures should be read with their attribution and date, especially in the chapter covering events since 2023.",
    lede2Pre:
      "The list below is a guide to the sources used, not a sentence-by-sentence bibliography. Links in the chapters point to relevant entries here. For memoir, fiction and poetry as well as more history, see ",
    furtherReadingLink: "further reading",
    lede2Post: ".",
    correctionTitle: "Found an error?",
    correctionPre:
      "If something on this site is factually wrong, out of date, or misattributed, please ",
    correctionLink: "open an issue on GitHub",
    correctionPost:
      ". Include the page, the passage and a source for the correction so it can be checked.",
    headTitle: "Sources",
    headDescription:
      "The books, archives, UN records and human rights organisations this project draws on, and how to flag a correction.",
  },
  ar: {
    title: "المصادر والتصويبات",
    lede1:
      "تستند فصول التاريخ إلى الكتب والسجلات الأممية والأرشيفية وتقارير منظمات حقوق الإنسان الفلسطينية والإسرائيلية والدولية. يذكر النص مواضع الخلاف بين المؤرخين. وينبغي قراءة أرقام الضحايا والتهجير مع مصادرها وتواريخها، خصوصًا في الفصل الذي يغطي الأحداث منذ عام 2023.",
    lede2Pre:
      "القائمة أدناه دليل إلى المصادر المستخدمة، وليست توثيقًا لكل جملة. تشير روابط الفصول إلى المداخل ذات الصلة هنا. للمذكرات والروايات والشعر ومزيد من كتب التاريخ، انظر ",
    furtherReadingLink: "قراءات إضافية",
    lede2Post: ".",
    correctionTitle: "وجدت خطأ؟",
    correctionPre:
      "إذا كان هناك شيء غير دقيق أو قديم أو منسوب خطأً في هذا الموقع، يرجى ",
    correctionLink: "فتح تذكرة على GitHub",
    correctionPost:
      ". أرفق الصفحة والمقطع ومصدرًا للتصويب حتى يمكن التحقق منه.",
    headTitle: "المصادر",
    headDescription:
      "الكتب والأرشيفات وسجلات الأمم المتحدة ومنظمات حقوق الإنسان التي يعتمد عليها هذا المشروع، وكيفية الإبلاغ عن تصويب.",
  },
};

export default component$(() => {
  const loc = useLocation();
  const locale = getLocaleFromPathname(loc.url.pathname);
  const copy = COPY[locale];
  const strings = UI_STRINGS[locale];

  return (
    <Container width="content">
      <PageHeader title={copy.title} compact>
        <p>{copy.lede1}</p>
        <p>
          {copy.lede2Pre}
          <a href={localizedPathname("/further-reading/", locale)}>
            {copy.furtherReadingLink}
          </a>
          {copy.lede2Post}
        </p>
      </PageHeader>

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
            <span class="visually-hidden">{strings.opensNewTab}</span>
          </a>
          {copy.correctionPost}
        </p>
      </div>
    </Container>
  );
});

export const head: DocumentHead = ({ url }) =>
  localizedHead(getLocaleFromPathname(url.pathname), COPY);
