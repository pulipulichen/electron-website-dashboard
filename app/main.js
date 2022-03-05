/* global __dirname, process */
// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, BrowserView } = require('electron')
const path = require('path')
const url = require('url')

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS']=true

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800, 
    height: 800,
    autoHideMenuBar: true
  })
  
  win.setTitle("Electron Dashboard")
  win.setIcon ("icon.png")
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
  
  //win.webContents.openDevTools()
   createView(win, 0, 0, 'https://google.com')
//   setTimeout(() => {
    createView(win, 400, 0, 'https://blog.pulipuli.info')
//   }, 3000)
   
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
      var size   = win.getSize();
      var width  = size[0]
      var height = size[1]

      let views = win.getBrowserViews()
      views[0].setBounds({ x: 0, y: 0, width: (width/2), height: height })
      views[1].setBounds({ x: (width/2), y: 0, width: (width/2), height: height })
    }, 100)
  })
}

function createView(win, x, y, url) {
  let view = new BrowserView({ webPreferences: { nodeIntegration: true }})
  win.addBrowserView(view)
  view.setBounds({ x: x, y: y, width: 400, height: 800 })
  //view.setAutoResize({width: true, height: true, horizontal: true})
  view.webContents.loadURL(url)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

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