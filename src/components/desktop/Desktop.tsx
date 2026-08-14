// The desktop shell: wallpaper, the canonical window grid and the taskbar.
//
// The grid is fixed — every desktop visitor sees the same arrangement. Title bar
// buttons and taskbar buttons show, hide and maximize panels; nothing is
// draggable. Reader windows (blog posts, source files) portal into #window-layer
// and stack in front of the panels.
import { useEffect, useRef, useState } from "react";
import styled, { useTheme } from "styled-components";
import { asciiBackground } from "asciify-engine";
import Terminal from "../Terminal";
import { StatusCell, chrome } from "../styles/Chrome.styled";
import {
  Area,
  DesktopRoot,
  Wallpaper,
  WindowLayer,
} from "../styles/Desktop.styled";
import { pathToString } from "../../utils/filesystem";
import ImageWindow from "./ImageWindow";
import SettingsWindow from "./SettingsWindow";
import Taskbar from "./Taskbar";
import Window from "./Window";
import { PANELS } from "./panels";
import { WindowProvider } from "./windowManager";

const TerminalSlot = styled(Window)`
  grid-area: 1 / 1 / 3 / 2;

  @media (max-width: 900px) {
    flex: 0 0 auto;
    min-height: 70vh;
  }
`;

const ProfileSlot = styled(ImageWindow)`
  grid-area: 1 / 2 / 2 / 3;

  @media (max-width: 900px) {
    flex: 0 0 auto;
    min-height: 40vh;
  }
`;

const SettingsSlot = styled(SettingsWindow)`
  grid-area: 2 / 2 / 3 / 3;

  @media (max-width: 900px) {
    flex: 0 0 auto;
    min-height: 46vh;
  }
`;

const TerminalHost = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
`;

const terminalMeta = PANELS[0];

const Desktop: React.FC<{ themeName: string }> = ({ themeName }) => {
  const [cwd, setCwd] = useState<string[]>(["~"]);
  const [externalCommand, setExternalCommand] = useState<string | null>(null);
  const wallpaperRef = useRef<HTMLDivElement>(null);
  const areaRef = useRef<HTMLElement>(null);
  const theme = useTheme();
  const rainColor = chrome(theme).desktopGrid;

  // Where the windows stack (narrow screens), autofocusing the terminal input
  // scrolls it into view on load. Start at the top of the desktop instead.
  useEffect(() => {
    if (areaRef.current) areaRef.current.scrollTop = 0;
  }, []);

  useEffect(() => {
    if (!wallpaperRef.current) return;
    const bg = asciiBackground(wallpaperRef.current, {
      type: "rain",
      colorScheme: "auto",
      color: rainColor,
      opacity: 0.16,
      fontSize: 14,
      density: 0.3,
      speed: 0.7,
    });
    return () => bg.destroy();
  }, [rainColor]);

  return (
    <WindowProvider>
      <DesktopRoot>
        <Wallpaper ref={wallpaperRef} aria-hidden="true" />
        <Area ref={areaRef}>
          <TerminalSlot
            id={terminalMeta.id}
            title={terminalMeta.title}
            icon={terminalMeta.icon}
            status={
              <>
                <StatusCell $grow>{pathToString(cwd)}</StatusCell>
                <StatusCell>type &apos;help&apos;</StatusCell>
              </>
            }
          >
            <TerminalHost>
              <Terminal
                onCwdChange={setCwd}
                externalCommand={externalCommand}
                onCommandExecuted={() => setExternalCommand(null)}
              />
            </TerminalHost>
          </TerminalSlot>
          <ProfileSlot />
          <SettingsSlot themeName={themeName} />
          <WindowLayer id="window-layer" />
        </Area>
        <Taskbar
          cwd={cwd}
          themeName={themeName}
          onCommand={setExternalCommand}
        />
      </DesktopRoot>
    </WindowProvider>
  );
};

export default Desktop;
