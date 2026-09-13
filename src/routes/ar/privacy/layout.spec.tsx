import { describe, expect, it } from "vitest";
import { createDOM } from "@builder.io/qwik/testing";
import { QwikCityMockProvider } from "@builder.io/qwik-city";
import ArPrivacyLayout from "./layout";

describe("ar/privacy/layout", () => {
  it("wraps its slot in an ArticleShell with the Arabic eyebrow", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider>
        <ArPrivacyLayout>
          <p>Privacy body</p>
        </ArPrivacyLayout>
      </QwikCityMockProvider>,
    );
    expect(screen.querySelector("span")?.textContent).toBe("قانوني");
    expect(screen.querySelector("p")?.textContent).toBe("Privacy body");
  });
});
