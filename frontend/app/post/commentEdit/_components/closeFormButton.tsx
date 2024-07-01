"use client";
import { Button } from "@/components/ui/button";

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
  );
};

export default CloseFormButton;
