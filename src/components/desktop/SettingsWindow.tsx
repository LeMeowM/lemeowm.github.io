// Display Properties — the settings panel.
//
// Appearance drives the exact same theme switcher as `themes set <name>`, so a
// click here and the command are interchangeable. Skill data still comes from
// content/skills.ts; the top-5 derivation lives here in src/, as before.
import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import themes from "@content/themes";
import { languages } from "@content/skills";
import { profile } from "@content/profile";
import { themeContext } from "../../App";
import {
  bevelIn,
  bevelOut,
  chrome,
  GroupBox,
  GroupLegend,
  ListBox,
  ListBoxBody,
  ListItem,
  PushButton,
  StatusCell,
  TabButton,
  TabPanel,
  TabPanelBody,
  TabStrip,
} from "../styles/Chrome.styled";
import ScrollArea from "./ScrollArea";
import Window from "./Window";
import { PANELS } from "./panels";
import { useWindows } from "./windowManager";

const meta = PANELS[2];
const themeNames = Object.keys(themes);

/** Top-N languages for the bar chart, strongest first. */
const topLangs = [...languages].sort((a, b) => b.level - a.level).slice(0, 5);

// BLOCKS intentionally overflows the SkillBar span; the span clips it naturally
// via overflow:hidden + flex:1, filling the full available width.
const BLOCKS = 40;

const Preview = styled.div`
  height: 92px;
  padding: 10px 14px;
  display: flex;
  align-items: flex-start;
  ${bevelIn}
  background: ${({ theme }) => {
    const [top, bottom] = chrome(theme).desktop;
    return `linear-gradient(180deg, ${top} 0%, ${bottom} 100%)`;
  }};
`;

const MiniWindow = styled.div`
  width: 70%;
  padding: 2px;
  background: ${({ theme }) => chrome(theme).face};
  ${bevelOut}
`;

const MiniTitle = styled.div`
  height: 12px;
  display: flex;
  align-items: center;
  padding: 0 3px;
  font-size: 8px;
  font-weight: 700;
  color: ${({ theme }) => chrome(theme).titleText};
  background: ${({ theme }) => {
    const [from, to] = chrome(theme).titleActive;
    return `linear-gradient(90deg, ${from}, ${to})`;
  }};
`;

const MiniBody = styled.div`
  height: 34px;
  margin-top: 2px;
  padding: 2px 4px;
  font-family: "IBM Plex Mono", monospace;
  font-size: 8px;
  color: ${({ theme }) => theme.colors?.primary};
  background: ${({ theme }) => theme.colors?.body};
  ${bevelIn}
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  align-items: stretch;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const Scheme = styled(ListBox)`
  flex: 1;
  max-height: 172px;
  min-height: 96px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 6px;
  padding: 2px 2px 0;
`;

const SkillRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.7rem;
  line-height: 1.6;
  overflow: hidden;
  color: ${({ theme }) => chrome(theme).faceText};
`;

const SkillName = styled.span`
  min-width: 10ch;
  flex-shrink: 0;
  white-space: nowrap;
`;

const SkillBar = styled.span`
  color: ${({ theme }) => chrome(theme).titleActive[0]};
  letter-spacing: -0.02em;
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
`;

const Stats = styled.dl`
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 2px 10px;
  margin: 0;

  dt {
    opacity: 0.75;
  }

  dd {
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

type Tab = "appearance" | "system";

type Props = { themeName: string; className?: string };

const SettingsWindow: React.FC<Props> = ({ themeName, className }) => {
  const [tab, setTab] = useState<Tab>("appearance");
  const switchTheme = useContext(themeContext);
  const { visible, hide } = useWindows();
  // Theme the window was opened with — what Cancel rolls back to.
  const baseline = useRef(themeName);
  const selectedRef = useRef<HTMLButtonElement>(null);

  // Keep the active scheme in view when the list is longer than its box.
  useEffect(() => {
    if (tab === "appearance")
      selectedRef.current?.scrollIntoView({ block: "nearest" });
  }, [tab, themeName]);

  useEffect(() => {
    if (visible.settings) baseline.current = themeName;
    // Only re-baseline when the window is (re)opened.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible.settings]);

  const apply = (name: string) => switchTheme?.(themes[name]);

  return (
    <Window
      id={meta.id}
      title={meta.title}
      icon={meta.icon}
      className={className}
      bodyKind="dialog"
      status={
        <>
          <StatusCell $grow>
            {tab === "appearance"
              ? `${themeNames.length} schemes installed`
              : `${languages.length} languages tracked`}
          </StatusCell>
          <StatusCell>{themeName}</StatusCell>
        </>
      }
    >
      <TabStrip role="tablist">
        <TabButton
          type="button"
          role="tab"
          aria-selected={tab === "appearance"}
          $active={tab === "appearance"}
          onClick={() => setTab("appearance")}
        >
          Appearance
        </TabButton>
        <TabButton
          type="button"
          role="tab"
          aria-selected={tab === "system"}
          $active={tab === "system"}
          onClick={() => setTab("system")}
        >
          System
        </TabButton>
      </TabStrip>

      <TabPanel role="tabpanel">
        <ScrollArea viewportAs={TabPanelBody}>
          {tab === "appearance" ? (
            <>
              <Preview aria-hidden="true">
                <MiniWindow>
                  <MiniTitle>Terminal</MiniTitle>
                  <MiniBody>
                    {profile.user}@{profile.host}:~$ _
                  </MiniBody>
                </MiniWindow>
              </Preview>
              <Row style={{ marginTop: 8 }}>
                <GroupBox>
                  <GroupLegend>Scheme</GroupLegend>
                  <Scheme>
                    <ScrollArea viewportAs={ListBoxBody}>
                      {themeNames.map(name => (
                        <ListItem
                          key={name}
                          type="button"
                          ref={name === themeName ? selectedRef : undefined}
                          $selected={name === themeName}
                          onClick={() => apply(name)}
                        >
                          {name === themeName ? "▸ " : "  "}
                          {name}
                        </ListItem>
                      ))}
                    </ScrollArea>
                  </Scheme>
                </GroupBox>
              </Row>
            </>
          ) : (
            <>
              <GroupBox>
                <GroupLegend>Skills</GroupLegend>
                {topLangs.map(({ name, level }) => {
                  const filled = Math.round((level / 10) * BLOCKS);
                  const bar = "█".repeat(filled) + "░".repeat(BLOCKS - filled);
                  return (
                    <SkillRow key={name}>
                      <SkillName>{name}</SkillName>
                      <SkillBar>{bar}</SkillBar>
                      <span>{level}</span>
                    </SkillRow>
                  );
                })}
              </GroupBox>
              <GroupBox style={{ marginTop: 8 }}>
                <GroupLegend>System</GroupLegend>
                <Stats>
                  <dt>Host</dt>
                  <dd>{profile.host}</dd>
                  <dt>User</dt>
                  <dd>{profile.user}</dd>
                  <dt>Shell</dt>
                  <dd>terminal-portfolio</dd>
                  <dt>Schemes</dt>
                  <dd>{themeNames.length} installed</dd>
                </Stats>
              </GroupBox>
            </>
          )}
        </ScrollArea>
      </TabPanel>

      <ButtonRow>
        <PushButton type="button" onClick={() => hide("settings")}>
          OK
        </PushButton>
        <PushButton
          type="button"
          onClick={() => {
            apply(baseline.current);
            hide("settings");
          }}
        >
          Cancel
        </PushButton>
      </ButtonRow>
    </Window>
  );
};

export default SettingsWindow;
