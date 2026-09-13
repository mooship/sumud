import { describe, expect, it } from "vitest";
import { createDOM } from "@builder.io/qwik/testing";
import { QwikCityMockProvider } from "@builder.io/qwik-city";
import { HeadSeeder } from "~/testing/head-seeder";
import ChapterLayout from "./layout";

describe("history/(chapter)/layout", () => {
  it("shows no previous link on the first chapter, and a next link", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider url="http://localhost/history/ottoman-palestine/">
        <HeadSeeder title="Ottoman Palestine" />
        <ChapterLayout>
          <p>Body</p>
        </ChapterLayout>
      </QwikCityMockProvider>,
    );
    const nav = screen.querySelector('nav[aria-label="Chapter navigation"]');
    const links = Array.from(nav?.querySelectorAll("a") ?? []);
    expect(links).toHaveLength(1);
    expect(links[0]?.getAttribute("href")).toBe("/history/british-mandate/");
  });

  it("shows both previous and next links on a middle chapter", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider url="http://localhost/history/nakba/">
        <HeadSeeder title="Nakba" />
        <ChapterLayout>
          <p>Body</p>
        </ChapterLayout>
      </QwikCityMockProvider>,
    );
    const nav = screen.querySelector('nav[aria-label="Chapter navigation"]');
    const hrefs = Array.from(nav?.querySelectorAll("a") ?? [], (a) =>
      a.getAttribute("href"),
    );
    expect(hrefs).toEqual([
      "/history/british-mandate/",
      "/history/occupation-and-exile/",
    ]);
  });

  it("shows no next link on the last chapter", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider url="http://localhost/history/gaza-and-the-present/">
        <HeadSeeder title="Gaza and the Present" />
        <ChapterLayout>
          <p>Body</p>
        </ChapterLayout>
      </QwikCityMockProvider>,
    );
    const nav = screen.querySelector('nav[aria-label="Chapter navigation"]');
    const links = Array.from(nav?.querySelectorAll("a") ?? []);
    expect(links).toHaveLength(1);
    expect(links[0]?.getAttribute("href")).toBe("/history/oslo-to-blockade/");
  });

  it("shows neither link for an unrecognised slug", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider url="http://localhost/history/unknown-chapter/">
        <HeadSeeder title="Unknown" />
        <ChapterLayout>
          <p>Body</p>
        </ChapterLayout>
      </QwikCityMockProvider>,
    );
    const nav = screen.querySelector('nav[aria-label="Chapter navigation"]');
    expect(nav?.querySelectorAll("a")).toHaveLength(0);
  });

  it("renders the frontmatter period badge when present", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider url="http://localhost/history/nakba/">
        <HeadSeeder title="Nakba" frontmatter={{ period: "1947 – 1949" }} />
        <ChapterLayout>
          <p>Body</p>
        </ChapterLayout>
      </QwikCityMockProvider>,
    );
    const header = screen.querySelector("header");
    expect(header?.querySelector("span")?.textContent).toBe("1947 – 1949");
  });

  it("shows a verified-date line on the current chapter", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider url="http://localhost/history/gaza-and-the-present/">
        <HeadSeeder title="Siege, War and the Present" />
        <ChapterLayout>
          <p>Body</p>
        </ChapterLayout>
      </QwikCityMockProvider>,
    );
    const header = screen.querySelector("header");
    expect(header?.textContent).toContain("last verified 12 September 2026");
  });

  it("omits the verified-date line on a settled historical chapter", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider url="http://localhost/history/nakba/">
        <HeadSeeder title="Nakba" />
        <ChapterLayout>
          <p>Body</p>
        </ChapterLayout>
      </QwikCityMockProvider>,
    );
    const header = screen.querySelector("header");
    expect(header?.textContent).not.toContain("last verified");
  });

  it("omits the period badge when the frontmatter has none", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider url="http://localhost/history/nakba/">
        <HeadSeeder title="Nakba" />
        <ChapterLayout>
          <p>Body</p>
        </ChapterLayout>
      </QwikCityMockProvider>,
    );
    const header = screen.querySelector("header");
    expect(header?.querySelector("span")).toBeFalsy();
  });

  it("renders both JSON-LD scripts using the page title and description", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider url="http://localhost/history/nakba/">
        <HeadSeeder
          title="Nakba"
          meta={[
            { key: "d", name: "description", content: "What happened in 1948" },
          ]}
        />
        <ChapterLayout>
          <p>Body</p>
        </ChapterLayout>
      </QwikCityMockProvider>,
    );
    const scripts = Array.from(
      screen.querySelectorAll('script[type="application/ld+json"]'),
      (s) => JSON.parse(s.innerHTML),
    );
    expect(scripts).toHaveLength(2);
    expect(scripts[0]).toMatchObject({
      "@type": "Article",
      headline: "Nakba",
      description: "What happened in 1948",
    });
    expect(scripts[0]).not.toHaveProperty("dateModified");
    expect(scripts[1]).toMatchObject({ "@type": "BreadcrumbList" });
  });

  it("includes dateModified in the Article JSON-LD for the current chapter", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider url="http://localhost/history/gaza-and-the-present/">
        <HeadSeeder title="Siege, War and the Present" />
        <ChapterLayout>
          <p>Body</p>
        </ChapterLayout>
      </QwikCityMockProvider>,
    );
    const script = screen.querySelector('script[type="application/ld+json"]');
    expect(JSON.parse(script?.innerHTML ?? "{}")).toMatchObject({
      "@type": "Article",
      dateModified: "2026-09-12",
    });
  });

  it("switches to Arabic hrefs, titles and JSON-LD under /ar/", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider url="http://localhost/ar/history/nakba/">
        <HeadSeeder title="التقسيم والنكبة" />
        <ChapterLayout>
          <p>Body</p>
        </ChapterLayout>
      </QwikCityMockProvider>,
    );
    const backLink = screen.querySelector(
      'a[href="/ar/history/"]',
    ) as HTMLAnchorElement | null;
    expect(backLink?.textContent).toBe("كل الفصول");

    const nav = screen.querySelector('nav[aria-label="Chapter navigation"]');
    const hrefs = Array.from(nav?.querySelectorAll("a") ?? [], (a) =>
      a.getAttribute("href"),
    );
    expect(hrefs).toEqual([
      "/ar/history/british-mandate/",
      "/ar/history/occupation-and-exile/",
    ]);
    expect(nav?.textContent).toContain("الانتداب البريطاني");
    expect(nav?.textContent).toContain("المنفى والحكم العسكري");

    const scripts = Array.from(
      screen.querySelectorAll('script[type="application/ld+json"]'),
      (s) => JSON.parse(s.innerHTML),
    );
    expect(scripts[0]).toMatchObject({ inLanguage: "ar" });
    expect(scripts[1].itemListElement[1]).toMatchObject({ name: "التاريخ" });
  });

  it("renders the slotted content inside Prose", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider url="http://localhost/history/nakba/">
        <HeadSeeder title="Nakba" />
        <ChapterLayout>
          <p>Chapter body text</p>
        </ChapterLayout>
      </QwikCityMockProvider>,
    );
    expect(screen.querySelector("p")?.textContent).toBe("Chapter body text");
  });
});
