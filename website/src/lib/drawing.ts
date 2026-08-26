/**
 * drawing.ts — load and parse a COMPAS "eqdraw_ops/Drawing" JSON file.
 *
 * The JSON is produced in Python with the eqdraw_ops package
 * (drawings/python/eqdraw_ops.py) and compas.json_dump().  Every value is a
 * standard COMPAS dtype envelope: { "dtype": "...", "data": {...}, "guid": "..." }.
 * This module unwraps those envelopes into plain, typed JavaScript objects —
 * nothing here knows about three.js or protobuf.
 */

import { scaleBindPayload, scaleParams } from './params'

export type Vec2 = [number, number]

export type OpKind = 'point' | 'segment' | 'polyline' | 'polygon' | 'circle' | 'label' | 'arrow'

export interface Op {
  kind: OpKind
  name: string
  guid: string
  /** construction step at which the element appears (0 = visible from the start) */
  step: number
  /** step at which it disappears again, or null = stays forever */
  until: number | null
  /** '#rrggbb' or null (null = the kind's default color) */
  color: string | null
  opacity: number
  /** stroke width in drawing units; 0 = hairline */
  width: number
  /** dash length in drawing units, or null = solid */
  dash: number | null
  /** label text */
  text: string | null
  /** label style: 'title' | 'point' | 'num' | null */
  style: string | null
  /** arrow head [length, halfWidth] in drawing units */
  head: [number, number] | null
  /** parsed geometry, meaning depends on kind */
  geometry: OpGeometry
  /**
   * optional GeoGebra-style formula: how this op's geometry follows the
   * solved parametric values (see params.ts BindPayload), e.g.
   * {"line": {"start": "A", "end": "B"}} — the element carries its own rule
   */
  define: import('./params').BindPayload | null
}

export type OpGeometry =
  | { type: 'point'; point: Vec2 }
  | { type: 'line'; start: Vec2; end: Vec2 }
  | { type: 'points'; points: Vec2[] }
  | { type: 'circle'; center: Vec2; radius: number }

export interface StepInfo {
  title: string
  caption: string
}

export interface DrawingData {
  view: number | string
  title: string
  about: string
  /** [[xmin, ymin], [xmax, ymax]] of the drawing frame */
  frame: [Vec2, Vec2]
  steps: StepInfo[]
  ops: Op[]
  /** optional parametric section (draggable handles + rules), see params.ts */
  params: import('./params').ParamSpec | null
  /** normalization factor applied to the original drawing coordinates */
  scale: number
}

/** compas.colors/Color stores float sRGB channels; convert to a css hex string. */
function colorToHex(envelope: any): string | null {
  if (!envelope || !envelope.data) return null
  const d = envelope.data
  const to255 = (v: number) =>
    Math.max(0, Math.min(255, Math.round(v * 255)))
      .toString(16)
      .padStart(2, '0')
  return `#${to255(d.red)}${to255(d.green)}${to255(d.blue)}`
}

function xy(p: number[]): Vec2 {
  return [p[0] ?? 0, p[1] ?? 0]
}

function parseGeometry(envelope: any): OpGeometry {
  const dtype: string = envelope?.dtype ?? ''
  const d = envelope?.data
  if (dtype.endsWith('/Point')) return { type: 'point', point: xy(d) }
  if (dtype.endsWith('/Line')) return { type: 'line', start: xy(d.start), end: xy(d.end) }
  if (dtype.endsWith('/Polyline') || dtype.endsWith('/Polygon'))
    return { type: 'points', points: d.points.map(xy) }
  if (dtype.endsWith('/Circle'))
    return { type: 'circle', center: xy(d.frame.point), radius: d.radius }
  throw new Error(`Unsupported geometry dtype: ${dtype}`)
}

export function parseDrawing(json: any): DrawingData {
  if (json?.dtype !== 'eqdraw_ops/Drawing') {
    throw new Error(`Not an eqdraw_ops/Drawing file (dtype: ${json?.dtype})`)
  }
  const d = json.data
  const ops: Op[] = []
  for (const opEnv of d.ops ?? []) {
    const o = opEnv.data
    ops.push({
      kind: o.kind,
      name: o.name ?? opEnv.name ?? '',
      guid: opEnv.guid,
      step: o.step ?? 0,
      until: o.until ?? null,
      color: colorToHex(o.color),
      opacity: o.opacity ?? 1.0,
      width: o.width ?? 0,
      dash: o.dash ?? null,
      text: o.text ?? null,
      style: o.style ?? null,
      head: o.head ?? null,
      define: o.define ?? null,
      geometry: parseGeometry(o.geometry),
    })
  }
  return {
    view: d.view,
    title: d.title ?? '',
    about: d.about ?? '',
    frame: [xy(d.frame[0]), xy(d.frame[1])],
    steps: (d.steps ?? []).map((s: any) => ({ title: s.title ?? '', caption: s.caption ?? '' })),
    ops,
    params: d.params ?? null,
    scale: 1,
  }
}

export async function loadDrawing(url: string): Promise<DrawingData> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Could not fetch ${url}: ${res.status}`)
  return parseDrawing(await res.json())
}

/**
 * Scale a drawing uniformly so its frame is `targetWidth` world units wide.
 * Drawings arrive in arbitrary coordinate scales; normalizing keeps the
 * camera distance — and with it the depth-buffer resolution — predictable.
 */
export function normalizeDrawing(d: DrawingData, targetWidth = 50): DrawingData {
  const s = targetWidth / (d.frame[1][0] - d.frame[0][0] || 1)
  const sp = (p: Vec2): Vec2 => [p[0] * s, p[1] * s]
  const geometry = (g: OpGeometry): OpGeometry => {
    if (g.type === 'point') return { type: 'point', point: sp(g.point) }
    if (g.type === 'line') return { type: 'line', start: sp(g.start), end: sp(g.end) }
    if (g.type === 'points') return { type: 'points', points: g.points.map(sp) }
    return { type: 'circle', center: sp(g.center), radius: g.radius * s }
  }
  return {
    ...d,
    frame: [sp(d.frame[0]), sp(d.frame[1])],
    ops: d.ops.map((op) => ({
      ...op,
      width: op.width * s,
      dash: op.dash === null ? null : op.dash * s,
      head: op.head === null ? null : [op.head[0] * s, op.head[1] * s],
      define: op.define === null ? null : scaleBindPayload(op.define, s),
      geometry: geometry(op.geometry),
    })),
    params: d.params ? scaleParams(d.params, s) : null,
    scale: d.scale * s,
  }
}
