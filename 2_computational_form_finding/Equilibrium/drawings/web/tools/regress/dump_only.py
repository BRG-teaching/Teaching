import json, pathlib, sys, time
sys.path.insert(0, "/home/pv/brg/code/Teaching/2_computational_form_finding/Equilibrium/drawings/web/tools")
from make_movies import Chrome
import ghost_audit as GA

outdir = pathlib.Path(sys.argv[1]); outdir.mkdir(parents=True, exist_ok=True)
views = [int(a) for a in sys.argv[2:]]
c = Chrome()
results = []
for v in views:
    try:
        c.goto(f"{GA.BASE}/?view={v}&step=0")
        n = c.evaluate("window.__player.steps.length - 1")
        c.evaluate(f"window.__player.set({n})")
        time.sleep(1.2)
        raw = c.evaluate(GA.DUMP_JS)
        dump = json.loads(raw)
        (outdir / f"v{v}_elems.json").write_text(json.dumps(dump, indent=1))
        r = GA.analyse(v, dump)
    except Exception as ex:
        r = {"view": v, "error": str(ex)[:200]}
        try: c.close()
        except Exception: pass
        c = Chrome()
    results.append(r)
    print(json.dumps(r), flush=True)
(outdir / "summary.json").write_text(json.dumps(results, indent=1))
c.close()
