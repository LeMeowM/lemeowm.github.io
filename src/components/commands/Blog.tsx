import styled from "styled-components";
import { blogPosts } from "../../utils/content";
import Panel from "../Panel";
import {
  ItemList,
  ItemRow,
  ItemBody,
  ItemNum,
  ItemTitle,
  ItemMeta,
  ItemHint,
  ItemThumb,
} from "../styles/ItemCard.styled";

const Hint = styled.div`
  color: ${({ theme }) => theme.colors?.text[300]};
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
`;

const Blog: React.FC = () => {
  if (blogPosts.length === 0) {
    return (
      <Panel title="blog" data-testid="blog">
        <Hint>No posts yet. Check back soon.</Hint>
      </Panel>
    );
  }

  return (
    <Panel title="blog" data-testid="blog">
      <Hint>use &apos;cat &lt;slug&gt;.md&apos; to read a post</Hint>
      {blogPosts.map(({ id, slug, title, date, thumbnail }) => (
        <ItemList key={id}>
          <ItemRow>
            <ItemBody>
              <div>
                <ItemNum>{id}.</ItemNum> <ItemTitle>{title}</ItemTitle> &mdash;{" "}
                <ItemMeta>{date}</ItemMeta>
              </div>
              <ItemHint>cat {slug}.md</ItemHint>
            </ItemBody>
            {thumbnail && <ItemThumb src={thumbnail} alt={title} />}
          </ItemRow>
        </ItemList>
      ))}
    </Panel>
  );
};

export default Blog;
