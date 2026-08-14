// The desktop shell: wallpaper, the canonical window grid and the taskbar.
//
// The grid is fixed — every desktop visitor sees the same arrangement. Title bar
// buttons and taskbar buttons show, hide and maximize panels; nothing is
// draggable. Reader windows (blog posts, source files) portal into #window-layer
// and stack in front of the panels.
import { useEffect, useRef, useState } from "react";
import { useTheme } from "styled-components";
import { asciiBackground } from "asciify-engine";
import { chrome } from "../styles/Chrome.styled";
import {
  Area,
  DesktopRoot,
  Slot,
  Wallpaper,
  WindowLayer,
} from "../styles/Desktop.styled";
import ImageWindow from "./ImageWindow";
import SettingsWindow from "./SettingsWindow";
import Taskbar from "./Taskbar";
import TerminalWindow from "./TerminalWindow";
import { WindowProvider } from "./windowManager";

const Desktop: React.FC<{ themeName: string }> = ({ themeName }) => {
  const [cwd, setCwd] = useState<string[]>(["~"]);
  const [externalCommand, setExternalCommand] = useState<string | null>(null);
  const wallpaperRef = useRef<HTMLDivElement>(null);
  const areaRef = useRef<HTMLElement>(null);
  const theme = useTheme();
  const rainColor = chrome(theme).desktopGrid;

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

  // Where the windows stack (narrow screens), autofocusing the terminal input
  // scrolls it into view on load. Start at the top of the desktop instead.
  useEffect(() => {
    if (areaRef.current) areaRef.current.scrollTop = 0;
  }, []);

  return (
    <WindowProvider>
      <DesktopRoot>
        <Wallpaper ref={wallpaperRef} aria-hidden="true" />
        <Area ref={areaRef}>
          <Slot $area="1 / 1 / 3 / 2" $mobileHeight="70vh">
            <TerminalWindow
              cwd={cwd}
              onCwdChange={setCwd}
              externalCommand={externalCommand}
              onCommandExecuted={() => setExternalCommand(null)}
            />
          </Slot>
          <Slot $area="1 / 2 / 2 / 3" $mobileHeight="40vh">
            <ImageWindow />
          </Slot>
          <Slot $area="2 / 2 / 3 / 3" $mobileHeight="46vh">
            <SettingsWindow themeName={themeName} />
          </Slot>
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
