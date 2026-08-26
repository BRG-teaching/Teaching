/**
 * params.ts — the parametric layer: draggable control points that re-solve
 * the construction.
 *
 * A drawing JSON may carry an optional `params` section describing WHY the
 * geometry is where it is: named points, draggable handles with constraints,
 * a list of rules evaluated in order (offsets along directions, line-line
 * intersections, midpoints, distances), and bindings that rewrite op
 * geometry from the solved values.  Dragging a handle re-runs the rules and
 * the bound ops follow — form and force diagram stay consistent, like the
 * original hand-written views.
 *
 * The vocabulary is deliberately tiny (graphic statics is made of parallels
 * through points and their intersections) so that a COMPAS Python author can
 * write it by hand; see the website README for the reference.
 */

import type { DrawingData, Op, Vec2 } from './drawing'

// ---- the schema ------------------------------------------------------------

export interface PointDef {
  name: string
  /** literal coordinates ... */
  value?: [number, number]
  /** ... or taken from an op's geometry (point ops) at load time */
  op?: string
}

export interface HandleDef extends PointDef {
  /**
   * GeoGebra-style "point on path": the name of a circle / segment /
   * polyline op the handle slides on.  The constraint is read LIVE from
   * that op's current geometry — nothing to duplicate.
   */
  on?: string
  /** explicit constraint (the older, verbose form) */
  constraint?:
    | { type: 'free' }
    | { type: 'circle'; center: string; radius: number }
    | { type: 'segment'; a: string; b: string }
}

/** scalar: a number, or the (scaled) distance between two named points */
export type ScalarExpr = number | { distance: [string, string]; scale?: number }

export type Rule =
  | {
      type: 'offset'
      name: string
      from: string
      /** direction = unit(b − a), optionally rotated (degrees, ccw) */
      a: string
      b: string
      length: ScalarExpr
      rotate?: number
      /** if given, flip the direction so the result lands FARTHER from this
          point — e.g. an arrow stepping aside from a polygon edge always
          steps away from the polygon's interior */
      awayFrom?: string
    }
  | {
      type: 'intersection'
      name: string
      p1: string
      a1: string
      b1: string
      p2: string
      a2: string
      b2: string
    }
  | { type: 'midpoint'; name: string; a: string; b: string }

/**
 * How an op's geometry follows the solved values.  Appears in two places:
 * as `params.bind` entries (with an `op` name), or directly on an op as its
 * `define` field — GeoGebra-style, where an element carries its own formula.
 */
export type BindPayload =
  | { line: { start: string; end: string } }
  | { point: { at: string; offset?: [number, number] } }
  | { circle: { center: string; radius?: ScalarExpr } }
  | { points: { list: (string | [number, number])[] } }
  /** rectangle band along a→b of the given full width (the force bands) */
  | { band: { a: string; b: string; width: ScalarExpr } }

export type Bind = { op: string } & BindPayload

/**
 * Compression / tension coloring, exactly as the original applets decide it:
 * w = ccw angle from the bar vector (node→end) to the force-polygon edge
 * (from→to, in cycle order); GeoGebra's dynamic-color triangle wave then
 * says blue (compression) or pink (tension).  All listed ops (member,
 * force-diagram twin, number labels, band) take the resulting color.
 */
export interface ColorRule {
  ops: string[]
  /** [node, end] — the bar direction */
  bar: [string, string]
  /** [from, to] — the force-polygon edge, in cycle order */
  force: [string, string]
  compression?: string
  tension?: string
}

export interface ParamSpec {
  points?: PointDef[]
  handles?: HandleDef[]
  rules?: Rule[]
  bind?: Bind[]
  colors?: ColorRule[]
}

// ---- the solver ------------------------------------------------------------

const sub = (a: Vec2, b: Vec2): Vec2 => [a[0] - b[0], a[1] - b[1]]
const add = (a: Vec2, b: Vec2): Vec2 => [a[0] + b[0], a[1] + b[1]]
const mul = (a: Vec2, s: number): Vec2 => [a[0] * s, a[1] * s]
const norm = (a: Vec2): number => Math.hypot(a[0], a[1])
const unit = (a: Vec2): Vec2 => {
  const l = norm(a) || 1e-12
  return [a[0] / l, a[1] / l]
}
const rot = (a: Vec2, deg: number): Vec2 => {
  const r = (deg * Math.PI) / 180
  const c = Math.cos(r)
  const s = Math.sin(r)
  return [a[0] * c - a[1] * s, a[0] * s + a[1] * c]
}

