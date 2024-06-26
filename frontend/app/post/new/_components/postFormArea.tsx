"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { DropArea } from "../../[id]/edit/_components/fileDropArea";
import useFileDrop from "../../[id]/edit/_hooks/useFileDrop";

interface Props {
  params: {
    postFunction: (title: string, body: string) => Promise<any>;
  };
}

const PostFormArea = ({ params }: Props) => {
  const { files, getRootProps, getInputProps, setFiles } = useFileDrop();

  let imageUrls: string[] = [];
  files.map((file) => {
    imageUrls.push(file.preview);
  });
  const [postTitle, setPostTitle] = useState("");
  const handleChangeTitle = (value: string) => {
    setPostTitle(value);
  };
  const [postBody, setPostBody] = useState("");
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
      <Button className="w-full" onClick={() => params.postFunction(postTitle, postBody)}>
        更新
      </Button>
    </div>
  );
};
export default PostFormArea;
