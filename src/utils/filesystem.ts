export type FSFile = {
  type: "file";
  content: string;
};

export type FSDir = {
  type: "dir";
  children: Record<string, FSFile | FSDir>;
};

export const filesystem: FSDir = {
  type: "dir",
  children: {
    "about.txt": { type: "file", content: "about" },
    blog: {
      type: "dir",
      children: {
        "README.txt": { type: "file", content: "blog" },
      },
    },
    contact: {
      type: "dir",
      children: {
        "email.txt": { type: "file", content: "email" },
        "socials.txt": { type: "file", content: "socials" },
      },
    },
    education: {
      type: "dir",
      children: {
        "README.txt": { type: "file", content: "education" },
      },
    },
    experience: {
      type: "dir",
      children: {
        "README.txt": { type: "file", content: "experience" },
      },
    },
    projects: {
      type: "dir",
      children: {
        "README.txt": { type: "file", content: "projects" },
      },
    },
  },
};

export const getNodeAtPath = (
  path: string[],
  fs: FSDir
): FSFile | FSDir | null => {
  let current: FSFile | FSDir = fs;
  for (let i = 1; i < path.length; i++) {
    if (current.type !== "dir") return null;
    const child: FSFile | FSDir | undefined = (current as FSDir).children[
      path[i]
    ];
    if (!child) return null;
    current = child;
  }
  return current;
};

export const resolvePath = (
  cwd: string[],
  target: string | undefined,
  fs: FSDir
): string[] | null => {
  if (!target || target === "~") return ["~"];
  if (target === "..") return cwd.length > 1 ? cwd.slice(0, -1) : ["~"];
  if (target === ".") return [...cwd];

  const currentNode = getNodeAtPath(cwd, fs);
  if (!currentNode || currentNode.type !== "dir") return null;

  const child = (currentNode as FSDir).children[target];
  if (!child || child.type !== "dir") return null;

  return [...cwd, target];
};

export const pathToString = (path: string[]): string => {
  if (path.length <= 1) return "~";
  return "~/" + path.slice(1).join("/");
};

export const getDirChildren = (
  cwd: string[],
  fs: FSDir,
  filter?: "dir" | "file"
): Array<{ name: string; type: "dir" | "file" }> => {
  const node = getNodeAtPath(cwd, fs);
  if (!node || node.type !== "dir") return [];
  const entries: [string, FSFile | FSDir][] = Object.entries(
    (node as FSDir).children
  );
  return entries
    .filter(([, child]) => !filter || child.type === filter)
    .map(([name, child]) => ({ name, type: child.type as "dir" | "file" }));
};
