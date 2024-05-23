// ==UserScript==
// @name         测试脚本使用
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  hahaha
// @author       iovitz
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
  class ScriptController {
    constructor() {
      this.loadTimes = 0
    }

    bootstrap() {
      this.insertHTML()
      this.initTimer()
      this.initEvent()
    }

    initTimer() {
      if (this.timer) return
      this.loadTimes = 0
      this.switchLoadStatusButton.html('持续加载中，还有' + (10 - 1 - this.loadTimes) + '次')
      this.switchLoadStatusButton.addClass('secondary')
      this.timer = setInterval(() => {
        // 滚动容器
        const scrollContainer = document.querySelector('div.ReactVirtualized__Grid.ReactVirtualized__List')
        // 加载更多
        const loadMoreButton = document.querySelector('div[class^="BehaviorFlowItemLoadMore__timelineLoadMore"] > button:not(.arco-btn-loading)')

        // 因为虚拟滚动的原因，需要先滚动到底部，否则无法拿到加载更多的按钮
        if (scrollContainer) {
          scrollContainer.scrollTop = 999999999
        }
        if (loadMoreButton) {
          loadMoreButton.click()
          this.switchLoadStatusButton.html('持续加载中，还有' + (10 - 1 - this.loadTimes) + '次')
          if (++this.loadTimes >= 10) {
            this.clearTimer()
            scrollContainer.scrollTop = 0
          }
        }
      }, 500)
    }

    clearTimer() {
      this.loadTimes = 0
      clearInterval(this.timer)
      this.timer = null
      this.switchLoadStatusButton.html('开始加载')
      this.switchLoadStatusButton.removeClass('secondary')
    }

    initEvent() {
      this.switchLoadStatusButton.on('click', () => {
        if (this.timer) {
          this.clearTimer()
        } else {
          this.initTimer()
        }
      })
    }

    insertHTML() {
      $(':root').css({ fontSize: '12px' })

      this.controlPanel = $(
        `<div class="pico" style="z-index: 999999999; position: fixed; left: 0px; bottom: 0px;">
  <button class="secondary" id="load-button">停止加载</button>
</article>
</div>
`
      )

      document.body.appendChild(this.controlPanel[0])
      this.switchLoadStatusButton = this.controlPanel.find('#load-button')
    }
  }

  window.__sc__ = new ScriptController()
  window.__sc__.bootstrap()
})

function loadRequireFiles() {
  var resourcesList = ['https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js']

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
