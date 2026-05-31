import { defineNuxtPlugin } from 'nuxt/app'
import { useConfirm } from 'primevue/useconfirm'
import { DESKTOP_DIALOG_PROVIDER_KEY } from '@owdproject/kit-theme/runtime/dialogs/desktopDialogProvider'
import { createWin11DesktopDialogs } from '../utils/createWin11DesktopDialogs'

export default defineNuxtPlugin({
  name: 'desktop-theme-win11-dialogs',
  enforce: 'post',
  setup(nuxtApp) {
    const confirm = useConfirm()
    nuxtApp.vueApp.provide(
      DESKTOP_DIALOG_PROVIDER_KEY,
      createWin11DesktopDialogs(confirm),
    )
  },
})
