import { Post, Comment } from "@/types";

// Mock comments data
const mockComments: Comment[] = [
  { id: 1, body: "Comment 1", userId: 1, postId: 1, createdAt: new Date(), updatedAt: new Date() },
  { id: 2, body: "Comment 2", userId: 1, postId: 2, createdAt: new Date(), updatedAt: new Date() },
  { id: 3, body: "Comment 3", userId: 2, postId: 3, createdAt: new Date(), updatedAt: new Date() },
  { id: 4, body: "Comment 4", userId: 2, postId: 4, createdAt: new Date(), updatedAt: new Date() },
  { id: 5, body: "Comment 5", userId: 3, postId: 5, createdAt: new Date(), updatedAt: new Date() },
  { id: 6, body: "Comment 6", userId: 3, postId: 6, createdAt: new Date(), updatedAt: new Date() },
  { id: 7, body: "Comment 7", userId: 1, postId: 8, createdAt: new Date(), updatedAt: new Date() },
  { id: 8, body: "Comment 8", userId: 2, postId: 9, createdAt: new Date(), updatedAt: new Date() },
  { id: 9, body: "Comment 9", userId: 2, postId: 10, createdAt: new Date(), updatedAt: new Date() },
];

export const mockData: Post[] = [
  {
    id: 1,
    title: "Post 1",
    body: "This is the body of post 1",
    userId: 1,
    comments: mockComments.filter((comment) => comment.postId === 1),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: "Post 2",
    body: "This is the body of post 2",
    userId: 1,
    comments: mockComments.filter((comment) => comment.postId === 2),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    title: "Post 3",
    body: "This is the body of post 3",
    userId: 1,
    comments: mockComments.filter((comment) => comment.postId === 3),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    title: "Post 4",
    body: "This is the body of post 4",
    userId: 1,
    comments: mockComments.filter((comment) => comment.postId === 4),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    title: "Post 5",
    body: "This is the body of post 5",
    userId: 2,
    comments: mockComments.filter((comment) => comment.postId === 5),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    title: "Post 6",
    body: "This is the body of post 6",
    userId: 2,
    comments: mockComments.filter((comment) => comment.postId === 6),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 8,
    title: "Post 8",
    body: "This is the body of post 8",
    userId: 3,
    comments: mockComments.filter((comment) => comment.postId === 8),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 9,
    title: "Post 9",
    body: "This is the body of post 9",
    userId: 2,
    comments: mockComments.filter((comment) => comment.postId === 9),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 10,
    title: "Post 10",
    body: "This is the body of post 10",
    userId: 2,
    comments: mockComments.filter((comment) => comment.postId === 10),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
