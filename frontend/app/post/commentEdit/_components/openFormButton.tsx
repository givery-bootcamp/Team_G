"use client";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

interface Props {
  handler: () => void;
}

const OpenFormButton = ({ handler }: Props) => {
  const onClick = () => {
    handler();
  };
  return (
    <Button className="bg-white" onClick={onClick}>
      <Pencil color="grey" />
    </Button>
    // <form className="flex flex-col items-center space-y-2">
    //   <Textarea name="newbody" placeholder={body} />
    //   <Button>update</Button>
    // </form>
  );
};

export default OpenFormButton;
