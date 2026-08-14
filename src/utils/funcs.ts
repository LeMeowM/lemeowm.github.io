import theme from "@content/themes";
import { filesystem, getDirChildren, buildPath } from "./filesystem";
import { openTargets } from "./openTargets";
import { blogPosts } from "./blog";
import { commandNames } from "../commands/meta";

/** Returns a string of non-breaking spaces for aligning `help` output columns. */
export const generateTabs = (num = 0): string => {
  let tabs = "\xA0\xA0";
  for (let i = 0; i < num; i++) {
    tabs += "\xA0";
  }
  return tabs;
};

export const isArgInvalid = (
  arg: string[],
  action: string,
  options: string[]
) => arg[0] !== action || !options.includes(arg[1]) || arg.length > 2;

export const getCurrentCmdArry = (history: { cmd: string }[]): string[] =>
  history[0].cmd.trim().split(" ");

export const checkThemeSwitch = (
  rerender: boolean,
  currentCommand: string[],
  themes: string[]
): boolean =>
  rerender &&
  currentCommand[0] === "themes" &&
  currentCommand[1] === "set" &&
  currentCommand.length > 1 &&
  currentCommand.length < 4 &&
  themes.includes(currentCommand[2]);

/**
 * Split a partial path argument into the directory to search and the filename
 * prefix to match against.
 *
 * Examples:
 *   "/blog/20"   → dirPath=["~","blog"], filePart="20",   prefix="/blog/"
 *   "blog/20"    → dirPath=[...cwd,"blog"], filePart="20", prefix="blog/"
 *   "20"         → dirPath=cwd,            filePart="20",  prefix=""
 *
 * `prefix` is prepended back onto each match so the completed value retains
 * the user's original path style (absolute vs relative).
 */
const resolvePartialDir = (
  cwd: string[],
  partial: string
): { dirPath: string[]; filePart: string; prefix: string } => {
  const lastSlash = partial.lastIndexOf("/");
  if (lastSlash === -1) return { dirPath: cwd, filePart: partial, prefix: "" };

  const filePart = partial.slice(lastSlash + 1);
  const prefix = partial.slice(0, lastSlash + 1);

  // prefix includes the trailing slash, so buildPath on it yields the dir path.
  // getNodeAtPath (called via getDirChildren) normalizes ".." internally.
  const dirPath = buildPath(cwd, prefix);

  return { dirPath, filePart, prefix };
};

/**
 * Pure version of arg hint computation — returns the top match string
 * (the full argument value, not yet sliced) without any side effects.
 */
