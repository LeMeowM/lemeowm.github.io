/// <reference types="vite/client" />

import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    id: string;
    name: string;
    colors: {
      body: string;
      scrollHandle: string;
      scrollHandleHover: string;
      primary: string;
      secondary: string;
      text: {
        100: string;
        200: string;
        300: string;
      };
      /** Windows 2000 window chrome: bevels, title bars and the desktop behind them. */
      chrome: {
        face: string;
        faceText: string;
        faceHighlight: string;
        faceShadow: string;
        /** Title bar gradient stops, [dark end, light end]. */
        titleActive: [string, string];
        titleInactive: [string, string];
        titleText: string;
        /** Wallpaper gradient stops, [top, bottom]. */
        desktop: [string, string];
        desktopGrid: string;
      };
    };
  }
}
