import { createDateString } from "@/utils/index";
import { Comment } from "@/gen/post_pb";
const CommentList = ({ commentList }: { commentList: Comment[] }) => {
  return (
    <main>
      {commentList.map((comment) => {
        return (
          <div className="p-2" key={comment.id}>
            <div className="flex justify-between p-1">
              <p className="text-m">{comment.id}</p>
              if (comment.createdAt)
              {<p className="text-m text-gray-500">{createDateString(comment.createdAt!.toDate())}</p>}
            </div>
            <p className="text-sm">{comment.body}</p>
          </div>
        );
      })}
    </main>
  );
};

export default CommentList;
