import { useEffect, useState } from "react";
import {
  StatusBarWrapper,
  StatusLeft,
  StatusCenter,
  StatusRight,
} from "./styles/StatusBar.styled";
import { pathToString } from "../utils/filesystem";

type Props = {
  cwd: string[];
  themeName: string;
};

const StatusBar: React.FC<Props> = ({ cwd, themeName }) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setElapsed(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const uptime =
    elapsed < 60
      ? `${elapsed}s`
      : `${Math.floor(elapsed / 60)}m ${elapsed % 60}s`;

  return (
    <StatusBarWrapper>
      <StatusLeft>[{themeName}]</StatusLeft>
      <StatusCenter>{pathToString(cwd)}</StatusCenter>
      <StatusRight>uptime: {uptime}</StatusRight>
    </StatusBarWrapper>
  );
};

export default StatusBar;
