"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { v4 as uuid4 } from "uuid";
//import { v4 as uuid4 } from "uuid";

const FormArea = ({ pageId }: { pageId: string }) => {
  const clickAction = (formData: FormData) => {
    const comment = {
      id: "1",
      body: "sample comment",
      user_id: "0",
      post_id: "0",
      created_at: "0-0-0-0:0:0",
      updated_at: "0-0-0-0:0:0",
    };

    const text = formData.get("body");
    const uniqueId = uuid4();

    if (text && text != null) {
      comment.id = String(uniqueId);
      comment.body = String(text);
      comment.post_id = pageId;
      const createdAt = new Date();
      const formatCreatedAt = `${createdAt.getFullYear()}-${createdAt.getMonth()}-${createdAt.getDate()}-${createdAt.getHours()}:${createdAt.getMinutes()}:${createdAt.getSeconds()}`;
      comment.created_at = String(formatCreatedAt);
      console.log(uniqueId);
      console.log(comment.body);
      console.log(comment.post_id);
      console.log(comment.created_at);
      console.log(comment.updated_at);
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
