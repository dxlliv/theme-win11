<script setup lang="ts">
import { withDefaults } from 'vue'
import { useWindowDragHandlers } from '@owdproject/core/runtime/composables/useWindowDragHandlers'
import { useToggleWindowMaximize } from '@owdproject/core/runtime/composables/useToggleWindowMaximize'
import Minimize from '@owdproject/kit-primevue/runtime/components/explorer/button/Minimize.vue'
import Maximize from '@owdproject/kit-primevue/runtime/components/explorer/button/Maximize.vue'
import Close from '@owdproject/kit-primevue/runtime/components/explorer/button/Close.vue'

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

const toggleWindowMaximize = useToggleWindowMaximize()

function onWindowMinimize() {
  if (!props.window?.instanced) return
  props.window.actions.minimize()
}

function onWindowMaximize() {
  if (!props.window) return
  toggleWindowMaximize(props.window)
}

function onWindowClose() {
  if (!props.window?.instanced) return
  props.window.actions.destroy()
}
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
      </template>
      <template #content>
        <DesktopWindowContent>
          <slot />
        </DesktopWindowContent>
      </template>
    </Card>
  </DesktopCoreWindow>
</template>
