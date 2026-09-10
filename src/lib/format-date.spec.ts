import { describe, expect, it } from "vitest";
import { formatDate, parseIsoDateUTC } from "./format-date";

describe("parseIsoDateUTC", () => {
  it("parses an ISO date as UTC midnight, not the local timezone", () => {
    expect(parseIsoDateUTC("2026-09-10").toISOString()).toBe(
      "2026-09-10T00:00:00.000Z",
    );
  });
});

describe("formatDate", () => {
  it("formats an ISO date as a British long date", () => {
    expect(formatDate("2026-09-10")).toBe("10 September 2026");
  });

  it("formats a single-digit day without a leading zero", () => {
    expect(formatDate("2026-01-01")).toBe("1 January 2026");
  });
});
