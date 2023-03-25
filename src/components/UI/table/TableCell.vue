<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      tag?: 'th' | 'td';
      sortable?: boolean;
      activeSort?: boolean;
      mode?: 'asc' | 'desc';
    }>(),
    {
      tag: 'td'
    }
  );
</script>

<template>
  <component
    :is="props.tag"
    :class="[
      { [$style.sortable]: sortable },
      { [$style.active]: activeSort },
      {
        [$style.desc]: activeSort && mode === 'desc'
      }
    ]"
    ><slot></slot
  ></component>
</template>

<style module lang="scss">
  .sortable {
    white-space: nowrap;
    cursor: pointer;
    user-select: none;

    &::after {
      content: '';
      position: absolute;
      display: inline-block;
      margin-left: 10px;
      border: 5px solid transparent;
      border-bottom-color: var(--color-black);
      opacity: 0;
      transform: rotate(180deg);
      transform-origin: center 7px;
    }

    &.active::after {
      opacity: 1;
    }

    &.desc::after {
      transform: rotate(0);
    }
  }
</style>
