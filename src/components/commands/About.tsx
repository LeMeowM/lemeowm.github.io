import {
  AboutWrapper,
  HighlightAlt,
  HighlightSpan,
} from "../styles/About.styled";

const About: React.FC = () => {
  return (
    <AboutWrapper data-testid="about">
      <p>
        Hi, my name is <HighlightSpan>Hugo Noublanche</HighlightSpan>!
      </p>
      <p>
        I&apos;m a <HighlightAlt>Computer Communication Systems</HighlightAlt>{" "}
        student at EPFL (BSc, expected 2027), ranked 4th of 123 in my program
        with a GPA of 5.5/6.
      </p>
      <p>
        I specialise in software verification, reverse engineering,
        cryptography, and algorithm design.
      </p>
      <p>
        I speak Python, Rust, Java, C, Scala, TypeScript, Lua, and SQL — and
        outside of code, English, French, and Chinese.
      </p>
    </AboutWrapper>
  );
};

export default About;
