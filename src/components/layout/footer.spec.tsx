import { describe, expect, it } from "vitest";
import { createDOM } from "@builder.io/qwik/testing";
import { QwikCityMockProvider } from "@builder.io/qwik-city";
import { NAV_ITEMS } from "~/content/nav";
import { Footer } from "./footer";

describe("Footer", () => {
  it("links to every nav item plus the project links", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider>
        <Footer />
      </QwikCityMockProvider>,
    );
    const hrefs = Array.from(screen.querySelectorAll("a"), (a) =>
      a.getAttribute("href"),
    );
    for (const item of NAV_ITEMS) {
      expect(hrefs).toContain(item.href);
    }
    expect(hrefs).toContain("https://github.com/mooship/sumud");
    expect(hrefs).toContain("/sources/");
    expect(hrefs).toContain("/privacy/");
  });

  it("uses real headings and marks the Arabic wordmark", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider>
        <Footer />
      </QwikCityMockProvider>,
    );
    expect(screen.querySelectorAll(":scope footer h2")).toHaveLength(3);
    const wordmark = screen.querySelector(':scope footer h2 [lang="ar"]');
    expect(wordmark?.textContent?.trim()).toBe("صمود");
    expect(wordmark?.getAttribute("dir")).toBe("rtl");
  });
});
