# slopped terminal portfolio, doing my best here i dont have any web experience.

mostly done using claude and based off of the terminal done by satnaing

## Interface

A Windows 2000 desktop over a vaporwave wallpaper. Three windows are open in a fixed layout —
the terminal, an ASCII image viewer and a Display Properties panel — and `cat`-ing a blog post
or a source file opens a new window in front of them. Title bar and taskbar buttons only show,
hide and maximize windows; nothing is draggable, so every visitor sees the same arrangement.
`themes set <name>`, or the scheme list in Display Properties, reskins the whole shell.

## Layout

Code and resources are kept apart, so changing what the site *says* never means editing
React:

| Directory | Holds | Notes |
|-----------|-------|-------|
| `src/` | Code | Components, hooks, command registry, path helpers. No site copy or data. |
| `src/components/desktop/` | Shell | The Windows 2000 desktop: window frames, taskbar, Start menu, settings. |
| `content/` | Resources | Text, data, Markdown, themes, the virtual filesystem tree. Imported at build time via the `@content` alias. |
| `public/` | Static assets | Images, CV PDF, CTF source files. Served as-is. |
| `scripts/` | Maintenance scripts | `sync_files.py`, `add_command.py`. |

Two rules keep the split from eroding:

- **`content/` holds literals only.** Anything derived from them — the settings window's
  top-5 languages, `open` targets, blog frontmatter parsing — is computed in `src/`.
- **`content/` never imports from `src/`.** The dependency runs one way: code reads content.

See [EDITING.md](EDITING.md) for what to edit to change any given part of the site.

## Development

```
pnpm install
pnpm dev          # dev server
pnpm build        # typecheck + production build
pnpm test:once    # test suite
pnpm lint
```
