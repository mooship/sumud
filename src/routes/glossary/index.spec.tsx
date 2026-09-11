import { describe, expect, it } from "vitest";
import { createDOM } from "@builder.io/qwik/testing";
import {
  QwikCityMockProvider,
  type DocumentHeadValue,
} from "@builder.io/qwik-city";
import { GLOSSARY_CATEGORIES } from "~/content/glossary";
import GlossaryIndex, { head } from "./index";

const documentHead = head as DocumentHeadValue;

describe("routes/glossary index", () => {
  it("renders every glossary category and every term", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider>
        <GlossaryIndex />
      </QwikCityMockProvider>,
    );
    const categoryTitles = Array.from(
      screen.querySelectorAll("h2"),
      (h2) => h2.textContent,
    );
    for (const category of GLOSSARY_CATEGORIES) {
      expect(categoryTitles).toContain(category.title);
    }
    const bodyText = screen.textContent ?? "";
    const allTerms = GLOSSARY_CATEGORIES.flatMap((c) => c.terms);
    for (const term of allTerms) {
      expect(bodyText).toContain(term.term);
    }
  });

  it("renders a DefinedTermSet JSON-LD block listing every term", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider>
        <GlossaryIndex />
      </QwikCityMockProvider>,
    );
    const jsonLd = JSON.parse(
      screen.querySelector('script[type="application/ld+json"]')?.innerHTML ??
        "{}",
    );
    expect(jsonLd["@type"]).toBe("DefinedTermSet");
    const allTerms = GLOSSARY_CATEGORIES.flatMap((c) => c.terms);
    expect(jsonLd.hasDefinedTerm).toHaveLength(allTerms.length);
    expect(jsonLd.hasDefinedTerm[0]).toMatchObject({
      "@type": "DefinedTerm",
      name: allTerms[0]?.term,
    });
  });

  it("sets a page title and description", () => {
    expect(documentHead.title).toBe("Glossary");
    expect(documentHead.meta?.[0]?.content?.length).toBeGreaterThan(0);
  });
});
