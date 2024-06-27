"use client";
import { Button } from "@/components/ui/button";
import { postClient } from "@/lib/connect";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  params: {
    id: string;
    token: string;
  };
}

const DeletePostButton = ({ params }: Props) => {
  const router = useRouter();
  const handleClick = async () => {
    alert("削除しますか？");
    try {
      await postClient.deletePost(
        {
          id: params.id,
        },
        {
          headers: {
            Authorization: params.token,
          },
        },
      );
      router.push("/post");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Button className="bg-white p-2 hover:bg-gray-300" onClick={handleClick}>
      <Trash2 color="grey" />
    </Button>
  );
};

export default DeletePostButton;
