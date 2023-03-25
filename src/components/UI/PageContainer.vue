<script setup lang="ts"></script>

<template>
  <main :class="['container', $style.container]">
    <slot></slot>
  </main>
</template>

<style module lang="scss">
  .container {
    height: 100vh;
    padding: 45px;
  }
</style>
