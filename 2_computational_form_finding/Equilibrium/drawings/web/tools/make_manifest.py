#!/usr/bin/env python3
"""Build web/gallery-data.json — the gallery's single-fetch manifest.

Scans views/*.js and movies/ and emits, per view:
  { "n": 5, "title": "...", "about": "...", "todo": false, "movie": true }

The gallery fetches this ONE file instead of probing every view module and
movie over HTTP (53 source fetches + 53 HEADs made GitHub Pages rate-limit
the page with 503s — the "thumbnails disappear" bug).  Run by the Pages
workflow at build time; harmless to run locally (stdlib only).
"""
import json
import re
from pathlib import Path

WEB = Path(__file__).resolve().parents[1]

views = []
for p in sorted(WEB.glob("views/view_*.js"),
                key=lambda p: int(p.stem.split("_")[1])):
    src = p.read_text(encoding="utf-8")
    n = int(p.stem.split("_")[1])
    title = None
    if (m := re.search(r"title:\s*'([^']+)'", src)):
        title = m.group(1).replace("\\'", "'")
    about = None
    if (m := re.search(r"about:\s*'((?:\\'|[^'])+)'", src)):
        about = m.group(1).replace("\\'", "'")
    views.append({
        "n": n,
        "title": title,
        "about": about,
        "todo": src.startswith("// Auto-generated"),
        "movie": (WEB / "movies" / f"view_{n}.mp4").exists(),
    })

out = WEB / "gallery-data.json"
out.write_text(json.dumps(views, ensure_ascii=False), encoding="utf-8")
print(f"{out}: {len(views)} views, "
      f"{sum(v['movie'] for v in views)} movies, "
      f"{sum(not v['todo'] for v in views)} hand-written")
