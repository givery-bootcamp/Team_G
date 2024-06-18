"use client";
import { Button } from "@/components/ui/button";

const TestButton = ({ comment }: { comment: string }) => {
  const handleClick = () => {
    console.log(comment);
  };

  return <Button onClick={handleClick}>Test</Button>;
};

export default TestButton;
