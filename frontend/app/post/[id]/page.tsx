// import { postClient } from "@/lib/connect";
import { mockData } from "@/constants/mock";
import { NextPage } from "next";
import Image from "next/image";
import BreadCrumb from "../_components/breadCrumb";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Props {
  params: {
    id: string;
  };
}

const PostDetailPage: NextPage<Props> = async ({ params }) => {
  const { id } = params;
  // const { post } = await postClient.post({ id });
  const post = mockData.find((md) => md.id === Number(id));

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
        <Image src="/images/noimage.png" alt="Post Image" className="mb-4" width={400} height={400} />
        <h2 className="text-xl font-semibold">{post.title}</h2>
        <p className="text-md mt-2">{post.body}</p>
      </div>
      <div className="p-5">
        <p className="text-left text-xl font-semibold">Post Message</p>
        <div className="flex flex-col items-center space-y-2">
          <Textarea placeholder="Type your message here." />
          <Button variant="outline">Post</Button>
        </div>
      </div>
    </main>
  );
};

export default PostDetailPage;
