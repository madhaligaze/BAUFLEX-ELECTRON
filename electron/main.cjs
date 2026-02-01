const { app, BrowserWindow } = require('electron');
const path = require('path');

// Проверка: мы в режиме разработки или в собранном приложении?
const isDev = !app.isPackaged; 

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // Упрощаем для старта
      devTools: isDev, // DevTools только в режиме разработки
    },
    autoHideMenuBar: true, // Скрыть стандартное меню сверху
    icon: path.join(__dirname, '../public/icon.png') // Если есть иконка
  });

  if (isDev) {
    // В режиме разработки грузим локалхост с Vite
    // Важно: loadURL, а не loadFile
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools();
    console.log('Running in development mode');
  } else {
    // В билде грузим файл
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});