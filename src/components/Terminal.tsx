import React, { createContext, useState } from "react";
import Output from "./Output";
import TermInfo from "./TermInfo";
import {
  CmdNotFound,
  Empty,
  Form,
  Hints,
  Input,
  MobileBr,
  MobileSpan,
  Wrapper,
} from "./styles/Terminal.styled";
import { filesystem, resolvePath } from "../utils/filesystem";
import { commandMeta, type CmdEntry } from "../commands/meta";
import { useTerminalInput } from "../hooks/useTerminalInput";
import ErrorBoundary from "./ErrorBoundary";

export type { CmdEntry } from "../commands/meta";

export type Term = {
  arg: string[];
  history: CmdEntry[];
  rerender: boolean;
  index: number;
  cwd: string[];
  clearHistory: () => void;
};

export const termContext = createContext<Term>({
  arg: [],
  history: [],
  rerender: false,
  index: 0,
  cwd: ["~"],
  clearHistory: () => undefined,
});

const Terminal = () => {
  const [cmdHistory, setCmdHistory] = useState<CmdEntry[]>([
    { cmd: "welcome", cwd: ["~"] },
  ]);
  const [cwd, setCwd] = useState<string[]>(["~"]);
  const [rerender, setRerender] = useState(false);

  const clearHistory = () => setCmdHistory([]);

  const { inputRef, inputVal, hints, handleChange, handleKeyDown, resetInput } =
    useTerminalInput({ cmdHistory, cwd, clearHistory, setRerender });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = inputVal.trim();
    const parts = trimmed.split(/\s+/).filter(Boolean);

    if (parts[0] === "cd") {
      const newPath = resolvePath(cwd, parts[1], filesystem);
      if (newPath) setCwd(newPath);
    }

    setCmdHistory([{ cmd: trimmed, cwd: [...cwd] }, ...cmdHistory]);
    setRerender(true);
    resetInput();
  };

  return (
    <Wrapper data-testid="terminal-wrapper">
      {hints.length > 1 && (
        <div>
          {hints.map(hCmd => (
            <Hints key={hCmd}>{hCmd}</Hints>
          ))}
        </div>
      )}
      <Form onSubmit={handleSubmit}>
        <label htmlFor="terminal-input">
          <TermInfo cwd={cwd} /> <MobileBr />
          <MobileSpan>&#62;</MobileSpan>
        </label>
        <Input
          title="terminal-input"
          type="text"
          id="terminal-input"
          autoComplete="off"
          spellCheck="false"
          autoFocus
          autoCapitalize="off"
          ref={inputRef}
          value={inputVal}
          placeholder={inputVal ? "" : "try: ls"}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
        />
      </Form>

      {cmdHistory.map(({ cmd: cmdH, cwd: entryCwd }, index) => {
        const commandArray = cmdH.trim().split(" ");
        const registryEntry = commandMeta.find(c => c.name === commandArray[0]);
        const isWelcome = commandArray[0] === "welcome";
        const contextValue: Term = {
          arg: commandArray.slice(1),
          history: cmdHistory,
          rerender,
          index,
          cwd: entryCwd,
          clearHistory,
        };
        return (
          <div key={`${cmdH}_${index}`}>
            {!isWelcome && (
              <div>
                <TermInfo cwd={entryCwd} />
                <MobileBr />
                <MobileSpan>&#62;</MobileSpan>
                <span data-testid="input-command">{cmdH}</span>
              </div>
            )}
            {registryEntry ? (
              <ErrorBoundary key={index} cmd={commandArray[0]}>
                <termContext.Provider value={contextValue}>
                  <Output index={index} cmd={commandArray[0]} />
                </termContext.Provider>
              </ErrorBoundary>
            ) : cmdH === "" ? (
              <Empty />
            ) : (
              <CmdNotFound data-testid={`not-found-${index}`}>
                {cmdH}: command not found. Type &apos;help&apos; for a list of
                commands.
              </CmdNotFound>
            )}
          </div>
        );
      })}
    </Wrapper>
  );
};

export default Terminal;
