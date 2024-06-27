"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { postClient } from "@/lib/connect";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  params: {
    id: string;
    token: string;
  };
}

const DeletePostButton = ({ params }: Props) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDelete = async () => {
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
    } finally {
      setIsDialogOpen(false);
    }
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <Button className="bg-white p-2 hover:bg-gray-300" onClick={() => setIsDialogOpen(true)}>
        <Trash2 color="grey" />
      </Button>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogTitle>確認</DialogTitle>
          <DialogDescription>本当に削除しますか？</DialogDescription>
          <DialogFooter>
            <Button onClick={handleCancel}>キャンセル</Button>
            <Button className="bg-red-500 text-white" onClick={handleDelete}>
              削除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeletePostButton;
