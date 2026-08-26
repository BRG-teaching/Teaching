<script setup lang="ts">
/**
 * GalleryView — the landing page, a faithful port of the original
 * drawings/web/gallery.html: the brg.ethz.ch-style header stripe, and a
 * responsive grid of cards.  Each card shows the drawing's construction as a
 * silently looping movie over its poster (only if the files exist in data/),
 * with the title and first sentence of the about text.
 *
 * The list of views comes from data/views.json; each card's texts come from
 * its own data/view_<id>.json.  data/ is Vite's publicDir, so those files are
 * served from the site root.
 */
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { loadDrawing } from '@/lib/drawing'

interface Card {
  id: string
  title: string
  about: string
  poster: string
  movie: string
}

const cards = ref<Card[]>([])
const error = ref<string | null>(null)
const count = ref(0)

/** the title without its "Drawing N — " prefix, as on the original gallery */
const shortTitle = (t: string) => t.replace(/^Drawing \d+\s+—\s+/, '')

/** first sentence of the about text, clipped like the original */
function firstSentence(about: string): string {
  let text = (about.match(/^.*?[.!?](?=\s|$)/) || [about])[0]!.trim()
  if (text.length > 140) text = text.slice(0, 140).replace(/\s+\S*$/, '') + '…'
  return text
}

// autoplay the construction loops like GIFs; pause the off-screen ones
let io: IntersectionObserver | null = null

function observeVideo(el: HTMLVideoElement) {
  io ??= new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const v = e.target as HTMLVideoElement
        if (e.isIntersecting) v.play().catch(() => {})
        else v.pause()
      }
    },
    { rootMargin: '120px' },
  )
  io.observe(el)
}

function onVideoPlaying(e: Event) {
  ;(e.target as HTMLVideoElement).classList.add('live')
}

function onVideoError(e: Event) {
  // keep the poster; remove the broken video layer
  ;(e.target as HTMLVideoElement).remove()
}

function videoMounted(el: unknown) {
  if (el instanceof HTMLVideoElement) observeVideo(el)
}

onMounted(async () => {
  document.title = 'eQUILIBRIUM drawings'
  try {
    const base = import.meta.env.BASE_URL
    const ids: (string | number)[] = await (await fetch(`${base}views.json`)).json()
    count.value = ids.length
    cards.value = await Promise.all(
      ids.map(async (rawId) => {
        const id = String(rawId)
        const card: Card = {
          id,
          title: `View ${id}`,
          about: '',
          poster: `${base}view_${id}.png`,
          movie: `${base}view_${id}.mp4`,
        }
        try {
          const d = await loadDrawing(`${base}view_${id}.json`)
          card.title = shortTitle(d.title)
          card.about = firstSentence(d.about)
        } catch {
          /* keep the placeholder title; the card still links to the view */
        }
        return card
      }),
    )
  } catch (e) {
    error.value = e instanceof Error ? e.message : String(e)
  }
})

onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <div class="gallery">
    <header>
      <div class="inner">
        <div>
          <h1>eQUILIBRIUM</h1>
          <p class="sub">an interactive environment for graphic statics-based structural design</p>
          <p class="note">
            Step-by-step graphic statics constructions. Every drawing is a COMPAS JSON file —
            open a card to play its construction, or read the README to add your own drawing
            from Python.
          </p>
        </div>
        <div class="corner">
          <span class="count">{{ count }} drawing{{ count === 1 ? '' : 's' }}</span>
        </div>
      </div>
    </header>
    <nav class="wings">
      <div class="inner"><a class="on" href="#/">Drawings</a></div>
    </nav>

    <div v-if="error" class="load-error">{{ error }}</div>
    <div id="grid">
      <router-link v-for="card in cards" :key="card.id" class="card" :to="`/view/${card.id}`">
        <div class="thumb">
          <img class="poster" loading="lazy" :src="card.poster" @error="onVideoError" />
          <video
            :ref="videoMounted"
            :src="card.movie"
            muted
            loop
            playsinline
            preload="none"
            @playing="onVideoPlaying"
            @error="onVideoError"
          />
        </div>
        <div class="meta">
          <span class="txt">
            <span class="t">{{ card.title }}</span>
            <span v-if="card.about" class="d">{{ card.about }}</span>
          </span>
        </div>
      </router-link>
    </div>
    <footer>
      Every drawing is a series of COMPAS drawing operations — geometry, colors, widths and
      construction steps — authored in Python: see the
      <span class="pink">website README</span> for the tutorial.
    </footer>
  </div>
</template>

<style scoped>
.gallery {
  min-height: 100vh;
  background: #eef0f2;
  font: 400 15px/1.4 Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #111;
}

/* Header stripe = brg.ethz.ch app bar */
header {
  background: #2196ea;
  color: #fff;
}
header .inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 36px 40px 30px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
}
header h1 {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0;
}
header .sub {
  font-size: 14px;
  color: #fff;
  margin: 6px 0 0;
}
header .note {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.88);
  margin: 4px 0 0;
  max-width: 62ch;
}
header .corner {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: none;
}
header .count {
  font: 12px/1 ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
  color: rgba(255, 255, 255, 0.72);
}
nav.wings {
  background: #1b7fc4;
}
nav.wings .inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  gap: 2px;
}
nav.wings a {
  display: block;
  padding: 13px 20px 12px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
}
nav.wings a.on {
  background: #eef0f2;
  color: #1b7fc4;
  font-weight: 700;
}

/* the grid: 1 / 2 / 3 columns at Vuetify's breakpoints, like brg.ethz.ch */
#grid {
  max-width: 1440px;
  margin: 0 auto;
  padding: 48px 40px 64px;
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr;
}
@media (min-width: 600px) {
  #grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 960px) {
  #grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 599.98px) {
  #grid {
    padding: 24px 16px 48px;
  }
  header .inner {
    padding: 28px 16px 24px;
  }
  nav.wings .inner {
    padding: 0 16px;
  }
}

/* flat, edge-to-edge cards as on brg.ethz.ch */
.card {
  display: block;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  background: #fff;
  cursor: pointer;
}
.thumb {
  position: relative;
  aspect-ratio: 660 / 430;
  background: #fff;
  overflow: hidden;
}
.thumb img.poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
/* the loop sits ON TOP of the poster and fades in once it really plays */
.thumb video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: 0;
  transition: opacity 0.25s;
}
.thumb video.live {
  opacity: 1;
}
.meta {
  padding: 24px 16px 32px;
}
.meta .t {
  display: block;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.03125em;
  color: #2196ea;
}
.meta .d {
  display: -webkit-box;
  margin-top: 8px;
  font-size: 0.875rem;
  line-height: 1.425;
  letter-spacing: 0.0178571429em;
  color: #455b6b;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
footer {
  max-width: 1440px;
  margin: 0 auto;
  padding: 8px 40px 40px;
  font-size: 13px;
  color: #71717a;
}
footer .pink {
  color: #ce4095;
}
.load-error {
  max-width: 1440px;
  margin: 0 auto;
  padding: 24px 40px;
  color: #b3261e;
}
</style>
