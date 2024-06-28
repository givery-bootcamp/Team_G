"use client";
import { Button } from "@/components/ui/button";
import { commentClient } from "@/lib/connect";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
        toast.success("Comment delete successfully!");
        router.refresh();
        console.log("delete", result);
      }
    } catch (error) {
      toast.error("Failed to delete comment. Please try again.");
      console.error(error);
    }
  };

  return (
    <Button className="bg-white" onClick={handleClick}>
      <Trash2 color="grey" />
    </Button>
  );
};

export default DeleteCommentButton;
