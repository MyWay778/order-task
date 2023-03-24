<script setup lang="ts"></script>
<template>
  <aside :className="$style.modal">
    <slot></slot>
  </aside>
</template>
<style module>
.modal {
  position: absolute;
  background-color: var(--color-gray-dark);
}
</style>
