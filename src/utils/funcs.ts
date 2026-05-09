import theme from "../components/styles/themes";
import { filesystem, getDirChildren } from "./filesystem";
import { openTargets } from "./content";
import { commandNames } from "../commands/meta";

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

  // cd <dir> — tab complete directories
  const cdParts = inputVal.split(" ");
  if (inputVal === "cd " || (cdParts[0] === "cd" && cdParts.length === 2)) {
    const partial = inputVal === "cd " ? "" : cdParts[1];
    const dirs = getDirChildren(cwd, filesystem, "dir").map(e => e.name);
    const matches = dirs.filter(d => d.startsWith(partial));
    if (matches.length === 1) {
      setInputVal(`cd ${matches[0]}`);
      return [];
    }
    if (matches.length > 1) {
      setHints(matches);
      return [];
    }
    return [];
  }

  // cat <file> — tab complete files in current dir
  const catParts = inputVal.split(" ");
  if (inputVal === "cat " || (catParts[0] === "cat" && catParts.length === 2)) {
    const partial = inputVal === "cat " ? "" : catParts[1];
    const files = getDirChildren(cwd, filesystem, "file").map(e => e.name);
    const matches = files.filter(f => f.startsWith(partial));
    if (matches.length === 1) {
      setInputVal(`cat ${matches[0]}`);
      return [];
    }
    if (matches.length > 1) {
      setHints(matches);
      return [];
    }
    return [];
  }

  // ls <dir> — tab complete all entries
  const lsParts = inputVal.split(" ");
  if (inputVal === "ls " || (lsParts[0] === "ls" && lsParts.length === 2)) {
    const partial = inputVal === "ls " ? "" : lsParts[1];
    const entries = getDirChildren(cwd, filesystem).map(e =>
      e.type === "dir" ? e.name + "/" : e.name
    );
    const matches = entries.filter(n => n.startsWith(partial));
    if (matches.length === 1) {
      setInputVal(`ls ${matches[0]}`);
      return [];
    }
    if (matches.length > 1) {
      setHints(matches);
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

  // open <item> — tab complete based on current directory
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
