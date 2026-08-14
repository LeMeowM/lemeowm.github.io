// The desktop itself: wallpaper (gradient sky, sunset disc, horizon grid) and
// the fixed window grid. The grid is deliberately non-interactive — every
// visitor on desktop sees the same canonical arrangement.
import styled from "styled-components";
import { chrome } from "./Chrome.styled";

export const DesktopRoot = styled.div`
  position: relative;
  height: 100vh;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: ${({ theme }) => {
    const [top, bottom] = chrome(theme).desktop;
    return `linear-gradient(180deg, ${top} 0%, ${bottom} 100%)`;
  }};
`;

/** Wallpaper decoration layer. The ASCII rain canvas is mounted in here. */
export const Wallpaper = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;

  /* sunset disc */
  &::before {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 34%;
    width: min(40vh, 360px);
    aspect-ratio: 1;
    transform: translate(-50%, 50%);
    border-radius: 50%;
    opacity: 0.4;
    background: ${({ theme }) => {
      const [from, to] = chrome(theme).titleActive;
      return `linear-gradient(180deg, ${to} 0%, ${from} 100%)`;
    }};
  }

  /* horizon grid */
  &::after {
    content: "";
    position: absolute;
    left: -60%;
    right: -60%;
    bottom: 0;
    height: 45%;
    opacity: 0.3;
    transform: perspective(340px) rotateX(64deg);
    transform-origin: bottom center;
    background-image: ${({ theme }) => {
      const g = chrome(theme).desktopGrid;
      return `repeating-linear-gradient(90deg, ${g} 0 1px, transparent 1px 72px),
        repeating-linear-gradient(0deg, ${g} 0 1px, transparent 1px 54px)`;
    }};
    -webkit-mask-image: linear-gradient(to top, #000 10%, transparent 90%);
    mask-image: linear-gradient(to top, #000 10%, transparent 90%);
  }
`;

/** Where the canonical windows live; also the positioning root for readers. */
export const Area = styled.main`
  position: relative;
  z-index: 1;
  flex: 1;
  min-height: 0;
  padding: 12px;
  display: grid;
  gap: 10px;
  grid-template-columns: minmax(0, 1fr) clamp(280px, 32%, 460px);
  grid-template-rows: minmax(0, 1.15fr) minmax(0, 1fr);

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding: 6px;
    gap: 6px;
  }
`;

/**
 * A cell of the canonical layout. The grid placement lives here rather than on
 * the window itself: a maximized window positions itself absolutely against the
 * desktop, and a grid-area on the window would confine it to its own cell.
 */
export const Slot = styled.div<{ $area: string; $mobileHeight: string }>`
  display: flex;
  min-height: 0;
  min-width: 0;
  grid-area: ${({ $area }) => $area};

  @media (max-width: 900px) {
    flex: 0 0 auto;
    min-height: ${({ $mobileHeight }) => $mobileHeight};
  }

  > * {
    flex: 1;
    min-width: 0;
  }
`;

/** Portal target for blog/source reader windows. */
export const WindowLayer = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 10;
`;
