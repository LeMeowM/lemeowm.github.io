// A canonical desktop panel: terminal, image viewer, settings.
//
// Position comes from the slot the desktop puts it in, never from the user —
// the title bar buttons only show, hide and maximize the panel.
import styled, { css } from "styled-components";
import {
  DialogBody,
  StatusStrip,
  WindowBody,
  WindowFrame,
} from "../styles/Chrome.styled";
import WindowTitleBar from "./WindowTitleBar";
import { PanelId, useWindows } from "./windowManager";

const Frame = styled(WindowFrame)<{ $maximized?: boolean }>`
  ${({ $maximized }) =>
    $maximized &&
    css`
      /* Fills the desktop area, which is the nearest positioned ancestor. */
      position: absolute;
      inset: 0;
      z-index: 20;
    `}
`;

type Props = {
  id: PanelId;
  title: string;
  icon: string;
  status?: React.ReactNode;
  /** "client" = sunken terminal-coloured area, "dialog" = flat window face. */
  bodyKind?: "client" | "dialog";
  children: React.ReactNode;
};

const Window: React.FC<Props> = ({
  id,
  title,
  icon,
  status,
  bodyKind = "client",
  children,
}) => {
  const { visible, maximized, hide, toggleMaximize, active, setActive } =
    useWindows();

  if (!visible[id]) return null;

  const Body = bodyKind === "dialog" ? DialogBody : WindowBody;

  return (
    <Frame
      $maximized={maximized === id}
      aria-labelledby={`window-title-${id}`}
      onMouseDown={() => setActive(id)}
    >
      <WindowTitleBar
        titleId={`window-title-${id}`}
        title={title}
        icon={icon}
        active={active === id}
        maximized={maximized === id}
        onMinimize={() => hide(id)}
        onMaximize={() => toggleMaximize(id)}
        onClose={() => hide(id)}
      />
      <Body>{children}</Body>
      {status && <StatusStrip>{status}</StatusStrip>}
    </Frame>
  );
};

export default Window;
