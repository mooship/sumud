import { describe, expect, it } from "vitest";
import { createDOM } from "@builder.io/qwik/testing";
import { JsonLd } from "./json-ld";

describe("JsonLd", () => {
  it("renders a JSON-LD script tag containing the serialised data", async () => {
    const { screen, render } = await createDOM();
    await render(<JsonLd data={{ "@type": "Article", name: "Nakba" }} />);
    const script = screen.querySelector("script");
    expect(script?.getAttribute("type")).toBe("application/ld+json");
    expect(JSON.parse(script?.innerHTML ?? "")).toEqual({
      "@type": "Article",
      name: "Nakba",
    });
  });
});
