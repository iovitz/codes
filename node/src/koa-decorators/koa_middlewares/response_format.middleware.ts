import {Context, Next} from 'koa'
import {ServerErrorBase, ServerResponseCode, UnhandleExceptionError} from '../koa_errors/koa_errors'

export async function responseFormat (ctx: Context, next: Next) {
  try {
    await next()
    if (ctx.body) {
      ctx.body = {
        code: ServerResponseCode.Success,
        status: 'success',
        data: ctx.body,
      }
    } else {
      ctx.body = {
        code: ServerResponseCode.NotExist,
        status: 'Not found.',
      }
      ctx.status = 404
    }
  } catch (err) {
    if (err instanceof ServerErrorBase) {
      ctx.body = err.toJSON()
    } else if (err instanceof Error) {
      ctx.body = new UnhandleExceptionError(err.message || 'Server error').toJSON()
    }
  }
}
