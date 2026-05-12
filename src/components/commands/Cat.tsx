import { useContext } from "react";
import styled from "styled-components";
import { termContext } from "../Terminal";
import { filesystem, getNodeAtPath, FSFile } from "../../utils/filesystem";
import About from "./About";
import Blog from "./Blog";
import BlogPost from "./BlogPost";
import Education from "./Education";
import Email from "./Email";
import Experience from "./Experience";
import Projects from "./Projects";
import Socials from "./Socials";
import SourceViewer from "./SourceViewer";
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

  const segments = filepath.startsWith("/")
    ? ["~", ...filepath.slice(1).split("/").filter(Boolean)]
    : [...cwd, ...filepath.split("/").filter(Boolean)];

  const node = getNodeAtPath(segments, filesystem);
  const filename = segments[segments.length - 1];

  if (!node)
    return <ErrorMsg>cat: {filepath}: No such file or directory</ErrorMsg>;
  if (node.type === "dir")
    return <ErrorMsg>cat: {filepath}: Is a directory</ErrorMsg>;

  const contentKey = (node as FSFile).content;

  if (contentKey.startsWith("blog-post:")) {
    const slug = contentKey.slice("blog-post:".length);
    return <BlogPost slug={slug} />;
  }

  if (contentKey.startsWith("source-file:")) {
    const path = contentKey.slice("source-file:".length);
    return <SourceViewer path={path} filename={filename} />;
  }

  const content = contentMap[contentKey];
  return content ? <>{content}</> : <ErrorMsg>{filepath}: (empty)</ErrorMsg>;
};

export default Cat;
