<template>
  <el-icon class="link-text head-icon" @click="useLock.setLock(true)">
    <Lock />
  </el-icon>
</template>

<script setup lang="ts">
import { useLockScreen } from "@/store/modules/lockScreen";
const useLock = useLockScreen();
</script>

<style lang="scss" scoped></style>
