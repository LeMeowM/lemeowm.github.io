import { useEffect, useRef, useState } from "react";
import {
  DEFAULT_OPTIONS,
  imageToAsciiFrame,
  type AsciiCell,
} from "asciify-engine";
import styled from "styled-components";

type Run = { color: string; text: string };

function frameToRuns(frame: AsciiCell[][]): Run[][] {
  return frame.map(row => {
    const runs: Run[] = [];
    for (const cell of row) {
      const color =
        cell.a < 30 ? "transparent" : `rgb(${cell.r},${cell.g},${cell.b})`;
      const last = runs[runs.length - 1];
      if (last && last.color === color) {
        last.text += cell.char;
      } else {
        runs.push({ color, text: cell.char });
      }
    }
    return runs;
  });
}

let cachedCharWidth: number | null = null;
function getCharWidth(fontSize: number): number {
  if (cachedCharWidth !== null) return cachedCharWidth * fontSize;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return fontSize * 0.601;
  ctx.font = `${fontSize}px 'IBM Plex Mono', monospace`;
  cachedCharWidth = ctx.measureText("M").width / fontSize;
  return cachedCharWidth * fontSize;
}

const DISPLAY_FONT_SIZE = 14; // px — fixed display size
const ENGINE_FONT_SIZE = 8; // px — sampling resolution per cell

const ASC_OPTS = {
  ...DEFAULT_OPTIONS,
  fontSize: ENGINE_FONT_SIZE,
  charset:
    " .'`^\",;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",
  colorMode: "fullcolor" as const,
  chromaKey: "#cacaca",
  chromaKeyTolerance: 10,
};

const Wrap = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const Pre = styled.pre`
  font-size: ${DISPLAY_FONT_SIZE}px;
  line-height: 1;
  letter-spacing: 0;
  user-select: text;
  cursor: text;
  margin: 0;
`;

const ProfileArt: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [runs, setRuns] = useState<Run[][]>([]);

  const regenerate = (cols: number) => {
    const img = imgRef.current;
    if (!img || cols < 1) return;
    const target = cols * ENGINE_FONT_SIZE;
    const { frame } = imageToAsciiFrame(img, ASC_OPTS, target, target);
    setRuns(frameToRuns(frame));
  };

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      if (!wrapRef.current) return;
      const cols = Math.floor(
        wrapRef.current.clientWidth / getCharWidth(DISPLAY_FONT_SIZE)
      );
      regenerate(cols);
    };
    img.src = "/Profile.webp";
  }, []);

  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver(() => {
      const cols = Math.floor(
        wrapRef.current!.clientWidth / getCharWidth(DISPLAY_FONT_SIZE)
      );
      regenerate(cols);
    });
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <Wrap ref={wrapRef}>
      <Pre>
        {runs.map((row, ri) => (
          <span key={ri} style={{ display: "block" }}>
            {row.map((run, ci) => (
              <span key={ci} style={{ color: run.color }}>
                {run.text}
              </span>
            ))}
          </span>
        ))}
      </Pre>
    </Wrap>
  );
};

export default ProfileArt;
