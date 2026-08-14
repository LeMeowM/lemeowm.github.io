// Terminal window — the interactive prompt, unchanged, in a Win2k frame.
import styled from "styled-components";
import Terminal from "../Terminal";
import { StatusCell } from "../styles/Chrome.styled";
import { pathToString } from "../../utils/filesystem";
import Window from "./Window";
import { PANELS } from "./panels";

const meta = PANELS.terminal;

const Host = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
`;

type Props = {
  cwd: string[];
  onCwdChange: (cwd: string[]) => void;
  externalCommand: string | null;
  onCommandExecuted: () => void;
};

const TerminalWindow: React.FC<Props> = ({
  cwd,
  onCwdChange,
  externalCommand,
  onCommandExecuted,
}) => (
  <Window
    id={meta.id}
    title={meta.title}
    icon={meta.icon}
    status={
      <>
        <StatusCell $grow>{pathToString(cwd)}</StatusCell>
        <StatusCell>type &apos;help&apos;</StatusCell>
      </>
    }
  >
    <Host>
      <Terminal
        onCwdChange={onCwdChange}
        externalCommand={externalCommand}
        onCommandExecuted={onCommandExecuted}
      />
    </Host>
  </Window>
);

export default TerminalWindow;
