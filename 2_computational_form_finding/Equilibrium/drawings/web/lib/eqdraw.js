/**
 * eqdraw.js -- shared viewer library for the eQUILIBRIUM step-by-step drawings.
 *
 * Each drawing lives in views/view_N.js and only declares:
 *   - its construction math (compute(state) -> derived geometry)
 *   - its elements (bars, force segments, nodes, arrows, guides, labels)
 *     with the construction step at which each appears
 *   - its step captions and side-panel controls (sliders / toggles)
 *
 * This library provides everything else:
 *   - three.js scene: white background, ground grid, perspective camera + orbit
 *   - primitives drawn in the z=0 plane (quad "thick" segments, disks, arrows,
 *     dashed circles, fan polygons) + crisp DOM labels projected onto the canvas
 *   - the color scheme (regraded 2026-08-14 to the reference video):
 *       navy = compression, pink = tension, green = loads, grey = guides,
 *       black = element(s) added in the current step
 *   - the StepPlayer: step slider, play/pause, speed, caption card; elements
 *     flash black while their step is current, then take their proper color
 *   - a Panel for sidebar widgets and GeoGebra-style dragging of control points
 */

import * as THREE from 'three';
import { OrbitControls } from './vendor/OrbitControls.js';

// palette regraded 2026-08-14 to the reference walkthrough video: calm deep
// navy endstates, hairline weights (tension stays PINK -- the user's choice)
export const PAL = {
  blue: 0x1a1eb2,   // member in compression (deep navy)
  red: 0xce4095,    // member in tension (pink -- the user prefers pink over red)
  green: 0x3f9c20,  // external loads / reactions / resultants
  pink: 0x111111,   // element(s) being drawn are BLACK (they turn pink/blue after)
  pinkLight: 0xe8e8e8, // point fill while its step is current
  ghost: 0x9ed4c9,  // pale blue-green ghost of the final drawing
  yellow: 0xe8ac00, // hover highlight of dual form <-> force elements
  yellowLight: 0xf9e08a, // point fill while hover-highlighted
  grey: 0xaaaaaa,   // guides / construction lines
  zero: 0xb9b9bd,   // zero-force members ("asleep" -- neither blue nor pink)
  orange: 0xe07a26, // node-equilibrium inspector (the applets' mode-2 orange)
  black: 0x111111,
  white: 0xffffff,
};

// global stroke regrade: every element width / arrowhead is multiplied by
// this, thinning all 53 views to the video's hairline weight at once
export const LINE_SCALE = 0.72;

