import { useContext } from "react";
import styled from "styled-components";
import { termContext } from "../Terminal";
import {
  filesystem,
  getNodeAtPath,
  buildPath,
  normalizePath,
} from "../../utils/filesystem";
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

  // No arg, home, simple dot/dotdot — silent (just change prompt)
  if (!target || target === "~" || target === ".." || target === ".") {
    return <></>;
  }

  const resolvedPath = normalizePath(buildPath(cwd, target));

  const node = getNodeAtPath(resolvedPath, filesystem);
  if (!node) {
    return <ErrorMsg>cd: {target}: No such file or directory</ErrorMsg>;
  }
  if (node.type === "file") {
    return <ErrorMsg>cd: {target}: Not a directory</ErrorMsg>;
  }

  const dirName = resolvedPath[resolvedPath.length - 1];

  // Resolved to root — silent
  if (dirName === "~") return <></>;

  // Content directories auto-show their page
  if (dirContent[dirName]) {
    return <>{dirContent[dirName]}</>;
  }

  // Other directories show their file listing
  return <Ls overridePath={resolvedPath} />;
};

export default Cd;
