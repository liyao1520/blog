import { request } from "./index";
export const reqGetArticle = (params: any) =>
  request({
    url: "/article",
    params,
  });
export const reqGetArticleById = (id: number | string) =>
  request({
    url: "/article/" + id,
  });
