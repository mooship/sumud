import { component$, Slot } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { ArticleShell } from "~/components/layout/article-shell";
import { getLocaleFromPathname } from "~/lib/locale";

const EYEBROW = { en: "Culture", ar: "الثقافة" };

export default component$(() => {
  const loc = useLocation();
  const locale = getLocaleFromPathname(loc.url.pathname);

  return (
    <ArticleShell eyebrow={EYEBROW[locale]}>
      <Slot />
    </ArticleShell>
  );
});
