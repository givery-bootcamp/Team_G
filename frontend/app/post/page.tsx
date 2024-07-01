import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { postClient } from "@/lib/connect";
import { Plus } from "lucide-react";
import { NextPage } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import PostImage from "./[id]/edit/_components/postIcon";
import BreadCrumb from "./_components/breadCrumb";
import { getVoteCount } from "@/lib/viem";

const PostListPage: NextPage = async () => {
  const session = await auth();
  if (!session || !session.accessToken) {
    redirect("/api/auth/signin");
  }

  const { post: posts } = await postClient.postList(
    {},
    {
      headers: {
        Authorization: session.accessToken,
      },
    },
  );

  const postsWithVoteCount = await Promise.all(
    posts.map(async (post) => {
      const count = await getVoteCount(post.id);
      return {
        ...post,
        voteCount: Number(count.toString()),
      };
    }),
  );

  postsWithVoteCount.sort((a, b) => b.voteCount - a.voteCount);

  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "投稿一覧", href: "/post" },
  ];

  return (
    <main className="mx-auto min-h-screen max-w-xl pt-4">
      <BreadCrumb breadcrumbItems={breadcrumbItems} />
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-2xl font-bold">投稿一覧</h1>
        <Link href="/post/new">
          <Button>
            <p className="text-l mr-2 text-white">新規作成</p>
            <Plus color="white" size={20} />
          </Button>
        </Link>
      </div>

      <section className="grid grid-cols-2 gap-2 p-2">
        {postsWithVoteCount.map((post) => {
          return (
            <Link href={`/post/${post.id}`} key={post.id} className="w-full text-center">
              <Card className="mx-auto max-w-fit p-3">
                <PostImage imageUrl={post.imageUrl} />
                <p className="text-xl font-bold">{post.title}</p>
                <p className="text-sm">{post.body}</p>
                <div className="text-xs">{post.createdAt?.toDate().toLocaleDateString()}</div>
                <div className="text-xs">by {post.userName}</div>
                <div className="font-bold">投票数: {post.voteCount ?? 0}</div>
              </Card>
            </Link>
          );
        })}
      </section>
    </main>
  );
};

export default PostListPage;
