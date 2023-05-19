import {mutableHandlers} from './baseHandlers'

export const reactiveMap = new WeakMap()

export function reactive (target: object) {
  return createReactiveObject(target, mutableHandlers, reactiveMap)
}

function createReactiveObject (target: object, baseHandlers: ProxyHandler<any>, proxyMap: WeakMap<object, any>) {
  const existingProxy = reactiveMap.get(target)
  if (existingProxy) {
    return existingProxy
  }
  const proxy = new Proxy(target, baseHandlers)
  reactiveMap.set(target, proxy)

  return proxy
}

