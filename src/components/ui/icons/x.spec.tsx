import { describe, expect, it } from "vitest";
import { createDOM } from "@builder.io/qwik/testing";
import { X } from "./x";

describe("X icon", () => {
  it("renders an svg with the default size", async () => {
    const { screen, render } = await createDOM();
    await render(<X />);
    const svg = screen.querySelector("svg");
    expect(svg?.getAttribute("width")).toBe("20");
    expect(svg?.getAttribute("aria-hidden")).toBe("true");
  });
});
