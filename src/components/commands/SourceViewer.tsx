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

const EXT_TO_LANG: Record<string, string> = {
  py: "python",
  sage: "python",
  rs: "rust",
  c: "c",
  h: "c",
  cpp: "cpp",
  cc: "cpp",
  ts: "typescript",
  tsx: "typescript",
  js: "javascript",
  jsx: "javascript",
  sh: "bash",
  bash: "bash",
  zsh: "bash",
  md: "markdown",
  json: "json",
  toml: "toml",
  yaml: "yaml",
  yml: "yaml",
  go: "go",
  java: "java",
  rb: "ruby",
  php: "php",
  sql: "sql",
};

function detectLang(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  return EXT_TO_LANG[ext] ?? "text";
}

const STEP = 80;

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
    if (!open) return;
    overlayRef.current?.focus();

    const handler = (e: KeyboardEvent) => {
      const el = contentRef.current;
      if (!el) return;
      if (e.key === "q" || e.key === "Escape" || (e.key === "c" && e.ctrlKey)) {
        e.preventDefault();
        handleClose();
        return;
      }
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          el.scrollBy({ top: STEP });
          break;
        case "ArrowUp":
          e.preventDefault();
          el.scrollBy({ top: -STEP });
          break;
        case " ":
        case "PageDown":
          e.preventDefault();
          el.scrollBy({ top: el.clientHeight * 0.85 });
          break;
        case "PageUp":
          e.preventDefault();
          el.scrollBy({ top: -el.clientHeight * 0.85 });
          break;
        case "Home":
          e.preventDefault();
          el.scrollTo({ top: 0 });
          break;
        case "End":
          e.preventDefault();
          el.scrollTo({ top: el.scrollHeight });
          break;
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

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
