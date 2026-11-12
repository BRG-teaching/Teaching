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
        <img :src="slides[current].src" :alt="slides[current].alt">
      </div>
      <footer class="presentation-controls">
        <button type="button" aria-label="Previous slide" @click="previous">← <span>Previous</span></button>
        <div class="presentation-dots" aria-label="Choose slide">
          <button v-for="(slide, index) in slides" :key="slide.src" type="button" :class="{ active: current === index }"
                  :aria-label="`Go to slide ${index + 1}`" :aria-current="current === index ? 'true' : undefined" @click="current = index"></button>
        </div>
        <button type="button" aria-label="Next slide" @click="next"><span>Next</span> →</button>
      </footer>
    </dialog>
  </Teleport>
</template>
