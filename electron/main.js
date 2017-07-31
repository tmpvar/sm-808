const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

app.commandLine.appendSwitch('--disable-renderer-backgrounding')

let mainWindow

function createWindow () {
  const width = 706
  const height = 344

  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    frame: false,
    webPreferences: {
      backgroundThrottling: false
    }
  })

  mainWindow.setMinimumSize(width, height)
  mainWindow.setMaximumSize(width, height)

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
    app.quit()
  })
}

app.on('ready', createWindow)
