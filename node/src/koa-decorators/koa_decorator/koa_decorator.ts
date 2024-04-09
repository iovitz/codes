import 'reflect-metadata'
import KoaRouter from 'koa-router'

type MethodType = 'get' | 'post' | 'put' | 'patch' | 'delete'

export const rootRouter = new KoaRouter({
  prefix: '/buuk',
})

function reqProcess(methodType: MethodType) {
  return function (path: `/${string}`) {
    return function (targetPrototype: any, methodName: string, descriptor: PropertyDescriptor) {
      Reflect.defineMetadata('path', path, targetPrototype, methodName)
      Reflect.defineMetadata('methodType', methodType, targetPrototype, methodName)
    }
  }
}

export const Controller = (module: `/${string}`) => {
  const modulePath = module === '/' ? '' : module
  return (targetClass: new (...args: any[]) => any) => {
    const router = new KoaRouter({
      prefix: modulePath,
    })
    const prototype = targetClass.prototype
    Reflect.ownKeys(prototype).forEach(key => {
      const fn = prototype[key]
      const path = Reflect.getMetadata('path', prototype, key)
      const methodType: MethodType = Reflect.getMetadata('methodType', prototype, key)
      if (!path || !methodType) return
      router[methodType](path, fn)
    })
    rootRouter.use(router.routes())
    rootRouter.use(router.allowedMethods({}))
  }
}

export const Get = reqProcess('get')
export const Post = reqProcess('post')
export const Put = reqProcess('put')
export const Patch = reqProcess('patch')
export const Delete = reqProcess('delete')
