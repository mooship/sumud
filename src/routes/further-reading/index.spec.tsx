import { describe, expect, it } from "vitest";
import { createDOM } from "@builder.io/qwik/testing";
import {
  QwikCityMockProvider,
  type DocumentHeadProps,
  type DocumentHeadValue,
} from "@builder.io/qwik-city";
import { BOOK_CATEGORIES } from "~/content/books";
import FurtherReadingIndex, { head } from "./index";

function resolveHead(pathname: string): DocumentHeadValue {
  return (head as (props: DocumentHeadProps) => DocumentHeadValue)({
    url: new URL(pathname, "http://localhost"),
  } as unknown as DocumentHeadProps);
}

describe("routes/further-reading index", () => {
  it("renders every book category and every book title", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider>
        <FurtherReadingIndex />
      </QwikCityMockProvider>,
    );
    const categoryTitles = Array.from(
      screen.querySelectorAll("h2"),
      (h2) => h2.textContent,
    );
    for (const category of BOOK_CATEGORIES) {
      expect(categoryTitles).toContain(category.title);
    }
    const bodyText = screen.textContent ?? "";
    const allBooks = BOOK_CATEGORIES.flatMap((c) => c.books);
    for (const book of allBooks) {
      expect(bodyText).toContain(book.title);
      expect(bodyText).toContain(book.author);
    }
  });

  it("renders an ItemList JSON-LD block listing every book", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider>
        <FurtherReadingIndex />
      </QwikCityMockProvider>,
    );
    const jsonLd = JSON.parse(
      screen.querySelector('script[type="application/ld+json"]')?.innerHTML ??
        "{}",
    );
    expect(jsonLd["@type"]).toBe("ItemList");
    const allBooks = BOOK_CATEGORIES.flatMap((c) => c.books);
    expect(jsonLd.itemListElement).toHaveLength(allBooks.length);
    expect(jsonLd.itemListElement[0].item).toMatchObject({
      "@type": "Book",
      name: allBooks[0]?.title,
      author: { "@type": "Person", name: allBooks[0]?.author },
    });
  });

  it("sets a page title and description", () => {
    const documentHead = resolveHead("/further-reading/");
    expect(documentHead.title).toBe("Further Reading");
    expect(documentHead.meta?.[0]?.content?.length).toBeGreaterThan(0);
  });

  it("switches to Arabic category titles, book descriptions and page head under /ar/", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider url="http://localhost/ar/further-reading/">
        <FurtherReadingIndex />
      </QwikCityMockProvider>,
    );
    const categoryTitles = Array.from(
      screen.querySelectorAll("h2"),
      (h2) => h2.textContent,
    );
    for (const category of BOOK_CATEGORIES) {
      expect(categoryTitles).toContain(category.ar.title);
    }
    const bodyText = screen.textContent ?? "";
    const allBooks = BOOK_CATEGORIES.flatMap((c) => c.books);
    for (const book of allBooks) {
      expect(bodyText).toContain(book.title);
      expect(bodyText).toContain(book.ar.description);
    }
    expect(screen.querySelector('a[href="/ar/sources/"]')).toBeTruthy();

    const jsonLd = JSON.parse(
      screen.querySelector('script[type="application/ld+json"]')?.innerHTML ??
        "{}",
    );
    expect(jsonLd.itemListElement[0].item.description).toBe(
      allBooks[0]?.ar.description,
    );

    const documentHead = resolveHead("/ar/further-reading/");
    expect(documentHead.title).toBe("قراءات إضافية");
    expect(documentHead.meta?.[0]?.content?.length).toBeGreaterThan(0);
  });
});
