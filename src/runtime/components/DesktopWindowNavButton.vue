<script setup lang="ts">
defineProps<{
  title?: string
  disabled?: boolean
}>()
</script>

<template>
  <button
    type="button"
    class="owd-window-nav__button"
    :title="title"
    :aria-label="title"
    :disabled="disabled"
    @mousedown.stop
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
/* Sizing only — colors/hover in window-chrome.scss */
.owd-window-nav__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 46px;
  min-width: 46px;
  height: var(--owd-windov-nav-height);
  min-height: var(--owd-windov-nav-height);
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;

  &:disabled {
    opacity: 0.45;
    cursor: default;
    pointer-events: none;
  }

  :deep(.iconify),
  :deep(svg) {
    pointer-events: none;
  }
}
</style>
