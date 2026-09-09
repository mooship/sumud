import { component$, Slot } from "@builder.io/qwik";
import { Link, useDocumentHead, useLocation } from "@builder.io/qwik-city";
import { Container } from "~/components/ui/container";
import { Prose } from "~/components/ui/prose";
import { JsonLd } from "~/components/seo/json-ld";
import { ArrowRight } from "~/components/ui/icons";
import { HISTORY_CHAPTERS } from "~/content/history-chapters";
import * as styles from "./layout.css";

export default component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();
  const period = (head.frontmatter as { period?: string } | undefined)?.period;

  const slug = loc.url.pathname.split("/").findLast(Boolean);
  const index = HISTORY_CHAPTERS.findIndex((c) => c.slug === slug);
  const prev = HISTORY_CHAPTERS[index - 1];
  const next =
    index !== -1 && index < HISTORY_CHAPTERS.length - 1
      ? HISTORY_CHAPTERS[index + 1]
      : undefined;

  return (
    <Container width="content" as="article">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: head.title,
          description: head.meta.find((m) => m.name === "description")?.content,
          url: loc.url.href,
          inLanguage: "en-GB",
          isPartOf: {
            "@type": "WebSite",
            name: "Sumud",
            url: "https://sumud.timothybrits.co.za",
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Sumud",
              item: "https://sumud.timothybrits.co.za/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "History",
              item: "https://sumud.timothybrits.co.za/history/",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: head.title,
              item: loc.url.href,
            },
          ],
        }}
      />

      <header class={styles.header}>
        <Link href="/history/" class={styles.backLink}>
          ← All chapters
        </Link>
        {period && <span class={styles.period}>{period}</span>}
        <h1 class={styles.title}>{head.title}</h1>
      </header>

      <Prose>
        <Slot />
      </Prose>

      <nav class={styles.chapterNav} aria-label="Chapter navigation">
        {prev ? (
          <Link href={`/history/${prev.slug}/`} class={styles.chapterNavLink}>
            <span class={styles.chapterNavLabel}>Previous</span>
            {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/history/${next.slug}/`}
            class={styles.chapterNavLink}
            style={{ textAlign: "right" }}
          >
            <span class={styles.chapterNavLabel}>Next</span>
            {next.title} <ArrowRight size={14} />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </Container>
  );
});
