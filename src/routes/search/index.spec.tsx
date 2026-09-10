import { describe, expect, it } from "vitest";
import { createDOM } from "@builder.io/qwik/testing";
import {
  QwikCityMockProvider,
  type DocumentHeadValue,
} from "@builder.io/qwik-city";
import SearchIndex, { head } from "./index";
import { SEARCH_MOUNT_ID } from "./pagefind";

const documentHead = head as DocumentHeadValue;

describe("routes/search index", () => {
  it("renders a heading and the Pagefind mount element", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider>
        <SearchIndex />
      </QwikCityMockProvider>,
    );
    expect(screen.querySelector("h1")?.textContent).toBe("Search Sumud");
    expect(screen.querySelector(`#${SEARCH_MOUNT_ID}`)).toBeTruthy();
  });

  it("sets a page title and description", () => {
    expect(documentHead.title).toBe("Search");
    expect(documentHead.meta?.[0]?.content?.length).toBeGreaterThan(0);
  });
});
