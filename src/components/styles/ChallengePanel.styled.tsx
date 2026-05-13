import styled from "styled-components";

export const ChalPanel = styled.div`
  border: 1px solid ${({ theme }) => theme.colors?.primary};
  box-shadow: 0 0 0 2px ${({ theme }) => theme.colors?.body},
    0 0 0 3px ${({ theme }) => theme.colors?.primary};
  margin: 0.75rem 0.25rem;
  font-size: 0.875rem;
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
