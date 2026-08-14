import styled from "styled-components";
import { bevelOut } from "./Chrome.styled";

export const ChalPanel = styled.div`
  margin: 0.75rem 0.25rem;
  padding: 2px;
  font-size: 0.875rem;
  background: ${({ theme }) => theme.colors?.body};
  ${bevelOut}
`;

export const ChalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0.35rem 0.75rem;
  background: ${({ theme }) => theme.colors?.scrollHandle};
  border-bottom: 1px solid ${({ theme }) => theme.colors?.primary};
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const ChalName = styled.span`
  color: ${({ theme }) => theme.colors?.primary};
  font-weight: 700;
`;

export const ChalMeta = styled.span`
  color: ${({ theme }) => theme.colors?.text[300]};
  font-size: 0.8rem;
`;

export const ChalBody = styled.div`
  padding: 0.5rem 0.75rem;
`;

export const ChalTagRow = styled.div`
  display: flex;
  gap: 0.35rem;
  flex-wrap: wrap;
  margin-bottom: 0.35rem;
`;

export const ChalTag = styled.span`
  color: ${({ theme }) => theme.colors?.secondary};
  font-size: 0.8rem;
`;

export const ChalDesc = styled.div`
  color: ${({ theme }) => theme.colors?.text[100]};
  line-height: 1.6rem;

  p {
    margin: 0.2rem 0;
  }
`;

export const ChalSection = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors?.primary};
  padding: 0.35rem 0.75rem;
`;

export const ChalFlag = styled.div`
  color: ${({ theme }) => theme.colors?.primary};
  font-weight: 700;
`;

export const ChalUpsolve = styled.div`
  color: ${({ theme }) => theme.colors?.text[300]};
`;
