import { defineConfig } from 'vite'
import _ from 'lodash'
import builtins from "builtin-modules";

import mainConfig from './vite.config.main'
import renderConfig from './vite.config.render'
const path = require('path')
const RENDER_ROOT_DIR = path.join(__dirname, 'src/render')
const COMMON_DIR = path.join(__dirname, 'src/common')
const MAIN_ROOT_DIR = path.join(__dirname, 'src/main')
// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  // 采用环境变量的方式，直接修改vite的mode会导致部分需要依赖mode的插件判断错误(例:react插件)
  const MODE = process.env.MODE
  const baseConfig = defineConfig({
    resolve: {
      alias: {
        "@": RENDER_ROOT_DIR,
        "@common": COMMON_DIR,
        "@@": MAIN_ROOT_DIR,
      },
    },
    build: {
      rollupOptions: {
        external: ["electron", ...builtins]
      }
    }
  })
  const config = MODE?.includes('main') ? mainConfig : renderConfig
  if (typeof config === 'function') {
    return _.merge(baseConfig, config({ mode, command }))
  }
  return _.merge(baseConfig, config)
})
