const electron = require('electron');
const path = require('path');
const BrowserWindow = electron.remote.BrowserWindow;
const axios = require('axios');
const ipc = electron.ipcRenderer;

const notifyBtn = document.getElementById('notifyBtn');
const price = document.querySelector('h1');
const targetPrice = document.getElementById('targetPrice');

function getBTC() {
   axios
      .get(
         'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=EUR'
      )
      .then(res => {
         const cryptos = res.data.BTC.EUR;
         price.innerHTML = cryptos.toLocaleString('fr') + '€';
      });
}

getBTC();
setInterval(getBTC, 30000);

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
   win.webContents.openDevTools();
   win.loadURL(modalPath);
   win.show();
});

ipc.on('targetPriceVal', function(event, arg) {
   targetPriceVal = Number(arg);
   targetPrice.innerHTML = targetPriceVal.toLocaleString('fr') + '€';
});
