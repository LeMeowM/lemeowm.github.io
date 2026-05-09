import { ProjectsIntro } from "../styles/Projects.styled";
import { Cmd, CmdDesc, CmdList, HelpWrapper } from "../styles/Help.styled";
import { Link } from "../styles/Welcome.styled";
import { blogPosts } from "../../utils/content";

const Blog: React.FC = () => {
  return (
    <HelpWrapper data-testid="blog">
      <ProjectsIntro>
        Latest posts — use &apos;open &lt;n&gt;&apos; to read one.
      </ProjectsIntro>
      {blogPosts.map(({ id, title, url, date }) => (
        <CmdList key={id}>
          <Cmd>{id}.</Cmd>
          &nbsp;
          <CmdDesc>
            <Link href={url} target="_blank" rel="noopener noreferrer">
              {title}
            </Link>
            &nbsp;&mdash;&nbsp;{date}
          </CmdDesc>
        </CmdList>
      ))}
    </HelpWrapper>
  );
};

export default Blog;
