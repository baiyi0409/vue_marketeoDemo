import './assets/less/index.less';
// 引入svg图标注册脚本
import 'virtual:svg-icons-register'

import { router } from './router';

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.mount('#app')
