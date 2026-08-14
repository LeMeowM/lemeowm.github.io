// Targets for the `open` command, derived from the content data so they stay in
// sync automatically. Maps directory name → { key: url }.

import { profile } from "@content/profile";
import { projects } from "@content/projects";
import { socials } from "@content/socials";

export const openTargets: Record<string, Record<string, string>> = {
  projects: Object.fromEntries(projects.map(p => [String(p.id), p.url])),
  blog: {},
  contact: {
    "email.txt": `mailto:${profile.email}`,
    ...Object.fromEntries(socials.map(s => [String(s.id), s.url])),
  },
};
