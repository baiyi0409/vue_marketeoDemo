<template>
  <!-- 导航栏 -->
  <Navigate />
  <!-- 路由出口 -->
  <RouterView />
</template>

<script setup lang="ts">
import Navigate from './components/Navigate.vue';


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
