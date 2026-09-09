import { describe, expect, it } from "vitest";
import { createDOM } from "@builder.io/qwik/testing";
import { QwikCityMockProvider } from "@builder.io/qwik-city";
import PrivacyLayout from "./layout";

describe("privacy/layout", () => {
  it("wraps its slot in an ArticleShell with the Legal eyebrow", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider>
        <PrivacyLayout>
          <p>Privacy body</p>
        </PrivacyLayout>
      </QwikCityMockProvider>,
    );
    expect(screen.querySelector("span")?.textContent).toBe("Legal");
    expect(screen.querySelector("p")?.textContent).toBe("Privacy body");
  });
});
