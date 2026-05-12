import styled from "styled-components";

export const StatusBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem 1.25rem;
  background: ${({ theme }) => theme.colors?.primary};
  color: ${({ theme }) => theme.colors?.body};
  font-size: 0.8rem;
  flex-shrink: 0;
  user-select: none;
`;

export const StatusLeft = styled.span`
  opacity: 0.85;
  min-width: 8rem;
`;

export const StatusCenter = styled.span`
  opacity: 1;
  font-weight: 700;
`;

export const StatusRight = styled.span`
  opacity: 0.85;
  min-width: 8rem;
  text-align: right;
`;