const getTopArgHint = (inputVal: string, cwd: string[]): string | null => {
  // themes set <theme>
  if (inputVal.startsWith("themes set ")) {
    const partial = inputVal.split(" ")[2] ?? "";
    const match = Object.keys(theme).find(
      t => t.startsWith(partial) && t !== partial
    );
    return match ?? null;
  }
  if (
    "themes".startsWith(inputVal.split(" ")[0]) &&
    inputVal.split(" ")[1] !== "set" &&
    "set".startsWith(inputVal.split(" ")[1] ?? "")
  ) {
    return null;
  }

  // cd <dir>
  const cdParts = inputVal.split(" ");
  if (cdParts[0] === "cd" && cdParts.length === 2) {
    const partial = cdParts[1] ?? "";
    const { dirPath, filePart, prefix } = resolvePartialDir(cwd, partial);
    const dirs = getDirChildren(dirPath, filesystem, "dir").map(e => e.name);
    const match = dirs.find(
      d => d.startsWith(filePart) && prefix + d !== partial
    );
    return match != null ? prefix + match : null;
  }

  // cat <file|dir/> — directories surfaced as intermediate path completions
  const catParts = inputVal.split(" ");
  if (catParts[0] === "cat" && catParts.length === 2) {
    const partial = catParts[1] ?? "";
    const { dirPath, filePart, prefix } = resolvePartialDir(cwd, partial);
    const entries = getDirChildren(dirPath, filesystem).map(e =>
      e.type === "dir" ? e.name + "/" : e.name
    );
    const match = entries.find(
      n => n.startsWith(filePart) && prefix + n !== partial
    );
    return match != null ? prefix + match : null;
  }

  // ls <dir>
  const lsParts = inputVal.split(" ");
  if (lsParts[0] === "ls" && lsParts.length === 2) {
    const partial = lsParts[1] ?? "";
    const { dirPath, filePart, prefix } = resolvePartialDir(cwd, partial);
    const entries = getDirChildren(dirPath, filesystem).map(e =>
      e.type === "dir" ? e.name + "/" : e.name
    );
    const match = entries.find(
      n => n.startsWith(filePart) && prefix + n !== partial
    );
    return match != null ? prefix + match : null;
  }

  // man <command>
  const manParts = inputVal.split(" ");
  if (manParts[0] === "man" && manParts.length === 2) {
    const partial = manParts[1] ?? "";
    const match = commandNames.find(
      c => c.startsWith(partial) && c !== partial
    );
    return match ?? null;
  }

  // grep <pattern> <slug.md>
  const grepParts = inputVal.split(" ");
  if (grepParts[0] === "grep" && grepParts.length === 3) {
    const partial = grepParts[2] ?? "";
    const slugs = blogPosts.map(p => `${p.slug}.md`);
    const match = slugs.find(s => s.startsWith(partial) && s !== partial);
    return match ?? null;
  }

  // open <item>
  const openParts = inputVal.split(" ");
  if (openParts[0] === "open" && openParts.length === 2) {
    const partial = openParts[1] ?? "";
    const dirName = cwd[cwd.length - 1];
    const targets = openTargets[dirName];
    if (targets) {
      const match = Object.keys(targets).find(
        k => k.startsWith(partial) && k !== partial
      );
      return match ?? null;
    }
  }

  return null;
};

/**
 * Returns the ghost-text suffix to display after the current input value,
 * or an empty string if there is no predictive completion.
 * Pure — no side effects.
 */
export const getPredictiveHint = (inputVal: string, cwd: string[]): string => {
  if (!inputVal.trim()) return "";

  const parts = inputVal.split(" ");

  // Command-name completion (no space yet)
  if (parts.length === 1) {
    const match = commandNames.find(
      n => n.startsWith(inputVal) && n !== inputVal
    );
    return match ? match.slice(inputVal.length) : "";
  }

  // Argument completion
  const topHint = getTopArgHint(inputVal, cwd);
  if (!topHint) return "";
  const lastPart = parts[parts.length - 1] ?? "";
  return topHint.startsWith(lastPart) ? topHint.slice(lastPart.length) : "";
};

/**
 * Tab-completion engine called on every Tab keypress.
 *
 * Handles argument completion for: themes, cd, cat, ls, man, open.
 * Falls through (returns undefined) for unknown commands so the caller can
 * apply its own command-name completion.
 *
 * Side effects: calls setInputVal / setHints to update the input field.
 * Returns the matched hint strings (may be empty) so the caller can merge
 * them with command-name matches.
 */