const TAU = Math.PI * 2
/** GeoGebra Angle[u, v]: ccw angle from u to v in [0, 2π) — from lib/vec.js */
function ggbAngle(u: Vec2, v: Vec2): number {
  const a = Math.atan2(u[0] * v[1] - u[1] * v[0], u[0] * v[0] + u[1] * v[1])
  return ((a % TAU) + TAU) % TAU
}
/** GeoGebra dynamic-color triangle wave (period 2) — from lib/vec.js */
function ggbComponent(v: number): number {
  const t = v / 2 - Math.floor(v / 2)
  return t > 0.5 ? 2 * (1 - t) : 2 * t
}
/** Dynamic color (w − π, 0, w): blue channel ≥ red channel = compression */
const isCompression = (w: number) => ggbComponent(w) >= ggbComponent(w - Math.PI)

function opPoint(op: Op): Vec2 {
  const g = op.geometry
  if (g.type === 'point') return [...g.point]
  if (g.type === 'line') return [...g.start]
  if (g.type === 'circle') return [...g.center]
  return [...(g.points[0] ?? [0, 0])]
}

export class ParamSolver {
  private spec: ParamSpec
  private opsByName = new Map<string, Op>()
  private orderedRules: Rule[] = []
  private binds: Bind[] = []
  /** current handle positions (the drag state) */
  readonly handlePos = new Map<string, Vec2>()
  private env = new Map<string, Vec2 | number>()

  constructor(spec: ParamSpec, ops: Op[]) {
    this.spec = spec
    for (const op of ops) this.opsByName.set(op.name, op)
    for (const h of spec.handles ?? []) {
      this.handlePos.set(h.name, this.initial(h))
    }
    this.orderedRules = sortRules(spec.rules ?? [])
    // binds = explicit entries + every op that carries its own `define`
    this.binds = [...(spec.bind ?? [])]
    for (const op of ops) {
      if (op.define) this.binds.push({ op: op.name, ...op.define })
    }
    this.solve()
  }

  private initial(p: PointDef): Vec2 {
    if (p.value) return [...p.value]
    const op = p.op ? this.opsByName.get(p.op) : undefined
    if (op) return opPoint(op)
    return [0, 0]
  }

  private pt(name: string): Vec2 {
    const v = this.env.get(name)
    if (!Array.isArray(v)) throw new Error(`params: unknown point "${name}"`)
    return v
  }

  private scalar(e: ScalarExpr): number {
    if (typeof e === 'number') return e
    const d = norm(sub(this.pt(e.distance[0]), this.pt(e.distance[1])))
    return d * (e.scale ?? 1)
  }

  /** the ops (by name) that have a bind — i.e. that dragging can change */
  boundOps(): string[] {
    return this.binds.map((b) => b.op)
  }

  handles(): { name: string; pos: Vec2; opName?: string }[] {
    return (this.spec.handles ?? []).map((h) => ({
      name: h.name,
      pos: this.handlePos.get(h.name)!,
      opName: h.op,
    }))
  }

  /** project onto a segment a→b */
  private projectSegment(target: Vec2, a: Vec2, b: Vec2): Vec2 {
    const ab = sub(b, a)
    const t = Math.max(
      0,
      Math.min(1, ((target[0] - a[0]) * ab[0] + (target[1] - a[1]) * ab[1]) / (norm(ab) ** 2 || 1)),
    )
    return add(a, mul(ab, t))
  }

