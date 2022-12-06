import {isFunction} from './isFunction'

export function isFunctionComponent (vDom) {
  const type = vDom.type
  return type && isFunction(vDom) && !(type.prototype && type.prototype.render)
}
