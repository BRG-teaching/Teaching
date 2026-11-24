<script setup>
// A laptop drawn in lines, its screen the slot: a link when it has a url, else a plain figure.
defineProps({
  url: { type: String, default: '' },
  title: { type: String, default: '' },
});

// the keyboard in perspective: five rows between the hinge and the trackpad, wider towards the front
const ROWS = 5;
const TOP = 10, BOTTOM = 62;
const edge = (y) => 96 - (y / 118) * 76; // left edge of the deck at a depth, mirrored on the right
const keys = [];
for (let row = 0; row < ROWS; row++) {
  const y0 = TOP + (BOTTOM - TOP) * Math.pow(row / ROWS, 1.12);
  const y1 = TOP + (BOTTOM - TOP) * Math.pow((row + 0.78) / ROWS, 1.12);
  const count = row === ROWS - 1 ? 9 : 15;
  const at = (k, y) => edge(y) + 54 + (1200 - 2 * (edge(y) + 54)) * k;
  const widths = row === ROWS - 1 ? [1, 1, 1, 1, 6, 1, 1, 1, 1] : Array(count).fill(1);
  const total = widths.reduce((a, b) => a + b, 0);
  let done = 0;
  for (const width of widths) {
    const a = done / total, b = (done + width - 0.16) / total;
    keys.push(`M${at(a, y0).toFixed(1)} ${y0.toFixed(1)}L${at(b, y0).toFixed(1)} ${y0.toFixed(1)}L${at(b, y1).toFixed(1)} ${y1.toFixed(1)}L${at(a, y1).toFixed(1)} ${y1.toFixed(1)}Z`);
    done += width;
  }
}
const keyPath = keys.join('');
</script>

<template>
  <component :is="url ? 'a' : 'div'" class="laptop" :href="url || undefined" :target="url ? '_blank' : undefined"
             :rel="url ? 'noopener' : undefined" :title="title || undefined">
    <div class="laptop-lid"><slot /></div>
    <svg class="laptop-base" viewBox="0 0 1200 142" aria-hidden="true">
      <path class="laptop-deck" d="M96 1H1104L1180 118H20Z" />
      <path class="laptop-keys" :d="keyPath" />
      <path class="laptop-pad" d="M452 70H748L766 113H434Z" />
      <path class="laptop-lip" d="M20 118H1180V126Q1180 140 1162 140H38Q20 140 20 126Z" />
      <path class="laptop-notch" d="M510 118H690Q688 127 676 127H524Q512 127 510 118Z" />
    </svg>
  </component>
</template>
