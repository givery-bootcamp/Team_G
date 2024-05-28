import { NextPage } from "next";
import Image from "next/image";

interface Props {
  params: {
    id: string;
  };
}

const PostDetailPage: NextPage<Props> = ({ params }) => {
  const { id } = params;

  return (
    <main className="mx-auto min-h-screen max-w-xl p-1 pt-4">
      <h1 className="mb-4 text-2xl font-bold">Post Detail Page {id}</h1>
      <div className="flex flex-col items-center">
        <Image src="/images/noimage.png" alt="Post Image" className="mb-4" width={400} height={400} />
        <h2 className="text-xl font-semibold">Post Title</h2>
        <p className="text-md mt-2">
          This is a detailed description of the post content. It provides more context and information about the post.
        </p>
      </div>
    </main>
  );
};

export default PostDetailPage;
