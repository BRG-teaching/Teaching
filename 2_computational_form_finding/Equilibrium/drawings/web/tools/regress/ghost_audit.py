#!/usr/bin/env python3
"""Ghost-completeness audit (lens 3, part B).

For each view: load ?view=N&step=0 on the local server, jump to the FINAL step,
dump every dw element (name/kind/intro/outro/when-now/visible/ghosted/bbox/color/
dash), plus screenshots at step 1 (ghost preview) and the final step.

Outputs into OUTDIR: vN_elems.json, vN_s1.png, vN_final.png and a summary line
per view with candidate missing ghosts (ghostable-kind, visible at final, no
ghost twin, geometry inside the ghosted force-diagram bbox) and ghosted-but-
outroed violations.

Usage: ghost_audit.py OUTDIR N [N...]
"""
import base64, json, pathlib, sys, time

sys.path.insert(0, "/home/pv/brg/code/Teaching/2_computational_form_finding/Equilibrium/drawings/web/tools")
from make_movies import Chrome  # noqa: E402

BASE = "http://127.0.0.1:8741"

DUMP_JS = """
(() => {
  const dw = window.__dw, la = dw._lastApply || {};
  const out = [];
  for (const [name, e] of dw.elems) {
    const o = { name, kind: e.kind, intro: e.intro,
                outro: (e.outro === undefined || e.outro === Infinity) ? null : e.outro,
                when: !!e.when, vis: !!e.visible, ghost: !!e.ghostTwin,
                dash: !!e.dash };
    try { if (e.when && la.state) o.whenNow = !!e.when(la.state, la.d); } catch (err) { o.whenNow = 'ERR'; }
    if (typeof e.color === 'number') o.col = e.color;
    else if (e.color && e.color.final && la.d) { try { o.col = e.color.final(la.d); } catch (err) {} }
    const g = e.geo;
    const pts = [];
    if (g) {
      if (e.kind === 'seg') pts.push(g.p0, g.p1);
      else if (e.kind === 'arrow' || e.kind === 'darrow') pts.push(g.tail, g.tip);
      else if (e.kind === 'strokes') { for (const pr of g) if (pr && pr[0] && pr[1]) pts.push(pr[0], pr[1]); }
      else if (e.kind === 'dline' || e.kind === 'poly') { for (const p of g) pts.push(p); }
      else if (e.kind === 'dcircle' && g.c) pts.push([g.c[0]-g.r, g.c[1]-g.r], [g.c[0]+g.r, g.c[1]+g.r]);
      else if (Array.isArray(g) && g.length === 2 && typeof g[0] === 'number') pts.push(g);
    }
    const fin = pts.filter(p => p && isFinite(p[0]) && isFinite(p[1]));
    if (fin.length) {
      o.bb = [Math.min(...fin.map(p=>p[0])), Math.min(...fin.map(p=>p[1])),
              Math.max(...fin.map(p=>p[0])), Math.max(...fin.map(p=>p[1]))];
    }
    out.push(o);
  }
  return JSON.stringify({ step: la.k, n: window.__player.steps.length - 1, elems: out });
})()
"""


def audit_view(c, view, outdir):
    c.goto(f"{BASE}/?view={view}&step=0")
    n = c.evaluate("window.__player.steps.length - 1")
    # step 1 screenshot (ghost preview state)
    c.evaluate("window.__player.set(1)")
    time.sleep(2.6)
    c.screenshot(outdir / f"v{view}_s1.png")
    # final step
    c.evaluate(f"window.__player.set({n})")
    time.sleep(2.6)
    c.screenshot(outdir / f"v{view}_final.png")
    dump = json.loads(c.evaluate(DUMP_JS))
    (outdir / f"v{view}_elems.json").write_text(json.dumps(dump, indent=1))
    return dump


def analyse(view, dump):
    KINDS = {"seg", "arrow", "darrow", "strokes"}
    elems = dump["elems"]
    ghosted = [e for e in elems if e["ghost"]]
    gbbs = [e["bb"] for e in ghosted if e.get("bb")]
    if not gbbs:
        return {"view": view, "nsteps": dump["n"], "ghosted": 0, "note": "NO GHOSTS AT ALL",
                "candidates": [], "outro_ghosts": []}
    x0 = min(b[0] for b in gbbs); y0 = min(b[1] for b in gbbs)
    x1 = max(b[2] for b in gbbs); y1 = max(b[3] for b in gbbs)
    mx = 0.06 * max(x1 - x0, 1e-9); my = 0.10 * max(y1 - y0, 1e-9)
    rx0, ry0, rx1, ry1 = x0 - mx, y0 - my, x1 + mx, y1 + my
    cands = []
    for e in elems:
        if e["kind"] not in KINDS or e["ghost"] or not e["vis"]:
            continue
        if e["name"].startswith(("nq", "nf")):
            continue  # node-inspector arrows
        bb = e.get("bb")
        if not bb:
            continue
        inside = bb[0] >= rx0 and bb[1] >= ry0 and bb[2] <= rx1 and bb[3] <= ry1
        if inside:
            cands.append(e["name"])
    outro_ghosts = [e["name"] for e in ghosted if e["outro"] is not None]
    # ghosted elements not visible at final step and not when-gated off (i.e.
    # outroed) already covered; also report ghosted && !vis && !when (weird)
    dead_ghosts = [e["name"] for e in ghosted
                   if not e["vis"] and e["outro"] is None and not e["when"]]
    return {"view": view, "nsteps": dump["n"], "ghosted": len(ghosted),
            "force_bbox": [round(rx0,2), round(ry0,2), round(rx1,2), round(ry1,2)],
            "candidates": cands, "outro_ghosts": outro_ghosts, "dead_ghosts": dead_ghosts}


def main():
    outdir = pathlib.Path(sys.argv[1]); outdir.mkdir(parents=True, exist_ok=True)
    views = [int(a) for a in sys.argv[2:]]
    c = Chrome()
    results = []
    for v in views:
        try:
            dump = audit_view(c, v, outdir)
            r = analyse(v, dump)
        except Exception as ex:
            r = {"view": v, "error": str(ex)}
            # restart chrome for safety
            try: c.close()
            except Exception: pass
            c = Chrome()
        results.append(r)
        print(json.dumps(r), flush=True)
    (outdir / "summary.json").write_text(json.dumps(results, indent=1))
    c.close()


if __name__ == "__main__":
    main()
