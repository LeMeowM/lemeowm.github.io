import styled from "styled-components";
import { tips } from "../../utils/content";

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

const Motd: React.FC = () => {
  const tip = tips[new Date().getDate() % tips.length];
  return (
    <MotdWrapper>
      <Label>tip</Label>: <Message>{tip}</Message>
    </MotdWrapper>
  );
};

export default Motd;
