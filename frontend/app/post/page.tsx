import { NextPage } from "next";
import { Card } from "@/components/ui/card";
import { postClient } from "@/lib/connect";
import Link from "next/link";
import Image from "next/image";

const PostListPage: NextPage = async () => {
  const { post } = await postClient.postList({});

  return (
    <main className="mx-auto min-h-screen max-w-xl pt-4">
      <h1 className="mb-2 text-2xl font-bold">投稿一覧</h1>
      <section className="grid grid-cols-2 gap-2 p-2">
        {post.map((md) => {
          return (
            <Link href={`/post/${md.id}`} key={md.id} className="w-full text-center">
              <Card className="mx-auto max-w-fit p-3">
                <Image src="/images/noimage.png" alt={md.title} width={300} height={300} />
                <p className="text-xl font-bold">{md.title}</p>
                <p className="text-sm">{md.body}</p>
                <div className="text-xs">{md.createdAt?.toDate().toLocaleDateString()}</div>
              </Card>
            </Link>
          );
        })}
      </section>
    </main>
  );
};

export default PostListPage;
