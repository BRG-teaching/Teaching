/**
 * The shared body of the EX 6 truss views (tasks 2, 3 and 4).
 *
 * All three sheets ask for exactly the same three things — global equilibrium,
 * the zero-force members, then the internal forces node by node with the
 * matching force diagram — so they are one view built three times rather than
 * three views that happen to look alike.
 *
 * The force diagram is drawn the way the sheet asks for it: a grid of JOINT
 * polygons, one per joint, in the order a student can actually solve them (a
 * joint is only drawable once at most two of its members are still unknown).
 * Every edge of every polygon is parallel to the member it belongs to, and
 * carries that member's colour, so the reciprocity is visible at a glance.
 *
 * MODULE SIZE. The sheet's trusses are drawn with a panel of 75.57 pt, which
 * is 2.667 m at the stated 1:100 — not a round number, while every other
 * dimension on the sheet is. The panels are square with 45° diagonals, so the
 * member forces depend only on the geometry's RATIOS and are identical either
 * way; the views use a round 2.500 m, which also makes the spans 10.00 m and
 * agrees with sheet EX 7's beams. This is recorded rather than hidden.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';
import { analyse, polygonAt, chain } from '../lib/truss.js';

export function makeTrussView(cfg) {
  const { nodes, members, supports, loads, MPU, ORG, cells, SFD, frame,
          nodeName, steps, extra } = cfg;

  const model = { nodes, members, supports, loads };
  const res0 = analyse(model);

  const ux = (p) => [ORG[0] + p[0] * MPU, ORG[1] + p[1] * MPU];

  const meta = {
    title: cfg.title,
    subtitle: cfg.subtitle,
    about: cfg.about,
    result: (d) => cfg.result(d),
    frame,
  };

  function compute(s) {
    const L = {};
    for (const [k, v] of Object.entries(loads)) L[k] = [v[0] * s.scale, v[1] * s.scale];
    const r = analyse({ nodes, members, supports, loads: L });
    return { ...r, loads: L, nodes, members, supports,
             fmax: Math.max(...r.forces.map(Math.abs), 1e-6) };
  }

  function create(dw, panel, makePlayer) {
    const s = { scale: 1, o1: true, sIF: 0.02, lbl: true, zero: true, _k: 99 };
    s.sIF = dw.bandScale(compute(s).fmax);
    const ARR = dw.W.arrow, NARR = dw.W.narrow;
    const FIRST_NODE = steps.length;               // where the node walk starts

    // THE FORM AND THE FORCE DIAGRAM HAVE TO GROW TOGETHER. A member stays grey
    // until the joint that actually solves it is reached, and at that step it
    // takes its colour, its number appears, it flashes, and the matching edge
    // of that joint's polygon is drawn beside it. Every member is also LINKED
    // to every polygon edge that stands for it, so hovering either highlights
    // the whole family.
    const solvedAt = members.map(() => FIRST_NODE + res0.order.length - 1);
    res0.order.forEach((o, k) => {
      for (const m of o.solved) solvedAt[m] = Math.min(solvedAt[m], FIRST_NODE + k);
    });
    const edgesOf = members.map(() => []);
    res0.order.forEach((o, k) => {
      polygonAt(model, res0, o.node).forEach((part, e) => {
        if (part.kind === 'member') edgesOf[part.m].push(`pe${k}_${e}`);
      });
    });

    const colOf = (m) => ({ pending: PAL.black, final: (dd, st) => {
      if (st._k < solvedAt[m]) return PAL.grey;
      const f = dd.forces[m];
      if (Math.abs(f) < 1e-7) return st.zero ? PAL.zero : PAL.grey;
      return f > 0 ? PAL.red : PAL.blue;
    } });
    const bandOf = (m) => ({ pending: PAL.zeroBand, final: (dd, st) => {
      if (st._k < solvedAt[m]) return PAL.zeroBand;
      const f = dd.forces[m];
      if (Math.abs(f) < 1e-7) return PAL.zeroBand;
      return f > 0 ? PAL.redBand : PAL.blueBand;
    } });

    dw.label('form_title', 'Form diagram 1:100', { cls: 'title', flash: false });
    dw.label('force_title', 'Force diagram — one polygon per joint', { cls: 'title', flash: false });
    dw.label('force_sub', '', { cls: 'point', flash: false });

    members.forEach((mm, m) => {
      dw.poly(`bd${m}`, 4, { intro: 1, opacity: 1.0, z: -0.18, flash: false,
        color: bandOf(m), when: (st) => st.o1 });
      dw.seg(`mem${m}`, { intro: 1, w: dw.W.bar, color: colOf(m) });
      dw.highlight(`mem${m}`, [solvedAt[m]]);
      dw.label(`lm${m}`, '', { cls: 'point', intro: solvedAt[m], flash: false,
        color: colOf(m), when: (st) => st.lbl });
    });
    nodes.forEach((p, i) => {
      dw.disk(`nd${i}`, { intro: 1, r: dw.W.disk * 0.75 });
      dw.label(`lnd${i}`, nodeName(i), { cls: 'point', intro: 1, when: (st) => st.lbl });
    });
    for (const [k, kind] of Object.entries(supports)) {
      dw.strokes(`hat${k}`, 5, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
      if (kind !== 'pin') dw.seg(`roll${k}`, { intro: 1, w: dw.W.thin, color: PAL.grey, flash: false });
    }
    Object.keys(loads).forEach((k) => {
      dw.arrow(`f${k}`, { intro: 1, color: PAL.green, ...ARR });
      dw.label(`lf${k}`, '', { cls: 'num', intro: 1, color: PAL.green, when: (st) => st.lbl });
    });
    Object.keys(supports).forEach((k) => {
      dw.arrow(`re${k}`, { intro: 2, color: PAL.green, ...NARR });
      dw.label(`lre${k}`, '', { cls: 'num', intro: 2, color: PAL.green });
    });
    dw.label('lzero', '', { cls: 'num', intro: 3, flash: false, color: PAL.zero });

    // one polygon per joint, in solve order, each in its own cell
    res0.order.forEach((o, k) => {
      const at = polygonAt(model, res0, o.node).length;
      dw.strokes(`pg${k}`, at + 1, { intro: FIRST_NODE + k, w: dw.W.str,
        color: PAL.grey, flash: false });
      for (let e = 0; e < at; e++) {
        dw.seg(`pe${k}_${e}`, { intro: FIRST_NODE + k, w: dw.W.bar * 0.85,
          color: PAL.grey, flash: false });
      }
      dw.label(`pl${k}`, '', { cls: 'point', intro: FIRST_NODE + k, flash: false, color: PAL.grey });
      dw.disk(`pd${k}`, { intro: FIRST_NODE + k, r: dw.W.disk * 0.6 });
    });

    members.forEach((mm, m) => {
      if (edgesOf[m].length) dw.link(`mem${m}`, `lm${m}`, ...edgesOf[m]);
    });

    dw.instant('form_title', 'force_title', 'force_sub');

    let d = null;
    function refresh() {
      s._k = player.k;
      d = compute(s);
      dw.setLabel('form_title', cfg.titlePos[0]);
      dw.setLabel('force_title', cfg.titlePos[1]);
      dw.setLabel('force_sub', cfg.titlePos[2]);
      dw.setText('force_sub', `1 unit ≙ ${SFD} kN  (sheet: 1 cm ≙ 10 kN)`);

      members.forEach(([i, j], m) => {
        const a = ux(nodes[i]), b = ux(nodes[j]);
        dw.setSeg(`mem${m}`, a, b);
        dw.setPoly(`bd${m}`, V.rectPoints(a, b, s.sIF * Math.abs(d.forces[m])));
        const side = cfg.labelSide ? cfg.labelSide(m) : 1;
        const nb = V.mul(V.unit(V.perp(V.sub(b, a))),
          side * (s.sIF * Math.abs(d.forces[m]) + 1.7));
        dw.setLabel(`lm${m}`, V.add(V.mid(a, b), nb));
        dw.setText(`lm${m}`, Math.abs(d.forces[m]) < 1e-7 ? '0' : d.forces[m].toFixed(1));
      });
      nodes.forEach((p, i) => {
        const q = ux(p);
        dw.setDisk(`nd${i}`, q);
        dw.setLabel(`lnd${i}`, V.add(q, cfg.nodeLabelOff(i)));
      });
      for (const [k, kind] of Object.entries(supports)) {
        const q = ux(nodes[+k]);
        const dir = cfg.supportDir ? cfg.supportDir(+k) : [0, -1];
        const perp = [-dir[1], dir[0]];
        const hb = V.add(q, V.mul(dir, 0.55));
        dw.setStrokes(`hat${k}`, V.hatch(V.add(hb, V.mul(perp, -1.8)),
          V.add(hb, V.mul(perp, 1.8)), -1, 0.95, 5));
        if (kind !== 'pin') {
          const base = V.add(q, V.mul(dir, 1.5));
          dw.setSeg(`roll${k}`, V.add(base, V.mul(perp, -1.9)), V.add(base, V.mul(perp, 1.9)));
        }
      }
      Object.entries(d.loads).forEach(([k, v]) => {
        const q = ux(nodes[+k]);
        const u = V.unit(v);
        const tail = V.sub(q, V.mul(u, 4.0));
        dw.setArrow(`f${k}`, tail, q);
        dw.setLabel(`lf${k}`, V.add(tail, [2.2, 0.4]));
        dw.setText(`lf${k}`, `${Math.hypot(v[0], v[1]).toFixed(0)} kN`);
      });
      Object.keys(supports).forEach((k) => {
        const q = ux(nodes[+k]);
        const v = d.reactions[+k] || [0, 0];
        const mag = Math.hypot(v[0], v[1]);
        const u = mag > 1e-6 ? V.unit(v) : [0, 1];
        // stop short of the joint, or the disk swallows the arrowhead
        dw.setArrow(`re${k}`, V.sub(q, V.mul(u, 4.6)), V.sub(q, V.mul(u, 1.1)));
        dw.setLabel(`lre${k}`, V.add(V.sub(q, V.mul(u, 4.2)), cfg.reacLabelOff(+k)));
        dw.setText(`lre${k}`, `${nodeName(+k)} = ${mag.toFixed(1)}`);
      });
      const nz = d.zero.filter(Boolean).length;
      dw.setLabel('lzero', cfg.zeroLabelPos);
      dw.setText('lzero', nz ? `${nz} zero-force members` : 'no zero-force members');

      res0.order.forEach((o, k) => {
        const parts = polygonAt(model, d, o.node);
        const cell = cells[k] || [0, 0];
        const pts = chain(cell, parts, 1 / SFD);
        // close it back to the start so the polygon reads as closed
        dw.setStrokes(`pg${k}`, pts.slice(0, -1).map((p, e) => [p, pts[e + 1]])
          .concat([[pts[pts.length - 1], pts[0]]]));
        parts.forEach((p, e) => {
          dw.setSeg(`pe${k}_${e}`, pts[e], pts[e + 1]);
          const el = dw.elems.get(`pe${k}_${e}`);
          el.color = p.kind === 'member'
            ? (Math.abs(d.forces[p.m]) < 1e-7 ? PAL.zero : d.forces[p.m] > 0 ? PAL.red : PAL.blue)
            : PAL.green;
          el.mats[0].color.setHex(el.color);
        });
        dw.setDisk(`pd${k}`, cell);
        dw.setLabel(`pl${k}`, V.add(cell, cfg.cellLabelOff || [0, -3.4]));
        dw.setText(`pl${k}`, `joint ${nodeName(o.node)}`);
      });

      if (extra) extra(dw, d, s);
      panel.syncAll();
      player.apply(d, s);
    }

    const allSteps = [...steps, ...res0.order.map((o, k) => cfg.nodeStep(o, k))];
    const player = makePlayer(allSteps, refresh);

    const par = panel.section('Given');
    panel.slider(par, s, 'scale', 'load factor', 0.25, 2.5, 0.05, refresh);
    panel.toggle(par, s, 'o1', 'thickness ∝ force (off: uniform)', refresh);
    panel.slider(par, s, 'sIF', 'scale internal forces', 0, s.sIF * 2.5, s.sIF / 20, refresh);
    panel.toggle(par, s, 'zero', 'grey out the zero-force members', refresh);
    panel.toggle(par, s, 'lbl', 'show labels', refresh);

    refresh();
    return player;
  }

  return { meta, create, res0 };
}
