<script setup lang="ts">

</script>

<template>
  <div>
    <CoreBackground />

    <nav>
      nav
    </nav>
  </div>
</template>

<style scoped lang="scss">
.owd-background {
  background-image: url('https://winblogs.thesourcemediaassets.com/sites/2/2021/10/Windows-11-Bloom-Screensaver-Dark-1600x900.jpg');
  background-size: cover;
  background-position: center;
}

nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 56px;
  line-height: 56px;
  padding: 0 16px;
  backdrop-filter: blur(64px);
  color: white;
}
</style>
