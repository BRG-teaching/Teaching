/**
 * flatten.ts — turn drawing ops into flat triangle meshes.
 *
 * The compas-threejs viewer draws plain lines as 1-pixel hairlines with no
 * dashes and no arrowheads, and does not render Polygon at all.  The reference
 * drawings (drawings/web/lib/eqdraw.js) get their quality from world-space
 * stroke widths with round caps, solid arrowheads and dash patterns — so this
 * module rebuilds exactly that geometry as triangle meshes, one mesh per
 * colored part, which the viewer *can* render.
 *
 * Every builder takes a reveal fraction `f` (0..1): the geometry grown from
 * its start point, exactly like eqdraw's draw-in animation — a segment grows
 * from p0 toward p1, an arrow's tip travels with its head, a dashed guide
 * extends dash by dash, a circle sweeps around, a point disc scales up.
 * `f = 1` (the default) is the finished element.
 *
 * Everything works in 2D drawing coordinates; the mapping into the viewer's
 * 3D world happens once, in `toWorld` (drawing (x, y) + depth layer →
 * world (x, -layer, y), so the camera can look at the XZ plane with its
 * default up = Z axis).
 */

import type { DrawingData, Op, Vec2 } from './drawing'

/**
 * Depth layers, same ordering as eqdraw.js (larger = closer to the viewer).
 * Small values keep the perspective parallax of the near-orthographic camera
 * invisible; drawings are normalized to a 50-unit frame so the depth-buffer
 * resolution comfortably separates them.
 */
const LAYER = { poly: -0.1, guide: -0.05, seg: 0.0, arrow: 0.075, disk: 0.15, diskFace: 0.18 }

/** default colors, from eqdraw.js PAL */
export const DEFAULTS = {
  stroke: '#111111', // black
  guide: '#aaaaaa', // grey construction lines
  diskEdge: '#3c3f46',
  diskFace: '#ffffff',
  flash: '#111111', // elements being drawn are black
  flashDiskFace: '#e8e8e8', // point fill while its step is current
}

/** one renderable piece of an op: a triangle soup with a single color */
export interface FlatPart {
  /** stable id: op guid + part suffix */
  guid: string
  name: string
  /** flat [x0,y0, x1,y1, x2,y2, ...] — three 2D vertices per triangle */
  triangles: number[]
  layer: number
  color: string
  opacity: number
  /** what this part turns into while its step is current (null = never flashes) */
  flashColor: string | null
}

const CAP_SEGMENTS = 14 // same resolution as eqdraw's CAP_GEO
const CIRCLE_SEGMENTS = 120

const lerp2 = (a: Vec2, b: Vec2, f: number): Vec2 => [
  a[0] + (b[0] - a[0]) * f,
  a[1] + (b[1] - a[1]) * f,
]

function pushTri(out: number[], a: Vec2, b: Vec2, c: Vec2) {
  out.push(a[0], a[1], b[0], b[1], c[0], c[1])
}

/** solid quad from p0 to p1 with the given full width */
function pushQuad(out: number[], p0: Vec2, p1: Vec2, width: number) {
  const dx = p1[0] - p0[0]
  const dy = p1[1] - p0[1]
  const l = Math.hypot(dx, dy)
  if (l < 1e-9) return
  const hx = (-dy / l) * (width / 2)
  const hy = (dx / l) * (width / 2)
  const a: Vec2 = [p0[0] + hx, p0[1] + hy]
  const b: Vec2 = [p0[0] - hx, p0[1] - hy]
  const c: Vec2 = [p1[0] - hx, p1[1] - hy]
  const d: Vec2 = [p1[0] + hx, p1[1] + hy]
  pushTri(out, a, b, c)
  pushTri(out, a, c, d)
}

