#!/usr/bin/env python3
"""Drive the LIVE ETH applet for view N through a list of states; dump every
object (value/coords/visible/color) + a screenshot per state.

Usage: live_dump.py N OUTDIR [script.json]
  script.json: [{"name": "default"},
                {"name": "s2", "set": {"step": 3}, "coords": {"E_2": [15.0, 2.35]}}, ...]
  Without a script: dumps the default state only.

Run with /home/pv/brg/code/Teaching/.venv/bin/python (needs websocket-client).
GOTCHAS (from earlier sessions): wrap per-object reads in try/catch (some applets
throw IllegalArgument); json.dumps booleans (False -> JS false); random CDP port +
own user-data-dir (parallel agents may share the machine); verify the tab URL
before every batch.
"""
import base64, json, pathlib, sys, time

sys.path.insert(0, "/home/pv/brg/code/Teaching/2_computational_form_finding/Equilibrium/drawings/web/tools")
from make_movies import Chrome  # noqa: E402

DUMP_JS = """
(() => {
  const out = {};
  const n = ggbApplet.getObjectNumber();
  for (let i = 0; i < n; i++) {
    const nm = ggbApplet.getObjectName(i);
    const o = { t: ggbApplet.getObjectType(nm) };
    try { o.vis = ggbApplet.getVisible(nm); } catch (e) {}
    try { o.col = ggbApplet.getColor(nm); } catch (e) {}
    try {
      if (o.t === 'numeric' || o.t === 'angle' || o.t === 'boolean')
        o.val = ggbApplet.getValue(nm);
      else { o.x = ggbApplet.getXcoord(nm); o.y = ggbApplet.getYcoord(nm);
             if (o.x === 0 && o.y === 0 && o.t !== 'point') { delete o.x; delete o.y; } }
    } catch (e) {}
    try { const s = ggbApplet.getValueString(nm); if (s && s.length < 300) o.str = s; } catch (e) {}
    out[nm] = o;
  }
  return JSON.stringify(out);
})()
"""


def main():
    view = int(sys.argv[1])
    outdir = pathlib.Path(sys.argv[2]); outdir.mkdir(parents=True, exist_ok=True)
    states = [{"name": "default"}]
    if len(sys.argv) > 3:
        states = json.load(open(sys.argv[3]))

    c = Chrome()
    url = f"https://block.arch.ethz.ch/eq/drawing/view/{view}"
    c.send("Page.navigate", url=url)
    for _ in range(200):
        try:
            if c.evaluate("typeof ggbApplet==='object' && ggbApplet && ggbApplet.getObjectNumber() > 0"):
                break
        except Exception:
            pass
        time.sleep(0.3)
    time.sleep(4)  # let page-init scripts run
    assert c.evaluate("location.href").startswith(url), "tab was hijacked"

    for st in states:
        for k, v in (st.get("set") or {}).items():
            c.evaluate(f"ggbApplet.setValue({json.dumps(k)}, {json.dumps(v)})")
        for k, xy in (st.get("coords") or {}).items():
            c.evaluate(f"ggbApplet.setCoords({json.dumps(k)}, {xy[0]}, {xy[1]})")
        time.sleep(1.5)
        dump = c.evaluate(DUMP_JS)
        (outdir / f"{st['name']}.json").write_text(dump)
        bbox = c.evaluate("(() => { const el = document.querySelector('article.geogebraweb');"
                          " const r = el.getBoundingClientRect();"
                          " return {x:r.x, y:r.y, width:r.width, height:r.height}; })()")
        img = c.send("Page.captureScreenshot", format="png", clip={**bbox, "scale": 1})["data"]
        (outdir / f"{st['name']}.png").write_bytes(base64.b64decode(img))
        print(f"state {st['name']}: dumped", flush=True)
    c.close()


if __name__ == "__main__":
    main()
