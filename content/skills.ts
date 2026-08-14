// Single source of truth for skill data.
// Used by the `skills` command, the `neofetch` output and the sidebar bar chart.

import { Domain, Language } from "./types";

export const languages: Language[] = [
  { name: "Python", level: 9, label: "Advanced" },
  { name: "Rust", level: 8, label: "Advanced" },
  { name: "C", level: 7, label: "Proficient" },
  { name: "TypeScript", level: 7, label: "Proficient" },
  { name: "Scala", level: 6, label: "Intermediate" },
  { name: "Java", level: 6, label: "Intermediate" },
  { name: "Lua", level: 5, label: "Familiar" },
  { name: "SQL", level: 4, label: "Familiar" },
];

export const domains: Domain[] = [
  "Reverse Engineering",
  "Cryptography",
  "Systems Programming",
  "Formal Verification",
];
