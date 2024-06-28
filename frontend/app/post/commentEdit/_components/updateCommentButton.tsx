"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { commentClient } from "@/lib/connect";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
        router.refresh();
        console.log("update", result);
      }
    } catch (error) {
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
