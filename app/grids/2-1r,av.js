const { BrowserView } = require('electron')

function addViews(win, views) {
  // 中間留邊框6px
  //win.webContents.openDevTools()
  createView(win, 0, 0, views[0])
//   setTimeout(() => {
  createView(win, 0, 403, views[1])
//   }, 3000)
}

function createView(win, x, y, url) {
  let view = new BrowserView({ 
    webPreferences: { 
      nodeIntegration: false 
    }
  })
  win.addBrowserView(view)
  view.setBounds({ x: x, y: y, width: 800, height: 397 })
  view.webContents.loadURL(url)
}

function onResize(win) {
  var size   = win.getSize();
  var width  = size[0]
  var height = size[1]

  let views = win.getBrowserViews()
  views[0].setBounds({ x: 0, y: 0, width: width, height: Math.round((height/2) -3) })
  views[1].setBounds({ x: 0, y: Math.round((height/2) + 3), width: width, height: Math.round((height/2) -3) })
} 

module.exports = {addViews, onResize}
