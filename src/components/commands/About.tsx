// The bio text lives in content/about.md — edit it there.
import ReactMarkdown from "react-markdown";
import aboutMd from "@content/about.md?raw";
import { AboutWrapper, Highlight } from "../styles/About.styled";

const About: React.FC = () => {
  return (
    <AboutWrapper data-testid="about">
      <ReactMarkdown
        components={{
          strong: ({ children }) => <Highlight>{children}</Highlight>,
        }}
      >
        {aboutMd}
      </ReactMarkdown>
    </AboutWrapper>
  );
};

export default About;
