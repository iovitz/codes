interface LimitConfig {
  initTimestamp?: number
  gap?: number
  getExtraTime?: (executeTiming: number[]) => number
  defaultValue: unknown
  needExecute?: (executeTiming: number[]) => void
}

interface LimitedThis {
  getLimitConfig?: (key?: string) => Partial<LimitConfig>
}
/**
 * 禁止函数执行过于频繁
 * @param config 如果连续执行多次
 * @returns unknown
 */
export function LimitedExecute(limitConfig: LimitConfig) {
  const executeTiming: number[] = [limitConfig.initTimestamp ?? Number.MIN_SAFE_INTEGER]
  return (_: LimitedThis, methodName: any, desc: PropertyDescriptor) => {
    let fn = desc.value

    desc.value = function (this: LimitedThis, ...args: any) {
      // 获取最近的执行时间
      const timeStamp = executeTiming[executeTiming.length - 1]
      // 内部配置优先级最高
      const config = {
        ...limitConfig,
        ...this.getLimitConfig?.(methodName),
      }
      const gap = config.gap ?? 60 * 1000
      const externalTime = limitConfig.getExtraTime?.([...executeTiming]) ?? 0
      const now = performance.now()
      if (now - timeStamp < gap + externalTime) {
        return config.defaultValue
      }
      const needExecute = config.needExecute?.([...executeTiming])
      executeTiming.push(now)
      if (!needExecute) {
        return config.defaultValue
      }
      return fn.call(this, args)
    }
  }
}
