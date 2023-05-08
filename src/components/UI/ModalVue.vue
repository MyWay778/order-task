<script setup lang="ts">
  import { onMounted, onUnmounted } from 'vue';

  defineProps<{
    showModal: boolean;
  }>();

  const emit = defineEmits<{
    (event: 'outside-click'): void;
  }>();

  // Клик вне модального окна
  function notifyOfOutsideModalClick(): void {
    emit('outside-click');
  }

  onMounted(() => {
    window.addEventListener('click', notifyOfOutsideModalClick);
  });

  onUnmounted(() => {
    window.removeEventListener('click', notifyOfOutsideModalClick);
  });
</script>

<template>
  <template v-if="showModal">
    <aside :class="$style.modal" v-bind="$attrs" @click.stop>
      <slot></slot>
    </aside>
    <div :class="$style.overlay"></div>
  </template>
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
