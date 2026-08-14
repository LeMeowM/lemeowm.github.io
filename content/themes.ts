// Colour schemes. Each theme paints two things:
//   colors.*        — the terminal / window body (prompt, output, scrollbars)
//   colors.chrome.* — the Windows 2000 shell: window faces, bevels, title bar
//                     gradients, taskbar and the desktop wallpaper behind it
//
// A theme is selected with `themes set <name>` or from the Display Properties
// window; both go through the same switcher, so adding a theme here is all that
// is needed for it to show up in both places.
import { DefaultTheme } from "styled-components";

export type Themes = {
  [key: string]: DefaultTheme;
};

const theme: Themes = {
  dark: {
    id: "T_001",
    name: "dark",
    colors: {
      body: "#1D2A35",
      scrollHandle: "#19252E",
      scrollHandleHover: "#162028",
      primary: "#05CE91",
      secondary: "#FF9D00",
      text: {
        100: "#cbd5e1",
        200: "#B2BDCC",
        300: "#64748b",
      },
      chrome: {
        face: "#B4C2CC",
        faceText: "#101C24",
        faceHighlight: "#E4EDF2",
        faceShadow: "#5E6E78",
        titleActive: ["#02614A", "#05CE91"],
        titleInactive: ["#4B5B66", "#8496A2"],
        titleText: "#FFFFFF",
        desktop: ["#16212B", "#0A1016"],
        desktopGrid: "#05CE91",
      },
    },
  },
  light: {
    id: "T_002",
    name: "light",
    colors: {
      body: "#EFF3F3",
      scrollHandle: "#C1C1C1",
      scrollHandleHover: "#AAAAAA",
      primary: "#027474",
      secondary: "#FF9D00",
      text: {
        100: "#334155",
        200: "#475569",
        300: "#64748b",
      },
      chrome: {
        face: "#D6DCDC",
        faceText: "#1C2626",
        faceHighlight: "#FFFFFF",
        faceShadow: "#8A9494",
        titleActive: ["#014E4E", "#039A9A"],
        titleInactive: ["#9AA6A6", "#C3CCCC"],
        titleText: "#FFFFFF",
        desktop: ["#DCE6E6", "#A9BEBE"],
        desktopGrid: "#027474",
      },
    },
  },
  "blue-matrix": {
    id: "T_003",
    name: "blue-matrix",
    colors: {
      body: "#101116",
      scrollHandle: "#424242",
      scrollHandleHover: "#616161",
      primary: "#00ff9c",
      secondary: "#60fdff",
      text: {
        100: "#ffffff",
        200: "#c7c7c7",
        300: "#76ff9f",
      },
      chrome: {
        face: "#1B2130",
        faceText: "#00ff9c",
        faceHighlight: "#3A4356",
        faceShadow: "#05070B",
        titleActive: ["#003A24", "#00B36E"],
        titleInactive: ["#161B26", "#2A3342"],
        titleText: "#E8FFF5",
        desktop: ["#0B0C11", "#040406"],
        desktopGrid: "#00ff9c",
      },
    },
  },
  espresso: {
    id: "T_004",
    name: "espresso",
    colors: {
      body: "#323232",
      scrollHandle: "#5b5b5b",
      scrollHandleHover: "#393939",
      primary: "#E1E48B",
      secondary: "#A5C260",
      text: {
        100: "#F7F7F7",
        200: "#EEEEEE",
        300: "#5b5b5b",
      },
      chrome: {
        face: "#C8C4A8",
        faceText: "#2A2A22",
        faceHighlight: "#F0EEDF",
        faceShadow: "#7A7663",
        titleActive: ["#4C4E28", "#A5C260"],
        titleInactive: ["#6E6E6E", "#9A9A9A"],
        titleText: "#FFFFFF",
        desktop: ["#2B2B2B", "#171717"],
        desktopGrid: "#A5C260",
      },
    },
  },
  "green-goblin": {
    id: "T_005",
    name: "green-goblin",
    colors: {
      body: "#000000",
      scrollHandle: "#2E2E2E",
      scrollHandleHover: "#414141",
      primary: "#E5E500",
      secondary: "#04A500",
      text: {
        100: "#01FF00",
        200: "#04A5B2",
        300: "#E50101",
      },
      chrome: {
        face: "#2E2E2E",
        faceText: "#01FF00",
        faceHighlight: "#5A5A5A",
        faceShadow: "#000000",
        titleActive: ["#014000", "#04A500"],
        titleInactive: ["#1A1A1A", "#3A3A3A"],
        titleText: "#E5E500",
        desktop: ["#001000", "#000000"],
        desktopGrid: "#04A500",
      },
    },
  },
  ubuntu: {
    id: "T_006",
    name: "ubuntu",
    colors: {
      body: "#2D0922",
      scrollHandle: "#F47845",
      scrollHandleHover: "#E65F31",
      primary: "#80D932",
      secondary: "#80D932",
      text: {
        100: "#FFFFFF",
        200: "#E1E9CC",
        300: "#CDCDCD",
      },
      chrome: {
        face: "#D3C0CC",
        faceText: "#2D0922",
        faceHighlight: "#F5EDF2",
        faceShadow: "#7A5E70",
        titleActive: ["#772953", "#E95420"],
        titleInactive: ["#6B5461", "#9C8A94"],
        titleText: "#FFFFFF",
        desktop: ["#2D0922", "#5E1B48"],
        desktopGrid: "#F47845",
      },
    },
  },
  win2k: {
    id: "T_007",
    name: "win2k",
    colors: {
      body: "#000000",
      scrollHandle: "#808080",
      scrollHandleHover: "#A0A0A0",
      primary: "#55FFFF",
      secondary: "#FFFF55",
      text: {
        100: "#C0C0C0",
        200: "#A8A8A8",
        300: "#7F7F7F",
      },
      chrome: {
        face: "#C0C0C0",
        faceText: "#000000",
        faceHighlight: "#FFFFFF",
        faceShadow: "#808080",
        titleActive: ["#000080", "#1084D0"],
        titleInactive: ["#808080", "#B5B5B5"],
        titleText: "#FFFFFF",
        desktop: ["#008080", "#005E5E"],
        desktopGrid: "#3E9E9E",
      },
    },
  },
  nightcore: {
    id: "T_008",
    name: "nightcore",
    colors: {
      body: "#1A0B2E",
      scrollHandle: "#3B1F5C",
      scrollHandleHover: "#552E80",
      primary: "#FF71CE",
      secondary: "#01CDFE",
      text: {
        100: "#F3E9FF",
        200: "#C9B6E4",
        300: "#8E7BA6",
      },
      chrome: {
        face: "#CDBBE0",
        faceText: "#2A1140",
        faceHighlight: "#F6ECFF",
        faceShadow: "#7A5E96",
        titleActive: ["#B026FF", "#01CDFE"],
        titleInactive: ["#6E5A85", "#A292B5"],
        titleText: "#FFFFFF",
        desktop: ["#160B2E", "#FF5FA2"],
        desktopGrid: "#01CDFE",
      },
    },
  },
};

export default theme;
