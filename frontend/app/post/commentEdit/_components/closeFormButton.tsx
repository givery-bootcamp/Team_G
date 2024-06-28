"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

interface Props {
  handler: () => void;
}

const CloseFormButton = ({ handler }: Props) => {
  const onClick = () => {
    handler();
  };
  return (
    <Button className="bg-white text-black" onClick={onClick}>
      close
    </Button>
    // <form className="flex flex-col items-center space-y-2">
    //   <Textarea name="newbody" placeholder={body} />
    //   <Button>update</Button>
    // </form>
  );
};

export default CloseFormButton;
