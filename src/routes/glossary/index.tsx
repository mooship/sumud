import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";
import { Container } from "~/components/ui/container";
import { JsonLd } from "~/components/seo/json-ld";
import { GLOSSARY_CATEGORIES } from "~/content/glossary";
import { localizedHead } from "~/content/i18n";
import { getLocaleFromPathname, localizedPathname } from "~/lib/locale";
import * as styles from "./index.css";

const COPY = {
  en: {
    eyebrow: "Glossary",
    title: "Terms used on this site",
    ledePre:
      "Words and names that recur across the history chapters, defined in one place for readers who land partway through the story. For the books, archives and organisations behind the facts themselves, see ",
    sourcesLink: "sources",
    ledePost: ".",
    jsonLdName: "Sumud Glossary",
    headTitle: "Glossary",
    headDescription:
      "A glossary of terms, places and institutions used throughout Sumud's history of Palestine.",
  },
  ar: {
    eyebrow: "المصطلحات",
    title: "مصطلحات مستخدمة في هذا الموقع",
    ledePre:
      "كلمات وأسماء تتكرر عبر فصول التاريخ، جُمعت تعريفاتها في مكان واحد للقراء الذين يبدأون من منتصف القصة. للاطلاع على الكتب والأرشيفات والمؤسسات التي تستند إليها الوقائع نفسها، انظر ",
    sourcesLink: "المصادر",
    ledePost: ".",
    jsonLdName: "معجم صمود",
    headTitle: "المصطلحات",
    headDescription:
      "معجم بالمصطلحات والأماكن والمؤسسات المستخدمة في تاريخ فلسطين على موقع صمود.",
  },
};

export default component$(() => {
  const loc = useLocation();
  const locale = getLocaleFromPathname(loc.url.pathname);
  const copy = COPY[locale];
  const allTerms = GLOSSARY_CATEGORIES.flatMap((c) => c.terms);

  return (
    <Container width="content">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "DefinedTermSet",
          name: copy.jsonLdName,
          hasDefinedTerm: allTerms.map((term) => ({
            "@type": "DefinedTerm",
            name: locale === "ar" ? term.ar.term : term.term,
            description: locale === "ar" ? term.ar.definition : term.definition,
          })),
        }}
      />
      <header class={styles.header}>
        <p class={styles.eyebrow}>{copy.eyebrow}</p>
        <h1 class={styles.title}>{copy.title}</h1>
        <p class={styles.lede}>
          {copy.ledePre}
          <a href={localizedPathname("/sources/", locale)}>
            {copy.sourcesLink}
          </a>
          {copy.ledePost}
        </p>
      </header>

      {GLOSSARY_CATEGORIES.map((category) => (
        <section key={category.title} class={styles.section}>
          <h2 class={styles.sectionTitle}>
            {locale === "ar" ? category.ar.title : category.title}
          </h2>
          <p class={styles.sectionIntro}>
            {locale === "ar" ? category.ar.intro : category.intro}
          </p>
          <dl class={styles.entryList}>
            {category.terms.map((term) => (
              <div key={term.id} id={term.id} class={styles.entry}>
                <dt class={styles.term}>
                  {locale === "ar" ? term.ar.term : term.term}
                  {locale === "en" && term.arabic && (
                    <span class={styles.arabic}> · {term.arabic}</span>
                  )}
                </dt>
                <dd class={styles.definition}>
                  {locale === "ar" ? term.ar.definition : term.definition}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </Container>
  );
});

export const head: DocumentHead = ({ url }) =>
  localizedHead(getLocaleFromPathname(url.pathname), COPY);
