// Displayed by `cd projects` and opened by `open <id>` inside ~/projects.
// The `open` targets are derived from this list in src/utils/openTargets.ts.

import { Project } from "./types";

export const projects: Project[] = [
  {
    id: 1,
    title: "nest — EPFL Spacecraft Team",
    desc: "QEMU-based flight software testing environment for the CHESS mission. Rust-powered plugin management via WebAssembly Interface Types (WIT) for modular testing extensions. Supporting CHESS-Pathfinder 1 & 2 (launch late 2026).",
    url: "https://github.com/lemeowm",
  },
  {
    id: 2,
    title: "polygl0ts/polyflag — EPFL CTF Team",
    desc: "Competitive cybersecurity in cryptography and reverse engineering. Achieved 1st place at BlackAlpsCTF as the sole cryptography player on the team.",
    url: "https://github.com/polygl0ts",
  },
  {
    id: 3,
    title: "0rganizers — Inter-University CTF Team",
    desc: "Cryptography and reverse engineering specialist contributing exploit and decryption solutions across inter-university competitions. Contributed to a finalist proposal for hosting DEFCON CTF.",
    url: "https://github.com/0rganizers",
  },
  {
    id: 4,
    title: "Atonable Go — Software Construction",
    desc: "Live server-hosted Go game built with Scala and ScalaJS as a full-stack solution. Led UX design and managed a team of 4.",
    url: "https://github.com/lemeowm",
  },
];
