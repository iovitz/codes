import { ComputedRefImpl } from './computed'
import { Dep, createDep } from './dep'

export let activeEffect: ReactiveEffect | undefined

export type KeyToDepMap = Map<any, Dep>
export const targetMap = new WeakMap<object, KeyToDepMap>()

export function effect<T extends any = any>(fn: () => T) {
  const _effect = new ReactiveEffect(fn)
  _effect.run()
}

export class ReactiveEffect<T extends any = any> {
  computed?: any
  constructor(public fn: () => T) {}

  run() {
    activeEffect = this
    return this.fn()
  }
}

/**
 * 收集依赖
 */
export function track(target: object, key: unknown) {
  if (!activeEffect) return
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = createDep()))
  }
  trackEffects(dep)
}

export function trackEffects(dep: Dep) {
  if (!activeEffect) return
  dep.add(activeEffect)
}

/**
 * 触发依赖
 */
export function trigger(target: object, key: unknown, value: unknown) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  const dep = depsMap.get(key)
  if (!dep) return
  triggerEffects(dep)
}

export function triggerEffects(dep: Dep) {
  const effects: ReactiveEffect[] = Array.isArray(dep) ? dep : [...dep]
  effects.forEach(effect => effect.run())
}
