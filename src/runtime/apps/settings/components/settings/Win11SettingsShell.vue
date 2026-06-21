<script setup lang="ts">
import type { IWindowController, WindowConfig } from '@owdproject/core'
import Win11SettingsPersonalization from './Win11SettingsPersonalization.vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

defineProps<{
  config?: WindowConfig
  window: IWindowController
}>()

type SettingsSection = 'home' | 'system' | 'personalization'

const sections: {
  id: SettingsSection
  icon: string
  labelKey: string
}[] = [
  { id: 'home', icon: 'mdi:home-outline', labelKey: 'win11.settings.home' },
  {
    id: 'system',
    icon: 'mdi:desktop-tower-monitor',
    labelKey: 'win11.settings.system',
  },
  {
    id: 'personalization',
    icon: 'mdi:palette-outline',
    labelKey: 'win11.settings.personalization.title',
  },
]

const active = ref<SettingsSection>('home')
const search = ref('')
const { t } = useI18n()

const filteredSections = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return sections
  return sections.filter((section) =>
    t(section.labelKey).toLowerCase().includes(q),
  )
})

const pageTitle = computed(() => {
  const section = sections.find((item) => item.id === active.value)
  return section ? t(section.labelKey) : ''
})

function openSection(id: SettingsSection) {
  active.value = id
  search.value = ''
}
</script>

<template>
  <DesktopWindow
    :window="window"
    class="win11-settings-window"
    :chrome-padding="false"
    :content="{ padded: false }"
  >
    <div class="win11-settings">
      <aside class="win11-settings__nav" aria-label="Settings navigation">
        <div class="win11-settings__nav-search">
          <Icon
            name="mdi:magnify"
            class="win11-settings__nav-search-icon"
            aria-hidden="true"
          />
          <input
            v-model="search"
            type="search"
            class="win11-settings__nav-search-input"
            :placeholder="t('win11.settings.searchPlaceholder')"
            autocomplete="off"
            spellcheck="false"
          />
        </div>

        <nav class="win11-settings__nav-list">
          <button
            v-for="section in filteredSections"
            :key="section.id"
            type="button"
            class="win11-settings__nav-item"
            :class="{
              'win11-settings__nav-item--active': active === section.id,
            }"
            @click="openSection(section.id)"
          >
            <Icon :name="section.icon" class="win11-settings__nav-item-icon" />
            <span class="win11-settings__nav-item-label">
              {{ t(section.labelKey) }}
            </span>
          </button>
        </nav>
      </aside>

      <main class="win11-settings__main">
        <header class="win11-settings__header">
          <h1 class="win11-settings__title">{{ pageTitle }}</h1>
        </header>

        <div class="win11-settings__scroll">
          <section v-if="active === 'home'" class="win11-settings__page">
            <p class="win11-settings__lead">
              {{ t('win11.settings.homeLead') }}
            </p>

            <h2 class="win11-settings__section-title">
              {{ t('win11.settings.recommended') }}
            </h2>
            <div class="win11-settings__card-grid">
              <button
                type="button"
                class="win11-settings__link-card"
                @click="openSection('personalization')"
              >
                <span class="win11-settings__link-card-icon" aria-hidden="true">
                  <Icon name="mdi:palette-outline" />
                </span>
                <span class="win11-settings__link-card-body">
                  <span class="win11-settings__link-card-title">
                    {{ t('win11.settings.personalization.title') }}
                  </span>
                  <span class="win11-settings__link-card-desc">
                    {{ t('win11.settings.personalization.homeDesc') }}
                  </span>
                </span>
                <Icon
                  name="mdi:chevron-right"
                  class="win11-settings__link-card-chevron"
                  aria-hidden="true"
                />
              </button>

              <button
                type="button"
                class="win11-settings__link-card"
                @click="openSection('system')"
              >
                <span class="win11-settings__link-card-icon" aria-hidden="true">
                  <Icon name="mdi:desktop-tower-monitor" />
                </span>
                <span class="win11-settings__link-card-body">
                  <span class="win11-settings__link-card-title">
                    {{ t('win11.settings.system') }}
                  </span>
                  <span class="win11-settings__link-card-desc">
                    {{ t('win11.settings.systemHomeDesc') }}
                  </span>
                </span>
                <Icon
                  name="mdi:chevron-right"
                  class="win11-settings__link-card-chevron"
                  aria-hidden="true"
                />
              </button>
            </div>
          </section>

          <section v-else-if="active === 'system'" class="win11-settings__page">
            <article class="win11-settings__card">
              <h2 class="win11-settings__card-title">
                {{ t('win11.settings.systemAboutTitle') }}
              </h2>
              <dl class="win11-settings__facts">
                <div class="win11-settings__fact">
                  <dt>{{ t('win11.settings.systemDeviceName') }}</dt>
                  <dd>OWD Desktop</dd>
                </div>
                <div class="win11-settings__fact">
                  <dt>{{ t('win11.settings.systemEdition') }}</dt>
                  <dd>Windows 11 Theme</dd>
                </div>
                <div class="win11-settings__fact">
                  <dt>{{ t('win11.settings.systemVersion') }}</dt>
                  <dd>OWD Client</dd>
                </div>
              </dl>
            </article>

            <p class="win11-settings__placeholder">
              {{ t('win11.settings.systemPlaceholder') }}
            </p>
          </section>

          <Win11SettingsPersonalization v-else />
        </div>
      </main>
    </div>
  </DesktopWindow>
</template>
