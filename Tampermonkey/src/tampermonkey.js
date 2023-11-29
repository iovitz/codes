// ==UserScript==
// @name         测试脚本使用
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @connect      localhost
// @match        https://bytedance.larkoffice.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_xmlhttpRequest
// ==/UserScript==

const requireScriptList = ['http://localhost:3131/main.js']

loadRequireFiles().then(() => {})

function loadRequireFiles() {
  async function loadJsFile(url) {
    return new Promise(resolve => {
      GM.xmlHttpRequest({
        method: 'GET',
        url: url,
        onload: function (response) {
          let remoteScript = document.createElement('script')
          remoteScript.id = 'tm-dev-script'
          remoteScript.innerHTML = response.responseText
          document.body.appendChild(remoteScript)
          resolve()
        },
      })
    })
  }

  return Promise.all(
    requireScriptList.map(file => {
      const fileName = file + `?t=${Date.now()}`
      return loadJsFile(fileName)
    })
  )
}
