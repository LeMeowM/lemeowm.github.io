import { useContext } from "react";
import styled from "styled-components";
import { termContext } from "../Terminal";
import { UsageDiv } from "../styles/Output.styled";

const ManWrapper = styled.div`
  margin-top: 0.25rem;
  margin-bottom: 0.75rem;
  line-height: 1.75rem;
`;

const Section = styled.div`
  font-weight: 700;
  margin-top: 0.75rem;
  color: ${({ theme }) => theme.colors?.primary};
`;

const Indent = styled.div`
  padding-left: 1.5rem;
  color: ${({ theme }) => theme.colors?.text[100]};
`;

const Muted = styled.span`
  color: ${({ theme }) => theme.colors?.text[200]};
`;

type ManPage = {
  synopsis: string;
  description: string;
  examples: string[];
};

const pages: Record<string, ManPage> = {
  about: {
    synopsis: "about",
    description:
      "Display a short biography and overview of skills. Equivalent to 'cat about.txt'.",
    examples: ["about"],
  },
  cat: {
    synopsis: "cat <file>",
    description:
      "Read and display the contents of a file. Supports simple paths (about.txt) and directory-prefixed paths (contact/email.txt).",
    examples: [
      "cat about.txt",
      "cat contact/email.txt",
      "cat contact/socials.txt",
    ],
  },
  cd: {
    synopsis: "cd [directory]",
    description:
      "Change the current directory. Entering a content directory (projects, experience, education, blog) automatically displays its contents. Use 'cd ..' to go up, 'cd' or 'cd ~' to return home.",
    examples: ["cd projects", "cd contact", "cd ..", "cd ~"],
  },
  clear: {
    synopsis: "clear",
    description: "Clear all output from the terminal. Ctrl+L does the same.",
    examples: ["clear"],
  },
  cv: {
    synopsis: "cv",
    description:
      "Open the CV/resume PDF in a new tab. Place the file at public/cv.pdf to activate this.",
    examples: ["cv"],
  },
  echo: {
    synopsis: "echo <text>",
    description: "Print text to the terminal. Strips surrounding quotes.",
    examples: ["echo hello world", 'echo "quoted text"'],
  },
  grep: {
    synopsis: "grep <pattern> [file.md]",
    description:
      "Search blog post content for lines matching a pattern (case-insensitive). An optional second argument narrows the search to a single post by slug (e.g. 'post-title.md').",
    examples: ["grep crypto", "grep aes lakectf-2025.md", "grep TODO"],
  },
  help: {
    synopsis: "help",
    description:
      "Display a list of all available commands with short descriptions.",
    examples: ["help"],
  },
  history: {
    synopsis: "history",
    description: "Show the list of commands entered during this session.",
    examples: ["history"],
  },
  ls: {
    synopsis: "ls [-l] [-R] [--tree] [--help] [path]",
    description:
      "List directory contents. Directories appear in primary colour with a trailing slash. Flags: -l (long format with type indicator), -R (recursive), --tree (ASCII directory tree), --help (flag reference). Flags can be combined: -lR.",
    examples: [
      "ls",
      "ls contact",
      "ls -l",
      "ls -l /files",
      "ls -R",
      "ls -lR /files",
      "ls --tree",
      "ls --tree /blog",
    ],
  },
  man: {
    synopsis: "man <command>",
    description: "Show the manual page for a command.",
    examples: ["man ls", "man cd", "man open"],
  },
  motd: {
    synopsis: "motd",
    description:
      "Display the message of the day — a rotating daily tip. The tip array lives in src/utils/content.ts.",
    examples: ["motd"],
  },
  neofetch: {
    synopsis: "neofetch",
    description:
      "Display system information alongside ASCII art, neofetch style.",
    examples: ["neofetch"],
  },
  open: {
    synopsis: "open <item>",
    description:
      "Open a URL or numbered item in a new tab. Behaviour is context-aware: run it inside a directory (projects, blog, contact) to open the matching item by number or filename.",
    examples: [
      "open 1          (inside ~/projects — opens project 1)",
      "open email.txt  (inside ~/contact — opens email client)",
      "open https://example.com",
    ],
  },
  pwd: {
    synopsis: "pwd",
    description: "Print the full path of the current working directory.",
    examples: ["pwd"],
  },
  themes: {
    synopsis: "themes set <theme-name>",
    description:
      "Switch the colour theme. Run 'themes' without arguments to list available themes.",
    examples: ["themes", "themes set dark", "themes set ubuntu"],
  },
  skills: {
    synopsis: "skills",
    description:
      "Display a breakdown of programming language proficiency levels and domain specialisms. Data lives in src/utils/content.ts.",
    examples: ["skills"],
  },
  whoami: {
    synopsis: "whoami",
    description: "Print the current user name.",
    examples: ["whoami"],
  },
};

const Man: React.FC = () => {
  const { arg } = useContext(termContext);
  const cmd = arg[0];

  if (!cmd) {
    return (
      <UsageDiv>
        Usage: man &lt;command&gt;
        <br />
        eg: man ls
      </UsageDiv>
    );
  }

  const page = pages[cmd];
  if (!page) {
    return (
      <ManWrapper>
        No manual entry for <strong>{cmd}</strong>. Type &apos;help&apos; for a
        list of commands.
      </ManWrapper>
    );
  }

  return (
    <ManWrapper>
      <Section>NAME</Section>
      <Indent>
        {cmd} &mdash; {page.description.split(".")[0].toLowerCase()}.
      </Indent>

      <Section>SYNOPSIS</Section>
      <Indent>{page.synopsis}</Indent>

      <Section>DESCRIPTION</Section>
      <Indent>{page.description}</Indent>

      <Section>EXAMPLES</Section>
      {page.examples.map(ex => (
        <Indent key={ex}>
          <Muted>$ </Muted>
          {ex}
        </Indent>
      ))}
    </ManWrapper>
  );
};

export default Man;
