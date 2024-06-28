import CloseFormButton from "@/app/post/commentEdit/_components/closeFormButton";
import OpenFormButton from "@/app/post/commentEdit/_components/openFormButton";
import UpdateCommentButton from "@/app/post/commentEdit/_components/updateCommentButton";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import DeleteCommentButton from "../../_components/deleteCommentButton";

interface Props {
  commentId: string;
  commentBody: string;
  postId: string;
  token: string;
}

const CommentCard = ({ commentId, commentBody, postId, token }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newBody, setComment] = useState("");

  const handler = () => {
    setIsEditing((prev) => !prev);
    console.log(isEditing);
  };

  const handleSetComment = (value: string) => {
    setComment(value);
  };
  return (
    <div className="p-2" key={commentId}>
      <div className="flex justify-between p-1">
        <p className="text-m">{commentId}</p>
      </div>
      {isEditing ? (
        <div>
          <Textarea name="new body" placeholder={commentBody} onChange={(e) => handleSetComment(e.target.value)} />
          <div className="ml-auto max-w-fit">
            <UpdateCommentButton
              body={String(newBody)}
              postId={postId}
              commentId={commentId}
              token={token}
              handler={handler}
            />
            <CloseFormButton handler={handler} />
          </div>
        </div>
      ) : (
        <div>
          <p className="text-sm">{commentBody}</p>
          <div className="ml-auto max-w-fit">
            <OpenFormButton handler={handler} />
            <DeleteCommentButton postId={postId} commentId={commentId} token={token} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentCard;
