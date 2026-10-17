// Minimal Vue 3 app, no build step: Vue is vendored in vendor/, content is in data.js.
const { createApp, ref, onMounted, onBeforeUnmount } = Vue;

// The progress bar that opens every chapter: seven equal segments, the first `fill` coloured.
const Spine = {
  props: { fill: { type: Number, default: 7 }, dark: Boolean },
  template: `<div class="spine" :class="{ dark }" aria-hidden="true">
    <i v-for="c in chapters" :key="c.n" :style="c.n <= fill ? { background: c.color } : null"></i>
  </div>`,
  setup() { return { chapters: window.CAS.chapters }; },
};

createApp({
  components: { Spine },
  setup() {
    const cas = window.CAS;
    const chapters = cas.chapters;
    const project = chapters[6];
    const active = ref(0);

    const logo = (file) => `../logos/${file}`;
    const logos = (item) => item.logos || [item.logo];
    // Project steps sit under the two-week block they happen in.
    const stepAt = (w) => project.steps.find((s) => s.weeks === `Weeks ${2 * w - 1}–${2 * w}`);
    const cardKeys = (c) => ['contents', 'resources', 'submission'].filter((k) => c[k]);
    const cardTitle = { contents: 'Contents', resources: 'Resources', submission: 'Submission' };

    // Highlight the chapter in view in the header.
    let io;
    onMounted(() => {
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) active.value = Number(e.target.id.slice(2)); });
      }, { rootMargin: '-45% 0px -50% 0px' });
      document.querySelectorAll('.chapter').forEach((el) => io.observe(el));
    });
    onBeforeUnmount(() => io && io.disconnect());

    return { cas, chapters, teaching: chapters.slice(0, 6), project, active, logo, logos, stepAt, cardKeys, cardTitle };
  },
}).mount('#app');