const cssHex = (hex) => `#${hex.toString(16).padStart(6, '0')}`;
const lerp2 = (a, b, f) => [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
const smooth = (f) => f * f * (3 - 2 * f);

// z-layers inside the drawing plane
const Z = { rect: -0.3, guide: -0.1, seg: 0.0, arrow: 0.15, disk: 0.3 };

const _v3 = new THREE.Vector3();
const _plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

// ============================================================================
// Drawing: scene + element registry
// ============================================================================

export class Drawing {
  constructor(container, meta) {
    this.meta = meta;
    const [bl, tr] = meta.frame;
    this.center = [(bl[0] + tr[0]) / 2, (bl[1] + tr[1]) / 2];
    this.halfW = (tr[0] - bl[0]) / 2;
    this.halfH = (tr[1] - bl[1]) / 2;
    this.finalStep = Infinity; // set by StepPlayer

    this.container = container;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(this.renderer.domElement);

    this.overlay = document.createElement('div');
    this.overlay.className = 'eq-overlay';
    container.appendChild(this.overlay);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff);

    // strictly 2D: straight-on orthographic camera, pan + zoom only
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
    this.camera.position.set(this.center[0], this.center[1], 50);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableRotate = false;
    this.controls.screenSpacePanning = true;
    this.controls.mouseButtons = { LEFT: THREE.MOUSE.PAN, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN };
    this.controls.touches = { ONE: THREE.TOUCH.PAN, TWO: THREE.TOUCH.DOLLY_PAN };
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.1;

    // HOUSE STROKE METRICS, proportional to the drawing frame so that every
    // view looks identical whatever coordinate scale it works in (the ratios
    // are the median of the 53 hand-written drawing views). Use these in new
    // views instead of hard-coded numbers: dw.W.bar, dw.W.arrow, dw.W.dash …
    const fw = this.halfW * 2;
    this.W = {
      bar: 0.00316 * fw,        // a member / chord
      thin: 0.00150 * fw,       // a light member, a counter
      str: 0.00232 * fw,        // a funicular string
      ray: 0.00148 * fw,        // a ray in the force diagram
      dim: 0.00105 * fw,        // a dimension line
      dash: 0.00590 * fw,       // dash length of a guide
      disk: 0.00740 * fw,       // a joint marker
      arrow: { w: 0.00380 * fw, headLen: 0.01310 * fw, headW: 0.00506 * fw },
      narrow: { w: 0.00274 * fw, headLen: 0.00886 * fw, headW: 0.00380 * fw },
    };

    this.elems = new Map();
    this.raycaster = new THREE.Raycaster();

    this.animEnabled = true;   // draw-in animation (movies disable it)
    this.ghostEnabled = true;  // pale preview of the final drawing
    this._selDisk = null;      // disk of the selected node (orange edge)
    this._anims = [];          // running draw-in animations
    this._lastStep = null;
    this._lastApply = null;
    this._glide = null;        // camera glide goal {cx, cy, zoom}
    this.renderer.domElement.addEventListener('pointerdown', () => { this._glide = null; });

    // hover-linking of dual elements: hovering a member highlights its
    // counterpart in the other diagram (form <-> force)
    this._links = [];
    this._linkOf = new Map();
    this._hover = null;
    this.renderer.domElement.addEventListener('pointermove', (ev) => {
      if (!this.controls.enabled || !this._links.length) return;
      const w = this.worldFromEvent(ev);
      if (!w) return;
      let g = null;
      const tol = this._tolerance();
      for (const [name, e] of this.elems) {
        if (!e.visible) continue;
        const gi = this._linkOf.get(name);
        if (gi === undefined) continue;
        if (this._distTo(e, w) < tol) { g = gi; break; }
      }
      if (g !== this._hover) {
        this._hover = g;
        const la = this._lastApply;
        if (la) this.applyStep(la.k, la.d, la.state);
      }
    });
    this.renderer.domElement.addEventListener('pointerleave', () => {
      if (this._hover === null) return;
      this._hover = null;
      const la = this._lastApply;
      if (la) this.applyStep(la.k, la.d, la.state);
    });

    this._resize();
    new ResizeObserver(() => this._resize()).observe(container);
    // re-apply the pixel ratio when the window moves to a screen with a
    // different DPR (or the browser zoom changes) — a stale ratio renders
    // the canvas pixelated / blurry
    const watchDPR = () => {
      matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`)
        .addEventListener('change', () => { this._resize(); watchDPR(); }, { once: true });
    };
    watchDPR();
    this.zoomFit(true);
    this.renderer.setAnimationLoop(() => this._tick());
  }

  _resize() {
    const w = this.container.clientWidth || 1;
    const h = this.container.clientHeight || 1;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(w, h, false);
    this._fitFrustum(w / h);
  }

  _fitFrustum(aspect) {
    // fit the drawing frame (with a small margin) into the ortho frustum
    const needW = this.halfW * 1.06, needH = this.halfH * 1.12;
    const halfH = Math.max(needH, needW / aspect);
    this.camera.left = -halfH * aspect;
    this.camera.right = halfH * aspect;
    this.camera.top = halfH;
    this.camera.bottom = -halfH;
    this.camera.updateProjectionMatrix();
  }

  zoomFit() {
    const [cx, cy] = this.center;
    this.camera.zoom = 1;
    this.camera.position.set(cx, cy, 50);
    this.controls.target.set(cx, cy, 0);
    this._fitFrustum((this.container.clientWidth || 1) / (this.container.clientHeight || 1));
    this.controls.update();
  }

  front() {
    this.zoomFit();
  }

  _tick() {
    const now = performance.now();

    // draw-in animations: elements grow from their start point
    for (let i = this._anims.length - 1; i >= 0; i--) {
      const a = this._anims[i];
      let f = (now - a.start) / a.dur;
      if (f >= 1) {
        a.e.animF = undefined;
        this._anims.splice(i, 1);
      } else {
        a.e.animF = smooth(Math.max(f, 0));
      }
      this._applyGeo(a.e);
    }

    // camera glide toward the current step's elements
    if (this._glide) {
      const g = this._glide, a = 0.09;
      const c = this.camera, t = this.controls.target;
      c.position.x += (g.cx - c.position.x) * a;
      c.position.y += (g.cy - c.position.y) * a;
      t.x += (g.cx - t.x) * a;
      t.y += (g.cy - t.y) * a;
      c.zoom += (g.zoom - c.zoom) * a;
      c.updateProjectionMatrix();
      if (Math.abs(g.cx - c.position.x) + Math.abs(g.cy - c.position.y) < 1e-3
          && Math.abs(g.zoom - c.zoom) < 1e-3) this._glide = null;
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    const w = this.container.clientWidth, h = this.container.clientHeight;
    for (const e of this.elems.values()) {
      if (e.kind !== 'label') continue;
      if (!e.visible) { e.el.style.display = 'none'; continue; }
      _v3.set(e.pos[0], e.pos[1], 0).project(this.camera);
      if (_v3.z > 1) { e.el.style.display = 'none'; continue; }
      e.el.style.display = '';
      e.el.style.opacity = e.animF ?? 1;
      e.el.style.left = `${(_v3.x * 0.5 + 0.5) * w}px`;
      e.el.style.top = `${(-_v3.y * 0.5 + 0.5) * h}px`;
    }
  }

  /** Apply an element's stored geometry, partially revealed while animF < 1. */
  _applyGeo(e) {
    const ls = e.noScale ? 1 : LINE_SCALE;
    const wE0 = e.w * ls, zE0 = e.z, hwE0 = (e.headW ?? 0) * ls;
    const wE = e.ghostNow ? wE0 * 0.7 : wE0;
    const zE = e.ghostNow ? zE0 - 2 : zE0;
    const hwE = e.ghostNow ? hwE0 * 0.6 : hwE0;
    if (!e.geo) return;
    if (e.ghostTwin) {
      e.ghostTwin.geo = e.geo;
      this._applyGeo(e.ghostTwin);
    }
    const f = e.animF ?? 1;
    if (e.kind === 'seg') {
      const { p0, p1 } = e.geo;
      const q = lerp2(p0, p1, f);
      const l = Math.max(dist2(p0, q), 1e-6);
      e.mesh.position.set((p0[0] + q[0]) / 2, (p0[1] + q[1]) / 2, zE);
      e.mesh.rotation.z = Math.atan2(p1[1] - p0[1], p1[0] - p0[0]);
      e.mesh.scale.set(l, wE, 1);
    } else if (e.kind === 'arrow') {
      const { tail, tip } = e.geo;
      const tp = lerp2(tail, tip, Math.max(f, 0.02));
      const dx = tp[0] - tail[0], dy = tp[1] - tail[1];
      const l = Math.hypot(dx, dy) || 1e-6;
      const ux = dx / l, uy = dy / l;
      const hl = Math.min(e.headLen * ls, 0.5 * l);
      const bx = tp[0] - ux * hl, by = tp[1] - uy * hl;
      e.shaft.position.set((tail[0] + bx) / 2, (tail[1] + by) / 2, zE);
      e.shaft.rotation.z = Math.atan2(dy, dx);
      e.shaft.scale.set(Math.max(l - hl, 1e-6), wE, 1);
      const ox = -uy * hwE, oy = ux * hwE;
      e.head.geometry.attributes.position.array.set([
        tp[0], tp[1], zE, bx + ox, by + oy, zE, bx - ox, by - oy, zE]);
      e.head.geometry.attributes.position.needsUpdate = true;
    } else if (e.kind === 'darrow') {
      const { tail, tip } = e.geo;
      const tp = lerp2(tail, tip, Math.max(f, 0.02));
      const dx = tp[0] - tail[0], dy = tp[1] - tail[1];
      const l = Math.hypot(dx, dy) || 1e-6;
      const ux = dx / l, uy = dy / l;
      const hl = Math.min(e.headLen * ls, 0.5 * l);
      const shaft = l - hl;
      // fixed dash length in world units: identical pattern at any arrow length
      let period = e.dash / 0.62;
      let n = Math.max(1, Math.ceil(shaft / period));
      if (n > e.meshes.length) { n = e.meshes.length; period = shaft / n; }
      const dashLen = period * 0.62;
      e.meshes.forEach((m, i) => {
        if (i >= n) { m.scale.set(1e-6, 1e-6, 1); return; }
        const s0 = i * period;
        const dl = Math.max(Math.min(dashLen, shaft - s0), 1e-6);
        const cx = tail[0] + ux * (s0 + dl / 2), cy = tail[1] + uy * (s0 + dl / 2);
        m.position.set(cx, cy, zE);
        m.rotation.z = Math.atan2(dy, dx);
        m.scale.set(dl, wE, 1);
      });
      const bx = tp[0] - ux * hl, by = tp[1] - uy * hl;
      const ox = -uy * hwE, oy = ux * hwE;
      e.head.geometry.attributes.position.array.set([
        tp[0], tp[1], zE, bx + ox, by + oy, zE, bx - ox, by - oy, zE]);
      e.head.geometry.attributes.position.needsUpdate = true;
    } else if (e.kind === 'strokes') {
      const pairs = e.geo;
      const lens = pairs.map(([a, b]) => dist2(a, b));
      let reveal = f * lens.reduce((s, l) => s + l, 0);
      pairs.forEach(([a, b], i) => {
        const ff = lens[i] <= 1e-9 ? 1 : Math.max(0, Math.min(1, reveal / lens[i]));
        reveal -= lens[i];
        const q = lerp2(a, b, ff);
        const m = e.meshes[i];
        const l = Math.max(dist2(a, q), 1e-6);
        m.position.set((a[0] + q[0]) / 2, (a[1] + q[1]) / 2, zE);
        m.rotation.z = Math.atan2(b[1] - a[1], b[0] - a[0]);
        m.scale.set(l, wE, 1);
      });
    } else if (e.kind === 'dline') {
      const pts = e.geo;
      let partial = pts;
      if (f < 1 && pts.length > 1) {
        const lens = [];
        let total = 0;
        for (let i = 0; i < pts.length - 1; i++) { lens.push(dist2(pts[i], pts[i + 1])); total += lens[i]; }
        let remain = f * total;
        partial = [pts[0]];
        for (let i = 0; i < lens.length && remain > 0; i++) {
          if (remain >= lens[i]) { partial.push(pts[i + 1]); remain -= lens[i]; }
          else { partial.push(lerp2(pts[i], pts[i + 1], remain / lens[i])); remain = 0; }
        }
        if (partial.length < 2) partial.push(partial[0]);
      }
      e.line.geometry.setFromPoints(partial.map((p) => new THREE.Vector3(p[0], p[1], zE)));
      e.line.computeLineDistances();
    } else if (e.kind === 'circle' || e.kind === 'dcircle') {
      const { c, r } = e.geo;
      const m = e.kind === 'circle' ? 96 : 120;
      const steps = Math.max(2, Math.round(m * f));
      const span = Math.PI * 2 * f;
      const pts = [];
      for (let i = 0; i <= steps; i++) {
        const a = (i / steps) * span;
        pts.push(new THREE.Vector3(c[0] + r * Math.cos(a), c[1] + r * Math.sin(a), zE));
      }
      e.line.geometry.setFromPoints(pts);
      e.line.computeLineDistances?.();
      if (e.kind === 'dcircle') e.line.computeLineDistances();
    } else if (e.kind === 'poly') {
      const arr = e.mesh.geometry.attributes.position.array;
      e.geo.forEach((p, i) => arr.set([p[0], p[1], zE], i * 3));
      e.mesh.geometry.attributes.position.needsUpdate = true;
      if (e.mats[0].transparent) e.mats[0].opacity = e.targetOp * f;
    } else if (e.kind === 'disk') {
      const p = e.geo;
      const ff = Math.max(f, 0.001);
      e.outer.position.set(p[0], p[1], zE);
      e.inner.position.set(p[0], p[1], zE + 0.02);
      e.outer.scale.set(e.r * ff, e.r * ff, 1);
      e.inner.scale.set(e.r * 0.68 * ff, e.r * 0.68 * ff, 1);
    }
  }

  // ------------------------------------------------------------------
  // element creation. Common options:
  //   intro : construction step at which the element appears (default 0)
  //   outro : step at which it disappears again (construction-only helpers)
  //   when  : (state, d) => bool, extra visibility condition
  //   color : hex, or {pending: hex, final: (d) => hex} resolved by the player
  //   flash : draw pink while its intro step is the current one (default true)
  // ------------------------------------------------------------------

  _register(name, entry) {
    entry.visible = entry.intro === 0 && !entry.when;
    for (const o of entry.objs || []) {
      o.visible = entry.visible;
      this.scene.add(o);
    }
    this.elems.set(name, entry);
    return entry;
  }

  _mat(color, opacity = 1.0) {
    const hex = typeof color === 'number' ? color : color.pending;
    return new THREE.MeshBasicMaterial({
      color: hex, side: THREE.DoubleSide,
      transparent: opacity < 1.0, opacity, depthWrite: opacity === 1.0,
    });
  }

  /** Thick segment drawn as a rotated unit quad; w is the width in world units. */
  seg(name, { w = 0.4, z = Z.seg, intro = 0, outro, when, color = PAL.black, flash = true } = {}) {
    const mat = this._mat(color);
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat);
    return this._register(name, { kind: 'seg', objs: [mesh], mesh, mats: [mat], w, z, intro, outro, when, color, flash });
  }

  setSeg(name, p0, p1) {
    const e = this.elems.get(name);
    e.geo = { p0, p1 };
    this._applyGeo(e);
  }

  /** Arrow (shaft quad + solid triangular head), like ggb2compas.arrow_parts. */
  arrow(name, { w = 0.55, z = Z.arrow, intro = 0, outro, when, color = PAL.green, flash = true,
                headLen = 1.7, headW = 0.65 } = {}) {
    const mat = this._mat(color);
    const shaft = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(9), 3));
    const head = new THREE.Mesh(geo, mat);
    head.frustumCulled = false;
    return this._register(name, { kind: 'arrow', objs: [shaft, head], shaft, head, mats: [mat],
                                  w, z, headLen, headW, intro, outro, when, color, flash });
  }

  setArrow(name, tail, tip) {
    const e = this.elems.get(name);
    e.geo = { tail, tip };
    this._applyGeo(e);
  }

  /** Thick DASHED vector: quad dashes along the full shaft + solid head.
      Used for resultants, which are always drawn dashed start-to-end.
      `dash` is the dash length in world units -- the pattern looks the same
      regardless of the arrow's length (a pool of quads covers up to maxDashes). */
  dashArrow(name, { w = 0.55, z = Z.arrow, intro = 0, outro, when, color = PAL.green,
                    flash = true, headLen = 1.7, headW = 0.65, dash = 1.1, maxDashes = 40 } = {}) {
    const mat = this._mat(color);
    const meshes = [];
    for (let i = 0; i < maxDashes; i++) meshes.push(new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat));
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(9), 3));
    const head = new THREE.Mesh(geo, mat);
    head.frustumCulled = false;
    return this._register(name, { kind: 'darrow', objs: [...meshes, head], meshes, head,
                                  mats: [mat], w, z, headLen, headW, dash,
                                  intro, outro, when, color, flash });
  }

  setDashArrow(name, tail, tip) {
    const e = this.elems.get(name);
    e.geo = { tail, tip };
    this._applyGeo(e);
  }

  /** Group of thick strokes sharing one material (vector arrows, polylines). */
  strokes(name, count, { w = 0.4, z = Z.seg, intro = 0, outro, when, color = PAL.black, flash = true } = {}) {
    const mat = this._mat(color);
    const meshes = [];
    for (let i = 0; i < count; i++) meshes.push(new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat));
    return this._register(name, { kind: 'strokes', objs: meshes, meshes, mats: [mat],
                                  w, z, intro, outro, when, color, flash });
  }

  setStrokes(name, pairs) {
    const e = this.elems.get(name);
    e.geo = pairs;
    this._applyGeo(e);
  }

  /** Dashed polyline (guides / temporary construction lines are always dashed). */
  dashLine(name, { color = PAL.grey, z = Z.guide, intro = 0, outro, when, flash = true, dash = 0.9 } = {}) {
    const mat = new THREE.LineDashedMaterial({ color, dashSize: dash, gapSize: dash * 0.8 });
    const line = new THREE.Line(new THREE.BufferGeometry(), mat);
    line.frustumCulled = false;
    return this._register(name, { kind: 'dline', objs: [line], line, z, mats: [mat],
                                  intro, outro, when, color, flash });
  }

  setDashLine(name, pts) {
    const e = this.elems.get(name);
    e.geo = pts;
    this._applyGeo(e);
  }

  /** Thin solid circle outline (construction / detail circles). */
  circle(name, { color = PAL.black, z = Z.guide, intro = 0, outro, when, flash = true } = {}) {
    const mat = new THREE.LineBasicMaterial({ color });
    const line = new THREE.Line(new THREE.BufferGeometry(), mat);
    line.frustumCulled = false;
    return this._register(name, { kind: 'circle', objs: [line], line, mats: [mat],
                                  z, intro, outro, when, color, flash });
  }

  setCircle(name, c, r) {
    const e = this.elems.get(name);
    e.geo = { c, r };
    this._applyGeo(e);
  }

  /** Filled simple polygon with a fixed vertex count. Triangulated by ear
      clipping in setPoly, so concave outlines (ground hatches, rock banks,
      wedges) render correctly — a fan from vertex 0 spills outside them. */
  poly(name, count, { z = Z.rect, intro = 0, when, color = PAL.grey, flash = true, opacity = 1.0 } = {}) {
    const mat = this._mat(color, opacity);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    const mesh = new THREE.Mesh(geo, mat);
    mesh.frustumCulled = false;
    return this._register(name, { kind: 'poly', objs: [mesh], mesh, mats: [mat], z, intro, when,
                                  color, flash, targetOp: opacity });
  }

  setPoly(name, pts) {
    const e = this.elems.get(name);
    e.geo = pts;
    e.mesh.geometry.setIndex(earClip(pts));
    this._applyGeo(e);
  }

  /** Embedded applet photograph (site image): a textured plane far behind the
      construction, GeoGebra-style 3-corner anchor [bottomLeft, bottomRight,
      topLeft], drawn at the applet's opacity. Site element: appears instantly
      (no draw-in), is never flashed pink and never recolored. */
  image(name, url, { corners, opacity = 1.0, z = -2.5, intro = 0, outro, when } = {}) {
    const tex = new THREE.TextureLoader().load(url);
    tex.colorSpace = THREE.SRGBColorSpace;
    const mat = new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide,
      transparent: true, opacity, depthWrite: false });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat);
    mesh.frustumCulled = false;
    const e = this._register(name, { kind: 'image', objs: [mesh], mesh, mats: [mat], url,
                                     z, intro, outro, when, flash: false, anim: false });
    if (corners) this.setImage(name, corners);
    return e;
  }

  setImage(name, [bl, br, tl]) {
    const e = this.elems.get(name);
    e.geo = { bl, br, tl };
    e.mesh.position.set((br[0] + tl[0]) / 2, (br[1] + tl[1]) / 2, e.z);
    e.mesh.rotation.z = Math.atan2(br[1] - bl[1], br[0] - bl[0]);
    e.mesh.scale.set(Math.hypot(br[0] - bl[0], br[1] - bl[1]) || 1e-6,
                     Math.hypot(tl[0] - bl[0], tl[1] - bl[1]) || 1e-6, 1);
  }

  /** Point: small circle with a thin outline -- white face, black boundary;
      light-pink face + pink boundary while its intro step is the current one. */
  disk(name, { r = 0.65, face = PAL.white, edge = 0x3c3f46, z = Z.disk, intro = 0, outro, when } = {}) {
    const edgeMat = this._mat(edge);
    const faceMat = this._mat(face);
    const outer = new THREE.Mesh(new THREE.CircleGeometry(1, 32), edgeMat);
    const inner = new THREE.Mesh(new THREE.CircleGeometry(1, 32), faceMat);
    outer.scale.set(r, r, 1);
    inner.scale.set(r * 0.68, r * 0.68, 1);
    return this._register(name, { kind: 'disk', objs: [outer, inner], outer, inner, z, r,
                                  mats: [faceMat], edgeMat, edgeHex: edge,
                                  color: face, flash: true, intro, outro, when });
  }

  setDisk(name, p) {
    const e = this.elems.get(name);
    e.geo = p;
    this._applyGeo(e);
  }

  /** Dashed circle guide (GeoGebra-style construction circle). */
  dashedCircle(name, { color = PAL.grey, z = Z.guide, intro = 0, when, dash = 1.2 } = {}) {
    const mat = new THREE.LineDashedMaterial({ color, dashSize: dash, gapSize: dash });
    const line = new THREE.Line(new THREE.BufferGeometry(), mat);
    line.frustumCulled = false;
    return this._register(name, { kind: 'dcircle', objs: [line], line, z, mats: [mat],
                                  color, flash: true, intro, when });
  }

  setDashedCircle(name, c, r) {
    const e = this.elems.get(name);
    e.geo = { c, r };
    this._applyGeo(e);
  }

  /** Crisp DOM label projected onto the drawing plane. cls: extra css classes;
      color (hex or {final}) ties the text color to its element's color. */
  label(name, text, { cls = '', intro = 0, outro, when, flash = true, color } = {}) {
    const el = document.createElement('div');
    el.className = `eq-label ${cls}`;
    el.textContent = text;
    this.overlay.appendChild(el);
    return this._register(name, { kind: 'label', objs: [], el, pos: [0, -1e4], intro, outro, when, flash, color });
  }

  setLabel(name, pos) {
    this.elems.get(name).pos = pos;
  }

  setText(name, text) {
    this.elems.get(name).el.textContent = text;
  }

  /** Flash an element pink again at extra steps: ties a form-diagram member
      to the step where its force-diagram counterpart is drawn. */
  highlight(name, steps) {
    this.elems.get(name).hi = steps;
  }

  /** Mark force-diagram elements for the pale ghost preview of the final
      drawing (the form diagram is never ghosted). Each gets a persistent thin
      twin far behind the drawing; the real lines cover it once drawn. */
  ghostable(...names) {
    for (const n of names) {
      const e = this.elems.get(n);
      if (!e || e.ghostTwin) continue;
      const mat = this._mat(PAL.ghost);
      let g = null;
      if (e.kind === 'seg') {
        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat);
        g = { kind: 'seg', mesh, objs: [mesh] };
      } else if (e.kind === 'arrow' || e.kind === 'darrow') {
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(9), 3));
        const head = new THREE.Mesh(geo, mat);
        head.frustumCulled = false;
        if (e.kind === 'arrow') {
          const shaft = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat);
          g = { kind: 'arrow', shaft, head, objs: [shaft, head] };
        } else {
          const meshes = [];
          for (let i = 0; i < e.meshes.length; i++) {
            meshes.push(new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat));
          }
          g = { kind: 'darrow', meshes, head, objs: [...meshes, head] };
        }
      } else if (e.kind === 'strokes') {
        const meshes = [];
        for (let i = 0; i < e.meshes.length; i++) {
          meshes.push(new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat));
        }
        g = { kind: 'strokes', meshes, objs: meshes };
      } else {
        continue;              // ghost twins exist for seg / arrow / darrow / strokes only
      }
      g.w = e.w; g.z = e.z; g.headLen = e.headLen; g.headW = e.headW;
      g.dash = e.dash; g.mats = [mat]; g.ghostNow = true;
      for (const o of g.objs) { o.visible = false; this.scene.add(o); }
      e.ghostTwin = g;
    }
  }

  /** Background/site elements: appear instantly in their own color -- no
      draw-in animation and no pink flash (they are not construction moves). */
  instant(...names) {
    for (const n of names) {
      const e = this.elems.get(n);
      e.anim = false;
      e.flash = false;
    }
  }

  /** Declare a group of dual elements (form member + its force counterpart +
      their labels): hovering any of them highlights the whole group. */
  link(...names) {
    const g = this._links.length;
    this._links.push(names);
    for (const n of names) this._linkOf.set(n, g);
  }

  /** Distance from a world point to an element's drawn geometry. */
  _distTo(e, w) {
    const g = e.geo;
    if (!g) return Infinity;
    const dseg = (a, b) => {
      const ab = [b[0] - a[0], b[1] - a[1]];
      const l2 = ab[0] * ab[0] + ab[1] * ab[1];
      const t = l2 > 1e-12
        ? Math.max(0, Math.min(1, ((w[0] - a[0]) * ab[0] + (w[1] - a[1]) * ab[1]) / l2)) : 0;
      return Math.hypot(w[0] - a[0] - ab[0] * t, w[1] - a[1] - ab[1] * t);
    };
    if (e.kind === 'seg') return dseg(g.p0, g.p1);
    if (e.kind === 'arrow' || e.kind === 'darrow') return dseg(g.tail, g.tip);
    if (e.kind === 'strokes') return Math.min(...g.map(([a, b]) => dseg(a, b)));
    if (e.kind === 'dline') {
      let best = Infinity;
      for (let i = 0; i < g.length - 1; i++) best = Math.min(best, dseg(g[i], g[i + 1]));
      return best;
    }
    return Infinity;
  }

  // ------------------------------------------------------------------
  // step + state application (called by the view's refresh via the player)
  // ------------------------------------------------------------------

  applyStep(k, d, state) {
    // advancing one step animates that step's elements being drawn
    const advance = this._lastStep !== null && k === this._lastStep + 1;
    if (k !== this._lastStep) {
      for (const a of this._anims) { a.e.animF = undefined; this._applyGeo(a.e); }
      this._anims = [];
    }
    const newly = [];
    this._lastApply = { k, d, state };

    for (const [name, e] of this.elems) {
      e.visible = e.intro <= k && k < (e.outro ?? Infinity) && (!e.when || e.when(state, d));
      for (const o of e.objs) o.visible = e.visible;
      const current = e.intro === k || (e.hi && e.hi.includes(k));
      const flashing = !!(e.visible && e.flash && current && k > 0);
      const hovered = !!(e.visible && this._hover !== null
                         && this._linkOf.get(name) === this._hover);
      if (advance && e.visible && e.intro === k) newly.push({ name, e });

      // color: yellow while hover-linked, pink while being drawn,
      // its proper color otherwise
      const resolved = e.color === undefined ? undefined
        : typeof e.color === 'number' ? e.color
        : e.color.final ? e.color.final(d) : e.color.pending;

      if (e.kind === 'label') {
        e.el.classList.toggle('hover', hovered);
        e.el.classList.toggle('flash', !hovered && flashing);
        e.el.style.color = !hovered && !flashing && resolved !== undefined ? cssHex(resolved) : '';
        continue;
      }
      // ghost: force-diagram elements not yet drawn, but part of the final
      // drawing, appear as a pale blue-green preview (opt-in via ghostable();
      // the form diagram is never ghosted)
      if (e.ghostTwin) {
        const on = this.ghostEnabled && (!e.when || e.when(state, d));
        for (const o of e.ghostTwin.objs) o.visible = on;
      }
      if (!e.visible || e.color === undefined) continue;
      if (e.kind === 'disk') {
        // draggable control points render as solid pink handles (like the
        // reference video) so interactivity is discoverable at a glance;
        // detected automatically by probing the view's drag hit function
        const handle = !hovered && !flashing && this._isHandle(e);
        e.mats[0].color.setHex(hovered ? PAL.yellowLight : flashing ? PAL.pinkLight
          : handle ? 0xce4095 : resolved);
        e.edgeMat.color.setHex(hovered ? PAL.yellow : flashing ? PAL.pink
          : name === this._selDisk ? PAL.orange : handle ? 0xa83179 : e.edgeHex);
        continue;
      }
      for (const m of e.mats) {
        m.color.setHex(hovered ? PAL.yellow : flashing ? PAL.pink : resolved);
      }
    }

    if (advance && this.animEnabled && k > 0 && newly.length) {
      // the draw-in must FIT the step interval, otherwise the next step
      // clears the queue and the late elements snap to full length instead
      // of growing (animBudget is set by the player from its speed)
      // form + force counterparts (same link group) draw SIMULTANEOUSLY so
      // the student sees that one side corresponds to the other; unlinked
      // elements keep their own slot, groups follow one another
      const seq = [];
      const slotOf = new Map();
      for (const { name, e } of newly) {
        const g = this._linkOf.get(name);
        if (g === undefined) { seq.push([e]); continue; }
        if (!slotOf.has(g)) { slotOf.set(g, seq.length); seq.push([]); }
        seq[slotOf.get(g)].push(e);
      }
      // each element grows for `per`; the starts are spread over the rest of
      // the budget, so however many elements a step introduces the whole
      // cascade finishes before the next step arrives
      const n = seq.length;
      const budget = this.animBudget ?? 1800;
      const per = Math.max(180, Math.min(900, budget * 0.45));
      const stagger = n > 1 ? Math.max(0, budget - per) / (n - 1) : 0;
      const t0 = performance.now();
      seq.forEach((grp, i) => {
        for (const e of grp) {
          if (e.kind === 'poly' && !e.mats[0].transparent) continue; // opaque fills pop in
          if (e.anim === false) continue;  // background/site elements appear instantly
          e.animF = 0;
          this._applyGeo(e);
          this._anims.push({ e, start: t0 + i * stagger, dur: per });
        }
      });
    }
    this._lastStep = k;
  }

  // ------------------------------------------------------------------
  // camera follow ("cam"): glide to frame the current step's elements
  // ------------------------------------------------------------------

  _elemPoints(e, out) {
    const g = e.geo;
    if (e.kind === 'label') { out.push(e.pos); return; }
    if (!g) return;
    if (e.kind === 'seg') out.push(g.p0, g.p1);
    else if (e.kind === 'arrow' || e.kind === 'darrow') out.push(g.tail, g.tip);
    else if (e.kind === 'strokes') g.forEach(([a, b]) => out.push(a, b));
    else if (e.kind === 'dline' || e.kind === 'poly') out.push(...g);
    else if (e.kind === 'circle' || e.kind === 'dcircle') {
      out.push([g.c[0] - g.r, g.c[1] - g.r], [g.c[0] + g.r, g.c[1] + g.r]);
    } else if (e.kind === 'disk') out.push(g);
  }

  glideHome() {
    this._glide = { cx: this.center[0], cy: this.center[1], zoom: 1 };
  }

  glideToStep(k) {
    if (k <= 0 || k >= this.finalStep) { this.glideHome(); return; }
    const pts = [];
    for (const e of this.elems.values()) {
      if (e.intro === k && e.visible) this._elemPoints(e, pts);
    }
    if (!pts.length) { this.glideHome(); return; }
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (const p of pts) {
      x0 = Math.min(x0, p[0]); y0 = Math.min(y0, p[1]);
      x1 = Math.max(x1, p[0]); y1 = Math.max(y1, p[1]);
    }
    const needW = (x1 - x0) / 2 * 2.6 + 0.06 * this.halfW;
    const needH = (y1 - y0) / 2 * 2.6 + 0.06 * this.halfH;
    const zoom = Math.max(1, Math.min(3.5,
      Math.min(this.camera.right / Math.max(needW, 1e-6), this.camera.top / Math.max(needH, 1e-6))));
    this._glide = { cx: (x0 + x1) / 2, cy: (y0 + y1) / 2, zoom };
  }

  // ------------------------------------------------------------------
  // GeoGebra-style dragging of control points in the z=0 plane
  // ------------------------------------------------------------------

  worldFromEvent(ev) {
    const r = this.renderer.domElement.getBoundingClientRect();
    const x = ((ev.clientX - r.left) / r.width) * 2 - 1;
    const y = -((ev.clientY - r.top) / r.height) * 2 + 1;
    this.raycaster.setFromCamera({ x, y }, this.camera);
    const hit = this.raycaster.ray.intersectPlane(_plane, _v3);
    return hit ? [hit.x, hit.y] : null;
  }

  _tolerance() {
    const h = this.renderer.domElement.clientHeight || 1;
    return 14 * ((this.camera.top - this.camera.bottom) / this.camera.zoom) / h;
  }

  /** Node-equilibrium click-to-inspect (the applets' mode 2): clicking a node
      point of the form diagram — pointerdown + pointerup without significant
      movement, so dragging a node still drags it — calls onSelect(i) with the
      0-based index of the closest node within tolerance.
      nodes: [{ at: () => [x, y] }].  Pair with selectDisk() so the selected
      node's disk renders with an orange edge. */
  nodeSelect(nodes, onSelect) {
    const el = this.renderer.domElement;
    let downAt = null;
    el.addEventListener('pointerdown', (ev) => {
      if (ev.button === 0) downAt = [ev.clientX, ev.clientY];
    });
    el.addEventListener('pointerup', (ev) => {
      if (!downAt) return;
      const moved = Math.hypot(ev.clientX - downAt[0], ev.clientY - downAt[1]);
      downAt = null;
      if (moved > 5) return;                      // it was a drag / pan, not a click
      const w = this.worldFromEvent(ev);
      if (!w) return;
      let best = null;
      let tol = this._tolerance();
      nodes.forEach((n, i) => {
        const p = n.at();
        const dd = Math.hypot(p[0] - w[0], p[1] - w[1]);
        if (dd < tol) { tol = dd; best = i; }
      });
      if (best !== null) onSelect(best);
    });
  }

  /** Mark the disk `name` as the selected node (orange edge); null clears.
      Call from the view's refresh so slider and click stay in sync. */
  selectDisk(name) {
    this._selDisk = name ?? null;
  }

  /** Node-equilibrium inspector elements: `count` paired THICK BLACK arrows.
      nq* = the selected node's free-body star, drawn ON the node itself in the
      form diagram (every force on the node radiates from the node point, like
      inspecting a truss joint); nf* = the same forces tip-to-tail on the node's
      closed sub-polygon in the force diagram. `when` should gate on the
      selection (e.g. st.node > 0). */
  nodeInspector(count, { w = 0.5, headLen = 1.6, headW = 0.6, r = w * 1.1, when } = {}) {
    this._nodeCount = count;
    for (let i = 0; i < count; i++) {
      this.arrow(`nq${i}`, { color: PAL.black, flash: false, when, w, headLen, headW, z: Z.arrow + 0.1 });
      this.arrow(`nf${i}`, { color: PAL.black, flash: false, when, w, headLen, headW, z: Z.arrow + 0.1 });
    }
    this.disk('nq_c', { r, when });
    this.label('nq_lbl', '', { cls: 'num', flash: false, when });
  }

  /** Position the inspector: the star is centered ON the selected node's disk
      (the `center` argument is a legacy fallback used only when no disk is
      selected), its longest arrow scaled to `radius`; `sides` are the
      [tail, tip] pairs of the node's force sub-polygon (each side = one force
      acting on the node), drawn 1:1 on the force diagram by the nf* arrows. */
  setNodeInspector(center, radius, title, sides) {
    const sel = this._selDisk ? this.elems.get(this._selDisk) : null;
    if (sel && sel.geo) center = sel.geo;
    const vs = sides.map(([a, b]) => [b[0] - a[0], b[1] - a[1]]);
    const vmax = Math.max(1e-9, ...vs.map((v) => Math.hypot(v[0], v[1])));
    const k = radius / vmax;
    for (let i = 0; i < this._nodeCount; i++) {
      if (i < sides.length) {
        this.setArrow(`nq${i}`, center, [center[0] + vs[i][0] * k, center[1] + vs[i][1] * k]);
        this.setArrow(`nf${i}`, sides[i][0], sides[i][1]);
      } else {
        this.setArrow(`nq${i}`, center, center);
        this.setArrow(`nf${i}`, center, center);
      }
    }
    this.setDisk('nq_c', center);
    this.setLabel('nq_lbl', [center[0], center[1] + radius * 1.3]);
    this.setText('nq_lbl', title);
  }

  /** A disk is a drag handle if the view's drag hit function claims a point
      at its center (probed with a tiny tolerance so only the disk itself,
      not a nearby draggable line, lights up). */
  _isHandle(e) {
    if (!this._dragHit || !e.geo) return false;
    return !!this._dragHit(e.geo[0], e.geo[1], 1e-9);
  }

  /** Serialize the drawing as an ordered list of primitive operations at
      the CURRENT (default) state — the source of the Python / COMPAS ops
      database (tools/export_ops.py). Interactive machinery (node
      inspector, ghost twins, hover/flash states) is not part of the
      recipe; `when`-gated layers that are off in the default state are
      skipped; widths are effective world units (LINE_SCALE applied). */
  exportOps(meta, player) {
    const la = this._lastApply ?? {};
    const hex = (h) => `#${h.toString(16).padStart(6, '0')}`;
    const pt = (p) => [+p[0].toFixed(6), +p[1].toFixed(6)];
    const w = (v) => +(v * LINE_SCALE).toFixed(6);
    const resolved = (c) => (c === undefined ? undefined
      : typeof c === 'number' ? c
      : c.final ? c.final(la.d) : c.pending);
    const ops = [];
    for (const [name, e] of this.elems) {
      if (name.startsWith('nq') || name.startsWith('nf')) continue;   // node inspector
      if (e.when && !e.when(la.state, la.d)) continue;   // off in the default state
      if (!e.geo && e.kind !== 'label') continue;
      const base = { name, step: e.intro };
      if (e.outro !== undefined && e.outro !== Infinity) base.until = e.outro;
      const color = resolved(e.color);
      if (color !== undefined) base.color = hex(color);
      if (e.kind === 'seg') {
        ops.push({ op: 'segment', ...base, p: [pt(e.geo.p0), pt(e.geo.p1)], width: w(e.w) });
      } else if (e.kind === 'arrow' || e.kind === 'darrow') {
        const o = { op: 'arrow', ...base, p: [pt(e.geo.tail), pt(e.geo.tip)],
                    width: w(e.w), head: [w(e.headLen), w(e.headW)] };
        if (e.kind === 'darrow') o.dash = e.dash;
        ops.push(o);
      } else if (e.kind === 'strokes') {
        e.geo.forEach(([a, b], i) => {
          if (dist2(a, b) < 1e-9) return;
          ops.push({ op: 'segment', ...base, name: `${name}[${i}]`,
                     p: [pt(a), pt(b)], width: w(e.w) });
        });
      } else if (e.kind === 'dline') {
        if (e.geo.length < 2) continue;
        ops.push({ op: 'polyline', ...base, p: e.geo.map(pt), dash: e.mats[0].dashSize });
      } else if (e.kind === 'circle' || e.kind === 'dcircle') {
        const o = { op: 'circle', ...base, c: pt(e.geo.c), r: +e.geo.r.toFixed(6) };
        if (e.kind === 'dcircle') o.dash = e.mats[0].dashSize;
        ops.push(o);
      } else if (e.kind === 'poly') {
        ops.push({ op: 'polygon', ...base, p: e.geo.map(pt), opacity: e.targetOp });
      } else if (e.kind === 'disk') {
        ops.push({ op: 'point', ...base, c: pt(e.geo), r: e.r });
      } else if (e.kind === 'label') {
        const text = e.el.textContent;
        if (!text || Math.abs(e.pos[1]) > 5e3) continue;   // never positioned
        const cls = [...e.el.classList]
          .filter((c) => !['eq-label', 'flash', 'hover'].includes(c)).join(' ');
        const o = { op: 'label', ...base, text, at: pt(e.pos) };
        if (cls) o.cls = cls;
        ops.push(o);
      } else if (e.kind === 'image') {
        ops.push({ op: 'image', ...base, url: e.url,
                   corners: [pt(e.geo.bl), pt(e.geo.br), pt(e.geo.tl)],
                   opacity: e.mats[0].opacity });
      }
    }
    ops.sort((a, b) => a.step - b.step);   // stable: declaration order within a step
    const live = (v) => (typeof v === 'function' ? v(la.d, la.state) : v);
    return {
      view: (() => { const q = new URLSearchParams(location.search);
        return q.get('ex') ? `ex${q.get('ex')}` : parseInt(q.get('view') ?? '0', 10); })(),
      title: meta.title,
      about: meta.about ?? '',
      frame: meta.frame,
      steps: player.steps.map((s) => ({ title: live(s.t), caption: live(s.d) ?? '' })),
      ops,
    };
  }

  enableDrag(hit, onDrag) {
    this._dragHit = hit;
    const el = this.renderer.domElement;
    let key = null;
    el.addEventListener('pointerdown', (ev) => {
      if (ev.button !== 0) return;
      const w = this.worldFromEvent(ev);
      if (!w) return;
      key = hit(w[0], w[1], this._tolerance());
      if (key) {
        this.controls.enabled = false;
        el.setPointerCapture(ev.pointerId);
      }
    });
    el.addEventListener('pointermove', (ev) => {
      const w = this.worldFromEvent(ev);
      if (!w) return;
      if (key) { onDrag(key, w[0], w[1]); return; }
      el.style.cursor = hit(w[0], w[1], this._tolerance()) ? 'grab' : 'default';
    });
    const release = () => { key = null; this.controls.enabled = true; };
    el.addEventListener('pointerup', release);
    el.addEventListener('pointercancel', release);
  }
}

function dist2(a, b) {
  return Math.hypot(b[0] - a[0], b[1] - a[1]);
}

/** Ear-clipping triangulation of a simple polygon (either winding).
    Returns a flat index array into pts; falls back to a fan for whatever
    a degenerate outline leaves unclipped. */
function earClip(pts) {
  const n = pts.length;
  if (n < 3) return [];
  const cross = (a, b, c) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
  let area = 0;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    area += pts[i][0] * pts[j][1] - pts[j][0] * pts[i][1];
  }
  const idx = [...Array(n).keys()];
  if (area < 0) idx.reverse();               // normalize to CCW
  const inTri = (p, a, b, c) => cross(a, b, p) >= -1e-12 && cross(b, c, p) >= -1e-12
    && cross(c, a, p) >= -1e-12;
  const tris = [];
  let guard = n * n + 8;
  while (idx.length > 3 && guard-- > 0) {
    let clipped = false;
    for (let i = 0; i < idx.length; i++) {
      const i0 = idx[(i + idx.length - 1) % idx.length];
      const i1 = idx[i];
      const i2 = idx[(i + 1) % idx.length];
      const a = pts[i0], b = pts[i1], c = pts[i2];
      if (cross(a, b, c) <= 1e-12) continue;   // reflex / degenerate corner
      let ear = true;
      for (const j of idx) {
        if (j === i0 || j === i1 || j === i2) continue;
        if (inTri(pts[j], a, b, c)) { ear = false; break; }
      }
      if (!ear) continue;
      tris.push(i0, i1, i2);
      idx.splice(i, 1);
      clipped = true;
      break;
    }
    if (!clipped) break;
  }
  for (let i = 1; i < idx.length - 1; i++) tris.push(idx[0], idx[i], idx[i + 1]);
  return tris;
}

