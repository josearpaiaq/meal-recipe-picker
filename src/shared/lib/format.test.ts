import { describe, expect, it } from "vitest";
import { localize } from "./format";

describe("localize", () => {
  it("returns the requested locale", () => {
    expect(localize({ en: "Rice", es: "Arroz" }, "es")).toBe("Arroz");
  });
  it("falls back to English when Spanish is missing", () => {
    expect(localize({ en: "Rice" }, "es")).toBe("Rice");
  });
});
