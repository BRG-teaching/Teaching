#!/usr/bin/env python3
"""Mirror the eQUILIBRIUM platform's public PDFs into drawings/web/pdf/.

https://block.arch.ethz.ch/eq is the course platform these exercises come from.
It publishes, for every exercise, the task sheet in German and English, a set of
compendium chapters (the theory the task is drawn from), and the lecture deck.
The SOLUTION sheets are listed but their links are stripped for anonymous
visitors, so they cannot be mirrored; `catalog.json` records which ones exist
behind the login under "gated" so it is clear what is missing and why.

    uv run python drawings/web/tools/fetch_course_pdfs.py --catalog
        re-walk the platform and rewrite pdf/catalog.json

    uv run python drawings/web/tools/fetch_course_pdfs.py
        download anything in the catalog that is not already on disk, skipping
        the lecture decks

    uv run python drawings/web/tools/fetch_course_pdfs.py --lectures
        include the lecture decks -- 338 MB, gitignored on main, and already
        mirrored on the pdf-archive branch under their platform filenames

Filenames are rewritten to something readable: a compendium chapter published
as "/eq/files/4.1 Thrust Line_Trial Funicular_1668678412.pdf" lands as
compendium/4.1-thrust-line-trial-funicular-en.pdf.
"""
import argparse
import hashlib
import html
import json
import re
import sys
import time
import unicodedata
import urllib.parse
import urllib.request
from pathlib import Path

BASE = "https://block.arch.ethz.ch"
UA = {"User-Agent": "Mozilla/5.0 (ETH course-material mirror)"}
PDF = Path(__file__).resolve().parents[1] / "pdf"
CATALOG = PDF / "catalog.json"
# Structural Design I and II are the two courses these exercises come from
COURSES = ("Structural Design I", "Structural Design II")


def get(url, tries=3):
    # platform filenames contain spaces and umlauts; quote the path only
    pr = urllib.parse.urlsplit(url)
    url = urllib.parse.urlunsplit(
        (pr.scheme, pr.netloc, urllib.parse.quote(pr.path), pr.query, ""))
    for n in range(tries):
        try:
            return urllib.request.urlopen(
                urllib.request.Request(url, headers=UA), timeout=90).read()
        except Exception as e:                                  # noqa: BLE001
            print(f"    retry {n + 1}/{tries}: {e}", file=sys.stderr)
            time.sleep(2)
    return None


def text(url):
    b = get(url)
    return b.decode("utf-8", "replace") if b else ""


def anchors(s, pat):
    out = []
    for m in re.finditer(pat, s, re.S):
        t = re.sub("<[^>]+>", "", m.group(2))
        out.append((m.group(1), " ".join(html.unescape(t).split())))
    return out


def build_catalog():
    db = []
    for cu, cname in anchors(text(BASE + "/eq/course"),
                             r'href="(/eq/course/\d+)"[^>]*>(.*?)</a>'):
        if not any(c in cname and "III" not in cname and "IV" not in cname
                   for c in COURSES):
            continue
        for kind in ("exercise", "lecture"):
            seen = set()
            for iu, iname in anchors(text(f"{BASE}{cu}/{kind}"),
                                     rf'href="([^"]*{kind}/\d+)"[^>]*>(.*?)</a>'):
                iu = iu if iu.startswith("/") else "/eq/" + iu.lstrip("./")
                if iu in seen:
                    continue
                seen.add(iu)
                page = text(BASE + iu)
                pdfs = {}
                for u, t in anchors(page, r'href="([^"]*\.pdf)"[^>]*>(.*?)</a>'):
                    pdfs.setdefault(urllib.parse.urljoin(BASE + iu, u), t)
                # a <li> with no <a> inside it is a file the login gates
                gated = [" ".join(html.unescape(re.sub("<[^>]+>", "", g)).split())
                         for g in re.findall(
                             r"<li>([^<]*(?:SUNG|SOLUTION)[^<]*)</li>", page)]
                db.append({"course": cname, "kind": kind, "item": iname,
                           "url": BASE + iu, "gated": gated,
                           "pdfs": [{"url": u, "text": t} for u, t in pdfs.items()]})
                print(f"  {cname[-3:]:>3} {kind:<8} {iname[:42]:<42}"
                      f" {len(pdfs)} pdf, {len(gated)} gated", file=sys.stderr)
                time.sleep(0.25)
    CATALOG.write_text(json.dumps(db, indent=1, ensure_ascii=False))
    return db


def slug(t):
    t = unicodedata.normalize("NFKD", t).encode("ascii", "ignore").decode()
    return re.sub(r"-+", "-", re.sub(r"[^a-z0-9]+", "-",
                                     t.replace("&", "and").lower())).strip("-")


# German titles that carry no "de" marker in their URL
DE_WORDS = ("ubung", "aufgabe", "losung", "stutzlinie", "auflager", "gesucht",
            "systeme", "bogen-seil", "vergleich", "einfuhrung", "kompendium")


def language(title, url):
    s = slug(title) + " " + url.lower()
    if "_en" in url.lower() or re.search(r"\b(task|exercise|solution)\b", s):
        if "_de" not in url.lower():
            return "en"
    if "_de" in url.lower() or any(w in s for w in DE_WORDS):
        return "de"
    return "en"


def destination(entry, pdf):
    u, t = pdf["url"], pdf["text"]
    cn = "sd2" if "Design II" in entry["course"] else "sd1"
    if (m := re.match(r"^(\d+\.\d+)\s+(.*)$", t)):        # "4.1 Thrust Line…"
        return PDF / "compendium" / f"{m.group(1)}-{slug(m.group(2))}-{language(t, u)}.pdf"
    if entry["kind"] == "lecture":
        return PDF / "lectures" / f"{cn}-{slug(entry['item'])}-{slug(t)[:40]}.pdf"
    return PDF / f"{cn}-{slug(entry['item'])}-{slug(t)}.pdf"


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--catalog", action="store_true",
                    help="re-walk the platform and rewrite catalog.json")
    ap.add_argument("--lectures", action="store_true",
                    help="also fetch the 338 MB of lecture decks")
    a = ap.parse_args()

    db = build_catalog() if a.catalog else json.loads(CATALOG.read_text())
    # anything already on disk under ANY name is already mirrored
    have = {hashlib.md5(p.read_bytes()).hexdigest()
            for p in PDF.rglob("*.pdf")}
    plan, seen = [], set()
    for e in db:
        if e["kind"] == "lecture" and not a.lectures:
            continue
        for p in e["pdfs"]:
            d = destination(e, p)
            if d in seen:
                continue
            seen.add(d)
            plan.append((p["url"], d))

    ok = skip = fail = 0
    for u, d in plan:
        if d.exists():
            skip += 1
            continue
        data = get(u)
        if not data or not data.startswith(b"%PDF"):
            print(f"  FAILED {u}")
            fail += 1
            continue
        if hashlib.md5(data).hexdigest() in have:
            skip += 1                       # same bytes, different filename
            continue
        d.parent.mkdir(parents=True, exist_ok=True)
        d.write_bytes(data)
        ok += 1
        print(f"  {len(data) / 1024:8.0f} kB  {d.relative_to(PDF)}")
        time.sleep(0.2)

    gated = sum(len(e["gated"]) for e in db)
    print(f"\n{ok} new, {skip} already mirrored, {fail} failed")
    print(f"{gated} solution files exist but are behind the platform login "
          f"and cannot be mirrored (see \"gated\" in catalog.json)")


if __name__ == "__main__":
    main()
