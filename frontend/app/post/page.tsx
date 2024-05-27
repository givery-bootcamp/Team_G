import { NextPage } from "next";
import mockData from "@/constans/mock";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const PostListPage: NextPage = () => {
  return (
    <div>
      <h1>Post List Page</h1>
      <>
        {mockData.map((md) => {
          return (
            <Link href={`/post/${md.id}`}>
              <Card key={md.id}>
                {md.title}
                {md.body}
              </Card>
            </Link>
          );
        })}
      </>
    </div>
  );
};

export default PostListPage;
