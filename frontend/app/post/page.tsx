import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { postClient } from "@/lib/connect";
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

  const { post } = await postClient.postList(
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
      <Link href={`/post/new`} key="new" className="w-full">
        <Button className="absolute right-0 top-0 h-12 w-12 bg-white p-2 hover:bg-gray-300">
          <Image src="/images/mode_edit.png" alt="edit pencil" className="" width={400} height={400} />
        </Button>
      </Link>

      <section className="grid grid-cols-2 gap-2 p-2">
        {post.map((md) => {
          return (
            <Link href={`/post/${md.id}`} key={md.id} className="w-full text-center">
              <Card className="mx-auto max-w-fit p-3">
                <Image
                  // src={md.imageUrl.length > 0 ? md.imageUrl : "/images/noimage.png"}
                  src={"/images/noimage.png"}
                  alt={md.title}
                  width={300}
                  height={300}
                />
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
