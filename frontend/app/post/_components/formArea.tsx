"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { v4 as uuid4 } from "uuid";
//import { v4 as uuid4 } from "uuid";
import { Post, Comment } from "@/types";
import { backend } from "@/lib/backend";

const FormArea = ({ pageId }: { pageId: string }) => {
  const clickAction = (formData: FormData) => {
    const comment: Comment = {
      id: "1",
      body: "sample comment",
      userId: "0",
      postId: "0",
      createdAt: new Date(2024, 6, 24),
      updatedAt: new Date(2024, 6, 24),
    };

    const text = formData.get("body");
    const uniqueId = uuid4();

    if (text && text != null) {
      comment.id = String(uniqueId);
      comment.body = String(text);
      comment.postId = pageId;
      const createdAt = new Date();
      comment.createdAt = createdAt;
      comment.updatedAt = createdAt;
      console.log(uniqueId);
      console.log(comment.body);
      console.log(comment.postId);
      console.log(comment.createdAt);
      console.log(comment.updatedAt);
      backend.comment.postComment(comment);
    } else {
      console.log("null text");
    }
  };

  return (
    <form action={clickAction} className="flex flex-col items-center space-y-2">
      <Textarea name="body" placeholder="Type your message here." />
      <Button type={"submit"}>Send</Button>
    </form>
  );
};

export default FormArea;
