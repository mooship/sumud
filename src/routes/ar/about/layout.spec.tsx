import { describe, expect, it } from "vitest";
import { createDOM } from "@builder.io/qwik/testing";
import { QwikCityMockProvider } from "@builder.io/qwik-city";
import ArAboutLayout from "./layout";

describe("ar/about/layout", () => {
  it("wraps its slot in an ArticleShell with the Arabic eyebrow", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider>
        <ArAboutLayout>
          <p>About body</p>
        </ArAboutLayout>
      </QwikCityMockProvider>,
    );
    expect(screen.querySelector("span")?.textContent).toBe("عن الموقع");
    expect(screen.querySelector("p")?.textContent).toBe("About body");
  });
});
