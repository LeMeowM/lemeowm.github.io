// ── Command metadata ────────────────────────────────────────────────────────
// This file and registry.tsx are managed by add_command.py.
// To add a new command run:  python3 add_command.py <name> "<desc>" [--args]
// That script patches commandMeta here and the components map in registry.tsx,
// then creates a scaffold component in src/components/commands/.

/** History entry: the raw command string and the cwd at the time it was run. */
export type CmdEntry = {
  cmd: string;
  cwd: string[];
};

export type CommandMeta = {
  name: string;
  /** One-line description shown in `help` output. */
  desc: string;
  /**
   * Number of extra non-breaking spaces inserted after the command name in
   * `help` output to align descriptions into a column.
   * Rule of thumb: tab ≈ 12 − name.length.
   */
  tab: number;
  /** If true, the command receives whatever the user typed after the name. */
  acceptsArgs?: boolean;
  /** If true, the command is excluded from `help` and tab-completion. */
  hidden?: boolean;
};

export const commandMeta: CommandMeta[] = [
  { name: "cat", desc: "read a file's contents", tab: 9, acceptsArgs: true },
  { name: "cd", desc: "change directory", tab: 11, acceptsArgs: true },
  { name: "clear", desc: "clear the terminal", tab: 8 },
  { name: "cv", desc: "download CV as PDF", tab: 11 },
  { name: "echo", desc: "print out anything", tab: 9, acceptsArgs: true },
  { name: "help", desc: "show available commands", tab: 9 },
  { name: "history", desc: "view command history", tab: 6 },
  { name: "ls", desc: "list directory contents", tab: 10, acceptsArgs: true },
  {
    name: "man",
    desc: "show manual for a command",
    tab: 10,
    acceptsArgs: true,
  },
  { name: "neofetch", desc: "show system info", tab: 5 },
  { name: "open", desc: "open a file or URL", tab: 9, acceptsArgs: true },
  { name: "pwd", desc: "print working directory", tab: 10 },
  { name: "themes", desc: "check available themes", tab: 7, acceptsArgs: true },
  { name: "about", desc: "about Hugo", tab: 6 },
  { name: "whoami", desc: "about current user", tab: 7 },
  { name: "skills", desc: "show languages and domains", tab: 7 },
  { name: "grep", desc: "search blog post content", tab: 7, acceptsArgs: true },
  {
    name: "find",
    desc: "find files in the filesystem",
    tab: 7,
    acceptsArgs: true,
  },
  { name: "motd", desc: "show tip of the day", tab: 5 },
  { name: "welcome", desc: "", tab: 0, hidden: true },
];

/** All non-hidden command names, used for tab-completion. */
export const commandNames: string[] = commandMeta
  .filter(c => !c.hidden)
  .map(c => c.name);
