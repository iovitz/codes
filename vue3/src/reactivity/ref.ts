import {hasChanged, isObject} from '../shared'
import {Dep, createDep} from './dep'
import {activeEffect, track, trackEffects, triggerEffects} from './effect'
import {reactive} from './reactive'

interface Ref<T extends unknown = any> {
  value: T
}
export function ref<T extends unknown> (value?: T) {
  return createRef<T>(value, false)
}

export function createRef<T extends unknown> (rawValue: unknown, shallow: boolean) {
  if (isRef(rawValue)) {
    return rawValue
  }
  return new RefImpl(rawValue, false)
}

class RefImpl<T> {
  private _value: T

  // 原始值
  private _rawValue: T

  public dep?: Dep = undefined

  public readonly __v_isRef = true

  // eslint-disable-next-line camelcase
  constructor (value: T, private __v_isShallow: boolean) {
    this._rawValue = value
    this._value = this.__v_isShallow ? value : toReactive(value)
  }

  public get value () {
    trackRefValue(this)
    return this._value
  }

  public set value (newVal) {
    console.log(hasChanged(newVal, this._rawValue))
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal
      this._value = toReactive(newVal)
      triggerRefValue(this)
    }
  }
}

export function trackRefValue (ref: RefImpl<unknown>) {
  if (activeEffect) {
    trackEffects(ref.dep || (ref.dep = createDep()) )
  }
}

export function triggerRefValue (ref: RefImpl<unknown>) {
  if (ref.dep) {
    console.log('到这里 ')
    triggerEffects(ref.dep)
  }
}

export function isRef (r: any): r is Ref {
  return !!(r && r.__v__isRef === true)
}
function toReactive<T extends unknown> (value: T) {
  return isObject(value) ? reactive(value) : value
}

