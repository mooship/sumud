import { describe, expect, it } from "vitest";
import { createDOM } from "@builder.io/qwik/testing";
import {
  QwikCityMockProvider,
  type DocumentHeadValue,
} from "@builder.io/qwik-city";
import { ORG_GROUPS } from "~/content/organisations";
import TakeActionIndex, { head } from "./index";

const documentHead = head as DocumentHeadValue;

describe("routes/take-action index", () => {
  it("renders every organisation group and links out to every org", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider>
        <TakeActionIndex />
      </QwikCityMockProvider>,
    );
    const titles = Array.from(screen.querySelectorAll("h2")).map(
      (h2) => h2.textContent,
    );
    for (const group of ORG_GROUPS) {
      expect(titles).toContain(group.title);
    }
    const hrefs = Array.from(screen.querySelectorAll("a")).map((a) =>
      a.getAttribute("href"),
    );
    const allOrgs = ORG_GROUPS.flatMap((g) => g.orgs);
    for (const org of allOrgs) {
      expect(hrefs).toContain(org.url);
    }
  });

  it("sets a page title and description", () => {
    expect(documentHead.title).toBe("Take Action");
    expect(documentHead.meta?.[0]?.content?.length).toBeGreaterThan(0);
  });
});
