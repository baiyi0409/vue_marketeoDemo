import './assets/less/index.less';
// 引入svg图标注册脚本
import 'virtual:svg-icons-register'
//引入路由
import { router } from './router';
//引入pinia
import { createPinia } from 'pinia'
const pinia = createPinia()

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
