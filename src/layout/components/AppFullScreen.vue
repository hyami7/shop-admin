<template>
  <el-icon class="link-text full-screen" @click="toggleFullScreen">
    <FullScreen />
  </el-icon>
</template>

<script setup lang="ts">
const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};
</script>

<style lang="scss" scoped>
.full-screen {
  margin-right: 20px;
}
</style>