// ============================================================================
// sidebar panel widgets
// ============================================================================

export class Panel {
  constructor(root, meta) {
    this.root = root;
    this._syncs = [];
    const head = document.createElement('div');
    head.className = 'panel-head';
    head.innerHTML = `<h1>${meta.title}</h1>${meta.subtitle ? `<p>${meta.subtitle}</p>` : ''}`;
    root.appendChild(head);
    if (meta.about) {
      const about = document.createElement('div');
      about.className = 'panel-section';
      about.innerHTML = `<h2>Description</h2><p class="about">${meta.about}</p>`;
      root.appendChild(about);
    }
  }

  section(title) {
    const sec = document.createElement('div');
    sec.className = 'panel-section';
    sec.innerHTML = `<h2>${title}</h2>`;
    this.root.appendChild(sec);
    return sec;
  }

  slider(sec, obj, key, label, min, max, step, onChange, fmt = (v) => v) {
    const row = document.createElement('div');
    row.className = 'ctl slider';
    row.innerHTML = `<div class="ctl-head"><span>${label}</span><span class="val"></span></div>
                     <input type="range" min="${min}" max="${max}" step="${step}">`;
    sec.appendChild(row);
    const input = row.querySelector('input');
    const val = row.querySelector('.val');
    const sync = () => { input.value = obj[key]; val.textContent = fmt(obj[key]); };
    sync();
    input.addEventListener('input', () => {
      obj[key] = parseFloat(input.value);
      val.textContent = fmt(obj[key]);
      onChange?.();
    });
    this._syncs.push(sync);
    return { sync, set: (v) => { obj[key] = v; sync(); } };
  }

