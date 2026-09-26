import { describe, expect, it } from "vitest";
import { formatClock, isDone, remainingSec, sortBySoonest } from "./timers";

describe("timers", () => {
  it("computes remaining seconds, never negative", () => {
    expect(remainingSec(10_000, 0)).toBe(10);
    expect(remainingSec(10_000, 9_001)).toBe(1);
    expect(remainingSec(10_000, 20_000)).toBe(0);
  });

  it("knows when a timer is done", () => {
    expect(isDone(1000, 999)).toBe(false);
    expect(isDone(1000, 1000)).toBe(true);
  });

  it("sorts by soonest end", () => {
    expect(sortBySoonest({ 0: { endsAt: 30 }, 2: { endsAt: 10 }, 3: { endsAt: 20 } })).toEqual([
      { step: 2, endsAt: 10 },
      { step: 3, endsAt: 20 },
      { step: 0, endsAt: 30 },
    ]);
  });

  it("formats clocks", () => {
    expect(formatClock(0)).toBe("0:00");
    expect(formatClock(90)).toBe("1:30");
    expect(formatClock(900)).toBe("15:00");
    expect(formatClock(3725)).toBe("1:02:05");
  });
});
