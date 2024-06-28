"use server";
import { auth } from "@/auth";
import { NextPage } from "next";
import { redirect } from "next/navigation";
import BreadCrumb from "../_components/breadCrumb";
import PostFormArea from "./_components/postFormArea";

const PostNewPage: NextPage = async () => {
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

      <div className="flex flex-col items-center" />
    </main>
  );
};
export default PostNewPage;
