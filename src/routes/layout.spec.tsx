import { describe, expect, it, vi } from "vitest";
import { createDOM } from "@builder.io/qwik/testing";
import { QwikCityMockProvider } from "@builder.io/qwik-city";
import RootLayout, { onGet } from "./layout";

describe("routes/layout onGet", () => {
  it("sets a stale-while-revalidate cache policy", async () => {
    const cacheControl = vi.fn();
    // @ts-expect-error -- only the field onGet actually reads is provided
    await onGet({ cacheControl });
    expect(cacheControl).toHaveBeenCalledWith({
      staleWhileRevalidate: 60 * 60 * 24 * 7,
      maxAge: 60 * 60,
    });
  });
});

describe("routes/layout component", () => {
  it("renders the header, main content, and footer", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider>
        <RootLayout>
          <p>Page content</p>
        </RootLayout>
      </QwikCityMockProvider>,
    );
    expect(screen.querySelector("header")).not.toBeNull();
    expect(screen.querySelector("footer")).not.toBeNull();
    const main = screen.querySelector("main#main-content");
    expect(main).not.toBeNull();
    expect(main?.textContent).toBe("Page content");
  });
});
