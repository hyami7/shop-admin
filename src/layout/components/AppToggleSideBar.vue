<template>
  <el-icon class="collapse link-text" @click="handleCollapse">
    <Fold v-if="collapseIcon" />
    <Expand v-else />
  </el-icon>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store/modules/user";
import { computed } from "vue";
const userStore = useUserStore();

const collapseIcon = computed(() => {
  return !userStore.isCollapse;
});

const handleCollapse = () => {
  userStore.setIsCollapse(!userStore.isCollapse);
};
</script>

<style lang="scss" scoped>
.collapse {
  margin-right: 20px;
}
</style>
