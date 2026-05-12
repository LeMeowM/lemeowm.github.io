import { useEffect } from "react";

const STEP = 80;

export const useReaderKeyboard = (
  containerRef: React.RefObject<HTMLElement>,
  onClose: () => void,
  isOpen: boolean
) => {
  useEffect(() => {
    if (!isOpen) return;
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "q" || e.key === "Escape" || (e.key === "c" && e.ctrlKey)) {
        e.preventDefault();
        onClose();
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
  }, [containerRef, onClose, isOpen]);
};
