import styled from "styled-components";
import { grooveIn } from "./Chrome.styled";

/** Win2k group box: a sunken groove with the title notched into its top edge. */
export const PanelWrapper = styled.div`
  position: relative;
  padding: 0.9rem 1rem 0.75rem;
  margin-top: 0.9rem;
  margin-bottom: 0.5rem;
  width: fit-content;
  max-width: 100%;
  ${grooveIn}
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
