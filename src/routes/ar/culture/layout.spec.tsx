import { describe, expect, it } from "vitest";
import { createDOM } from "@builder.io/qwik/testing";
import { QwikCityMockProvider } from "@builder.io/qwik-city";
import ArCultureLayout from "./layout";

describe("ar/culture/layout", () => {
  it("wraps its slot in an ArticleShell with the Arabic eyebrow", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider>
        <ArCultureLayout>
          <p>Culture body</p>
        </ArCultureLayout>
      </QwikCityMockProvider>,
    );
    expect(screen.querySelector("span")?.textContent).toBe("الثقافة");
    expect(screen.querySelector("p")?.textContent).toBe("Culture body");
  });
});
