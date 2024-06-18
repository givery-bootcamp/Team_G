"use client";
// import { postClient } from "@/lib/connect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockData } from "@/constants/mock";

import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import BreadCrumb from "../../_components/breadCrumb";

interface Props {
  params: {
    id: string;
    title: string;
    body: string;
  };
}

const PostEditPage: NextPage<Props> = ({ params }) => {
  const { id, title, body } = params;
  // const { post } = await postClient.post({ id });
  const post = mockData.find((md) => md.id === Number(id));
  const [postTitle, setPostTitle] = useState(post?.title);
  const handleChangeTitle = (value: string) => {
    setPostTitle(value);
  };
  const [postBody, setPostBody] = useState(post?.body);
  const handleChangeBody = (value: string) => {
    setPostBody(value);
  };

  if (!post) return;

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
        <Image src="/images/noimage.png" alt="Post Image" className="mb-4" width={400} height={400}></Image>
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
          <Button className="w-full">更新</Button>
        </Link>
      </div>
    </main>
  );
};

export default PostEditPage;
