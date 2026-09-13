import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";
import { Container } from "~/components/ui/container";
import { getLocaleFromPathname } from "~/lib/locale";
import { loadPagefindUI, SEARCH_MOUNT_ID } from "./pagefind";
import * as styles from "./index.css";

const COPY = {
  en: {
    eyebrow: "Search",
    title: "Search Sumud",
    lede: "Search across the history, culture and further reading on this site.",
  },
  ar: {
    eyebrow: "بحث",
    title: "البحث في صمود",
    lede: "ابحث في التاريخ والثقافة والقراءات الإضافية على هذا الموقع.",
  },
};

export default component$(() => {
  const loc = useLocation();
  const locale = getLocaleFromPathname(loc.url.pathname);
  const copy = COPY[locale];
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
        <p class={styles.eyebrow}>{copy.eyebrow}</p>
        <h1 class={styles.title}>{copy.title}</h1>
        <p class={styles.lede}>{copy.lede}</p>
      </header>
      <div id={SEARCH_MOUNT_ID} ref={mountRef} class={styles.mount} />
    </Container>
  );
});

export const head: DocumentHead = ({ url }) => {
  const locale = getLocaleFromPathname(url.pathname);
  return locale === "ar"
    ? {
        title: "بحث",
        meta: [
          {
            name: "description",
            content:
              "ابحث في التاريخ والثقافة والقراءات الإضافية على موقع صمود.",
          },
        ],
      }
    : {
        title: "Search",
        meta: [
          {
            name: "description",
            content:
              "Search the history, culture and further reading on Sumud.",
          },
        ],
      };
};
