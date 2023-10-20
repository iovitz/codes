import {track, trigger} from './effect'

export const mutableHandlers: ProxyHandler<object> = {
  get: createGetter(),
  set: createSetter(),
}

function createGetter () {
  return function get (target: object, key: string | symbol, receiver: object) {
    const result = Reflect.get(target, key, receiver)
    track(target, key)
    return result
  }
}
function createSetter () {
  return function get (target: object, key: string | symbol, value: unknown, receiver: object) {
    const result = Reflect.set(target, key, value, receiver)

    trigger(target, key, value)

    return result
  }
}
