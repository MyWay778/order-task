<script setup lang="ts"></script>

<template>
  <aside :class="$style.modal" v-bind="$attrs">
    <slot></slot>
  </aside>
  <div :class="$style.overlay"></div>
</template>

<style module>
  .modal {
    position: fixed;
    top: 25%;
    left: 50%;
    z-index: 2;
    background-color: var(--color-gray-dark);
    transform: translateX(-50%);
  }

  .overlay {
    position: fixed;
    inset: 0;
    z-index: 1;
  }
</style>
