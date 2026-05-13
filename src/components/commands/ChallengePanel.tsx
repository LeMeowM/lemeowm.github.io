import ReactMarkdown from "react-markdown";
import {
  ChalBody,
  ChalDesc,
  ChalFlag,
  ChalHeader,
  ChalMeta,
  ChalName,
  ChalPanel,
  ChalSection,
  ChalTag,
  ChalTagRow,
  ChalUpsolve,
} from "../styles/ChallengePanel.styled";
import FileEmbed from "./FileEmbed";

export type ChallengeData = {
  name: string;
  points: number;
  tags: string[];
  solves: number;
  author: string;
  description: string;
  files?: string[];
  flag?: string;
};

const ChallengePanel: React.FC<{ data: ChallengeData }> = ({ data }) => {
  const { name, points, tags, solves, author, description, files, flag } = data;

  return (
    <ChalPanel>
      <ChalHeader>
        <ChalName>{name}</ChalName>
        <ChalMeta>
          {points} pts · {solves} solves · by {author}
        </ChalMeta>
      </ChalHeader>
      <ChalBody>
        {tags.length > 0 && (
          <ChalTagRow>
            {tags.map(t => (
              <ChalTag key={t}>[{t}]</ChalTag>
            ))}
          </ChalTagRow>
        )}
        <ChalDesc>
          <ReactMarkdown
            allowedElements={["p", "a", "em", "strong", "code", "br", "del"]}
          >
            {description}
          </ReactMarkdown>
        </ChalDesc>
      </ChalBody>
      {files && files.length > 0 && (
        <ChalSection>
          {files.map(f => (
            <FileEmbed key={f} src={f} />
          ))}
        </ChalSection>
      )}
      <ChalSection>
        {flag ? (
          <ChalFlag>✓ {flag}</ChalFlag>
        ) : (
          <ChalUpsolve>↻ upsolved (after CTF ended)</ChalUpsolve>
        )}
      </ChalSection>
    </ChalPanel>
  );
};

export default ChallengePanel;
