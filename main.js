const path = require("path");
const { app, BrowserWindow, ipcMain } = require("electron");

const isDev = process.env.NODE_ENV === "development";

ipcMain.handle("communication", (event, ...args) => {
  console.log("Arguments:", args);
  return Promise.resolve();
});

function createWindow() {
  const mainWindow = new BrowserWindow({
    show: false,
    backgroundColor: "#ffffff",
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: isDev,
      contextIsolation: !isDev,
      preload: isDev ? null : path.join(__dirname, "build/renderer.js"),
    },
  });

  const APP_URL = isDev ? "http://localhost:3000" : `file://${__dirname}/build/index.html`;
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
