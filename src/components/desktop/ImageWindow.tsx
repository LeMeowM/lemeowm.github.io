// Image viewer window — the ASCII portrait rendered by ProfileArt.
import styled from "styled-components";
import { profile } from "@content/profile";
import { StatusCell } from "../styles/Chrome.styled";
import ProfileArt from "../commands/ProfileArt";
import Window from "./Window";
import { PANELS } from "./panels";

const meta = PANELS[1];

const ArtArea = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0.35rem;
`;

const ImageWindow: React.FC<{ className?: string }> = ({ className }) => (
  <Window
    id={meta.id}
    title={meta.title}
    icon={meta.icon}
    className={className}
    status={
      <>
        <StatusCell $grow>{profile.avatar}</StatusCell>
        <StatusCell>ascii · fullcolor</StatusCell>
      </>
    }
  >
    <ArtArea>
      <ProfileArt />
    </ArtArea>
  </Window>
);

export default ImageWindow;
