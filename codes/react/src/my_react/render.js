import {diff} from './diff'

export function render (vDom, container, oldDom) {
  diff(vDom, container, oldDom)
}
