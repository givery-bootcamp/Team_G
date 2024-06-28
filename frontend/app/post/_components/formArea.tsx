"use client";
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
  const clickAction = async (formData: FormData) => {
    console.log("click");
    if (formData.get("body")) {
      const commentBody = String(formData.get("body"));
      //console.log(commentBody);
      await postNewComment(commentBody, postId, token);
      router.refresh();
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

const postNewComment = async (body: string, postId: string, token: string) => {
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
  //console.log({ body, postId });
};
