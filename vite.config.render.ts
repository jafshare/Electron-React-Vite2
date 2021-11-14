import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const path = require('path')
/* 
  由于vite还不能正确导入import内建模块，如果使用es导入语法需要使用插件来转换为commonjs导入语法
  * 插件通过disabled控制启动转换
*/
const electron = require("./plugins/vite-plugin-electron.js");
const ROOT_DIR = path.join(__dirname, 'src/render')
const OUTPUT_ROOT_DIR = path.join(__dirname, 'dist/prod')
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const MODE = process.env.MODE
  const isDev = MODE.includes('dev')
  return {
    plugins: [react(), electron({ disabled: false })],
    root: ROOT_DIR,
    base: isDev ? "/" : "./",
    server: {
      port: 9999
    },
    css: {
      preprocessorOptions: {
        less: {
          // 支持内联 JavaScript
          javascriptEnabled: true,
        }
      }
    },
    build: {
      outDir: OUTPUT_ROOT_DIR
    }
  }
})