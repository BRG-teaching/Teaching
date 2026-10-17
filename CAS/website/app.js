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
      { id: 'library', href: 'library.html', label: 'Library: books, theses, papers' },
      { id: 'terminal', href: 'library.html#/terminal', label: 'BRG terminal' },
    ];

    const logo = (file) => `../logos/${file}`;
    const logos = (item) => item.logos || [item.logo];
    // Logos keep their sizes from the original slides (icon-sizes.js), in one unit --u.
    const SIZES = window.CAS_ICON_SIZES || {};
    const size = (f) => SIZES[f] || [136, 136];
    const iconBox = (f) => { const [w, h] = size(f); return { width: `calc(var(--u) * ${w})`, height: `calc(var(--u) * ${h})` }; };
    // Inside a circle: the logo's original share of its circle. Course map: Ø 250 on slide 3.
    // Timeline: Ø 170 on slide 4, chapter logos 108 px, project steps 124 × 88 px.
    const inRing = (f, kind) => {
      const [w, h] = size(f);
      if (kind === 'map') return { width: `${(w / 250) * 100}%`, height: `${(h / 250) * 100}%` };
      const [nw, nh, tw, th] = f.startsWith('slide03') ? [136, 136, 108, 108] : [240, 140, 124, 88];
      return { width: `${((w / nw) * tw / 170) * 100}%`, height: `${((h / nh) * th / 170) * 100}%` };
    };
    // Project steps sit under the two-week block they happen in.
    const stepAt = (w) => project.steps.find((s) => s.weeks === `Weeks ${2 * w - 1}–${2 * w}`);
    const cardKeys = (c) => ['contents', 'resources', 'submission'].filter((k) => c[k]);
    const cardTitle = { contents: 'Contents', resources: 'Resources', submission: 'Submission' };

    // Split a card line into text and link pieces using cas.links (longest names first).
    const esc = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const names = Object.keys(cas.links).sort((a, b) => b.length - a.length);
    const linkRe = new RegExp(`(?<![\\w-])(${names.map(esc).join('|')})(?![\\w-])`, 'g');
    const segments = (text) => text.split(linkRe).filter(Boolean).map((t) => ({ text: t, url: cas.links[t] }));

    // Course map: thin lines joining the chapter circles in order, measured from the layout.
    const mapEl = ref(null);
    const mapLines = ref([]);
    let mapRo;
    const drawMap = () => {
      const wrap = mapEl.value;
      if (!wrap) return;
      const o = wrap.getBoundingClientRect();
      const c = [...wrap.querySelectorAll('.map-ring')].map((r) => { const b = r.getBoundingClientRect(); return [b.left + b.width / 2 - o.left, b.top + b.height / 2 - o.top]; });
      mapLines.value = c.slice(1).map((p, i) => [c[i][0], c[i][1], p[0], p[1]].map((v) => Math.round(v * 10) / 10));
    };

    // Highlight the section that crosses the middle of the screen.
    let io;
    const onKey = (e) => { if (e.key === 'Escape') menuOpen.value = false; };
    // In-page links (menu, contents, course map, timeline): bring the section's top to the top
    // of the window so it fills the screen, then keep the address in sync.
    const onLink = (e) => {
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const el = document.getElementById(a.getAttribute('href').slice(1));
      if (!el) return;
      e.preventDefault();
      menuOpen.value = false;
      el.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
      history.replaceState(null, '', '#' + el.id);
    };
    onMounted(() => {
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) active.value = e.target.id; });
      }, { rootMargin: '-50% 0px -50% 0px' });
      document.querySelectorAll('#top, main section[id]').forEach((el) => io.observe(el));
      addEventListener('keydown', onKey);
      mapRo = new ResizeObserver(drawMap); if (mapEl.value) mapRo.observe(mapEl.value);
      document.fonts && document.fonts.ready.then(drawMap);
      document.addEventListener('click', onLink);
    });
    onBeforeUnmount(() => { io && io.disconnect(); mapRo && mapRo.disconnect(); removeEventListener('keydown', onKey); document.removeEventListener('click', onLink); });

    return { cas, chapters, teaching: chapters.slice(0, 6), project, active, menuOpen, menu, logo, logos, stepAt, cardKeys, cardTitle, segments, mapEl, mapLines, iconBox, inRing };
  },
}).mount('#app');
