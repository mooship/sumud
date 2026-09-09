import { describe, expect, it } from "vitest";
import { createDOM } from "@builder.io/qwik/testing";
import { QwikCityMockProvider } from "@builder.io/qwik-city";
import AboutLayout from "./layout";

describe("about/layout", () => {
  it("wraps its slot in an ArticleShell with the About eyebrow", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider>
        <AboutLayout>
          <p>About body</p>
        </AboutLayout>
      </QwikCityMockProvider>,
    );
    expect(screen.querySelector("span")?.textContent).toBe("About");
    expect(screen.querySelector("p")?.textContent).toBe("About body");
  });
});
