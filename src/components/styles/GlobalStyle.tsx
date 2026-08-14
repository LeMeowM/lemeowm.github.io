import { createGlobalStyle, DefaultTheme } from "styled-components";
import { normalize } from "styled-normalize";
import {
  arrowIcon,
  bevelIn,
  bevelOut,
  chrome,
  ditherBg,
  trackColor,
} from "./Chrome.styled";

const GlobalStyle = createGlobalStyle<{ theme: DefaultTheme }>`
  ${normalize}
  
  *, ::before, ::after {
    border-width: 0;
    border-style: solid;
    border-color: theme('borderColor.DEFAULT', currentColor);
  }

  blockquote, dl, dd, h1, h2, h3,
  h4, h5, h6, hr, figure, p, pre {
    margin: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    font-size: inherit;
    font-weight: inherit;
  }

  img, svg, video, canvas, audio, 
  iframe, embed, object {
    display: block;
  }

  :root {
    --primary: ${({ theme }) => theme.colors?.primary};
    --accent-color: ${({ theme }) => theme.colors?.primary};
  }

  body {
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 500;
    background-color: ${({ theme }) => chrome(theme).desktop[0]};
    color: ${({ theme }) => theme.colors?.text[100]};
    overflow: hidden;
  }

  /* ===== Windows 2000 Scroll Bar =====
     Firefox has no ::-webkit-scrollbar; it takes scrollbar-color, which is
     inherited, so setting it here covers every scroller on the page. */
  html {
    scrollbar-width: auto;
    scrollbar-color: ${({ theme }) => chrome(theme).face} ${({ theme }) =>
  trackColor(theme)};
  }

  ::-webkit-scrollbar {
    width: 16px;
    height: 16px;
  }
  /* Track: the 50% dither of face and white that Win2k stipples it with */
  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar-corner {
    ${ditherBg}
  }
  /* Handle and arrow buttons: raised chrome tiles */
  ::-webkit-scrollbar-thumb,
  ::-webkit-scrollbar-button {
    background-color: ${({ theme }) => chrome(theme).face};
    background-repeat: no-repeat;
    background-position: center;
    ${bevelOut}
  }
  ::-webkit-scrollbar-thumb:active,
  ::-webkit-scrollbar-button:active {
    ${bevelIn}
  }
  ::-webkit-scrollbar-button {
    width: 16px;
    height: 16px;
  }
  ::-webkit-scrollbar-button:vertical:decrement {
    background-image: ${({ theme }) => arrowIcon(chrome(theme).faceText, "up")};
  }
  ::-webkit-scrollbar-button:vertical:increment {
    background-image: ${({ theme }) =>
      arrowIcon(chrome(theme).faceText, "down")};
  }
  ::-webkit-scrollbar-button:horizontal:decrement {
    background-image: ${({ theme }) =>
      arrowIcon(chrome(theme).faceText, "left")};
  }
  ::-webkit-scrollbar-button:horizontal:increment {
    background-image: ${({ theme }) =>
      arrowIcon(chrome(theme).faceText, "right")};
  }
  /* Only one button per end, as Win2k had */
  ::-webkit-scrollbar-button:vertical:start:increment,
  ::-webkit-scrollbar-button:vertical:end:decrement,
  ::-webkit-scrollbar-button:horizontal:start:increment,
  ::-webkit-scrollbar-button:horizontal:end:decrement {
    display: none;
  }

  input[type=text] {
    background-color: ${({ theme }) => theme.colors?.body};
    color: ${({ theme }) => theme.colors?.text[100]};
    caret-color: ${({ theme }) => theme.colors?.primary};
  }
  input[type=text]:focus-visible {
    outline: none;
  }

  .sr-only {
    position: absolute;
    left: -10000px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }
`;

export default GlobalStyle;
