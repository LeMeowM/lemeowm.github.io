// Converting between a scroller's `scrollTop` and "distance from the visual
// top", which is what a scrollbar thumb is positioned by.
//
// Ordinary containers scroll 0..max, top to bottom. `flex-direction:
// column-reverse` containers — the terminal, which grows from the bottom — are
// anchored at the bottom instead, and browsers disagree on how to number that:
// most report 0 at the bottom and negative values going up, while older WebKit
// reports 0 at the bottom and positive values going up. All three are handled
// here so the thumb maths never has to care.

export type ScrollConvention = "top" | "bottom-negative" | "bottom-positive";

/** Where the viewport sits, measured from the top of the content. */
export const offsetFromTop = (
  convention: ScrollConvention,
  scrollTop: number,
  max: number
): number => {
  switch (convention) {
    case "bottom-negative":
      return max + scrollTop;
    case "bottom-positive":
      return max - scrollTop;
    default:
      return scrollTop;
  }
};

/** The scrollTop that puts the viewport `offset` px from the top. */
export const scrollTopFor = (
  convention: ScrollConvention,
  offset: number,
  max: number
): number => {
  const clamped = Math.max(0, Math.min(max, offset));
  switch (convention) {
    case "bottom-negative":
      return clamped - max;
    case "bottom-positive":
      return max - clamped;
    default:
      return clamped;
  }
};

type Scroller = Pick<
  HTMLElement,
  "scrollTop" | "scrollHeight" | "clientHeight"
>;

/**
 * Work out which convention an element uses. Returns null while the element
 * cannot scroll at all — every convention looks identical then, and answering
 * early would cache a guess that goes wrong the moment content arrives. That is
 * exactly the terminal's situation on load: one line of output, nothing to
 * scroll, and a scrollbar needed a few commands later.
 */
export const detectConvention = (
  el: Scroller,
  isReversed: boolean
): ScrollConvention | null => {
  if (el.scrollHeight - el.clientHeight <= 0) return null;
  if (!isReversed) return "top";
  if (el.scrollTop < 0) return "bottom-negative";

  // Ask the element directly: a bottom-negative scroller accepts a negative
  // scrollTop, a bottom-positive one clamps it to zero.
  const original = el.scrollTop;
  el.scrollTop = -1;
  const negative = el.scrollTop < 0;
  el.scrollTop = original;
  return negative ? "bottom-negative" : "bottom-positive";
};
