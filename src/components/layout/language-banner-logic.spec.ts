import { describe, expect, it } from "vitest";
import { stubStorage } from "~/testing/storage-stub";
import {
  detectPreferredLocale,
  shouldOfferLocale,
} from "./language-banner-logic";

describe("detectPreferredLocale", () => {
  it("detects Arabic from any Arabic-tagged language, including regional variants", () => {
    expect(detectPreferredLocale(["ar"])).toBe("ar");
    expect(detectPreferredLocale(["en-US", "ar-EG"])).toBe("ar");
    expect(detectPreferredLocale(["AR-SA"])).toBe("ar");
  });

  it("defaults to English otherwise", () => {
    expect(detectPreferredLocale(["en-GB", "fr"])).toBe("en");
    expect(detectPreferredLocale([])).toBe("en");
  });
});

describe("shouldOfferLocale", () => {
  it("offers the preferred locale when it differs from the current page", () => {
    expect(
      shouldOfferLocale({
        currentLocale: "en",
        languages: ["ar"],
        storage: stubStorage().storage,
      }),
    ).toBe("ar");
  });

  it("offers nothing when the preferred locale matches the current page", () => {
    expect(
      shouldOfferLocale({
        currentLocale: "ar",
        languages: ["ar-EG"],
        storage: stubStorage().storage,
      }),
    ).toBeUndefined();
  });

  it("offers nothing once the visitor has made an explicit choice", () => {
    expect(
      shouldOfferLocale({
        currentLocale: "en",
        languages: ["ar"],
        storage: stubStorage({ "sumud:locale": "en" }).storage,
      }),
    ).toBeUndefined();
  });

  it("offers nothing once the banner has been dismissed", () => {
    expect(
      shouldOfferLocale({
        currentLocale: "en",
        languages: ["ar"],
        storage: stubStorage({ "sumud:locale-banner-dismissed": "1" }).storage,
      }),
    ).toBeUndefined();
  });
});
