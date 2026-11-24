<script setup>
// The drawing of a form-finding method: FD a cable net, DR a damped oscillation, TNA a thrust network over its form
// diagram, AGS a funicular polygon with its force polygon.
import { computed } from 'vue';

const props = defineProps({ method: { type: String, required: true } });

const iso = ([x, y, z]) => [(x - y) * 0.866, (x + y) * 0.5 - z];
const line = (points) => 'M' + points.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join('L');

// the lines of a grid over a height function on [-1, 1] x [-1, 1]
const grid = (height, size, count) => {
  const steps = Array.from({ length: count + 1 }, (_, i) => -1 + (2 * i) / count);
  const fine = Array.from({ length: 25 }, (_, i) => -1 + i / 12);
  const at = (u, v) => iso([u * size, v * size, height(u, v)]);
  return [
    ...steps.map((u) => line(fine.map((v) => at(u, v)))),
    ...steps.map((v) => line(fine.map((u) => at(u, v)))),
  ].join('');
};
const corners = [[-1, -1], [1, -1], [1, 1], [-1, 1]];

const forceDensity = () => {
  const height = (u, v) => 28 * u * v;
  return {
    paths: [{ c: 'thin', d: grid(height, 68, 6) }, { c: 'hot', d: line([...corners, corners[0]].map(([u, v]) => iso([u * 68, v * 68, height(u, v)]))) }],
    dots: corners.map(([u, v]) => iso([u * 68, v * 68, height(u, v)])),
  };
};

const dynamicRelaxation = () => {
  const x = (t) => -112 + t * 224;
  const y = (t) => -62 * Math.exp(-3.1 * t) * Math.cos(t * 8 * Math.PI) + 4;
  const curve = Array.from({ length: 161 }, (_, i) => [x(i / 160), y(i / 160)]);
  return {
    paths: [{ c: 'line', d: 'M-112 -72V80' }, { c: 'dash', d: 'M-112 4H112' }, { c: 'hot', d: line(curve) }],
    dots: [0, 1, 2, 3].map((k) => [x(k / 4), y(k / 4)]).concat([[x(1), y(1)]]),
  };
};

const thrustNetwork = () => {
  const height = (u, v) => 78 * (1 - u * u) * (1 - v * v) + 26;
  const rise = [[0, 0], [-1, -1], [1, -1], [1, 1], [-1, 1]].map(([u, v]) => line([iso([u * 64, v * 64, -44]), iso([u * 64, v * 64, height(u, v)])])).join('');
  return {
    paths: [{ c: 'thin', d: grid(() => -44, 64, 4) }, { c: 'dash', d: rise }, { c: 'hot', d: grid(height, 64, 4) }],
    dots: corners.map(([u, v]) => iso([u * 64, v * 64, height(u, v)])),
  };
};

const graphicStatics = () => {
  // four equal loads on a symmetric pole: the arch's five segments are parallel to the five rays
  const rays = [2, 1, 0, -1, -2];
  const slope = 0.56, step = 29;
  const arch = [[-132, 34]];
  for (const ray of rays) {
    const [x, y] = arch[arch.length - 1];
    arch.push([x + step, y - ray * slope * step]);
  }
  const pole = [46, 0], distance = 82;
  const ends = rays.map((ray) => [pole[0] + distance, -ray * slope * distance]);
  const loads = arch.slice(1, 5).map(([x, y]) => `M${x} ${y - 36}V${y - 7}M${x - 4} ${y - 13}L${x} ${y - 6}L${x + 4} ${y - 13}`).join('');
  return {
    paths: [
      { c: 'dash', d: line([arch[0], arch[5]]) }, { c: 'thin', d: loads }, { c: 'hot', d: line(arch) },
      { c: 'thin', d: ends.map((end) => line([pole, end])).join('') }, { c: 'line', d: line([ends[0], ends[4]]) },
    ],
    dots: [pole, arch[0], arch[5]],
  };
};

const drawing = computed(() => ({ FD: forceDensity, DR: dynamicRelaxation, TNA: thrustNetwork, AGS: graphicStatics }[props.method] || forceDensity)());
</script>

<template>
  <svg class="method-icon" viewBox="-140 -105 280 210" aria-hidden="true">
    <path v-for="(path, i) in drawing.paths" :key="i" :class="path.c" :d="path.d" />
    <circle v-for="(dot, i) in drawing.dots" :key="`d${i}`" :cx="dot[0]" :cy="dot[1]" r="4" />
  </svg>
</template>
