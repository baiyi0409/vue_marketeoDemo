<template>
  <!-- 导航栏 -->
  <Navigate v-if="store.isAuthenticated" />
  <!-- 路由出口 -->
  <RouterView />
</template>

<script setup lang="ts">
import Navigate from './components/Navigate.vue';
import { useUserStore } from '@/stores/'
const store = useUserStore()

</script>

<style>
#app {
  padding: 20px;
  display: flex;
  gap: 10px;
  height: 100%;
  width: 100%;
  background-color: #f0f2f5;
}
</style>
