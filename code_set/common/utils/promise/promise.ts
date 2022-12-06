
type CallBack = (...args: any[]) => any
type Excuter = (resolve: CallBack, reject: CallBack) => void

enum PromiseStatus {
  Pending = 'Pending',
  Fulfilled = 'Fulfilled',
  Rejected = 'Rejected'
}

class Promiser<T> {
  private status: PromiseStatus = PromiseStatus.Pending

  private resolvePromise (x: unknown, resolve: typeof this.resolve, reject: typeof this.reject) {
    if (x instanceof Promiser) {
      x.then(resolve, reject)
    } else {
      resolve(x as T)
    }
  }

  value?: T

  reason?: unknown

  successCbs: Array<(reason?: T) => any> = []
  failCbs: Array<(value?: unknown) => any> = []

  constructor (excuter: Excuter) {
    excuter(this.resolve, this.reject)
  }

  resolve = (value: T) => {
    if (this.status !== PromiseStatus.Pending) return
    this.status = PromiseStatus.Fulfilled
    this.value = value
    while (this.successCbs.length) this.successCbs.shift()?.(this.value)
  }

  reject = (reason: unknown) => {
    if (this.status !== PromiseStatus.Pending) return
    this.status = PromiseStatus.Rejected
    this.reason = reason
    while (this.failCbs.length) this.failCbs.shift()?.(this.reason)
  }

  then = (successCb?: (value?: T) => any, failCb?: (reason?: unknown) => any) => {
    const thenPromiser = new Promiser((resolve, reject) => {
      if (this.status === PromiseStatus.Fulfilled) {
        successCb?.(this.value)
      } else if (this.status === PromiseStatus.Rejected) {
        failCb?.(this.reason)
      } else {
        successCb && this.successCbs.push(successCb)
        failCb && this.failCbs.push(failCb)
      }
    })
  }
}

const p = new Promiser((resolve, reject) => {
  setTimeout(() => {
    resolve('hello')
  }, 2000)
})

console.log('start')

p.then((res) => {
  console.log('1', res)
}, (reason) => {
  console.log('e1', reason)
})
p.then((res) => {
  console.log('2', res)
}, (reason) => {
  console.log('e2', reason)
})

