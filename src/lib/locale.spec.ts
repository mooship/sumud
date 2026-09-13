import { describe, expect, it } from "vitest";
import {
  getLocaleFromPathname,
  localizedPathname,
  otherLocale,
} from "./locale";

describe("getLocaleFromPathname", () => {
  it("treats root and unprefixed paths as English", () => {
    expect(getLocaleFromPathname("/")).toBe("en");
    expect(getLocaleFromPathname("/history/nakba/")).toBe("en");
  });

  it("treats /ar and everything under it as Arabic", () => {
    expect(getLocaleFromPathname("/ar")).toBe("ar");
    expect(getLocaleFromPathname("/ar/")).toBe("ar");
    expect(getLocaleFromPathname("/ar/history/nakba/")).toBe("ar");
  });

  it("does not mistake a path merely starting with 'ar' for the Arabic prefix", () => {
    expect(getLocaleFromPathname("/article/")).toBe("en");
  });
});

describe("localizedPathname", () => {
  it("maps an English path to its Arabic equivalent", () => {
    expect(localizedPathname("/history/nakba/", "ar")).toBe(
      "/ar/history/nakba/",
    );
    expect(localizedPathname("/", "ar")).toBe("/ar/");
  });

  it("maps an Arabic path back to its English equivalent", () => {
    expect(localizedPathname("/ar/history/nakba/", "en")).toBe(
      "/history/nakba/",
    );
    expect(localizedPathname("/ar/", "en")).toBe("/");
    expect(localizedPathname("/ar", "en")).toBe("/");
  });

  it("is a no-op when already targeting the current locale", () => {
    expect(localizedPathname("/history/nakba/", "en")).toBe("/history/nakba/");
    expect(localizedPathname("/ar/history/nakba/", "ar")).toBe(
      "/ar/history/nakba/",
    );
  });
});

describe("otherLocale", () => {
  it("flips between en and ar", () => {
    expect(otherLocale("en")).toBe("ar");
    expect(otherLocale("ar")).toBe("en");
  });
});
