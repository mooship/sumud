import { describe, expect, it } from "vitest";
import { createDOM } from "@builder.io/qwik/testing";
import {
  QwikCityMockProvider,
  type DocumentHeadProps,
  type DocumentHeadValue,
} from "@builder.io/qwik-city";
import { ORG_GROUPS } from "~/content/organisations";
import TakeActionIndex, { head } from "./index";

function resolveHead(pathname: string): DocumentHeadValue {
  return (head as (props: DocumentHeadProps) => DocumentHeadValue)({
    url: new URL(pathname, "http://localhost"),
  } as unknown as DocumentHeadProps);
}

describe("routes/take-action index", () => {
  it("renders every organisation group and links out to every org", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider>
        <TakeActionIndex />
      </QwikCityMockProvider>,
    );
    const titles = Array.from(
      screen.querySelectorAll("h2"),
      (h2) => h2.textContent,
    );
    for (const group of ORG_GROUPS) {
      expect(titles).toContain(group.title);
    }
    const hrefs = Array.from(screen.querySelectorAll("a"), (a) =>
      a.getAttribute("href"),
    );
    const allOrgs = ORG_GROUPS.flatMap((g) => g.orgs);
    for (const org of allOrgs) {
      expect(hrefs).toContain(org.url);
    }
  });

  it("renders an ItemList JSON-LD block listing every organisation", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider>
        <TakeActionIndex />
      </QwikCityMockProvider>,
    );
    const jsonLd = JSON.parse(
      screen.querySelector('script[type="application/ld+json"]')?.innerHTML ??
        "{}",
    );
    expect(jsonLd["@type"]).toBe("ItemList");
    const allOrgs = ORG_GROUPS.flatMap((g) => g.orgs);
    expect(jsonLd.itemListElement).toHaveLength(allOrgs.length);
    expect(jsonLd.itemListElement[0].item).toMatchObject({
      "@type": "Organization",
      name: allOrgs[0]?.name,
    });
  });

  it("sets a page title and description", () => {
    const documentHead = resolveHead("/take-action/");
    expect(documentHead.title).toBe("Take Action");
    expect(documentHead.meta?.[0]?.content?.length).toBeGreaterThan(0);
  });

  it("switches to Arabic group titles, org descriptions and page head under /ar/", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider url="http://localhost/ar/take-action/">
        <TakeActionIndex />
      </QwikCityMockProvider>,
    );
    const titles = Array.from(
      screen.querySelectorAll("h2"),
      (h2) => h2.textContent,
    );
    for (const group of ORG_GROUPS) {
      expect(titles).toContain(group.ar.title);
    }
    const bodyText = screen.textContent ?? "";
    const allOrgs = ORG_GROUPS.flatMap((g) => g.orgs);
    for (const org of allOrgs) {
      expect(bodyText).toContain(org.ar.description);
    }

    const jsonLd = JSON.parse(
      screen.querySelector('script[type="application/ld+json"]')?.innerHTML ??
        "{}",
    );
    expect(jsonLd.itemListElement[0].item.description).toBe(
      allOrgs[0]?.ar.description,
    );

    const documentHead = resolveHead("/ar/take-action/");
    expect(documentHead.title).toBe("بادر بالفعل");
    expect(documentHead.meta?.[0]?.content?.length).toBeGreaterThan(0);
  });
});
