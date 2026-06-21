<script setup lang="ts">
import { withDefaults } from 'vue'
import { useWindowDragHandlers } from '@owdproject/core/runtime/composables/useWindowDragHandlers'

const props = withDefaults(
  defineProps<{
    window?: IWindowController
    content?: unknown
    chromePadding?: boolean
  }>(),
  { chromePadding: true },
)

const { onDragStart, onDragEnd } = useWindowDragHandlers(
  () => props.window,
)
</script>

<template>
  <DesktopCoreWindow
    :window="props.window"
    :content="props.content"
    v-show="props.window?.state?.active !== false"
    @drag:start="onDragStart"
    @drag:end="onDragEnd"
  >
    <Card :pt:root="['p-card--border', props.chromePadding === false ? 'desktop-explorer-frame-card--tight' : ''].filter(Boolean).join(' ')">
      <template #header>
        <DesktopWindowNav>
          <template #prepend>
            <slot name="nav-prepend" />
          </template>
          <template v-if="$slots['nav-title']" #title>
            <slot name="nav-title" />
          </template>
          <template #append>
            <slot name="nav-append" />
          </template>
        </DesktopWindowNav>
      </template>
      <template #content>
        <DesktopWindowContent>
          <slot />
        </DesktopWindowContent>
      </template>
    </Card>
  </DesktopCoreWindow>
</template>
