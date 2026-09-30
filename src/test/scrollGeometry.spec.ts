import { describe, it, expect } from "vitest";
import {
  detectConvention,
  offsetFromTop,
  scrollTopFor,
  type ScrollConvention,
} from "../components/desktop/scrollGeometry";

/** Stand-in for a scroll container, with a browser's clamping behaviour. */
const scroller = (opts: {
  scrollHeight: number;
  clientHeight: number;
  scrollTop?: number;
  /** How the element numbers its scroll range. */
  convention?: ScrollConvention;
}) => {
  const { scrollHeight, clientHeight, convention = "top" } = opts;
  const max = scrollHeight - clientHeight;
  let value = opts.scrollTop ?? 0;
  return {
    scrollHeight,
    clientHeight,
    get scrollTop() {
      return value;
    },
    set scrollTop(next: number) {
      const [lo, hi] =
        convention === "bottom-negative" ? [-max, 0] : [0, Math.max(0, max)];
      value = Math.max(lo, Math.min(hi, next));
    },
  };
};

const MAX = 400;

describe("scroll geometry", () => {
  const conventions: ScrollConvention[] = [
    "top",
    "bottom-negative",
    "bottom-positive",
  ];

  it.each(conventions)("round-trips an offset under %s", convention => {
    for (const offset of [0, 137, MAX]) {
      const scrollTop = scrollTopFor(convention, offset, MAX);
      expect(offsetFromTop(convention, scrollTop, MAX)).toBe(offset);
    }
  });

  it.each(conventions)("clamps out-of-range offsets under %s", convention => {
    expect(
      offsetFromTop(convention, scrollTopFor(convention, -50, MAX), MAX)
    ).toBe(0);
    expect(
      offsetFromTop(convention, scrollTopFor(convention, MAX + 50, MAX), MAX)
    ).toBe(MAX);
  });

  it("puts a resting bottom-anchored scroller at the bottom, not the top", () => {
    // The terminal at rest: scrollTop 0, newest output visible at the bottom.
    expect(offsetFromTop("bottom-negative", 0, MAX)).toBe(MAX);
    expect(offsetFromTop("bottom-positive", 0, MAX)).toBe(MAX);
    expect(offsetFromTop("top", 0, MAX)).toBe(0);
  });

  describe("detectConvention", () => {
    it("returns null while the element cannot scroll yet", () => {
      // The terminal on load: one line of output, nothing to scroll. Answering
      // here would cache a guess that breaks once output arrives.
      const el = scroller({ scrollHeight: 200, clientHeight: 200 });
      expect(detectConvention(el, true)).toBeNull();
      expect(detectConvention(el, false)).toBeNull();
    });

    it("reads an ordinary container as top-anchored", () => {
      const el = scroller({ scrollHeight: 600, clientHeight: 200 });
      expect(detectConvention(el, false)).toBe("top");
    });

    it("detects a reversed container that accepts negative offsets", () => {
      const el = scroller({
        scrollHeight: 600,
        clientHeight: 200,
        convention: "bottom-negative",
      });
      expect(detectConvention(el, true)).toBe("bottom-negative");
      expect(el.scrollTop).toBe(0); // probe restored the resting position
    });

    it("detects a reversed container that clamps negative offsets", () => {
      const el = scroller({
        scrollHeight: 600,
        clientHeight: 200,
        convention: "bottom-positive",
      });
      expect(detectConvention(el, true)).toBe("bottom-positive");
      expect(el.scrollTop).toBe(0);
    });

    it("keeps a scrolled position when probing", () => {
      const el = scroller({
        scrollHeight: 600,
        clientHeight: 200,
        scrollTop: -120,
        convention: "bottom-negative",
      });
      expect(detectConvention(el, true)).toBe("bottom-negative");
      expect(el.scrollTop).toBe(-120);
    });
  });
});
