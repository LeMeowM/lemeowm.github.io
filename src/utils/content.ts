// ─── Projects ────────────────────────────────────────────────────────────────
// Displayed by the `projects` command and opened by `open <id>` inside ~/projects.
// openTargets below is derived automatically — no separate edit needed.

export type Project = {
  id: number;
  title: string;
  desc: string;
  url: string;
};

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

// ─── Socials ─────────────────────────────────────────────────────────────────
// Displayed by `cat contact/socials.txt` and used by the `open` command inside
// ~/contact. openTargets below is derived automatically.

export type Social = {
  id: number;
  title: string;
  url: string;
};

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

// ─── Skills ──────────────────────────────────────────────────────────────────
// Single source of truth for skill data.
// Used by: the `skills` command (Skills.tsx) and the sidebar panel (Sidebar.tsx).
// Do NOT maintain separate arrays in those files.

/** Programming language proficiency. level is 1–10. */
export type Language = { name: string; level: number; label: string };

/** Domain / speciality label shown in the `skills` command. */
export type Domain = string;

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

/** Top-N languages for the sidebar bar chart, sorted highest-level first. */
export const sidebarLangs = [...languages]
  .sort((a, b) => b.level - a.level)
  .slice(0, 5);

// ─── Blog re-exports ──────────────────────────────────────────────────────────
export { blogPosts } from "./blog";
export type { BlogPost } from "./blog";

// ─── Open targets ─────────────────────────────────────────────────────────────
// Maps directory name → { key: url } for the `open` command.
// Derived from projects and socials so it stays in sync automatically.
export const openTargets: Record<string, Record<string, string>> = {
  projects: Object.fromEntries(projects.map(p => [String(p.id), p.url])),
  blog: {},
  contact: {
    "email.txt": "mailto:hugo.noublanche@epfl.ch",
    ...Object.fromEntries(socials.map(s => [String(s.id), s.url])),
  },
};
