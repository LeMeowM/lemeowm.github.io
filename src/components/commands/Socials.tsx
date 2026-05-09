import { ProjectsIntro } from "../styles/Projects.styled";
import { Cmd, CmdDesc, CmdList, HelpWrapper } from "../styles/Help.styled";
import { Link } from "../styles/Welcome.styled";
import { socials } from "../../utils/content";

const Socials: React.FC = () => {
  return (
    <HelpWrapper data-testid="socials">
      <ProjectsIntro>Find me online</ProjectsIntro>
      {socials.map(({ id, title, url }) => (
        <CmdList key={id}>
          <Cmd>{id}.</Cmd>
          &nbsp;
          <CmdDesc>
            {title}&nbsp;&mdash;&nbsp;
            <Link href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </Link>
          </CmdDesc>
        </CmdList>
      ))}
    </HelpWrapper>
  );
};

export default Socials;
