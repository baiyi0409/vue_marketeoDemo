import { createMemoryHistory, createRouter } from 'vue-router'

import Home from '../components/views/Home.vue'
import Customers from '../components/views/Customers.vue'
import Orders from '../components/views/Orders.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/customer', component: Customers },
  { path: '/order', component: Orders },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export { router } 