import { createGlobalStyle, DefaultTheme } from "styled-components";
import { normalize } from "styled-normalize";
import { chrome } from "./Chrome.styled";

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

  /* ===== Windows 2000 Scroll Bar ===== */
  ::-webkit-scrollbar {
    width: 16px;
    height: 16px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => chrome(theme).face};
    opacity: 0.5;
  }
  /* Handle: a little raised chrome tile */
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => chrome(theme).face};
    box-shadow:
      inset -1px -1px 0 ${({ theme }) => chrome(theme).faceText},
      inset 1px 1px 0 ${({ theme }) => chrome(theme).faceHighlight},
      inset -2px -2px 0 ${({ theme }) => chrome(theme).faceShadow},
      inset 2px 2px 0 ${({ theme }) => chrome(theme).faceHighlight};
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => chrome(theme).faceHighlight};
  }
  ::-webkit-scrollbar-corner {
    background: ${({ theme }) => chrome(theme).face};
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
