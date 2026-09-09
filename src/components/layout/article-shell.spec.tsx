import { describe, expect, it } from "vitest";
import { createDOM } from "@builder.io/qwik/testing";
import { QwikCityMockProvider } from "@builder.io/qwik-city";
import { ArticleShell } from "./article-shell";

describe("ArticleShell", () => {
  it("renders the eyebrow, the document head title, and the slotted content", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider>
        <ArticleShell eyebrow="About">
          <p>Body copy</p>
        </ArticleShell>
      </QwikCityMockProvider>,
    );
    expect(screen.querySelector("span")?.textContent).toBe("About");
    expect(screen.querySelector("h1")).not.toBeNull();
    expect(screen.querySelector("p")?.textContent).toBe("Body copy");
  });
});
