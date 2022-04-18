export type RequestMethod = 'post' | 'get' | 'put' | 'delete' | 'patch'

export type ApiItem<Req = any, Res = any> = {
  method: RequestMethod
  url: string,
  reqType: Req,
  resType: Res,
}

export interface Options {
  method?: RequestMethod
  url?: any
  params?: any
  data?: any
}
export interface Data<T = any> {
  code: number
  data: T
  msg: string
}

export interface AjaxRequest {
  <T = any>(options: Options): Promise<Data<T>>
}
