import "@testing-library/jest-dom";
import { vi } from "vitest";

// jsdom has no matchMedia; the wallpaper's ASCII background asks for the
// preferred colour scheme when it mounts.
if (typeof window.matchMedia !== "function") {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: () => false,
    } as MediaQueryList);
}

// jsdom implements no layout, so scrollIntoView is missing; the settings window
// uses it to keep the active theme visible in the scheme list.
if (typeof Element.prototype.scrollIntoView !== "function") {
  Element.prototype.scrollIntoView = () => undefined;
}

// jsdom has no ResizeObserver; ProfileArt watches its window for resizes.
if (!("ResizeObserver" in globalThis)) {
  globalThis.ResizeObserver = class {
    observe() {
      return undefined;
    }
    unobserve() {
      return undefined;
    }
    disconnect() {
      return undefined;
    }
  };
}
