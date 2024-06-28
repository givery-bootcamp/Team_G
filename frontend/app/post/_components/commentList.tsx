"use client";
import { createDateString } from "@/utils/index";
import { Comment } from "@/gen/post_pb";
import DeleteCommentButton from "../[id]/_components/deleteCommentButton";
import OpenFormButton from "../commentEdit/_components/openFormButton";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import CloseFormButton from "../commentEdit/_components/closeFormButton";
import UpdateCommentButton from "../commentEdit/_components/updateCommentButton";
import CommentCard from "../[id]/edit/_components/commentCard";

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
      {commentList.map((comment) => {
        return(
        <CommentCard commentId={comment.id} commentBody={comment.body} postId={postId} token={token}></>
        );
      })};
  );
};

export default CommentList;
