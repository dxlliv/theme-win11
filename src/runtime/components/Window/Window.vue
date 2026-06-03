<script setup lang="ts">
import { withDefaults } from 'vue'
import Frame from '@owdproject/kit-fs/runtime/components/explorer/Frame.vue'
import { useDesktopWindowDragHandlersInjected } from '@owdproject/kit-theme/runtime/composables/useDesktopWindowDragHandlers'

const props = withDefaults(
  defineProps<{
    window?: IWindowController
    content?: unknown
    chromePadding?: boolean
  }>(),
  { chromePadding: true },
)

const { onDragStart, onDragEnd } = useDesktopWindowDragHandlersInjected(
  () => props.window,
)
</script>

<template>
  <Frame
    :window="props.window"
    :content="props.content"
    :chrome-padding="props.chromePadding"
    @drag:start="onDragStart"
    @drag:end="onDragEnd"
  >
    <template #nav-prepend>
      <slot name="nav-prepend" />
    </template>
    <template #nav-append>
      <slot name="nav-append" />
    </template>
    <slot />
  </Frame>
</template>
