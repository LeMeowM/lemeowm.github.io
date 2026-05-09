import { EduIntro, EduList } from "../styles/Education.styled";
import { Wrapper } from "../styles/Output.styled";

const Experience: React.FC = () => {
  return (
    <Wrapper data-testid="experience">
      <EduIntro>Work experience</EduIntro>
      {jobs.map(({ title, desc }) => (
        <EduList key={title}>
          <div className="title">{title}</div>
          <div className="desc">{desc}</div>
        </EduList>
      ))}
    </Wrapper>
  );
};

const jobs = [
  {
    title: "Flight Software Testing Engineer — EPFL Spacecraft Team",
    desc: "Lausanne, VD | 2024–2025 · Designed a Rust-based topology parser for the nest testing framework; built automated testing harnesses for UHF and X-Band comms modules; Lead UX Design Engineer for developer tooling. Supported CHESS-Pathfinder 1 & 2 missions (launch late 2026).",
  },
  {
    title: "Teaching Assistant — EPFL (Mechanics; AICC II)",
    desc: "Lausanne, VD | 2025 · Mentored 12 first-year students, refined lecture materials, and delivered problem-solving sessions in classical mechanics and electrostatics.",
  },
  {
    title: "LakeCTF Author & Event Organiser — polygl0ts",
    desc: "Lausanne, VD | 2025–2026 · Authored 5 challenges for LakeCTF 2025 Qualifications and 2 for Finals, focusing on cryptography. Organised finals challenge submissions.",
  },
];

export default Experience;
