"use client";
// import { postClient } from "@/lib/connect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockData } from "@/constants/mock";

import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import BreadCrumb from "../../_components/breadCrumb";

import { DropArea } from "./_components/fileDropArea";
import useFileDrop from "./_hooks/useFileDrop";

interface Props {
  params: {
    id: string;
    title: string;
    body: string;
  };
}

const PostEditPage: NextPage<Props> = ({ params }) => {
  const { id, title, body } = params;
  const { files, getRootProps, getInputProps, setFiles } = useFileDrop();
  const post = mockData.find((md) => md.id === Number(id));
  if (!post) return;

  const [postTitle, setPostTitle] = useState(post?.title);
  const handleChangeTitle = (value: string) => {
    setPostTitle(value);
  };
  const [postBody, setPostBody] = useState(post?.body);
  const handleChangeBody = (value: string) => {
    setPostBody(value);
  };

  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "投稿一覧", href: "/post" },
    { name: `${post.title}`, href: `/post/${id}` },
  ];

  return (
    <main className="mx-auto min-h-screen max-w-xl p-1 pt-4">
      <BreadCrumb breadcrumbItems={breadcrumbItems} />
      <h1 className="mb-4 text-2xl font-bold">Post Detail Page {id}</h1>

      <div className="flex flex-col items-center">
        <DropArea
          imageUrl={post.imageUrl}
          files={files}
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          setFiles={setFiles}
        />
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
        <Link href={`/post/${id}`}>
          <Button
            className="w-full"
            onClick={async () => {
              var formData = new FormData();
              formData.append("file", files[0], files[0].name);
              formData.append("filename", files[0].name);
              uploadFile(null, formData);
              //TODO:UPDATEのAPIを叩く
            }}
          >
            更新
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default PostEditPage;
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
