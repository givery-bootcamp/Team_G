"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { postClient } from "@/lib/connect";
import { useState } from "react";
import useFileDrop from "../_hooks/useFileDrop";
import { DropArea } from "./fileDropArea";

interface Props {
  params: {
    id: string;
    title: string;
    body: string;
    token: string;
  };
}

const UpdatePostFormArea = ({ params }: Props) => {
  const { files, getRootProps, getInputProps, setFiles } = useFileDrop();

  let imageUrls: string[] = [];
  files.map((file) => {
    imageUrls.push(file.preview);
  });
  const [postTitle, setPostTitle] = useState(params.title);
  const handleChangeTitle = (value: string) => {
    setPostTitle(value);
  };
  const [postBody, setPostBody] = useState(params.body);
  const handleChangeBody = (value: string) => {
    setPostBody(value);
  };

  return (
    <div>
      <DropArea imageUrls={imageUrls} getRootProps={getRootProps} getInputProps={getInputProps} setFiles={setFiles} />
      <div>アップロードされたファイル数: {files.length}</div>
      <div>アップロードされたファイル: {files.map((file) => file.name).join(", ")}</div>
      <Input
        type="title"
        placeholder="タイトル"
        value={postTitle}
        onChange={(e) => handleChangeTitle(e.target.value)}
        className="mb-4"
      ></Input>
      <Input
        type="body"
        placeholder="テキスト"
        value={postBody}
        onChange={(e) => handleChangeBody(e.target.value)}
        className="mb-4"
      ></Input>
      <Button className="w-full" onClick={async () => await postNewPost(params.id, postTitle, postBody, params.token)}>
        更新
      </Button>
    </div>
  );
};
export default UpdatePostFormArea;
const postNewPost = async (id: string, title: string, body: string, token: string) => {
  try {
    const result = await postClient.updatePost(
      {
        id: id,
        title: title,
        body: body,
        imageUrl: "https://example.com",
      },
      {
        headers: {
          Authorization: token,
        },
      },
    );
    console.log("result", result);
  } catch (error) {
    console.error(error);
  }

  console.log({ title, body });
};
