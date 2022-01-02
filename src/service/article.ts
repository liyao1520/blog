import { request } from "./index";
export const reqGetArticle = (params: any) =>
  request({
    url: "/article",
    params,
  });
