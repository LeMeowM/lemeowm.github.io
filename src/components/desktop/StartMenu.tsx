// The Start menu. Absorbs what used to be the top banner and the footer:
// the identity strip (content/profile.ts), the shortcut buttons and the
// external links (content/navigation.ts). Shortcuts type their command into the
// terminal exactly as the old banner buttons did — no new command syntax.
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { footerLinks, navItems } from "@content/navigation";
import { profile } from "@content/profile";
import { bevelOut, CHROME_FONT, chrome } from "../styles/Chrome.styled";
import { PANEL_LIST } from "./panels";
import { useWindows } from "./windowManager";

const Menu = styled.div`
  position: absolute;
  bottom: calc(100% + 2px);
  left: 0;
  z-index: 60;
  display: flex;
  min-width: 240px;
  padding: 3px;
  background: ${({ theme }) => chrome(theme).face};
  color: ${({ theme }) => chrome(theme).faceText};
  font-family: ${CHROME_FONT};
  ${bevelOut}
`;

const Gutter = styled.div`
  width: 26px;
  flex-shrink: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 8px;
  background: ${({ theme }) => {
    const [from, to] = chrome(theme).titleActive;
    return `linear-gradient(0deg, ${to} 0%, ${from} 100%)`;
  }};

  span {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: ${({ theme }) => chrome(theme).titleText};
    text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.35);
    user-select: none;
  }
`;

const Items = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  padding: 2px 0;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.75rem 0.5rem;
  font-size: 11px;

  img {
    width: 24px;
    height: 24px;
    object-fit: cover;
  }

  b {
    color: ${({ theme }) => chrome(theme).faceText};
  }
`;

const Item = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.3rem 0.9rem;
  border: 0;
  cursor: pointer;
  text-align: left;
  text-decoration: none;
  background: transparent;
  color: ${({ theme }) => chrome(theme).faceText};
  font-family: ${CHROME_FONT};
  font-size: 12px;

  &:hover,
  &:focus-visible {
    outline: none;
    background: ${({ theme }) => chrome(theme).titleActive[0]};
    color: ${({ theme }) => chrome(theme).titleText};
  }
`;

const LinkItem = Item.withComponent("a");

const Divider = styled.div`
  height: 0;
  margin: 3px 6px;
  border-top: 1px solid ${({ theme }) => chrome(theme).faceShadow};
  border-bottom: 1px solid ${({ theme }) => chrome(theme).faceHighlight};
`;

const Section = styled.div`
  padding: 0.2rem 0.9rem 0.1rem;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.7;
  user-select: none;
`;

type Props = {
  onCommand: (cmd: string) => void;
  onClose: () => void;
};

const StartMenu: React.FC<Props> = ({ onCommand, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { visible, show, hide, togglePanel } = useWindows();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) onClose();
    };
    document.addEventListener("keydown", onKey);
    // Deferred so the click that opened the menu does not immediately close it.
    const id = window.setTimeout(
      () => document.addEventListener("mousedown", onDown),
      0
    );
    return () => {
      window.clearTimeout(id);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [onClose]);

  const run = (cmd: string) => {
    show("terminal");
    onCommand(cmd);
    onClose();
  };

  return (
    <Menu ref={ref} role="menu" aria-label="Start menu">
      <Gutter>
        <span>{profile.host}</span>
      </Gutter>
      <Items>
        <Header>
          <img src={profile.avatar} alt="" />
          <span>
            <b>{profile.name}</b>
            <br />
            {profile.copyright}
          </span>
        </Header>
        <Divider />
        <Section>Run</Section>
        {navItems.map(({ label, cmd }) => (
          <Item key={label} role="menuitem" onClick={() => run(cmd)}>
            <span aria-hidden="true">▸</span> {label}
          </Item>
        ))}
        <Divider />
        <Section>Windows</Section>
        {PANEL_LIST.map(({ id, taskLabel, icon }) => (
          <Item
            key={id}
            role="menuitemcheckbox"
            aria-checked={visible[id]}
            onClick={() => {
              togglePanel(id);
              onClose();
            }}
          >
            <span aria-hidden="true">{visible[id] ? "☑" : "☐"}</span>
            <span aria-hidden="true">{icon}</span> {taskLabel}
          </Item>
        ))}
        <Divider />
        {footerLinks.map(({ label, url, external }) => (
          <LinkItem
            key={url}
            role="menuitem"
            href={url}
            onClick={onClose}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            <span aria-hidden="true">🔗</span> {label}
          </LinkItem>
        ))}
        <Divider />
        <Item
          role="menuitem"
          onClick={() => {
            PANEL_LIST.forEach(p => hide(p.id));
            onClose();
          }}
        >
          <span aria-hidden="true">⏻</span> Shut Down…
        </Item>
      </Items>
    </Menu>
  );
};

export default StartMenu;
