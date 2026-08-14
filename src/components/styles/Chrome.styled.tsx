// Windows 2000 chrome primitives: bevels, title bars, push buttons, tabs and
// the sunken strips everything else is assembled from.
//
// Every colour comes from `theme.colors.chrome` (see content/themes.ts) but
// falls back to the authentic Win2k grey scheme, because the test suite renders
// <Terminal /> without a ThemeProvider — same reason the rest of the codebase
// reads colours through `theme.colors?.`.
import styled, { css, DefaultTheme } from "styled-components";

export const CHROME_FONT = `Tahoma, "MS Sans Serif", Verdana, Geneva, sans-serif`;

const FALLBACK = {
  face: "#C0C0C0",
  faceText: "#000000",
  faceHighlight: "#FFFFFF",
  faceShadow: "#808080",
  titleActive: ["#000080", "#1084D0"] as [string, string],
  titleInactive: ["#808080", "#B5B5B5"] as [string, string],
  titleText: "#FFFFFF",
  desktop: ["#008080", "#005E5E"] as [string, string],
  desktopGrid: "#3E9E9E",
};

/** Chrome palette of the active theme, with the Win2k defaults as a fallback. */
export const chrome = (theme: DefaultTheme) => theme.colors?.chrome ?? FALLBACK;

/** Window/terminal body colour — used inside sunken client areas. */
export const bodyColor = (theme: DefaultTheme) =>
  theme.colors?.body ?? "#000000";

/** Blend two #rrggbb colours; `t` is how much of `b` to take. */
const mix = (a: string, b: string, t: number) => {
  const parse = (hex: string) =>
    [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
  const [r1, g1, b1] = parse(a);
  const [r2, g2, b2] = parse(b);
  const chan = (x: number, y: number) =>
    Math.round(x + (y - x) * t)
      .toString(16)
      .padStart(2, "0");
  return `#${chan(r1, r2)}${chan(g1, g2)}${chan(b1, b2)}`;
};

/**
 * Scrollbar trough. WebKit stipples it with a 50% dither of face and white;
 * Firefox can only take a flat colour, so it gets the average of the two.
 */
export const trackColor = (theme: DefaultTheme) => {
  const c = chrome(theme);
  return mix(c.face, c.faceHighlight, 0.5);
};

const ARROWS: Record<string, string> = {
  up: "1,5.5 7,5.5 4,2",
  down: "1,2.5 7,2.5 4,6",
  left: "5.5,1 5.5,7 2,4",
  right: "2.5,1 2.5,7 6,4",
};

/** Scrollbar button glyph as an inline SVG, tinted to the chrome text colour. */
export const arrowIcon = (color: string, dir: keyof typeof ARROWS) =>
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpolygon points='${
    ARROWS[dir]
  }' fill='${color.replace("#", "%23")}'/%3E%3C/svg%3E")`;

/** Raised 3D border (window frames, buttons at rest). */
export const bevelOut = css`
  box-shadow: inset -1px -1px 0 ${({ theme }) => chrome(theme).faceText},
    inset 1px 1px 0 ${({ theme }) => chrome(theme).faceHighlight},
    inset -2px -2px 0 ${({ theme }) => chrome(theme).faceShadow},
    inset 2px 2px 0 ${({ theme }) => chrome(theme).faceHighlight};
`;

/** Sunken 3D border (client areas, list boxes, pressed buttons). */
export const bevelIn = css`
  box-shadow: inset -1px -1px 0 ${({ theme }) => chrome(theme).faceHighlight},
    inset 1px 1px 0 ${({ theme }) => chrome(theme).faceText},
    inset -2px -2px 0 ${({ theme }) => chrome(theme).faceHighlight},
    inset 2px 2px 0 ${({ theme }) => chrome(theme).faceShadow};
`;

/** Single-pixel sunken groove (group boxes, status strips). */
export const grooveIn = css`
  box-shadow: inset -1px -1px 0 ${({ theme }) => chrome(theme).faceHighlight},
    inset 1px 1px 0 ${({ theme }) => chrome(theme).faceShadow};
`;

export const focusRing = css`
  &:focus-visible {
    outline: 1px dotted ${({ theme }) => chrome(theme).faceText};
    outline-offset: -4px;
  }
`;

/* ── Window ──────────────────────────────────────────────────────────────── */

export const WindowFrame = styled.section`
  display: flex;
  flex-direction: column;
  min-height: 0;
  min-width: 0;
  padding: 3px;
  background: ${({ theme }) => chrome(theme).face};
  color: ${({ theme }) => chrome(theme).faceText};
  font-family: ${CHROME_FONT};
  /* Cast onto the wallpaper — box-shadow is taken by the bevel. */
  filter: drop-shadow(3px 3px 3px rgba(0, 0, 0, 0.45));
  ${bevelOut}
`;

export const TitleBar = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  height: 20px;
  flex-shrink: 0;
  padding: 0 2px 0 3px;
  user-select: none;
  background: ${({ theme, $active }) => {
    const c = chrome(theme);
    const [from, to] = $active === false ? c.titleInactive : c.titleActive;
    return `linear-gradient(90deg, ${from} 0%, ${to} 100%)`;
  }};
  color: ${({ theme }) => chrome(theme).titleText};
