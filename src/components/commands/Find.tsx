import { useContext } from "react";
import styled from "styled-components";
import { termContext } from "../Terminal";
import { filesystem, FSDir, FSFile } from "../../utils/filesystem";
import { UsageDiv } from "../styles/Output.styled";

const ResultLine = styled.div`
  color: ${({ theme }) => theme.colors?.text[100]};
  line-height: 1.75rem;
`;

const DirColor = styled.span`
  color: ${({ theme }) => theme.colors?.primary};
`;

const NoResults = styled.div`
  color: ${({ theme }) => theme.colors?.text[300]};
  margin-top: 0.25rem;
  margin-bottom: 0.75rem;
`;

type Entry = { path: string; type: "file" | "dir" };

function walk(node: FSDir | FSFile, path: string, results: Entry[]) {
  if (node.type === "file") {
    results.push({ path, type: "file" });
    return;
  }
  results.push({ path, type: "dir" });
  for (const [name, child] of Object.entries(node.children)) {
    walk(child, `${path}/${name}`, results);
  }
}

function globToRegex(pattern: string): RegExp {
  const escaped = pattern
    .replace(/[.+^${}()|[\]\\]/g, "\\$&")
    .replace(/\*/g, ".*");
  return new RegExp(`^${escaped}$`);
}

const Find: React.FC = () => {
  const { arg } = useContext(termContext);

  const nameIdx = arg.indexOf("-name");
  const namePattern = nameIdx !== -1 ? arg[nameIdx + 1] : null;

  if (nameIdx !== -1 && !namePattern) {
    return (
      <UsageDiv>
        Usage: find [-name &lt;pattern&gt;]
        <br />
        eg: find -name *.md
      </UsageDiv>
    );
  }

  const entries: Entry[] = [];
  walk(filesystem, "~", entries);

  const filtered = namePattern
    ? entries.filter(e => {
        const basename = e.path.split("/").pop() ?? e.path;
        return globToRegex(namePattern).test(basename);
      })
    : entries;

  if (filtered.length === 0) {
    return <NoResults>find: no matches found</NoResults>;
  }

  return (
    <div>
      {filtered.map(({ path, type }) => (
        <ResultLine key={path}>
          {type === "dir" ? <DirColor>{path}/</DirColor> : path}
        </ResultLine>
      ))}
    </div>
  );
};

export default Find;
