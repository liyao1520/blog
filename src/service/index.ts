import Request from "./request";

export const request = new Request({
  baseURL: "/api",
  timeout: 5000,
  interceptors: {
    requestInterceptor(config) {
      return config;
    },
    requestInterceptorCatch(err) {
      console.log("请求错误拦截而器");
      return err;
    },
    responseInterceptor(res) {
      return res.data;
    },
    responseInterceptorCatch(err) {
      console.log("响应错误拦截器");
      return err;
    },
  },
}).instrance;
