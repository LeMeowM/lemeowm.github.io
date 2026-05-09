import { useContext } from "react";
import styled from "styled-components";
import { termContext } from "../Terminal";
import {
  filesystem,
  getNodeAtPath,
  FSDir,
  FSFile,
} from "../../utils/filesystem";
import About from "./About";
import Blog from "./Blog";
import Education from "./Education";
import Email from "./Email";
import Experience from "./Experience";
import Projects from "./Projects";
import Socials from "./Socials";
import { UsageDiv } from "../styles/Output.styled";

const ErrorMsg = styled.div`
  margin-top: 0.25rem;
  margin-bottom: 0.75rem;
`;

const contentMap: Record<string, React.ReactNode> = {
  about: <About />,
  blog: <Blog />,
  education: <Education />,
  email: <Email />,
  experience: <Experience />,
  projects: <Projects />,
  socials: <Socials />,
};

const Cat: React.FC = () => {
  const { arg, cwd } = useContext(termContext);

  if (!arg[0]) {
    return (
      <UsageDiv>
        Usage: cat &lt;file&gt;
        <br />
        eg: cat about.txt
      </UsageDiv>
    );
  }

  const filepath = arg[0];
  const parts = filepath.split("/");

  let resolvedCwd = cwd;
  let filename: string;

  if (parts.length === 1) {
    filename = parts[0];
  } else if (parts.length === 2) {
    const dirName = parts[0];
    filename = parts[1];
    const parentNode = getNodeAtPath(cwd, filesystem);
    if (
      !parentNode ||
      parentNode.type !== "dir" ||
      !(parentNode as FSDir).children[dirName] ||
      (parentNode as FSDir).children[dirName].type !== "dir"
    ) {
      return <ErrorMsg>cat: {filepath}: No such file or directory</ErrorMsg>;
    }
    resolvedCwd = [...cwd, dirName];
  } else {
    return <ErrorMsg>cat: {filepath}: No such file or directory</ErrorMsg>;
  }

  const dirNode = getNodeAtPath(resolvedCwd, filesystem);
  if (!dirNode || dirNode.type !== "dir") {
    return <ErrorMsg>cat: {filepath}: No such file or directory</ErrorMsg>;
  }

  const fileNode = (dirNode as FSDir).children[filename];
  if (!fileNode) {
    return <ErrorMsg>cat: {filepath}: No such file or directory</ErrorMsg>;
  }
  if (fileNode.type === "dir") {
    return <ErrorMsg>cat: {filepath}: Is a directory</ErrorMsg>;
  }

  const content = contentMap[(fileNode as FSFile).content];
  return content ? <>{content}</> : <ErrorMsg>{filepath}: (empty)</ErrorMsg>;
};

export default Cat;
