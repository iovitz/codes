import {isFunctionComponent} from './isFunctionComponent'
import {mountElement} from './mountElement'

export function mountComponent (vDom, container) {
  let nextVDom = null
  if (isFunctionComponent(vDom)) {
    nextVDom = buildFunctionComponent(vDom)
  } else {
    nextVDom = buildClassComponent(vDom)
  }
  mountElement(nextVDom, container)
}

function buildFunctionComponent (vDom) {
  return vDom.type(vDom.props || {})
}

function buildClassComponent (vDom) {
  // eslint-disable-next-line new-cap
  const classComponent = new vDom.props(vDom.props )
  return classComponent.render()
}
