import { describe, expect, it } from "vitest";
import { component$, useTask$ } from "@builder.io/qwik";
import { createDOM } from "@builder.io/qwik/testing";
import { QwikCityMockProvider, useDocumentHead } from "@builder.io/qwik-city";
import {
  RouterHead,
  resolveHeadDescription,
  resolveHeadTitle,
} from "./router-head";

/**
 * Seeds the shared `DocumentHeadContext` store that `QwikCityMockProvider`
 * creates, so a sibling component can read a populated head instead of the
 * provider's empty default. The mutation runs inside `useTask$` rather than
 * directly in the render body -- Qwik's dev mode flags synchronous store
 * writes during render as an error, since they're meant to happen in a task.
 */
const HeadSeeder = component$<{
  title?: string;
  meta?: { name?: string; property?: string; content?: string }[];
  links?: { rel?: string; href?: string }[];
  styles?: { style: string; props?: Record<string, unknown> }[];
  scripts?: { script: string; props?: Record<string, unknown> }[];
}>(({ title, meta, links, styles, scripts }) => {
  const head = useDocumentHead();
  useTask$(() => {
    Object.assign(head, {
      ...(title !== undefined && { title }),
      ...(meta && { meta: meta.map((m, i) => ({ key: `m${i}`, ...m })) }),
      ...(links && { links: links.map((l, i) => ({ key: `l${i}`, ...l })) }),
      ...(styles && {
        styles: styles.map((s, i) => ({ key: `s${i}`, ...s })),
      }),
      ...(scripts && {
        scripts: scripts.map((s, i) => ({ key: `sc${i}`, ...s })),
      }),
    });
  });
  return null;
});

describe("resolveHeadTitle", () => {
  it("appends the site name to a page title", () => {
    expect(resolveHeadTitle("Nakba", "Sumud")).toBe("Nakba · Sumud");
  });

  it("falls back to the site name alone when there is no page title", () => {
    expect(resolveHeadTitle(undefined, "Sumud")).toBe("Sumud");
    expect(resolveHeadTitle("", "Sumud")).toBe("Sumud");
  });
});

describe("resolveHeadDescription", () => {
  it("finds the description meta entry", () => {
    expect(
      resolveHeadDescription(
        [{ name: "description", content: "About the Nakba" }],
        "fallback",
      ),
    ).toBe("About the Nakba");
  });

  it("falls back when no description meta entry is present", () => {
    expect(resolveHeadDescription([], "fallback")).toBe("fallback");
    expect(
      resolveHeadDescription([{ name: "og:title", content: "x" }], "fallback"),
    ).toBe("fallback");
  });
});

describe("RouterHead", () => {
  it("renders the site name, canonical link, and default description for a page with no head", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider url="https://sumud.timothybrits.co.za/about/">
        <RouterHead />
      </QwikCityMockProvider>,
    );
    expect(screen.querySelector("title")?.textContent).toBe("Sumud");
    expect(
      screen.querySelector('link[rel="canonical"]')?.getAttribute("href"),
    ).toBe("https://sumud.timothybrits.co.za/about/");
    expect(
      screen.querySelector('meta[name="description"]')?.getAttribute("content"),
    ).toContain("Sumud tells the story of Palestine");
  });

  it("uses the page's own title and description when the route sets a head", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider url="https://sumud.timothybrits.co.za/history/nakba/">
        <HeadSeeder
          title="Nakba"
          meta={[{ name: "description", content: "About the Nakba" }]}
        />
        <RouterHead />
      </QwikCityMockProvider>,
    );
    expect(screen.querySelector("title")?.textContent).toBe("Nakba · Sumud");
    expect(
      screen.querySelector('meta[name="description"]')?.getAttribute("content"),
    ).toBe("About the Nakba");
  });

  it("forwards extra meta, links, styles, and scripts from the route's head", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider>
        <HeadSeeder
          meta={[{ property: "og:extra", content: "extra-meta" }]}
          links={[{ rel: "alternate", href: "/feed.xml" }]}
          styles={[{ style: "body { color: red; }" }]}
          scripts={[{ script: "console.log('hi')" }]}
        />
        <RouterHead />
      </QwikCityMockProvider>,
    );
    expect(
      screen
        .querySelector('meta[property="og:extra"]')
        ?.getAttribute("content"),
    ).toBe("extra-meta");
    expect(
      screen.querySelector('link[rel="alternate"]')?.getAttribute("href"),
    ).toBe("/feed.xml");
    expect(screen.querySelector("style")?.innerHTML).toBe(
      "body { color: red; }",
    );
    expect(screen.querySelector("script:not([type])")?.innerHTML).toBe(
      "console.log('hi')",
    );
  });

  it("leaves an explicit dangerouslySetInnerHTML prop on a style/script untouched", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider>
        <HeadSeeder
          styles={[
            {
              style: "ignored",
              props: { dangerouslySetInnerHTML: "explicit-style" },
            },
          ]}
          scripts={[
            {
              script: "ignored",
              props: { dangerouslySetInnerHTML: "explicit-script" },
            },
          ]}
        />
        <RouterHead />
      </QwikCityMockProvider>,
    );
    expect(screen.querySelector("style")?.innerHTML).toBe("explicit-style");
    expect(screen.querySelector("script:not([type])")?.innerHTML).toBe(
      "explicit-script",
    );
  });
});
