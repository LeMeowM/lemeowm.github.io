import { useContext } from "react";
import styled from "styled-components";
import { termContext } from "../Terminal";
import {
  filesystem,
  getNodeAtPath,
  getDirChildren,
  FSDir,
} from "../../utils/filesystem";
import { Wrapper } from "../styles/Output.styled";

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

const Ls: React.FC<{ overridePath?: string[] }> = ({ overridePath }) => {
  const { cwd, arg } = useContext(termContext);
  const basePath = overridePath ?? cwd;

  let targetPath = basePath;

  if (!overridePath && arg[0]) {
    const node = getNodeAtPath(basePath, filesystem);
    if (node && node.type === "dir") {
      const child = (node as FSDir).children[arg[0]];
      if (child && child.type === "dir") {
        targetPath = [...basePath, arg[0]];
      } else if (!child) {
        return (
          <ErrorMsg>
            ls: cannot access &apos;{arg[0]}&apos;: No such file or directory
          </ErrorMsg>
        );
      }
    }
  }

  const entries = getDirChildren(targetPath, filesystem);

  if (entries.length === 0) {
    return <Wrapper>(empty)</Wrapper>;
  }

  const dirs = entries.filter(e => e.type === "dir");
  const files = entries.filter(e => e.type === "file");

  return (
    <LsGrid data-testid="ls">
      {dirs.map(({ name }) => (
        <DirEntry key={name}>{name}/</DirEntry>
      ))}
      {files.map(({ name }) => (
        <FileEntry key={name}>{name}</FileEntry>
      ))}
    </LsGrid>
  );
};

export default Ls;
