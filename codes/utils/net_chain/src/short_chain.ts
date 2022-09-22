import axios, {AxiosInstance, AxiosRequestConfig} from 'axios'

export abstract class ShortChain {
  axios: AxiosInstance
  protected constructor (config: AxiosRequestConfig<any>) {
    this.axios = axios.create(config)

    this.axios.interceptors.response.use((res: any) => {
      return res.data
    })
  }

  get<T> (url: string, params: Record<string, any> = {}) {
    return this.axios.get(url, {
      params: {},
    }) as Promise<T>
  }

  post<T> (url: string, data: Record<string, any> = {}) {
    return this.axios.post(url, {
      ...data,
    }) as Promise<T>
  }

  patch<T> (url: string, data: Record<string, any> = {}) {
    return this.axios.post(url, {
      ...data,
    }) as Promise<T>
  }

  put<T> (url: string, data: Record<string, any> = {}) {
    return this.axios.post(url, {
      ...data,
    }) as Promise<T>
  }

  delete<T> (url: string, data: Record<string, any> = {}) {
    return this.axios.post(url, {
      ...data,
    }) as Promise<T>
  }


  setHeader (key: string, value: string) {
    this.axios.defaults.headers.common[key] = value
  }

  delHeader (key: string) {
    delete this.axios.defaults.headers.common[key]
  }
}
