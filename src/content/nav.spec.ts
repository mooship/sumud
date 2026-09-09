import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { NAV_ITEMS } from "./nav";

const here = path.dirname(fileURLToPath(import.meta.url));

describe("NAV_ITEMS", () => {
  it("only uses absolute, trailing-slash paths", () => {
    for (const item of NAV_ITEMS) {
      expect(item.href.startsWith("/")).toBe(true);
      expect(item.href.endsWith("/")).toBe(true);
    }
  });

  it("has a matching route directory for every nav item", () => {
    for (const item of NAV_ITEMS) {
      const dir = item.href.replaceAll(/^\/|\/$/g, "");
      const tsxPath = path.resolve(here, `../routes/${dir}/index.tsx`);
      const mdxPath = path.resolve(here, `../routes/${dir}/index.mdx`);
      expect(
        existsSync(tsxPath) || existsSync(mdxPath),
        `no route found for nav item "${item.href}"`,
      ).toBe(true);
    }
  });
});
