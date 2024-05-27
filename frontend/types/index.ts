export type Comment = {
  id: number;
  body: string;
  userId: number;
  postId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};
