import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { postClient } from "@/lib/connect";
import { Pencil } from "lucide-react";
import { NextPage } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import BreadCrumb from "../_components/breadCrumb";
import CommentList from "../_components/commentList";
import FormArea from "../_components/formArea";
import DeletePostButton from "./_components/deletePostButton";
import PostImage from "./edit/_components/postIcon";

interface Props {
  params: {
    id: string;
  };
}

const PostDetailPage: NextPage<Props> = async ({ params }) => {
  const { id } = params;
  const session = await auth();
  if (!session || !session.accessToken) {
    redirect("/api/auth/signin");
  }

  const { post } = await postClient.post(
    { id },
    {
      headers: {
        Authorization: session.accessToken,
      },
    },
  );

  if (!post) return;

  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "投稿一覧", href: "/post" },
    { name: `${post.title}`, href: `/post/${id}` },
  ];

  return (
    console.log("sessionid", session.user?.id + "postid", post.userId),
    (
      <main className="mx-auto min-h-screen max-w-xl p-1 pt-4">
        <BreadCrumb breadcrumbItems={breadcrumbItems} />
        <div className="flex justify-between">
          <h1 className="mb-4 text-2xl font-bold">Post Detail Page </h1>
          <p>{"by " + post.userName}</p>
        </div>

        <div className="relative flex flex-col items-center">
          <div>
            {post.userId === session.id && (
              <Link href={`/post/${id}/edit`} key={id} className="w-full">
                <Button className=" bg-white p-2 hover:bg-gray-300">
                  <Pencil color="grey" />
                </Button>
              </Link>
            )}

            {post.userId === session.id && <DeletePostButton id={id} token={session.accessToken} />}
          </div>
          <PostImage imageUrl={post.imageUrl} />
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-md mt-2">{post.body}</p>
        </div>
        <div className="p-5">
          <CommentList commentList={post.comments} postId={post.id} token={session.accessToken} userId={session.id!} />
        </div>
        <div className="p-5">
          <p className="text-left text-xl font-semibold">Post Message</p>
          <FormArea token={session.accessToken} postId={id} />
        </div>
      </main>
    )
  );
};

export default PostDetailPage;
