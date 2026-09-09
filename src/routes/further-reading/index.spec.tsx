import { describe, expect, it } from "vitest";
import { createDOM } from "@builder.io/qwik/testing";
import {
  QwikCityMockProvider,
  type DocumentHeadValue,
} from "@builder.io/qwik-city";
import { BOOK_CATEGORIES } from "~/content/books";
import FurtherReadingIndex, { head } from "./index";

const documentHead = head as DocumentHeadValue;

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

  it("sets a page title and description", () => {
    expect(documentHead.title).toBe("Further Reading");
    expect(documentHead.meta?.[0]?.content?.length).toBeGreaterThan(0);
  });
});
