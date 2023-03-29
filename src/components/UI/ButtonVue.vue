<script setup lang="ts">
  const props = defineProps<{
    color?: 'white' | 'gray';
    icon?: boolean;
  }>();
</script>

<template>
  <button
    :class="[
      $style.button,
      props.color ? $style[props.color] : null,
      { [$style[props.color || '']]: props.color },
      { [$style.icon]: props.icon }
    ]">
    <slot>Кнопка</slot>
  </button>
</template>

<style module lang="scss">
  .button {
    padding: 6px 20px;
    background-color: var(--color-gray-dark);

    &.white {
      background-color: var(--color-white);
    }

    &.gray {
      background-color: var(--color-gray-dark);
    }

    &.icon {
      display: flex;
      padding: 4px;
      border: 1px solid var(--color-border);
    }
  }
</style>
