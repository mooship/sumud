import { describe, expect, it } from "vitest";
import { createDOM } from "@builder.io/qwik/testing";
import { OrnamentDivider } from "./ornament-divider";

describe("OrnamentDivider", () => {
  it("renders a decorative, hidden-from-AT svg with the sand tone by default", async () => {
    const { screen, render } = await createDOM();
    await render(<OrnamentDivider />);
    const svg = screen.querySelector("svg");
    expect(svg?.getAttribute("aria-hidden")).toBe("true");
    expect(svg?.getAttribute("role")).toBe("presentation");
    expect(svg?.querySelector("pattern")?.id).toBe("tatreez-sand");
  });

  it("uses a distinct pattern id and extra class for the olive tone", async () => {
    const { screen, render } = await createDOM();
    await render(<OrnamentDivider tone="olive" class="my-class" />);
    const svg = screen.querySelector("svg");
    expect(svg?.querySelector("pattern")?.id).toBe("tatreez-olive");
    expect(svg?.className).toContain("my-class");
  });
});
