import { describe, it, expect, vi } from "vitest";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { render, screen, userEvent } from "../utils/test-utils";
import Terminal from "../components/Terminal";
import { commandMeta } from "../commands/meta";

function setup(jsx: JSX.Element) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

const allCmds = commandMeta.filter(c => !c.hidden).map(c => c.name);
const argCmds = commandMeta.filter(c => c.acceptsArgs).map(c => c.name);
const noArgCmds = allCmds.filter(cmd => !argCmds.includes(cmd));

describe("Terminal Component", () => {
  let terminalInput: HTMLInputElement;
  let user: UserEvent;

  beforeEach(() => {
    const termSetup = setup(<Terminal />);
    user = termSetup.user;
    terminalInput = screen.getByTitle("terminal-input");
  });

  describe("Input Features & Initial State", () => {
    it("should display welcome screen by default", () => {
      expect(screen.getByTestId("welcome")).toBeInTheDocument();
    });

    it("should have empty input on load", () => {
      expect(terminalInput.value).toBe("");
    });

    it("should change input value", async () => {
      await user.type(terminalInput, "demo");
      expect(terminalInput.value).toBe("demo");
    });

    it("should clear input value when click enter", async () => {
      await user.type(terminalInput, "demo{enter}");
      expect(terminalInput.value).toBe("");
    });
  });

  describe("Input Commands", () => {
    it("should return 'command not found' when input value is invalid", async () => {
      await user.type(terminalInput, "demo{enter}");
      expect(screen.getByTestId("not-found-0").textContent).toContain(
        "command not found"
      );
    });

    it("should return 'visitor' when user types 'whoami'", async () => {
      await user.type(terminalInput, "whoami{enter}");
      expect(screen.getByTestId("latest-output").firstChild?.textContent).toBe(
        "visitor"
      );
    });

    it("should return '/home/~' when user types 'pwd'", async () => {
      await user.type(terminalInput, "pwd{enter}");
      expect(screen.getByTestId("latest-output").firstChild?.textContent).toBe(
        "/home/~"
      );
    });

    it("should display cmd history when user types 'history'", async () => {
      await user.type(terminalInput, "whoami{enter}");
      await user.type(terminalInput, "history{enter}");

      const historyNodes =
        screen.getByTestId("latest-output").firstChild?.childNodes;

      expect(historyNodes?.length).toBe(3);

      const typedCommands: string[] = [];
      historyNodes?.forEach(node => {
        typedCommands.push(node.textContent || "");
      });

      expect(typedCommands).toEqual(["welcome", "whoami", "history"]);
    });

    it("should clear everything when user types 'clear'", async () => {
      await user.type(terminalInput, "clear{enter}");
      expect(screen.getByTestId("terminal-wrapper").children.length).toBe(1);
    });

    it("should return `hello world` when user types `echo hello world`", async () => {
      await user.type(terminalInput, "echo hello world{enter}");
      expect(screen.getByTestId("latest-output").firstChild?.textContent).toBe(
        "hello world"
      );
    });

    it("should strip quotes from echo output", async () => {
      await user.type(terminalInput, "echo 'hello world'{enter}");
      expect(screen.getByTestId("latest-output").firstChild?.textContent).toBe(
        "hello world"
      );

      await user.type(terminalInput, 'echo "hello world"{enter}');
      expect(screen.getByTestId("latest-output").firstChild?.textContent).toBe(
        "hello world"
      );

      await user.type(terminalInput, "echo `hello world`{enter}");
      expect(screen.getByTestId("latest-output").firstChild?.textContent).toBe(
        "hello world"
      );
    });

    it("should render Welcome component when user types 'welcome'", async () => {
      await user.type(terminalInput, "clear{enter}");
      await user.type(terminalInput, "welcome{enter}");
      expect(screen.getByTestId("welcome")).toBeInTheDocument();
    });

    it("should render ls output when user types 'ls'", async () => {
      await user.type(terminalInput, "ls{enter}");
      expect(screen.getByTestId("ls")).toBeInTheDocument();
    });

    it("should render projects component when user types 'cd projects'", async () => {
      await user.type(terminalInput, "cd projects{enter}");
      expect(screen.getByTestId("projects")).toBeInTheDocument();
    });

    it("should render about component when user types 'cat about.txt'", async () => {
      await user.type(terminalInput, "cat about.txt{enter}");
      expect(screen.getByTestId("about")).toBeInTheDocument();
    });

    it("should render education component when user types 'cd education'", async () => {
      await user.type(terminalInput, "cd education{enter}");
      expect(screen.getByTestId("education")).toBeInTheDocument();
    });

    const renderedCmds = ["help", "history", "themes"];
    renderedCmds.forEach(cmd => {
      it(`should render ${cmd} component when user types '${cmd}'`, async () => {
        await user.type(terminalInput, `${cmd}{enter}`);
        expect(screen.getByTestId(cmd)).toBeInTheDocument();
      });
    });
  });

  describe("Redirect commands", () => {
    beforeEach(() => {
      window.open = vi.fn();
    });

    it("should open project URL when user types 'open 1' inside ~/projects", async () => {
      await user.type(terminalInput, "cd projects{enter}");
      await user.type(terminalInput, "open 1{enter}");
      expect(window.open).toHaveBeenCalled();
    });

    it("should open CV when user types 'cv'", async () => {
      await user.type(terminalInput, "cv{enter}");
      expect(window.open).toHaveBeenCalled();
    });
  });

  describe("Invalid Arguments", () => {
    noArgCmds.forEach(cmd => {
      it(`should return usage for '${cmd}' with unexpected arg`, async () => {
        await user.type(terminalInput, `${cmd} sth{enter}`);
        expect(screen.getByTestId("usage-output").innerHTML).toBe(
          `Usage: ${cmd}`
        );
      });
    });

    it("should return usage for 'themes' with invalid arg", async () => {
      await user.type(terminalInput, "themes sth{enter}");
      expect(screen.getByTestId("themes-invalid-arg")).toBeInTheDocument();
    });

    it("should return usage for 'cat' with no arg", async () => {
      await user.type(terminalInput, "cat{enter}");
      expect(screen.getByTestId("latest-output").textContent).toContain(
        "Usage: cat"
      );
    });

    it("should return error for 'cd' with nonexistent directory", async () => {
      await user.type(terminalInput, "cd nonexistent{enter}");
      expect(screen.getByTestId("latest-output").textContent).toContain(
        "No such file or directory"
      );
    });
  });

  describe("Keyboard shortcuts", () => {
    allCmds.forEach(cmd => {
      it(`should autocomplete '${cmd}' when Tab is pressed`, async () => {
        await user.type(terminalInput, cmd.slice(0, 2));
        await user.tab();
        expect(terminalInput.value).toBe(cmd);
      });
    });

    allCmds.forEach(cmd => {
      it(`should autocomplete '${cmd}' when Ctrl+i is pressed`, async () => {
        await user.type(terminalInput, cmd.slice(0, 2));
        await user.keyboard("{Control>}i{/Control}");
        expect(terminalInput.value).toBe(cmd);
      });
    });

    it("should clear when Ctrl+L is pressed", async () => {
      await user.type(terminalInput, "history{enter}");
      await user.keyboard("{Control>}l{/Control}");
      expect(screen.getByTestId("terminal-wrapper").children.length).toBe(1);
    });

    it("should navigate history with Up and Down arrows", async () => {
      await user.type(terminalInput, "ls{enter}");
      await user.type(terminalInput, "whoami{enter}");
      await user.type(terminalInput, "pwd{enter}");
      await user.keyboard("{arrowup>3}");
      expect(terminalInput.value).toBe("ls");
      await user.keyboard("{arrowup>2}");
      expect(terminalInput.value).toBe("welcome");
      await user.keyboard("{arrowdown>2}");
      expect(terminalInput.value).toBe("whoami");
      await user.keyboard("{arrowdown}");
      expect(terminalInput.value).toBe("pwd");
      await user.keyboard("{arrowdown}");
      expect(terminalInput.value).toBe("");
    });
  });
});
