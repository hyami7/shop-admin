<script setup lang="ts">
import AppMenu from "./components/AppMenu.vue";
import AppTooggleSideBar from "./components/AppToggleSideBar.vue";
import AppBreadcrumb from "./components/AppBreadcrumb.vue";
import FullScreen from "./components/header/AppFullScreen.vue";
import LockScreen from "./components/header/AppLockScreen.vue";
import Setting from "./components/header/AppSetting.vue";
import LockScreenModal from "./components/header/lockScreen.vue";
import AppUserInfo from "./components/header/AppUserInfo.vue";
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <app-menu />
      </el-aside>
      <el-container>
        <el-header class="flex-center">
          <div class="flex-box">
            <app-tooggle-side-bar />
            <app-breadcrumb />
          </div>
          <div class="flex-box header-right">
            <el-tooltip effect="dark" content="锁屏" placement="bottom">
              <div><lock-screen /></div>
            </el-tooltip>
            <el-tooltip effect="dark" content="全屏" placement="bottom">
              <div><full-screen /></div>
            </el-tooltip>
            <el-tooltip effect="dark" content="主题" placement="bottom">
              <div><setting /></div>
            </el-tooltip>
            <app-user-info />
          </div>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
    <lock-screen-modal></lock-screen-modal>
  </div>
</template>

<style lang="scss" scoped>
.el-header {
  background-color: #b3c0d1;
  justify-content: space-between;
}
.el-aside {
  width: auto;
  background-color: #304156;
}
.el-container {
  background-color: #e9eef3;
  height: 100vh;
}
.header-right {
  gap: 20px;
}
</style>
