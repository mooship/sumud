import { describe, expect, it } from "vitest";
import { createDOM } from "@builder.io/qwik/testing";
import { PullQuote } from "./pull-quote";

describe("PullQuote", () => {
  it("renders the quote text and citation", async () => {
    const { screen, render } = await createDOM();
    await render(
      <PullQuote
        quote="Sumud is steadfastness."
        cite="A Palestinian proverb"
      />,
    );
    expect(screen.querySelector("blockquote")?.textContent).toBe(
      "Sumud is steadfastness.",
    );
    expect(screen.querySelector("figcaption")?.textContent).toBe(
      "A Palestinian proverb",
    );
    expect(screen.querySelector("svg")).not.toBeNull();
  });
});
