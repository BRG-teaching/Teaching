<script setup lang="ts">
/**
 * DrawingViewer — renders one drawing with the compas-threejs viewer.
 *
 * The viewer is a black box with a single input (dispatch protobuf bytes), so
 * this component:
 *   - flattens every op into triangle meshes (world-width strokes, arrowheads,
 *     dashes, discs) and dispatches them once at boot;
 *   - reveals / hides / flashes them per construction step with visibility and
 *     material messages;
 *   - plays eqdraw's DRAW-IN animation when a step advances: each new element
 *     grows from its start (segments extend, arrow tips travel, dashed guides
 *     sweep, discs scale, labels fade in), staggered so the cascade fits the
 *     step interval — the mesh is simply re-dispatched with partial geometry
 *     every animation frame;
 *   - fully OWNS the camera: a transparent overlay swallows all pointer input
 *     (the viewer's own controls would rotate — meaningless for a 2D drawing)
 *     and drives pan / zoom through camera commands.  Because the camera state
 *     lives here, labels are plain, crisp DOM elements projected by this
 *     component — identical to the reference site.
 */
import { onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { createViewer, type CompasViewer } from '@compas-dev/compas-threejs-ts'
import type { DrawingData, Op } from '@/lib/drawing'
import { flattenOp, hairlineWidth, opAnimates, partToVertices, type FlatPart } from '@/lib/flatten'
import { ParamSolver } from '@/lib/params'
import { dispatchAll, materialCommand, meshMessage, sceneCommand, visibilityCommand } from '@/lib/dispatcher'

const props = withDefaults(
  defineProps<{
    drawing: DrawingData
    step: number
    /** playback speed — sets the draw-in time budget (3400/speed ms per step) */
    speed?: number
  }>(),
  { speed: 3 },
)

const FOV = 15 // pseudo-orthographic: narrow field of view, camera far away
const TAN_HALF_FOV = Math.tan(((FOV / 2) * Math.PI) / 180)
const smooth = (f: number) => f * f * (3 - 2 * f)

const container = ref<HTMLDivElement | null>(null)
// createViewer mounts its own UI into its container (replacing the content),
// so the viewer gets a dedicated child element and our overlays stay siblings
const viewerHost = ref<HTMLDivElement | null>(null)

let viewer: CompasViewer | null = null
let resizeObserver: ResizeObserver | null = null

interface OpParts {
  op: Op
  parts: FlatPart[]
}
let opParts: OpParts[] = []
let hair = 1
// last dispatched state, to skip redundant messages
const shownColor = new Map<string, string>()
const shownVisible = new Map<string, boolean>()
let lastStepApplied: number | null = null

// parametric layer: solver + pink styling of draggable handle markers
let solver: ParamSolver | null = null
const colorOverride = new Map<string, string>() // part guid → handle color
// op name → current compression/tension color (recomputed on every drag);
// reactive so the number labels recolor too
const dynamicColor = reactive(new Map<string, string>())
const HANDLE_FACE = '#ce4095'
const HANDLE_EDGE = '#a83179'

function baseColor(opName: string, p: FlatPart): string {
  return dynamicColor.get(opName) ?? colorOverride.get(p.guid) ?? p.color
}

/** recompute compression/tension colors and dispatch the changed materials */
function refreshDynamicColors() {
  if (!solver || !viewer) return
  const next = solver.solveColors()
  const msgs: Uint8Array[] = []
  for (const [name, hex] of next) {
    if (dynamicColor.get(name) === hex) continue
    dynamicColor.set(name, hex)
    const entry = opParts.find((e) => e.op.name === name)
    if (!entry) continue // a label — handled reactively by labelStyle
    for (const p of entry.parts) {
      if (shownColor.get(p.guid) === hex) continue
      // while the element is flashing black, applyStep re-resolves it later
      const flashing =
        entry.op.step === lastStepApplied && entry.op.step > 0 && p.flashColor !== null
      if (flashing) continue
      shownColor.set(p.guid, hex)
      msgs.push(materialCommand(`mat:${p.guid}`, p.guid, hex, p.opacity))
    }
  }
  dispatchAll(viewer, msgs)
}

// reactive camera state — label positions derive from it
const cam = reactive({
  cx: 0,
  cy: 0,
  zoom: 1,
  dist: 100,
  width: 1,
  height: 1,
})

function frameCenter(): [number, number] {
  const [bl, tr] = props.drawing.frame
  return [(bl[0] + tr[0]) / 2, (bl[1] + tr[1]) / 2]
}

/** camera distance that fits the frame (with eqdraw's small margins) */
function fitDistance(): number {
  const [bl, tr] = props.drawing.frame
  const halfW = (tr[0] - bl[0]) / 2
  const halfH = (tr[1] - bl[1]) / 2
  const aspect = cam.width / Math.max(cam.height, 1)
  const needH = Math.max(halfH * 1.12, (halfW * 1.06) / aspect)
  return needH / TAN_HALF_FOV
}

/** world units per screen pixel at the drawing plane */
function worldPerPixel(): number {
  const halfH = (cam.dist * TAN_HALF_FOV) / cam.zoom
  return (2 * halfH) / Math.max(cam.height, 1)
}

/** project a drawing-plane point to container pixels */
function project(x: number, y: number): [number, number] {
  const wpp = worldPerPixel()
  return [cam.width / 2 + (x - cam.cx) / wpp, cam.height / 2 - (y - cam.cy) / wpp]
}

function dispatchCamera() {
  if (!viewer) return
  dispatchAll(viewer, [
    sceneCommand('camera_position', { x: cam.cx, y: -cam.dist, z: cam.cy }),
    sceneCommand('camera_target', { x: cam.cx, y: 0, z: cam.cy }),
    sceneCommand('camera_zoom', { zoom: cam.zoom }),
  ])
}

function zoomFit() {
  const [cx, cy] = frameCenter()
  cam.cx = cx
  cam.cy = cy
  cam.zoom = 1
  cam.dist = fitDistance()
  dispatchCamera()
}

defineExpose({ zoomFit })

// ---- draw-in animation ---------------------------------------------------

interface Anim {
  op: Op
  parts: FlatPart[]
  start: number
  dur: number
  done: boolean
}
let anims: Anim[] = []
let rafId = 0
// reactive fade fraction per animating label guid (1 = fully shown)
const labelFade = reactive(new Map<string, number>())

function dispatchOpAt(op: Op, f: number) {
  if (!viewer) return
  const msgs: Uint8Array[] = []
  for (const p of flattenOp(op, hair, lastStepIndex(), f)) {
    msgs.push(meshMessage(p.guid, p.name, partToVertices(p)))
    // re-dispatching a mesh recreates its scene object, which resets its
    // visibility — re-assert "hidden" for parts the current step gates off
    if (shownVisible.get(p.guid) === false) msgs.push(visibilityCommand(p.guid, false))
    // fading fills: the polygon's opacity follows the reveal
    if (op.kind === 'polygon' && op.opacity < 1) {
      msgs.push(
        materialCommand(`mat:${p.guid}`, p.guid, shownColor.get(p.guid) ?? p.color, p.opacity * f),
      )
    }
  }
  dispatchAll(viewer, msgs)
}

function finishAnims() {
  for (const a of anims) if (!a.done) dispatchOpAt(a.op, 1)
  anims = []
  labelFade.clear()
  if (rafId) cancelAnimationFrame(rafId)
  rafId = 0
}

/** eqdraw's cascade: each element grows for `per`, starts spread over budget */
function animateStep(newOps: Op[]) {
  const budget = (3400 / props.speed) * 0.82
  const n = newOps.length
  if (!n) return
  const per = Math.max(180, Math.min(900, budget * 0.45))
  const stagger = n > 1 ? Math.max(0, budget - per) / (n - 1) : 0
  const t0 = performance.now()
  anims = newOps.map((op, i) => ({
    op,
    parts: [],
    start: t0 + i * stagger,
    dur: per,
    done: false,
  }))
  for (const a of anims) {
    if (a.op.kind === 'label') labelFade.set(a.op.guid, 0)
    else dispatchOpAt(a.op, 0.001)
  }
  const tick = () => {
    const now = performance.now()
    let pending = false
    for (const a of anims) {
      if (a.done) continue
      const raw = (now - a.start) / a.dur
      if (raw >= 1) {
        a.done = true
        if (a.op.kind === 'label') labelFade.set(a.op.guid, 1)
        else dispatchOpAt(a.op, 1)
        continue
      }
      pending = true
      const f = smooth(Math.max(raw, 0))
      if (a.op.kind === 'label') labelFade.set(a.op.guid, f)
      else dispatchOpAt(a.op, Math.max(f, 0.001))
    }
    if (pending) rafId = requestAnimationFrame(tick)
    else {
      anims = []
      rafId = 0
    }
  }
  rafId = requestAnimationFrame(tick)
}

// ---- step reveal ---------------------------------------------------------

const lastStepIndex = () => props.drawing.steps.length - 1

function applyStep(k: number) {
  if (!viewer) return
  const advance = lastStepApplied !== null && k === lastStepApplied + 1
  finishAnims()
  const messages: Uint8Array[] = []
  for (const { op, parts } of opParts) {
    const visible = op.step <= k && (op.until === null || k < op.until)
    const flashing = visible && k === op.step && k > 0
    for (const p of parts) {
      if (shownVisible.get(p.guid) !== visible) {
        shownVisible.set(p.guid, visible)
        messages.push(visibilityCommand(p.guid, visible))
      }
      if (!visible) continue
      const color = flashing && p.flashColor ? p.flashColor : baseColor(op.name, p)
      if (shownColor.get(p.guid) !== color) {
        shownColor.set(p.guid, color)
        messages.push(materialCommand(`mat:${p.guid}`, p.guid, color, p.opacity))
      }
    }
  }
  dispatchAll(viewer, messages)
  if (advance && k > 0) {
    animateStep(
      props.drawing.ops.filter(
        (op) => op.step === k && (op.kind === 'label' || opAnimates(op)),
      ),
    )
  }
  lastStepApplied = k
}

watch(
  () => props.step,
  (k) => applyStep(k),
)

// ---- labels --------------------------------------------------------------

function labelOps(): Op[] {
  return props.drawing.ops.filter((o) => o.kind === 'label')
}

function labelVisible(op: Op): boolean {
  return op.step <= props.step && (op.until === null || props.step < op.until)
}

function labelClass(op: Op): string {
  const flash =
    props.step === op.step && op.step > 0 && op.step < lastStepIndex() && op.style !== 'title'
  return `eq-label ${op.style ?? ''} ${flash ? 'flash' : ''}`
}

function labelStyle(op: Op): Record<string, string> {
  const g = op.geometry
  const p = g.type === 'point' ? g.point : [0, 0]
  const [px, py] = project(p[0]!, p[1]!)
  const style: Record<string, string> = { left: `${px}px`, top: `${py}px` }
  const color = dynamicColor.get(op.name) ?? op.color
  if (color) style.color = color
  const fade = labelFade.get(op.guid)
  if (fade !== undefined) style.opacity = String(fade)
  return style
}

// ---- pan / zoom / handle dragging (the overlay owns ALL pointer input) ---

let dragging: 'pan' | 'handle' | false = false
let dragHandle = ''
let lastX = 0
let lastY = 0
// pointer cursor over a draggable handle; normal arrow otherwise
const hoverCursor = ref('default')

function eventWorld(e: PointerEvent): [number, number] {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const wpp = worldPerPixel()
  return [
    cam.cx + (e.clientX - rect.left - cam.width / 2) * wpp,
    cam.cy - (e.clientY - rect.top - cam.height / 2) * wpp,
  ]
}

/** the draggable handle near this pointer position, if any */
function handleAt(e: PointerEvent): string | null {
  if (!solver) return null
  const w = eventWorld(e)
  const tol = 14 * worldPerPixel() // 14 px grab radius
  let best: string | null = null
  let bestD = tol
  for (const h of solver.handles()) {
    const d = Math.hypot(h.pos[0] - w[0], h.pos[1] - w[1])
    if (d < bestD) {
      bestD = d
      best = h.name
    }
  }
  return best
}

function dragSolveDispatch(e: PointerEvent) {
  if (!solver) return
  solver.dragTo(dragHandle, eventWorld(e))
  for (const op of solver.applyBinds()) {
    if (op.kind !== 'label') dispatchOpAt(op, 1)
    // labels follow reactively — their anchors were mutated in place
  }
  refreshDynamicColors()
}

function onPointerDown(e: PointerEvent) {
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  lastX = e.clientX
  lastY = e.clientY
  const h = handleAt(e)
  if (h) {
    dragging = 'handle'
    dragHandle = h
    finishAnims()
  } else {
    dragging = 'pan'
  }
}

function onPointerMove(e: PointerEvent) {
  if (dragging === 'handle') {
    dragSolveDispatch(e)
    return
  }
  if (dragging !== 'pan') {
    hoverCursor.value = handleAt(e) ? 'pointer' : 'default'
    return
  }
  const wpp = worldPerPixel()
  cam.cx -= (e.clientX - lastX) * wpp
  cam.cy += (e.clientY - lastY) * wpp
  lastX = e.clientX
  lastY = e.clientY
  dispatchCamera()
}

function onPointerUp() {
  dragging = false
}

function onWheel(e: WheelEvent) {
  e.preventDefault()
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const px = e.clientX - rect.left
  const py = e.clientY - rect.top
  const wppBefore = worldPerPixel()
  // world point under the cursor stays fixed while zooming
  const wx = cam.cx + (px - cam.width / 2) * wppBefore
  const wy = cam.cy - (py - cam.height / 2) * wppBefore
  const factor = Math.exp(-e.deltaY * 0.0015)
  cam.zoom = Math.min(80, Math.max(0.2, cam.zoom * factor))
  const wppAfter = worldPerPixel()
  cam.cx = wx - (px - cam.width / 2) * wppAfter
  cam.cy = wy + (py - cam.height / 2) * wppAfter
  dispatchCamera()
}

// ---- lifecycle -----------------------------------------------------------

onMounted(() => {
  const el = container.value!
  cam.width = el.clientWidth || 1
  cam.height = el.clientHeight || 1

  viewer = createViewer(viewerHost.value!, {
    mode: 'embedded',
    defaultLighting: false, // materials render pure emissive = exact flat colors
    showToolbar: false,
    onError: (err) => console.error('[compas-viewer]', err.code, err.message, err.details),
  })

  // scene setup: white 2D drawing, nothing else
  dispatchAll(viewer, [
    sceneCommand('background_color', { color: '#ffffff' }),
    sceneCommand('world_axis', { show: false }),
    sceneCommand('show_edges', { show: false }),
    sceneCommand('picker', { enabled: false }),
    sceneCommand('controls_damping', { damping: false }),
    sceneCommand('camera_fov', { fov: FOV }),
  ])
  zoomFit()

  // parametric layer: solve once so bound geometry is consistent, and paint
  // the draggable handle markers pink (as the reference site does)
  if (props.drawing.params) {
    try {
      solver = new ParamSolver(props.drawing.params, props.drawing.ops)
      solver.applyBinds()
      for (const [name, hex] of solver.solveColors()) dynamicColor.set(name, hex)
      for (const h of solver.handles()) {
        const op = props.drawing.ops.find((o) => o.name === h.opName)
        if (op?.kind === 'point') {
          colorOverride.set(`${op.guid}/face`, HANDLE_FACE)
          colorOverride.set(`${op.guid}/edge`, HANDLE_EDGE)
        }
      }
    } catch (e) {
      console.error('[params]', e)
      solver = null
    }
  }

  // geometry: one mesh + one material per colored part, dispatched once
  hair = hairlineWidth(props.drawing)
  opParts = props.drawing.ops
    .filter((o) => o.kind !== 'label')
    .map((op) => ({ op, parts: flattenOp(op, hair, lastStepIndex()) }))
  const boot: Uint8Array[] = []
  for (const { op, parts } of opParts) {
    for (const p of parts) {
      const color = baseColor(op.name, p)
      boot.push(meshMessage(p.guid, p.name, partToVertices(p)))
      boot.push(materialCommand(`mat:${p.guid}`, p.guid, color, p.opacity))
      shownColor.set(p.guid, color)
      shownVisible.set(p.guid, true)
    }
  }
  dispatchAll(viewer, boot)
  applyStep(props.step)

  // regression hook: …#/view/1?drag=B,30,66 drags handle B to the given
  // coordinates (in the drawing's ORIGINAL units) right after boot
  const dragQ = new URLSearchParams(location.hash.split('?')[1] ?? '').get('drag')
  if (dragQ && solver) {
    const [name, x, y] = dragQ.split(',')
    const s = props.drawing.scale
    solver.dragTo(name!, [Number(x) * s, Number(y) * s])
    for (const op of solver.applyBinds()) if (op.kind !== 'label') dispatchOpAt(op, 1)
    refreshDynamicColors()
  }

  resizeObserver = new ResizeObserver(() => {
    cam.width = el.clientWidth || 1
    cam.height = el.clientHeight || 1
    cam.dist = fitDistance()
    viewer?.resize()
    dispatchCamera()
  })
  resizeObserver.observe(el)
})

onBeforeUnmount(() => {
  finishAnims()
  resizeObserver?.disconnect()
  viewer?.dispose()
  viewer = null
})
</script>

<template>
  <div ref="container" class="eq-viewport">
    <div ref="viewerHost" class="eq-viewer-host" />
    <div
      class="eq-nav-overlay"
      :style="{ cursor: hoverCursor }"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
      @wheel="onWheel"
      @dblclick="zoomFit"
    />
    <div class="eq-overlay">
      <div
        v-for="op in labelOps()"
        v-show="labelVisible(op)"
        :key="op.guid"
        :class="labelClass(op)"
        :style="labelStyle(op)"
      >
        {{ op.text }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.eq-viewport {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fff;
}
.eq-viewer-host {
  position: absolute;
  inset: 0;
}
.eq-viewport :deep(canvas) {
  display: block;
}
/* the viewer mounts its own floating UI (sidebars, object-bar button...) —
   this app provides its own controls, so hide all of it */
.eq-viewer-host :deep(button),
.eq-viewer-host :deep(#openObjectBar),
.eq-viewer-host :deep(#sidebar),
.eq-viewer-host :deep(#right-sidebar) {
  display: none !important;
}
</style>
