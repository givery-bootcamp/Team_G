import CloseFormButton from "@/app/post/commentEdit/_components/closeFormButton";
import OpenFormButton from "@/app/post/commentEdit/_components/openFormButton";
import UpdateCommentButton from "@/app/post/commentEdit/_components/updateCommentButton";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import DeleteCommentButton from "../../_components/deleteCommentButton";

interface Props {
  commentUserName: string;
  commentId: string;
  commentBody: string;
  postId: string;
  token: string;
  isOwnComment: boolean;
}

const CommentCard = ({ commentUserName, commentId, commentBody, postId, token, isOwnComment }: Props) => {
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
    <Card className="mb-4 w-full p-1">
      <div className=" p-2" key={commentId}>
        <div className="ml-auto flex justify-between p-1"></div>
        <p className="text-m ml-auto max-w-fit">{"by " + commentUserName}</p>

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
            {isOwnComment && (
              <div className="ml-auto max-w-fit">
                <OpenFormButton handler={handler} />
                <DeleteCommentButton postId={postId} commentId={commentId} token={token} />
              </div>
            )}{" "}
          </div>
        )}
      </div>
    </Card>
  );
};

export default CommentCard;
