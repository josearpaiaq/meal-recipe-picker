import { describe, expect, it } from "vitest";
import { createSafeStorage } from "./storage";

describe("createSafeStorage", () => {
  it("round-trips values", () => {
    const storage = createSafeStorage<{ a: number }>();
    storage.setItem("k", { state: { a: 1 }, version: 1 });
    expect(storage.getItem("k")).toEqual({ state: { a: 1 }, version: 1 });
  });

  it("returns null instead of throwing on corrupt data", () => {
    localStorage.setItem("k", "{not json");
    expect(createSafeStorage().getItem("k")).toBeNull();
  });
});
