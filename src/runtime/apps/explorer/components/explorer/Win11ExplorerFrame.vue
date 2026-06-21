<script setup lang="ts">
import { useSlots, computed, useAttrs } from 'vue'

const props = withDefaults(
  defineProps<{
    window?: IWindowController
    content?: unknown
    chromePadding?: boolean
    frameClass?: string
  }>(),
  { chromePadding: true },
)

defineEmits([
  'drag:start',
  'drag:move',
  'drag:end',
  'resize:start',
  'resize:move',
  'resize:end',
])

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
const windowRootClass = computed(
  () => [attrs.class, props.frameClass].filter(Boolean),
)
const slots = useSlots()
const hasHeaderBelowNavSlot = computed(
  () => typeof slots['header-below-nav'] === 'function',
)
const cardRootClass = computed(
  () =>
    [
      'p-card--border',
      props.chromePadding === false ? 'desktop-explorer-frame-card--tight' : '',
    ]
      .filter(Boolean)
      .join(' '),
)
</script>

<template>
  <DesktopCoreWindow
    :class="windowRootClass"
    :window="props.window"
    :content="props.content"
    v-show="props.window?.state?.active ?? true"
    @drag:start="$emit('drag:start', $event)"
    @drag:move="$emit('drag:move', $event)"
    @drag:end="$emit('drag:end', $event)"
    @resize:start="$emit('resize:start', $event)"
    @resize:move="$emit('resize:move', $event)"
    @resize:end="$emit('resize:end', $event)"
  >
    <Card :pt:root="cardRootClass">
      <template #header>
        <div class="desktop-explorer-frame__header-stack">
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
          <div
            v-if="hasHeaderBelowNavSlot"
            class="desktop-explorer-frame__header-below-nav"
          >
            <slot name="header-below-nav" />
          </div>
        </div>
      </template>
      <template #content>
        <DesktopCoreWindowContent>
          <div class="desktop-explorer-body">
            <slot />
          </div>
        </DesktopCoreWindowContent>
      </template>
    </Card>
  </DesktopCoreWindow>
</template>

<style scoped>
.desktop-explorer-frame__header-stack {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.desktop-explorer-frame__header-below-nav {
  min-width: 0;
}

.desktop-explorer-body {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  height: 100%;
}
</style>
