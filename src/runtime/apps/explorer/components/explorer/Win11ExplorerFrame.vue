<script setup lang="ts">
import { useSlots, computed, useAttrs } from 'vue'
import Minimize from '@owdproject/kit-primevue/runtime/components/explorer/button/Minimize.vue'
import Maximize from '@owdproject/kit-primevue/runtime/components/explorer/button/Maximize.vue'
import Close from '@owdproject/kit-primevue/runtime/components/explorer/button/Close.vue'

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

function onWindowMinimize() {
  if (!props.window?.instanced) return
  props.window.actions.minimize()
}

function onWindowMaximize() {
  if (!props.window) return
  props.window.actions.toggleMaximize()
}

function onWindowClose() {
  if (!props.window?.instanced) return
  props.window.actions.destroy()
}
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
          <DesktopCoreWindowNav @dblclick="onWindowMaximize">
            <template #prepend>
              <slot name="nav-prepend" />
            </template>
            
            <template v-if="$slots['nav-title']">
              <slot name="nav-title" />
            </template>
            <template v-else>
              <div v-if="props.window?.icon" class="owd-window-nav__icon">
                <Icon :name="props.window.icon" size="16" />
              </div>

              <div v-if="props.window?.title" class="owd-window-nav__title">
                <div
                  class="owd-window-nav__title-inner truncate"
                  v-text="props.window.title"
                />
              </div>
            </template>

            <div class="owd-window-nav__btn-group owd-window-nav__btn-group--append">
              <div
                v-if="$slots['nav-append']"
                class="owd-window-nav__btn-group owd-window-nav__btn-group--append-inner"
              >
                <slot name="nav-append" />
              </div>

              <Minimize
                v-if="!props.window?.instanced || props.window?.isMinimizable"
                @mousedown.stop
                @click.stop="onWindowMinimize"
              />
              <Maximize
                v-if="props.window?.isMaximizable"
                @mousedown.stop
                @click.stop="onWindowMaximize"
              />
              <Close
                v-if="!props.window?.instanced || props.window?.isDestroyable"
                @mousedown.stop
                @click.stop="onWindowClose"
              />
            </div>
          </DesktopCoreWindowNav>
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
