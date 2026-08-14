// The taskbar: Start button, one button per open window, and the tray.
// It absorbs the old status bar — current directory, active theme and a clock.
import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  bevelIn,
  bevelOut,
  CHROME_FONT,
  chrome,
  grooveIn,
} from "../styles/Chrome.styled";
import { pathToString } from "../../utils/filesystem";
import { PANELS } from "./panels";
import StartMenu from "./StartMenu";
import { useWindows } from "./windowManager";

const Bar = styled.footer`
  position: relative;
  z-index: 40;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 4px;
  height: 30px;
  padding: 2px 3px;
  background: ${({ theme }) => chrome(theme).face};
  color: ${({ theme }) => chrome(theme).faceText};
  font-family: ${CHROME_FONT};
  font-size: 11px;
  user-select: none;
  ${bevelOut}
`;

const StartButton = styled.button<{ $open?: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  height: 22px;
  padding: 0 8px;
  border: 0;
  cursor: pointer;
  flex-shrink: 0;
  font-family: ${CHROME_FONT};
  font-size: 11px;
  font-weight: 700;
  background: ${({ theme }) => chrome(theme).face};
  color: ${({ theme }) => chrome(theme).faceText};
  ${({ $open }) => ($open ? bevelIn : bevelOut)}
`;

const Separator = styled.span`
  width: 0;
  height: 20px;
  flex-shrink: 0;
  border-left: 1px solid ${({ theme }) => chrome(theme).faceShadow};
  border-right: 1px solid ${({ theme }) => chrome(theme).faceHighlight};
`;

const Tasks = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  gap: 3px;
  overflow: hidden;
`;

const TaskButton = styled.button<{ $pressed?: boolean }>`
  display: flex;
  align-items: center;
  gap: 5px;
  height: 22px;
  min-width: 0;
  flex: 0 1 152px;
  padding: 0 7px;
  border: 0;
  cursor: pointer;
  text-align: left;
  font-family: ${CHROME_FONT};
  font-size: 11px;
  font-weight: ${({ $pressed }) => ($pressed ? 700 : 400)};
  background: ${({ theme }) => chrome(theme).face};
  color: ${({ theme }) => chrome(theme).faceText};
  ${({ $pressed }) => ($pressed ? bevelIn : bevelOut)}

  span:last-child {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (max-width: 700px) {
    flex: 0 0 auto;
    padding: 0 6px;

    span:last-child {
      display: none;
    }
  }
`;

const Tray = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 22px;
  flex-shrink: 0;
  padding: 0 8px;
  ${grooveIn}
`;

const TrayCell = styled.span`
  white-space: nowrap;

  @media (max-width: 700px) {
    &:not(:last-child) {
      display: none;
    }
  }
`;

type Props = {
  cwd: string[];
  themeName: string;
  onCommand: (cmd: string) => void;
};

const Taskbar: React.FC<Props> = ({ cwd, themeName, onCommand }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [clock, setClock] = useState(() => new Date());
  const { visible, floating, show, hide, active, setActive } = useWindows();

  /** Win2k behaviour: raise a hidden window, minimize the focused one. */
  const taskClick = (id: (typeof PANELS)[number]["id"]) => {
    if (!visible[id]) show(id);
    else if (active === id) hide(id);
    else setActive(id);
  };

  useEffect(() => {
    const id = setInterval(() => setClock(new Date()), 10_000);
    return () => clearInterval(id);
  }, []);

  const time = clock.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Bar>
      <StartButton
        type="button"
        aria-expanded={menuOpen}
        aria-haspopup="menu"
        $open={menuOpen}
        onClick={() => setMenuOpen(o => !o)}
      >
        <span aria-hidden="true">🪟</span> Start
      </StartButton>
      {menuOpen && (
        <StartMenu onCommand={onCommand} onClose={() => setMenuOpen(false)} />
      )}
      <Separator />
      <Tasks>
        {PANELS.map(({ id, taskLabel, icon }) => (
          <TaskButton
            key={id}
            type="button"
            $pressed={visible[id] && active === id}
            aria-pressed={visible[id]}
            onClick={() => taskClick(id)}
          >
            <span aria-hidden="true">{icon}</span>
            <span>{taskLabel}</span>
          </TaskButton>
        ))}
        {floating.map(({ key, title, icon, raise }) => (
          <TaskButton
            key={key}
            type="button"
            $pressed={active === key}
            onClick={raise}
          >
            <span aria-hidden="true">{icon}</span>
            <span>{title}</span>
          </TaskButton>
        ))}
      </Tasks>
      <Tray>
        <TrayCell>{pathToString(cwd)}</TrayCell>
        <TrayCell>[{themeName}]</TrayCell>
        <TrayCell>{time}</TrayCell>
      </Tray>
    </Bar>
  );
};

export default Taskbar;
