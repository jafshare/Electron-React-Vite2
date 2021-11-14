import electron from 'electron'
const kill = require('tree-kill');
const spawn = require('cross-spawn')
let electronProcess = null
export type Options = {
  port?: number,
  // 入口文件
  entry?: string,
  disabled?: boolean
}
export default function electronReload(options?: Options) {
  const startElectron = () => {
    const args = [
      `--inspect=${options.port || 5858}`,
      options?.entry || 'index.js'
    ]
    electronProcess = spawn(electron, args)

    electronProcess.stdout.on('data', data => {
      // console.log(chalk.blue(data.toString()));
    })
    electronProcess.stderr.on('data', data => {
      // console.log(chalk.blue(data.toString()));
    })

    electronProcess.on('close', () => {
    })
  }
  const restartElectron = async () => {
    if (electronProcess && electronProcess.kill) {
      kill(electronProcess.pid)
      electronProcess = null
      await startElectron()
    }
  }
  return {
    name: "vite-plugin-electron-reload",
    buildEnd: async () => {
      if (options.disabled) return
      electronProcess ? restartElectron() : startElectron()
    }
  }
}