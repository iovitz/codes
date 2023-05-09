
interface Events {
  [key: string]: Function[]
}

export class Emitter<EventName extends string> {
  private events = new Map<EventName, Set<Function>>()

  on (event: EventName, fn: Function) {
    const fns = this.events.get(event) ?? new Set()
    fns.add(fn)
    this.events.set(event, fns)
  }

  once (event: EventName, fn: Function) {
    const fns = this.events.get(event) ?? new Set()
    const onceFn = () => {
      fn()
      this.off(event, onceFn)
    }
    fns.add(onceFn)
    this.events.set(event, fns)
  }


  off (event: EventName, fn?: Function) {
    if (fn) {
      const fns = this.events.get(event)
      fns?.delete(fn)
    } else {
      this.events.delete(event)
    }
  }

  emit (event: EventName) {
    const fns = this.events.get(event)
    if (!fns || fns.size === 0) return
    fns.forEach((fn) => fn())
  }

  list () {
    const list = {} as Record<EventName, Function[]>
    for (const [event, fns] of this.events) {
      list[event] = [...fns]
    }
    return list
  }
}
