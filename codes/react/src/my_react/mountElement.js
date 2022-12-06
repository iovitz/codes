import {isFunction} from './isFunction'
import {mountComponent} from './mountComponent'
import {mountNativeElement} from './mountNativeElement'

export function mountElement (vDom, container) {
  if (isFunction(vDom)) {
    mountComponent(vDom, container)
  } else {
    mountNativeElement(vDom, container)
  }
}
