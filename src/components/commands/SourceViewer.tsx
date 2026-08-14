import { useEffect, useId, useRef, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import styled from "styled-components";
import { Content } from "../styles/BlogReader.styled";
import { StatusCell } from "../styles/Chrome.styled";
import { detectLang } from "../../utils/code";
import { useReaderKeyboard } from "../../hooks/useReaderKeyboard";
import FloatingWindow from "../desktop/FloatingWindow";
import ScrollArea from "../desktop/ScrollArea";
import { useWindows } from "../desktop/windowManager";

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
  const contentRef = useRef<HTMLDivElement>(null);
  const windowKey = useId();
  const { active } = useWindows();
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

  // Only the focused reader window reacts to q/Esc and the scroll keys.
  useReaderKeyboard(contentRef, handleClose, open && active === windowKey);

  return (
    <>
      <Breadcrumb>
        {open ? "→ viewing:" : "viewed:"} {filename}
      </Breadcrumb>
      {open && (
        <FloatingWindow
          windowKey={windowKey}
          title={filename}
          icon="📃"
          onClose={handleClose}
          status={
            <>
              <StatusCell $grow>
                q/Esc Quit · ↑↓ Scroll · Space Page↓
              </StatusCell>
              <StatusCell>
                <DownloadLink href={path} download={filename}>
                  ↓ download
                </DownloadLink>
              </StatusCell>
            </>
          }
        >
          <ScrollArea viewportAs={Content} viewportRef={contentRef}>
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
          </ScrollArea>
        </FloatingWindow>
      )}
    </>
  );
};

export default SourceViewer;
