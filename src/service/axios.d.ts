import * as axios from 'axios'

declare module 'axios' {
  export interface AxiosInstance {
    CancelToken: any
    get<T = any>(
      url: string,
      config?: AxiosRequestConfig & { useCache: boolean }
    ): Promise<T>
    post<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<T>
  }

  // https://github.com/axios/axios/issues/1510
  export interface AxiosResponse<T> {
    code?: number
    msg?: string
    result?: T
  }
}
