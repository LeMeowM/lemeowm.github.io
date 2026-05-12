import React, { useCallback, useEffect, useRef, useState } from "react";
import { argTab } from "../utils/funcs";
import { commandNames, type CmdEntry } from "../commands/meta";

type Options = {
  cmdHistory: CmdEntry[];
  cwd: string[];
  clearHistory: () => void;
  setRerender: (val: boolean) => void;
};

export const useTerminalInput = ({
  cmdHistory,
  cwd,
  clearHistory,
  setRerender,
}: Options) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputVal, setInputVal] = useState("");
  const [hints, setHints] = useState<string[]>([]);
  const [hintCursor, setHintCursor] = useState(-1);
  const [pointer, setPointer] = useState(-1);

  // Focus input whenever anything on the page is clicked
  useEffect(() => {
    const focusInput = () => inputRef.current?.focus();
    document.addEventListener("click", focusInput);
    return () => document.removeEventListener("click", focusInput);
  }, []);

  // Keep input focused after value or pointer changes
  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 1);
    return () => clearTimeout(timer);
  }, [inputVal, pointer]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setRerender(false);
      setInputVal(e.target.value);
      setHints([]);
      setHintCursor(-1);
    },
    [setRerender]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setRerender(false);
    const ctrlI = e.ctrlKey && e.key.toLowerCase() === "i";
    const ctrlL = e.ctrlKey && e.key.toLowerCase() === "l";

    if (e.key === "Tab" || ctrlI) {
      e.preventDefault();
      if (!inputVal) return;

      if (hints.length > 0) {
        // Cycle through already-displayed hints
        const next = (hintCursor + 1) % hints.length;
        setHintCursor(next);
        const parts = inputVal.split(" ");
        setInputVal(
          parts.length > 1 ? `${parts[0]} ${hints[next]}` : hints[next]
        );
        return;
      }

      let hintsCmds: string[] = [];
      commandNames.forEach(name => {
        if (name.startsWith(inputVal)) hintsCmds = [...hintsCmds, name];
      });

      const returnedHints = argTab(
        inputVal,
        setInputVal,
        setHints,
        hintsCmds,
        cwd
      );
      hintsCmds = returnedHints ? [...hintsCmds, ...returnedHints] : hintsCmds;

      if (hintsCmds.length > 1) {
        setHints(hintsCmds);
        setHintCursor(0);
        const parts = inputVal.split(" ");
        setInputVal(
          parts.length > 1 ? `${parts[0]} ${hintsCmds[0]}` : hintsCmds[0]
        );
      } else if (hintsCmds.length === 1) {
        const parts = inputVal.split(" ");
        setInputVal(
          parts.length !== 1
            ? `${parts[0]} ${parts[1]} ${hintsCmds[0]}`
            : hintsCmds[0]
        );
        setHints([]);
        setHintCursor(-1);
      }
    }

    if (ctrlL) {
      clearHistory();
      setHints([]);
      setHintCursor(-1);
    }

    if (e.key === "ArrowUp") {
      if (pointer + 1 >= cmdHistory.length) return;
      setInputVal(cmdHistory[pointer + 1].cmd);
      setPointer(p => p + 1);
    }

    if (e.key === "ArrowDown") {
      if (pointer < 0) return;
      if (pointer === 0) {
        setInputVal("");
        setPointer(-1);
        return;
      }
      setInputVal(cmdHistory[pointer - 1].cmd);
      setPointer(p => p - 1);
    }
  };

  const resetInput = () => {
    setInputVal("");
    setHints([]);
    setHintCursor(-1);
    setPointer(-1);
  };

  return { inputRef, inputVal, hints, handleChange, handleKeyDown, resetInput };
};
