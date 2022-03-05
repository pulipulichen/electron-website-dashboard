const { BrowserView } = require('electron')

function addViews(win, views) {
  // 中間留邊框6px
  //win.webContents.openDevTools()
  createView(win, 0, 0, views[0])
//   setTimeout(() => {
  createView(win, 403, 0, views[1])
//   }, 3000)
}

function createView(win, x, y, url) {
  let view = new BrowserView({ webPreferences: { nodeIntegration: true }})
  win.addBrowserView(view)
  view.setBounds({ x: x, y: y, width: 397, height: 800 })
  view.webContents.loadURL(url)
}

function onResize(win) {
  var size   = win.getSize();
  var width  = size[0]
  var height = size[1]

  let views = win.getBrowserViews()
  views[0].setBounds({ x: 0, y: 0, width: Math.round((width/2) -3), height: height })
  views[1].setBounds({ x: Math.round((width/2) + 3), y: 0, width: Math.round((width/2) - 3), height: height })
} 

module.exports = {addViews, onResize}