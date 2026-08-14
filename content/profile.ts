// Identity strings. Single source of truth for the name, prompt, contact
// address and asset paths used across the banner, footer, prompt, neofetch,
// welcome screen and the `cv` / `email` commands.
//
// Note: the <title> and Open Graph tags in index.html are maintained by hand —
// they are read by crawlers before any JavaScript runs, so they cannot be
// sourced from here.

import { Profile } from "./types";

export const profile: Profile = {
  name: "Hugo Noublanche",
  user: "visitor",
  host: "lemeowm.github.io",
  neofetchUser: "hugo",
  email: "hugo.noublanche@epfl.ch",
  github: "https://github.com/lemeowm",
  githubLabel: "github.com/lemeowm",
  sourceRepo: "https://github.com/lemeowm/lemeowm.github.io",
  avatar: "/Profile.webp",
  cvPath: "/cv.pdf",
  copyright: "© 2026 Hugo Noublanche",
};
