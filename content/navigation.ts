// Chrome around the terminal: banner shortcut buttons and footer links.

import { FooterLink, NavItem } from "./types";
import { profile } from "./profile";

/** Banner buttons. `cmd` is typed into the terminal when the button is clicked. */
export const navItems: NavItem[] = [
  { label: "ls", cmd: "ls" },
  { label: "about", cmd: "about" },
  { label: "projects", cmd: "cd projects" },
  { label: "cv", cmd: "cv" },
];

export const footerLinks: FooterLink[] = [
  { label: profile.email, url: `mailto:${profile.email}` },
  { label: profile.githubLabel, url: profile.github, external: true },
];
