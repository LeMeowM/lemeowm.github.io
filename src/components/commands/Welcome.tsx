import styled from "styled-components";
import {
  Cmd,
  HeroContainer,
  Link,
  PreImg,
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
  return (
    <HeroContainer data-testid="welcome">
      <div className="info-section">
        <PreName>
          {`
             /$$     /$$                                                
            | $$    | $$                                                
  /$$$$$$  /$$$$$$  | $$ /$$$$$$/$$$$   /$$$$$$   /$$$$$$  /$$  /$$  /$$
 |____  $$|_  $$_/  | $$| $$_  $$_  $$ /$$__  $$ /$$__  $$| $$ | $$ | $$
  /$$$$$$$  | $$    | $$| $$ \\ $$ \\ $$| $$$$$$$$| $$  \\ $$| $$ | $$ | $$
 /$$__  $$  | $$ /$$| $$| $$ | $$ | $$| $$_____/| $$  | $$| $$ | $$ | $$
|  $$$$$$$  |  $$$$/| $$| $$ | $$ | $$|  $$$$$$$|  $$$$$$/|  $$$$$/$$$$/
 \\_______/   \\___/  |__/|__/ |__/ |__/ \\_______/ \\______/  \\_____/\\___/ 
          `}
        </PreName>
        <PreWrapper>
          <PreNameMobile>
            {`
        _   _                              
       | | | |                             
   __ _| |_| |_ __ ___   ___  _____      __
  / _\` | __| | '_ \` _ \\ / _ \\/ _ \\ \\ /\\ / /
 | (_| | |_| | | | | | |  __/ (_) \\ V  V / 
  \\__,_|\\__|_|_| |_| |_|\\___|\\___/ \\_/\\_/  
          `}
          </PreNameMobile>
        </PreWrapper>
        <div>Welcome to my terminal portfolio.</div>
        <Seperator>----</Seperator>
        <div>
          Type <Cmd>ls</Cmd> to see available sections.
        </div>
        <div>
          Type <Cmd>cd &lt;dir&gt;</Cmd> to navigate into a section.
        </div>
        <div>
          Type <Cmd>cat &lt;file&gt;</Cmd> to read a file.
        </div>
        <Seperator>----</Seperator>
        <CvHint>
          Not a terminal person? Just type <Cmd>cv</Cmd> and press{" "}
          <Cmd>Enter</Cmd> to download my CV as a PDF.
        </CvHint>
        <Seperator>----</Seperator>
        <div>
          Source code on{" "}
          <Link
            href="https://github.com/lemeowm/lemeowm.github.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Link>
          . Type <Cmd>help</Cmd> for all commands.
        </div>
      </div>
      <div className="illu-section">
        <PreImg>
          {`
                       ,##,,eew,
                     ,##############C
                  a###############@##
                 7####^\`^"7W7^"@####
                 @#@b\`         ^@#@^
                  ##^,,,,   ,,,,^#^
                 ,,@######"#######=
                  .''555"\` '5555b|
                  T"@  ,,,^,mg,@,*
                     %p||\`~~'.#\`
                      ^Wp  ,#T
                     :b''@@b^}
                  ,^     \` 'b 3-
              .<\` 'p   ^v   #   b   *.
            {      }   #"GpGb   [
            C      3 * @#######Nl      \`
           '            ^@##b     ($    !
         `}
        </PreImg>
      </div>
    </HeroContainer>
  );
};

export default Welcome;
