import { describe, expect, it } from "vitest";
import { createDOM } from "@builder.io/qwik/testing";
import { QwikCityMockProvider } from "@builder.io/qwik-city";
import CultureLayout from "./layout";

describe("culture/layout", () => {
  it("wraps its slot in an ArticleShell with the Culture eyebrow", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider>
        <CultureLayout>
          <p>Culture body</p>
        </CultureLayout>
      </QwikCityMockProvider>,
    );
    expect(screen.querySelector("span")?.textContent).toBe("Culture");
    expect(screen.querySelector("p")?.textContent).toBe("Culture body");
  });

  it("switches to the Arabic eyebrow under /ar/", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider url="http://localhost/ar/culture/">
        <CultureLayout>
          <p>Culture body</p>
        </CultureLayout>
      </QwikCityMockProvider>,
    );
    expect(screen.querySelector("span")?.textContent).toBe("الثقافة");
  });
});
