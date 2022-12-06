import {PubsubEventName} from './pubsub.constans'

type eventFunction = (...args: unknown[]) => void

export class Pubsub {
  private eventMap = new Map<PubsubEventName, Set<eventFunction>>()

  private getCbSet (eventName: PubsubEventName) {
    const cbSet = this.eventMap.get(eventName) || new Set()
    if (!cbSet.size) {
      this.eventMap.set(eventName, cbSet)
    }
    return cbSet
  }

  on (eventName: PubsubEventName, cb: eventFunction) {
    const cbSet = this.getCbSet(eventName)
    cbSet.add(cb)
  }


  once (eventName: PubsubEventName, cb: eventFunction) {
    const cbSet = this.getCbSet(eventName)
    const newCb = () => {
      cb()
      this.un(eventName, newCb)
    }
    cbSet.add(newCb)
  }

  un (eventName: PubsubEventName, cb: eventFunction) {
    if (!cb) {
      this.eventMap.delete(eventName)
    }
    const cbSet = this.getCbSet(eventName)
    if (!cbSet) return
    cbSet.delete(cb)
  }

  emit (eventName: PubsubEventName, ...args: unknown[]) {
    const cbSet = this.eventMap.get(eventName)
    if (!cbSet || !cbSet.size) return
    cbSet.forEach((cb) => cb(...args))
  }
}
