import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Container } from "~/components/ui/container";
import { SOURCE_SECTIONS } from "~/content/sources";
import * as styles from "./index.css";

export default component$(() => {
  return (
    <Container width="content">
      <header class={styles.header}>
        <p class={styles.eyebrow}>Sources</p>
        <h1 class={styles.title}>How this was written</h1>
        <p class={styles.lede}>
          This project synthesises mainstream historical scholarship, UN and
          archival records, and reporting from human rights organisations across
          the political spectrum -- Israeli, Palestinian and international.
          Where historians genuinely disagree, we have tried to say so rather
          than flatten the disagreement. Figures for casualties and
          displacement, particularly for events since 2023, are attributed to
          their source rather than stated as uncontested fact, because they
          often are contested.
        </p>
        <p class={styles.lede}>
          This is not an academic work with a footnote for every sentence. It is
          a synthesis, and synthesis involves judgement. The list below is not
          exhaustive, but it represents the kinds of sources drawn on throughout
          the site. For a longer list of books, including memoir, fiction and
          poetry, see <a href="/further-reading/">further reading</a>.
        </p>
      </header>

      {SOURCE_SECTIONS.map((section) => (
        <section key={section.title} class={styles.section}>
          <h2 class={styles.sectionTitle}>{section.title}</h2>
          <div class={styles.entryList}>
            {section.entries.map((entry) => (
              <div key={entry.name} class={styles.entry}>
                <p class={styles.entryName}>{entry.name}</p>
                <p class={styles.entryMeta}>{entry.meta}</p>
              </div>
            ))}
          </div>
        </section>
      ))}

      <div class={styles.correctionBox}>
        <p class={styles.correctionTitle}>Found an error?</p>
        <p>
          If something on this site is factually wrong, out of date, or
          misattributed, please{" "}
          <a
            href="https://github.com/mooship/sumud/issues/new"
            target="_blank"
            rel="noopener noreferrer"
          >
            open an issue on GitHub
            <span class="visually-hidden"> (opens in a new tab)</span>
          </a>
          . Corrections are welcome and will be reviewed and, where warranted,
          applied promptly.
        </p>
      </div>
    </Container>
  );
});

export const head: DocumentHead = {
  title: "Sources",
  meta: [
    {
      name: "description",
      content:
        "The books, archives, UN records and human rights organisations this project draws on, and how to flag a correction.",
    },
  ],
};
