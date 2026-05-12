import styled from "styled-components";
import { Cmd, CmdDesc, CmdList, HelpWrapper } from "../styles/Help.styled";
import { Link } from "../styles/Welcome.styled";
import { socials } from "../../utils/content";

const Intro = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  line-height: 1.5rem;
`;

const Socials: React.FC = () => {
  return (
    <HelpWrapper data-testid="socials">
      <Intro>Find me online</Intro>
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
