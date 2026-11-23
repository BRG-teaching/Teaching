<script setup>
import { nextTick, ref } from 'vue';

const props = defineProps({
  label: { type: String, default: 'Presentation' },
  slides: { type: Array, required: true },
});

const dialog = ref(null);
const closeButton = ref(null);
const current = ref(0);

const open = async () => {
  current.value = 0;
  dialog.value.showModal();
  await nextTick();
  closeButton.value.focus();
};
const close = () => dialog.value.close();
const previous = () => { current.value = (current.value + props.slides.length - 1) % props.slides.length; };
const next = () => { current.value = (current.value + 1) % props.slides.length; };
const onKeydown = (event) => {
  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    previous();
  } else if (event.key === 'ArrowRight') {
    event.preventDefault();
    next();
  } else if (event.key === 'Home') {
    event.preventDefault();
    current.value = 0;
  } else if (event.key === 'End') {
    event.preventDefault();
    current.value = props.slides.length - 1;
  }
};
</script>

<template>
  <button type="button" class="presentation-link" @click="open">{{ label }}</button>
  <Teleport to="body">
    <dialog ref="dialog" class="presentation-dialog" :aria-label="label" @close="current = 0" @keydown="onKeydown">
      <header class="presentation-header">
        <strong>{{ label }}</strong>
        <span aria-live="polite">{{ current + 1 }} / {{ slides.length }}</span>
        <button ref="closeButton" type="button" class="presentation-close" aria-label="Close presentation" @click="close">×</button>
      </header>
      <div class="presentation-stage">
        <!-- Slide 3: Triangle-tiled large GIF laptops + 2x2 BRG boxes -->
        <div v-if="slides[current].applications" class="apps-triangle-slide" :aria-label="slides[current].alt">
          <div class="apps-top-center">
            <div v-for="item in slides[current].applications.groups" :key="item.title"
                 class="apps-node" :class="{ emphasis: item.emphasis }">
              <strong>{{ item.title }}</strong>
            </div>
          </div>
          <a v-for="(demo, idx) in slides[current].applications.demos" :key="demo.title"
             class="apps-demo" :class="`pos-${idx}`" :href="demo.url" target="_blank" rel="noopener"
             :title="`Watch ${demo.title} video on YouTube`">
            <div class="apps-demo-tab"><strong>{{ demo.title }}</strong></div>
            <div class="apps-laptop">
              <img class="apps-laptop-frame" :src="slides[current].applications.laptopFrame" alt="">
              <img class="apps-laptop-screen" :src="demo.gif" :alt="`${demo.title} showcase`">
            </div>
          </a>
        </div>

        <!-- Slide 7: Interactive Drawings (YAML internals -> Large Clickable Laptop GIF) -->
        <div v-else-if="slides[current].interactiveDrawing" class="idraw-slide" :aria-label="slides[current].alt">
          <div class="idraw-yaml">
            <div class="idraw-yaml-head"><strong>{{ slides[current].interactiveDrawing.specTitle }}</strong></div>
            <pre class="idraw-yaml-code">{{ slides[current].interactiveDrawing.yaml }}</pre>
          </div>
          <div class="slide-arrow" aria-hidden="true"><i></i></div>
          <a class="idraw-laptop-link" :href="slides[current].interactiveDrawing.url" target="_blank" rel="noopener"
             title="Open live interactive Force Density presentation">
            <div class="apps-laptop">
              <img class="apps-laptop-frame" :src="slides[current].interactiveDrawing.laptopFrame" alt="">
              <img class="apps-laptop-screen" :src="slides[current].interactiveDrawing.gif" alt="Interactive Force Density presentation">
            </div>
            <span class="idraw-click-hint">Click to open interactive viewer ↗</span>
          </a>
        </div>

        <!-- Slide 8: Canonical Graphic Statics Books (with ... in between) -> Digital MCP Resource -->
        <div v-else-if="slides[current].booksResource" class="books-slide" :aria-label="slides[current].alt">
          <p v-if="slides[current].booksResource.lead" class="books-lead">{{ slides[current].booksResource.lead }}</p>
          <div class="books-shelf">
            <template v-for="(book, idx) in slides[current].booksResource.books" :key="book.href || idx">
              <div v-if="book.ellipsis" class="books-ellipsis" aria-label="More graphic statics books">· · ·</div>
              <a v-else class="books-card" :href="book.href" target="_blank" rel="noopener">
                <div class="books-cover-wrap">
                  <img :src="book.cover" :alt="`${book.author} (${book.year})`">
                </div>
                <strong>{{ book.author }}</strong>
                <span>{{ book.year }} · {{ book.short }}</span>
              </a>
            </template>
          </div>
          <div class="books-pipe">
            <template v-for="(step, idx) in slides[current].booksResource.pipeline" :key="step.title">
              <div class="books-pipe-step">
                <div class="books-pipe-box" :class="{ emphasis: step.emphasis }">
                  <strong>{{ step.title }}</strong>
                </div>
                <span>{{ step.sub }}</span>
              </div>
              <div v-if="idx < slides[current].booksResource.pipeline.length - 1" class="books-pipe-arrow" aria-hidden="true"><i></i></div>
            </template>
          </div>
        </div>

        <img v-else :src="slides[current].src" :alt="slides[current].alt">
      </div>
      <footer class="presentation-controls">
        <button type="button" aria-label="Previous slide" @click="previous">← <span>Previous</span></button>
        <div class="presentation-dots" aria-label="Choose slide">
          <button v-for="(slide, index) in slides" :key="slide.src || slide.key || index" type="button" :class="{ active: current === index }"
                  :aria-label="`Go to slide ${index + 1}`" :aria-current="current === index ? 'true' : undefined" @click="current = index"></button>
        </div>
        <button type="button" aria-label="Next slide" @click="next"><span>Next</span> →</button>
      </footer>
    </dialog>
  </Teleport>
</template>
