import { describe, expect, it } from "vitest";

describe("global.css", () => {
  it("registers the site's global styles without error", async () => {
    await expect(import("./global.css")).resolves.toBeDefined();
  });
});
