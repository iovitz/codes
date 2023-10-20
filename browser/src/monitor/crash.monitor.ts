class CrashMonitor {
  private initSuccess = false
  serviceWorker?: ServiceWorkerContainer

  sessionId = `${Math.random()}`

  timer: NodeJS.Timeout | null = null

  init () {
    const serviceWorker = navigator.serviceWorker
    this.serviceWorker = serviceWorker
    serviceWorker
        .register('./crash.monitor.worker.js', {scope: '/'})
        .then((registration) => {
          registration.update()
          this.initSuccess = true
        })
        .catch((err) => {
          console.error('CrashMonitor init fail!', err)
          this.initSuccess = false
        })

    window.addEventListener('beforeunload', () => {
      console.log('---页面正常关闭')
      this.serviceWorker?.controller?.postMessage({
        type: 'MONITOR:PAGE_UNLOAD',
        id: this.sessionId,
      })
    })
    this.heartbeat()
  }

  heartbeat = () => {
    console.log('--------浏览器发送心跳')
    this.serviceWorker?.controller?.postMessage({
      type: 'MONITOR:HEART_BEAT',
      id: this.sessionId,
      data: {
        user_id: '邓贵羊',
      },
    })
    this.timer && clearTimeout(this.timer)
    this.timer = setTimeout(this.heartbeat, 5 * 1000)
  }
}

export const crashMonitor = new CrashMonitor()
