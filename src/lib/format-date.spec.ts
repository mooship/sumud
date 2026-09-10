import { describe, expect, it } from "vitest";
import { formatDate } from "./format-date";

describe("formatDate", () => {
  it("formats an ISO date as a British long date", () => {
    expect(formatDate("2026-09-10")).toBe("10 September 2026");
  });

  it("formats a single-digit day without a leading zero", () => {
    expect(formatDate("2026-01-01")).toBe("1 January 2026");
  });
});
