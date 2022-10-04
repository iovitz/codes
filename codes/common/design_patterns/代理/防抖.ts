export function throttle (fn: (...args: any) => void, timeout = 3000) {
  let timer: NodeJS.Timer | null = null
  return (...args: any[]) => {
    if (timer) {
      clearInterval(timer)
    }
    timer = setTimeout(() => {
      fn(...args)
      if (timer) {
        clearTimeout(timer)
      }
      timer = null
    }, timeout)
  }
}
