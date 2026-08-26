<script setup lang="ts"></script>

<template>
  <v-app>
    <!-- keyed by path so navigating between views remounts the player -->
    <RouterView :key="$route.path" />
  </v-app>
</template>
