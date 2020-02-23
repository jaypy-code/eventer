const electron = require('electron'), 
    fs = require('fs'),
    path = require('path');

let 
    day = document.getElementById('day'),
    text = document.getElementById('text'),
    title = document.getElementById('title');
    
let 
    remote = electron.remote,
    app = remote.app,
    win = remote.getCurrentWindow(),
    appData = remote.app.getPath('appData'),
    Path = path.join(appData, 'Eventer', '.eventer.json');

let timeout = null;

function setDate(Time="", Title="Untitled"){    
    let end = new Date(Time),
        now = new Date(),
        tomorrow = new Date(
            `${now.getFullYear()}/
            ${now.getMonth() + 1}/
            ${now.getDate()} 
            ${end.getHours()}:${end.getMinutes()}`
        );

    if(tomorrow.getTime() - now.getTime() <= 0) {
        tomorrow.setDate(tomorrow.getDate() + 1);
    }    
    
        
    let time = end.getTime() - now.getTime(),
        days = time / (1000 * 3600 * 24);

    days = parseInt(days) || 0;

    
    switch (days) {
        case 0:
            day.innerText = 'Ended !';
            break;
        case 1:
            day.innerText = 'Today';
        default:
            day.innerText = days;
            text.innerText = `day${days <= 1?'':'s'} left`;
            timeout = setTimeout(() => {
               refresh(); 
            }, tomorrow.getTime());
    }
    title.innerText = Title;
}

function setTheme(background='rgba(0, 0, 0, 0.35)', colour='white'){
    document.documentElement.style.setProperty('--background', background);
    document.documentElement.style.setProperty('--color', colour);
}

function refresh(){
    clearTimeout(timeout);
    if(fs.existsSync(Path)){
        let data = JSON.parse(fs.readFileSync(Path).toString());
        setDate(data.date, data.title);
        setTheme(data.background, data.color);
    } else {
        fs.writeFileSync(Path, `{ "date": "", "title": "", "background": "rgba(0, 0, 0, 0.35)", "color": "white" }`);
        setDate();
    }
}

window.onload = ()=>{
    refresh();
}

window.addEventListener('keyup', event=>{
    event.preventDefault();

    switch (event.keyCode) {
        case 112:
            electron.ipcRenderer.sendSync('f1', null);
            break;
        case 113:            
            if(win.getSize()[0] == 200) {
               win.setSize(100, 100);
            } else {
               win.setSize(200, 200);
            }
            break;
        case 114:
            electron.shell.openItem(Path);
            break;
        case 115:
            app.exit();
            break;
        case 116:
            refresh();
            break;
        default:
            break;
    }
})