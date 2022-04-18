type Func = (...args: any[]) => any

class EmitorEvent {
  /**
   * 一个Emitor事件对象
   * @param name 事件对象
   * @param handler 回调函数
   * @param context this指向
   */
  constructor (public name: string, public handler: Func, private context: any) {}

  /**
   * 执行事件
   * @param args 调用时传递的参数
   */
  execute (...args: any[]) {
    if (typeof this.context !== 'undefined') {
      this.handler.apply(this.context, args)
    } else {
      this.handler(...args)
    }
  }
}

class Emitor {
  /**
   * 存储所有的事件
   */
  private eventMap = new Map<string, Set<EmitorEvent>>()

  /**
   * 存储所有的场景
   */
  private sceneMap = new Map<symbol, Set<EmitorEvent>>()

  /**
   * 创建一个场景
   * @returns 场景
   */
  createScene () {
    const that = this
    const { sceneMap } = this
    const eventSet = new Set<EmitorEvent>()
    const sceneId = Symbol('scene')
    sceneMap.set(sceneId, eventSet)
    return {
      /**
       * 在场景里监听事件
       * @param name 事件对象
       * @param handler 回调函数
       * @param context this指向
       */
      on (name: string, handler: Func, context: any = undefined) {
        eventSet.add(new EmitorEvent(name, handler, context))
        that.on(name, handler, context)
      },
      /**
       * 在场景里取消监听事件
       * @param name 事件对象
       * @param handler 回调函数
       */
      off (name: string, handler: Func) {
        for (const event of eventSet) {
          if (event.name === name && event.handler === handler) {
            eventSet.delete(event)
          }
        }
      },
      /**
       * 销毁场景，同时取消所有通过这个场景订阅的事件
       */
      destroy () {
        for (const eventEmitor of eventSet) {
          const { name, handler } = eventEmitor
          that.off(name, handler)
        }
        return that.sceneMap.delete(sceneId)
      }
    }
  }

  /**
   * 监听事件
   * @param name 事件对象
   * @param handler 回调函数
   * @param context this指向
   */
  on (name: string, handler: Func, context: any = undefined): void {
    const { eventMap, sceneMap } = this
    if (!eventMap.has(name)) {
      eventMap.set(name, new Set<EmitorEvent>())
    }
    const eventSet = eventMap.get(name)
    eventSet && eventSet.add(new EmitorEvent(name, handler, context))
  }

  /**
   * 取消监听事件
   * @param name 事件对象
   * @param handler 回调函数
   */
  off (name: string, handler: Func) {
    const { eventMap } = this
    if (eventMap.has(name)) {
      const eventSet = eventMap.get(name)
      eventSet && eventSet.forEach(emitorEvent => {
        if (emitorEvent.handler === handler) {
          eventSet.delete(emitorEvent)
        }
      })
    }
  }

  /**
   * 派发事件
   * @param name 事件名
   * @param args 派发事件时的传参
   */
  emit (name: string, ...args: any[]) {
    const { eventMap } = this
    if (eventMap.has(name)) {
      const eventSet = eventMap.get(name)
      eventSet && eventSet.forEach(emitorEvent => {
        emitorEvent.execute(...args)
      })
    }
  }

  /**
   * 监听一次事件
   * @param name 事件对象
   * @param handler 回调函数
   * @param context this指向
   */
  once (name: string, handler: Func, context?: any) {
    const fn = (...args: any[]) => {
      if (typeof context !== 'undefined') {
        handler.apply(context, args)
      } else {
        handler(...args)
      }
      this.off(name, fn)
    }
    this.on(name, fn, context)
  }
}

export default new Emitor()
