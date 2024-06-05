window.__TAMPERMONKEY_LAOD_SCRIPTS__ = resourcesList => {
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
