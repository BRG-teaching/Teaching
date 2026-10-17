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
    const active = ref('top');
    const menuOpen = ref(false);

    // Side menu: every section of the page, chapters in their ramp colour.
    const menu = [
      { id: 'contents', label: 'Contents' },
      { id: 'map', label: 'Course map' },
      { id: 'timeline', label: 'Course timeline' },
      ...chapters.map((c) => ({ id: 'ch' + c.n, n: c.n, color: c.color, label: c.short || c.title })),
      { id: 'solvers', label: 'Graphic statics solvers' },
    ];

    const logo = (file) => `../logos/${file}`;
    const logos = (item) => item.logos || [item.logo];
    // Project steps sit under the two-week block they happen in.
    const stepAt = (w) => project.steps.find((s) => s.weeks === `Weeks ${2 * w - 1}–${2 * w}`);
    const cardKeys = (c) => ['contents', 'resources', 'submission'].filter((k) => c[k]);
    const cardTitle = { contents: 'Contents', resources: 'Resources', submission: 'Submission' };

    // Highlight the section that crosses the middle of the screen.
    let io;
    const onKey = (e) => { if (e.key === 'Escape') menuOpen.value = false; };
    onMounted(() => {
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) active.value = e.target.id; });
      }, { rootMargin: '-50% 0px -50% 0px' });
      document.querySelectorAll('#top, main section[id]').forEach((el) => io.observe(el));
      addEventListener('keydown', onKey);
    });
    onBeforeUnmount(() => { io && io.disconnect(); removeEventListener('keydown', onKey); });

    return { cas, chapters, teaching: chapters.slice(0, 6), project, active, menuOpen, menu, logo, logos, stepAt, cardKeys, cardTitle };
  },
}).mount('#app');
