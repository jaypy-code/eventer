const
    package = require('../../package.json'),
    fs = require('fs'),
    path = require('path'),
    electron = require('electron');

const databasePath = path.join(electron.remote.app.getPath('appData'), package.name, '.database.json');

async function onClick() {
    let now = new Date();
    await fs.writeFileSync(databasePath, JSON.stringify(
        [ 
            { 
                date: `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`, 
                time: `${now.getHours()}:${now.getMinutes()}`,
                title: 'Untitled',
                background: 'rgba(0, 0, 0, 0.35)',
                color: 'white',
                radius: '0.4rem',
                size: 200,
                disabled: true
            }
        ]
    ));
    await electron.shell.openItem(databasePath);
}