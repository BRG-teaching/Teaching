/**
 * Shared machinery for the EX X (Structural Design II, "Additional Exercises")
 * views of the FIRST HALF of the sheet — German tasks 1.1 … 9.
 *
 * Six of those eleven views are the same drawing: a pin-jointed structure on
 * the left, its member forces solved and coloured, and on the right one closed
 * force polygon per joint. What differs between them is the topology, the
 * loading and the one control the reader is given — so they are built from one
 * builder rather than written six times.
 *
 * TWO KINDS OF STRUCTURE go through it.
 *   - An ANALYSIS problem (a real truss) is solved by lib/truss.js.
 *   - A FORM-FINDING problem (an arch-and-tie, a lens, a funicular) is a
 *     mechanism, not a truss: it has fewer members than equilibrium equations
 *     and only stands up because its shape was chosen to suit the load. Those
 *     cases hand the builder their own `solve(s, M)`, which returns the forces
 *     the chosen shape implies. Everything downstream is identical.
 *
 * THE PART ORDER OF A JOINT POLYGON IS FROZEN PER CASE. A polygon closes in
 * any order, but `dw.link()` is declared once and the regression insists that
 * a polygon edge stays parallel to the member it stands for. Sorting the parts
 * by their force direction (which is what makes a tidy convex polygon) would
 * reshuffle the edges the moment a slider flipped a member's sign, and the
 * links would then be lying. So the order is computed ONCE, from each case's
 * default state, and reused for every state after that: convex where it
 * matters, and honest everywhere.
 *
 * EVERY CASE OWNS ITS OWN ELEMENTS, gated by `when`. Sharing element names
 * between cases would mean one `dw.link()` group standing for two different
 * members, which is exactly the failure the parallel-line regression exists to
 * catch.
 */

import { PAL } from './eqdraw.js';
import * as V from './vec.js';
import { analyse } from './truss.js';

/** The force vectors acting ON node i, in member order (load, reaction, then
 *  members by index). This order is canonical, not pretty; `orderOf` supplies
 *  the permutation that makes it pretty. */
export function rawParts(M, res, i) {
  const out = [];
  if (M.loads[i]) out.push({ kind: 'load', v: M.loads[i].slice(), name: 'load' });
  if (res.reactions[i]) out.push({ kind: 'reaction', v: res.reactions[i].slice(), name: 'reaction' });
  M.members.forEach(([a, b], m) => {
    if (a !== i && b !== i) return;
    const j = a === i ? b : a;
    const u = V.unit(V.sub(M.nodes[j], M.nodes[i]));
    out.push({ kind: 'member', m, v: V.mul(u, res.forces[m]) });
  });
  return out;
}

/** The permutation that draws these parts as a convex-ish closed polygon. */
export function orderOf(parts) {
  return parts.map((_, i) => i).sort((a, b) =>
    Math.atan2(parts[a].v[1], parts[a].v[0]) - Math.atan2(parts[b].v[1], parts[b].v[0]));
}

/** Chain a list of vectors tip to tail from `start`, at `1 / SFD` per kN. */
export function chainAt(start, parts, scale) {
  const pts = [start.slice()];
  for (const p of parts) {
    const q = pts[pts.length - 1];
    pts.push([q[0] + p.v[0] * scale, q[1] + p.v[1] * scale]);
  }
  return pts;
}

/**
 * The funicular of a set of vertical point loads hanging under a horizontal
 * thrust H, between two supports at the same or different levels.
 * Returns the node ordinates measured from the straight closing line.
 */
export function funicular(xs, Fs, x0, x1, H) {
  const tot = Fs.reduce((a, b) => a + b, 0);
  // reactions of a simply supported span under those loads: moments about the
  // RIGHT support give the LEFT reaction
  const R0 = xs.reduce((a, x, i) => a + Fs[i] * (x1 - x), 0) / (x1 - x0);
  const R1 = tot - R0;
  const M = (a) => {
    let m = R0 * (a - x0);
    xs.forEach((x, i) => { if (x < a - 1e-12) m -= Fs[i] * (a - x); });
    return m;
  };
  return { R0, R1, tot, M, y: xs.map((x) => M(x) / H), Mmax: Math.max(...xs.map(M)) };
}

