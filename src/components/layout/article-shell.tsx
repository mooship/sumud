import { component$, Slot } from "@builder.io/qwik";
import { useDocumentHead } from "@builder.io/qwik-city";
import { Container } from "~/components/ui/container";
import { Prose } from "~/components/ui/prose";
import * as styles from "~/routes/history/(chapter)/layout.css";

export interface ArticleShellProps {
  eyebrow: string;
}

/** Shared shell for standalone long-form (MDX) pages that aren't part of the history chapter
 *  sequence -- e.g. Culture and About. */
export const ArticleShell = component$<ArticleShellProps>(({ eyebrow }) => {
  const head = useDocumentHead();

  return (
    <Container width="content" as="article">
      <header class={styles.header}>
        <span class={styles.period}>{eyebrow}</span>
        <h1 class={styles.title}>{head.title}</h1>
      </header>
      <Prose>
        <Slot />
      </Prose>
    </Container>
  );
});
