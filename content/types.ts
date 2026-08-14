// Shapes for everything in content/.
//
// This file is the schema for the site's resources. It contains no logic and
// imports nothing from src/ — content never depends on code, only the other
// way round. Derived values (sidebar top-5, open targets, blog parsing) live in
// src/utils/.

// ─── Identity ────────────────────────────────────────────────────────────────

export type Profile = {
  /** Full name, used in the footer and the `about` command description. */
  name: string;
  /** Username shown in the prompt, e.g. "visitor" in visitor@host:~$. */
  user: string;
  /** Hostname shown in the prompt and banner, e.g. "lemeowm.github.io". */
  host: string;
  /** Username shown in the neofetch header (may differ from the prompt user). */
  neofetchUser: string;
  /** Contact address, without the "mailto:" prefix. */
  email: string;
  /** Profile URL for the primary code-hosting account. */
  github: string;
  /** Display text for the GitHub link in the footer. */
  githubLabel: string;
  /** Repository backing this site, linked from the welcome screen. */
  sourceRepo: string;
  /** Path under public/ for the avatar image and ASCII art source. */
  avatar: string;
  /** Path under public/ for the downloadable CV. */
  cvPath: string;
  /** Footer copyright line, shown verbatim. */
  copyright: string;
};

// ─── Sections ────────────────────────────────────────────────────────────────

export type Project = {
  id: number;
  title: string;
  desc: string;
  url: string;
  /** Optional path to a thumbnail image, e.g. "/thumbnails/project-name.png". */
  thumbnail?: string;
};

export type Social = {
  id: number;
  title: string;
  url: string;
};

export type Job = {
  title: string;
  desc: string;
  /** Optional path to a thumbnail image, e.g. "/thumbnails/company-logo.png". */
  thumbnail?: string;
};

export type EduEntry = { title: string; desc: string };

/** Programming language proficiency. level is 1–10. */
export type Language = { name: string; level: number; label: string };

/** Domain / speciality label shown in the `skills` command. */
export type Domain = string;

// ─── Chrome ──────────────────────────────────────────────────────────────────

/** A banner button: `label` is the text, `cmd` is what it types into the terminal. */
export type NavItem = { label: string; cmd: string };

export type FooterLink = { label: string; url: string; external?: boolean };

// ─── Copy ────────────────────────────────────────────────────────────────────

/** A welcome-screen line with one highlighted command in the middle. */
export type HintLine = { before: string; cmd: string; after: string };

export type WelcomeCopy = {
  /** ASCII banner shown on wide viewports. */
  asciiName: string;
  /** Shorter ASCII banner shown on narrow viewports. */
  asciiNameMobile: string;
  intro: string;
  hints: HintLine[];
  /** Callout for visitors who would rather not use the terminal. */
  cvHint: {
    before: string;
    cmd: string;
    middle: string;
    key: string;
    after: string;
  };
  source: {
    before: string;
    label: string;
    middle: string;
    cmd: string;
    after: string;
  };
};

export type ManPage = {
  synopsis: string;
  description: string;
  examples: string[];
};

// ─── Virtual filesystem ──────────────────────────────────────────────────────

/** A leaf node in the virtual filesystem. `content` is a routing key for Cat. */
export type FSFile = {
  type: "file";
  content: string;
};

/** An interior node in the virtual filesystem. */
export type FSDir = {
  type: "dir";
  children: Record<string, FSFile | FSDir>;
};
