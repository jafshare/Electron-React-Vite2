import { resolve } from "path";
import { app, BrowserWindow, Menu } from "electron";
import { isDev } from "@common/env";
app.on("ready", async function () {
  var mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      // 禁用同源策略，开启跨域请求
      webSecurity: false,
      // 上下文隔离，v12版本以后默认开启，提高安全性
      contextIsolation: false,
    },
  });
  // 取消menu
  Menu.setApplicationMenu(null);
  if (isDev) {
    // 如果是开发环境则默认打开开发者工具
    mainWindow.webContents.openDevTools();
  }

  // vite开发服务器不会默认重定向到index.html需要填写完整地址
  const URL = isDev
    ? "http://localhost:9999/index.html"
    : require("url").pathToFileURL(resolve(__dirname, "index.html")).toString();
  mainWindow.loadURL(URL);
});
