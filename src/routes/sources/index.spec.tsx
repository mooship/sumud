import { describe, expect, it } from "vitest";
import { createDOM } from "@builder.io/qwik/testing";
import {
  QwikCityMockProvider,
  type DocumentHeadValue,
} from "@builder.io/qwik-city";
import { SOURCE_SECTIONS } from "~/content/sources";
import SourcesIndex, { head } from "./index";

const documentHead = head as DocumentHeadValue;

describe("routes/sources index", () => {
  it("renders every source section and its entries", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider>
        <SourcesIndex />
      </QwikCityMockProvider>,
    );
    const titles = Array.from(screen.querySelectorAll("h2")).map(
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
    expect(documentHead.title).toBe("Sources");
    expect(documentHead.meta?.[0]?.content?.length).toBeGreaterThan(0);
  });
});
