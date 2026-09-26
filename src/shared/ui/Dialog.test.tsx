import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { renderWithIntl } from "@/test/render";
import { Dialog } from "./Dialog";

describe("Dialog", () => {
  it("opens as a modal labelled by its title", () => {
    const showModal = vi.spyOn(HTMLDialogElement.prototype, "showModal");
    renderWithIntl(
      <Dialog open onClose={() => {}} title="Start a new recipe?">
        <p>Body</p>
      </Dialog>,
    );
    expect(showModal).toHaveBeenCalled();
    expect(screen.getByRole("dialog", { name: "Start a new recipe?" })).toBeInTheDocument();
  });

  it("calls onClose on Esc (cancel) and on backdrop click, not on content click", () => {
    const onClose = vi.fn();
    renderWithIntl(
      <Dialog open onClose={onClose} title="Title">
        <p>Body</p>
      </Dialog>,
    );
    const dialog = screen.getByRole("dialog");
    fireEvent.click(screen.getByText("Body"));
    expect(onClose).not.toHaveBeenCalled();

    fireEvent(dialog, new Event("cancel", { cancelable: true }));
    expect(onClose).toHaveBeenCalledTimes(1);

    fireEvent.click(dialog);
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it("closes the native dialog when open becomes false", () => {
    const { rerender } = renderWithIntl(
      <Dialog open onClose={() => {}} title="Title">
        <p>Body</p>
      </Dialog>,
    );
    rerender(
      <Dialog open={false} onClose={() => {}} title="Title">
        <p>Body</p>
      </Dialog>,
    );
    expect(document.querySelector("dialog")).not.toHaveAttribute("open");
  });
});
