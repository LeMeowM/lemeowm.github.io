import {
  Cmd,
  CmdDesc,
  CmdList,
  HelpWrapper,
  KeyContainer,
} from "../styles/Help.styled";
import { commandMeta } from "../../commands/meta";
import { generateTabs } from "../../utils/funcs";

const Help: React.FC = () => {
  return (
    <HelpWrapper data-testid="help">
      {commandMeta
        .filter(c => !c.hidden)
        .map(({ name, desc, tab }) => (
          <CmdList key={name}>
            <Cmd>{name}</Cmd>
            {generateTabs(tab)}
            <CmdDesc>- {desc}</CmdDesc>
          </CmdList>
        ))}
      <KeyContainer>
        <div>Tab or Ctrl + i&nbsp; =&gt; autocomplete command or path</div>
        <div>Up / Down Arrow{generateTabs(1)} =&gt; cycle command history</div>
        <div>Ctrl + l {generateTabs(5)} =&gt; clear the terminal</div>
      </KeyContainer>
    </HelpWrapper>
  );
};

export default Help;
