import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { HISTORY_CHAPTERS } from "./history-chapters";

const here = dirname(fileURLToPath(import.meta.url));

describe("HISTORY_CHAPTERS", () => {
  it("has a unique, non-empty slug for every chapter", () => {
    const slugs = HISTORY_CHAPTERS.map((c) => c.slug);
    expect(slugs.every((s) => s.length > 0)).toBe(true);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has non-empty title, period and summary for every chapter", () => {
    for (const chapter of HISTORY_CHAPTERS) {
      expect(chapter.title.length).toBeGreaterThan(0);
      expect(chapter.period.length).toBeGreaterThan(0);
      expect(chapter.summary.length).toBeGreaterThan(20);
    }
  });

  it("has an .mdx route file on disk for every chapter slug", () => {
    for (const chapter of HISTORY_CHAPTERS) {
      const path = resolve(
        here,
        `../routes/history/(chapter)/${chapter.slug}/index.mdx`,
      );
      expect(
        existsSync(path),
        `missing route file for "${chapter.slug}": ${path}`,
      ).toBe(true);
    }
  });

  it("is ordered chronologically by the start year in each period", () => {
    const startYears = HISTORY_CHAPTERS.map((c) => {
      const match = c.period.match(/\d{4}/);
      return match ? Number(match[0]) : NaN;
    });
    for (let i = 1; i < startYears.length; i++) {
      expect(startYears[i]).toBeGreaterThanOrEqual(startYears[i - 1]);
    }
  });
});
