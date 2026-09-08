import { component$, Slot } from "@builder.io/qwik";
import { ArticleShell } from "~/components/layout/article-shell";

export default component$(() => {
  return (
    <ArticleShell eyebrow="Culture">
      <Slot />
    </ArticleShell>
  );
});
