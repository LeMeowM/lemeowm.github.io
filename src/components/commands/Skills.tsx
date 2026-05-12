import styled from "styled-components";
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

const languages = [
  { name: "Python", level: 9, label: "Advanced" },
  { name: "Rust", level: 8, label: "Advanced" },
  { name: "C", level: 7, label: "Proficient" },
  { name: "TypeScript", level: 7, label: "Proficient" },
  { name: "Scala", level: 6, label: "Intermediate" },
  { name: "Java", level: 6, label: "Intermediate" },
  { name: "Lua", level: 5, label: "Familiar" },
  { name: "SQL", level: 4, label: "Familiar" },
];

const domains = [
  "Reverse Engineering",
  "Cryptography",
  "Systems Programming",
  "Formal Verification",
];

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
