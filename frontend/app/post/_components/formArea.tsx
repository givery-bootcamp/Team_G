"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { v4 as uuid4 } from "uuid";
import { postClient } from "@/lib/connect";
//import { v4 as uuid4 } from "uuid";
import { Comment } from "@/types";
import { post } from "@/gen/post-PostService_connectquery";

interface Props {
  params: {
    token: string;
  };
}

const FormArea = ({ postId }: { postId: string }, { params }: Props) => {
  const clickAction = async (formData: FormData) => {
    if (formData.get("body")) {
      const commentBody = String(formData.get("body"));
      await postNewComment(commentBody, postId);
    }
  };

  return (
    <form action={clickAction} className="flex flex-col items-center space-y-2">
      <Textarea name="body" placeholder="Type your message here." />
      <Button type="submit">Send</Button>
    </form>
  );
};

export default FormArea;

const postNewComment = async (body: string, postId: string) => {
  try {
    const result = await postClient.createComment(
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
  console.log({ body, pageId });
};