/** round cap / point disc: a triangle fan of the given radius */
function pushDisc(out: number[], c: Vec2, r: number, segments = CAP_SEGMENTS) {
  if (r < 1e-9) return
  for (let i = 0; i < segments; i++) {
    const a0 = (i / segments) * Math.PI * 2
    const a1 = ((i + 1) / segments) * Math.PI * 2
    pushTri(
      out,
      c,
      [c[0] + r * Math.cos(a0), c[1] + r * Math.sin(a0)],
      [c[0] + r * Math.cos(a1), c[1] + r * Math.sin(a1)],
    )
  }
}

/** dashes along p0→p1 as quads, revealed only up to `reveal`·length */
function pushDashes(
  out: number[],
  p0: Vec2,
  p1: Vec2,
  width: number,
  dash: number,
  gap: number,
  reveal = 1,
) {
  const dx = p1[0] - p0[0]
  const dy = p1[1] - p0[1]
  const l = Math.hypot(dx, dy)
  if (l < 1e-9) return
  const ux = dx / l
  const uy = dy / l
  const period = dash + gap
  const lim = l * reveal
  for (let s = 0; s < lim; s += period) {
    const e = Math.min(s + dash, lim)
    pushQuad(out, [p0[0] + ux * s, p0[1] + uy * s], [p0[0] + ux * e, p0[1] + uy * e], width)
  }
}

/** partial polyline: the points covering the first `f` of the total length */
function partialPolyline(pts: Vec2[], f: number): Vec2[] {
  if (f >= 1 || pts.length < 2) return pts
  const lens: number[] = []
  let total = 0
  for (let i = 0; i < pts.length - 1; i++) {
    const l = Math.hypot(pts[i + 1]![0] - pts[i]![0], pts[i + 1]![1] - pts[i]![1])
    lens.push(l)
    total += l
  }
  let remain = f * total
  const out: Vec2[] = [pts[0]!]
  for (let i = 0; i < lens.length && remain > 0; i++) {
    if (remain >= lens[i]!) {
      out.push(pts[i + 1]!)
      remain -= lens[i]!
    } else {
      out.push(lerp2(pts[i]!, pts[i + 1]!, remain / lens[i]!))
      remain = 0
    }
  }
  if (out.length < 2) out.push(out[0]!)
  return out
}

/**
 * Ear-clipping triangulation of a simple polygon (either winding), ported from
 * eqdraw.js — a fan from vertex 0 spills outside concave outlines.
 */
function earClip(pts: Vec2[]): number[] {
  const n = pts.length
  if (n < 3) return []
  const cross = (a: Vec2, b: Vec2, c: Vec2) =>
    (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])
  let area = 0
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n
    area += pts[i]![0] * pts[j]![1] - pts[j]![0] * pts[i]![1]
  }
  const idx = [...Array(n).keys()]
  if (area < 0) idx.reverse()
  const inTri = (p: Vec2, a: Vec2, b: Vec2, c: Vec2) =>
    cross(a, b, p) >= -1e-12 && cross(b, c, p) >= -1e-12 && cross(c, a, p) >= -1e-12
  const tris: number[] = []
  let guard = n * n + 8
  while (idx.length > 3 && guard-- > 0) {
    let clipped = false
    for (let i = 0; i < idx.length; i++) {
      const i0 = idx[(i + idx.length - 1) % idx.length]!
      const i1 = idx[i]!
      const i2 = idx[(i + 1) % idx.length]!
      const a = pts[i0]!
      const b = pts[i1]!
      const c = pts[i2]!
      if (cross(a, b, c) <= 1e-12) continue
      let ear = true
      for (const j of idx) {
        if (j === i0 || j === i1 || j === i2) continue
        if (inTri(pts[j]!, a, b, c)) {
          ear = false
          break
        }
      }
      if (!ear) continue
      tris.push(i0, i1, i2)
      idx.splice(i, 1)
      clipped = true
      break
    }
    if (!clipped) break
  }
  for (let i = 1; i < idx.length - 1; i++) tris.push(idx[0]!, idx[i]!, idx[i + 1]!)
  return tris
}

/** can this op kind animate its geometry growing? (used by the step player) */
export function opAnimates(op: Op): boolean {
  if (op.kind === 'label') return false
  if (op.kind === 'polygon') return op.opacity < 1 // opaque fills pop in (eqdraw)
  return true
}

