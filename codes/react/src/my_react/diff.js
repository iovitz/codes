import {mountElement} from './mountElement'

export function diff (vDom, container, oldDom) {
  if (!oldDom) {
    // oldDom不存在
    mountElement(vDom, container)
  }
}
