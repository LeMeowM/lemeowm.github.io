import styled, { css, keyframes } from "styled-components";

const terminalReveal = keyframes`
  from { opacity: 0; transform: translateY(3px); }
  to   { opacity: 1; transform: translateY(0);   }
`;

export const OutputContainer = styled.div<{ $isLatest?: boolean }>`
  padding-bottom: 0.25rem;
  ${({ $isLatest }) =>
    $isLatest &&
    css`
      animation: ${terminalReveal} 0.12s ease-out both;
    `}
`;

export const Wrapper = styled.div`
  margin-top: 0.25rem;
  margin-bottom: 0.75rem;
`;

export const UsageDiv = styled.div<{ marginY?: boolean }>`
  margin-top: ${props => (props.marginY ? "0.75rem" : "0.25rem")};
  margin-bottom: 0.75rem;
  line-height: 1.5rem;
`;
