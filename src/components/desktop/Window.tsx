// A canonical desktop panel: terminal, image viewer, settings.
//
// Position comes from the desktop grid, never from the user — the title bar
// buttons only show, hide or maximize the panel.
import styled, { css } from "styled-components";
import {
  DialogBody,
  StatusStrip,
  TitleBar,
  TitleButton,
  TitleButtons,
  TitleIcon,
  TitleText,
  WindowBody,
  WindowFrame,
} from "../styles/Chrome.styled";
import { PanelId, useWindows } from "./windowManager";

const Frame = styled(WindowFrame)<{ $maximized?: boolean }>`
  ${({ $maximized }) =>
    $maximized &&
    css`
      /* && outranks the grid-area the desktop assigns to this slot. Without
         clearing it, an absolutely positioned grid child is still bounded by
         its grid cell instead of the whole desktop. */
      && {
        grid-area: auto;
        position: absolute;
        inset: 0;
        z-index: 20;
      }
    `}
`;

const MaximizeButton = styled(TitleButton)`
  @media (max-width: 900px) {
    display: none;
  }
`;

type Props = {
  id: PanelId;
  title: string;
  icon: string;
  status?: React.ReactNode;
  className?: string;
  /** "client" = sunken terminal-coloured area, "dialog" = flat window face. */
  bodyKind?: "client" | "dialog";
  children: React.ReactNode;
};

const Window: React.FC<Props> = ({
  id,
  title,
  icon,
  status,
  className,
  bodyKind = "client",
  children,
}) => {
  const { visible, maximized, hide, toggleMaximize, active, setActive } =
    useWindows();

  if (!visible[id]) return null;

  const Body = bodyKind === "dialog" ? DialogBody : WindowBody;

  return (
    <Frame
      className={className}
      $maximized={maximized === id}
      aria-labelledby={`window-title-${id}`}
      onMouseDown={() => setActive(id)}
    >
      <TitleBar $active={active === id}>
        <TitleIcon aria-hidden="true">{icon}</TitleIcon>
        <TitleText id={`window-title-${id}`}>{title}</TitleText>
        <TitleButtons>
          <TitleButton
            type="button"
            aria-label={`Minimize ${title}`}
            onClick={() => hide(id)}
          >
            _
          </TitleButton>
          <MaximizeButton
            type="button"
            aria-label={`${maximized === id ? "Restore" : "Maximize"} ${title}`}
            onClick={() => toggleMaximize(id)}
          >
            {maximized === id ? "❐" : "□"}
          </MaximizeButton>
          <TitleButton
            type="button"
            aria-label={`Close ${title}`}
            onClick={() => hide(id)}
          >
            ✕
          </TitleButton>
        </TitleButtons>
      </TitleBar>
      <Body>{children}</Body>
      {status && <StatusStrip>{status}</StatusStrip>}
    </Frame>
  );
};

export default Window;