  /** project a dragged position onto the handle's constraint and store it */
  dragTo(name: string, target: Vec2) {
    const h = (this.spec.handles ?? []).find((x) => x.name === name)
    if (!h) return
    let p: Vec2 = [...target]
    // "on": slide on a named op's CURRENT geometry (GeoGebra's Point(path))
    const path = h.on ? this.opsByName.get(h.on)?.geometry : undefined
    if (path?.type === 'circle') {
      p = add(path.center, mul(unit(sub(target, path.center)), path.radius))
    } else if (path?.type === 'line') {
      p = this.projectSegment(target, path.start, path.end)
    } else if (path?.type === 'points' && path.points.length > 1) {
      let best = Infinity
      for (let i = 0; i < path.points.length - 1; i++) {
        const q = this.projectSegment(target, path.points[i]!, path.points[i + 1]!)
        const d = norm(sub(q, target))
        if (d < best) {
          best = d
          p = q
        }
      }
    } else if (h.constraint?.type === 'circle') {
      const center = this.pt(h.constraint.center)
      p = add(center, mul(unit(sub(target, center)), h.constraint.radius))
    } else if (h.constraint?.type === 'segment') {
      p = this.projectSegment(target, this.pt(h.constraint.a), this.pt(h.constraint.b))
    }
    this.handlePos.set(name, p)
    this.solve()
  }

  /** evaluate points, handles and rules into the value environment */
  solve() {
    this.env.clear()
    for (const p of this.spec.points ?? []) this.env.set(p.name, this.initial(p))
    for (const h of this.spec.handles ?? []) this.env.set(h.name, this.handlePos.get(h.name)!)
    for (const r of this.orderedRules) {
      if (r.type === 'offset') {
        let dir = unit(sub(this.pt(r.b), this.pt(r.a)))
        if (r.rotate) dir = rot(dir, r.rotate)
        const from = this.pt(r.from)
        const len = this.scalar(r.length)
        let p = add(from, mul(dir, len))
        if (r.awayFrom) {
          const ref = this.pt(r.awayFrom)
          const p2 = add(from, mul(dir, -len))
          if (norm(sub(p2, ref)) > norm(sub(p, ref))) p = p2
        }
        this.env.set(r.name, p)
      } else if (r.type === 'midpoint') {
        this.env.set(r.name, mul(add(this.pt(r.a), this.pt(r.b)), 0.5))
      } else if (r.type === 'intersection') {
        const p1 = this.pt(r.p1)
        const d1 = unit(sub(this.pt(r.b1), this.pt(r.a1)))
        const p2 = this.pt(r.p2)
        const d2 = unit(sub(this.pt(r.b2), this.pt(r.a2)))
        const denom = d1[0] * d2[1] - d1[1] * d2[0]
        if (Math.abs(denom) < 1e-12) {
          this.env.set(r.name, p1) // parallel: degenerate, keep something sane
        } else {
          const t = ((p2[0] - p1[0]) * d2[1] - (p2[1] - p1[1]) * d2[0]) / denom
          this.env.set(r.name, add(p1, mul(d1, t)))
        }
      }
    }
  }

  private resolveVertex(v: string | [number, number]): Vec2 {
    return typeof v === 'string' ? this.pt(v) : [...v]
  }

  /** op name → '#rrggbb' from the compression/tension rules (post-solve) */
  solveColors(): Map<string, string> {
    const out = new Map<string, string>()
    for (const r of this.spec.colors ?? []) {
      const bar = sub(this.pt(r.bar[1]), this.pt(r.bar[0]))
      const force = sub(this.pt(r.force[1]), this.pt(r.force[0]))
      const w = ggbAngle(bar, force)
      const hex = isCompression(w) ? (r.compression ?? '#1a1eb2') : (r.tension ?? '#ce4095')
      for (const name of r.ops) out.set(name, hex)
    }
    return out
  }

