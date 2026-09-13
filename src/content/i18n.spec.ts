import { describe, expect, it } from "vitest";
import { localizedPathname } from "~/lib/locale";
import { NAV_ITEMS } from "./nav";
import {
  LANGUAGE_OFFER,
  LOCALE_AUTONYMS,
  UI_STRINGS,
  localizedNavItems,
} from "./i18n";

describe("UI_STRINGS", () => {
  it("defines every key for both locales with non-empty values", () => {
    const enKeys = Object.keys(UI_STRINGS.en).toSorted((a, b) =>
      a.localeCompare(b),
    );
    const arKeys = Object.keys(UI_STRINGS.ar).toSorted((a, b) =>
      a.localeCompare(b),
    );
    expect(arKeys).toEqual(enKeys);
    for (const value of Object.values(UI_STRINGS.en)) {
      expect(value.length).toBeGreaterThan(0);
    }
    for (const value of Object.values(UI_STRINGS.ar)) {
      expect(value.length).toBeGreaterThan(0);
    }
  });
});

describe("LOCALE_AUTONYMS and LANGUAGE_OFFER", () => {
  it("defines both locales", () => {
    expect(LOCALE_AUTONYMS.en).toBe("English");
    expect(LOCALE_AUTONYMS.ar).toBeTruthy();
    expect(LANGUAGE_OFFER.en.bannerText).toBeTruthy();
    expect(LANGUAGE_OFFER.ar.bannerText).toBeTruthy();
  });
});

describe("localizedNavItems", () => {
  it("returns NAV_ITEMS unchanged for English", () => {
    expect(localizedNavItems("en")).toBe(NAV_ITEMS);
  });

  it("prefixes every href with /ar and swaps in the Arabic label", () => {
    const items = localizedNavItems("ar");
    expect(items).toHaveLength(NAV_ITEMS.length);
    for (const [i, item] of items.entries()) {
      const original = NAV_ITEMS[i]!;
      expect(item.href).toBe(localizedPathname(original.href, "ar"));
      expect(item.label).toBe(original.labelAr);
    }
  });
});
