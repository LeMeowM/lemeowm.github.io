// The welcome copy and ASCII banners live in content/welcome.ts — edit them there.
import styled from "styled-components";
import { profile } from "@content/profile";
import { welcome } from "@content/welcome";
import {
  Cmd,
  HeroContainer,
  Link,
  PreName,
  PreNameMobile,
  PreWrapper,
  Seperator,
} from "../styles/Welcome.styled";

const CvHint = styled.div`
  margin-top: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-left: 3px solid ${({ theme }) => theme.colors?.secondary};
  color: ${({ theme }) => theme.colors?.text[100]};
  line-height: 1.6rem;
`;

const Welcome: React.FC = () => {
  const { asciiName, asciiNameMobile, intro, hints, cvHint, source } = welcome;

  return (
    <HeroContainer data-testid="welcome">
      <div className="info-section">
        <PreName>{asciiName}</PreName>
        <PreWrapper>
          <PreNameMobile>{asciiNameMobile}</PreNameMobile>
        </PreWrapper>
        <div>{intro}</div>
        <Seperator>----</Seperator>
        {hints.map(({ before, cmd, after }) => (
          <div key={cmd}>
            {before}
            <Cmd>{cmd}</Cmd>
            {after}
          </div>
        ))}
        <Seperator>----</Seperator>
        <CvHint>
          {cvHint.before}
          <Cmd>{cvHint.cmd}</Cmd>
          {cvHint.middle}
          <Cmd>{cvHint.key}</Cmd>
          {cvHint.after}
        </CvHint>
        <Seperator>----</Seperator>
        <div>
          {source.before}
          <Link
            href={profile.sourceRepo}
            target="_blank"
            rel="noopener noreferrer"
          >
            {source.label}
          </Link>
          {source.middle}
          <Cmd>{source.cmd}</Cmd>
          {source.after}
        </div>
      </div>
    </HeroContainer>
  );
};

export default Welcome;
