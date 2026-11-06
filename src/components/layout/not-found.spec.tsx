import { describe, expect, it } from "vitest";
import { createDOM } from "@builder.io/qwik/testing";
import {
  QwikCityMockProvider,
  type DocumentHeadProps,
  type DocumentHeadValue,
} from "@builder.io/qwik-city";
import NotFound, { head } from "./not-found";

function resolveHead(pathname: string): DocumentHeadValue {
  return (head as (props: DocumentHeadProps) => DocumentHeadValue)({
    url: new URL(pathname, "http://localhost"),
  } as unknown as DocumentHeadProps);
}

describe("not-found", () => {
  it("points back to the history chapters and search", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider url="http://localhost/missing/">
        <NotFound />
      </QwikCityMockProvider>,
    );
    expect(screen.querySelector("h1")?.textContent).toBe(
      "This page isn't here",
    );
    const hrefs = Array.from(screen.querySelectorAll("a"), (a) =>
      a.getAttribute("href"),
    );
    expect(hrefs).toEqual(["/history/", "/search/"]);
  });

  it("switches to Arabic copy and links under /ar/", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider url="http://localhost/ar/missing/">
        <NotFound />
      </QwikCityMockProvider>,
    );
    expect(screen.querySelector("h1")?.textContent).toBe(
      "هذه الصفحة غير موجودة",
    );
    const hrefs = Array.from(screen.querySelectorAll("a"), (a) =>
      a.getAttribute("href"),
    );
    expect(hrefs).toEqual(["/ar/history/", "/ar/search/"]);
  });

  it("keeps the page out of search indexes", () => {
    const documentHead = resolveHead("/ar/missing/");
    expect(documentHead.title).toBe("الصفحة غير موجودة");
    expect(documentHead.meta).toContainEqual({
      name: "robots",
      content: "noindex",
    });
  });
});
