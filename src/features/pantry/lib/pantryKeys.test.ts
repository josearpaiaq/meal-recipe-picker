import { describe, expect, it } from "vitest";
import { knownIngredients, resolvePantryKey, toKey } from "./pantryKeys";

const known = knownIngredients([
  { shoppingKey: "eggs", label: "huevos" },
  { shoppingKey: "salmon-fillet", label: "filetes de salmón" },
  { shoppingKey: "eggs", label: "huevo" },
]);

describe("pantry keys", () => {
  it("dedupes known ingredients by key", () => {
    expect(known.map((k) => k.key)).toEqual(["salmon-fillet", "eggs"]);
  });

  it("normalizes free text into kebab-case keys", () => {
    expect(toKey("  Salmón  Fillet! ")).toBe("salmon-fillet");
  });

  it("resolves labels and keys to known keys", () => {
    expect(resolvePantryKey("Huevos", known)).toBe("eggs");
    expect(resolvePantryKey("salmon fillet", known)).toBe("salmon-fillet");
    expect(resolvePantryKey("Tofu", known)).toBe("tofu");
  });
});
