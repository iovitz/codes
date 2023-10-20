type Middleware = (data: string) => string;

export class Clipboard {
  private copyMiddleware: Middleware[] = []

  /**
   * 初始化全局复制
   */
  initGlobalCopy () {
    document.body.addEventListener('copy', (evt) => {
      const selection = document.getSelection()
      let data = selection?.toString() || ''
      this.copyMiddleware.forEach((copyMiddleware) => {
        data = copyMiddleware(data)
      })
      evt.clipboardData?.setData('text/plain', data.toString())
      evt.preventDefault()
    })
  }

  /**
   * 添加复制中间件
   * @param {Middleware} middleware 中间件
   */
  addCopyMiddleware (middleware: Middleware) {
    this.copyMiddleware.push(middleware)
  }
}
