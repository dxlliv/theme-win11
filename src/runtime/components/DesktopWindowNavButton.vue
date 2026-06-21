<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<template>
  <button
    type="button"
    class="owd-window-nav__button"
    :title="title"
    :aria-label="title"
    @mousedown.stop
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
.owd-window-nav__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 2.75rem;
  height: 100%;
  min-height: 2rem;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  transition: background-color 0.12s ease;

  :deep(.iconify),
  :deep(svg) {
    pointer-events: none;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }

  &:active {
    background: rgba(255, 255, 255, 0.04);
  }
}
</style>
