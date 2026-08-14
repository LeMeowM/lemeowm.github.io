// Windows 2000 scrollbars, drawn in the DOM.
//
// Native scrollbars cannot be made to look like this. Firefox only accepts
// `scrollbar-color` — two flat colours, a rounded thumb, no arrow buttons — and
// ignores every ::-webkit-scrollbar rule. So ScrollArea hides the native bar and
// renders its own: dithered trough, raised thumb, an arrow button at each end,
// identical in every browser.
//
// Usage: wrap the content and hand the scrolling element's styles in through
// `viewportAs` (any styled component), plus `viewportRef` / `viewportProps` if
// the caller needs to reach that element:
//
//   <ScrollArea viewportAs={Wrapper} viewportRef={ref}>…</ScrollArea>
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  arrowIcon,
  bevelIn,
  bevelOut,
  chrome,
  ditherBg,
} from "../styles/Chrome.styled";

const BAR = 16; // px — bar thickness, as in Win2k
const STEP = 48; // px — one arrow-button click
const MIN_THUMB = 12; // px
const REPEAT_MS = 60; // held-button repeat rate

type Axis = "v" | "h";

type Metrics = {
  vOn: boolean;
  vThumb: number;
  vPos: number;
  hOn: boolean;
  hThumb: number;
  hPos: number;
};

const EMPTY: Metrics = {
  vOn: false,
  vThumb: 0,
  vPos: 0,
  hOn: false,
  hThumb: 0,
  hPos: 0,
};

const Root = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  min-width: 0;
  overflow: hidden;
`;

const Middle = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  min-width: 0;
`;

const ViewportBase = styled.div`
  flex: 1;
  min-width: 0;
  overflow: auto;

  /* The native bar is replaced, not decorated. */
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Bar = styled.div<{ $axis: Axis }>`
  display: flex;
  flex-direction: ${({ $axis }) => ($axis === "v" ? "column" : "row")};
  flex-shrink: 0;
  ${({ $axis }) => ($axis === "v" ? `width: ${BAR}px;` : `height: ${BAR}px;`)}
  user-select: none;
`;

const Button = styled.div`
  width: ${BAR}px;
  height: ${BAR}px;
  flex-shrink: 0;
  cursor: default;
  background-color: ${({ theme }) => chrome(theme).face};
  background-repeat: no-repeat;
  background-position: center;
  ${bevelOut}

  &:active {
    ${bevelIn}
  }
`;

const ArrowButton = styled(Button)<{ $dir: "up" | "down" | "left" | "right" }>`
  background-image: ${({ theme, $dir }) =>
    arrowIcon(chrome(theme).faceText, $dir)};
`;

const Track = styled.div`
  position: relative;
  flex: 1;
  min-width: 0;
  min-height: 0;
  ${ditherBg}
`;

const Thumb = styled.div<{ $axis: Axis; $size: number; $pos: number }>`
  position: absolute;
  cursor: default;
  background: ${({ theme }) => chrome(theme).face};
  ${({ $axis, $size, $pos }) =>
    $axis === "v"
      ? `left: 0; right: 0; height: ${$size}px; top: ${$pos}px;`
      : `top: 0; bottom: 0; width: ${$size}px; left: ${$pos}px;`}
  ${bevelOut}
`;

const Corner = styled.div`
  width: ${BAR}px;
  height: ${BAR}px;
  flex-shrink: 0;
  ${ditherBg}
