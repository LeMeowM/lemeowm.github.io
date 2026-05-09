import { useContext, useEffect } from "react";
import styled from "styled-components";
import { termContext } from "../Terminal";
import { openTargets } from "../../utils/content";
import { pathToString } from "../../utils/filesystem";
import { UsageDiv, Wrapper } from "../styles/Output.styled";

const ErrorMsg = styled.div`
  margin-top: 0.25rem;
  margin-bottom: 0.75rem;
`;

const resolveUrl = (arg: string, cwd: string[]): string | null => {
  if (arg.startsWith("http://") || arg.startsWith("https://")) return arg;

  const dirName = cwd[cwd.length - 1];
  const targets = openTargets[dirName];
  if (targets && targets[arg]) return targets[arg];

  return null;
};

const Open: React.FC = () => {
  const { arg, cwd } = useContext(termContext);

  if (!arg[0]) {
    return (
      <UsageDiv>
        Usage: open &lt;item&gt;
        <br />
        eg: open 1 (opens item 1 in current directory)
      </UsageDiv>
    );
  }

  const url = resolveUrl(arg[0], cwd);

  useEffect(() => {
    if (url) window.open(url, "_blank");
  }, []);

  if (!url) {
    const dir = pathToString(cwd);
    return (
      <ErrorMsg>
        open: &apos;{arg[0]}&apos; not found in {dir}
        <br />
        Try &apos;ls&apos; to see what&apos;s available here.
      </ErrorMsg>
    );
  }

  return <Wrapper>Opening {url} ...</Wrapper>;
};

export default Open;
