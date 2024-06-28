"use client";
import VoteButton from "@/components/VoteButton";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { commentClient } from "@/lib/connect";
import { useRouter } from "next/navigation";

interface Props {
  token: string;
  postId: string;
}

const FormArea = ({ token, postId }: Props) => {
  const router = useRouter();

  const createComment = async (body: string, postId: string, token: string) => {
    try {
      const result = await commentClient.createComment(
        {
          body: body,
          postId: postId,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );
      console.log("result", result);
    } catch (error) {
      console.error(error);
    }
  };

  const clickAction = async (formData: FormData) => {
    if (formData.get("body")) {
      const commentBody = String(formData.get("body"));
      await createComment(commentBody, postId, token);
      router.refresh();
    }
  };

  return (
    <form action={clickAction} className="flex flex-col items-center space-y-2">
      <Textarea name="body" placeholder="Type your message here." />
      <Button type="submit">Send</Button>
      <VoteButton postId={postId} />
    </form>
  );
};

export default FormArea;
