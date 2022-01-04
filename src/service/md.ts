import { request } from "./index";
export const reqGetMdByName = (name: string) =>
  request({
    url: "/md/name",
    params: { name },
  });
