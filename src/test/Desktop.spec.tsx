import { describe, it, expect, vi } from "vitest";
import {
  render,
  screen,
  userEvent,
  waitFor,
  within,
} from "../utils/test-utils";
import App from "../App";

// The wallpaper's ASCII rain needs a real 2D canvas context, which jsdom has no
// implementation for. Everything else in the engine is left alone.
vi.mock("asciify-engine", async importOriginal => ({
  ...(await importOriginal<typeof import("asciify-engine")>()),
  asciiBackground: () => ({ destroy: () => undefined }),
}));

const setup = () => ({ user: userEvent.setup(), ...render(<App />) });

describe("Desktop shell", () => {
  it("opens with the three canonical windows", async () => {
    setup();
    await waitFor(() =>
      expect(screen.getByRole("region", { name: /Terminal$/ })).toBeVisible()
    );
    expect(screen.getByRole("region", { name: /Image Viewer/ })).toBeVisible();
    expect(
      screen.getByRole("region", { name: "Display Properties" })
    ).toBeVisible();
  });

  it("hides a window from its close button and restores it from the taskbar", async () => {
    const { user } = setup();
    await waitFor(() => screen.getByRole("region", { name: /Image Viewer/ }));

    await user.click(screen.getByLabelText(/^Close .*Image Viewer$/));
    expect(
      screen.queryByRole("region", { name: /Image Viewer/ })
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Profile\.webp/ }));
    expect(screen.getByRole("region", { name: /Image Viewer/ })).toBeVisible();
  });

  it("opens a blog post in a window in front of the panels", async () => {
    const { user } = setup();
    const input = await screen.findByTitle("terminal-input");

    await user.type(input, "cat blog/Welcome.md{enter}");

    const post = await screen.findByRole("region", { name: /Welcome\.md/ });
    expect(post).toBeVisible();
    // The reader also gets a taskbar entry while it is open.
    const taskbar = within(screen.getByRole("contentinfo"));
    expect(
      taskbar.getByRole("button", { name: /Welcome\.md/ })
    ).toBeInTheDocument();

    await user.click(screen.getByLabelText(/^Close Welcome\.md/));
    expect(
      screen.queryByRole("region", { name: /Welcome\.md/ })
    ).not.toBeInTheDocument();
  });

  it("stacks a second reader in front, and Esc closes only that one", async () => {
    const { user } = setup();
    const input = await screen.findByTitle("terminal-input");

    await user.type(input, "cat blog/Welcome.md{enter}");
    await screen.findByRole("region", { name: /Welcome\.md/ });
    await user.type(input, "cat blog/lakectf-2025-writeup.md{enter}");
    await screen.findByRole("region", { name: /lakectf-2025-writeup\.md/ });

    // Esc reaches the window that opened last; the one behind stays open.
    await user.keyboard("{Escape}");
    expect(
      screen.queryByRole("region", { name: /lakectf-2025-writeup\.md/ })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: /Welcome\.md/ })
    ).toBeInTheDocument();
  });

  it("switches theme from the settings window, like `themes set`", async () => {
    const { user } = setup();
    await waitFor(() => screen.getByRole("region", { name: /Terminal$/ }));

    await user.click(screen.getByRole("button", { name: /nightcore/ }));
    expect(screen.getByText("[nightcore]")).toBeInTheDocument();
  });
});
