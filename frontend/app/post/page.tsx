import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { postClient } from "@/lib/connect";
import { Pencil } from "lucide-react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import BreadCrumb from "./_components/breadCrumb";

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

  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "投稿一覧", href: "/post" },
  ];

  return (
    <main className="mx-auto min-h-screen max-w-xl pt-4">
      <BreadCrumb breadcrumbItems={breadcrumbItems} />
      <h1 className="mb-2 text-2xl font-bold">投稿一覧</h1>
      <Link href="/post/new" key="new" className="w-full">
        <Button className="absolute right-0 top-0 h-12 w-12 bg-white p-2 hover:bg-gray-300">
          <Pencil color="grey" />
        </Button>
      </Link>

      <section className="grid grid-cols-2 gap-2 p-2">
        {posts.map((post) => {
          console.log(post);
          return (
            <Link href={`/post/${post.id}`} key={post.id} className="w-full text-center">
              <Card className="mx-auto max-w-fit p-3">
                <Image src={post.imageUrl || "/images/noimage.png"} alt={post.title} width={300} height={300} />
                <p className="text-xl font-bold">{post.title}</p>
                <p className="text-sm">{post.body}</p>
                <div className="text-xs">{post.createdAt?.toDate().toLocaleDateString()}</div>
              </Card>
            </Link>
          );
        })}
      </section>
    </main>
  );
};

export default PostListPage;
