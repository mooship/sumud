import { describe, expect, it } from "vitest";
import { createDOM } from "@builder.io/qwik/testing";
import {
  QwikCityMockProvider,
  type DocumentHeadProps,
  type DocumentHeadValue,
} from "@builder.io/qwik-city";
import SearchIndex, { head } from "./index";
import { SEARCH_MOUNT_ID } from "./pagefind";

function resolveHead(pathname: string): DocumentHeadValue {
  return (head as (props: DocumentHeadProps) => DocumentHeadValue)({
    url: new URL(pathname, "http://localhost"),
  } as unknown as DocumentHeadProps);
}

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
    const documentHead = resolveHead("/search/");
    expect(documentHead.title).toBe("Search");
    expect(documentHead.meta?.[0]?.content?.length).toBeGreaterThan(0);
  });

  it("switches to Arabic copy and page head under /ar/", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider url="http://localhost/ar/search/">
        <SearchIndex />
      </QwikCityMockProvider>,
    );
    expect(screen.querySelector("h1")?.textContent).toBe("البحث في صمود");

    const documentHead = resolveHead("/ar/search/");
    expect(documentHead.title).toBe("بحث");
    expect(documentHead.meta?.[0]?.content?.length).toBeGreaterThan(0);
  });
});
