"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PostData } from "@/gen/post_pb";
import { postClient } from "@/lib/connect";

import { useRouter } from "next/navigation";
import { useState } from "react";
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
  var post = params.post;
  const router = useRouter();

  let imageUrl = post.imageUrl;
  if (file) {
    imageUrl = URL.createObjectURL(file);
  }

  const [postTitle, setPostTitle] = useState(post.title);
  const handleChangeTitle = (value: string) => {
    setPostTitle(value);
  };
  const [postBody, setPostBody] = useState(post.body);
  const handleChangeBody = (value: string) => {
    setPostBody(value);
  };
  const updatePost = async (id: string, title: string, body: string, imageUrl: string, token: string) => {
    try {
      const result = await postClient.updatePost(
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
      router.push("/post");
      router.refresh();
    } catch (error) {
      console.error(error);
    }

    console.log({ title, body });
  };

  return (
    <div>
      <DropArea imageUrl={imageUrl} getRootProps={getRootProps} getInputProps={getInputProps} />

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
          var formData = new FormData();
          if (file) {
            formData.append("file", file, file.name);
            formData.append("filename", file.name);
            const imageUrl = process.env.NEXT_PUBLIC_S3_BUCKET_PATH + file.name;
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
