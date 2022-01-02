/**
 * 封装axios
 */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
//定义一个拦截器的接口
interface RequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (err: any) => any;
  responseInterceptor?: (config: AxiosResponse) => AxiosResponse;
  responseInterceptorCatch?: (err: any) => any;
}
//定义 RequestConfig接口,用于new Request() 时传的参数继承 AxiosRequestConfig,新添加拦截器的接口
interface RequestConfig extends AxiosRequestConfig {
  interceptors?: RequestInterceptors;
}

class Request {
  instrance: AxiosInstance; //axios实例
  interceptors?: RequestInterceptors; //4个拦截器
  constructor(config: RequestConfig) {
    //创建axios实例
    this.instrance = axios.create(config);
    //取到拦截器
    this.interceptors = config.interceptors;
    //使用请求拦截器
    this.instrance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    //使用响应拦截器
    this.instrance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );
  }
  // request 请求方法
  // request(config: RequestConfig): Promise<AxiosResponse<any>> {
  //   return this.instrance.request(config)
  // }
}

export default Request;
