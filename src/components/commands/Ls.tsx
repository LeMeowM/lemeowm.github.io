import { useContext } from "react";
import styled from "styled-components";
import { termContext } from "../Terminal";
import {
  filesystem,
  getNodeAtPath,
  getDirChildren,
  buildPath,
  pathToString,
  FSDir,
} from "../../utils/filesystem";
import { Wrapper, UsageDiv } from "../styles/Output.styled";

// ── Styled components ──────────────────────────────────────────────────────────

const LsGrid = styled.div`
  margin-top: 0.25rem;
  margin-bottom: 0.75rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 2rem;
`;

const DirEntry = styled.span`
  color: ${({ theme }) => theme.colors?.primary};
  font-weight: 700;
`;

const FileEntry = styled.span`
  color: ${({ theme }) => theme.colors?.text[100]};
`;

const ErrorMsg = styled.div`
  margin-top: 0.25rem;
  margin-bottom: 0.75rem;
`;

const LongList = styled.div`
  margin-top: 0.25rem;
  margin-bottom: 0.75rem;
`;

const LongRow = styled.div`
  display: flex;
  gap: 1.5ch;
  align-items: baseline;
`;

const TypeCol = styled.span`
  color: ${({ theme }) => theme.colors?.text[300]};
  width: 1ch;
  flex-shrink: 0;
`;

const RecursiveBlock = styled.div`
  margin-bottom: 0.5rem;
`;

const SectionHeader = styled.div`
  color: ${({ theme }) => theme.colors?.primary};
  margin-bottom: 0.15rem;
`;

const TreeBlock = styled.div`
  margin-top: 0.25rem;
  margin-bottom: 0.75rem;
`;

const TreeLine = styled.div`
  display: flex;
  align-items: baseline;
`;

const TreePrefix = styled.span`
  color: ${({ theme }) => theme.colors?.text[300]};
  white-space: pre;
  flex-shrink: 0;
`;

// ── Helpers ────────────────────────────────────────────────────────────────────

type Entry = { name: string; type: "dir" | "file" };

const dirsFirst = (entries: Entry[]): Entry[] => [
  ...entries.filter(e => e.type === "dir"),
  ...entries.filter(e => e.type === "file"),
];

const entryJsx = ({ name, type }: Entry) =>
  type === "dir" ? (
    <DirEntry key={name}>{name}/</DirEntry>
  ) : (
    <FileEntry key={name}>{name}</FileEntry>
  );

const longRowJsx = ({ name, type }: Entry) => (
  <LongRow key={name}>
    <TypeCol>{type === "dir" ? "d" : "-"}</TypeCol>
    {entryJsx({ name, type })}
  </LongRow>
);

// ── Recursive renderer ─────────────────────────────────────────────────────────

const renderRecursive = (
  path: string[],
  dir: FSDir,
  longFormat: boolean
): JSX.Element[] => {
  const entries = dirsFirst(
    Object.entries(dir.children).map(([name, node]) => ({
      name,
      type: node.type as "dir" | "file",
    }))
  );

  const body = longFormat ? (
    <LongList>{entries.map(longRowJsx)}</LongList>
  ) : (
    <LsGrid>{entries.map(entryJsx)}</LsGrid>
  );

  const section = (
    <RecursiveBlock key={path.join("/")}>
      <SectionHeader>{pathToString(path)}:</SectionHeader>
      {body}
    </RecursiveBlock>
  );

  const subSections = entries
    .filter(e => e.type === "dir")
    .flatMap(({ name }) => {
      const child = dir.children[name];
      return child.type === "dir"
        ? renderRecursive([...path, name], child as FSDir, longFormat)
        : [];
    });

  return [section, ...subSections];
};

// ── Tree renderer ──────────────────────────────────────────────────────────────

const renderTree = (
  dir: FSDir,
  prefix: string,
  keyBase: string
): JSX.Element[] => {
  const entries = Object.entries(dir.children);
  return entries.flatMap(([name, node], i) => {
    const isLast = i === entries.length - 1;
    const branch = isLast ? "└── " : "├── ";
    const childPrefix = prefix + (isLast ? "    " : "│   ");
    const key = `${keyBase}/${name}`;

    const line = (
      <TreeLine key={key}>
        <TreePrefix>{prefix + branch}</TreePrefix>
        {node.type === "dir" ? (
          <DirEntry>{name}/</DirEntry>
        ) : (
          <FileEntry>{name}</FileEntry>
        )}
      </TreeLine>
    );

    return node.type === "dir"
      ? [line, ...renderTree(node as FSDir, childPrefix, key)]
      : [line];
  });
};

// ── Main component ─────────────────────────────────────────────────────────────

const Ls: React.FC<{ overridePath?: string[] }> = ({ overridePath }) => {
  const { cwd, arg } = useContext(termContext);
  const basePath = overridePath ?? cwd;

  const flags = new Set<string>();
  let pathArg: string | undefined;

  if (!overridePath) {
    for (const token of arg) {
      if (token.startsWith("--")) {
        flags.add(token);
      } else if (token.startsWith("-") && token.length > 1) {
        for (const ch of token.slice(1)) flags.add(`-${ch}`);
      } else if (!pathArg) {
        pathArg = token;
      }
    }
  }

  // --help (check before path resolution)
  if (flags.has("--help")) {
    return (
      <UsageDiv>
        Usage: ls [flags] [path]
        <br />
        <br />
        &nbsp;&nbsp;-l&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;long
        format &mdash; one entry per line with type indicator
        <br />
        &nbsp;&nbsp;-R&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;recursive
        &mdash; list all subdirectories
        <br />
        &nbsp;&nbsp;--tree&nbsp;&nbsp;&nbsp;&nbsp;tree view &mdash; ASCII
        directory tree
        <br />
        &nbsp;&nbsp;--help&nbsp;&nbsp;&nbsp;&nbsp;show this help
      </UsageDiv>
    );
  }

  // Resolve target path
  let targetPath: string[] = basePath;
  if (pathArg) {
    const resolved = buildPath(basePath, pathArg);
    const node = getNodeAtPath(resolved, filesystem);
    if (!node) {
      return (
        <ErrorMsg>
          ls: cannot access &apos;{pathArg}&apos;: No such file or directory
        </ErrorMsg>
      );
    }
    if (node.type === "dir") targetPath = resolved;
  }

  const targetNode = getNodeAtPath(targetPath, filesystem);
  if (!targetNode || targetNode.type !== "dir") {
    return <Wrapper>(empty)</Wrapper>;
  }
  const dir = targetNode as FSDir;

  // --tree
  if (flags.has("--tree")) {
    return (
      <TreeBlock data-testid="ls">
        <TreeLine>
          <DirEntry>{pathToString(targetPath)}/</DirEntry>
        </TreeLine>
        {renderTree(dir, "", pathToString(targetPath))}
      </TreeBlock>
    );
  }

  // -R (optionally combined with -l)
  if (flags.has("-R")) {
    return (
      <div data-testid="ls">
        {renderRecursive(targetPath, dir, flags.has("-l"))}
      </div>
    );
  }

  const entries = getDirChildren(targetPath, filesystem);

  if (entries.length === 0) {
    return <Wrapper>(empty)</Wrapper>;
  }

  // -l
  if (flags.has("-l")) {
    return (
      <LongList data-testid="ls">{dirsFirst(entries).map(longRowJsx)}</LongList>
    );
  }

  // default grid
  return <LsGrid data-testid="ls">{dirsFirst(entries).map(entryJsx)}</LsGrid>;
};

export default Ls;
