import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Container } from "~/components/ui/container";
import { loadPagefindUI, SEARCH_MOUNT_ID } from "./pagefind";
import * as styles from "./index.css";

export default component$(() => {
  const mountRef = useSignal<HTMLDivElement>();

  // Pagefind's UI is a plain DOM/vanilla-JS widget with its own client-side search index --
  // there's no non-visible hook that fits mounting a third-party script tag like this.
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    // Guaranteed set: a visible task only runs once its element has rendered.
    loadPagefindUI(mountRef.value!.ownerDocument);
  });

  return (
    <Container width="content">
      <header class={styles.header}>
        <p class={styles.eyebrow}>Search</p>
        <h1 class={styles.title}>Search Sumud</h1>
        <p class={styles.lede}>
          Search across the history, culture and further reading on this site.
        </p>
      </header>
      <div id={SEARCH_MOUNT_ID} ref={mountRef} class={styles.mount} />
    </Container>
  );
});

export const head: DocumentHead = {
  title: "Search",
  meta: [
    {
      name: "description",
      content: "Search the history, culture and further reading on Sumud.",
    },
  ],
};
