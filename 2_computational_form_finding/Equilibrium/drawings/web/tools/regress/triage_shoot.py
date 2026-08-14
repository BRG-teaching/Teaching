#!/usr/bin/env python3
"""Triage sweep: final-state screenshot of OUR viewer + the LIVE ETH original per view.

Usage: triage_shoot.py [ours|live|both] [view numbers... | all]
Outputs into scratchpad/audit2/{ours,live}/view_N.png plus steps_N.json (our captions).
"""
import base64, itertools, json, re, subprocess, sys, tempfile, time, urllib.request
from pathlib import Path

sys.path.insert(0, "/home/pv/brg/code/Teaching/.venv/lib/python3.11/site-packages")
import websocket
from PIL import Image, ImageStat

SP = Path(__file__).resolve().parent
OUT = SP / "audit2"
BASE = "http://127.0.0.1:8741"
ALL_VIEWS = [*range(1, 30), 31, 32, 33, 34, 36, 37, 38, *range(42, 53)]  # delivered
SIDEBAR = 250  # CSS px, our viewer


class Chrome:
    def __init__(self, w=1500, h=980):
        self.proc = subprocess.Popen(
            ["google-chrome", "--headless=new", "--remote-debugging-port=0",
             f"--window-size={w},{h}", "--hide-scrollbars",
             "--force-device-scale-factor=1",
             "--user-data-dir=" + tempfile.mkdtemp(prefix="eqtriage-"),
             "about:blank"],
            stderr=subprocess.PIPE, text=True)
        port = None
        for line in self.proc.stderr:
            if (m := re.search(r"DevTools listening on ws://[^:]+:(\d+)/", line)):
                port = int(m.group(1))
                break
        if port is None:
            raise RuntimeError("no devtools port")
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

    def navigate(self, url):
        self.send("Page.navigate", url=url)

    def wait_for(self, expr, timeout=60):
        t0 = time.time()
        while time.time() - t0 < timeout:
            try:
                if self.evaluate(expr):
                    return True
            except Exception:
                pass
            time.sleep(0.2)
        return False

    def screenshot(self, path, clip=None):
        kw = dict(format="png")
        if clip:
            kw["clip"] = {**clip, "scale": 1}
        data = self.send("Page.captureScreenshot", **kw)["data"]
        Path(path).write_bytes(base64.b64decode(data))

    def close(self):
        try:
            self.ws.close()
        finally:
            self.proc.terminate()


def not_blank(path):
    im = Image.open(path).convert("L")
    return ImageStat.Stat(im).stddev[0] > 4.0


def shoot_ours(chrome, v):
    (OUT / "ours").mkdir(parents=True, exist_ok=True)
    for attempt in range(3):
        chrome.navigate(f"{BASE}/?view={v}&step=last")
        if not chrome.wait_for("!!window.__player", 30):
            continue
        n = chrome.evaluate("window.__player.steps.length")
        chrome.evaluate(f"window.__player.set({n - 1})")
        time.sleep(2.8)  # draw-in animation settle
        p = OUT / "ours" / f"view_{v}.png"
        chrome.screenshot(p)
        # crop the sidebar off
        im = Image.open(p)
        im.crop((SIDEBAR, 0, im.width, im.height)).save(p)
        if not_blank(p):
            caps = chrome.evaluate(
                "window.__player.steps.map(s => s.caption || s.text || '')")
            (OUT / "ours" / f"steps_{v}.json").write_text(
                json.dumps({"n": n, "captions": caps}, indent=1))
            return True
        print(f"  view {v}: blank canvas, retry {attempt + 1}")
    return False


def shoot_live(chrome, v):
    (OUT / "live").mkdir(parents=True, exist_ok=True)
    for attempt in range(3):
        chrome.navigate(f"https://block.arch.ethz.ch/eq/drawing/view/{v}")
        ready = chrome.wait_for(
            "typeof ggbApplet==='object' && ggbApplet && "
            "typeof ggbApplet.getObjectNumber==='function' && ggbApplet.getObjectNumber()>0", 90)
        if not ready:
            print(f"  view {v}: live applet not ready, retry {attempt + 1}")
            continue
        time.sleep(3.5)
        bbox = chrome.evaluate(
            "(() => { const el = document.querySelector('article.geogebraweb');"
            " if (!el) return null; const r = el.getBoundingClientRect();"
            " return {x: r.x, y: r.y, width: r.width, height: r.height}; })()")
        p = OUT / "live" / f"view_{v}.png"
        chrome.screenshot(p, clip=bbox if bbox and bbox["width"] > 100 else None)
        if not_blank(p):
            return True
        print(f"  view {v}: blank live shot, retry {attempt + 1}")
    return False


def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else "both"
    views = ALL_VIEWS if (len(sys.argv) < 3 or sys.argv[2] == "all") \
        else [int(a) for a in sys.argv[2:]]
    if mode in ("ours", "both"):
        c = Chrome()
        for v in views:
            ok = shoot_ours(c, v)
            print(f"ours view {v}: {'ok' if ok else 'FAILED'}", flush=True)
        c.close()
    if mode in ("live", "both"):
        c = Chrome(w=1280, h=980)
        for v in views:
            ok = shoot_live(c, v)
            print(f"live view {v}: {'ok' if ok else 'FAILED'}", flush=True)
        c.close()


if __name__ == "__main__":
    main()
