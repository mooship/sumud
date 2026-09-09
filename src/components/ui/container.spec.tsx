import { describe, expect, it } from "vitest";
import { createDOM } from "@builder.io/qwik/testing";
import { Container } from "./container";

describe("Container", () => {
  it("renders a div by default with the content width variant", async () => {
    const { screen, render } = await createDOM();
    await render(
      <Container>
        <p>Hello</p>
      </Container>,
    );
    const div = screen.querySelector("div");
    expect(div).not.toBeNull();
    expect(div?.className.length).toBeGreaterThan(0);
    expect(screen.querySelector("p")?.textContent).toBe("Hello");
  });

  it("renders as the given element with the wide variant", async () => {
    const { screen, render } = await createDOM();
    await render(
      <Container as="section" width="wide">
        <p>Wide content</p>
      </Container>,
    );
    expect(screen.querySelector("div")).toBeFalsy();
    const section = screen.querySelector("section");
    expect(section).not.toBeNull();
    expect(section?.className.length).toBeGreaterThan(0);
  });
});
