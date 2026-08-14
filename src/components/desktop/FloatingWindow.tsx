// A reader window (blog post, source file). Unlike the canonical panels these
// are transient: they open in front of everything else, cascade so earlier ones
// stay visible behind, and disappear from the taskbar when closed.
//
// The owner passes `windowKey` (a useId() value) so it can also ask the manager
// whether it is the focused window — only the focused reader reacts to q/Esc
// and the scrolling keys.
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { StatusStrip, WindowBody, WindowFrame } from "../styles/Chrome.styled";
import WindowTitleBar from "./WindowTitleBar";
import { useWindows } from "./windowManager";

const CASCADE_STEP = 26;
const CASCADE_COUNT = 4;

const Frame = styled(WindowFrame)<{ $z: number; $offset: number }>`
  position: absolute;
  pointer-events: auto;
  z-index: ${({ $z }) => $z};
  left: calc(4% + ${({ $offset }) => $offset}px);
  top: calc(3% + ${({ $offset }) => $offset}px);
  width: min(900px, 80%);
  height: min(760px, 82%);
  max-height: calc(96% - ${({ $offset }) => $offset}px);
  outline: none;

  @media (max-width: 900px) {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    max-height: none;
  }
`;

type Props = {
  windowKey: string;
  title: string;
  icon?: string;
  onClose: () => void;
  status?: React.ReactNode;
  children: React.ReactNode;
};

const FloatingWindow: React.FC<Props> = ({
  windowKey,
  title,
  icon = "📄",
  onClose,
  status,
  children,
}) => {
  const { register, unregister, allocZ, active, setActive } = useWindows();
  const [initialZ] = useState(() => allocZ());
  const [z, setZ] = useState(initialZ);
  const frameRef = useRef<HTMLElement>(null);

  const raise = () => {
    setZ(allocZ());
    setActive(windowKey);
  };

  // The taskbar entry holds callbacks; keep them pointing at the latest render
  // so re-registering on every render is unnecessary.
  const raiseRef = useRef(raise);
  const closeRef = useRef(onClose);
  raiseRef.current = raise;
  closeRef.current = onClose;

  useEffect(() => {
    register({
      key: windowKey,
      title,
      icon,
      raise: () => raiseRef.current(),
      close: () => closeRef.current(),
    });
  }, [windowKey, title, icon, register]);

  useEffect(() => {
    setActive(windowKey);
    frameRef.current?.focus();
    return () => unregister(windowKey);
  }, [windowKey, setActive, unregister]);

  const layer = document.getElementById("window-layer") ?? document.body;

  return ReactDOM.createPortal(
    <Frame
      ref={frameRef}
      tabIndex={-1}
      $z={z}
      $offset={(initialZ % CASCADE_COUNT) * CASCADE_STEP}
      aria-labelledby={`window-title-${windowKey}`}
      onMouseDown={raise}
    >
      <WindowTitleBar
        titleId={`window-title-${windowKey}`}
        title={title}
        icon={icon}
        active={active === windowKey}
        onClose={onClose}
      />
      <WindowBody>{children}</WindowBody>
      {status && <StatusStrip>{status}</StatusStrip>}
    </Frame>,
    layer
  );
};

export default FloatingWindow;
