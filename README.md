# slopped terminal portfolio, doing my best here i dont have any web experience.

mostly done using claude and based off of the terminal done by satnaing

## Layout

Code and resources are kept apart, so changing what the site *says* never means editing
React:

| Directory | Holds | Notes |
|-----------|-------|-------|
| `src/` | Code | Components, hooks, command registry, path helpers. No site copy or data. |
| `content/` | Resources | Text, data, Markdown, themes, the virtual filesystem tree. Imported at build time via the `@content` alias. |
| `public/` | Static assets | Images, CV PDF, CTF source files. Served as-is. |
| `scripts/` | Maintenance scripts | `sync_files.py`, `add_command.py`. |

Two rules keep the split from eroding:

- **`content/` holds literals only.** Anything derived from them — the sidebar's top-5
  languages, `open` targets, blog frontmatter parsing — is computed in `src/utils/`.
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
