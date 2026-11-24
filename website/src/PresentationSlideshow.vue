<script setup>
import { computed, nextTick, ref } from 'vue';
import ContextStack from './ContextStack.vue';
import LaptopFrame from './LaptopFrame.vue';
import MethodIcon from './MethodIcon.vue';
import './presentation.css';

const props = defineProps({
  label: { type: String, default: 'Presentation' },
  slides: { type: Array, required: true },
});

const dialog = ref(null);
const closeButton = ref(null);
const current = ref(0);
const slide = computed(() => props.slides[current.value]);
const number = (value) => String(value).padStart(2, '0');

// a YAML line as its indent and dash, its key and the rest
const yamlLines = (text) => text.split('\n').map((line) => {
  const [, lead, key, rest] = line.match(/^(\s*(?:- )?)([\w-]+:)?(.*)$/);
  return { lead, key, rest };
});

const open = async () => {
  current.value = 0;
  dialog.value.showModal();
  await nextTick();
  closeButton.value.focus();
};
const close = () => dialog.value.close();
const previous = () => { current.value = (current.value + props.slides.length - 1) % props.slides.length; };
const next = () => { current.value = (current.value + 1) % props.slides.length; };
const jumpToGroup = (title) => {
  const idx = props.slides.findIndex((s) => s.applications?.groups?.some((g) => g.title === title && g.emphasis));
  if (idx >= 0) current.value = idx;
};
// the focused link or button leaves with its slide: the dialog takes the focus back, so the arrow keys go on working
const keepFocus = () => { if (!dialog.value.contains(document.activeElement)) dialog.value.focus(); };
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
    <dialog ref="dialog" class="deck" tabindex="-1" :aria-label="label" @close="current = 0" @keydown="onKeydown">
      <header class="deck-header">
        <strong>{{ label }}</strong>
        <span class="deck-count" aria-live="polite" :aria-label="`Slide ${current + 1} of ${slides.length}`"><b>{{ number(current + 1) }}</b> / {{ number(slides.length) }}</span>
        <button ref="closeButton" type="button" class="deck-close" aria-label="Close presentation" @click="close">×</button>
      </header>

      <div class="deck-stage">
        <Transition name="deck-slide" mode="out-in" @after-leave="keepFocus">
          <section :key="current" class="deck-slide" :aria-label="slide.alt">

            <!-- one laptop -->
            <div v-if="slide.opening" class="slide-center">
              <LaptopFrame class="laptop-large"><img :src="slide.opening.screen" :alt="slide.alt"></LaptopFrame>
            </div>

            <!-- books, the laptop with scripts and LLM, the tablet, and what it is used for -->
            <div v-else-if="slide.sources" class="slide-sources">
              <figure class="sources-books">
                <figcaption><span v-for="language in slide.sources.languages" :key="language">{{ language }}</span></figcaption>
                <img :src="slide.sources.books" alt="">
              </figure>
              <i class="dotted-arrow" aria-hidden="true"></i>
              <figure class="sources-laptop">
                <figcaption><span v-for="part in slide.sources.parts" :key="part">{{ part }}</span></figcaption>
                <LaptopFrame><img :src="slide.sources.screen" :alt="slide.alt"></LaptopFrame>
              </figure>
              <i class="dotted-arrow" aria-hidden="true"></i>
              <div class="tablet"><img :src="slide.sources.tablet" alt=""></div>
              <ul class="sources-uses"><li v-for="use in slide.sources.uses" :key="use">{{ use }}</li></ul>
            </div>

            <!-- the four BRG pillars, the highlight stepping through them -->
            <div v-else-if="slide.applications" class="slide-pillars">
              <nav class="pillars" aria-label="BRG pillars">
                <button v-for="item in slide.applications.groups" :key="item.title" type="button" class="pillar"
                        :class="{ hot: item.emphasis }" :aria-pressed="item.emphasis ? 'true' : 'false'" @click="jumpToGroup(item.title)">
                  {{ item.title }}
                </button>
              </nav>

              <div v-if="slide.applications.demos" class="demos">
                <figure v-for="demo in slide.applications.demos" :key="demo.title" class="demo">
                  <LaptopFrame :url="demo.url" :title="`Watch ${demo.title} video on YouTube`"><img :src="demo.gif" :alt="`${demo.title} showcase`"></LaptopFrame>
                  <figcaption>{{ demo.title }}</figcaption>
                </figure>
              </div>

              <LaptopFrame v-else-if="slide.applications.singleLaptop" class="laptop-pillar" :url="slide.applications.singleLaptop.url"
                           :title="slide.applications.singleLaptop.title">
                <img :src="slide.applications.singleLaptop.screen" :alt="slide.alt">
              </LaptopFrame>

              <div v-else-if="slide.applications.booksResource" class="books">
                <div class="books-shelf">
                  <template v-for="(book, i) in slide.applications.booksResource.books" :key="book.href || i">
                    <div v-if="book.ellipsis" class="books-more" aria-label="More graphic statics books">···</div>
                    <a v-else class="book" :href="book.href" target="_blank" rel="noopener">
                      <img :src="book.cover" :alt="`${book.author} (${book.year})`">
                      <strong>{{ book.author }}</strong>
                      <span><b>{{ book.year }}</b> {{ book.short }}</span>
                    </a>
                  </template>
                </div>
                <ol class="pipeline">
                  <li v-for="step in slide.applications.booksResource.pipeline" :key="step.title" :class="{ hot: step.emphasis }">
                    <strong>{{ step.title }}</strong><span>{{ step.sub }}</span>
                  </li>
                </ol>
              </div>
            </div>

            <!-- context layers connected to BRG, over the pipeline that feeds them -->
            <div v-else-if="slide.architecture" class="slide-architecture">
              <ContextStack v-bind="slide.architecture.stack" />
              <ol class="pipeline">
                <li v-for="(step, i) in slide.architecture.pipeline" :key="step.title" :class="{ hot: i === slide.architecture.pipeline.length - 1 }">
                  <strong>{{ step.title }}</strong><span>{{ step.sub }}</span>
                </li>
              </ol>
            </div>

            <!-- the four methods, one of them in focus -->
            <div v-else-if="slide.methods" class="slide-methods">
              <div v-for="method in slide.methods" :key="method.title" class="method" :class="{ hot: method.emphasis }">
                <MethodIcon :method="method.title" />
                <strong>{{ method.title }}</strong>
                <span>{{ method.sub }}</span>
              </div>
            </div>

            <!-- the folder of a method -->
            <div v-else-if="slide.folder" class="slide-folder">
              <div class="method hot">
                <MethodIcon :method="slide.folder.title" />
                <strong>{{ slide.folder.title }}</strong>
                <span>{{ slide.folder.sub }}</span>
              </div>
              <i class="dotted-arrow" aria-hidden="true"></i>
              <div class="window">
                <div class="window-head"><i class="icon-folder" aria-hidden="true"></i>{{ slide.folder.root }}</div>
                <ol class="tree">
                  <li v-for="entry in slide.folder.entries" :key="entry" :class="{ folder: entry.endsWith('/') }">
                    <i :class="entry.endsWith('/') ? 'icon-folder' : 'icon-file'" aria-hidden="true"></i>{{ entry }}
                  </li>
                </ol>
              </div>
            </div>

            <!-- interactive drawings: the decks and their YAML beside a live laptop -->
            <div v-else-if="slide.interactiveDrawing" class="slide-drawing">
              <div class="drawing-left">
                <div class="window">
                  <div class="window-head"><strong>{{ slide.interactiveDrawing.methodTitle }}</strong><span>{{ slide.interactiveDrawing.methodSub }}</span></div>
                  <nav class="drawing-list" :aria-label="`${slide.interactiveDrawing.methodTitle} presentations`">
                    <a v-for="(deck, i) in slide.interactiveDrawing.presentations" :key="deck.url" :class="{ hot: deck.active }"
                       :href="deck.url" target="_blank" rel="noopener">
                      <b>{{ number(i + 1) }}</b><span>{{ deck.title }}</span><i aria-hidden="true">↗</i>
                    </a>
                  </nav>
                </div>
                <div class="window">
                  <div class="window-head"><i class="icon-file" aria-hidden="true"></i>{{ slide.interactiveDrawing.specTitle }}</div>
                  <ol class="yaml">
                    <li v-for="(line, i) in yamlLines(slide.interactiveDrawing.yaml)" :key="i"><code>{{ line.lead }}<b>{{ line.key }}</b>{{ line.rest }}</code></li>
                  </ol>
                </div>
              </div>
              <i class="dotted-arrow" aria-hidden="true"></i>
              <div class="drawing-right">
                <LaptopFrame :url="slide.interactiveDrawing.url" :title="`Open live interactive ${slide.interactiveDrawing.methodTitle || ''} presentation`">
                  <img :src="slide.interactiveDrawing.gif" :alt="slide.alt">
                </LaptopFrame>
                <span class="hint">{{ slide.interactiveDrawing.hint || 'Click to open interactive viewer ↗' }}</span>
              </div>
            </div>

            <!-- the browser workspace -->
            <div v-else-if="slide.workspaceSlide" class="slide-center">
              <LaptopFrame class="laptop-large" :url="slide.workspaceSlide.url"><img :src="slide.workspaceSlide.screen" :alt="slide.alt"></LaptopFrame>
            </div>

            <!-- three steps -->
            <div v-else-if="slide.steps" class="slide-steps">
              <div v-for="(step, i) in slide.steps" :key="step.title" class="step">
                <b>{{ number(i + 1) }}</b>
                <strong>{{ step.title }}</strong>
                <ul><li v-for="item in step.items" :key="item">{{ item }}</li></ul>
              </div>
            </div>

            <img v-else class="slide-picture" :src="slide.src" :alt="slide.alt">
          </section>
        </Transition>
      </div>

      <footer class="deck-controls">
        <button type="button" aria-label="Previous slide" @click="previous">← <span>Previous</span></button>
        <div class="deck-progress" aria-label="Choose slide">
          <button v-for="(item, index) in slides" :key="item.src || item.key || index" type="button" :class="{ active: current === index, done: index < current }"
                  :aria-label="`Go to slide ${index + 1}`" :aria-current="current === index ? 'true' : undefined" @click="current = index"></button>
        </div>
        <button type="button" aria-label="Next slide" @click="next"><span>Next</span> →</button>
      </footer>
    </dialog>
  </Teleport>
</template>
