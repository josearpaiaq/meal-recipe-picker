import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { navigationMock, router } from "@/test/navigationMock";
import { renderWithIntl } from "@/test/render";
import { useCookingStore } from "../store";
import { CookButton } from "./CookButton";

vi.mock("@/i18n/navigation", () => navigationMock);

const store = () => useCookingStore.getState();

describe("start-cooking flow", () => {
  beforeEach(() => {
    useCookingStore.setState({ session: null });
    router.push.mockClear();
  });

  it("starts a session at step 0 and opens cooking mode", async () => {
    renderWithIntl(<CookButton recipeId="miso-salmon" />);
    await userEvent.click(screen.getByRole("button", { name: /cook step by step/i }));
    expect(store().session).toMatchObject({ recipeId: "miso-salmon", stepIndex: 0 });
    expect(router.push).toHaveBeenCalledWith("/recipes/miso-salmon/cook");
  });

  it("resumes the same recipe at its saved step", async () => {
    store().start("miso-salmon");
    store().goToStep(3);
    renderWithIntl(<CookButton recipeId="miso-salmon" />);
    await userEvent.click(screen.getByRole("button", { name: /cook step by step/i }));
    expect(store().session?.stepIndex).toBe(3);
    expect(router.push).toHaveBeenCalledWith("/recipes/miso-salmon/cook");
  });

  it("asks before replacing; Keep cooking changes nothing", async () => {
    store().start("miso-salmon");
    store().startTimer(0, 900);
    const before = store().session;
    renderWithIntl(<CookButton recipeId="savory-oats" />);

    await userEvent.click(screen.getByRole("button", { name: /cook step by step/i }));
    const dialog = screen.getByRole("dialog", { name: "Start a new recipe?" });
    expect(dialog).toHaveTextContent("You're cooking Miso-glazed salmon, rice & sesame greens");

    await userEvent.click(screen.getByRole("button", { name: "Keep cooking" }));
    expect(store().session).toBe(before);
    expect(router.push).not.toHaveBeenCalled();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("Start new clears the old session and its timers", async () => {
    store().start("miso-salmon");
    store().startTimer(0, 900);
    renderWithIntl(<CookButton recipeId="savory-oats" />);

    await userEvent.click(screen.getByRole("button", { name: /cook step by step/i }));
    await userEvent.click(screen.getByRole("button", { name: "Start new" }));
    expect(store().session).toMatchObject({ recipeId: "savory-oats", stepIndex: 0, timers: {} });
    expect(router.push).toHaveBeenCalledWith("/recipes/savory-oats/cook");
  });
});
