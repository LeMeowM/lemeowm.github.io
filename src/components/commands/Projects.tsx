import styled from "styled-components";
import { projects } from "../../utils/content";
import Panel from "../Panel";
import {
  ItemList,
  ItemRow,
  ItemBody,
  ItemNum,
  ItemTitleLink,
  ItemDesc,
  ItemHint,
  ItemThumb,
} from "../styles/ItemCard.styled";

const Intro = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  line-height: 1.5rem;
`;

const Projects: React.FC = () => {
  return (
    <Panel title="projects" data-testid="projects">
      <Intro>
        Here are some of my projects — use &apos;open &lt;n&gt;&apos; to visit
        one.
      </Intro>
      {projects.map(({ id, title, desc, url, thumbnail }) => (
        <ItemList key={id}>
          <ItemRow>
            <ItemBody>
              <div>
                <ItemNum>{id}.</ItemNum>{" "}
                <ItemTitleLink
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {title}
                </ItemTitleLink>
              </div>
              <ItemDesc>{desc}</ItemDesc>
              <ItemHint>open {id}</ItemHint>
            </ItemBody>
            {thumbnail && <ItemThumb src={thumbnail} alt={title} />}
          </ItemRow>
        </ItemList>
      ))}
    </Panel>
  );
};

export default Projects;
