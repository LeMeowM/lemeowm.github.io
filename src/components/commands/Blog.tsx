import styled from "styled-components";
import { Cmd, CmdDesc, CmdList } from "../styles/Help.styled";
import { blogPosts } from "../../utils/content";
import Panel from "../Panel";

const Hint = styled.div`
  color: ${({ theme }) => theme.colors?.text[300]};
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
`;

const CatHint = styled.span`
  opacity: 0.6;
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
      {blogPosts.map(({ id, slug, title, date }) => (
        <CmdList key={id}>
          <Cmd>{id}.</Cmd>
          &nbsp;
          <CmdDesc>
            {title} &mdash; {date}
            <br />
            <CatHint>cat {slug}.md</CatHint>
          </CmdDesc>
        </CmdList>
      ))}
    </Panel>
  );
};

export default Blog;
