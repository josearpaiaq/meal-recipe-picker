import { describe, expect, it } from "vitest";
import { dateOf, slotKey, weekStartOf } from "./week";

describe("week helpers", () => {
  it("finds the Monday of the week", () => {
    expect(weekStartOf(new Date(2026, 8, 24))).toBe("2026-09-21"); // Thursday
    expect(weekStartOf(new Date(2026, 8, 21))).toBe("2026-09-21"); // Monday
    expect(weekStartOf(new Date(2026, 8, 27))).toBe("2026-09-21"); // Sunday
  });

  it("maps days to dates and slots to keys", () => {
    expect(dateOf("2026-09-21", 6).getDate()).toBe(27);
    expect(slotKey({ day: 2, meal: "lunch" })).toBe("2-lunch");
  });
});
