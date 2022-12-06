import {updateNodeElement} from './updateNodeElement'

export function createDOMElement (vDom) {
  let newDom = null
  if (vDom.type === 'text') {
    newDom = document.createTextNode(vDom.props.textContent)
  } else {
    newDom = document.createElement(vDom.type)
    updateNodeElement(newDom, vDom)
  }
  return newDom
}
