// Displayed by `cat contact/socials.txt` and used by `open <id>` inside
// ~/contact. The `open` targets are derived in src/utils/openTargets.ts.

import { Social } from "./types";

export const socials: Social[] = [
  {
    id: 1,
    title: "GitHub",
    url: "https://github.com/lemeowm",
  },
  {
    id: 2,
    title: "Email",
    url: "mailto:hugo.noublanche@epfl.ch",
  },
];
