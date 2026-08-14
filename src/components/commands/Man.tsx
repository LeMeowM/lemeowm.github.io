// The manual pages live in content/man.ts — edit them there.
import { useContext } from "react";
import styled from "styled-components";
import { manPages } from "@content/man";
import { termContext } from "../Terminal";
import { UsageDiv } from "../styles/Output.styled";

const ManWrapper = styled.div`
  margin-top: 0.25rem;
  margin-bottom: 0.75rem;
  line-height: 1.75rem;
`;

const Section = styled.div`
  font-weight: 700;
  margin-top: 0.75rem;
  color: ${({ theme }) => theme.colors?.primary};
`;

const Indent = styled.div`
  padding-left: 1.5rem;
  color: ${({ theme }) => theme.colors?.text[100]};
`;

const Muted = styled.span`
  color: ${({ theme }) => theme.colors?.text[200]};
`;

const Man: React.FC = () => {
  const { arg } = useContext(termContext);
  const cmd = arg[0];

  if (!cmd) {
    return (
      <UsageDiv>
        Usage: man &lt;command&gt;
        <br />
        eg: man ls
      </UsageDiv>
    );
  }

  const page = manPages[cmd];
  if (!page) {
    return (
      <ManWrapper>
        No manual entry for <strong>{cmd}</strong>. Type &apos;help&apos; for a
        list of commands.
      </ManWrapper>
    );
  }

  return (
    <ManWrapper>
      <Section>NAME</Section>
      <Indent>
        {cmd} &mdash; {page.description.split(".")[0].toLowerCase()}.
      </Indent>

      <Section>SYNOPSIS</Section>
      <Indent>{page.synopsis}</Indent>

      <Section>DESCRIPTION</Section>
      <Indent>{page.description}</Indent>

      <Section>EXAMPLES</Section>
      {page.examples.map(ex => (
        <Indent key={ex}>
          <Muted>$ </Muted>
          {ex}
        </Indent>
      ))}
    </ManWrapper>
  );
};

export default Man;
