import { createDateString } from "@/utils/index";
import { Comment } from "@/gen/post_pb";
import DeleteCommentButton from "../[id]/_components/deleteCommentButton";
import UpdateFormButton from "../commentEdit/_components/updateButton";

interface Props {
  commentList: Comment[];
  postId: string;
  token: string;
}
const CommentList = ({ commentList, postId, token }: Props) => {
  let isEditing: boolean = false;
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
            <p className="text-sm">{comment.body}</p>

            <div className="ml-auto max-w-fit">
              <UpdateFormButton body={comment.body} postId={postId} commentId={comment.id} token={token} />
              <DeleteCommentButton postId={postId} commentId={comment.id} token={token} />
            </div>
          </div>
        );
      })}
    </main>
  );
};

export default CommentList;
