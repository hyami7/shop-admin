<template>
  <el-tooltip effect="dark" content="搜索" placement="bottom">
    <div>
      <el-icon class="link-text head-icon" @click="visible = true">
        <Search />
      </el-icon>
    </div>
  </el-tooltip>
  <el-dialog ref="dialogRef" v-model="visible" title="Tips" draggable>
    <template #header="{ titleId, titleClass }">
      <div class="flex-between">
        <h4 :id="titleId" :class="titleClass">搜索</h4>
        <full-screen
          :target="dialogRef"
          style="margin: 3px 20px 0 0"
        ></full-screen>
      </div>
    </template>
    <div>搜索菜单</div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FullScreen from "./AppFullScreen.vue";
const visible = ref(false);
const dialogRef = ref<HTMLElement | undefined>(undefined);
</script>

<style lang="scss" scoped></style>
