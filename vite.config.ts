import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//使用svg图标
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    createSvgIconsPlugin({
      // 指定要缓存的 svg 文件夹（支持多个）
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定 symbolId 格式
      symbolId: 'icon-[dir]-[name]',
      // 扫描子目录（默认 true）
      svgoOptions: true, // 可选：启用 SVGO 压缩
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  //配置代理服务器
  server: {
    port: 5173, // 前端端口（可选）
    proxy: {
      '/api': {
        target: 'http://localhost:5119', // 后端地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
