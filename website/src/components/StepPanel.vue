<script setup lang="ts">
/**
 * StepPanel — the dark sidebar of a drawing view: view navigation
 * (previous / jump / next / gallery), title, about text and the
 * construction-step controls (step + speed sliders, transport buttons),
 * mirroring the reference site's sidebar.
 */
import { computed } from 'vue'
import type { DrawingData } from '@/lib/drawing'

const props = defineProps<{
  drawing: DrawingData
  step: number
  speed: number
  playing: boolean
  /** all view ids of the gallery (for prev / select / next) */
  views: string[]
  /** the current view id */
  id: string
}>()

const emit = defineEmits<{
  (e: 'update:step', k: number): void
  (e: 'update:speed', v: number): void
  (e: 'play-pause'): void
  (e: 'zoom-fit'): void
  (e: 'goto', id: string): void
}>()

const lastStep = computed(() => props.drawing.steps.length - 1)
const cur = computed(() => props.views.indexOf(props.id))

function setStep(v: string | number) {
  emit('update:step', Math.max(0, Math.min(lastStep.value, Math.round(Number(v)))))
}
</script>

<template>
  <aside class="eq-sidebar">
    <div class="viewnav">
      <button
        class="btn"
        title="Previous view (PageUp)"
        :disabled="cur <= 0"
        @click="emit('goto', views[cur - 1]!)"
      >
        ‹
      </button>
      <select
        title="Jump to view"
        :value="id"
        @change="emit('goto', ($event.target as HTMLSelectElement).value)"
      >
        <option v-for="v in views" :key="v" :value="v">View {{ v }}</option>
      </select>
      <button
        class="btn"
        title="Next view (PageDown)"
        :disabled="cur < 0 || cur >= views.length - 1"
        @click="emit('goto', views[cur + 1]!)"
      >
        ›
      </button>
      <router-link class="btn grid-btn" to="/" title="All views">⊞</router-link>
    </div>
    <div class="panel-head">
      <h1>{{ drawing.title }}</h1>
    </div>
    <p class="about">{{ drawing.about }}</p>

    <div class="panel-section">
      <h2>Construction steps</h2>
      <div class="ctl">
        <div class="ctl-head">
          <span>step</span>
          <span class="val">{{ step }} / {{ lastStep }}</span>
        </div>
        <input
          type="range"
          :min="0"
          :max="lastStep"
          :step="1"
          :value="step"
          @input="setStep(($event.target as HTMLInputElement).value)"
        />
      </div>
      <div class="ctl">
        <div class="ctl-head">
          <span>speed</span>
          <span class="val">{{ speed.toFixed(1) }}x</span>
        </div>
        <input
          type="range"
          :min="0.5"
          :max="5"
          :step="0.5"
          :value="speed"
          @input="emit('update:speed', Number(($event.target as HTMLInputElement).value))"
        />
      </div>
      <div class="btn-row">
        <button class="btn" title="Previous step (←)" @click="setStep(step - 1)">◀</button>
        <button class="btn accent" title="Play / pause (space)" @click="emit('play-pause')">
          {{ playing ? '⏸ pause' : '▶ play' }}
        </button>
        <button class="btn" title="Next step (→)" @click="setStep(step + 1)">▶</button>
      </div>
    </div>

    <div class="panel-section">
      <h2>View</h2>
      <div class="btn-row">
        <button class="btn" @click="emit('zoom-fit')">zoom fit</button>
      </div>
    </div>
  </aside>
</template>
