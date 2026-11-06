import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link, useLocation } from "@builder.io/qwik-city";
import { Container } from "~/components/ui/container";
import { OrnamentDivider } from "~/components/ui/ornament-divider";
import { getLocaleFromPathname, localizedPathname } from "~/lib/locale";
import * as styles from "./404.css";

const COPY = {
  en: {
    title: "This page isn't here",
    bodyPre: "Try the ",
    historyLink: "history chapters",
    bodyMid: " or ",
    searchLink: "search",
    bodyPost: ".",
    headTitle: "Page not found",
  },
  ar: {
    title: "هذه الصفحة غير موجودة",
    bodyPre: "جرّب ",
    historyLink: "فصول التاريخ",
    bodyMid: " أو ",
    searchLink: "البحث",
    bodyPost: ".",
    headTitle: "الصفحة غير موجودة",
  },
};

export default component$(() => {
  const loc = useLocation();
  const locale = getLocaleFromPathname(loc.url.pathname);
  const copy = COPY[locale];

  return (
    <Container width="content" class={styles.page}>
      <OrnamentDivider class={styles.ornament} />
      <h1 class={styles.title}>{copy.title}</h1>
      <p class={styles.body}>
        {copy.bodyPre}
        <Link href={localizedPathname("/history/", locale)}>
          {copy.historyLink}
        </Link>
        {copy.bodyMid}
        <Link href={localizedPathname("/search/", locale)}>
          {copy.searchLink}
        </Link>
        {copy.bodyPost}
      </p>
    </Container>
  );
});

export const head: DocumentHead = ({ url }) => ({
  title: COPY[getLocaleFromPathname(url.pathname)].headTitle,
  meta: [{ name: "robots", content: "noindex" }],
});
