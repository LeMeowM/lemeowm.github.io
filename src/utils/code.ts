export const EXT_TO_LANG: Record<string, string> = {
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

export const detectLang = (filename: string): string => {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  return EXT_TO_LANG[ext] ?? "text";
};
