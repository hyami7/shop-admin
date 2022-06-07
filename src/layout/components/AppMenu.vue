<template>
  <el-menu
    active-text-color="#f15922"
    background-color="#304156"
    text-color="#fff"
    router
    :collapse="$store.state.isCollapse"
  >
    <el-menu-item index="/">
      <el-icon><Monitor /></el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-sub-menu index="/">
      <template #title>
        <el-icon><SoldOut /></el-icon>
        <span>商品</span>
      </template>
      <el-menu-item index="/product/product_list">
        <el-icon><SoldOut /></el-icon>
        <span>商品列表</span>
      </el-menu-item>
      <el-menu-item index="/product/product_attr">
        <el-icon><SoldOut /></el-icon>
        <span>商品规格</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup lang='ts'>

</script>

<style lang='scss' scoped>
.el-menu {
  border: none;
}
.el-menu:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
