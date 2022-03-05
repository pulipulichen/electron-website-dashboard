/* global __dirname, process */
// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, BrowserView } = require('electron')
const path = require('path')
const url = require('url')
const fs = require('fs')

const { session } = require('electron')


const setIcon = require('./libs/setIcon.js')

let setting
let gridSetting
if (process.env["GRID_SETTINGS"]) {
  let settingPath = process.env["GRID_SETTINGS"]
  //console.log(settingPath)
  if (fs.existsSync(settingPath)) {
    setting = require(settingPath)
    //console.log(setting)
    let gridPath = '/app/grids/' + setting.grid + '.js'
    if (fs.existsSync(gridPath)) {
      gridSetting = require(gridPath)
      console.log(gridSetting)
    }
  }
}

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS']=true

// https://github.com/electron/electron/issues/28865#issuecomment-876503547
//app.commandLine.appendSwitch('disable-features', 'CrossOriginOpenerPolicy')

const createWindow = async () => {
  /*
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ['*']
      }
    })
  })
  */

  const win = new BrowserWindow({
    width: 800, 
    height: 800,
    autoHideMenuBar: true,
    backgroundColor: '#EEE',
    //'node-integration': false,
//    webPreferences: {
//      devTools: true,
//      nodeIntegration: true,
//      sandbox: false,
//      nodeIntegrationInWorker: true // <-- this causes the DevTools to crash
//    },
    /*
    webPreferences:{ 
      webviewTag: true ,
      contextIsolation: false,
      nodeIntegration: false,
      nodeIntegrationInWorker: true,
      allowRunningInsecureContent: true,
      webSecurity: true
    }
    */
  })
  
  if (setting.title) {
    win.setTitle(setting.title)
  }
  else {
    win.setTitle("Electron Dashboard")
  }
  
  if (setting.icon) {
    await setIcon(win, setting.icon, setting.title)
  }
  //setIcon
  
  //win.setIcon ("icon.png")
  //win.loadURL(`file://${__dirname}/index.html`)
  //win.loadURL('https://www.facebook.com/pulipuli.blogspot/publishing_tools/?section=SCHEDULED_POSTS')
  
  win.webContents.openDevTools()
  //win.setIcon("https://blogger.googleusercontent.com/img/a/AVvXsEhQik33S9G2GldjEJgj6NBAC0XmTubFOhvK2w9VoaeRiqmxwSSglRmUb2ifrqq6w18wNnaZE9cib4_OJT4xeFMZLJRYm2-YJoOyHXwowqR8hKSpWnKjESzSaJOiKr4R_ZQsAFDvKygLpNg0dmWF93Il-p6AJg9fNfzU79IDxgvU4ssvBWTIKvk")
  
//  win.loadURL(url.format ({
//      pathname: path.join(__dirname, 'index.html'),
//      protocol: 'file:',
//      slashes: true
//   }))
  

  //win.loadURL('https://blog.pulipuli.info')

//  const view = new BrowserView()
//  win.setBrowserView(view)
//  view.setBounds({ x: 0, y: 0, width: 600, height: 300 })
//  //view.webContents.loadURL('http://info.cern.ch/index.html')
//  view.webContents.loadURL('https://electronjs.org')
    gridSetting.addViews(win, setting.views)
   
    win.maximize()
//  let view1 = new BrowserView({ webPreferences: { nodeIntegration: false }})
//  win.addBrowserView(view1)
//  view1.setBounds({ x: 0, y: 0, width: 300, height: 300 })
//  //view1.setAutoResize({width: true, height: true})
//  view1.webContents.loadURL('https://google.com')
//  
//  let view2 = new BrowserView({ webPreferences: { nodeIntegration: false }})
//  win.addBrowserView(view2)
//  view2.setBounds({ x: 300, y: 0, width: 300, height: 300 })
//  //view2.setAutoResize({width: true, height: true})
//  view2.webContents.loadURL('https://blog.pulipuli.info')

  let resizeTimer
  win.on('resize', () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      gridSetting.onResize(win)
    }, 100)
  })
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  if (!setting || !gridSetting) {
    app.quit()
    return false
  }
  
  await createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.