export const argTab = (
  inputVal: string,
  setInputVal: (value: string) => void,
  setHints: (value: string[]) => void,
  hintsCmds: string[],
  cwd: string[]
): string[] | undefined => {
  // themes set <theme>
  if (inputVal === "themes ") {
    setInputVal("themes set ");
    return [];
  }
  if (
    "themes".startsWith(inputVal.split(" ")[0]) &&
    inputVal.split(" ")[1] !== "set" &&
    "set".startsWith(inputVal.split(" ")[1])
  ) {
    setInputVal("themes set ");
    return [];
  }
  if (inputVal === "themes set ") {
    setHints(Object.keys(theme));
    return [];
  }
  if (inputVal.startsWith("themes set ")) {
    const partial = inputVal.split(" ")[2] || "";
    Object.keys(theme).forEach(t => {
      if (t.startsWith(partial)) hintsCmds = [...hintsCmds, t];
    });
    return hintsCmds;
  }

  // cd <dir> — tab complete directories (supports path prefixes)
  const cdParts = inputVal.split(" ");
  if (inputVal === "cd " || (cdParts[0] === "cd" && cdParts.length === 2)) {
    const partial = inputVal === "cd " ? "" : cdParts[1];
    const { dirPath, filePart, prefix } = resolvePartialDir(cwd, partial);
    const dirs = getDirChildren(dirPath, filesystem, "dir").map(e => e.name);
    const matches = dirs.filter(d => d.startsWith(filePart));
    if (matches.length === 1) {
      setInputVal(`cd ${prefix}${matches[0]}`);
      return [];
    }
    if (matches.length > 1) {
      setHints(matches.map(m => prefix + m));
      return [];
    }
    return [];
  }

  // cat <file|dir/> — directories surfaced as intermediate path completions
  const catParts = inputVal.split(" ");
  if (inputVal === "cat " || (catParts[0] === "cat" && catParts.length === 2)) {
    const partial = inputVal === "cat " ? "" : catParts[1];
    const { dirPath, filePart, prefix } = resolvePartialDir(cwd, partial);
    const entries = getDirChildren(dirPath, filesystem).map(e =>
      e.type === "dir" ? e.name + "/" : e.name
    );
    const matches = entries.filter(n => n.startsWith(filePart));
    if (matches.length === 1) {
      setInputVal(`cat ${prefix}${matches[0]}`);
      return [];
    }
    if (matches.length > 1) {
      setHints(matches.map(m => prefix + m));
      return [];
    }
    return [];
  }

  // ls <dir> — tab complete all entries (supports path prefixes)
  const lsParts = inputVal.split(" ");
  if (inputVal === "ls " || (lsParts[0] === "ls" && lsParts.length === 2)) {
    const partial = inputVal === "ls " ? "" : lsParts[1];
    const { dirPath, filePart, prefix } = resolvePartialDir(cwd, partial);
    const entries = getDirChildren(dirPath, filesystem).map(e =>
      e.type === "dir" ? e.name + "/" : e.name
    );
    const matches = entries.filter(n => n.startsWith(filePart));
    if (matches.length === 1) {
      setInputVal(`ls ${prefix}${matches[0]}`);
      return [];
    }
    if (matches.length > 1) {
      setHints(matches.map(m => prefix + m));
      return [];
    }
    return [];
  }

  // man <command> — tab complete command names
  const manParts = inputVal.split(" ");
  if (inputVal === "man " || (manParts[0] === "man" && manParts.length === 2)) {
    const partial = inputVal === "man " ? "" : manParts[1];
    const matches = commandNames.filter(c => c.startsWith(partial));
    if (matches.length === 1) {
      setInputVal(`man ${matches[0]}`);
      return [];
    }
    if (matches.length > 1) {
      setHints(matches);
      return [];
    }
    return [];
  }

  // grep <pattern> <slug.md> — tab complete blog post slug on second arg
  const grepParts = inputVal.split(" ");
  if (grepParts[0] === "grep" && grepParts.length === 3) {
    const partial = grepParts[2];
    const slugs = blogPosts.map(p => `${p.slug}.md`);
    const matches = slugs.filter(s => s.startsWith(partial));
    if (matches.length === 1) {
      setInputVal(`grep ${grepParts[1]} ${matches[0]}`);
      return [];
    }
    if (matches.length > 1) {
      setHints(matches);
      return [];
    }
    return [];
  }

  // open <item> — tab complete based on current directory's openTargets
  const openParts = inputVal.split(" ");
  if (
    inputVal === "open " ||
    (openParts[0] === "open" && openParts.length === 2)
  ) {
    const partial = inputVal === "open " ? "" : openParts[1];
    const dirName = cwd[cwd.length - 1];
    const targets = openTargets[dirName];
    if (targets) {
      const keys = Object.keys(targets);
      const matches = keys.filter(k => k.startsWith(partial));
      if (matches.length === 1) {
        setInputVal(`open ${matches[0]}`);
        return [];
      }
      if (matches.length > 1) {
        setHints(matches);
        return [];
      }
    }
    return [];
  }
};
