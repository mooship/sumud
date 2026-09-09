import { describe, expect, it } from "vitest";
import { createDOM } from "@builder.io/qwik/testing";
import { QwikCityMockProvider } from "@builder.io/qwik-city";
import { ButtonLink } from "./button-link";

describe("ButtonLink", () => {
  it("renders an anchor pointing at the given href", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider>
        <ButtonLink href="/take-action/">Take action</ButtonLink>
      </QwikCityMockProvider>,
    );
    const anchor = screen.querySelector("a");
    expect(anchor?.getAttribute("href")).toBe("/take-action/");
    expect(anchor?.textContent).toBe("Take action");
  });

  it("applies the secondary variant class", async () => {
    const { screen, render } = await createDOM();
    await render(
      <QwikCityMockProvider>
        <ButtonLink href="/sources/" variant="secondary">
          Sources
        </ButtonLink>
      </QwikCityMockProvider>,
    );
    const anchor = screen.querySelector("a");
    expect(anchor?.className.length).toBeGreaterThan(0);
  });
});
