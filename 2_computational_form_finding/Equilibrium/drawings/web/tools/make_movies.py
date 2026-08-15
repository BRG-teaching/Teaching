"""
Render step-by-step movies of the web drawings.

All frames of a view are captured in ONE headless-Chrome session (driven over the
DevTools protocol): the page is loaded once, the step player is advanced with
window.__player.set(k), and a screenshot is taken per step. A single GL context
renders every frame, so frames are pixel-stable (no jitter between steps).
Frames are assembled into an MP4 with ffmpeg; the last frame is held longer.

Output: web/movies/view_N.mp4

Requires: the web app served locally (python3 -m http.server 8741 from web/),
google-chrome, ffmpeg, websocket-client (dev dependency of the repo).

Usage (from the drawings/ directory):
    uv run python web/tools/make_movies.py 1 2 14   # selected views
    uv run python web/tools/make_movies.py --all    # every view (slow)
"""

import base64
import itertools
import json
import re
import subprocess
import sys
import tempfile
import time
import urllib.request
from pathlib import Path

import websocket

BASE = "http://127.0.0.1:8741"
FPS = 15            # movie frame rate: smooth playback
PER_STEP = 14       # frames captured per construction step (covers the draw-in)
FRAME_GAP = 0.05    # capture pacing; playback compresses time ~2.5x -> fluent
HOLD_LAST = 2.0     # seconds to hold the final drawing
WINDOW = (1500, 900)
DSF = 2             # capture at 2x device pixels so gallery loops stay crisp on 4K/HiDPI
OUT_W = 1320        # output width (2x the card width the gallery renders at)

WEB = Path(__file__).resolve().parents[1]
MOVIES = WEB / "movies"


class Chrome:
    """Minimal DevTools-protocol driver for one headless-Chrome page."""

    def __init__(self):
        self.proc = subprocess.Popen(
            ["google-chrome", "--headless=new", "--remote-debugging-port=0",
             f"--window-size={WINDOW[0]},{WINDOW[1]}", "--hide-scrollbars",
             f"--force-device-scale-factor={DSF}",
             "--user-data-dir=" + tempfile.mkdtemp(prefix="eqmovie-chrome-"),
             "about:blank"],
            stderr=subprocess.PIPE, text=True)
        port = None
        for line in self.proc.stderr:
            if (m := re.search(r"DevTools listening on ws://[^:]+:(\d+)/", line)):
                port = int(m.group(1))
                break
        if port is None:
            raise RuntimeError("chrome did not report a DevTools port")
        for _ in range(50):
            try:
                targets = json.load(urllib.request.urlopen(f"http://127.0.0.1:{port}/json"))
                page = next(t for t in targets if t["type"] == "page")
                break
            except Exception:
                time.sleep(0.1)
        self.ws = websocket.create_connection(page["webSocketDebuggerUrl"], suppress_origin=True)
        self._ids = itertools.count(1)
        self.send("Page.enable")
        self.send("Runtime.enable")

    def send(self, method, **params):
        mid = next(self._ids)
        self.ws.send(json.dumps({"id": mid, "method": method, "params": params}))
        while True:
            msg = json.loads(self.ws.recv())
            if msg.get("id") == mid:
                if "error" in msg:
                    raise RuntimeError(f"{method}: {msg['error']}")
                return msg["result"]

    def evaluate(self, expression):
        r = self.send("Runtime.evaluate", expression=expression, awaitPromise=True,
                      returnByValue=True)
        return r["result"].get("value")

    def goto(self, url):
        self.send("Page.navigate", url=url)
        for _ in range(100):
            if self.evaluate("!!window.__player"):
                return
            time.sleep(0.1)
        raise RuntimeError(f"player did not appear on {url}")

    def screenshot(self, path):
        data = self.send("Page.captureScreenshot", format="png")["data"]
        Path(path).write_bytes(base64.b64decode(data))

    def close(self):
        self.ws.close()
        self.proc.terminate()


def make_movie(chrome, view):
    # exercise views are addressed as ?ex=S_T and live at movies/exS_T.mp4
    ex = isinstance(view, str) and not str(view).isdigit()
    q = f"ex={view}" if ex else f"view={view}"
    stem = f"ex{view}" if ex else f"view_{view}"
    chrome.goto(f"{BASE}/?{q}&step=0")           # step param disables autoplay
    n = chrome.evaluate("window.__player.steps.length - 1")
    MOVIES.mkdir(exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        f = 0
        for k in range(n + 1):
            chrome.evaluate(f"window.__player.set({k})")
            # capture the draw-in animation of this step in real time
            for _ in range(PER_STEP):
                time.sleep(FRAME_GAP)
                chrome.screenshot(f"{tmp}/f{f:05d}.png")
                f += 1
        # drop the sidebar (250 CSS px, captured at DSF device px), keep the canvas
        crop = f"crop=iw-{250 * DSF}:ih:{250 * DSF}:0"
        out = MOVIES / f"{stem}.mp4"
        subprocess.run(
            ["ffmpeg", "-y", "-v", "error", "-framerate", str(FPS), "-i", f"{tmp}/f%05d.png",
             "-vf", f"tpad=stop_mode=clone:stop_duration={HOLD_LAST},{crop},scale={OUT_W}:-2",
             "-c:v", "libx264", "-pix_fmt", "yuv420p", str(out)],
            check=True)
        # static poster of the finished drawing for the gallery grid
        subprocess.run(
            ["ffmpeg", "-y", "-v", "error", "-i", f"{tmp}/f{f - 1:05d}.png",
             "-vf", f"{crop},scale={OUT_W}:-2", str(MOVIES / f"{stem}.png")],
            check=True)
    print(f"{stem}: {n + 1} frames -> {out}")


def main():
    if "--all" in sys.argv:
        views = sorted(int(p.stem.split("_")[1]) for p in (WEB / "views").glob("view_*.js"))
    else:
        views = [a if not a.isdigit() else int(a) for a in sys.argv[1:]]
    if not views:
        print(__doc__)
        return
    chrome = Chrome()
    try:
        for v in views:
            make_movie(chrome, v)
    finally:
        chrome.close()


if __name__ == "__main__":
    main()
