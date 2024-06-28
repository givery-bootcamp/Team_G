"use client";
import { Comment } from "@/gen/post_pb";
import CommentCard from "../[id]/edit/_components/commentCard";

interface Props {
  commentList: Comment[];
  postId: string;
  token: string;
  userId: string;
}
const CommentList = ({ commentList, postId, token, userId }: Props) => {
  return commentList.map((comment) => {
    return (
      <CommentCard
        key={comment.id}
        commentUserName={comment.userName}
        commentId={comment.id}
        commentBody={comment.body}
        postId={postId}
        token={token}
        isOwnComment={userId === comment.userId}
      />
    );
  });
};

export default CommentList;
