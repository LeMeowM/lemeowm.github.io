import { UsageDiv } from "./styles/Output.styled";

type Props = {
  cmd: "themes";
  marginY?: boolean;
};

const Usage: React.FC<Props> = ({ cmd, marginY = false }) => {
  return (
    <UsageDiv data-testid={`${cmd}-invalid-arg`} marginY={marginY}>
      Usage: {cmd} set &lt;theme-name&gt;
      <br />
      eg: {cmd} set ubuntu
    </UsageDiv>
  );
};

export default Usage;
