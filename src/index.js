const electron = require('electron');
const path = require('path');
const BrowserWindow = electron.remote.BrowserWindow;

const notifyBtn = document.getElementById('notifyBtn');

notifyBtn.addEventListener('click', function(event) {
   const modalPath = path.join('file://', __dirname, 'add.html');
   console.log(modalPath);
   let win = new BrowserWindow({
      webPreferences: {
         nodeIntegration: true
      },
      frame: false,
      transparent: true,
      alwaysOnTop: true,
      width: 400,
      height: 200
   });
   win.on('close', function() {
      win = null;
   });
   // win.webContents.openDevTools();
   win.loadURL(modalPath);
   win.show();
});
