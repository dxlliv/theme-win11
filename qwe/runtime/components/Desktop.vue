<script setup lang="ts"></script>

<template>
  <div>
    <CoreBackground />

    <nav>
      <div class="icon">
        <img src="/start.svg" />
      </div>
      <div class="icon">
        <img src="/search.webp" class="flipped" />
      </div>
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
  height: 45px;
  line-height: 40px;
  padding: 0 16px;
  backdrop-filter: blur(64px);
  border-top: 1px solid rgba(66, 66, 66, 0.2);
  background-color: rgba(27, 27, 27, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  margin: 15px 3px;
  border-radius: 3px;
  transition:
    background 0.15s,
    border 0.15s;
  /* Fixed size container */
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Add transparent border by default */
  border: 0.02px solid transparent;
}

.icon .flipped {
  transform: scaleX(-1);
}

nav .icon:hover {
  background: rgba(255, 255, 255, 0.05);
  border: 0.02px solid rgba(255, 255, 255, 0.07);
}

nav img {
  width: 24px; /* Slightly smaller so it fits nicely in the 32px container */
  height: 24px;
  object-fit: contain;
  transition:
    width 0.1s,
    height 0.1s;
}

nav img:active {
  width: 20px; /* Scale down when pressed */
  height: 20px;
}
</style>