/**
 * Flatten one op into its renderable parts (labels yield none), revealed up
 * to fraction `f` of its draw-in.  Part guids and colors are stable across
 * `f`, so re-dispatching a part replaces its mesh in place.
 */
export function flattenOp(op: Op, hairWidth: number, lastStep: number, f = 1): FlatPart[] {
  const g = op.geometry
  // final-step elements (the colored "answer" bands) never flash — matching
  // the hand-written views, where they carry flash: false
  const flashes = op.step > 0 && op.step < lastStep
  const flash = flashes ? DEFAULTS.flash : null
  const parts: FlatPart[] = []
  const part = (suffix: string, base: Omit<FlatPart, 'guid' | 'name'>): FlatPart => ({
    guid: `${op.guid}${suffix}`,
    name: `${op.name}${suffix}`,
    ...base,
  })

  if (op.kind === 'label') return []

  if (op.kind === 'point' && g.type === 'point') {
    const r = (op.width || 0.65) * Math.max(f, 0.001)
    const edge: number[] = []
    const face: number[] = []
    pushDisc(edge, g.point, r, 32)
    pushDisc(face, g.point, r * 0.68, 32)
    parts.push(
      part('/edge', {
        triangles: edge,
        layer: LAYER.disk,
        color: DEFAULTS.diskEdge,
        opacity: 1,
        flashColor: flashes ? DEFAULTS.flash : null,
      }),
      part('/face', {
        triangles: face,
        layer: LAYER.diskFace,
        color: op.color ?? DEFAULTS.diskFace,
        opacity: 1,
        flashColor: flashes ? DEFAULTS.flashDiskFace : null,
      }),
    )
    return parts
  }

  if (op.kind === 'segment' && g.type === 'line') {
    const w = op.width || hairWidth
    const q = lerp2(g.start, g.end, f)
    const tris: number[] = []
    pushQuad(tris, g.start, q, w)
    pushDisc(tris, g.start, w / 2)
    pushDisc(tris, q, w / 2)
    parts.push(
      part('', {
        triangles: tris,
        layer: LAYER.seg,
        color: op.color ?? DEFAULTS.stroke,
        opacity: op.opacity,
        flashColor: flash,
      }),
    )
    return parts
  }

  if (op.kind === 'arrow' && g.type === 'line') {
    const w = op.width || hairWidth
    const [headLen, headHalfW] = op.head ?? [w * 3.1, w * 1.18]
    // the tip travels with the reveal; the head rides on the moving tip
    const tp = lerp2(g.start, g.end, Math.max(f, 0.02))
    const dx = tp[0] - g.start[0]
    const dy = tp[1] - g.start[1]
    const l = Math.hypot(dx, dy) || 1e-6
    const ux = dx / l
    const uy = dy / l
    const hl = Math.min(headLen, 0.5 * l)
    const base: Vec2 = [tp[0] - ux * hl, tp[1] - uy * hl]
    const tris: number[] = []
    if (op.dash) {
      // dashed resultant arrow: fixed dash pattern along the shaft (eqdraw darrow)
      const period = op.dash / 0.62
      pushDashes(tris, g.start, base, w, period * 0.62, period * 0.38)
    } else {
      pushQuad(tris, g.start, base, w)
      pushDisc(tris, g.start, w / 2)
    }
    pushTri(
      tris,
      tp,
      [base[0] - uy * headHalfW, base[1] + ux * headHalfW],
      [base[0] + uy * headHalfW, base[1] - ux * headHalfW],
    )
    parts.push(
      part('', {
        triangles: tris,
        layer: LAYER.arrow,
        color: op.color ?? '#3f9c20',
        opacity: op.opacity,
        flashColor: flash,
      }),
    )
    return parts
  }

  if (op.kind === 'polyline' && g.type === 'points') {
    const w = op.width || hairWidth
    const pts = partialPolyline(g.points, f)
    const tris: number[] = []
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i]!
      const b = pts[i + 1]!
      if (op.dash) pushDashes(tris, a, b, w, op.dash, op.dash * 0.8)
      else {
        pushQuad(tris, a, b, w)
        pushDisc(tris, a, w / 2)
        if (i === pts.length - 2) pushDisc(tris, b, w / 2)
      }
    }
    parts.push(
      part('', {
        triangles: tris,
        layer: LAYER.guide,
        color: op.color ?? DEFAULTS.guide,
        opacity: op.opacity,
        flashColor: flash,
      }),
    )
    return parts
  }

  if (op.kind === 'circle' && g.type === 'circle') {
    const w = op.width || hairWidth
    const tris: number[] = []
    const span = Math.PI * 2 * f
    if (op.dash) {
      // dashed guide circle: equal dash and gap along the circumference,
      // swept around as the reveal grows (eqdraw dashedCircle)
      const circumference = 2 * Math.PI * g.radius
      const period = op.dash * 2
      const count = Math.max(4, Math.round(circumference / period))
      for (let i = 0; i < count; i++) {
        const a0 = ((i * period) / circumference) * Math.PI * 2
        const a1 = ((i * period + op.dash) / circumference) * Math.PI * 2
        if (a0 > span) break
        // a short dash is straight enough to draw as one quad
        pushQuad(
          tris,
          [g.center[0] + g.radius * Math.cos(a0), g.center[1] + g.radius * Math.sin(a0)],
          [
            g.center[0] + g.radius * Math.cos(Math.min(a1, span)),
            g.center[1] + g.radius * Math.sin(Math.min(a1, span)),
          ],
          w,
        )
      }
    } else {
      const steps = Math.max(2, Math.round(CIRCLE_SEGMENTS * f))
      for (let i = 0; i < steps; i++) {
        const a0 = (i / steps) * span
        const a1 = ((i + 1) / steps) * span
        pushQuad(
          tris,
          [g.center[0] + g.radius * Math.cos(a0), g.center[1] + g.radius * Math.sin(a0)],
          [g.center[0] + g.radius * Math.cos(a1), g.center[1] + g.radius * Math.sin(a1)],
          w,
        )
      }
    }
    parts.push(
      part('', {
        triangles: tris,
        layer: LAYER.guide,
        color: op.color ?? DEFAULTS.guide,
        opacity: op.opacity,
        flashColor: flash,
      }),
    )
    return parts
  }

  if (op.kind === 'polygon' && g.type === 'points') {
    const tris: number[] = []
    const order = earClip(g.points)
    for (let i = 0; i < order.length; i += 3) {
      pushTri(tris, g.points[order[i]!]!, g.points[order[i + 1]!]!, g.points[order[i + 2]!]!)
    }
    parts.push(
      part('', {
        triangles: tris,
        layer: LAYER.poly,
        color: op.color ?? DEFAULTS.guide,
        opacity: op.opacity,
        flashColor: flash,
      }),
    )
    return parts
  }

  console.warn(`flattenOp: unsupported op kind "${op.kind}" (${op.name}) — skipped`)
  return []
}

/** hairline width: ~1 px at fit zoom, proportional to the frame */
export function hairlineWidth(drawing: DrawingData): number {
  const fw = drawing.frame[1][0] - drawing.frame[0][0]
  return 0.0008 * fw
}

/**
 * drawing (x, y) at depth `layer` → viewer world [x, -layer, y].
 * The camera sits at negative world-Y looking forward, so larger layers
 * (smaller world y) are closer to it, and world Z is the drawing's up.
 */
export function toWorld(x: number, y: number, layer: number): [number, number, number] {
  return [x, -layer, y]
}

/** triangles of a FlatPart as the flat 3D vertex array the mesh message needs */
export function partToVertices(p: FlatPart): number[] {
  const out: number[] = []
  for (let i = 0; i < p.triangles.length; i += 2) {
    const [wx, wy, wz] = toWorld(p.triangles[i]!, p.triangles[i + 1]!, p.layer)
    out.push(wx, wy, wz)
  }
  return out
}
