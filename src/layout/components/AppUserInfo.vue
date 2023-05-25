<template>
  <el-dropdown class="user-info">
    <span class="link-text"
      >{{ $store.state.user?.account }}
      <el-icon class="middle-icon"><ArrowDown /></el-icon
    ></span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item @click="handleLogout"> 退出登录 </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import { logout } from "@/api/common";
import { useRouter } from "vue-router";
import { useStore } from "@/store";

const router = useRouter();
const store = useStore();
const handleLogout = () => {
  ElMessageBox.confirm("确认退出吗？", {})
    .then(async () => {
      await logout();
      ElMessage.success("退出成功！");
      store.commit("setUser", null);
      router.push({ name: "login" });
    })
    .catch(() => {});
};
</script>

<style lang="scss" scoped>
.user-info {
}
</style>
