function debounce (fn: (...args: any) => void, timeout = 3000) {
  let timenode = 0
  return (...args: any[]) => {
    const now = Date.now()
    if (now - timenode > timeout) {
      fn(...args)
      timenode = now
    }
  }
}
