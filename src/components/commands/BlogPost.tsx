// BlogPost renders a full-screen overlay (via React portal) for reading a blog post.
//
// FileEmbed — triggered by a code fence with a src= meta attribute in markdown:
//   ```python src=/files/lakectf-2025/chall.py
//   ```
//   The component fetches the file from the public/files/ URL, renders it with
//   syntax highlighting, and shows a download link. The embed starts collapsed.
//
// ChallengePanel — triggered by a `ctf` language fence whose body is JSON:
//   ```ctf
//   { "name": "...", "points": 422, "tags": ["crypto"], ... }
//   ```
//   Renders a read-only CTFd-style challenge panel inline in the post.
//
// CodeBlock — custom ReactMarkdown code renderer. Dispatches to FileEmbed,
//   ChallengePanel, or the default SyntaxHighlighter depending on fence attrs.
import { useEffect, useRef, useState } from "react";
import { useReaderKeyboard } from "../../hooks/useReaderKeyboard";
import ReactDOM from "react-dom";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import styled from "styled-components";
import { blogPosts } from "../../utils/blog";
import {
  Content,
  Overlay,
  ReaderStatusBar,
  Tag,
  TagRow,
  TitleBar,
  TitleDate,
} from "../styles/BlogReader.styled";
import ChallengePanel, { type ChallengeData } from "./ChallengePanel";
import { ChalBody, ChalPanel } from "../styles/ChallengePanel.styled";
import FileEmbed from "./FileEmbed";

const Breadcrumb = styled.div`
  color: ${({ theme }) => theme.colors?.text[300]};
  margin: 0.25rem 0 0.75rem;
  font-size: 0.875rem;
`;

const ErrorMsg = styled.div`
  margin-top: 0.25rem;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.colors?.secondary};
`;

const CodeBlock = ({
  className,
  children,
  node,
}: {
  className?: string;
  children?: React.ReactNode;
  node?: { data?: { meta?: string } };
}) => {
  const lang = /language-(\w+)/.exec(className ?? "")?.[1] ?? "text";
  const meta = node?.data?.meta ?? "";
  const srcMatch = /src=(\S+)/.exec(meta);

  if (srcMatch) return <FileEmbed src={srcMatch[1]} lang={lang} />;

  if (lang === "ctf") {
    try {
      const data = JSON.parse(
        String(children).replace(/\n$/, "")
      ) as ChallengeData;
      return <ChallengePanel data={data} />;
    } catch {
      return (
        <ChalPanel>
          <ChalBody>Invalid challenge JSON</ChalBody>
        </ChalPanel>
      );
    }
  }

  return (
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
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  );
};

type Props = { slug: string };

const BlogPost: React.FC<Props> = ({ slug }) => {
  const [open, setOpen] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const post = blogPosts.find(p => p.slug === slug);

  const handleClose = () => {
    setOpen(false);
    document.getElementById("terminal-input")?.focus();
  };

  useEffect(() => {
    if (open) overlayRef.current?.focus();
  }, [open]);

  useReaderKeyboard(contentRef, handleClose, open);

  if (!post) return <ErrorMsg>{slug}: post not found</ErrorMsg>;

  return (
    <>
      <Breadcrumb>
        {open ? "→ reading:" : "read:"} {post.title}
      </Breadcrumb>
      {open &&
        ReactDOM.createPortal(
          <Overlay
            ref={overlayRef}
            tabIndex={-1}
            onClick={e => e.stopPropagation()}
          >
            <TitleBar>
              <span>─ {post.title} ─</span>
              <TitleDate>{post.date}</TitleDate>
            </TitleBar>
            <Content ref={contentRef}>
              {post.tags.length > 0 && (
                <TagRow>
                  {post.tags.map(t => (
                    <Tag key={t}>[{t}]</Tag>
                  ))}
                </TagRow>
              )}
              <ReactMarkdown components={{ code: CodeBlock as any }}>
                {post.body}
              </ReactMarkdown>
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

export default BlogPost;
