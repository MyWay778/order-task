<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import TheHeader from './components/TheHeader.vue';
</script>

<template>
  <TheHeader />
  <RouterView />
</template>
