"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

interface Props {
  body: string;
  postId: string;
  commentId: string;
  token: string;
}

const UpdateFormButton = ({ body, postId, commentId, token }: Props) => {
  return (
    <Button className="bg-white">
      <Image src="/images/mode_edit.png" alt="delete_icon" width={15} height={15} />
    </Button>
    // <form className="flex flex-col items-center space-y-2">
    //   <Textarea name="newbody" placeholder={body} />
    //   <Button>update</Button>
    // </form>
  );
};

export default UpdateFormButton;
