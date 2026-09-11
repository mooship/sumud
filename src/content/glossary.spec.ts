import { describe, expect, it } from "vitest";
import { GLOSSARY_CATEGORIES } from "./glossary";

describe("GLOSSARY_CATEGORIES", () => {
  const allTerms = GLOSSARY_CATEGORIES.flatMap((c) => c.terms);

  it("has at least one term in every category", () => {
    for (const category of GLOSSARY_CATEGORIES) {
      expect(category.terms.length).toBeGreaterThan(0);
    }
  });

  it("has a non-trivial definition for every term", () => {
    for (const term of allTerms) {
      expect(term.definition.length).toBeGreaterThan(20);
    }
  });

  it("does not list the same term twice", () => {
    const names = allTerms.map((t) => t.term);
    expect(new Set(names).size).toBe(names.length);
  });

  it("does not repeat a category title", () => {
    const titles = GLOSSARY_CATEGORIES.map((c) => c.title);
    expect(new Set(titles).size).toBe(titles.length);
  });
});
