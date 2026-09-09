import { describe, expect, it } from "vitest";

describe("fonts", () => {
  it("imports the self-hosted variable font stylesheets without error", async () => {
    await expect(import("./fonts")).resolves.toBeDefined();
  });
});
