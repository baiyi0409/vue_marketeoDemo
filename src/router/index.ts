import { createWebHistory, createRouter } from 'vue-router'
import { useUserStore } from '@/stores/' 

import Home from '../components/views/Home.vue'
import Customers from '../components/views/Customers.vue'
import Orders from '../components/views/Orders.vue'
import Login from '@/components/views/Login.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/customer', component: Customers },
  { path: '/order', component: Orders },
  { path: '/login', component: Login },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  const store = useUserStore()
  //const isAuthenticated = !!store.user?.token
  //to.meta.requiresAuth &&

  // 情况1：已登录用户访问登录页 → 跳首页
  if (to.path === '/login' && store.isAuthenticated) {
    next('/')
  }
  // 情况2：未登录用户访问**非登录页** → 跳登录页
  // 忘记密码 和 注册用户 也需要正常跳转
  else if (!store.isAuthenticated && to.path !== '/login') {
    next('/login')
  }
  // 情况3：其他情况（如未登录访问 /login，或已登录访问受保护页）→ 放行
  else {
    next()
  }
})

export { router } 