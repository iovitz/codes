class Monitor {
  crashTime = 15 * 1000

  pages = {}

  timer = null

  init () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  registerPage (id, data) {
    this.pages[id] = data
  }

  delPage (id) {
    console.info('删除id', id)
    delete this.pages[id]
  }

  initHandler = () => {
    // 已经有定时器了就不再执行
    if (this.timer) {
      console.error('定时器存在先清理')
      clearTimeout(this.timer)
    }
    console.error('初始化定时器')
    // 10S后检查一下
    this.timer = setTimeout(this.checkHandler, this.crashTime)
  }

  checkHandler = () => {
    console.error('主动监测')
    const {pages, crashTime} = this
    // 遍历所有已注册的页面
    for (const id in pages) {
      const page = pages[id]
      const time = performance.now() - page.liveMoment
      // 如果最近一次的心跳的时间和现在相差超过15S就进行上报
      if (time > crashTime) {
        console.error('==================')
        console.error('页面可能卡死', time / 1000, page)
        console.error('==================')
        fetch('http://10.37.6.38:8080/错误来了哦')
        this.delPage(id)
      } else {
        console.log('相安无事', time / 1000, page)
      }
    }
    clearTimeout(this.timer)
    this.timer = null
  }
}

const monitor = new Monitor()
monitor.init()


// 脚本被安装
self.addEventListener('install', function (e) {
  // eslint-disable-next-line no-invalid-this
  this.skipWaiting()
  console.info('###重新加载')
})
self.addEventListener('activate', function (event) {
  // eslint-disable-next-line no-invalid-this
  this.clients.claim()
})

// 收到消息
/**
 * interface Message {
 *   type: string
 *   id: string
 *   payload: any
 * }
 */
self.addEventListener('message', (e) => {
  const {data} = e
  console.error('ServiceWorker收到消息', data.type)

  // 如果是心跳
  if (data.type === 'MONITOR:HEART_BEAT') {
    console.error('收到心跳', data.id)
    monitor.registerPage(data.id, {
      liveMoment: performance.now(),
      id: data.id,
    })
    monitor.initHandler()
  } else if (data.type === 'MONITOR:PAGE_UNLOAD') {
    // 页面取消挂载
    console.error('页面取消挂载')
    monitor.delPage(data.id)
    console.error(monitor.pages)
  }
})
