import { postClient } from "@/lib/connect";
import { NextPage } from "next";
import Image from "next/image";
import BreadCrumb from "../_components/breadCrumb";

interface Props {
  params: {
    id: string;
  };
}

const PostDetailPage: NextPage<Props> = async ({ params }) => {
  const { id } = params;
  const { post } = await postClient.post({ id });

  if (!post) return;

  return (
    <main className="mx-auto min-h-screen max-w-xl p-1 pt-4">
      <BreadCrumb />
      <h1 className="mb-4 text-2xl font-bold">Post Detail Page {id}</h1>
      <div className="flex flex-col items-center">
        <Image src="/images/noimage.png" alt="Post Image" className="mb-4" width={400} height={400} />
        <h2 className="text-xl font-semibold">{post.title}</h2>
        <p className="text-md mt-2">{post.body}</p>
      </div>
    </main>
  );
};

export default PostDetailPage;
