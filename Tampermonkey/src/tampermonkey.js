// ==UserScript==
// @name         测试脚本使用
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  hahaha
// @author       iovitz
// @connect      localhost
// @connect      cdn.jsdelivr.net
// @match        *://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @resource     pakoCSS https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.conditional.min.css
// ==/UserScript==

GM_addStyle(GM_getResourceText('pakoCSS'))

loadRequireFiles().then(() => {
  // ...YourCode
})

function loadRequireFiles() {
  var resourcesList = ['https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js', 'http://localhost:3131/main.js']

  let promise = null
  resourcesList.forEach(url => {
    const fileUrl = url + `?t=${Date.now()}`
    console.log(url)
    if (promise) {
      promise.then(() => {
        return getScript(fileUrl)
      })
    } else {
      promise = getScript(fileUrl)
    }
  })

  function getScript(fileUrl) {
    return new Promise(resolve => {
      GM.xmlHttpRequest({
        method: 'GET',
        url: fileUrl,
        onload: function (response) {
          let remoteScript = document.createElement('script')
          remoteScript.innerHTML = response.responseText
          document.body.appendChild(remoteScript)
          console.log('###脚本加载成功', fileUrl)
          return resolve()
        },
        onerror(e) {
          console.error('###加载脚本失败', e)
        },
      })
    })
  }

  return promise
}
