import { describe, expect, it } from "vitest";
import { ORG_GROUPS } from "./organisations";

describe("ORG_GROUPS", () => {
  const allOrgs = ORG_GROUPS.flatMap((g) => g.orgs);

  it("has at least one organisation in every group", () => {
    for (const group of ORG_GROUPS) {
      expect(group.orgs.length).toBeGreaterThan(0);
    }
  });

  it("only links to https URLs", () => {
    for (const org of allOrgs) {
      expect(() => new URL(org.url)).not.toThrow();
      expect(new URL(org.url).protocol).toBe("https:");
    }
  });

  it("has a non-trivial description for every organisation", () => {
    for (const org of allOrgs) {
      expect(org.description.length).toBeGreaterThan(20);
    }
  });

  it("does not list the same organisation name twice", () => {
    const names = allOrgs.map((o) => o.name);
    expect(new Set(names).size).toBe(names.length);
  });
});
