"""Copy the library's markdown from the public R2 bucket into the GitHub Pages build.

Browsers may only read the bucket if R2 sends CORS headers. The Pages workflow runs this
script on GitHub's servers (where CORS does not apply) so the library page can read the
text from its own site instead. Figures are not copied: <img> tags load them from R2 directly.

    python3 CAS/website/tools/mirror_books.py CAS/website/books

Parses LIBRARY.md exactly like mcp-server-brg (src/brg_mcp/adapters/public_books.py).
Never fails the deploy: on any error it writes what it could and exits 0.
"""

import json
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path, PurePosixPath
from urllib.parse import quote

BASE = "https://pub-c082064d3c234b25bcb6abd4240e637c.r2.dev"
EXTRAS = ["README.md", "INDEX.md", "GLOSSARY.md", "FIGURES.md", "GRAPHIC-STATICS-NOTATION.md"]
LIMIT = 2_000_000  # same per-file cap as the MCP server
COVER_NAMES = ["cover.jpg", "cover.jpeg", "cover.png", "cover.webp"]
IMAGE = re.compile(r"!\[[^\]]*\]\(\s*<?([^)\s>]+)>?(?:\s+\"[^\"]*\")?\s*\)|<img[^>]+src=[\"']([^\"']+)[\"']", re.I)


def safe(path: str) -> bool:
    return bool(path) and not PurePosixPath(path).is_absolute() and \
        not any(p in {"", ".", ".."} for p in path.split("/")) and \
        not any(c in path for c in "\\%?#:")


def get(base: str, path: str) -> bytes | None:
    url = base + "/" + quote(path, safe="/")
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "brg-teaching-pages"})
        with urllib.request.urlopen(req, timeout=60) as r:
            data = r.read(LIMIT + 1)
            return data if len(data) <= LIMIT else None
    except (urllib.error.URLError, TimeoutError, OSError):
        return None


def exists(base: str, path: str) -> bool:
    url = base + "/" + quote(path, safe="/")
    try:
        req = urllib.request.Request(url, method="HEAD", headers={"User-Agent": "brg-teaching-pages"})
        with urllib.request.urlopen(req, timeout=30) as r:
            return r.status == 200
    except (urllib.error.URLError, TimeoutError, OSError):
        return False


def find_cover(base: str, book: str, readme: bytes | None) -> str | None:
    """A cover image for the book: cover.* in its folder, else the first image in its README."""
    for name in COVER_NAMES:
        if exists(base, f"{book}/{name}"):
            return f"{base}/{book}/{name}"
    if readme:
        m = IMAGE.search(readme.decode("utf-8", "replace"))
        if m:
            src = (m.group(1) or m.group(2)).strip()
            if src.startswith("https://"):
                return src
            if safe(src):
                return f"{base}/{book}/{quote(src, safe='/')}"
    return None


def main(out: Path, base: str = BASE) -> int:
    out.mkdir(parents=True, exist_ok=True)
    library = get(base, "LIBRARY.md")
    if library is None:
        print(f"mirror: could not read {base}/LIBRARY.md; the page will try R2 directly")
        return 0
    (out / "LIBRARY.md").write_bytes(library)
    books, current = {}, None
    for line in library.decode("utf-8", "replace").splitlines():
        head = re.match(r"^## `([a-zA-Z0-9_-]+)/` — (.+)$", line)
        if head:
            current = head.group(1)
            books[current] = []
            continue
        entry = re.match(r"^\s+- `([^`]+\.md)` \*\*(.*?)\*\*(.*)$", line)
        if current and entry and safe(entry.group(1)):
            books[current].append(entry.group(1))
    copied = missing = 0
    covers = {}
    for book, sections in books.items():
        readme = None
        for name in sections + EXTRAS:
            data = get(base, f"{book}/{name}")
            if data is None:
                missing += name not in EXTRAS
                continue
            if name == "README.md":
                readme = data
            target = out / book / name
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(data)
            copied += 1
        cover = find_cover(base, book, readme)
        if cover:
            covers[book] = cover
    (out / "covers.json").write_text(json.dumps(covers, indent=1), encoding="utf-8")
    print(f"mirror: {len(books)} books, {copied} files copied, {missing} chapters missing, {len(covers)} covers")
    return 0


if __name__ == "__main__":
    sys.exit(main(Path(sys.argv[1] if len(sys.argv) > 1 else "CAS/website/books"),
                  sys.argv[2] if len(sys.argv) > 2 else BASE))
