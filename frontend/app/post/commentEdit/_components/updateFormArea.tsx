"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const UpdateFormArea = () => {
  return (
    <Button className="bg-white">
      <Image src="/images/mode_edit.png" alt="delete_icon" width={15} height={15} />
    </Button>
  );
};

export default UpdateFormArea;
