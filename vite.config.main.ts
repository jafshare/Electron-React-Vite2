import { defineConfig } from 'vite'
import electronReload from './plugins/vite-plugin-electron-reload'
const path = require('path')
const ROOT_DIR = path.join(__dirname, 'src/main')
const DEV_OUTPUT_ROOT_DIR = path.join(__dirname, 'dist/dev')
const PROD_OUTPUT_ROOT_DIR = path.join(__dirname, 'dist/prod')
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const MODE = process.env.MODE
  const isDev = MODE.includes('dev')
  const isRelease = MODE.includes('release')
  console.log('MODE:', MODE, isDev)
  return {
    plugins: [electronReload({ entry: path.join(isDev ? DEV_OUTPUT_ROOT_DIR : PROD_OUTPUT_ROOT_DIR, 'index.js'), disabled: isRelease })],
    root: ROOT_DIR,
    build: {
      // 开启文件监听
      watch: isDev ? {} : null,
      outDir: isDev ? DEV_OUTPUT_ROOT_DIR : PROD_OUTPUT_ROOT_DIR,
      rollupOptions: {
        // 指定入口文件
        input: path.join(ROOT_DIR, "index.ts"),
        output: {
          // 指定输出文件格式
          entryFileNames: "[name].js",
          format: "cjs",
        },
      },
      // 开发禁用压缩，否则main进程比较难调试
      minify: false,
    },
  }
})
