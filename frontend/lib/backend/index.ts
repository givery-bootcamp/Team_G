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
    // getCommentOld: async (): Promise<Comment[] | undefined> => {
    //   const promptTemplateList: Comment[] | undefined = await new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve(mockComments);
    //     }, 1000);
    //   });

    //   return promptTemplateList;
    // },
    //id指定必要だよなあバージョン
    // getComment: async (id: String): Promise<Comment[] | undefined> => {
    //   const promptTemplateList: Comment[] | undefined = await new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve(mockComments);
    //     }, 1000);
    //   });

    //   return promptTemplateList;
    // },
  },
};
