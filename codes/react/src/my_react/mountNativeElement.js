import {createDOMElement} from './createDOMElement'
import {mountElement} from './mountElement'

export function mountNativeElement (vDom, container) {
  const newDom = createDOMElement(vDom)
  vDom.children.forEach((child) => {
    mountElement(child, newDom)
  })
  container.appendChild(newDom)
}
