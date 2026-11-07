<script setup>
defineProps({ fill: { type: Number, default: 7 }, dark: Boolean });
const chapters = window.CAS.chapters;
</script>

<template>
  <div class="spine" :class="{ dark }" aria-hidden="true">
    <i v-for="c in chapters" :key="c.n" :style="c.n <= fill ? { background: c.color } : null"></i>
  </div>
</template>