`;

export const TitleIcon = styled.span`
  font-size: 12px;
  line-height: 1;
  flex-shrink: 0;
`;

export const TitleText = styled.span`
  flex: 1;
  min-width: 0;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.35);
`;

export const TitleButtons = styled.div`
  display: flex;
  gap: 2px;
  flex-shrink: 0;
`;

export const TitleButton = styled.button`
  width: 16px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  cursor: pointer;
  font-family: ${CHROME_FONT};
  font-size: 9px;
  line-height: 1;
  background: ${({ theme }) => chrome(theme).face};
  color: ${({ theme }) => chrome(theme).faceText};
  ${bevelOut}

  &:active {
    ${bevelIn}
    padding: 1px 0 0 1px;
  }

  ${focusRing}
`;

/** Sunken client area a window's content sits in. */
export const WindowBody = styled.div`
  flex: 1;
  min-height: 0;
  min-width: 0;
  margin-top: 3px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => bodyColor(theme)};
  color: ${({ theme }) => theme.colors?.text[100]};
  font-family: "IBM Plex Mono", monospace;
  ${bevelIn}
  padding: 2px;
`;

/** Client area for dialog-style windows (settings): face coloured, no bevel. */
export const DialogBody = styled.div`
  flex: 1;
  min-height: 0;
  min-width: 0;
  margin-top: 3px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 4px;
  background: ${({ theme }) => chrome(theme).face};
  color: ${({ theme }) => chrome(theme).faceText};
  font-family: ${CHROME_FONT};
  font-size: 11px;
`;

/* ── Status strip ────────────────────────────────────────────────────────── */

export const StatusStrip = styled.div`
  display: flex;
  gap: 2px;
  flex-shrink: 0;
  margin-top: 3px;
  font-size: 11px;
  font-family: ${CHROME_FONT};
  color: ${({ theme }) => chrome(theme).faceText};
  user-select: none;
  flex-wrap: wrap;
`;

export const StatusCell = styled.span<{ $grow?: boolean }>`
  ${({ $grow }) => $grow && "flex: 1;"}
  padding: 2px 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${grooveIn}
`;

/* ── Controls ────────────────────────────────────────────────────────────── */

export const PushButton = styled.button`
  min-width: 72px;
  padding: 4px 10px;
  cursor: pointer;
  border: 0;
  font-family: ${CHROME_FONT};
  font-size: 11px;
  background: ${({ theme }) => chrome(theme).face};
  color: ${({ theme }) => chrome(theme).faceText};
  ${bevelOut}

  &:active {
    ${bevelIn}
    padding: 5px 9px 3px 11px;
  }

  ${focusRing}
`;

export const GroupBox = styled.fieldset`
  position: relative;
  margin: 0;
  padding: 0.75rem 0.6rem 0.6rem;
  border: 0;
  min-width: 0;
  ${grooveIn}
`;

export const GroupLegend = styled.legend`
  padding: 0 0.3rem;
  font-family: ${CHROME_FONT};
  font-size: 11px;
  color: ${({ theme }) => chrome(theme).faceText};
`;

export const TabStrip = styled.div`
  display: flex;
  gap: 2px;
  padding-left: 2px;
  flex-shrink: 0;
`;

export const TabButton = styled.button<{ $active?: boolean }>`
  position: relative;
  top: ${({ $active }) => ($active ? "0" : "2px")};
  padding: ${({ $active }) => ($active ? "4px 12px 6px" : "3px 10px 4px")};
  border: 0;
  cursor: pointer;
  font-family: ${CHROME_FONT};
  font-size: 11px;
  font-weight: ${({ $active }) => ($active ? 700 : 400)};
  background: ${({ theme }) => chrome(theme).face};
  color: ${({ theme }) => chrome(theme).faceText};
  box-shadow: inset 1px 1px 0 ${({ theme }) => chrome(theme).faceHighlight},
    inset -1px 0 0 ${({ theme }) => chrome(theme).faceText},
    inset -2px 0 0 ${({ theme }) => chrome(theme).faceShadow};
  ${focusRing}
`;

/** The panel a tab strip sits on top of. */
export const TabPanel = styled.div`
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 0.75rem;
  background: ${({ theme }) => chrome(theme).face};
  ${bevelOut}
`;

export const ListBox = styled.div`
  overflow: auto;
  padding: 2px;
  background: ${({ theme }) => bodyColor(theme)};
  ${bevelIn}
`;

export const ListItem = styled.button<{ $selected?: boolean }>`
  display: block;
  width: 100%;
  text-align: left;
  padding: 2px 6px;
  border: 0;
  cursor: pointer;
  font-family: ${CHROME_FONT};
  font-size: 11px;
  background: ${({ theme, $selected }) =>
    $selected ? chrome(theme).titleActive[0] : "transparent"};
  color: ${({ theme, $selected }) =>
    $selected ? chrome(theme).titleText : theme.colors?.text[100]};

  &:hover {
    background: ${({ theme, $selected }) =>
      $selected
        ? chrome(theme).titleActive[0]
        : chrome(theme).titleInactive[1]};
    color: ${({ theme }) => chrome(theme).titleText};
  }

  ${focusRing}
`;
