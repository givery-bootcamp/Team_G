"use client";
import { commentClient } from "@/lib/connect";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Props {
  postId: string;
  commentId: string;
  token: string;
}
const DeleteCommentButton = ({ postId, commentId, token }: Props) => {
  const router = useRouter();
  const handleClick = async () => {
    alert("削除しますか？");
    try {
      const result = await commentClient.deleteComment(
        {
          postId: postId,
          commentId: commentId,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );
      if (result) {
        router.refresh();
        console.log("delete", result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button className="bg-white" onClick={handleClick}>
      <Image src="/images/delete_icon.png" alt="delete_icon" width={15} height={15} />
    </Button>
  );
};

export default DeleteCommentButton;
