import styled from "styled-components";

export const PanelWrapper = styled.div`
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors?.primary};
  padding: 0.75rem 1rem;
  margin-top: 0.75rem;
  margin-bottom: 0.5rem;
`;

export const PanelTitle = styled.span`
  position: absolute;
  top: -0.65em;
  left: 0.75rem;
  background: ${({ theme }) => theme.colors?.body};
  padding: 0 0.35rem;
  color: ${({ theme }) => theme.colors?.primary};
  font-size: 0.875rem;
  user-select: none;
`;
