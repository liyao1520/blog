import { request } from "./index";
export const reqTagList = (params?: any) =>
  request({
    url: "/tag",
    params,
  });
