"use client";
import { Button } from "@/components/ui/button";
import { commentClient } from "@/lib/connect";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  body: string;
  postId: string;
  commentId: string;
  token: string;
  handler: () => void;
}

const UpdateCommentButton = ({ body, postId, commentId, token, handler }: Props) => {
  const router = useRouter();
  const onClick = async () => {
    handler();
    try {
      const result = await commentClient.updateComment(
        {
          body: body,
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
        toast.success("Comment update successfully!");
        router.refresh();
        console.log("update", result);
      }
    } catch (error) {
      toast.error("Failed to update comment. Please try again.");
      console.error(error);
    }
  };
  return (
    <Button onClick={onClick}>update</Button>
    // <form className="flex flex-col items-center space-y-2">
    //   <Textarea name="newbody" placeholder={body} />
    //   <Button>update</Button>
    // </form>
  );
};

export default UpdateCommentButton;
