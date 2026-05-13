import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FileEmbedHeader, FileEmbedWrapper } from "../styles/BlogReader.styled";
import { detectLang } from "../../utils/code";

type Props = { src: string; lang?: string };

const FileEmbed: React.FC<Props> = ({ src, lang }) => {
  const [code, setCode] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch(src)
      .then(r => r.text())
      .then(setCode)
      .catch(() => setCode("(failed to load)"));
  }, [src]);

  const filename = src.split("/").pop() ?? src;
  const language = lang ?? detectLang(filename);

  return (
    <FileEmbedWrapper>
      <FileEmbedHeader onClick={() => setOpen(o => !o)}>
        <span>
          {open ? "▾" : "▸"} {filename}
        </span>
        <a href={src} download={filename} onClick={e => e.stopPropagation()}>
          ↓ download
        </a>
      </FileEmbedHeader>
      {open &&
        (code === null ? (
          <span style={{ padding: "0.5rem 0.75rem", display: "block" }}>
            loading…
          </span>
        ) : (
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            customStyle={{
              background: "transparent",
              padding: "0.5rem 0.75rem",
              margin: 0,
              fontSize: "0.875rem",
            }}
            wrapLongLines
          >
            {code}
          </SyntaxHighlighter>
        ))}
    </FileEmbedWrapper>
  );
};

export default FileEmbed;
