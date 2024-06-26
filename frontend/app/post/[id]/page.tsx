import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { postClient } from "@/lib/connect";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import BreadCrumb from "../_components/breadCrumb";
import FormArea from "../_components/formArea";

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
    <main className="mx-auto min-h-screen max-w-xl p-1 pt-4">
      <BreadCrumb breadcrumbItems={breadcrumbItems} />
      <h1 className="mb-4 text-2xl font-bold">Post Detail Page {id}</h1>
      <div className="relative flex flex-col items-center">
        <Link href={`/post/${id}/edit`} key={id} className="w-full">
          <Button className="absolute right-0 top-0 h-12 w-12 bg-white p-2 hover:bg-gray-300">
            <Image src="/images/mode_edit.png" alt="edit pencil" className="" width={400} height={400} />
          </Button>
        </Link>
        <Image
          // src={post.imageUrl.length > 0 ? post.imageUrl : "/images/noimage.png"}
          src={"/images/noimage.png"}
          alt={post.title}
          width={400}
          height={400}
        />{" "}
        <h2 className="text-xl font-semibold">{post.title}</h2>
        <p className="text-md mt-2">{post.body}</p>
      </div>
      <div className="p-5">
        <p className="text-left text-xl font-semibold">Post Message</p>
        <FormArea pageId={id} />
      </div>
    </main>
  );
};

export default PostDetailPage;
