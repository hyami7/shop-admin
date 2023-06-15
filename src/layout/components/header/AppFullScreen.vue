<template>
  <el-icon class="link-text head-icon" @click="toggle">
    <FullScreen />
  </el-icon>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useFullscreen } from "@vueuse/core";

const props = defineProps({
  target: HTMLElement,
});
const { toggle } = props.target ? useFullscreen(props.target) : useFullscreen();
</script>

<style lang="scss" scoped></style>
