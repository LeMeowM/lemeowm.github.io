import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import styled from "styled-components";
import {
  Content,
  Overlay,
  ReaderStatusBar,
  TitleBar,
} from "../styles/BlogReader.styled";
import { detectLang } from "../../utils/code";
import { useReaderKeyboard } from "../../hooks/useReaderKeyboard";

const Breadcrumb = styled.div`
  color: ${({ theme }) => theme.colors?.text[300]};
  margin: 0.25rem 0 0.75rem;
  font-size: 0.875rem;
`;

const DownloadLink = styled.a`
  color: ${({ theme }) => theme.colors?.secondary};
  text-decoration: none;
  font-weight: 400;
  font-size: 0.875rem;
  &:hover {
    text-decoration: underline;
  }
`;

type Props = { path: string; filename: string };

const SourceViewer: React.FC<Props> = ({ path, filename }) => {
  const [open, setOpen] = useState(true);
  const [code, setCode] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lang = detectLang(filename);

  useEffect(() => {
    fetch(path)
      .then(r => r.text())
      .then(setCode)
      .catch(() => setCode("(failed to load file)"));
  }, [path]);

  const handleClose = () => {
    setOpen(false);
    document.getElementById("terminal-input")?.focus();
  };

  useEffect(() => {
    if (open) overlayRef.current?.focus();
  }, [open]);

  useReaderKeyboard(contentRef, handleClose, open);

  return (
    <>
      <Breadcrumb>
        {open ? "→ viewing:" : "viewed:"} {filename}
      </Breadcrumb>
      {open &&
        ReactDOM.createPortal(
          <Overlay
            ref={overlayRef}
            tabIndex={-1}
            onClick={e => e.stopPropagation()}
          >
            <TitleBar>
              <span>─ {filename} ─</span>
              <DownloadLink href={path} download={filename}>
                ↓ download
              </DownloadLink>
            </TitleBar>
            <Content ref={contentRef}>
              {code === null ? (
                <span>loading…</span>
              ) : (
                <SyntaxHighlighter
                  language={lang}
                  style={vscDarkPlus}
                  customStyle={{
                    background: "transparent",
                    padding: 0,
                    margin: 0,
                    fontSize: "0.875rem",
                  }}
                  wrapLongLines
                >
                  {code}
                </SyntaxHighlighter>
              )}
            </Content>
            <ReaderStatusBar>
              <span>q/Esc Quit</span>
              <span>↑↓ Scroll</span>
              <span>Space/PgDn Page↓</span>
              <span>PgUp Page↑</span>
              <span>Home/End Top/Bottom</span>
            </ReaderStatusBar>
          </Overlay>,
          document.body
        )}
    </>
  );
};

export default SourceViewer;
