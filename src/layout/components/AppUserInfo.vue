<template>
  <el-dropdown class="user-info">
    <span class="link-text"
      >{{ userStore.user?.account }}
      <el-icon class="middle-icon"><ArrowDown /></el-icon
    ></span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item @click="userStore.logout">
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store/modules/user";

const userStore = useUserStore();
</script>

<style lang="scss" scoped>
.user-info {
}
</style>
