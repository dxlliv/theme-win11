<template>
  <DesktopCoreWindowContent>
    <slot />
  </DesktopCoreWindowContent>
</template>

<style scoped lang="scss">
:deep(.owd-window__content) {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
</style>
