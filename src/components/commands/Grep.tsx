import { useContext } from "react";
import styled from "styled-components";
import { termContext } from "../Terminal";
import { blogPosts } from "../../utils/blog";
import { UsageDiv } from "../styles/Output.styled";

const ResultBlock = styled.div`
  margin-bottom: 0.5rem;
`;

const FilePath = styled.div`
  color: ${({ theme }) => theme.colors?.secondary};
  font-weight: 700;
`;

const MatchLine = styled.div`
  color: ${({ theme }) => theme.colors?.text[100]};
  line-height: 1.75rem;
  padding-left: 0.5rem;
`;

const Highlight = styled.mark`
  background: none;
  color: ${({ theme }) => theme.colors?.primary};
  font-weight: 700;
`;

const NoResults = styled.div`
  color: ${({ theme }) => theme.colors?.text[300]};
  margin-top: 0.25rem;
  margin-bottom: 0.75rem;
`;

function highlightMatch(line: string, pattern: string): React.ReactNode {
  const idx = line.toLowerCase().indexOf(pattern.toLowerCase());
  if (idx === -1) return line;
  return (
    <>
      {line.slice(0, idx)}
      <Highlight>{line.slice(idx, idx + pattern.length)}</Highlight>
      {line.slice(idx + pattern.length)}
    </>
  );
}

const Grep: React.FC = () => {
  const { arg } = useContext(termContext);
  const pattern = arg[0];

  if (!pattern) {
    return (
      <UsageDiv>
        Usage: grep &lt;pattern&gt; [file]
        <br />
        eg: grep crypto
      </UsageDiv>
    );
  }

  const slugFilter = arg[1]?.replace(/\.md$/, "");
  const postsToSearch = slugFilter
    ? blogPosts.filter(p => p.slug === slugFilter)
    : blogPosts;

  if (postsToSearch.length === 0) {
    return <NoResults>grep: no blog posts to search</NoResults>;
  }

  const results: { slug: string; lines: string[] }[] = [];

  for (const post of postsToSearch) {
    const lines = post.body
      .split(/\r?\n/)
      .filter(line => line.toLowerCase().includes(pattern.toLowerCase()));
    if (lines.length > 0) {
      results.push({ slug: post.slug, lines });
    }
  }

  if (results.length === 0) {
    return <NoResults>grep: no matches for &quot;{pattern}&quot;</NoResults>;
  }

  return (
    <div>
      {results.map(({ slug, lines }) => (
        <ResultBlock key={slug}>
          <FilePath>~/blog/{slug}.md</FilePath>
          {lines.map((line, i) => (
            <MatchLine key={i}>{highlightMatch(line, pattern)}</MatchLine>
          ))}
        </ResultBlock>
      ))}
    </div>
  );
};

export default Grep;
