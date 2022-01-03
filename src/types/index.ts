export interface IClassify {
  id: number;
  name: string;
  describe?: string;
  count?: number;
}
export interface ITag {
  id: number;
  name: string;
  count?: number;
}

export interface IArticle {
  id: number;
  title: string;
  content: string;
  cover?: string;
  likeCount?: number;
  canComment?: true;
  classifyId?: number;
  createdAt?: string;
  updatedAt?: string;
  count?: number;
  classify: IClassify | null;
  tags: ITag | null;
}
