import { component$, Slot } from "@builder.io/qwik";
import * as styles from "./page-header.css";

export interface PageHeaderProps {
  title: string;
  // Reference pages (glossary, sources, search) get a tighter header.
  compact?: boolean;
}

/**
 * The title band for listing and reference pages. Lede paragraphs go in the slot. There is
 * no eyebrow: on these pages it only repeated the nav label.
 */
export const PageHeader = component$<PageHeaderProps>(({ title, compact }) => {
  return (
    <header class={compact ? styles.compact : styles.header}>
      <h1 class={compact ? styles.compactTitle : styles.title}>{title}</h1>
      <Slot />
    </header>
  );
});
