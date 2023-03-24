<script setup lang="ts">
const props = defineProps<{
  errorMessage?: string;
}>();
</script>
<template>
  <div :class="$style.container">
    <input v-bind="$attrs" :class="$style.input" />
    <span v-if="errorMessage" :class="$style.message">{{ errorMessage }}</span>
  </div>
</template>
<style module lang="scss">
.container {
  position: relative;
  padding-bottom: 18px;
}

.input {
  width: 100%;
  padding: 11px 17px 8px;
  border: none;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
}

.message {
  position: absolute;
  bottom: 0;
  left: 0;
  color: var(--color-error);
}
</style>
