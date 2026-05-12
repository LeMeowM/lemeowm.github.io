#!/usr/bin/env python3
"""
Sync public/files/ into the filesChildren block in src/utils/filesystem.ts.

This script is the canonical way to register source files for the terminal.
Do NOT hand-edit the filesChildren block — run this script instead.

Usage (from repo root):
  python3 sync_files.py

Workflow:
  1. Drop files into public/files/<ctf-name>/  (any directory depth)
  2. Run this script
  3. Files become accessible via `cat files/…` in the terminal and
     embeddable in blog posts via ```lang src=/files/… ```
"""

from pathlib import Path
import sys

REPO_ROOT = Path(__file__).parent
PUBLIC_FILES = REPO_ROOT / "public" / "files"
FILESYSTEM_TS = REPO_ROOT / "src" / "utils" / "filesystem.ts"

START_MARKER = "const filesChildren: Record<string, FSDir | FSFile> = {"
END_MARKER = "\n};"


def ts_node(path: Path, root: Path, base_indent: str) -> str:
    """Recursively build a TypeScript FSFile or FSDir literal."""
    if path.is_file():
        rel = path.relative_to(root).as_posix()
        return f'{{ type: "file", content: "source-file:/files/{rel}" }}'

    inner = base_indent + "  "
    children = sorted(path.iterdir(), key=lambda p: (p.is_file(), p.name))
    lines = [
        "{",
        f'{inner}type: "dir",',
        f'{inner}children: {{',
    ]
    for child in children:
        child_ts = ts_node(child, root, inner + "  ")
        lines.append(f'{inner}  "{child.name}": {child_ts},')
    lines.append(f"{inner}}},")
    lines.append(f"{base_indent}}}")
    return "\n".join(lines)


def build_block() -> str:
    entries = sorted(PUBLIC_FILES.iterdir(), key=lambda p: (p.is_file(), p.name)) \
        if PUBLIC_FILES.exists() else []

    lines = [START_MARKER]
    for entry in entries:
        lines.append(f'  "{entry.name}": {ts_node(entry, PUBLIC_FILES, "  ")},')
    lines.append("};")
    return "\n".join(lines)


def main() -> None:
    if not FILESYSTEM_TS.exists():
        sys.exit(f"error: {FILESYSTEM_TS} not found")

    content = FILESYSTEM_TS.read_text(encoding="utf-8")

    start = content.find(START_MARKER)
    if start == -1:
        sys.exit("error: filesChildren block not found in filesystem.ts")

    end = content.find(END_MARKER, start)
    if end == -1:
        sys.exit("error: closing }; not found after filesChildren")
    end += len(END_MARKER)

    new_content = content[:start] + build_block() + content[end:]
    FILESYSTEM_TS.write_text(new_content, encoding="utf-8")

    total = sum(1 for _ in PUBLIC_FILES.rglob("*")) if PUBLIC_FILES.exists() else 0
    print(f"synced {total} items from public/files/ → filesystem.ts")


if __name__ == "__main__":
    main()
