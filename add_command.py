#!/usr/bin/env python3
"""
Scaffold a new terminal command across the three files that must stay in sync:
  - src/commands/meta.ts       (commandMeta array)
  - src/commands/registry.tsx  (import + components map)
  - src/components/commands/<Name>.tsx  (scaffold component)

Usage:
  python3 add_command.py <name> "<description>" [--args]

Arguments:
  name          Command name — lowercase, no spaces (e.g. ctf)
  description   Short description shown in `help` output (quote it)
  --args        Pass this flag if the command reads user arguments

Example:
  python3 add_command.py ctf "list CTF challenges" --args

After running, open src/components/commands/<Name>.tsx and implement the body.
The command will immediately appear in `help` and tab-completion.
"""

import sys
import re
from pathlib import Path

REPO = Path(__file__).parent
META_TS      = REPO / "src" / "commands" / "meta.ts"
REGISTRY_TSX = REPO / "src" / "commands" / "registry.tsx"
COMMANDS_DIR = REPO / "src" / "components" / "commands"


def pascal(name: str) -> str:
    return name[0].upper() + name[1:]


def compute_tab(name: str) -> int:
    # tab ≈ 12 - len(name), minimum 1
    return max(1, 12 - len(name))


def patch_meta(name: str, desc: str, accepts_args: bool) -> None:
    content = META_TS.read_text(encoding="utf-8")
    tab = compute_tab(name)
    args_field = ", acceptsArgs: true" if accepts_args else ""
    new_entry = (
        f'  {{ name: "{name}", desc: "{desc}", tab: {tab}{args_field} }},\n'
    )
    # Insert before the closing ]; of commandMeta
    marker = "\n];"
    idx = content.rfind(marker)
    if idx == -1:
        sys.exit("error: could not find ]; in meta.ts")
    content = content[:idx] + "\n" + new_entry.rstrip("\n") + content[idx:]
    META_TS.write_text(content, encoding="utf-8")


def patch_registry(name: str) -> None:
    content = REGISTRY_TSX.read_text(encoding="utf-8")
    cls = pascal(name)

    # 1. Add import before the `import { commandMeta` line
    import_line = f'import {cls} from "../components/commands/{cls}";\n'
    anchor = 'import { commandMeta, CommandMeta } from "./meta";'
    if anchor not in content:
        sys.exit("error: could not find commandMeta import in registry.tsx")
    content = content.replace(anchor, import_line + anchor)

    # 2. Add component entry before the closing }; of the components object
    entry_line = f"  {name}: <{cls} />,\n"
    # Find the last `};` that closes the components object
    # It appears after `welcome: <Welcome />,` — insert before it
    components_close = "\n};\n\nexport const registry"
    if components_close not in content:
        sys.exit("error: could not find components closing }; in registry.tsx")
    content = content.replace(
        components_close,
        "\n" + entry_line.rstrip("\n") + components_close,
    )

    REGISTRY_TSX.write_text(content, encoding="utf-8")


def write_scaffold(name: str, accepts_args: bool) -> Path:
    cls = pascal(name)
    dest = COMMANDS_DIR / f"{cls}.tsx"
    if dest.exists():
        sys.exit(f"error: {dest} already exists — remove it first")

    usage_block = (
        f"""  if (!arg[0]) return <UsageDiv>Usage: {name} &lt;argument&gt;</UsageDiv>;\n  """
        if accepts_args
        else "  "
    )

    scaffold = f"""\
// TODO: implement the `{name}` command.
// Remove this comment and the placeholder return when done.
import {{ useContext }} from "react";
import {{ termContext }} from "../Terminal";
import {{ UsageDiv }} from "../styles/Output.styled";

const {cls}: React.FC = () => {{
  const {{ arg }} = useContext(termContext);
{usage_block}return <div>// TODO: {name}</div>;
}};

export default {cls};
"""
    dest.write_text(scaffold, encoding="utf-8")
    return dest


def main() -> None:
    args = sys.argv[1:]
    if len(args) < 2:
        print(__doc__)
        sys.exit(1)

    name = args[0].lower()
    desc = args[1]
    accepts_args = "--args" in args

    if not re.fullmatch(r"[a-z][a-z0-9_-]*", name):
        sys.exit(f"error: invalid command name '{name}' (use lowercase letters/digits/hyphens)")

    patch_meta(name, desc, accepts_args)
    patch_registry(name)
    component_path = write_scaffold(name, accepts_args)

    print(f"created command '{name}':")
    print(f"  • patched  {META_TS.relative_to(REPO)}")
    print(f"  • patched  {REGISTRY_TSX.relative_to(REPO)}")
    print(f"  • created  {component_path.relative_to(REPO)}")
    print(f"\nNext: implement {component_path.name}")


if __name__ == "__main__":
    main()
