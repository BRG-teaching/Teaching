"""Write viewer-commands.js from the session viewer's command specs, so the BRG terminal offers the
viewer's own commands and passes them on.

    python3 CAS/website/tools/extract_viewer_commands.py [path/to/session/session_viewer]

Default viewer path: ../session/session_viewer next to this repository.
"""

import glob
import json
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
VIEWER = Path(sys.argv[1]) if len(sys.argv) > 1 else HERE.parents[3].parent / "session" / "session_viewer"
VERBS = VIEWER / "src" / "app" / "command" / "verbs"
SPEC = re.compile(r'Spec::new\(\s*&\[([^\]]*)\],\s*"((?:[^"\\]|\\.)*)"')

commands = []
for path in sorted(glob.glob(str(VERBS / "*.rs"))) + sorted(glob.glob(str(VERBS / "*" / "*.rs"))):
    for m in SPEC.finditer(Path(path).read_text(encoding="utf-8")):
        names = re.findall(r'"([^"]+)"', m.group(1))
        if not names:
            continue
        help_text = m.group(2).replace('\\"', '"')
        example = re.search(r"Example: ([^·]+?)\s*(?:·|$)", help_text)
        commands.append({"cmd": names[0], "help": help_text, "example": example.group(1).strip() if example else ""})

if not commands:
    sys.exit(f"no commands found in {VERBS}")
commands.sort(key=lambda c: c["cmd"].lower())
out = HERE.parent / "viewer-commands.js"
out.write_text(
    "// The session viewer's own commands (session/session_viewer/src/app/command/verbs), so the BRG\n"
    "// terminal can offer them and pass them on. Regenerate when the viewer gains commands.\n"
    "window.SESSION_VIEWER_COMMANDS = " + json.dumps(commands, indent=1, ensure_ascii=False) + ";\n",
    encoding="utf-8",
)
# the same list for the BRG terminal's Claude Worker, which puts it in Claude's instructions
worker = HERE.parents[1] / "brg-terminal-ai" / "src" / "viewer-commands.js"
if worker.parent.is_dir():
    worker.write_text(
        "// The session viewer's commands, written by CAS/website/tools/extract_viewer_commands.py.\n"
        "export default " + json.dumps(commands, indent=1, ensure_ascii=False) + ";\n",
        encoding="utf-8",
    )
print(f"{len(commands)} commands -> {out}" + (f" and {worker}" if worker.parent.is_dir() else ""))
