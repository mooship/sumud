import { component$, useTask$ } from "@builder.io/qwik";
import { useDocumentHead } from "@builder.io/qwik-city";

/**
 * A deliberately narrower stand-in for `DocumentHeadValue` -- its real
 * `styles`/`scripts` types (`QwikIntrinsicElements['style'/'script']`)
 * include a `ref` function, which `qwik/valid-lexical-scope` rejects as
 * unserializable across the `useTask$` closure below.
 */
export interface SeedableHead {
  title?: string;
  meta?: { key?: string; name?: string; property?: string; content?: string }[];
  links?: { key?: string; rel?: string; href?: string }[];
  styles?: { key?: string; style: string; props?: Record<string, unknown> }[];
  scripts?: { key?: string; script: string; props?: Record<string, unknown> }[];
  frontmatter?: Record<string, unknown>;
}

/**
 * Test-only helper: seeds the shared `DocumentHeadContext` store that
 * `QwikCityMockProvider` creates, so a sibling component under test can read
 * a populated head instead of the provider's empty default -- there's no way
 * to do this through `QwikCityMockProvider`'s own public props. The mutation
 * runs inside `useTask$` rather than directly in the render body -- Qwik's
 * dev mode flags synchronous store writes during render as an error, since
 * they're meant to happen in a task.
 */
export const HeadSeeder = component$<SeedableHead>((props) => {
  const head = useDocumentHead();
  useTask$(() => {
    Object.assign(head, props);
  });
  // eslint-disable-next-line unicorn/no-useless-undefined -- component$ must return JSXOutput; a bare `return;` types as `void`, which TS rejects here.
  return undefined;
});
