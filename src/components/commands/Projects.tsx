import {
  ProjectContainer,
  ProjectDesc,
  ProjectsIntro,
  ProjectTitle,
} from "../styles/Projects.styled";
import { Link } from "../styles/Welcome.styled";
import { projects } from "../../utils/content";
import Panel from "../Panel";

const Projects: React.FC = () => {
  return (
    <Panel title="projects" data-testid="projects">
      <ProjectsIntro>
        Here are some of my projects — use &apos;open &lt;n&gt;&apos; to visit
        one.
      </ProjectsIntro>
      {projects.map(({ id, title, desc, url }) => (
        <ProjectContainer key={id}>
          <ProjectTitle>
            <Link href={url} target="_blank" rel="noopener noreferrer">
              {id}. {title}
            </Link>
          </ProjectTitle>
          <ProjectDesc>{desc}</ProjectDesc>
        </ProjectContainer>
      ))}
    </Panel>
  );
};

export default Projects;
