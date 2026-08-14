// Job data lives in content/experience.ts.
// Edit it there — do not add a separate array here.
import { jobs } from "@content/experience";
import Panel from "../Panel";
import {
  ItemList,
  ItemRow,
  ItemBody,
  ItemTitle,
  ItemDesc,
  ItemThumb,
} from "../styles/ItemCard.styled";
import { Intro } from "../styles/Output.styled";

const Experience: React.FC = () => {
  return (
    <Panel title="experience" data-testid="experience">
      <Intro>Work experience</Intro>
      {jobs.map(({ title, desc, thumbnail }) => (
        <ItemList key={title}>
          <ItemRow>
            <ItemBody>
              <ItemTitle>{title}</ItemTitle>
              <ItemDesc>{desc}</ItemDesc>
            </ItemBody>
            {thumbnail && <ItemThumb src={thumbnail} alt={title} />}
          </ItemRow>
        </ItemList>
      ))}
    </Panel>
  );
};

export default Experience;
