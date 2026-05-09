import { EduIntro, EduList } from "../styles/Education.styled";
import { Wrapper } from "../styles/Output.styled";

const Education: React.FC = () => {
  return (
    <Wrapper data-testid="education">
      <EduIntro>Education</EduIntro>
      {eduBg.map(({ title, desc }) => (
        <EduList key={title}>
          <div className="title">{title}</div>
          <div className="desc">{desc}</div>
        </EduList>
      ))}
    </Wrapper>
  );
};

const eduBg = [
  {
    title: "BSc Computer Communication Systems — EPFL",
    desc: "Écublens, VD | Expected 2027 · GPA 5.5/6 · Ranked 4th of 123 in program (22nd of 355 in IC Faculty)",
  },
  {
    title: "Coursework",
    desc: "Software architecture, machine learning, digital systems design",
  },
];

export default Education;
