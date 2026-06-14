<script setup lang="ts">
import type { IWindowController, WindowConfig } from '@owdproject/core'
import Frame from '../../../explorer/components/explorer/Win11ExplorerFrame.vue'
import Win11SettingsPersonalization from './Win11SettingsPersonalization.vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

defineProps<{
  config?: WindowConfig
  window: IWindowController
}>()

const sections = [
  { id: 'system' as const, label: 'System' },
  { id: 'personalization' as const, label: 'Personalization' },
]

const active = ref<(typeof sections)[number]['id']>('system')
const { t } = useI18n()
</script>

<template>
  <Frame :window="window" :config="config">
    <div class="win11-settings-shell">
      <aside class="win11-settings-shell__nav">
        <button
          v-for="s in sections"
          :key="s.id"
          type="button"
          class="win11-settings-shell__nav-btn"
          :class="{ 'win11-settings-shell__nav-btn--active': active === s.id }"
          @click="active = s.id"
        >
          {{
            s.id === 'system'
              ? t('win11.settings.system')
              : t('win11.settings.personalization.title')
          }}
        </button>
      </aside>
      <main class="win11-settings-shell__content">
        <h2 class="win11-settings-shell__title">
          {{
            active === 'system'
              ? t('win11.settings.system')
              : t('win11.settings.personalization.title')
          }}
        </h2>
        <p v-if="active === 'system'" class="win11-settings-shell__placeholder">
          {{ t('win11.settings.systemPlaceholder') }}
        </p>
        <Win11SettingsPersonalization v-else />
      </main>
    </div>
  </Frame>
</template>

<style scoped lang="scss">
.win11-settings-shell {
  display: flex;
  height: 100%;
  min-height: 0;
  overflow: hidden;
}

.win11-settings-shell__nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 208px;
  flex-shrink: 0;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  padding: 12px 8px;
  overflow-y: auto;
}

.win11-settings-shell__nav-btn {
  display: block;
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 13px;
  font-family: inherit;
  color: inherit;
  cursor: pointer;
  transition: background 0.12s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }

  &--active {
    background: rgba(255, 255, 255, 0.12);
    font-weight: 600;

    &:hover {
      background: rgba(255, 255, 255, 0.15);
    }
  }
}

.win11-settings-shell__content {
  flex: 1;
  min-width: 0;
  overflow-y: auto;
  padding: 24px;
}

.win11-settings-shell__title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 16px;
}

.win11-settings-shell__placeholder {
  font-size: 13px;
  opacity: 0.75;
  line-height: 1.6;
}
</style>
