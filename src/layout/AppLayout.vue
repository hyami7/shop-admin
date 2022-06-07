<script setup lang='ts'>
import AppMenu from './components/AppMenu.vue'
import AppTooggleSideBar from './components/AppToggleSideBar.vue'
import AppBreadcrumb from './components/AppBreadcrumb.vue'
import FullScreen from './components/AppFullScreen.vue'
import AppUserInfo from './components/AppUserInfo.vue'
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
          <div class="flex-box">
            <full-screen />
            <app-user-info />
          </div>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang='scss' scoped>
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
</style>
