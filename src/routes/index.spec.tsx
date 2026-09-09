import { describe, expect, it } from "vitest";
import { createDOM } from "@builder.io/qwik/testing";
import {
  QwikCityMockProvider,
  type DocumentHeadValue,
} from "@builder.io/qwik-city";
import { HISTORY_CHAPTERS } from "~/content/history-chapters";
import HomeIndex, { head } from "./index";

const documentHead = head as DocumentHeadValue;

describe("routes/index (homepage)", () => {
  it("renders the hero, a WebSite JSON-LD block, and the pull quote", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider>
        <HomeIndex />
      </QwikCityMockProvider>,
    );
    expect(screen.querySelector("h1")?.textContent).toBe("Sumud");
    const jsonLd = JSON.parse(
      screen.querySelector('script[type="application/ld+json"]')?.innerHTML ??
        "{}",
    );
    expect(jsonLd["@type"]).toBe("WebSite");
    expect(screen.querySelector("blockquote")?.textContent).toContain(
      "We have on this land",
    );
  });

  it("links to the history, culture, and take-action sections plus every chapter", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider>
        <HomeIndex />
      </QwikCityMockProvider>,
    );
    const hrefs = Array.from(screen.querySelectorAll("a"), (a) =>
      a.getAttribute("href"),
    );
    expect(hrefs).toContain("/history/");
    expect(hrefs).toContain("/culture/");
    expect(hrefs).toContain("/take-action/");
    for (const chapter of HISTORY_CHAPTERS) {
      expect(hrefs).toContain(`/history/${chapter.slug}/`);
    }
  });

  it("sets a page title and description", () => {
    expect(documentHead.title).toBe("Sumud -- the story of Palestine");
    expect(documentHead.meta?.[0]?.content?.length).toBeGreaterThan(0);
  });
});
