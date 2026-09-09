import { describe, expect, it } from "vitest";
import { BOOK_CATEGORIES } from "./books";

describe("BOOK_CATEGORIES", () => {
  const allBooks = BOOK_CATEGORIES.flatMap((c) => c.books);

  it("has at least one book in every category", () => {
    for (const category of BOOK_CATEGORIES) {
      expect(category.books.length).toBeGreaterThan(0);
    }
  });

  it("has a plausible publication year for every book", () => {
    const currentYear = new Date().getFullYear();
    for (const book of allBooks) {
      expect(book.year).toBeGreaterThan(1900);
      expect(book.year).toBeLessThanOrEqual(currentYear);
    }
  });

  it("has a non-trivial description for every book", () => {
    for (const book of allBooks) {
      expect(book.description.length).toBeGreaterThan(20);
    }
  });

  it("does not list the same book title twice", () => {
    const titles = allBooks.map((b) => b.title);
    expect(new Set(titles).size).toBe(titles.length);
  });
});
