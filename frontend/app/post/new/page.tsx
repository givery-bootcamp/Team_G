"use server";
import { auth } from "@/auth";
import { NextPage } from "next";
import { redirect } from "next/navigation";
import BreadCrumb from "../_components/breadCrumb";
import PostFormArea from "./_components/postFormArea";

interface Props {
  params: {
    id: string;
    title: string;
    body: string;
  };
}

const PostNewPage: NextPage<Props> = async ({ params }) => {
  const session = await auth();
  if (!session || !session.accessToken) {
    redirect("/api/auth/signin");
  }
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "投稿一覧", href: "/post" },
  ];

  return (
    <main className="mx-auto min-h-screen max-w-xl p-1 pt-4">
      <BreadCrumb breadcrumbItems={breadcrumbItems} />
      <h1 className="mb-4 text-2xl font-bold">Post Detail Page </h1>
      <PostFormArea params={{ token: session.accessToken }} />

      <div className="flex flex-col items-center"></div>
    </main>
  );
};

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

export default PostNewPage;
