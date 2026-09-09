import { describe, expect, it } from "vitest";
import { createDOM } from "@builder.io/qwik/testing";
import {
  QwikCityMockProvider,
  type DocumentHeadValue,
} from "@builder.io/qwik-city";
import { HISTORY_CHAPTERS } from "~/content/history-chapters";
import HistoryIndex, { head } from "./index";

const documentHead = head as DocumentHeadValue;

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
    expect(documentHead.title).toBe("History");
    expect(documentHead.meta?.[0]?.content?.length).toBeGreaterThan(0);
  });
});
