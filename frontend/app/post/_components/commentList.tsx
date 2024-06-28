import { createDateString } from "@/utils/index";
import { Comment } from "@/gen/post_pb";
import DeleteCommentButton from "../[id]/_components/deleteCommentButton";

interface Props {
  commentList: Comment[];
  postId: string;
  token: string;
}
const CommentList = ({ commentList, postId, token }: Props) => {
  return (
    <main>
      {commentList.map((comment) => {
        return (
          <div className="p-2" key={comment.id}>
            <div className="flex justify-between p-1">
              <p className="text-m">{comment.id}</p>
              {comment.createdAt && (
                <p className="text-m text-gray-500">{createDateString(comment.createdAt.toDate())}</p>
              )}
            </div>
            <div className="flex justify-between">
              <p className="text-sm">{comment.body}</p>
              <DeleteCommentButton postId={postId} commentId={comment.id} token={token} />
            </div>
          </div>
        );
      })}
    </main>
  );
};

export default CommentList;
