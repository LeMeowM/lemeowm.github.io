import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 1.25rem;
  padding-top: 0.75rem;

  display: flex;
  flex-direction: column-reverse;
  height: 100%;
  overflow-y: auto;
`;

export const CmdNotFound = styled.div`
  margin-top: 0.25rem;
  margin-bottom: 1rem;
`;

export const Empty = styled.div`
  margin-bottom: 0.25rem;
`;

export const MobileSpan = styled.span`
  line-height: 1.5rem;
  margin-right: 0.75rem;

  @media (min-width: 550px) {
    display: none;
  }
`;

export const MobileBr = styled.br`
  @media (min-width: 550px) {
    display: none;
  }
`;

export const Form = styled.form`
  @media (min-width: 550px) {
    display: flex;
  }
`;

export const InputWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

export const Input = styled.input<{ $shrink: boolean }>`
  padding: 0;
  ${({ $shrink }) => ($shrink ? "min-width: 1ch;" : "flex-grow: 1;")}

  &::placeholder {
    color: ${({ theme }) => theme.colors?.text[300]};
    opacity: 0.6;
  }
`;

export const GhostSuffix = styled.span`
  color: ${({ theme }) => theme.colors?.text[300] ?? "#888"};
  opacity: 0.45;
  white-space: pre;
  pointer-events: none;

  @media (max-width: 550px) {
    pointer-events: auto;
    cursor: pointer;
  }
`;

export const Hints = styled.span`
  margin-right: 0.875rem;
`;
