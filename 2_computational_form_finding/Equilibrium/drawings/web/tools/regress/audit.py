#!/usr/bin/env python3
"""Audit UI controls: geogebra.xml + page.html vs web/views/view_N.js"""
import re, sys, os, json
import xml.etree.ElementTree as ET

BASE = "/home/pv/brg/code/Teaching/2_computational_form_finding/Equilibrium/drawings"

def applet_controls(n):
    path = f"{BASE}/view_{n}/applet_0/geogebra.xml"
    tree = ET.parse(path)
    root = tree.getroot()
    cons = root.find(".//construction")
    out = {"bools": [], "sliders": [], "buttons": [], "free_points": [], "path_points": []}
    # labels output by commands (derived objects)
    cmd_out = {}   # label -> command name
    for cmd in cons.iter("command"):
        name = cmd.get("name")
        o = cmd.find("output")
        if o is not None:
            for k, v in o.attrib.items():
                cmd_out[v] = name
    expr_labels = set()
    for ex in cons.iter("expression"):
        if ex.get("label"):
            expr_labels.add(ex.get("label"))
    for el in cons.iter("element"):
        t = el.get("type"); lbl = el.get("label")
        show = el.find("show")
        vis = show is not None and show.get("object") == "true"
        cap = el.find("caption")
        cap = cap.get("val") if cap is not None else None
        fixed = el.find("fixed")
        fixed = fixed is not None and fixed.get("val") == "true"
        cond = el.find("condition")
        cond = cond.get("showObject") if cond is not None else None
        if t == "boolean":
            val = el.find("value")
            val = val.get("val") if val is not None else None
            out["bools"].append(dict(label=lbl, val=val, caption=cap, visible=vis, cond=cond))
        elif t == "numeric" or t == "angle":
            sl = el.find("slider")
            if sl is None: continue
            anim = el.find("animation")
            step = anim.get("step") if anim is not None else None
            val = el.find("value")
            val = val.get("val") if val is not None else None
            absloc = sl.get("absoluteScreenLocation")
            x = sl.get("x"); y = sl.get("y")
            out["sliders"].append(dict(label=lbl, min=sl.get("min"), max=sl.get("max"),
                                       step=step, val=val, visible=vis, x=x, y=y,
                                       fixed=fixed, cond=cond, type=t))
        elif t == "button":
            out["buttons"].append(dict(label=lbl, caption=cap, visible=vis))
        elif t == "point":
            if fixed: continue
            if lbl in expr_labels: continue
            if lbl not in cmd_out:
                out["free_points"].append(dict(label=lbl, visible=vis, cond=cond))
            elif cmd_out[lbl] in ("Point", "PointIn"):
                out["path_points"].append(dict(label=lbl, visible=vis, cond=cond, cmd=cmd_out[lbl]))
    return out

def page_controls(n):
    path = f"{BASE}/view_{n}/page.html"
    try:
        html = open(path, encoding="utf-8", errors="replace").read()
    except FileNotFoundError:
        return {}
    m = re.findall(r'controls\["([^"]+)"\]\s*=\s*\{label:\s*"((?:[^"\\]|\\.)*)"\}', html)
    return dict(m)

def port_controls(n):
    path = f"{BASE}/web/views/view_{n}.js"
    src = open(path, encoding="utf-8").read()
    sliders = re.findall(r"panel\.slider\(\s*[\w.]+,\s*[\w.]+,\s*('?[^,']+'?),\s*(`[^`]*`|'[^']*')", src)
    toggles = re.findall(r"panel\.toggle\(\s*[\w.]+,\s*[\w.]+,\s*('?[^,']+'?),\s*(`[^`]*`|'[^']*')", src)
    buttons = re.findall(r"panel\.button\(\s*\w+,\s*'([^']*)'", src)
    dragged = bool(re.search(r"enableDrag", src))
    return dict(sliders=sliders, toggles=toggles, buttons=buttons, dragged=dragged)

views = [int(a) for a in sys.argv[1:]] or [n for n in range(1, 55) if n != 30]
for n in views:
    a = applet_controls(n)
    p = page_controls(n)
    w = port_controls(n)
    print(f"\n{'='*70}\nVIEW {n}")
    print(f"  page.html controls dict: {json.dumps(p, ensure_ascii=False)}")
    print("  XML booleans:")
    for b in a["bools"]:
        inpage = " [PAGE]" if b["label"] in p else ""
        print(f"    {b['label']}={b['val']} vis={b['visible']} cap={b['caption']!r}{inpage} cond={b['cond']}")
    print("  XML sliders:")
    for s in a["sliders"]:
        inpage = " [PAGE]" if s["label"] in p else ""
        hid = "" if s["visible"] else " HIDDEN"
        print(f"    {s['label']} [{s['min']}..{s['max']} step {s['step']}] ={s['val']} x={s['x']}{hid}{inpage} cond={s['cond']}")
    if a["buttons"]:
        print("  XML buttons: " + ", ".join(f"{b['label']}({b['caption']})" + (" [PAGE]" if b['label'] in p else "") for b in a["buttons"]))
    fp = [f"{q['label']}{'' if q['visible'] else '(hidden)'}" for q in a["free_points"]]
    pp = [f"{q['label']}{'' if q['visible'] else '(hidden)'}" for q in a["path_points"]]
    print(f"  free points: {', '.join(fp) if fp else '-'}")
    print(f"  path points: {', '.join(pp) if pp else '-'}")
    print(f"  PORT sliders: {[f'{k}:{lbl}' for k,lbl in w['sliders']]}")
    print(f"  PORT toggles: {[f'{k}:{lbl}' for k,lbl in w['toggles']]}")
    print(f"  PORT buttons: {w['buttons']}  drag={w['dragged']}")
