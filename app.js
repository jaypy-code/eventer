const { app, BrowserWindow, Tray, ipcMain } = require('electron'),
    path = require('path');

let win = null;

function createWindow() {
  win = new BrowserWindow({
    maxWidth: 200,
    maxHeight: 200,
    frame: false,
    fullscreen: false,
    transparent: true,
    fullscreenable: false,
    alwaysOnTop: true,
    maximizable: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.center();
  win.loadURL(path.join(__dirname, 'res', 'app.html'))

  /*

    let tray = new Tray(path.join(__dirname, 'res', 'event.png'));
    tray.on('click', ()=>{    
      if(win.isVisible()) {
        win.hide();
      } else {
        win.show();
      }
    })

  */


  app.setLoginItemSettings({
    openAtLogin: true,
    path: app.getPath('exe')
  })
}

function createHelp() {
  help = new BrowserWindow({
    width: 300,
    height: 310,
    fullscreen: false,
    fullscreenable: false,
    alwaysOnTop: true,
    maximizable: false,
    parent: win,
    webPreferences: {
      nodeIntegration: true
    }
  })

  help.center()
  help.removeMenu()
  help.loadURL(path.join(__dirname, 'res', 'help.html'))
}

app.whenReady().then(createWindow)


ipcMain.on('f1', event=>{
  createHelp();
  event.returnValue = '';
});
