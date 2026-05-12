export type Project = {
  id: number;
  title: string;
  desc: string;
  url: string;
};

export type Social = {
  id: number;
  title: string;
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

export { blogPosts } from "./blog";
export type { BlogPost } from "./blog";

// Openable targets per directory
export const openTargets: Record<string, Record<string, string>> = {
  projects: Object.fromEntries(projects.map(p => [String(p.id), p.url])),
  blog: {},
  contact: {
    "email.txt": "mailto:hugo.noublanche@epfl.ch",
    ...Object.fromEntries(socials.map(s => [String(s.id), s.url])),
  },
};
