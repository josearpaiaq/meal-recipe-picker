import { act, fireEvent, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { navigationMock, pathname, router } from "@/test/navigationMock";
import { renderWithIntl } from "@/test/render";
import { useCookingStore } from "../store";
import { TimerBubble } from "./TimerBubble";

vi.mock("@/i18n/navigation", () => navigationMock);

const store = () => useCookingStore.getState();

// miso-salmon timers: step 0 Rice 15:00, step 2 Salmon 8:00, step 3 Greens 3:00.
function cookWithTimers(steps: number[]) {
  store().start("miso-salmon");
  const durations: Record<number, number> = { 0: 900, 2: 480, 3: 180 };
  for (const step of steps) store().startTimer(step, durations[step]);
}

describe("TimerBubble", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    vi.setSystemTime(new Date("2026-09-24T12:00:00Z"));
    useCookingStore.setState({ session: null });
    pathname.current = "/";
    router.push.mockClear();
  });
  afterEach(() => vi.useRealTimers());

  it("is hidden without a session or timers", () => {
    const { container } = renderWithIntl(<TimerBubble />);
    expect(container).toBeEmptyDOMElement();
    act(() => store().start("miso-salmon"));
    expect(container).toBeEmptyDOMElement();
  });

  it("one timer: shows label and time; tap opens that step", () => {
    cookWithTimers([2]);
    renderWithIntl(<TimerBubble />);
    const pill = screen.getByRole("button", { name: "Go to step 3: Salmon" });
    expect(pill).toHaveTextContent("Salmon · 8:00");

    fireEvent.click(pill);
    expect(store().session?.stepIndex).toBe(2);
    expect(router.push).toHaveBeenCalledWith("/recipes/miso-salmon/cook");
  });

  it("several timers: stacks sorted by soonest, each opens its own step", () => {
    cookWithTimers([0, 3]);
    renderWithIntl(<TimerBubble />);
    const pill = screen.getByRole("button", { name: "Show timers" });
    expect(pill).toHaveTextContent("2 timers · 3:00");

    fireEvent.click(pill);
    const items = screen.getAllByRole("button", { name: /^Go to step/ });
    expect(items.map((b) => b.getAttribute("aria-label"))).toEqual([
      "Go to step 4: Greens",
      "Go to step 1: Rice",
    ]);

    fireEvent.click(items[1]);
    expect(store().session?.stepIndex).toBe(0);
    expect(router.push).toHaveBeenCalledWith("/recipes/miso-salmon/cook");
    expect(screen.queryByRole("button", { name: /^Go to step/ })).toBeNull();
  });

  it("turns tomato with Time's up when a timer finishes", () => {
    cookWithTimers([3]);
    renderWithIntl(<TimerBubble />);
    act(() => vi.advanceTimersByTime(181_000));
    const pill = screen.getByRole("button", { name: "Go to step 4: Greens" });
    expect(pill).toHaveTextContent("Greens · Time's up");
    expect(pill).toHaveClass("bg-tomato");
  });

  it("in cooking mode, leaves out the current step's timer", () => {
    cookWithTimers([0, 2]);
    act(() => store().goToStep(2));
    pathname.current = "/recipes/miso-salmon/cook";
    renderWithIntl(<TimerBubble />);
    expect(screen.getByRole("button", { name: "Go to step 1: Rice" })).toBeInTheDocument();
  });
});
