import { isFunction } from '../shared'
import { Dep } from './dep'
import { ReactiveEffect } from './effect'
import { trackRefValue } from './ref'

export class ComputedRefImpl<T> {
  public dep?: Dep

  private _value!: T

  public readonly effect: ReactiveEffect<T>

  public readonly __v_isRef = true

  constructor(getter: any) {
    this.effect = new ReactiveEffect(getter)
    this.effect.computed = this as any
  }

  get value() {
    trackRefValue(this)
    this._value = this.effect.run()
    return this._value
  }

  // set value() {}
}

export function computed(getterOrOptions: any) {
  let getter

  const onlyGetter = isFunction(getterOrOptions)

  if (onlyGetter) {
    getter = getterOrOptions
  }

  const cRef = new ComputedRefImpl(getter)

  return cRef
}
