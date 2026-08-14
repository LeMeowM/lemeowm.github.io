// Copy for the welcome screen shown on load.
//
// Lines are split into segments so the renderer can style the command tokens
// (`cmd`) differently from the surrounding prose without parsing markup.

import { WelcomeCopy } from "./types";

export const welcome: WelcomeCopy = {
  asciiName: `
           /$$   /$$
          | $$  | $$
  /$$$$$$ | $$ /$$$$$$   /$$$$$$/$$$$   /$$$$$$   /$$$$$$  /$$  /$$  /$$
 |____  $$| $$|_  $$_/  | $$_  $$_  $$ /$$__  $$ /$$__  $$| $$ | $$ | $$
  /$$$$$$$| $$  | $$    | $$ \\ $$ \\ $$| $$$$$$$$| $$  \\ $$| $$ | $$ | $$
 /$$__  $$| $$  | $$ /$$| $$ | $$ | $$| $$_____/| $$  | $$| $$ | $$ | $$
|  $$$$$$$| $$  |  $$$$/| $$ | $$ | $$|  $$$$$$$|  $$$$$$/|  $$$$$/$$$$/
 \\_______/|__/   \\___/  |__/ |__/ |__/ \\_______/ \\______/  \\_____/\\___/
          `,

  asciiNameMobile: `
        _ _
       | | |
   __ _| | |_ _ __ ___   ___  _____      __
  / _\` | | __| '_ \` _ \\ / _ \\/ _ \\ \\ /\\ / /
 | (_| | | |_| | | | | |  __/ (_) \\ V  V /
  \\__,_|_|\\__|_| |_| |_|\\___|\\___/ \\_/\\_/
          `,

  intro: "Welcome to my terminal portfolio.",

  hints: [
    { before: "Type ", cmd: "ls", after: " to see available sections." },
    { before: "Type ", cmd: "cd <dir>", after: " to navigate into a section." },
    { before: "Type ", cmd: "cat <file>", after: " to read a file." },
  ],

  cvHint: {
    before: "Not a terminal person? Just type ",
    cmd: "cv",
    middle: " and press ",
    key: "Enter",
    after: " to download my CV as a PDF.",
  },

  source: {
    before: "Source code on ",
    label: "GitHub",
    middle: ". Type ",
    cmd: "help",
    after: " for all commands.",
  },
};
