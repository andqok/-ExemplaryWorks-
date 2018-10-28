const electron = require('electron')
const remote = require('electron').remote
const { app, BrowserWindow } = require('electron')

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({ width: 2200, height: 1200 })
    //win.webContents.openDevTools()

    // and load the index.html of the app.
    win.loadFile('index.html')
}

app.on('ready', createWindow)
