import { describe, expect, it } from "vitest";
import { createDOM } from "@builder.io/qwik/testing";
import {
  QwikCityMockProvider,
  type DocumentHeadProps,
  type DocumentHeadValue,
} from "@builder.io/qwik-city";
import { HISTORY_CHAPTERS } from "~/content/history-chapters";
import HistoryIndex, { head } from "./index";

function resolveHead(pathname: string): DocumentHeadValue {
  return (head as (props: DocumentHeadProps) => DocumentHeadValue)({
    url: new URL(pathname, "http://localhost"),
  } as unknown as DocumentHeadProps);
}

describe("routes/history index", () => {
  it("links to every history chapter", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider>
        <HistoryIndex />
      </QwikCityMockProvider>,
    );
    const hrefs = Array.from(screen.querySelectorAll("a"), (a) =>
      a.getAttribute("href"),
    );
    for (const chapter of HISTORY_CHAPTERS) {
      expect(hrefs).toContain(`/history/${chapter.slug}/`);
    }
  });

  it("sets a page title and description", () => {
    const documentHead = resolveHead("/history/");
    expect(documentHead.title).toBe("History");
    expect(documentHead.meta?.[0]?.content?.length).toBeGreaterThan(0);
  });

  it("switches to Arabic chapter links, titles and page head under /ar/", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider url="http://localhost/ar/history/">
        <HistoryIndex />
      </QwikCityMockProvider>,
    );
    const hrefs = Array.from(screen.querySelectorAll("a"), (a) =>
      a.getAttribute("href"),
    );
    for (const chapter of HISTORY_CHAPTERS) {
      expect(hrefs).toContain(`/ar/history/${chapter.slug}/`);
      expect(screen.textContent).toContain(chapter.ar.title);
    }

    const documentHead = resolveHead("/ar/history/");
    expect(documentHead.title).toBe("التاريخ");
    expect(documentHead.meta?.[0]?.content?.length).toBeGreaterThan(0);
  });
});
