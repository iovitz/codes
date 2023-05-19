export const isArray = Array.isArray
export const isObject = (val: unknown): val is object => val !== null && typeof val === 'object'

export const hasChanged = (value: unknown, oldValue: unknown) => !Object.is(value, oldValue)
