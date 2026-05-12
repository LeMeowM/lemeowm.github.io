import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  background: ${({ theme }) => theme.colors?.body};
  display: flex;
  flex-direction: column;
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors?.text[100]};
  outline: none;
`;

export const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors?.primary};
  color: ${({ theme }) => theme.colors?.primary};
  font-weight: 700;
  flex-shrink: 0;
  user-select: none;
`;

export const TitleDate = styled.span`
  color: ${({ theme }) => theme.colors?.text[300]};
  font-weight: 400;
`;

export const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.25rem 2rem;
  max-width: 94ch;
  margin: 0 auto;
  width: 100%;
  line-height: 1.75rem;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors?.scrollHandle};
  }

  h1,
  h2,
  h3 {
    color: ${({ theme }) => theme.colors?.secondary};
    font-size: 1rem;
    margin: 1rem 0 0.25rem;
  }

  p {
    margin: 0.25rem 0 0.5rem;
  }

  code {
    background: ${({ theme }) => theme.colors?.scrollHandle};
    padding: 0.1em 0.3em;
    border-radius: 2px;
    color: ${({ theme }) => theme.colors?.primary};
  }

  pre {
    background: ${({ theme }) => theme.colors?.scrollHandle};
    padding: 0.5rem 0.75rem;
    margin: 0.5rem 0;
    overflow-x: auto;

    code {
      background: none;
      padding: 0;
    }
  }

  ul,
  ol {
    padding-left: 1.5rem;
    margin: 0.25rem 0;
  }

  a {
    color: ${({ theme }) => theme.colors?.primary};
    text-decoration: underline dashed;

    &:hover {
      color: ${({ theme }) => theme.colors?.secondary};
    }
  }

  strong {
    color: ${({ theme }) => theme.colors?.text[100]};
    font-weight: 700;
  }

  blockquote {
    border-left: 2px solid ${({ theme }) => theme.colors?.primary};
    padding-left: 0.75rem;
    color: ${({ theme }) => theme.colors?.text[200]};
    margin: 0.5rem 0;
  }
`;

export const TagRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

export const Tag = styled.span`
  color: ${({ theme }) => theme.colors?.secondary};
  font-size: 0.8rem;
`;

export const FileEmbedWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors?.primary};
  margin: 0.75rem 0;
  border-radius: 2px;
  overflow: hidden;
`;

export const FileEmbedHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0.75rem;
  background: ${({ theme }) => theme.colors?.scrollHandle};
  color: ${({ theme }) => theme.colors?.primary};
  font-size: 0.8rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors?.primary};
  cursor: pointer;
  user-select: none;

  &:hover {
    background: ${({ theme }) => theme.colors?.scrollHandleHover};
  }

  a {
    color: ${({ theme }) => theme.colors?.secondary};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ReaderStatusBar = styled.div`
  display: flex;
  gap: 2rem;
  padding: 0.4rem 1.25rem;
  background: ${({ theme }) => theme.colors?.primary};
  color: ${({ theme }) => theme.colors?.body};
  flex-shrink: 0;
  user-select: none;
  font-size: 0.8rem;
  flex-wrap: wrap;
`;
