"use client";
import { createDateString } from "@/utils/index";
import { Comment } from "@/gen/post_pb";
import DeleteCommentButton from "../[id]/_components/deleteCommentButton";
import OpenFormButton from "../commentEdit/_components/openFormButton";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import CloseFormButton from "../commentEdit/_components/closeFormButton";
import UpdateCommentButton from "../commentEdit/_components/updateCommentButton";

interface Props {
  commentList: Comment[];
  postId: string;
  token: string;
}
const CommentList = ({ commentList, postId, token }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [commentBody, setComment] = useState("");

  const handler = () => {
    setIsEditing((prev) => !prev);
    console.log(isEditing);
  };
  const handleSetComment = (value: string) => {
    setComment(value);
  };
  return (
    <main>
      {commentList.map((comment) => {
        return (
          <div className="p-2" key={comment.id}>
            <div className="flex justify-between p-1">
              <p className="text-m">{comment.id}</p>
              {/* {comment.createdAt && (
                <p className="text-m text-gray-500">{createDateString(comment.createdAt.toDate())}</p>
              )} */}
            </div>
            {isEditing ? (
              <div>
                <Textarea
                  name="new body"
                  placeholder={comment.body}
                  onChange={(e) => handleSetComment(e.target.value)}
                />
                <div className="ml-auto max-w-fit">
                  <UpdateCommentButton
                    body={String(commentBody)}
                    postId={postId}
                    commentId={comment.id}
                    token={token}
                    handler={handler}
                  />
                  <CloseFormButton handler={handler} />
                </div>
              </div>
            ) : (
              <div>
                <p className="text-sm">{comment.body}</p>
                <div className="ml-auto max-w-fit">
                  <OpenFormButton handler={handler} />
                  <DeleteCommentButton postId={postId} commentId={comment.id} token={token} />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </main>
  );
};

export default CommentList;
