// The title bar every window wears: icon, title, and the buttons at the right.
//
// Panels and reader windows differ only in which buttons they get, so they pass
// the handlers they support and share everything else — markup, aria labels and
// the glyphs — from here.
import styled from "styled-components";
import {
  TitleBar,
  TitleButton,
  TitleButtons,
  TitleIcon,
  TitleText,
} from "../styles/Chrome.styled";

/** No room to rearrange the layout on a phone, so no maximize either. */
const MaximizeButton = styled(TitleButton)`
  @media (max-width: 900px) {
    display: none;
  }
`;

type Props = {
  titleId: string;
  title: string;
  icon: string;
  active: boolean;
  onClose: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  maximized?: boolean;
};

const WindowTitleBar: React.FC<Props> = ({
  titleId,
  title,
  icon,
  active,
  onClose,
  onMinimize,
  onMaximize,
  maximized,
}) => (
  <TitleBar $active={active}>
    <TitleIcon aria-hidden="true">{icon}</TitleIcon>
    <TitleText id={titleId}>{title}</TitleText>
    <TitleButtons>
      {onMinimize && (
        <TitleButton
          type="button"
          aria-label={`Minimize ${title}`}
          onClick={onMinimize}
        >
          _
        </TitleButton>
      )}
      {onMaximize && (
        <MaximizeButton
          type="button"
          aria-label={`${maximized ? "Restore" : "Maximize"} ${title}`}
          onClick={onMaximize}
        >
          {maximized ? "❐" : "□"}
        </MaximizeButton>
      )}
      <TitleButton
        type="button"
        aria-label={`Close ${title}`}
        onClick={onClose}
      >
        ✕
      </TitleButton>
    </TitleButtons>
  </TitleBar>
);

export default WindowTitleBar;
