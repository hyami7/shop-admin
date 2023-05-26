<template>
  <el-icon class="link-text head-icon" @click="toggle">
    <FullScreen />
  </el-icon>
</template>

<script setup lang="ts">
import { useFullscreen } from "@vueuse/core";
const { toggle } = useFullscreen();
</script>

<style lang="scss" scoped></style>
