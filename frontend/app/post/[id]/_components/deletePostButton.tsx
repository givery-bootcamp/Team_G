"use client";
import { Button } from "@/components/ui/button";
import { postClient } from "@/lib/connect";
import Image from "next/image";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
    token: string;
  };
}

const DeletePostButton = ({ params }: Props) => {
  const handleClick = async () => {
    alert("削除しますか？");
    try {
      const result = await postClient.deletePost(
        {
          id: params.id,
        },
        {
          headers: {
            Authorization: params.token,
          },
        },
      );
      if (result) {
        redirect("/post");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Button className="bg-white p-2 hover:bg-gray-300" onClick={handleClick}>
      <Image src="/images/delete_icon.png" alt="edit pencil" className="" width={30} height={30} />
    </Button>
  );
};

export default DeletePostButton;