// ---------------------------------------------------------------------------

const DEF_AT = { form: 1, load: 1, reac: 2, mem: 3, poly: 4 };

/**
 * cfg = {
 *   title, subtitle, about, frame, result(d),
 *   defaults,                       // the live state object
 *   caseOf(s) -> index,
 *   cases: [{
 *     tag, name, note,
 *     members, supports,            // topology: fixed per case
 *     nodes, loads,                 // the DEFAULT geometry / loading
 *     geom(s) -> nodes,             // optional, state-dependent
 *     load(s) -> loads,             // optional, state-dependent
 *     solve(s, M) -> {forces, reactions},   // optional: form-finding cases
 *     derive(s, M, res) -> {...},   // optional extra numbers for the captions
 *     poly: true,                   // draw the joint force polygons?
 *     MPU, ORG, SFD, cells,
 *     nodeName(i), reacName(i), nodeLabelOff(i), labelSide(m),
 *     reacLabelOff(i), supportDir(i), loadOff(i), loadLabel(i, mag, d),
 *     memLabel(m, d),
 *   }],
 *   steps, at, titlePos: {form, force, sub, note},
 *   controls(panel, s, refresh), declare(dw, s), extra(dw, d, s),
 * }
 */
export function makeJointTrussView(cfg) {
  const CS = cfg.cases;
  const AT = { ...DEF_AT, ...(cfg.at || {}) };

  const buildM = (C, s) => ({
    nodes: C.geom ? C.geom(s) : C.nodes,
    members: C.members,
    supports: C.supports,
    loads: C.load ? C.load(s) : C.loads,
  });

  const solveC = (C, s, M) => {
    if (C.solve) {
      const r = C.solve(s, M);
      const forces = r.forces;
      return {
        forces,
        reactions: r.reactions,
        zero: forces.map((f) => Math.abs(f) < 1e-7),
        resid: r.resid ?? 0,
        det: 0,
        nm: M.members.length,
        nn: M.nodes.length,
        nr: r.nr ?? 0,
        tmax: Math.max(0, ...forces),
        cmax: Math.min(0, ...forces),
        formFound: true,
      };
    }
    return { ...analyse(M), formFound: false };
  };

  // one reference solve per case, purely to freeze the polygon part order
  const PREP = CS.map((C) => {
    const M = buildM(C, cfg.defaults);
    const res = solveC(C, cfg.defaults, M);
    const parts = M.nodes.map((_, i) => rawParts(M, res, i));
    return { ord: parts.map(orderOf), np: parts.map((p) => p.length),
             fmax: Math.max(...res.forces.map(Math.abs), 1e-6) };
  });
  const FMAX = Math.max(...PREP.map((p) => p.fmax));

  function compute(s) {
    const ci = Math.round(cfg.caseOf(s));
    const C = CS[ci];
    const M = buildM(C, s);
    const res = solveC(C, s, M);
    // the live state is folded in first so captions can quote a slider
    // straight off `d`; everything computed overrides it
    const d = { ...s, ci, C, tag: C.tag, name: C.name, note: C.note,
                ...M, ...res, prep: PREP[ci],
                fmax: Math.max(...res.forces.map(Math.abs), 1e-6) };
    return C.derive ? { ...d, ...C.derive(s, M, res) } : d;
  }

  const meta = {
    title: cfg.title, subtitle: cfg.subtitle, about: cfg.about,
    result: cfg.result, frame: cfg.frame,
  };

  function create(dw, panel, makePlayer) {
    const s = { o1: true, lbl: true, zero: true, _k: 99, ...cfg.defaults };
    s.sIF = dw.bandScale(FMAX);
    const ARR = dw.W.arrow, NARR = dw.W.narrow;

    const shown = (c) => (st) => Math.round(cfg.caseOf(st)) === c;
    const colOf = (c, m) => ({ pending: PAL.black, final: (dd, st) => {
      if (st._k < AT.mem) return PAL.grey;
      const f = dd.forces[m];
      if (Math.abs(f) < 1e-7) return st.zero ? PAL.zero : PAL.grey;
      return f > 0 ? PAL.red : PAL.blue;
    } });
    const bandOf = (c, m) => ({ pending: PAL.zeroBand, final: (dd, st) => {
      if (st._k < AT.mem) return PAL.zeroBand;
      const f = dd.forces[m];
      if (Math.abs(f) < 1e-7) return PAL.zeroBand;
      return f > 0 ? PAL.redBand : PAL.blueBand;
    } });

    dw.label('form_title', '', { cls: 'title', flash: false });
    dw.label('force_title', '', { cls: 'title', flash: false });
    dw.label('force_sub', '', { cls: 'point', flash: false });
    dw.label('note', '', { cls: 'point', flash: false, color: PAL.grey });
    dw.label('lzero', '', { cls: 'num', intro: AT.mem, flash: false, color: PAL.zero });

    CS.forEach((C, c) => {
      const on = shown(c);
      C.members.forEach((mm, m) => {
        dw.poly(`bd${c}_${m}`, 4, { intro: AT.form, opacity: 1.0, z: -0.18, flash: false,
          color: bandOf(c, m), when: (st) => on(st) && st.o1 });
        dw.seg(`mm${c}_${m}`, { intro: AT.form, w: dw.W.bar, color: colOf(c, m), when: on });
        dw.highlight(`mm${c}_${m}`, [AT.mem]);
        dw.label(`lm${c}_${m}`, '', { cls: 'point', intro: AT.mem, flash: false,
          color: colOf(c, m), when: (st) => on(st) && st.lbl });
      });
      C.nodes.forEach((p, i) => {
        dw.disk(`nd${c}_${i}`, { intro: AT.form, r: dw.W.disk * 0.75, when: on });
        dw.label(`ln${c}_${i}`, C.nodeName ? C.nodeName(i) : '', { cls: 'point',
          intro: AT.form, when: (st) => on(st) && st.lbl });
      });
      for (const [k, kind] of Object.entries(C.supports)) {
        dw.strokes(`hat${c}_${k}`, 5, { intro: AT.form, w: dw.W.dim, color: PAL.grey,
          flash: false, when: on });
        if (kind !== 'pin') {
          dw.seg(`rol${c}_${k}`, { intro: AT.form, w: dw.W.thin, color: PAL.grey,
            flash: false, when: on });
        }
        dw.arrow(`re${c}_${k}`, { intro: AT.reac, color: PAL.green, ...NARR, when: on });
        dw.label(`lre${c}_${k}`, '', { cls: 'num', intro: AT.reac, color: PAL.green, when: on });
      }
      Object.keys(C.loads).forEach((k) => {
        dw.arrow(`fl${c}_${k}`, { intro: AT.load, color: PAL.green, ...ARR, when: on });
        dw.label(`lfl${c}_${k}`, '', { cls: 'num', intro: AT.load, color: PAL.green,
          when: (st) => on(st) && st.lbl });
      });
      if (!C.poly) return;
      const P = PREP[c];
      C.nodes.forEach((p, i) => {
        dw.strokes(`pg${c}_${i}`, P.np[i], { intro: AT.poly, w: dw.W.str,
          color: PAL.grey, flash: false, when: on });
        for (let e = 0; e < P.np[i]; e++) {
          dw.seg(`pe${c}_${i}_${e}`, { intro: AT.poly, w: dw.W.bar * 0.85,
            color: PAL.grey, flash: false, when: on });
        }
        dw.disk(`pd${c}_${i}`, { intro: AT.poly, r: dw.W.disk * 0.6, when: on });
        dw.label(`pl${c}_${i}`, '', { cls: 'point', intro: AT.poly, flash: false,
          color: PAL.grey, when: on });
      });
      // declare the counterparts: member <-> every polygon edge that stands
      // for it. The order is frozen above, so these stay true in every state.
      const edges = C.members.map(() => []);
      C.nodes.forEach((p, i) => {
        const raw = P.ord[i];
        raw.forEach((srcIdx, e) => {
          // srcIdx indexes the canonical part list; rebuild it to learn kinds
          const parts = rawPartsSkeleton(C, i);
          const pt = parts[srcIdx];
          if (pt && pt.kind === 'member') edges[pt.m].push(`pe${c}_${i}_${e}`);
        });
      });
      C.members.forEach((mm, m) => {
        if (edges[m].length) dw.link(`mm${c}_${m}`, `lm${c}_${m}`, ...edges[m]);
      });
      C.nodes.forEach((p, i) => {
        for (let e = 0; e < P.np[i]; e++) dw.ghostable(`pe${c}_${i}_${e}`);
      });
    });

    // the canonical part list of a case's node, WITHOUT solving: only the
    // kinds and member indices matter for the link declaration
    function rawPartsSkeleton(C, i) {
      const out = [];
      if (C.loads[i]) out.push({ kind: 'load' });
      if (C.supports[i]) out.push({ kind: 'reaction' });
      C.members.forEach(([a, b], m) => {
        if (a === i || b === i) out.push({ kind: 'member', m });
      });
      return out;
    }

    if (cfg.declare) cfg.declare(dw, s);
    dw.instant('form_title', 'force_title', 'force_sub', 'note');

    let d = null;
    function refresh() {
      s._k = player.k;
      d = compute(s);
      const C = d.C, c = d.ci;
      const ux = (p) => [C.ORG[0] + p[0] * C.MPU, C.ORG[1] + p[1] * C.MPU];
      const P = PREP[c];
      // the force scale may follow the state: a slider that triples every
      // member force would otherwise throw the polygons across each other
      const SFDv = typeof C.SFD === 'function' ? C.SFD(d) : C.SFD;

      dw.setLabel('form_title', cfg.titlePos.form);
      dw.setText('form_title', typeof cfg.formTitle === 'function'
        ? cfg.formTitle(d) : (cfg.formTitle || 'Form diagram 1:100'));
      dw.setLabel('force_title', cfg.titlePos.force);
      dw.setText('force_title', C.poly
        ? 'Force diagram — one closed polygon per joint'
        : 'Force diagram — printed on the sheet for this case');
      dw.setLabel('force_sub', cfg.titlePos.sub);
      dw.setText('force_sub', C.poly
        ? `1 unit ≙ ${SFDv.toFixed(SFDv < 10 ? 1 : 0)} kN  (sheet: 1 cm ≙ 10 kN)`
        : cfg.noPolyNote || '');
      dw.setLabel('note', cfg.titlePos.note);
      dw.setText('note', typeof d.note === 'function' ? d.note(d) : (d.note || ''));

      d.members.forEach(([i, j], m) => {
        const a = ux(d.nodes[i]), b = ux(d.nodes[j]);
        dw.setSeg(`mm${c}_${m}`, a, b);
        dw.setPoly(`bd${c}_${m}`, V.rectPoints(a, b, s.sIF * Math.abs(d.forces[m])));
        const side = C.labelSide ? C.labelSide(m) : 1;
        const nb = V.mul(V.unit(V.perp(V.sub(b, a))),
          side * (s.sIF * Math.abs(d.forces[m]) + 1.7));
        dw.setLabel(`lm${c}_${m}`, V.add(V.mid(a, b), nb));
        dw.setText(`lm${c}_${m}`, C.memLabel ? C.memLabel(m, d)
          : Math.abs(d.forces[m]) < 1e-7 ? '0' : d.forces[m].toFixed(1));
      });
      d.nodes.forEach((p, i) => {
        const q = ux(p);
        dw.setDisk(`nd${c}_${i}`, q);
        dw.setLabel(`ln${c}_${i}`, V.add(q, C.nodeLabelOff ? C.nodeLabelOff(i) : [0, 2.0]));
      });
      for (const [k, kind] of Object.entries(C.supports)) {
        const q = ux(d.nodes[+k]);
        const dir = C.supportDir ? C.supportDir(+k) : [0, -1];
        const pp = [-dir[1], dir[0]];
        const hb = V.add(q, V.mul(dir, 0.55));
        dw.setStrokes(`hat${c}_${k}`, V.hatch(V.add(hb, V.mul(pp, -1.8)),
          V.add(hb, V.mul(pp, 1.8)), -1, 0.95, 5));
        if (kind !== 'pin') {
          const base = V.add(q, V.mul(dir, 1.5));
          dw.setSeg(`rol${c}_${k}`, V.add(base, V.mul(pp, -1.9)), V.add(base, V.mul(pp, 1.9)));
        }
        const v = d.reactions[+k] || [0, 0];
        const mag = Math.hypot(v[0], v[1]);
        const u = mag > 1e-6 ? V.unit(v) : [0, 1];
        dw.setArrow(`re${c}_${k}`, V.sub(q, V.mul(u, 4.8)), V.sub(q, V.mul(u, 1.2)));
        dw.setLabel(`lre${c}_${k}`, V.add(V.sub(q, V.mul(u, 4.4)),
          C.reacLabelOff ? C.reacLabelOff(+k) : [-3.4, -0.6]));
        const rn = C.reacName ? C.reacName(+k) : (C.nodeName ? C.nodeName(+k) : k);
        dw.setText(`lre${c}_${k}`, `${rn} = ${mag.toFixed(2)}`);
      }
      Object.entries(d.loads).forEach(([k, v]) => {
        const q = ux(d.nodes[+k]);
        const mag = Math.hypot(v[0], v[1]);
        const u = mag > 1e-9 ? V.unit(v) : [0, -1];
        const tail = V.sub(q, V.mul(u, 5.0));
        dw.setArrow(`fl${c}_${k}`, tail, V.sub(q, V.mul(u, 0.6)));
        dw.setLabel(`lfl${c}_${k}`, V.add(tail, C.loadOff ? C.loadOff(+k) : [2.4, 0.6]));
        dw.setText(`lfl${c}_${k}`, C.loadLabel ? C.loadLabel(+k, mag, d)
          : `${mag.toFixed(1)} kN`);
      });
      const nz = d.zero.filter(Boolean).length;
      dw.setLabel('lzero', cfg.titlePos.zero || [0, 0]);
      dw.setText('lzero', d.members.length === 0 ? ''
        : nz ? `${nz} zero-force member${nz > 1 ? 's' : ''}`
        : 'no zero-force members');

      if (C.poly) {
        const cells = typeof C.cells === 'function' ? C.cells(d) : C.cells;
        d.nodes.forEach((p, i) => {
          const raw = rawParts(d, d, i);
          const parts = P.ord[i].map((ix) => raw[ix]);
          const pts = chainAt(cells[i], parts, 1 / SFDv);
          dw.setStrokes(`pg${c}_${i}`, pts.slice(0, -1).map((q, e) => [q, pts[e + 1]]));
          parts.forEach((q, e) => {
            dw.setSeg(`pe${c}_${i}_${e}`, pts[e], pts[e + 1]);
            const el = dw.elems.get(`pe${c}_${i}_${e}`);
            el.color = q.kind !== 'member' ? PAL.green
              : Math.abs(d.forces[q.m]) < 1e-7 ? PAL.zero
              : d.forces[q.m] > 0 ? PAL.red : PAL.blue;
            el.mats[0].color.setHex(el.color);
          });
          dw.setDisk(`pd${c}_${i}`, cells[i]);
          dw.setLabel(`pl${c}_${i}`, V.add(cells[i], C.cellLabelOff || [0, 3.2]));
          dw.setText(`pl${c}_${i}`, `joint ${C.nodeName ? C.nodeName(i) : i}`);
        });
      }

      if (cfg.extra) cfg.extra(dw, d, s);
      panel.syncAll();
      player.apply(d, s);
    }

    const player = makePlayer(cfg.steps, refresh);
    if (cfg.controls) cfg.controls(panel, s, refresh);
    const look = panel.section('How it is drawn');
    panel.toggle(look, s, 'o1', 'thickness ∝ force (off: uniform)', refresh);
    panel.slider(look, s, 'sIF', 'scale the force bands', 0, s.sIF * 2.5, s.sIF / 20, refresh);
    panel.toggle(look, s, 'zero', 'grey out the zero-force members', refresh);
    panel.toggle(look, s, 'lbl', 'show labels', refresh);

    refresh();
    return player;
  }

  return { meta, create };
}
