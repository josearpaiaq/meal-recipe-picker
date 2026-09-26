import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { remainingSec } from "./lib/timers";
import { useCookingStore } from "./store";

const store = () => useCookingStore.getState();

describe("cooking store", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-24T12:00:00Z"));
    useCookingStore.setState({ session: null });
  });
  afterEach(() => vi.useRealTimers());

  it("starts, resumes, or asks before replacing", () => {
    expect(store().start("miso-salmon")).toBe("started");
    store().goToStep(2);
    expect(store().start("miso-salmon")).toBe("resumed");
    expect(store().session?.stepIndex).toBe(2);
    expect(store().start("savory-oats")).toBe("needs-confirm");
    expect(store().session?.recipeId).toBe("miso-salmon");
  });

  it("replace ends the old session and clears its timers", () => {
    store().start("miso-salmon");
    store().startTimer(0, 900);
    store().replace("savory-oats");
    expect(store().session).toMatchObject({ recipeId: "savory-oats", stepIndex: 0, timers: {} });
  });

  it("stores a timer as its end timestamp; remaining time follows the clock", () => {
    store().start("miso-salmon");
    store().startTimer(0, 900);
    const endsAt = store().session!.timers[0].endsAt;
    expect(endsAt).toBe(Date.now() + 900_000);

    vi.advanceTimersByTime(60_000);
    store().goToStep(3);
    expect(remainingSec(store().session!.timers[0].endsAt, Date.now())).toBe(840);
  });

  it("clears one timer and ends the session", () => {
    store().start("miso-salmon");
    store().startTimer(0, 900);
    store().startTimer(2, 480);
    store().clearTimer(0);
    expect(Object.keys(store().session!.timers)).toEqual(["2"]);
    store().end();
    expect(store().session).toBeNull();
  });

  it("persists the session so timers survive a reload", async () => {
    store().start("miso-salmon");
    store().startTimer(2, 480);
    const saved = localStorage.getItem("mp.cooking.v1")!;
    expect(JSON.parse(saved)).toMatchObject({
      version: 1,
      state: { session: { recipeId: "miso-salmon" } },
    });

    // Simulate a fresh page load: empty memory, same storage.
    useCookingStore.setState({ session: null });
    localStorage.setItem("mp.cooking.v1", saved);
    await useCookingStore.persist.rehydrate();
    expect(store().session?.timers[2].endsAt).toBe(Date.now() + 480_000);
  });
});
