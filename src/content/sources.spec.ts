import { describe, expect, it } from "vitest";
import { SOURCE_SECTIONS } from "./sources";

describe("SOURCE_SECTIONS", () => {
  const allEntries = SOURCE_SECTIONS.flatMap((section) => section.entries);

  it("has at least one entry in every section", () => {
    for (const section of SOURCE_SECTIONS) {
      expect(section.entries.length).toBeGreaterThan(0);
    }
  });

  it("has a non-trivial name and meta for every entry", () => {
    for (const entry of allEntries) {
      expect(entry.name.length).toBeGreaterThan(0);
      expect(entry.meta.length).toBeGreaterThan(20);
    }
  });

  it("does not list the same source name twice", () => {
    const names = allEntries.map((entry) => entry.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("has a unique, kebab-case id for every entry", () => {
    const ids = allEntries.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) {
      expect(id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it("does not repeat a section title", () => {
    const titles = SOURCE_SECTIONS.map((section) => section.title);
    expect(new Set(titles).size).toBe(titles.length);
  });
});
