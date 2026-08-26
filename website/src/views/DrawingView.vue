<script setup lang="ts">
/**
 * DrawingView — the interactive view page: dark sidebar on the left, the
 * drawing viewport on the right, with the step caption card and the
 * scrubbable progress bar over it.  Loads data/view_<id>.json (a COMPAS
 * eqdraw_ops/Drawing file) and plays its construction step by step.
 */
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { loadDrawing, normalizeDrawing, type DrawingData } from '@/lib/drawing'
import DrawingViewer from '@/components/DrawingViewer.vue'
import StepPanel from '@/components/StepPanel.vue'

const props = defineProps<{ id: string }>()

const drawing = ref<DrawingData | null>(null)
const error = ref<string | null>(null)
const step = ref(0)
const speed = ref(3)
const playing = ref(false)
const views = ref<string[]>([])
const viewer = ref<InstanceType<typeof DrawingViewer> | null>(null)
const router = useRouter()

function goto(id: string) {
  router.push(`/view/${id}`)
}

const lastStep = computed(() => (drawing.value ? drawing.value.steps.length - 1 : 0))
const stepInfo = computed(() => drawing.value?.steps[step.value] ?? null)

function setStep(k: number) {
  step.value = Math.max(0, Math.min(lastStep.value, Math.round(k)))
}

// ---- autoplay (a step lasts 3400 / speed ms, like the reference) ---------

let timer: ReturnType<typeof setInterval> | null = null

function stop() {
  if (timer) clearInterval(timer)
  timer = null
  playing.value = false
}

function start() {
  timer = setInterval(() => {
    if (step.value >= lastStep.value) stop()
    else setStep(step.value + 1)
  }, 3400 / speed.value)
  playing.value = true
}

function playPause() {
  if (playing.value) {
    stop()
    return
  }
  if (step.value >= lastStep.value) setStep(0)
  start()
}

watch(speed, () => {
  if (playing.value) {
    stop()
    start()
  }
})

// ---- keyboard: ← / → step, space plays ----------------------------------

function onKeyDown(e: KeyboardEvent) {
  if ((e.target as HTMLElement).tagName === 'INPUT') return
  const cur = views.value.indexOf(props.id)
  if (e.key === 'ArrowRight') {
    stop()
    setStep(step.value + 1)
  } else if (e.key === 'ArrowLeft') {
    stop()
    setStep(step.value - 1)
  } else if (e.key === ' ') {
    e.preventDefault()
    playPause()
  } else if (e.key === 'PageDown' && cur >= 0 && cur < views.value.length - 1) {
    e.preventDefault()
    goto(views.value[cur + 1]!)
  } else if (e.key === 'PageUp' && cur > 0) {
    e.preventDefault()
    goto(views.value[cur - 1]!)
  }
}

// ---- progress bar scrubbing ---------------------------------------------

function scrub(e: PointerEvent) {
  const r = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const f = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width))
  stop()
  setStep(Math.round(f * lastStep.value))
}

function onProgressDown(e: PointerEvent) {
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  scrub(e)
}

function onProgressMove(e: PointerEvent) {
  if (e.buttons) scrub(e)
}

// ---- lifecycle -----------------------------------------------------------

const route = useRoute()

onMounted(async () => {
  window.addEventListener('keydown', onKeyDown)
  fetch(`${import.meta.env.BASE_URL}views.json`)
    .then((r) => r.json())
    .then((ids: (string | number)[]) => (views.value = ids.map(String)))
    .catch(() => (views.value = [props.id]))
  try {
    const raw = await loadDrawing(`${import.meta.env.BASE_URL}view_${props.id}.json`)
    drawing.value = normalizeDrawing(raw)
    document.title = raw.title
    // ?step=K (or step=last) deep-links a construction step and opts out of
    // autoplay; otherwise opening a view starts the construction after a beat,
    // as the reference site does
    const q = route.query.step
    if (q !== undefined) {
      setStep(q === 'last' ? lastStep.value : parseInt(String(q), 10) || 0)
    } else {
      setTimeout(() => {
        if (!playing.value && step.value === 0) playPause()
      }, 700)
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : String(e)
  }
})

onBeforeUnmount(() => {
  stop()
  window.removeEventListener('keydown', onKeyDown)
})
</script>

<template>
  <div class="page">
    <template v-if="drawing">
      <StepPanel
        :drawing="drawing"
        :step="step"
        :speed="speed"
        :playing="playing"
        :views="views"
        :id="props.id"
        @update:step="
          (k) => {
            stop()
            setStep(k)
          }
        "
        @update:speed="(v) => (speed = v)"
        @play-pause="playPause"
        @zoom-fit="viewer?.zoomFit()"
        @goto="goto"
      />
      <main class="viewport">
        <DrawingViewer ref="viewer" :drawing="drawing" :step="step" :speed="speed" />

        <div v-if="stepInfo" class="eq-caption">
          <div class="cap-head">
            <div class="cap-t">{{ stepInfo.title }}</div>
            <span class="pill">step {{ step }}/{{ lastStep }}</span>
          </div>
          <div class="cap-d">{{ stepInfo.caption }}</div>
        </div>

        <div class="eq-progress" @pointerdown="onProgressDown" @pointermove="onProgressMove">
          <div class="fill" :style="{ width: `${(100 * step) / Math.max(lastStep, 1)}%` }" />
        </div>
      </main>
    </template>
    <div v-else-if="error" class="load-error">Could not load view {{ id }}: {{ error }}</div>
    <div v-else class="load-error">Loading…</div>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  height: 100vh;
  overflow: hidden;
}
.viewport {
  position: relative;
  flex: 1;
  min-width: 0;
}
.load-error {
  display: grid;
  place-content: center;
  width: 100%;
  color: #71717a;
  font-size: 14px;
}
</style>
