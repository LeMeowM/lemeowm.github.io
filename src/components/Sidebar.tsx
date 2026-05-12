import styled from "styled-components";
import ProfileArt from "./commands/ProfileArt";

const langs = [
  { name: "Python", level: 9 },
  { name: "Rust", level: 8 },
  { name: "C", level: 7 },
  { name: "TypeScript", level: 7 },
  { name: "Scala", level: 6 },
];

const BLOCKS = 40; // overflows into flex-1 span, clipped naturally

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const ArtSection = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0.75rem;
`;

const Panel = styled.div`
  flex-shrink: 0;
  border-top: 1px solid ${({ theme }) => theme.colors?.text[300]};
  padding: 0.5rem 0.75rem;
`;

const PanelLabel = styled.div`
  color: ${({ theme }) => theme.colors?.primary};
  font-size: 0.75rem;
  margin-bottom: 0.35rem;
  user-select: none;
`;

const SkillRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  font-size: 0.75rem;
  line-height: 1.6;
  overflow: hidden;
`;

const SkillName = styled.span`
  color: ${({ theme }) => theme.colors?.text[200]};
  width: 6.5ch;
  flex-shrink: 0;
  white-space: nowrap;
`;

const SkillBar = styled.span`
  color: ${({ theme }) => theme.colors?.primary};
  letter-spacing: -0.02em;
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
`;

const SkillNum = styled.span`
  color: ${({ theme }) => theme.colors?.text[300]};
  font-size: 0.7rem;
  flex-shrink: 0;
`;

const Sidebar: React.FC = () => (
  <Wrapper>
    <ArtSection>
      <ProfileArt />
    </ArtSection>

    <Panel>
      <PanelLabel>─ skills ─</PanelLabel>
      {langs.map(({ name, level }) => {
        const filled = Math.round((level / 10) * BLOCKS);
        const bar = "█".repeat(filled) + "░".repeat(BLOCKS - filled);
        return (
          <SkillRow key={name}>
            <SkillName>{name}</SkillName>
            <SkillBar>{bar}</SkillBar>
            <SkillNum>{level}</SkillNum>
          </SkillRow>
        );
      })}
    </Panel>
  </Wrapper>
);

export default Sidebar;
