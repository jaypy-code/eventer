const
    package = require('./package.json'),
    fs = require('fs'),
    path = require('path'),
    electron = require('electron');

const databasePath = path.join(electron.app.getPath('appData'), package.name, '.database.json');

async function readDatabase() {
    if(await fs.existsSync(databasePath) == true) {
        try {
            let data = await fs.readFileSync(databasePath);
            if(data == null) return null;
            else {
                data = await JSON.parse(data);
                return data.length == 0? null: data;
            }
        } catch (error) {
            return null;
        }
    } else {
        await fs.writeFileSync(databasePath, '[]');
        return null;
    }
}

function createWelcomeWindow() {
    let win = new electron.BrowserWindow({
        width: 600,
        height: 350,
        resizable: false,
        maximizable: false,
        fullscreen: false,
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    });
    
    win.center();
    win.removeMenu();
    win.loadURL(path.join(__dirname, 'windows', 'welcome', 'template.html'));

    win.on('ready-to-show', ()=>{
        win.show();
    });
}

function createEventWindow(index=0, size=200) {
    let win = new electron.BrowserWindow({
        minWidth: 100,
        minHeight: 100,
        width: size,
        height: size,
        frame: false,
        fullscreen: false,
        transparent: true,
        fullscreenable: false,
        alwaysOnTop: true,
        maximizable: false,
        webPreferences: {
          nodeIntegration: true
        }
    });
    
    win.center();
    win.removeMenu();
    win.loadURL(path.join(__dirname, 'windows', 'main', `template.html?index=${index}`));

    win.on('ready-to-show', ()=>{
        win.show();
    });
}

function createHelpWindow(win) {
    let help = new electron.BrowserWindow({
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
    });
    
    help.center();
    help.removeMenu();
    help.loadURL(path.join(__dirname, 'windows', 'help', 'template.html'));
}

electron.app.whenReady()
.then(readDatabase)
.then(data=>{
    if(data == null) createWelcomeWindow();
    else {
        let count = 0;
        for(let i in data) {
            if(
                (data[i]['disabled'] && data[i]['disabled'] == true) ||
                (data[i]['hide'] && data[i]['hide'] == true)
            ) {
                continue;
            } else {
                createEventWindow(i, data[i]['size']);
                count++;
            }
        }

        if(count == 0) createWelcomeWindow();
    }
});

electron.ipcMain.on('f1', (event, win)=>{
    createHelpWindow(win);
    event.returnValue = '';
});
  