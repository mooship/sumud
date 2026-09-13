import { component$, Slot } from "@builder.io/qwik";
import { Link, useDocumentHead, useLocation } from "@builder.io/qwik-city";
import { Container } from "~/components/ui/container";
import { Prose } from "~/components/ui/prose";
import { JsonLd } from "~/components/seo/json-ld";
import { ArrowRight } from "~/components/ui/icons";
import { HISTORY_CHAPTERS } from "~/content/history-chapters";
import { UI_STRINGS } from "~/content/i18n";
import { NAV_ITEMS } from "~/content/nav";
import { SITE_NAME, SITE_URL } from "~/content/site";
import { formatDate } from "~/lib/format-date";
import {
  LOCALE_HTML_ATTRS,
  getLocaleFromPathname,
  localizedPathname,
} from "~/lib/locale";
import * as styles from "./layout.css";

export default component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();
  const locale = getLocaleFromPathname(loc.url.pathname);
  const strings = UI_STRINGS[locale];
  const period = (head.frontmatter as { period?: string } | undefined)?.period;

  const slug = loc.url.pathname.split("/").findLast(Boolean);
  const index = HISTORY_CHAPTERS.findIndex((c) => c.slug === slug);
  const chapter = HISTORY_CHAPTERS[index];
  const prev = HISTORY_CHAPTERS[index - 1];
  const next =
    index !== -1 && index < HISTORY_CHAPTERS.length - 1
      ? HISTORY_CHAPTERS[index + 1]
      : undefined;
  const historyHref = localizedPathname("/history/", locale);
  const chapterHref = (slugValue: string) =>
    localizedPathname(`/history/${slugValue}/`, locale);
  const historyNavItem = NAV_ITEMS.find((item) => item.href === "/history/")!;

  return (
    <Container width="content" as="article">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: head.title,
          description: head.meta.find((m) => m.name === "description")?.content,
          url: loc.url.href,
          inLanguage: LOCALE_HTML_ATTRS[locale].lang,
          isPartOf: {
            "@type": "WebSite",
            name: SITE_NAME,
            url: SITE_URL,
          },
          ...(chapter?.verified && { dateModified: chapter.verified }),
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
              name: SITE_NAME,
              item: `${SITE_URL}${localizedPathname("/", locale)}`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name:
                locale === "ar" ? historyNavItem.labelAr : historyNavItem.label,
              item: `${SITE_URL}${historyHref}`,
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
        <Link href={historyHref} class={styles.backLink}>
          {strings.allChapters}
        </Link>
        {period && <span class={styles.period}>{period}</span>}
        <h1 class={styles.title}>{head.title}</h1>
        {chapter?.verified && (
          <p class={styles.verified}>
            {strings.factsVerifiedPrefix} {formatDate(chapter.verified)}
          </p>
        )}
      </header>

      <Prose>
        <Slot />
      </Prose>

      <nav class={styles.chapterNav} aria-label="Chapter navigation">
        {prev ? (
          <Link href={chapterHref(prev.slug)} class={styles.chapterNavLink}>
            <span class={styles.chapterNavLabel}>
              {strings.previousChapter}
            </span>
            {locale === "ar" ? prev.ar.title : prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={chapterHref(next.slug)}
            class={styles.chapterNavLink}
            style={{ textAlign: "end" }}
          >
            <span class={styles.chapterNavLabel}>{strings.nextChapter}</span>
            {locale === "ar" ? next.ar.title : next.title}{" "}
            <ArrowRight size={14} class="rtl-mirror" />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </Container>
  );
});
