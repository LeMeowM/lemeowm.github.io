import { profile } from "@content/profile";
import { Path, User, WebsiteName, Wrapper } from "./styles/TerminalInfo.styled";
import { pathToString } from "../utils/filesystem";

type Props = {
  cwd: string[];
};

const TermInfo: React.FC<Props> = ({ cwd }) => {
  return (
    <Wrapper>
      <User>{profile.user}</User>@<WebsiteName>{profile.host}</WebsiteName>:
      <Path>{pathToString(cwd)}</Path>$
    </Wrapper>
  );
};

export default TermInfo;
