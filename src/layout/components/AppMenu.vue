<template>
  <el-menu
    active-text-color="var(--side-active-font-color)"
    background-color="var(--side-bg-color)"
    text-color="var(--side-font-color)"
    router
    :collapse="userStore.isCollapse"
    popper-effect="dark"
  >
    <el-menu-item index="/">
      <el-icon><Monitor /></el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-sub-menu index="/">
      <template #title>
        <el-icon><SoldOut /></el-icon>
        <span>示例</span>
      </template>
      <el-menu-item index="/product/product_list">
        <el-icon><SoldOut /></el-icon>
        <span>列表</span>
      </el-menu-item>
      <el-menu-item index="/product/product_attr">
        <el-icon><SoldOut /></el-icon>
        <span>demo</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store/modules/user";
const userStore = useUserStore();
</script>

<style lang="scss" scoped>
.el-menu {
  border: none;
}
.el-menu:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
