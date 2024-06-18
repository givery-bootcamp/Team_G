// import { postClient } from "@/lib/connect";
import { Button } from "@/components/ui/button";
import { mockData } from "@/constants/mock";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import BreadCrumb from "../_components/breadCrumb";

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
      <div className="relative flex flex-col items-center">
        <Link href={`/post/${id}/edit`} key={id} className="w-full">
          <Button className="absolute right-0 top-0 h-12 w-12 bg-white p-2 hover:bg-gray-300">
            <Image src="/images/mode_edit.png" alt="edit pencil" className="" width={400} height={400} />
          </Button>
        </Link>

        <Image src="/images/noimage.png" alt="Post Image" className="mb-4" width={400} height={400} />
        <h2 className="text-xl font-semibold">{post.title}</h2>
        <p className="text-md mt-2">{post.body}</p>
      </div>
    </main>
  );
};

export default PostDetailPage;
