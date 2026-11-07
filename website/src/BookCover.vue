<script>
export default {
  props: { title: String, color: String, img: String },
  data: () => ({ failed: false }),
  watch: { img() { this.failed = false; } },
  mounted() { this.fit(); document.fonts && document.fonts.ready.then(() => this.fit()); this.ro = new ResizeObserver(() => this.fit()); this.ro.observe(this.$el); },
  beforeUnmount() { this.ro && this.ro.disconnect(); },
  updated() { this.fit(); },
  methods: {
    fit() {
      const b = this.$el.querySelector && this.$el.querySelector('.cover-gen b');
      if (!b) return;
      b.style.fontSize = '';
      let size = parseFloat(getComputedStyle(b).fontSize);
      while (b.scrollWidth > b.clientWidth + 0.5 && size > 11) { size -= 0.5; b.style.fontSize = size + 'px'; }
    },
  },
  computed: {
    lang() {
      const t = ` ${(this.title || '').toLowerCase()} `;
      if (/[äöüß]|\b(und|der|die|das|des|im|zur|für|tragwerk|statik|bau)/.test(t)) return 'de';
      if (/[éèêàç]|\b(la|le|les|du|et|des)\b|statique/.test(t)) return 'fr';
      return 'en';
    },
  },
};
</script>

<template>
  <span v-if="img && !failed" class="cover cover-img" :style="{ '--cc': color }"><img :src="img" :alt="title" loading="lazy" @error="failed = true"></span>
  <span v-else class="cover" :style="{ '--cc': color }"><span class="cover-gen"><i></i><b :lang="lang">{{ title }}</b></span></span>
</template>
