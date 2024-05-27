import { NextPage } from "next";
import { mockData} from "@/constants/mock";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const PostListPage: NextPage = () => {
  return (
    <main>
      <h1>Post List Page</h1>
      <section>
        {mockData.map((md) => {
          return (
            <Link href={`/post/${md.id}`} key={md.id}>
              <Card>
                {md.title}
                {md.body}
              </Card>
            </Link>
          );
        })}
      </section>
    </main>
  );
};

export default PostListPage;
