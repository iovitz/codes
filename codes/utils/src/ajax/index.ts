import axios, { AxiosResponse } from 'axios'
import type { ApiItem, Data, AjaxRequest, RequestMethod } from './types'
import { showMessage } from '../message'
import { requestErrors } from './error-tips'
import envConfig from '../config'

/**
 * 不同环境下对应的服务器地址
 */
const service = axios.create({
  baseURL: envConfig.API_BASE_URL,
  timeout: envConfig.API_TIMEOUT
})

/**
 * 请求拦截
 */
service.interceptors.request.use((req) => {
  const headers = req.headers
  // 添加 token
  if (headers && headers.Authorization) headers.Authorization = 'Bearer needs to be replaced!'
  return req
})

service.interceptors.response.use((res: AxiosResponse<Data<any>>) => {
  const { data, code } = res.data
  switch (code) {
    case 200:
      return data
    case 40001:
      showMessage({
        type: 'error',
        message: requestErrors.TOKEN_INVALID
      })
      return Promise.reject(requestErrors.TOKEN_INVALID)
    default:
      showMessage({
        type: 'error',
        message: requestErrors.NET_WORK_ERROR
      })
      return Promise.reject(requestErrors.NET_WORK_ERROR)
  }
})

/**
 * 主要的请求函数
 * @param options Options
 * @returns Promise
 */
const ajax: AjaxRequest = (options) => {
  if (!options.method) {
    options.method = 'get'
  }
  if (options.method.toLocaleLowerCase() && options.data && !options.params) {
    options.params = options.data
  }
  const promise = service({ ...options }) as Promise<any>
  return promise
}

/**
 * 创建请求函数
 * @param options { url: String, reqType: typeof Request, resType: typeof Response }
 * @returns
 */
const apiFunctionFactory = <T extends ApiItem>(options: T) => {
  type Req = T extends ApiItem<infer P, any> ? P : any
  type Res = T extends ApiItem<any, infer P> ? P : any
  return function (params: Req) {
    return new Promise<Res>((resolve, reject) => resolve('' as any))
  }
}

export function createApiItem<Req, Res> (method: RequestMethod, url: string) {
  return {
    method,
    url
  } as ApiItem<Req, Res>
}

export default apiFunctionFactory
