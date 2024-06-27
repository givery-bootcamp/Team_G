// import { postClient } from "@/lib/connect";

import { NextPage } from "next";
import BreadCrumb from "../../_components/breadCrumb";

import { auth } from "@/auth";
import { postClient } from "@/lib/connect";
import { redirect } from "next/navigation";
import UpdatePostFormArea from "./_components/updatePostFormArea";

interface Props {
  params: {
    id: string;
    title: string;
    body: string;
  };
}

const PostEditPage: NextPage<Props> = async ({ params }) => {
  const session = await auth();
  if (!session || !session.accessToken) {
    redirect("/api/auth/signin");
  }
  const id = params.id;

  const { post } = await postClient.post(
    { id },
    {
      headers: {
        Authorization: session.accessToken,
      },
    },
  );

  if (!post) return;
  let imageUrls = [];
  if (post.imageUrl) {
    imageUrls.push(post.imageUrl);
  }

  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "投稿一覧", href: "/post" },
    { name: `${post.title}`, href: `/post/${post.id}` },
  ];

  return (
    <main className="mx-auto min-h-screen max-w-xl p-1 pt-4">
      <BreadCrumb breadcrumbItems={breadcrumbItems} />
      <h1 className="mb-4 text-2xl font-bold">Post Detail Page {post.id}</h1>

      <div className="flex flex-col items-center">
        <UpdatePostFormArea params={{ id: post.id, title: post.title, body: post.body, token: session.accessToken }} />
      </div>
    </main>
  );
};

export default PostEditPage;
const uploadFile = async (prevState: string | null, formData: FormData) => {
  console.log({ formData });
  console.log("uploadFile.....");
  if (!formData.get("file")) {
    return prevState;
  }
  try {
    const response = await fetch("/api/thumbnail/upload", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log(data);

    return data.imageUrl;
  } catch (error) {
    console.error(error);
  }
};
