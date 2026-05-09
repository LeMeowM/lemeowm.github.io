import { Path, User, WebsiteName, Wrapper } from "./styles/TerminalInfo.styled";
import { pathToString } from "../utils/filesystem";

type Props = {
  cwd: string[];
};

const TermInfo: React.FC<Props> = ({ cwd }) => {
  return (
    <Wrapper>
      <User>visitor</User>@<WebsiteName>lemeowm.github.io</WebsiteName>:
      <Path>{pathToString(cwd)}</Path>$
    </Wrapper>
  );
};

export default TermInfo;
