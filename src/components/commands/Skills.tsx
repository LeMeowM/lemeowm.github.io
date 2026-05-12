// Skill data lives in src/utils/content.ts (languages, domains).
// Edit it there — do not add separate arrays here.
import styled from "styled-components";
import { languages, domains } from "../../utils/content";
import Panel from "../Panel";

const Section = styled.div`
  margin-bottom: 0.75rem;
`;

const SectionTitle = styled.div`
  color: ${({ theme }) => theme.colors?.secondary};
  font-weight: 700;
  margin-bottom: 0.25rem;
`;

const SkillRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  line-height: 1.75rem;
`;

const LangName = styled.span`
  color: ${({ theme }) => theme.colors?.text[100]};
  min-width: 6rem;
`;

const Bar = styled.span`
  color: ${({ theme }) => theme.colors?.primary};
  letter-spacing: -0.05em;
`;

const Level = styled.span`
  color: ${({ theme }) => theme.colors?.text[300]};
  font-size: 0.875rem;
`;

const DomainList = styled.div`
  color: ${({ theme }) => theme.colors?.text[100]};
  line-height: 1.75rem;
`;

const makeBar = (level: number) => "█".repeat(level) + "░".repeat(10 - level);

const Skills: React.FC = () => (
  <Panel title="skills">
    <Section>
      <SectionTitle>languages</SectionTitle>
      {languages.map(({ name, level, label }) => (
        <SkillRow key={name}>
          <LangName>{name}</LangName>
          <Bar>{makeBar(level)}</Bar>
          <Level>{label}</Level>
        </SkillRow>
      ))}
    </Section>
    <Section>
      <SectionTitle>domains</SectionTitle>
      <DomainList>{domains.join(" · ")}</DomainList>
    </Section>
  </Panel>
);

export default Skills;
