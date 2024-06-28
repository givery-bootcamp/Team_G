"use client";
import { Comment } from "@/gen/post_pb";
import { useState } from "react";
import CommentCard from "../[id]/edit/_components/commentCard";

interface Props {
  commentList: Comment[];
  postId: string;
  token: string;
  userId: string;
}
const CommentList = ({ commentList, postId, token, userId }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [commentBody, setComment] = useState("");

  const handler = () => {
    setIsEditing((prev) => !prev);
    console.log(isEditing);
  };
  const handleSetComment = (value: string) => {
    setComment(value);
  };
  return commentList.map((comment) => {
    return (
      <CommentCard
        commentUserName={comment.userName}
        commentId={comment.id}
        commentBody={comment.body}
        postId={postId}
        token={token}
        isOwnComment={userId === comment.userId}
      />
    );
  });
  //     {commentList.map((comment) => {
  //       return(
  //       <CommentCard commentId={comment.id} commentBody={comment.body} postId={postId} token={token}/>
  //       );
  //     })};
  // );
};

export default CommentList;
