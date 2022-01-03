import { request } from "./index";
export const reqClassifyList = (params?: any) =>
  request({
    url: "/classify",
    params,
  });
