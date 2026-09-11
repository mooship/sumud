import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Container } from "~/components/ui/container";
import { JsonLd } from "~/components/seo/json-ld";
import { GLOSSARY_CATEGORIES } from "~/content/glossary";
import * as styles from "./index.css";

export default component$(() => {
  const allTerms = GLOSSARY_CATEGORIES.flatMap((c) => c.terms);

  return (
    <Container width="content">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "DefinedTermSet",
          name: "Sumud Glossary",
          hasDefinedTerm: allTerms.map((term) => ({
            "@type": "DefinedTerm",
            name: term.term,
            description: term.definition,
          })),
        }}
      />
      <header class={styles.header}>
        <p class={styles.eyebrow}>Glossary</p>
        <h1 class={styles.title}>Terms used on this site</h1>
        <p class={styles.lede}>
          Words and names that recur across the history chapters, defined in one
          place for readers who land partway through the story. For the books,
          archives and organisations behind the facts themselves, see{" "}
          <a href="/sources/">sources</a>.
        </p>
      </header>

      {GLOSSARY_CATEGORIES.map((category) => (
        <section key={category.title} class={styles.section}>
          <h2 class={styles.sectionTitle}>{category.title}</h2>
          <p class={styles.sectionIntro}>{category.intro}</p>
          <dl class={styles.entryList}>
            {category.terms.map((term) => (
              <div key={term.term} class={styles.entry}>
                <dt class={styles.term}>
                  {term.term}
                  {term.arabic && (
                    <span class={styles.arabic}> · {term.arabic}</span>
                  )}
                </dt>
                <dd class={styles.definition}>{term.definition}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </Container>
  );
});

export const head: DocumentHead = {
  title: "Glossary",
  meta: [
    {
      name: "description",
      content:
        "A glossary of terms, places and institutions used throughout Sumud's history of Palestine.",
    },
  ],
};