`;

/**
 * `flex-direction: column-reverse` containers (the terminal) scroll from the
 * bottom up, and Firefox reports that as a negative scrollTop while Chrome uses
 * a positive one. Probe once, then convert everything to "distance from the
 * top" so the thumb maths is the same either way.
 */
const probeNegative = (el: HTMLElement) => {
  const original = el.scrollTop;
  el.scrollTop = -1;
  const negative = el.scrollTop < 0;
  el.scrollTop = original;
  return negative;
};

type Props = {
  /** Styled component supplying the scrolling element's own styles. */
  viewportAs?: React.ElementType;
  viewportRef?: React.MutableRefObject<HTMLDivElement | null>;
  viewportProps?: Record<string, unknown>;
  className?: string;
  children: React.ReactNode;
};

const ScrollArea: React.FC<Props> = ({
  viewportAs,
  viewportRef,
  viewportProps,
  className,
  children,
}) => {
  const vp = useRef<HTMLDivElement | null>(null);
  const vTrack = useRef<HTMLDivElement>(null);
  const hTrack = useRef<HTMLDivElement>(null);
  const negative = useRef(false);
  const [m, setM] = useState<Metrics>(EMPTY);

  const setViewport = (node: HTMLDivElement | null) => {
    vp.current = node;
    if (viewportRef) viewportRef.current = node;
  };

  /** Scroll offset from the top/left, whatever the browser reports. */
  const offset = (axis: Axis) => {
    const el = vp.current;
    if (!el) return 0;
    if (axis === "h") return el.scrollLeft;
    const max = el.scrollHeight - el.clientHeight;
    return negative.current ? max + el.scrollTop : el.scrollTop;
  };

  const scrollTo = (axis: Axis, to: number) => {
    const el = vp.current;
    if (!el) return;
    if (axis === "h") {
      el.scrollLeft = Math.max(
        0,
        Math.min(el.scrollWidth - el.clientWidth, to)
      );
      return;
    }
    const max = el.scrollHeight - el.clientHeight;
    const clamped = Math.max(0, Math.min(max, to));
    el.scrollTop = negative.current ? clamped - max : clamped;
  };

  const measure = useCallback(() => {
    const el = vp.current;
    if (!el) return;
    const vRange = el.scrollHeight - el.clientHeight;
    const hRange = el.scrollWidth - el.clientWidth;
    const vOn = vRange > 1;
    const hOn = hRange > 1;
    const vLen = vTrack.current?.clientHeight ?? 0;
    const hLen = hTrack.current?.clientWidth ?? 0;
    const vThumb = vOn
      ? Math.max(MIN_THUMB, (el.clientHeight / el.scrollHeight) * vLen)
      : 0;
    const hThumb = hOn
      ? Math.max(MIN_THUMB, (el.clientWidth / el.scrollWidth) * hLen)
      : 0;
    const next: Metrics = {
      vOn,
      hOn,
      vThumb: Math.round(vThumb),
      hThumb: Math.round(hThumb),
      vPos: vOn ? Math.round(((vLen - vThumb) * offset("v")) / vRange) : 0,
      hPos: hOn ? Math.round(((hLen - hThumb) * offset("h")) / hRange) : 0,
    };
    setM(prev =>
      (Object.keys(next) as (keyof Metrics)[]).every(k => prev[k] === next[k])
        ? prev
        : next
    );
  }, []);

  useEffect(() => {
    const el = vp.current;
    if (!el) return;
    negative.current = probeNegative(el);
    el.addEventListener("scroll", measure, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    // Terminal output and markdown images change the content, not the box.
    const mo = new MutationObserver(measure);
    mo.observe(el, { childList: true, subtree: true, characterData: true });
    return () => {
      el.removeEventListener("scroll", measure);
      ro.disconnect();
      mo.disconnect();
    };
  }, [measure]);

  // The tracks only exist once a bar is shown, so their length is unknown on
  // the first pass. Re-measuring after every render settles it (setM is a
  // no-op once the numbers stop changing).
  useEffect(measure);

  const hold = (step: () => void) => (e: React.PointerEvent) => {
    e.preventDefault();
    step();
    const timer = window.setInterval(step, REPEAT_MS);
    const stop = () => {
      window.clearInterval(timer);
      document.removeEventListener("pointerup", stop);
    };
    document.addEventListener("pointerup", stop);
  };

  const dragThumb = (axis: Axis) => (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const el = vp.current;
    const track = (axis === "v" ? vTrack : hTrack).current;
    if (!el || !track) return;
    const from = axis === "v" ? e.clientY : e.clientX;
    const start = offset(axis);
    const trackLen = axis === "v" ? track.clientHeight : track.clientWidth;
    const thumbLen = axis === "v" ? m.vThumb : m.hThumb;
    const range =
      axis === "v"
        ? el.scrollHeight - el.clientHeight
        : el.scrollWidth - el.clientWidth;
    const ratio = range / Math.max(1, trackLen - thumbLen);
    const move = (ev: PointerEvent) => {
      const now = axis === "v" ? ev.clientY : ev.clientX;
      scrollTo(axis, start + (now - from) * ratio);
    };
    const stop = () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", stop);
    };
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerup", stop);
  };

  /** Clicking the trough pages towards the click, as Win2k does. */
  const pageTo = (axis: Axis) => (e: React.PointerEvent) => {
    const el = vp.current;
    const track = (axis === "v" ? vTrack : hTrack).current;
    if (!el || !track) return;
    const rect = track.getBoundingClientRect();
    const at = axis === "v" ? e.clientY - rect.top : e.clientX - rect.left;
    const page = axis === "v" ? el.clientHeight : el.clientWidth;
    const dir = at < (axis === "v" ? m.vPos : m.hPos) ? -1 : 1;
    scrollTo(axis, offset(axis) + dir * page * 0.9);
  };

  return (
    <Root className={className}>
      <Middle>
        <ViewportBase
          as={viewportAs}
          ref={setViewport}
          {...(viewportProps ?? {})}
        >
          {children}
        </ViewportBase>
        {m.vOn && (
          <Bar
            $axis="v"
            aria-hidden="true"
            onMouseDown={e => e.preventDefault()}
          >
            <ArrowButton
              $dir="up"
              onPointerDown={hold(() => scrollTo("v", offset("v") - STEP))}
            />
            <Track ref={vTrack} onPointerDown={pageTo("v")}>
              <Thumb
                $axis="v"
                $size={m.vThumb}
                $pos={m.vPos}
                onPointerDown={dragThumb("v")}
              />
            </Track>
            <ArrowButton
              $dir="down"
              onPointerDown={hold(() => scrollTo("v", offset("v") + STEP))}
            />
          </Bar>
        )}
      </Middle>
      {m.hOn && (
        <Bar $axis="h" aria-hidden="true" onMouseDown={e => e.preventDefault()}>
          <ArrowButton
            $dir="left"
            onPointerDown={hold(() => scrollTo("h", offset("h") - STEP))}
          />
          <Track ref={hTrack} onPointerDown={pageTo("h")}>
            <Thumb
              $axis="h"
              $size={m.hThumb}
              $pos={m.hPos}
              onPointerDown={dragThumb("h")}
            />
          </Track>
          <ArrowButton
            $dir="right"
            onPointerDown={hold(() => scrollTo("h", offset("h") + STEP))}
          />
          {m.vOn && <Corner />}
        </Bar>
      )}
    </Root>
  );
};

export default ScrollArea;