  /** rewrite bound op geometry from the solved values; returns changed ops */
  applyBinds(): Op[] {
    const changed: Op[] = []
    for (const b of this.binds) {
      const op = this.opsByName.get(b.op)
      if (!op) continue
      if ('line' in b && op.geometry.type === 'line') {
        op.geometry.start = this.pt(b.line.start)
        op.geometry.end = this.pt(b.line.end)
      } else if ('point' in b && op.geometry.type === 'point') {
        const o = b.point.offset ?? [0, 0]
        op.geometry.point = add(this.pt(b.point.at), o)
      } else if ('circle' in b && op.geometry.type === 'circle') {
        op.geometry.center = this.pt(b.circle.center)
        if (b.circle.radius !== undefined) op.geometry.radius = this.scalar(b.circle.radius)
      } else if ('points' in b && op.geometry.type === 'points') {
        op.geometry.points = b.points.list.map((v) => this.resolveVertex(v))
      } else if ('band' in b && op.geometry.type === 'points') {
        const a = this.pt(b.band.a)
        const bb = this.pt(b.band.b)
        const h = mul(rot(unit(sub(bb, a)), 90), this.scalar(b.band.width) / 2)
        op.geometry.points = [add(a, h), sub(a, h), sub(bb, h), add(bb, h)]
      } else {
        continue
      }
      changed.push(op)
    }
    return changed
  }
}

/**
 * Order rules so every name is defined before it is used (GeoGebra sorts its
 * dependency graph the same way — authors never think about rule order).
 * Names that no rule produces (points, handles) count as already available.
 * A cycle keeps the written order and warns.
 */
function sortRules(rules: Rule[]): Rule[] {
  const producers = new Map<string, Rule>()
  for (const r of rules) producers.set(r.name, r)
  const deps = (r: Rule): string[] => {
    const names: (string | undefined)[] = []
    if (r.type === 'offset') {
      names.push(r.from, r.a, r.b, r.awayFrom)
      if (typeof r.length === 'object') names.push(...r.length.distance)
    } else if (r.type === 'intersection') {
      names.push(r.p1, r.a1, r.b1, r.p2, r.a2, r.b2)
    } else {
      names.push(r.a, r.b)
    }
    return names.filter((n): n is string => n !== undefined && producers.has(n))
  }
  const out: Rule[] = []
  const state = new Map<string, 'visiting' | 'done'>()
  let cyclic = false
  const visit = (r: Rule) => {
    const st = state.get(r.name)
    if (st === 'done') return
    if (st === 'visiting') {
      cyclic = true
      return
    }
    state.set(r.name, 'visiting')
    for (const d of deps(r)) visit(producers.get(d)!)
    state.set(r.name, 'done')
    out.push(r)
  }
  for (const r of rules) visit(r)
  if (cyclic) {
    console.warn('[params] rule cycle detected — keeping written order')
    return rules
  }
  return out
}

/** scale one bind/define payload by the normalization factor */
export function scaleBindPayload<T extends BindPayload>(b: T, s: number): T {
  const sp = (v: [number, number]): [number, number] => [v[0] * s, v[1] * s]
  const sc = (e: ScalarExpr): ScalarExpr => (typeof e === 'number' ? e * s : e)
  if ('point' in b && b.point.offset)
    return { ...b, point: { ...b.point, offset: sp(b.point.offset) } }
  if ('band' in b) return { ...b, band: { ...b.band, width: sc(b.band.width) } }
  if ('circle' in b && b.circle.radius !== undefined)
    return { ...b, circle: { ...b.circle, radius: sc(b.circle.radius) } }
  if ('points' in b)
    return {
      ...b,
      points: { list: b.points.list.map((v) => (typeof v === 'string' ? v : sp(v))) },
    }
  return b
}

/** scale a params spec by the drawing-normalization factor */
export function scaleParams(spec: ParamSpec, s: number): ParamSpec {
  const sp = (v?: [number, number]): [number, number] | undefined =>
    v ? [v[0] * s, v[1] * s] : undefined
  const sc = (e: ScalarExpr): ScalarExpr =>
    typeof e === 'number' ? e * s : e // distances live in scaled space already
  return {
    points: (spec.points ?? []).map((p) => ({ ...p, value: sp(p.value) })),
    handles: (spec.handles ?? []).map((h) => ({
      ...h,
      value: sp(h.value),
      constraint:
        h.constraint?.type === 'circle'
          ? { ...h.constraint, radius: h.constraint.radius * s }
          : h.constraint,
    })),
    rules: (spec.rules ?? []).map((r) =>
      r.type === 'offset' ? { ...r, length: sc(r.length) } : r,
    ),
    bind: (spec.bind ?? []).map((b) => scaleBindPayload(b, s)),
    colors: spec.colors,
  }
}
