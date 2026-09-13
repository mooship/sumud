import { afterEach, describe, expect, it, vi } from "vitest";
import { stubStorage } from "~/testing/storage-stub";
import { getLocalStorage, safeGetItem, safeSetItem } from "./safe-storage";

function throwingStorage(): Storage {
  return {
    getItem: vi.fn(() => {
      throw new Error("blocked");
    }),
    setItem: vi.fn(() => {
      throw new Error("blocked");
    }),
    removeItem: vi.fn(),
    clear: vi.fn(),
    key: vi.fn(),
    length: 0,
  };
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("getLocalStorage", () => {
  it("returns the global when it exists", () => {
    const stub = { getItem: vi.fn() } as unknown as Storage;
    vi.stubGlobal("localStorage", stub);
    expect(getLocalStorage()).toBe(stub);
  });

  it("returns undefined instead of throwing when the global isn't declared", () => {
    vi.stubGlobal("localStorage", undefined);
    expect(getLocalStorage()).toBeUndefined();
  });
});

describe("safeGetItem", () => {
  it("returns the stored value", () => {
    const storage = { getItem: vi.fn(() => "ar") } as unknown as Storage;
    expect(safeGetItem(storage, "sumud:locale")).toBe("ar");
  });

  it("returns undefined for a missing key", () => {
    expect(safeGetItem(stubStorage().storage, "sumud:locale")).toBeUndefined();
  });

  it("returns undefined instead of throwing when storage access is blocked", () => {
    expect(safeGetItem(throwingStorage(), "sumud:locale")).toBeUndefined();
  });

  it("returns undefined when no storage is available", () => {
    expect(safeGetItem(undefined, "sumud:locale")).toBeUndefined();
  });
});

describe("safeSetItem", () => {
  it("writes the value", () => {
    const setItem = vi.fn();
    safeSetItem({ setItem } as unknown as Storage, "sumud:locale", "ar");
    expect(setItem).toHaveBeenCalledWith("sumud:locale", "ar");
  });

  it("swallows the error instead of throwing when storage access is blocked", () => {
    expect(() =>
      safeSetItem(throwingStorage(), "sumud:locale", "ar"),
    ).not.toThrow();
  });

  it("is a no-op when no storage is available", () => {
    expect(() => safeSetItem(undefined, "sumud:locale", "ar")).not.toThrow();
  });
});
