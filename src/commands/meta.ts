export type CmdEntry = {
  cmd: string;
  cwd: string[];
};

export type CommandMeta = {
  name: string;
  desc: string;
  tab: number;
  acceptsArgs?: boolean;
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

export const commandNames: string[] = commandMeta
  .filter(c => !c.hidden)
  .map(c => c.name);
