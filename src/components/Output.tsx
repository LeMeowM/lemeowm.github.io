import { useContext } from "react";
import { OutputContainer, UsageDiv } from "./styles/Output.styled";
import { termContext } from "./Terminal";
import { registry } from "../commands/registry";

type Props = {
  index: number;
  cmd: string;
};

const Output: React.FC<Props> = ({ index, cmd }) => {
  const { arg } = useContext(termContext);
  const entry = registry.find(c => c.name === cmd);

  if (!entry) return null;

  if (!entry.acceptsArgs && arg.length > 0)
    return <UsageDiv data-testid="usage-output">Usage: {cmd}</UsageDiv>;

  return (
    <OutputContainer data-testid={index === 0 ? "latest-output" : null}>
      {entry.component}
    </OutputContainer>
  );
};

export default Output;