  toggle(sec, obj, key, label, onChange) {
    const row = document.createElement('label');
    row.className = 'ctl toggle';
    row.innerHTML = `<input type="checkbox"><span>${label}</span>`;
    sec.appendChild(row);
    const input = row.querySelector('input');
    const sync = () => { input.checked = !!obj[key]; };
    sync();
    input.addEventListener('change', () => { obj[key] = input.checked; onChange?.(); });
    this._syncs.push(sync);
    return { sync };
  }

  button(sec, label, onClick, cls = '') {
    const b = document.createElement('button');
    b.className = `btn ${cls}`;
    b.textContent = label;
    b.addEventListener('click', onClick);
    sec.appendChild(b);
    return b;
  }

  buttonRow(sec) {
    const row = document.createElement('div');
    row.className = 'btn-row';
    sec.appendChild(row);
    return row;
  }

  syncAll() {
    this._syncs.forEach((s) => s());
  }
}

// ============================================================================
// the construction-steps player
// ============================================================================

export class StepPlayer {
  /**
   * steps: [{t, d, detail, take}] captions; index 0 = empty canvas / intro
   * card. t = title, d = main line, detail = extra monospace lines (array),
   * take = highlighted takeaway line. d / detail / take may also be
   * functions (d, state) => value so captions can carry live computed
   * numbers -- they re-evaluate on every refresh (drag, slider, step).
   * refresh: the view's refresh() -- recomputes geometry, then calls apply().
   */
  constructor(dw, panel, steps, refresh) {
    this.dw = dw;
    this.steps = steps;
    this.refresh = refresh;
    const q = new URLSearchParams(location.search).get('step');  // deep-link a step
    this.k = q === 'last' ? steps.length - 1
      : Math.max(0, Math.min(steps.length - 1, parseInt(q ?? '0', 10) || 0));
    this.speed = 3;
    this._timer = null;
    dw.finalStep = steps.length - 1;

    this.caption = document.createElement('div');
    this.caption.className = 'eq-caption';
    this.caption.innerHTML = `<div class="cap-head"><div class="cap-t"></div><span class="pill"></span></div>
      <div class="cap-d"></div><div class="cap-x"></div><div class="cap-take"></div>`;
    dw.container.appendChild(this.caption);

    // the answer, kept in view at the bottom: exercise views declare
    // meta.result(d, state) -> [lines] and it is shown as soon as it exists
    if (dw.meta && dw.meta.result) {
      this.result = document.createElement('div');
      this.result.className = 'eq-result';
      dw.container.appendChild(this.result);
    }

    // progress bar of the complete drawing (click / drag scrubs the steps)
    this.progress = document.createElement('div');
    this.progress.className = 'eq-progress';
    this.progress.innerHTML = '<div class="fill"></div>';
    dw.container.appendChild(this.progress);
    const scrub = (ev) => {
      const r = this.progress.getBoundingClientRect();
      const f = Math.max(0, Math.min(1, (ev.clientX - r.left) / r.width));
      this._stop();
      this.set(Math.round(f * (this.steps.length - 1)));
    };
    this.progress.addEventListener('pointerdown', (ev) => {
      this.progress.setPointerCapture(ev.pointerId);
      scrub(ev);
    });
    this.progress.addEventListener('pointermove', (ev) => {
      if (ev.buttons) scrub(ev);
    });

    this.cam = false;
    this.ghostPreview = true;
    // how long a draw-in may take: a step lasts 3400/speed ms, leave a margin
    const setBudget = () => { dw.animBudget = (3400 / this.speed) * 0.82; };
    setBudget();
    const sec = panel.section('Construction steps');
    this._slider = panel.slider(sec, this, 'k', 'step', 0, steps.length - 1, 1,
                                () => this.set(this.k));
    panel.slider(sec, this, 'speed', 'speed', 0.5, 5, 0.5, () => {
      setBudget();
      if (this._timer) { this._stop(); this._start(); }
    }, (v) => `${v.toFixed(1)}x`);
    panel.toggle(sec, this, 'cam', 'cam — camera follows the steps', () => {
      if (this.cam) this.dw.glideToStep(this.k);
      else this.dw.glideHome();
    });
    panel.toggle(sec, this, 'ghostPreview', 'ghost — preview the final drawing', () => {
      this.dw.ghostEnabled = this.ghostPreview;
      this.refresh();
    });
    const row = panel.buttonRow(sec);
    panel.button(row, '⏮', () => { this._stop(); this.set(0); });
    panel.button(row, '◀', () => { this._stop(); this.set(this.k - 1); });
    this._playBtn = panel.button(row, '▶ play', () => this.playPause(), 'accent');
    panel.button(row, '▶', () => { this._stop(); this.set(this.k + 1); });
    panel.button(row, '⏭', () => { this._stop(); this.set(this.steps.length - 1); });

    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT') return;
      if (e.key === 'ArrowRight' || e.key === 'Right') { this._stop(); this.set(this.k + 1); }
      else if (e.key === 'ArrowLeft' || e.key === 'Left') { this._stop(); this.set(this.k - 1); }
      else if (e.key === ' ') { e.preventDefault(); this.playPause(); }
    });

    // opening a view starts the construction automatically; a ?step= deep
    // link (or the movie renderer) opts out
    if (q === null) setTimeout(() => { if (!this._timer && this.k === 0) this.playPause(); }, 700);
  }

  set(k) {
    const prev = this.k;
    this.k = Math.max(0, Math.min(this.steps.length - 1, Math.round(k)));
    this._slider.sync();
    this.refresh();
    if (this.cam && this.k !== prev) this.dw.glideToStep(this.k);
  }

  /** Called by the view's refresh() with the freshly computed geometry. */
  apply(d, state) {
    this.dw.applyStep(this.k, d, state);
    const s = this.steps[this.k];
    const live = (v) => (typeof v === 'function' ? v(d, state) : v);
    this.caption.querySelector('.pill').textContent
      = `step ${this.k}/${this.steps.length - 1}`;
    this.caption.querySelector('.cap-t').textContent = live(s.t);
    this.caption.querySelector('.cap-d').textContent = live(s.d) ?? '';
    const det = live(s.detail);
    const x = this.caption.querySelector('.cap-x');
    x.textContent = '';
    for (const line of det ?? []) {
      const div = document.createElement('div');
      div.textContent = line;
      x.appendChild(div);
    }
    x.style.display = det?.length ? '' : 'none';
    const take = live(s.take);
    const tk = this.caption.querySelector('.cap-take');
    tk.textContent = take ?? '';
    tk.style.display = take ? '' : 'none';
    this.progress.querySelector('.fill').style.width
      = `${(100 * this.k) / (this.steps.length - 1)}%`;

    if (this.result) {
      const lines = this.dw.meta.result(d, state) || [];
      this.result.innerHTML = lines.length
        ? `<div class="res-h">Result</div>${lines.map((l) => `<div>${l}</div>`).join('')}`
        : '';
      this.result.style.display = lines.length ? '' : 'none';
    }
  }

  _start() {
    // leave room for the draw-in animation (~1.8s) before the next step
    this._timer = setInterval(() => {
      if (this.k >= this.steps.length - 1) this._stop();
      else this.set(this.k + 1);
    }, 3400 / this.speed);
    this._playBtn.textContent = '⏸ pause';
  }

  _stop() {
    clearInterval(this._timer);
    this._timer = null;
    this._playBtn.textContent = '▶ play';
  }

  playPause() {
    if (this._timer) { this._stop(); return; }
    if (this.k >= this.steps.length - 1) this.set(0);
    this._start();
  }
}
