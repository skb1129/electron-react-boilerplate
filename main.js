const { app, BrowserWindow, ipcMain } = require("electron");

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
      nodeIntegration: true,
    },
  });

  const APP_URL =
    process.env.NODE_ENV === "development" ? "http://localhost:3000" : `file://${__dirname}/build/index.html`;
  mainWindow.loadURL(APP_URL);

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  process.env.NODE_ENV === "development" && mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on("activate", function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
