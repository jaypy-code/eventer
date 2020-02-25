const
    package = require('../../package.json'),
    electron = require('electron'), 
    fs = require('fs'),
    path = require('path');

let 
    container = document.getElementById('container'),
    day = document.getElementById('day'),
    text = document.getElementById('text'),
    title = document.getElementById('title');
    
let 
    remote = electron.remote,
    app = remote.app,
    win = remote.getCurrentWindow(),
    databasePath = path.join(electron.remote.app.getPath('appData'), package.name, '.database.json');


let size = 200, timeout = null;

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
    
    day.classList.remove('to');
    if(days == 0 || days == 1){
        day.innerText = 'Today';
        day.classList.add('to');
    } else {
        day.innerText = days;
        text.innerText = `day${days == 1 || days == 0?'':'s'} ${days <= 0?'ago':'left'}`;
        timeout = setTimeout(() => {
           refresh(); 
        }, tomorrow.getTime());
    }

    title.innerText = Title;
    document.title = Title;
}

function setTheme(background='rgba(0, 0, 0, 0.35)', colour='white', radius='0.4rem'){
    container.style.backgroundColor = background;
    container.style.color = colour;
    container.style.borderRadius = radius;
}

async function refresh(){
    clearTimeout(timeout);

    let index = new URLSearchParams(window.location.search).get('index') || '0';
    index = parseInt(index);

    let data = await fs.readFileSync(databasePath);
    data = JSON.parse(data) || [];
    data = data[index];

    size = data['size'] || 200;
    win.setSize(size, size);

    setDate(`${data['date']} ${data['time']}`, data['title']);
    setTheme(data['background'], data['color'] || data['colour'], data['radius']);
    
    if(
        (data['disabled'] && data['disabled'] == true) ||
        (data['hide'] && data['hide'] == true)
    ) {
        win.hide();
    }
}

window.onload = ()=>{
    refresh();
}

window.addEventListener('keyup', event=>{
    event.preventDefault();

    switch (event.keyCode) {
        case 112:
            electron.ipcRenderer.sendSync('f1', win);
            break;
        case 113:                        
            if(win.getSize()[0] == size) {
               win.setSize(100, 100);
            } else {
               win.setSize(size, size);
            }
            break;
        case 114:
            electron.shell.openItem(databasePath);
            break;
        case 115:
            win.hide();
            break;
        case 116:
            refresh();
            break;
        default:
            break;
    }
})