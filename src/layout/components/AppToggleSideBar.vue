<template>
  <el-icon
    class="collapse link-text"
    @click="handleCollapse"
  >
    <Fold v-if="collapseIcon" />
    <Expand v-else />
  </el-icon>
</template>

<script setup lang='ts'>
import { useStore } from '@/store'
import { computed } from 'vue'
const store = useStore()

const collapseIcon = computed(() => {
  return !store.state.isCollapse
})

const handleCollapse = () => {
  store.commit('setIsCollapse', !store.state.isCollapse)
}
</script>

<style lang='scss' scoped>
.collapse {
  margin-right: 20px;
}
</style>
