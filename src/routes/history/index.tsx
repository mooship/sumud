import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import { Container } from "~/components/ui/container";
import { HISTORY_CHAPTERS } from "~/content/history-chapters";
import * as styles from "./index.css";

export default component$(() => {
  return (
    <Container width="content">
      <header class={styles.header}>
        <p class={styles.eyebrow}>History</p>
        <h1 class={styles.title}>Palestine, chapter by chapter</h1>
        <p class={styles.lede}>
          This is one continuous story told in seven parts: an Ottoman province,
          a British Mandate, a partition and a catastrophe, decades of exile and
          occupation, and the Palestine of today. Each chapter stands alone, but
          they are meant to be read in order.
        </p>
      </header>

      <div class={styles.list}>
        {HISTORY_CHAPTERS.map((chapter) => (
          <Link
            key={chapter.slug}
            href={`/history/${chapter.slug}/`}
            class={styles.item}
          >
            <span class={styles.itemDot} />
            <span class={styles.itemPeriod}>{chapter.period}</span>
            <div>
              <h2 class={styles.itemTitle}>{chapter.title}</h2>
              <p class={styles.itemSummary}>{chapter.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
});

export const head: DocumentHead = {
  title: "History",
  meta: [
    {
      name: "description",
      content:
        "The history of Palestine from Ottoman rule through the British Mandate, the Nakba, occupation and exile, to the present day.",
    },
  ],
};
