import styled from "styled-components";

const MotdWrapper = styled.div`
  margin-top: 0.25rem;
  margin-bottom: 0.75rem;
`;

const Label = styled.span`
  color: ${({ theme }) => theme.colors?.secondary};
  font-weight: 700;
`;

const Message = styled.span`
  color: ${({ theme }) => theme.colors?.text[100]};
`;

const tips = [
  "use Tab to autocomplete commands and paths",
  "use ↑ / ↓ to navigate command history",
  "try 'themes set blue-matrix' for a hacker aesthetic",
  "Ctrl+L clears the terminal",
  "use 'man <cmd>' for detailed command help",
  "use 'skills' to see a breakdown of languages and domains",
  "use 'find -name *.md' to list all blog posts",
  "use 'grep <pattern>' to search blog post content",
  "try 'neofetch' for a system overview",
];

const Motd: React.FC = () => {
  const tip = tips[new Date().getDate() % tips.length];
  return (
    <MotdWrapper>
      <Label>tip</Label>: <Message>{tip}</Message>
    </MotdWrapper>
  );
};

export default Motd;
