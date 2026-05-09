import { useContext } from "react";
import styled from "styled-components";
import { termContext } from "../Terminal";
import { filesystem, getNodeAtPath, FSDir } from "../../utils/filesystem";
import Projects from "./Projects";
import Experience from "./Experience";
import Education from "./Education";
import Blog from "./Blog";
import Ls from "./Ls";

const ErrorMsg = styled.div`
  margin-top: 0.25rem;
  margin-bottom: 0.75rem;
`;

const dirContent: Record<string, React.ReactNode> = {
  blog: <Blog />,
  education: <Education />,
  experience: <Experience />,
  projects: <Projects />,
};

const Cd: React.FC = () => {
  const { arg, cwd } = useContext(termContext);
  const target = arg[0];

  // cd, cd ~, cd .., cd . — all silent (just change prompt)
  if (!target || target === "~" || target === ".." || target === ".") {
    return <></>;
  }

  const currentNode = getNodeAtPath(cwd, filesystem);
  if (!currentNode || currentNode.type !== "dir") {
    return <ErrorMsg>cd: {target}: No such file or directory</ErrorMsg>;
  }

  const child = (currentNode as FSDir).children[target];
  if (!child) {
    return <ErrorMsg>cd: {target}: No such file or directory</ErrorMsg>;
  }
  if (child.type === "file") {
    return <ErrorMsg>cd: {target}: Not a directory</ErrorMsg>;
  }

  // Content directories auto-show their page
  if (dirContent[target]) {
    return <>{dirContent[target]}</>;
  }

  // Other directories (e.g. contact) show their file listing
  return <Ls overridePath={[...cwd, target]} />;
};

export default Cd;
