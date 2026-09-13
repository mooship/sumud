import { describe, expect, it } from "vitest";
import { createDOM } from "@builder.io/qwik/testing";
import {
  QwikCityMockProvider,
  type DocumentHeadProps,
  type DocumentHeadValue,
} from "@builder.io/qwik-city";
import { GLOSSARY_CATEGORIES } from "~/content/glossary";
import GlossaryIndex, { head } from "./index";

function resolveHead(pathname: string): DocumentHeadValue {
  return (head as (props: DocumentHeadProps) => DocumentHeadValue)({
    url: new URL(pathname, "http://localhost"),
  } as unknown as DocumentHeadProps);
}

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
    const documentHead = resolveHead("/glossary/");
    expect(documentHead.title).toBe("Glossary");
    expect(documentHead.meta?.[0]?.content?.length).toBeGreaterThan(0);
  });

  it("switches to Arabic category and term text plus page head under /ar/", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider url="http://localhost/ar/glossary/">
        <GlossaryIndex />
      </QwikCityMockProvider>,
    );
    const categoryTitles = Array.from(
      screen.querySelectorAll("h2"),
      (h2) => h2.textContent,
    );
    for (const category of GLOSSARY_CATEGORIES) {
      expect(categoryTitles).toContain(category.ar.title);
    }
    const bodyText = screen.textContent ?? "";
    const allTerms = GLOSSARY_CATEGORIES.flatMap((c) => c.terms);
    for (const term of allTerms) {
      expect(bodyText).toContain(term.ar.term);
    }
    expect(screen.querySelector('a[href="/ar/sources/"]')).toBeTruthy();

    const jsonLd = JSON.parse(
      screen.querySelector('script[type="application/ld+json"]')?.innerHTML ??
        "{}",
    );
    expect(jsonLd.hasDefinedTerm[0]).toMatchObject({
      "@type": "DefinedTerm",
      name: allTerms[0]?.ar.term,
    });

    const documentHead = resolveHead("/ar/glossary/");
    expect(documentHead.title).toBe("المصطلحات");
    expect(documentHead.meta?.[0]?.content?.length).toBeGreaterThan(0);
  });
});
