<script setup>
// The context layers and what they connect to, as two isometric platforms: a tile per layer, the emphasised ones raised.
import { computed } from 'vue';

const props = defineProps({
  title: { type: String, required: true },
  layers: { type: Array, required: true },
  target: { type: String, required: true },
});

const TILE = [230, 440 / 3], GAP = 20, SLAB = 18;
const COLUMNS = 2;
const rows = Math.ceil(props.layers.length / COLUMNS);
const WIDTH = COLUMNS * TILE[0] + (COLUMNS + 1) * GAP;
const DEPTH = rows * TILE[1] + (rows + 1) * GAP;
const APART = 630; // of the target's platform, straight to the right on screen

const iso = (x, y, z) => [(x - y) * 0.866, (x + y) * 0.5 - z];
const path = (points) => 'M' + points.map((p) => iso(...p).map((v) => v.toFixed(1)).join(' ')).join('L') + 'Z';

// the three faces seen of a box and the transform that lays a text flat on its top
const box = (x, y, w, d, z0, z1, hot = false) => ({
  hot,
  right: path([[x + w, y, z0], [x + w, y + d, z0], [x + w, y + d, z1], [x + w, y, z1]]),
  front: path([[x, y + d, z0], [x + w, y + d, z0], [x + w, y + d, z1], [x, y + d, z1]]),
  top: path([[x, y, z1], [x + w, y, z1], [x + w, y + d, z1], [x, y + d, z1]]),
  text: `matrix(.866 .5 -.866 .5 ${iso(x + w / 2, y + d / 2, z1).map((v) => v.toFixed(1)).join(' ')})`,
});

const drawing = computed(() => {
  const slab = box(0, 0, WIDTH, DEPTH, -SLAB, 0);
  const tiles = props.layers.map((layer, i) => ({
    ...box(GAP + (i % COLUMNS) * (TILE[0] + GAP), GAP + Math.floor(i / COLUMNS) * (TILE[1] + GAP), TILE[0], TILE[1], 0, layer.emphasis ? 64 : 24, layer.emphasis),
    title: layer.title,
  }));
  const [ox, oy] = [APART, -APART];
  const targetSlab = box(ox, oy, WIDTH, DEPTH, -SLAB, 0);
  const inset = 64;
  const block = box(ox + inset, oy + inset, WIDTH - 2 * inset, DEPTH - 2 * inset, 0, 150, true);
  const from = iso(WIDTH, 0, 0), to = iso(ox, oy + DEPTH, 0);
  return { slab, tiles, targetSlab, block, from, to, label: iso(WIDTH, DEPTH, -SLAB) };
});
const faces = ['right', 'front', 'top'];
</script>

<template>
  <svg class="context-stack" viewBox="-460 -100 2012 720" role="img" :aria-label="`${title}: ${layers.map((l) => l.title).join(', ')}, connected to ${target}`">
    <path v-for="f in faces" :key="`s${f}`" :class="f" :d="drawing.slab[f]" />
    <g v-for="tile in drawing.tiles" :key="tile.title" :class="{ hot: tile.hot }">
      <path v-for="f in faces" :key="f" :class="f" :d="tile[f]" />
      <text :transform="tile.text" dy=".35em">{{ tile.title }}</text>
    </g>
    <path v-for="f in faces" :key="`t${f}`" :class="f" :d="drawing.targetSlab[f]" />
    <g class="hot">
      <path v-for="f in faces" :key="f" :class="f" :d="drawing.block[f]" />
      <text class="big" :transform="drawing.block.text" dy=".35em">{{ target }}</text>
    </g>
    <path class="link" :d="`M${drawing.from[0] + 14} ${drawing.from[1]}H${drawing.to[0] - 14}`" />
    <path class="link-end" :d="`M${drawing.from[0] + 4} ${drawing.from[1]}l14 -8v16ZM${drawing.to[0] - 4} ${drawing.to[1]}l-14 -8v16Z`" />
    <text class="caption" :x="drawing.label[0]" :y="drawing.label[1] + 44">{{ title }}</text>
  </svg>
</template>
