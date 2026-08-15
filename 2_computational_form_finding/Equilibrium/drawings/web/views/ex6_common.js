/**
 * The shared body of the EX 6 truss views (tasks 2, 3, 4 and the creative task).
 *
 * All four sheets ask for exactly the same three things — global equilibrium,
 * the zero-force members, then the internal forces node by node with the
 * matching force diagram — so they are one view built four times rather than
 * four views that happen to look alike.
 *
 * THE FORCE DIAGRAM IS ONE CREMONA, which is what the sheets draw and what the
 * exercise exists to teach. An earlier version of this file drew a row of
 * disjoint little joint polygons and claimed in this docstring that that was
 * "the way the sheet asks for it". That was wrong twice over: the sheets draw a
 * single nested reciprocal figure, and task c) says "complete the force
 * diagram", singular. A grid of separate polygons gets every number right and
 * hides the one idea worth having — that the joints SHARE their edges, so the
 * whole structure is one drawing. The construction now lives in
 * `../lib/cremona.js`; this file is only the view that draws what it returns.
 *
 * What that means on screen. Every FACE of the form diagram — the spaces
 * between the external forces round the outside, and each triangular panel
 * inside — becomes ONE POINT. Every member is the wall between two faces, and
 * the segment joining those two points IS its force: parallel to the member, to
 * scale, navy in compression and pink in tension. The outer points, chained in
 * order round the outside, ARE the load line: the loads down one side, the
 * reactions back up the other. A member carrying nothing gives two faces at the
 * same point and a segment of zero length — the drawing saying "zero" in its
 * own language. Bow's notation names the spaces (letters outside, numbers
 * inside) in both diagrams, so a member can be pointed to as "the segment 1-e".
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
import { analyse } from '../lib/truss.js';
import { cremona } from '../lib/cremona.js';

export function makeTrussView(cfg) {
  const { nodes, members, supports, loads, MPU, ORG, SFD, frame,
          nodeName, steps, extra } = cfg;
  const FC = cfg.fdCenter;                  // world point the Cremona centres on
  const GLOBAL = cfg.globalStep ?? 2;       // the step that lays the load line

  const model = { nodes, members, supports, loads };
  const res0 = analyse(model);
  const C0 = cremona(model, res0);

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
    const C = cremona({ nodes, members, supports, loads: L }, r);
    return { ...r, loads: L, nodes, members, supports, C,
             fmax: Math.max(...r.forces.map(Math.abs), 1e-6) };
  }

  function create(dw, panel, makePlayer) {
    const s = { scale: 1, o1: true, sIF: 0.02, lbl: true, zero: true, bow: true, _k: 99 };
    s.sIF = dw.bandScale(compute(s).fmax);
    const ARR = dw.W.arrow, NARR = dw.W.narrow;
    const FIRST_NODE = steps.length;               // where the node walk starts

    // THE FORM AND THE FORCE DIAGRAM HAVE TO GROW TOGETHER. A member stays grey
    // until the joint that actually solves it is reached, and at that step it
    // takes its colour, its number appears, it flashes, and its segment of the
    // Cremona is drawn at the same moment. Every member is LINKED to that
    // segment, so hovering either highlights both — and the parallel regression
    // then has something to insist on.
    const solvedAt = members.map(() => FIRST_NODE + res0.order.length - 1);
    res0.order.forEach((o, k) => {
      for (const m of o.solved) solvedAt[m] = Math.min(solvedAt[m], FIRST_NODE + k);
    });
    // a space's point is fixed either by the load line (stage −1) or by the
    // joint that closes on it; a member's segment needs both of its points
    const ptAt = C0.stage.map((k) => (k < 0 ? GLOBAL : FIRST_NODE + k));
    const segAt = members.map((mm, m) =>
      Math.max(solvedAt[m], ptAt[C0.seg[m].left], ptAt[C0.seg[m].right]));

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
    dw.label('force_title', 'Force diagram — one Cremona diagram', { cls: 'title', flash: false });
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

    // ---------------------------------------------------------------------
    // THE CREMONA. One point per space, one segment per member, the external
    // forces chained round the outside into the load line, and — while the
    // walk is running — the current joint's own polygon traced in grey through
    // the points it borrows.
    // ---------------------------------------------------------------------
    const RING = Math.max(...C0.ring.map((r) => r.length));
    dw.strokes('fring', RING, { intro: FIRST_NODE, w: dw.W.dim * 1.4, color: PAL.grey,
      flash: false, when: (st) => st._k >= FIRST_NODE });
    C0.ext.forEach((e, k) => {
      dw.arrow(`fext${k}`, { intro: GLOBAL, color: PAL.green, ...NARR });
      dw.label(`lfext${k}`, e.kind === 'load' ? '' : '', { cls: 'num', intro: GLOBAL,
        color: PAL.green, flash: false, when: (st) => st.lbl });
    });
    members.forEach((mm, m) => {
      dw.seg(`fseg${m}`, { intro: segAt[m], w: dw.W.bar * 0.9, color: colOf(m) });
    });
    C0.pts.forEach((p, f) => {
      dw.disk(`fpt${f}`, { intro: ptAt[f], r: dw.W.disk * 0.5 });
      dw.label(`fpl${f}`, '', { cls: 'point', intro: ptAt[f], flash: false,
        color: PAL.grey, when: (st) => st.bow });
      // the same space named in the FORM diagram — that pairing IS Bow's notation
      dw.label(`bl${f}`, C0.name[f], { cls: 'point', intro: GLOBAL, flash: false,
        color: PAL.grey, when: (st) => st.bow });
    });

    members.forEach((mm, m) => dw.link(`mem${m}`, `lm${m}`, `fseg${m}`));
    C0.ext.forEach((e, k) => {
      dw.link(e.kind === 'load' ? `f${e.node}` : `re${e.node}`, `fext${k}`, `lfext${k}`);
    });
    dw.ghostable(...members.map((mm, m) => `fseg${m}`),
                 ...C0.ext.map((e, k) => `fext${k}`));

    dw.instant('form_title', 'force_title', 'force_sub');

    let d = null;
    function refresh() {
      s._k = player.k;
      d = compute(s);
      const C = d.C;
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
        const tail = V.sub(q, V.mul(u, 3.2));
        dw.setArrow(`f${k}`, tail, q);
        dw.setLabel(`lf${k}`, V.add(tail, [2.2, 0.4]));
        dw.setText(`lf${k}`, `${Math.hypot(v[0], v[1]).toFixed(0)} kN`);
      });
      Object.keys(supports).forEach((k) => {
        const q = ux(nodes[+k]);
        const v = d.reactions[+k] || [0, 0];
        const mag = Math.hypot(v[0], v[1]);
        const u = mag > 1e-6 ? V.unit(v) : [0, 1];
        // Stop short of the joint, or the disk swallows the arrowhead. `reacOff`
        // steps a reaction aside when its line of action runs along a member,
        // and `reacFlip` hangs it off the far side of the joint instead of
        // approaching from behind — same direction, so it stays the same force,
        // but it no longer has to be drawn through the structure.
        const ro = cfg.reacOff ? cfg.reacOff(+k) : [0, 0];
        const fl = !!(cfg.reacFlip && cfg.reacFlip(+k));
        const at = (t) => V.add(V.add(q, V.mul(u, fl ? t : -t)), ro);
        dw.setArrow(`re${k}`, at(fl ? 1.0 : 4.0), at(fl ? 4.0 : 1.0));
        dw.setLabel(`lre${k}`, V.add(at(3.7), cfg.reacLabelOff(+k)));
        dw.setText(`lre${k}`, `${nodeName(+k)} = ${mag.toFixed(1)}`);
      });
      const nz = d.zero.filter(Boolean).length;
      dw.setLabel('lzero', cfg.zeroLabelPos);
      dw.setText('lzero', nz ? `${nz} zero-force members` : 'no zero-force members');

      // ---- the Cremona, centred on its own bounding box so it stays put ----
      const xs = C.pts.map((p) => p[0]), ys = C.pts.map((p) => p[1]);
      const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
      const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
      const fx = (p) => [FC[0] + (p[0] - cx) / SFD, FC[1] + (p[1] - cy) / SFD];
      const P = C.pts.map(fx);

      // the load line: loads on one side of it, reactions on the other, exactly
      // as the sheet draws them, so the two chains do not sit on top of one another
      const EOF = cfg.extOff ?? 0.5;
      C.ext.forEach((e, k) => {
        const a = P[e.from], b = P[e.to];
        const n = V.mul(V.unit(V.perp(V.sub(b, a))), -EOF);
        dw.setArrow(`fext${k}`, V.add(a, n), V.add(b, n));
        dw.setLabel(`lfext${k}`, V.add(V.add(V.mid(a, b), V.mul(n, 2.2)),
          cfg.extLabelOff ? cfg.extLabelOff(e, k) : [0, 0]));
        dw.setText(`lfext${k}`, e.kind === 'load'
          ? `${Math.hypot(...e.v).toFixed(0)}`
          : `${nodeName(e.node)} ${Math.hypot(...e.v).toFixed(1)}`);
      });

      members.forEach((mm, m) => {
        dw.setSeg(`fseg${m}`, P[C.seg[m].left], P[C.seg[m].right]);
      });

      // spaces whose points coincide (a zero-force member between them) get one
      // shared label, "3=4", rather than two labels fighting over one dot
      const key = (p) => `${p[0].toFixed(4)},${p[1].toFixed(4)}`;
      const same = new Map();
      P.forEach((p, f) => {
        const k = key(p);
        if (!same.has(k)) same.set(k, []);
        same.get(k).push(f);
      });
      const cenx = P.reduce((t, p) => t + p[0], 0) / P.length;
      const ceny = P.reduce((t, p) => t + p[1], 0) / P.length;
      P.forEach((p, f) => {
        dw.setDisk(`fpt${f}`, p);
        const grp = same.get(key(p));
        const away = V.sub(p, [cenx, ceny]);
        const off = V.len(away) > 1e-6 ? V.mul(V.unit(away), 1.6) : [0, -1.6];
        dw.setLabel(`fpl${f}`, V.add(p, cfg.fdLabelOff ? cfg.fdLabelOff(f, off) : off));
        dw.setText(`fpl${f}`, grp[0] === f ? grp.map((g) => C.name[g]).join('=') : '');
        const bp = C.at[f] || [0, 0];
        dw.setLabel(`bl${f}`, V.add(ux(bp), V.mul(C.nrm[f], cfg.bowOff ?? 2.6)));
      });

      // the joint being solved, traced through the points it shares
      const cyc = s._k >= FIRST_NODE && res0.order[s._k - FIRST_NODE]
        ? C.ring[res0.order[s._k - FIRST_NODE].node] : [];
      const pairs = [];
      for (let t = 0; t < RING; t++) {
        pairs.push(t < cyc.length ? [P[cyc[t].from], P[cyc[t].to]]
                                  : [P[0], P[0]]);
      }
      dw.setStrokes('fring', pairs);

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
    panel.toggle(par, s, 'bow', "show Bow's notation (the space names)", refresh);
    panel.toggle(par, s, 'lbl', 'show labels', refresh);

    refresh();
    return player;
  }

  return { meta, create, res0, C0 };
}
