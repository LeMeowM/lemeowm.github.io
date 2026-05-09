import React from "react";
import Cat from "../components/commands/Cat";
import Cd from "../components/commands/Cd";
import Clear from "../components/commands/Clear";
import Cv from "../components/commands/Cv";
import Echo from "../components/commands/Echo";
import Help from "../components/commands/Help";
import History from "../components/commands/History";
import Ls from "../components/commands/Ls";
import Man from "../components/commands/Man";
import Neofetch from "../components/commands/Neofetch";
import Open from "../components/commands/Open";
import Pwd from "../components/commands/Pwd";
import Themes from "../components/commands/Themes";
import Welcome from "../components/commands/Welcome";
import GeneralOutput from "../components/commands/GeneralOutput";
import { commandMeta, CommandMeta } from "./meta";

export type CommandDef = CommandMeta & { component: React.ReactElement };

const components: Record<string, React.ReactElement> = {
  cat: <Cat />,
  cd: <Cd />,
  clear: <Clear />,
  cv: <Cv />,
  echo: <Echo />,
  help: <Help />,
  history: <History />,
  ls: <Ls />,
  man: <Man />,
  neofetch: <Neofetch />,
  open: <Open />,
  pwd: <Pwd />,
  themes: <Themes />,
  whoami: <GeneralOutput>visitor</GeneralOutput>,
  welcome: <Welcome />,
};

export const registry: CommandDef[] = commandMeta.map(meta => ({
  ...meta,
  component: components[meta.name],
}));
