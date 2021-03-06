// Initially parse and load environment file
import dotenv from "dotenv";
dotenv.config();

import path from "path";
import { app, BrowserWindow, ipcMain } from "electron";

import { CHANNELS } from "./common";

const isDev = process.env.NODE_ENV === "development";

ipcMain.handle(CHANNELS.COMMUNICATION, (event, ...args) => {
  console.log("Arguments:", args);
  return Promise.resolve();
});

function createWindow() {
  const mainWindow = new BrowserWindow({
    show: false,
    backgroundColor: "#000000",
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: isDev,
      contextIsolation: !isDev,
      enableRemoteModule: false,
      preload: isDev ? undefined : path.join(__dirname, "renderer.js"),
    },
  });

  const APP_URL = isDev ? "http://localhost:3000" : `file://${__dirname}/index.html`;
  mainWindow.loadURL(APP_URL);

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  isDev && mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on("activate", function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("web-contents-created", (event, contents) => {
  contents.on("will-navigate", (event, navigationUrl) => {
    console.log(navigationUrl);
    event.preventDefault();
  });
  contents.on("new-window", async (event, navigationUrl) => {
    console.log(navigationUrl);
    event.preventDefault();
  });
});
