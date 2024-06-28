"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PostData } from "@/gen/post_pb";
import { postClient } from "@/lib/connect";
import { IFileWithPreview } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useFileDrop from "../_hooks/useFileDrop";
import { DropArea } from "./fileDropArea";

interface Props {
  params: {
    post: PostData;
    token: string;
  };
}

const UpdatePostFormArea = ({ params }: Props) => {
  const { file, getRootProps, getInputProps, setFile } = useFileDrop();
  const post = params.post;
  const router = useRouter();
  const [postTitle, setPostTitle] = useState(post.title);
  const [postBody, setPostBody] = useState(post.body);

  useEffect(() => {
    if (post.imageUrl) {
      const newFile = new File([new Blob()], post.imageUrl) as IFileWithPreview;
      newFile.preview = post.imageUrl;
      setFile(newFile);
    }
  }, [post.imageUrl, setFile]);

  const handleChangeTitle = (value: string) => {
    setPostTitle(value);
  };

  const handleChangeBody = (value: string) => {
    setPostBody(value);
  };

  const updatePost = async (id: string, title: string, body: string, imageUrl: string, token: string) => {
    try {
      await postClient.updatePost(
        {
          id: id,
          title: title,
          body: body,
          imageUrl: imageUrl,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      toast.success("Post updated successfully!");
      setTimeout(() => {
        router.push("/post");
        router.refresh();
      }, 1000);
    } catch (error) {
      toast.error("Failed to update post. Please try again.");
      console.error(error);
    }
  };

  return (
    <div>
      <DropArea imageUrl={post.imageUrl} getRootProps={getRootProps} getInputProps={getInputProps} />
      <div>アップロードされたファイル: {file?.name}</div>
      <Input
        type="title"
        placeholder="タイトル"
        value={postTitle}
        onChange={(e) => handleChangeTitle(e.target.value)}
        className="mb-4"
      />
      <Input
        type="body"
        placeholder="テキスト"
        value={postBody}
        onChange={(e) => handleChangeBody(e.target.value)}
        className="mb-4"
      />
      <Button
        className="w-full"
        onClick={async () => {
          const formData = new FormData();
          if (file) {
            formData.append("file", file, file.name);
            formData.append("filename", file.name);

            let imageUrl = process.env.NEXT_PUBLIC_S3_BUCKET_PATH + file.name;
            if (file.name == post.imageUrl) {
              imageUrl = post.imageUrl;
            }
            await uploadFile(null, formData);
            await updatePost(post.id, postTitle, postBody, imageUrl, params.token);
          } else {
            await updatePost(post.id, postTitle, postBody, "", params.token);
          }
        }}
      >
        更新
      </Button>
    </div>
  );
};
export default UpdatePostFormArea;

const uploadFile = async (prevState: string | null, formData: FormData) => {
  console.log({ formData });
  console.log("uploadFile.....");
  if (!formData.get("file")) {
    return prevState;
  }
  try {
    const response = await fetch("/api/thumbnail/upload", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log(data);

    return data.imageUrl;
  } catch (error) {
    console.error(error);
  }
};
