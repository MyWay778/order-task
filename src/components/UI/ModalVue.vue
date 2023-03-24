<script setup lang="ts"></script>
<template>
  <aside :className="$style.modal">
    <slot></slot>
  </aside>
</template>
<style module>
.modal {
  position: relative;
}
</style>
