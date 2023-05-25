<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="item in route" :key="item.path">
      {{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ArrowRight } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { computed } from "vue";
const router = useRouter();

const route = computed(() => {
  return router.currentRoute.value.matched.filter((item) => item.meta.title);
});
</script>

<style lang="scss" scoped></style>
