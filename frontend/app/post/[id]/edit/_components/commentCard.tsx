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
    <Card className={`mb-4 w-full rounded-lg bg-white p-4 shadow-lg ${isOwnComment ? "" : "py-2"}`}>
      <div className="flex items-start">
        <div className="flex-1">
          {isEditing ? (
            <Textarea
              name="new body"
              placeholder={commentBody}
              onChange={(e) => handleSetComment(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2"
            />
          ) : (
            <p className="text-sm text-gray-600">{commentBody}</p>
          )}
        </div>
        {isOwnComment && (
          <div className="ml-2 flex flex-col space-y-2">
            {isEditing ? (
              <>
                <UpdateCommentButton
                  body={String(newBody)}
                  postId={postId}
                  commentId={commentId}
                  token={token}
                  handler={handler}
                />
                <CloseFormButton handler={handler} />
              </>
            ) : (
              <div className="flex">
                <OpenFormButton handler={handler} />
                <DeleteCommentButton postId={postId} commentId={commentId} token={token} />
              </div>
            )}
          </div>
        )}
      </div>
      <div className={`mt-2 text-right ${isOwnComment ? "" : "mt-0"}`}>
        <p className="text-m text-gray-700">{"by " + commentUserName}</p>
      </div>
    </Card>
  );
};

export default CommentCard;
