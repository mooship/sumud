import { describe, expect, it } from "vitest";
import { createDOM } from "@builder.io/qwik/testing";
import { Prose } from "./prose";

describe("Prose", () => {
  it("wraps its slot content in a styled div", async () => {
    const { screen, render } = await createDOM();
    await render(
      <Prose class="extra">
        <p>Some prose</p>
      </Prose>,
    );
    const div = screen.querySelector("div");
    expect(div?.className).toContain("extra");
    expect(screen.querySelector("p")?.textContent).toBe("Some prose");
  });
});
