import { describe, expect, it } from "vitest";
import { stubStorage } from "./storage-stub";

describe("stubStorage", () => {
  it("reads and writes through the Storage interface, backed by the returned Map", () => {
    const { storage, store } = stubStorage({ a: "1" });
    expect(storage.getItem("a")).toBe("1");
    expect(storage.length).toBe(1);

    storage.setItem("b", "2");
    expect(store.get("b")).toBe("2");
    expect(storage.length).toBe(2);

    storage.removeItem("a");
    expect(store.has("a")).toBe(false);

    storage.clear();
    expect(store.size).toBe(0);
  });

  it("returns null (per the Storage contract) for a missing key and from key()", () => {
    const { storage } = stubStorage();
    expect(storage.getItem("missing")).toBeNull();
    expect(storage.key(0)).toBeNull();
  });
});
