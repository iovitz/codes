const spaceApiPathPattern = /^(https?:\/\/)([0-9a-z_\-.]+)(:[0-9]+)?\/space\/api\/([/0-9a-z_\-.]+)?(\?[0-9a-z_\-&=]+)?(#[0-9-a-z_\-]+)?/i
const tablePattern = /(tbl|blk)[A-Za-z0-9]{13}/g
const basePattern = /\/[A-Za-z0-9]{27}/g

const urlMap = new Map<string, number>()
;(window as any).urlMap = urlMap
const observer = new PerformanceObserver((list, observer) => {
  list.getEntries().forEach(itm => {
    const item = itm as PerformanceResourceTiming
    if (item.initiatorType === 'xmlhttprequest' || item.initiatorType === 'fetch') {
      // 拿到前端的请求路径
      const mathResult = item.name.match(spaceApiPathPattern)
      if (mathResult) {
        if (item.name.includes('cdn_url')) {
          console.log('###', mathResult)
        }
        let url = `/space/api/${mathResult[4]}`
        url = url.replace(basePattern, '/:token')
        url = url.replace(tablePattern, '/:table')
        urlMap.set(url, urlMap.get(url) ? (urlMap.get(url) ?? 0) + 1 : 1)
      }
    }
  })
})
observer.observe({ entryTypes: ['resource'] })
