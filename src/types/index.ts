export interface IClassify {
  id: number;
  name: string;
  describe: string;
}
export interface ITag {
  id: number;
  name: string;
}

export interface IArticle {
  id: number;
  title: string;
  content: string;
  cover: string;
  likeCount: number;
  canComment: true;
  classifyId: number;
  createdAt: string;
  updatedAt: string;
  count: number;
  classify: IClassify;
  tags: ITag;
}
