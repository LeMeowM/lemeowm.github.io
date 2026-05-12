import styled from "styled-components";
import { eduBg } from "../../utils/content";
import Panel from "../Panel";
import { Intro } from "../styles/Output.styled";

const EduList = styled.div`
  margin-bottom: 1rem;

  .title {
    font-weight: 700;
    margin-bottom: 0.275rem;
  }

  .desc {
    color: ${({ theme }) => theme.colors?.text[200]};
  }
`;

const Education: React.FC = () => {
  return (
    <Panel title="education" data-testid="education">
      <Intro>Education</Intro>
      {eduBg.map(({ title, desc }) => (
        <EduList key={title}>
          <div className="title">{title}</div>
          <div className="desc">{desc}</div>
        </EduList>
      ))}
    </Panel>
  );
};

export default Education;
