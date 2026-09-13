import { describe, expect, it } from "vitest";
import { createDOM } from "@builder.io/qwik/testing";
import {
  QwikCityMockProvider,
  type DocumentHeadProps,
  type DocumentHeadValue,
} from "@builder.io/qwik-city";
import { SOURCE_SECTIONS } from "~/content/sources";
import SourcesIndex, { head } from "./index";

function resolveHead(pathname: string): DocumentHeadValue {
  return (head as (props: DocumentHeadProps) => DocumentHeadValue)({
    url: new URL(pathname, "http://localhost"),
  } as unknown as DocumentHeadProps);
}

describe("routes/sources index", () => {
  it("renders every source section and its entries", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider>
        <SourcesIndex />
      </QwikCityMockProvider>,
    );
    const titles = Array.from(
      screen.querySelectorAll("h2"),
      (h2) => h2.textContent,
    );
    for (const section of SOURCE_SECTIONS) {
      expect(titles).toContain(section.title);
    }
    expect(
      screen.querySelector(
        'a[href="https://github.com/mooship/sumud/issues/new"]',
      ),
    ).not.toBeNull();
  });

  it("sets a page title and description", () => {
    const documentHead = resolveHead("/sources/");
    expect(documentHead.title).toBe("Sources");
    expect(documentHead.meta?.[0]?.content?.length).toBeGreaterThan(0);
  });

  it("switches to Arabic section titles, entry meta and page head under /ar/", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider url="http://localhost/ar/sources/">
        <SourcesIndex />
      </QwikCityMockProvider>,
    );
    const titles = Array.from(
      screen.querySelectorAll("h2"),
      (h2) => h2.textContent,
    );
    for (const section of SOURCE_SECTIONS) {
      expect(titles).toContain(section.ar.title);
    }
    const furtherReadingLink = screen.querySelector(
      'a[href="/ar/further-reading/"]',
    );
    expect(furtherReadingLink).toBeTruthy();

    const documentHead = resolveHead("/ar/sources/");
    expect(documentHead.title).toBe("المصادر");
    expect(documentHead.meta?.[0]?.content?.length).toBeGreaterThan(0);
  });
});
