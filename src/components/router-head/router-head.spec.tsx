import { describe, expect, it } from "vitest";
import { createDOM } from "@builder.io/qwik/testing";
import { QwikCityMockProvider } from "@builder.io/qwik-city";
import { HeadSeeder } from "~/testing/head-seeder";
import {
  RouterHead,
  resolveHeadDescription,
  resolveHeadTitle,
} from "./router-head";

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

  it("links out to the RSS and Atom feeds and sets og:image dimensions", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider url="https://sumud.timothybrits.co.za/about/">
        <RouterHead />
      </QwikCityMockProvider>,
    );
    expect(
      screen
        .querySelector('link[type="application/rss+xml"]')
        ?.getAttribute("href"),
    ).toBe("https://sumud.timothybrits.co.za/rss.xml");
    expect(
      screen
        .querySelector('link[type="application/atom+xml"]')
        ?.getAttribute("href"),
    ).toBe("https://sumud.timothybrits.co.za/atom.xml");
    expect(
      screen
        .querySelector('meta[property="og:image:width"]')
        ?.getAttribute("content"),
    ).toBe("1200");
    expect(
      screen
        .querySelector('meta[property="og:image:height"]')
        ?.getAttribute("content"),
    ).toBe("630");
  });

  it("uses the page's own title and description when the route sets a head", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider url="https://sumud.timothybrits.co.za/history/nakba/">
        <HeadSeeder
          title="Nakba"
          meta={[{ key: "d", name: "description", content: "About the Nakba" }]}
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
          meta={[{ key: "m", property: "og:extra", content: "extra-meta" }]}
          links={[{ key: "l", rel: "alternate", href: "/feed.xml" }]}
          styles={[{ key: "s", style: "body { color: red; }" }]}
          scripts={[{ key: "sc", script: "console.log('hi')" }]}
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
      screen
        .querySelector('link[rel="alternate"][href="/feed.xml"]')
        ?.getAttribute("href"),
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
              key: "s",
              style: "ignored",
              props: { dangerouslySetInnerHTML: "explicit-style" },
            },
          ]}
          scripts={[
            {
              key: "sc",
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
