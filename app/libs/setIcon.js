const fs = require('fs')
const path = require('path')
const client = require('https')

if (!fs.existsSync('/tmp/iconCache')) {
  fs.mkdirSync('/tmp/iconCache')
}

async function setIcon(win, iconURL, title) {
  if (!title || title.length === 0) {
    return false
  }
  
  let targetIconPath = path.resolve('/tmp/iconCache/', title)
  if (!fs.existsSync(targetIconPath)) {
    // 下載檔案
    await downloadImage(iconURL, targetIconPath)
  }
  
  win.setIcon(targetIconPath)
}

// https://scrapingant.com/blog/download-image-javascript
function downloadImage(url, filepath) {
  console.log(url, filepath)
    return new Promise((resolve, reject) => {
        client.get(url, (res) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath))
                    .on('error', reject)
                    .once('close', () => resolve(filepath));
            } else {
                // Consume response data to free up memory
                res.resume();
                reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
            }
        });
    });
}

module.exports = setIcon