import { Comment } from "@/types";

export const backend = {
  comment: {
    postComment: async (comment: Comment): Promise<Comment | undefined> => {
      const savedComment: Comment | undefined = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(comment);
        }, 1000);
      });

      return savedComment;
    },
  },
};
